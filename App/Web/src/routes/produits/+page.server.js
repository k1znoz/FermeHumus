import { client } from '$lib/sanity.js';
import { CONTACT_EMAIL, ORDER_PICKUP_LOCATIONS, ORDER_REFERRAL_SOURCES } from '$lib/constants.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { aggregateStockEntries, fetchStockEntriesByProduct } from '$lib/server/stock.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import { randomUUID } from 'node:crypto';

async function getProducts() {
  try {
    return await client.fetch(`
			*[_type == "product" && available == true] | order(name asc) {
				_id,
				name,
				category,
				price,
				description,
				badge,
				available,
				"image": image.asset->url,
				"stock": *[_type == "stockEntry" && product._ref == ^._id][0] {
					quantity,
					unit,
					lowStockThreshold
				}
			}
		`);
  } catch {
    return [];
  }
}

function parseCartPayload(value) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const aggregated = new Map();

    for (const item of parsed) {
      const productId = item?.productId?.toString();
      const quantity = Number(item?.quantity);

      if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
        return [];
      }

      aggregated.set(productId, (aggregated.get(productId) ?? 0) + quantity);
    }

    return Array.from(aggregated.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  } catch {
    return [];
  }
}

function formatMoney(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
}

function buildEmailText(order) {
  const lines = [
    `Commande ${order.orderNumber}`,
    '',
    `Client: ${order.customerName}`,
    `Email: ${order.customerEmail}`,
    `Téléphone: ${order.customerPhone}`,
    `Retrait: ${order.pickupLocation}`,
    `Newsletter: ${order.newsletterOptIn ? 'oui' : 'non'}`,
    order.referralSource ? `Comment le client nous a connus: ${order.referralSource}` : null,
    '',
    'Produits:',
    ...order.items.map(
      (item) => `- ${item.quantity} x ${item.productName} (${formatMoney(item.subtotal)})`
    ),
    '',
    `Total: ${formatMoney(order.totalAmount)}`,
    ...(order.notes ? ['', 'Notes:', order.notes] : []),
  ].filter(Boolean);

  return lines.join('\n');
}

export async function load() {
  const products = await getProducts();
  return { products };
}

export const actions = {
  default: async ({ request }) => {
    if (!env.SANITY_API_WRITE_TOKEN) {
      return fail(500, {
        error: 'SANITY_API_WRITE_TOKEN est manquant. Impossible de valider la commande.',
      });
    }

    const data = await request.formData();
    const customerName = data.get('customerName')?.toString().trim();
    const customerEmail = data.get('customerEmail')?.toString().trim();
    const customerPhone = data.get('customerPhone')?.toString().trim();
    const pickupLocation = data.get('pickupLocation')?.toString().trim();
    const referralSource = data.get('referralSource')?.toString().trim() || null;
    const newsletterOptIn = data.get('newsletterOptIn') === 'on';
    const notes = data.get('notes')?.toString().trim() || null;
    const cart = parseCartPayload(data.get('cart')?.toString());

    if (!customerName || !customerEmail || !customerPhone || !pickupLocation || cart.length === 0) {
      return fail(400, { error: 'Veuillez compléter vos coordonnées et votre sélection.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return fail(400, { error: 'Adresse email invalide.' });
    }

    if (!ORDER_PICKUP_LOCATIONS.includes(pickupLocation)) {
      return fail(400, { error: 'Point de retrait invalide.' });
    }

    if (referralSource && !ORDER_REFERRAL_SOURCES.includes(referralSource)) {
      return fail(400, { error: 'Source de contact invalide.' });
    }

    const writeClient = getWriteClient();
    const productIds = cart.map((item) => item.productId);
    const [products, stockEntryLists] = await Promise.all([
      client.fetch(
        `*[_type == "product" && _id in $ids] {
					_id,
					name,
					price,
					available
				}`,
        { ids: productIds }
      ),
      Promise.all(
        productIds.map(async (productId) => [
          productId,
          await fetchStockEntriesByProduct(client, productId),
        ])
      ),
    ]);

    const productMap = new Map(products.map((product) => [product._id, product]));
    const stockMap = new Map(stockEntryLists);
    const orderItems = [];

    for (const { productId, quantity } of cart) {
      const product = productMap.get(productId);
      if (!product) {
        return fail(400, { error: 'Un produit de votre sélection est introuvable.' });
      }

      if (product.available === false) {
        return fail(400, { error: `${product.name} n'est plus disponible.` });
      }

      const stockEntries = stockMap.get(productId) ?? [];
      const aggregated = aggregateStockEntries(stockEntries);

      if (!aggregated.primary) {
        return fail(400, { error: `Stock introuvable pour ${product.name}.` });
      }

      if (aggregated.totalQuantity < quantity) {
        return fail(400, {
          error:
            `Stock insuffisant pour ${product.name}. Disponible: ${aggregated.totalQuantity} ${aggregated.unit ?? ''}`.trim(),
        });
      }

      orderItems.push({
        productId,
        productName: product.name,
        quantity,
        unitPrice: product.price,
        subtotal: product.price * quantity,
        primaryStockId: aggregated.primary._id,
        duplicates: aggregated.entries.slice(1),
        remainingQuantity: aggregated.totalQuantity - quantity,
        unit: aggregated.unit,
        lowStockThreshold: aggregated.lowStockThreshold,
      });
    }

    const now = new Date().toISOString();
    const orderNumber = `CMD-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const orderId = `productOrder-${randomUUID()}`;
    const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const transaction = writeClient.transaction();

    transaction.create({
      _id: orderId,
      _type: 'productOrder',
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      pickupLocation,
      referralSource,
      newsletterOptIn,
      notes,
      status: 'reserved',
      reservedAt: now,
      totalAmount,
      items: orderItems.map((item) => ({
        _key: item.productId,
        _type: 'productOrderItem',
        product: { _type: 'reference', _ref: item.productId },
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
      })),
    });

    for (const item of orderItems) {
      transaction.patch(item.primaryStockId, {
        set: {
          quantity: item.remainingQuantity,
          unit: item.unit,
          lowStockThreshold: item.lowStockThreshold,
          updatedAt: now,
        },
      });

      for (const duplicate of item.duplicates) {
        transaction.delete(duplicate._id);
      }

      transaction.patch(item.productId, {
        set: { available: item.remainingQuantity > 0 },
      });
    }

    try {
      await transaction.commit();
    } catch (error) {
      console.error('Erreur validation commande:', error);
      return fail(500, { error: 'Impossible de valider la commande pour le moment.' });
    }

    const smtpUser = env.SMTP_USER;
    const smtpPass = env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Ferme de l'Humus" <${smtpUser}>`,
          to: CONTACT_EMAIL,
          replyTo: customerEmail,
          subject: `[Commande Ferme de l'Humus] ${orderNumber}`,
          text: buildEmailText({
            orderNumber,
            customerName,
            customerEmail,
            customerPhone,
            pickupLocation,
            referralSource,
            newsletterOptIn,
            notes,
            items: orderItems,
            totalAmount,
          }),
        });
      } catch (error) {
        console.error('Erreur notification commande:', error);
      }
    }

    throw redirect(303, `/produits/confirmation?order=${encodeURIComponent(orderNumber)}`);
  },
};
