import { client } from '$lib/sanity.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const products = await client.fetch(`
		*[_type == "product"] | order(category asc, name asc) {
			_id,
			name,
			category,
			available,
			"image": image.asset->url,
			"stock": *[_type == "stockEntry" && product._ref == ^._id][0] {
				_id,
				quantity,
				unit,
				updatedAt
			}
		}
	`);

	return {
		products,
		created: url.searchParams.get('created') === '1'
	};
}
