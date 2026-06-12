import { client } from '$lib/sanity.js';
import { PRODUCT_CATEGORIES, STOCK_UNITS } from '$lib/constants.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { setProductStock } from '$lib/server/stock.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

function toSlug(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** @type {import('./$types').PageServerLoad} */
export function load() {
  return { categories: PRODUCT_CATEGORIES, units: STOCK_UNITS };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    if (!env.SANITY_API_WRITE_TOKEN) {
      return fail(500, {
        error: 'SANITY_API_WRITE_TOKEN est manquant. Impossible de creer le produit.',
      });
    }

    const writeClient = getWriteClient();

    const data = await request.formData();

    const name = data.get('name')?.toString().trim();
    const category = data.get('category')?.toString();
    const price = Number(data.get('price'));
    const description = data.get('description')?.toString().trim();
    const badge = data.get('badge')?.toString().trim() || null;
    const unit = data.get('unit')?.toString();
    const initialStock = Number(data.get('initialStock') || 0);
    const lowStockThreshold = Number(data.get('lowStockThreshold') || 5);

    if (
      !name ||
      !category ||
      !PRODUCT_CATEGORIES.includes(category) ||
      !description ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return fail(400, { error: 'Veuillez renseigner les champs obligatoires.' });
    }

    if (
      !unit ||
      !STOCK_UNITS.includes(unit) ||
      !Number.isFinite(initialStock) ||
      initialStock < 0
    ) {
      return fail(400, { error: 'Veuillez vérifier les informations de stock.' });
    }

    const slug = toSlug(name);
    if (!slug) {
      return fail(400, { error: 'Impossible de générer un slug valide à partir du nom.' });
    }

    try {
      const existingWithSlug = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]._id`,
        {
          slug,
        }
      );
      const finalSlug = existingWithSlug ? `${slug}-${Date.now().toString().slice(-6)}` : slug;
      const now = new Date().toISOString();

      const createdProduct = await writeClient.create({
        _type: 'product',
        name,
        slug: { _type: 'slug', current: finalSlug },
        category,
        badge,
        price,
        description,
        available: initialStock > 0,
      });

      await setProductStock({
        readClient: client,
        writeClient,
        productId: createdProduct._id,
        quantity: initialStock,
        unit,
        lowStockThreshold:
          Number.isFinite(lowStockThreshold) && lowStockThreshold >= 0 ? lowStockThreshold : 5,
        now,
      });
    } catch (error) {
      console.error('Erreur creation produit:', error);
      return fail(500, {
        error:
          'Erreur serveur pendant la creation du produit. Verifiez la configuration Sanity et reessayez.',
      });
    }

    throw redirect(303, '/admin/products?created=1');
  },
};
