import { client } from '$lib/sanity.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const harvests = await client.fetch(`
		*[_type == "harvestEntry"] | order(_createdAt desc) {
			_id,
			quantity,
			unit,
			harvestDate,
			recordedBy,
			terrainCondition,
			notes,
			"product": product->{ name, category }
		}
	`);
	return { harvests };
}
