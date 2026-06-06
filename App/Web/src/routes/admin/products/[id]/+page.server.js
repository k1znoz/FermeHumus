import { client } from '$lib/sanity.js';
import { PRODUCT_CATEGORIES } from '$lib/constants.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const product = await client.fetch(
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
	);

	if (!product) {
		throw redirect(303, '/admin/products');
	}

	return { product, categories: PRODUCT_CATEGORIES };
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
		const available = data.get('available') === 'true';

		if (!name || !category || !PRODUCT_CATEGORIES.includes(category) || !description || !Number.isFinite(price) || price <= 0) {
			return fail(400, { error: 'Veuillez renseigner les champs obligatoires.' });
		}

		try {
			await writeClient.patch(params.id).set({
				name,
				category,
				price,
				description,
				badge,
				available
			}).commit();
		} catch (err) {
			console.error('Erreur mise à jour produit:', err);
			return fail(500, { error: 'Erreur lors de la mise à jour du produit.' });
		}

		throw redirect(303, '/admin/products?updated=1');
	}
};
