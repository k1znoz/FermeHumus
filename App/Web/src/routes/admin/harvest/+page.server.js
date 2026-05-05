import { client, writeClient } from '$lib/sanity.js';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const products = await client.fetch(`
		*[_type == "product"] | order(name asc) { _id, name, category }
	`);
	return { products };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const productId = data.get('productId')?.toString();
		const quantity = Number(data.get('quantity'));
		const unit = data.get('unit')?.toString();
		const harvestDate = data.get('harvestDate')?.toString();
		const terrainCondition = data.get('terrainCondition')?.toString() || null;
		const notes = data.get('notes')?.toString() || null;
		const recordedBy = data.get('recordedBy')?.toString() || null;

		if (!productId || !quantity || quantity <= 0 || !unit || !harvestDate) {
			return fail(400, { error: 'Veuillez remplir tous les champs obligatoires.' });
		}

		// Crée la récolte
		await writeClient.create({
			_type: 'harvestEntry',
			product: { _type: 'reference', _ref: productId },
			quantity,
			unit,
			harvestDate,
			terrainCondition,
			notes,
			recordedBy
		});

		// Met à jour le stock correspondant (additionne)
		const stockEntry = await client.fetch(
			`*[_type == "stockEntry" && product._ref == $productId][0]{ _id, quantity }`,
			{ productId }
		);

		if (stockEntry) {
			await writeClient
				.patch(stockEntry._id)
				.set({ quantity: (stockEntry.quantity ?? 0) + quantity, updatedAt: new Date().toISOString() })
				.commit();
		}

		throw redirect(303, '/admin');
	}
};
