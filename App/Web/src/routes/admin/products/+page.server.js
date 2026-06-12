import { client } from '$lib/sanity.js';
import { aggregateStockEntries } from '$lib/server/stock.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const baseProducts = await client.fetch(`
		*[_type == "product"] | order(category asc, name asc) {
			_id,
			name,
			category,
			available,
			"image": image.asset->url
		}
	`);

  const stockEntries = await client.fetch(`
		*[_type == "stockEntry" && defined(product._ref)] {
			_id,
			quantity,
			unit,
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

  const products = baseProducts.map((product) => {
    const { primary, totalQuantity, unit } = aggregateStockEntries(
      groupedByProduct[product._id] ?? []
    );
    return {
      ...product,
      stock: {
        _id: primary?._id ?? null,
        quantity: totalQuantity,
        unit,
        updatedAt: primary?.updatedAt ?? null,
      },
    };
  });

  return {
    products,
    created: url.searchParams.get('created') === '1',
    updated: url.searchParams.get('updated') === '1',
    bulkUpdated: url.searchParams.get('bulkUpdated') === '1',
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  bulkAvailability: async ({ request }) => {
    if (!env.SANITY_API_WRITE_TOKEN) {
      return fail(500, { error: 'SANITY_API_WRITE_TOKEN est manquant.' });
    }

    const formData = await request.formData();
    const availability = formData.get('availability')?.toString();
    const selectedIdsRaw = formData.get('selectedIds')?.toString() ?? '';

    if (!['available', 'unavailable'].includes(availability)) {
      return fail(400, { error: 'Action de disponibilite invalide.' });
    }

    const ids = selectedIdsRaw
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    if (ids.length === 0) {
      return fail(400, { error: 'Aucun produit selectionne.' });
    }

    const uniqueIds = Array.from(new Set(ids));
    const nextAvailability = availability === 'available';

    try {
      const writeClient = getWriteClient();
      const transaction = writeClient.transaction();

      for (const id of uniqueIds) {
        transaction.patch(id, { set: { available: nextAvailability } });
      }

      await transaction.commit();
    } catch (error) {
      console.error('Erreur mise a jour en lot disponibilite:', error);
      return fail(500, { error: 'Erreur serveur pendant la mise a jour en lot.' });
    }

    throw redirect(303, '/admin/products?bulkUpdated=1');
  },
};
