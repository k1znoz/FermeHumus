import { client } from '$lib/sanity.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

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
		if (!env.SANITY_API_WRITE_TOKEN) {
			return fail(500, {
				error: 'SANITY_API_WRITE_TOKEN est manquant. Impossible d\'enregistrer la recolte.'
			});
		}

		const writeClient = getWriteClient();

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

		try {
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

			const stockEntry = await client.fetch(
				`*[_type == "stockEntry" && product._ref == $productId][0]{ _id, quantity, lowStockThreshold, unit }`,
				{ productId }
			);

			const nextQuantity = (stockEntry?.quantity ?? 0) + quantity;
			const now = new Date().toISOString();

			if (stockEntry?._id) {
				await writeClient
					.patch(stockEntry._id)
					.set({ quantity: nextQuantity, updatedAt: now, unit: stockEntry.unit ?? unit })
					.commit();
			} else {
				await writeClient.create({
					_type: 'stockEntry',
					product: { _type: 'reference', _ref: productId },
					quantity: nextQuantity,
					unit,
					lowStockThreshold: 5,
					updatedAt: now
				});
			}

			await writeClient.patch(productId).set({ available: nextQuantity > 0 }).commit();

			throw redirect(303, '/admin');
		} catch (error) {
			console.error('Erreur enregistrement recolte:', error);
			return fail(500, {
				error: 'Erreur serveur pendant l\'enregistrement de la recolte.'
			});
		}
	}
};
