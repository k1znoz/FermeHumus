import { client } from '$lib/sanity.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const products = await client.fetch(`
		*[_type == "product"] | order(category asc, name asc) {
			_id,
			name,
			category,
			"image": image.asset->url,
			"stock": *[_type == "stockEntry" && product._ref == ^._id][0] {
				_id,
				quantity,
				unit,
				lowStockThreshold
			}
		}
	`);

	const stocks = products.map((product) => ({
		_id: product.stock?._id ?? `virtual-${product._id}`,
		stockEntryId: product.stock?._id ?? null,
		quantity: product.stock?.quantity ?? 0,
		unit: product.stock?.unit ?? 'kg',
		lowStockThreshold: product.stock?.lowStockThreshold ?? 5,
		product: {
			_id: product._id,
			name: product.name,
			category: product.category,
			image: product.image
		}
	}));

	return { stocks, focusProductId: url.searchParams.get('product') ?? null };
}

/** @type {import('./$types').Actions} */
export const actions = {
	updateStock: async ({ request }) => {
		if (!env.SANITY_API_WRITE_TOKEN) {
			return fail(500, { error: 'SANITY_API_WRITE_TOKEN est manquant. Impossible de modifier le stock.' });
		}

		const writeClient = getWriteClient();

		const data = await request.formData();
		const stockEntryId = data.get('stockEntryId')?.toString() || null;
		const productId = data.get('productId')?.toString();
		const quantity = Number(data.get('quantity'));
		const unit = data.get('unit')?.toString() || 'kg';
		const lowStockThreshold = Number(data.get('lowStockThreshold') ?? 5);

		if (!productId || isNaN(quantity) || quantity < 0) {
			return fail(400, { error: 'Données invalides.' });
		}

		const now = new Date().toISOString();

		if (stockEntryId) {
			await writeClient
				.patch(stockEntryId)
				.set({
					quantity,
					unit,
					lowStockThreshold: Number.isFinite(lowStockThreshold) && lowStockThreshold >= 0 ? lowStockThreshold : 5,
					updatedAt: now
				})
				.commit();
		} else {
			await writeClient.create({
				_type: 'stockEntry',
				product: { _type: 'reference', _ref: productId },
				quantity,
				unit,
				lowStockThreshold: Number.isFinite(lowStockThreshold) && lowStockThreshold >= 0 ? lowStockThreshold : 5,
				updatedAt: now
			});
		}

		await writeClient.patch(productId).set({ available: quantity > 0 }).commit();

		return { success: true };
	}
};
