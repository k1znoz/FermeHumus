import { client, writeClient } from '$lib/sanity.js';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const stocks = await client.fetch(`
		*[_type == "stockEntry"] | order(product->category asc, product->name asc) {
			_id,
			quantity,
			unit,
			lowStockThreshold,
			"product": product->{ _id, name, category, "image": image.asset->url }
		}
	`);
	return { stocks };
}

/** @type {import('./$types').Actions} */
export const actions = {
	updateStock: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const quantity = Number(data.get('quantity'));

		if (!id || isNaN(quantity) || quantity < 0) {
			return fail(400, { error: 'Données invalides.' });
		}

		await writeClient
			.patch(id)
			.set({ quantity, updatedAt: new Date().toISOString() })
			.commit();

		return { success: true };
	}
};
