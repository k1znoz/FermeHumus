import { client } from '$lib/sanity.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import {
  aggregateStockEntries,
  fetchStockEntriesByProduct,
  setProductStock,
  normalizeNumber,
} from '$lib/server/stock.js';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const products = await client.fetch(`
		*[_type == "product"] | order(category asc, name asc) {
			_id,
			name,
			category,
			"image": image.asset->url
		}
	`);

  const stockEntries = await client.fetch(`
		*[_type == "stockEntry" && defined(product._ref)] {
			_id,
			quantity,
			unit,
			lowStockThreshold,
			updatedAt,
			"productId": product._ref
		}
	`);

  const groupedByProduct = stockEntries.reduce((acc, entry) => {
    if (!entry.productId) return acc;
    if (!acc[entry.productId]) acc[entry.productId] = [];
    acc[entry.productId].push(entry);
    return acc;
  }, {});

  const stocks = products.map((product) => ({
    ...(() => {
      const { primary, totalQuantity, unit, lowStockThreshold } = aggregateStockEntries(
        groupedByProduct[product._id] ?? []
      );
      return {
        _id: primary?._id ?? `virtual-${product._id}`,
        stockEntryId: primary?._id ?? null,
        quantity: totalQuantity,
        unit,
        lowStockThreshold,
      };
    })(),
    product: {
      _id: product._id,
      name: product.name,
      category: product.category,
      image: product.image,
    },
  }));

  return {
    stocks,
    focusProductId: url.searchParams.get('product') ?? null,
    bulkSaved: url.searchParams.get('bulkSaved') === '1',
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  bulkUpdateStock: async ({ request }) => {
    if (!env.SANITY_API_WRITE_TOKEN) {
      return fail(500, {
        error: 'SANITY_API_WRITE_TOKEN est manquant. Impossible de modifier le stock.',
      });
    }

    const writeClient = getWriteClient();
    const data = await request.formData();
    const updatesRaw = data.get('updates')?.toString();

    if (!updatesRaw) {
      return fail(400, { error: 'Aucune modification detectee.' });
    }

    let updates;
    try {
      updates = JSON.parse(updatesRaw);
    } catch {
      return fail(400, { error: 'Format de modifications invalide.' });
    }

    if (!Array.isArray(updates) || updates.length === 0) {
      return fail(400, { error: 'Aucune modification detectee.' });
    }

    const uniqueUpdates = Array.from(
      updates
        .reduce((map, entry) => {
          if (entry?.productId) {
            map.set(entry.productId, entry);
          }
          return map;
        }, new Map())
        .values()
    );

    for (const update of uniqueUpdates) {
      const quantity = Number(update?.quantity);
      if (!update?.productId || !Number.isFinite(quantity) || quantity < 0) {
        return fail(400, { error: 'Une ligne de stock est invalide.' });
      }
    }

    const now = new Date().toISOString();

    for (const update of uniqueUpdates) {
      const existingEntries = await fetchStockEntriesByProduct(client, update.productId);
      const aggregated = aggregateStockEntries(existingEntries);

      await setProductStock({
        readClient: client,
        writeClient,
        productId: update.productId,
        quantity: Number(update.quantity),
        unit: aggregated.unit,
        lowStockThreshold: normalizeNumber(aggregated.lowStockThreshold, 5),
        now,
      });

      await writeClient
        .patch(update.productId)
        .set({ available: Number(update.quantity) > 0 })
        .commit();
    }

    return { success: true, updatedCount: uniqueUpdates.length };
  },

  updateStock: async ({ request }) => {
    if (!env.SANITY_API_WRITE_TOKEN) {
      return fail(500, {
        error: 'SANITY_API_WRITE_TOKEN est manquant. Impossible de modifier le stock.',
      });
    }

    const writeClient = getWriteClient();

    const data = await request.formData();
    const productId = data.get('productId')?.toString();
    const quantity = Number(data.get('quantity'));
    const unit = data.get('unit')?.toString() || 'kg';
    const lowStockThreshold = Number(data.get('lowStockThreshold') ?? 5);

    if (!productId || isNaN(quantity) || quantity < 0) {
      return fail(400, { error: 'Données invalides.' });
    }

    const now = new Date().toISOString();
    const existingEntries = await fetchStockEntriesByProduct(client, productId);
    const aggregated = aggregateStockEntries(existingEntries);

    await setProductStock({
      readClient: client,
      writeClient,
      productId,
      quantity,
      unit,
      lowStockThreshold:
        Number.isFinite(lowStockThreshold) && lowStockThreshold >= 0
          ? lowStockThreshold
          : normalizeNumber(aggregated.lowStockThreshold, 5),
      now,
    });

    await writeClient
      .patch(productId)
      .set({ available: quantity > 0 })
      .commit();

    return { success: true };
  },
};
