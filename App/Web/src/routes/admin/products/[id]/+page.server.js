import { client } from '$lib/sanity.js';
import { PRODUCT_CATEGORIES, STOCK_UNITS } from '$lib/constants.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { aggregateStockEntries, fetchStockEntriesByProduct, setProductStock } from '$lib/server/stock.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const [product, stockEntries] = await Promise.all([
		client.fetch(
			`*[_type == "product" && _id == $id][0]{
				_id,
				name,
				category,
				price,
				description,
				badge,
				available
			}`,
			{ id: params.id }
		),
		fetchStockEntriesByProduct(client, params.id)
	]);

	if (!product) {
		throw redirect(303, '/admin/products');
	}

	const aggregated = aggregateStockEntries(stockEntries);

	return {
		product,
		categories: PRODUCT_CATEGORIES,
		units: STOCK_UNITS,
		stock: {
			quantity: aggregated.totalQuantity,
			unit: aggregated.unit,
			lowStockThreshold: aggregated.lowStockThreshold
		}
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		if (!env.SANITY_API_WRITE_TOKEN) {
			return fail(500, { error: 'SANITY_API_WRITE_TOKEN est manquant.' });
		}

		const writeClient = getWriteClient();
		const data = await request.formData();

		const name = data.get('name')?.toString().trim();
		const category = data.get('category')?.toString();
		const price = Number(data.get('price'));
		const description = data.get('description')?.toString().trim();
		const badge = data.get('badge')?.toString().trim() || null;
		const quantity = Number(data.get('quantity'));
		const unit = data.get('unit')?.toString();
		const lowStockThreshold = Number(data.get('lowStockThreshold') ?? 5);

		if (!name || !category || !PRODUCT_CATEGORIES.includes(category) || !description || !Number.isFinite(price) || price <= 0) {
			return fail(400, { error: 'Veuillez renseigner les champs obligatoires.' });
		}

		if (!Number.isFinite(quantity) || quantity < 0 || !unit || !STOCK_UNITS.includes(unit)) {
			return fail(400, { error: 'Veuillez renseigner un stock valide.' });
		}

		try {
			const now = new Date().toISOString();

			await writeClient.patch(params.id).set({
				name,
				category,
				price,
				description,
				badge
			}).commit();

			await setProductStock({
				readClient: client,
				writeClient,
				productId: params.id,
				quantity,
				unit,
				lowStockThreshold: Number.isFinite(lowStockThreshold) && lowStockThreshold >= 0
					? lowStockThreshold
					: 5,
				now
			});

			await writeClient.patch(params.id).set({ available: quantity > 0 }).commit();
		} catch (err) {
			console.error('Erreur mise à jour produit:', err);
			return fail(500, { error: 'Erreur lors de la mise à jour du produit.' });
		}

		throw redirect(303, '/admin/products?updated=1');
	}
};
