import { client } from '$lib/sanity.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const units = ['kg', 'pcs', 'botte', 'barquette', 'doz', 'pot', 'L'];

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const [rawStocks, transformedProducts] = await Promise.all([
		client.fetch(`
			*[_type == "stockEntry" && defined(product) && product->category != "Produits transformés"]
			| order(product->name asc) {
				_id,
				quantity,
				unit,
				"product": product->{ _id, name, category, "image": image.asset->url }
			}
		`),
		client.fetch(`
			*[_type == "product" && category == "Produits transformés"] | order(name asc) {
				_id,
				name,
				category
			}
		`)
	]);

	return {
		rawStocks,
		transformedProducts,
		units,
		success: url.searchParams.get('success') === '1'
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		if (!env.SANITY_API_WRITE_TOKEN) {
			return fail(500, {
				error: 'SANITY_API_WRITE_TOKEN est manquant. Impossible d\'enregistrer la transformation.'
			});
		}

		const writeClient = getWriteClient();

		const data = await request.formData();

		const inputProductId = data.get('inputProductId')?.toString();
		const inputQuantity = Number(data.get('inputQuantity'));
		const inputUnit = data.get('inputUnit')?.toString();
		const outputProductId = data.get('outputProductId')?.toString();
		const outputQuantity = Number(data.get('outputQuantity'));
		const outputUnit = data.get('outputUnit')?.toString();
		const estimatedWaste = Number(data.get('estimatedWaste') || 0);
		const batchNumber = data.get('batchNumber')?.toString();
		const notes = data.get('notes')?.toString() || null;
		const recordedBy = data.get('recordedBy')?.toString() || null;

		if (
			!inputProductId ||
			!outputProductId ||
			!batchNumber ||
			!inputUnit ||
			!outputUnit ||
			!units.includes(outputUnit) ||
			!Number.isFinite(inputQuantity) ||
			inputQuantity <= 0 ||
			!Number.isFinite(outputQuantity) ||
			outputQuantity <= 0 ||
			!Number.isFinite(estimatedWaste) ||
			estimatedWaste < 0
		) {
			return fail(400, { error: 'Veuillez renseigner tous les champs obligatoires.' });
		}

		const inputStock = await client.fetch(
			`*[_type == "stockEntry" && product._ref == $productId][0]{ _id, quantity, unit }`,
			{ productId: inputProductId }
		);

		if (!inputStock) {
			return fail(400, { error: 'Stock introuvable pour le produit brut selectionne.' });
		}

		if ((inputStock.quantity ?? 0) < inputQuantity) {
			return fail(400, {
				error: `Stock insuffisant. Disponible: ${inputStock.quantity ?? 0} ${inputStock.unit ?? ''}`
			});
		}

		const outputStock = await client.fetch(
			`*[_type == "stockEntry" && product._ref == $productId][0]{ _id, quantity, lowStockThreshold }`,
			{ productId: outputProductId }
		);

		try {
			const now = new Date().toISOString();
			const nextInputQuantity = (inputStock.quantity ?? 0) - inputQuantity;
			const nextOutputQuantity = (outputStock?.quantity ?? 0) + outputQuantity;

			await writeClient
				.patch(inputStock._id)
				.set({ quantity: nextInputQuantity, updatedAt: now })
				.commit();

			if (outputStock?._id) {
				await writeClient
					.patch(outputStock._id)
					.set({ quantity: nextOutputQuantity, unit: outputUnit, updatedAt: now })
					.commit();
			} else {
				await writeClient.create({
					_type: 'stockEntry',
					product: { _type: 'reference', _ref: outputProductId },
					quantity: nextOutputQuantity,
					unit: outputUnit,
					lowStockThreshold: 5,
					updatedAt: now
				});
			}

			await writeClient.patch(inputProductId).set({ available: nextInputQuantity > 0 }).commit();
			await writeClient.patch(outputProductId).set({ available: nextOutputQuantity > 0 }).commit();

			await writeClient.create({
				_type: 'transformationEntry',
				inputProduct: { _type: 'reference', _ref: inputProductId },
				inputQuantity,
				inputUnit,
				outputProduct: { _type: 'reference', _ref: outputProductId },
				outputQuantity,
				outputUnit,
				estimatedWaste,
				batchNumber,
				notes,
				recordedBy,
				transformedAt: now
			});

			throw redirect(303, '/admin/transform?success=1');
		} catch (error) {
			console.error('Erreur enregistrement transformation:', error);
			return fail(500, {
				error: 'Erreur serveur pendant l\'enregistrement de la transformation.'
			});
		}
	}
};
