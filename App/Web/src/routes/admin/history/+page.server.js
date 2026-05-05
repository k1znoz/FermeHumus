import { client } from '$lib/sanity.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [harvests, transformations] = await Promise.all([
		client.fetch(`
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
		`),
		client.fetch(`
			*[_type == "transformationEntry"] | order(transformedAt desc) {
				_id,
				inputQuantity,
				inputUnit,
				outputQuantity,
				outputUnit,
				estimatedWaste,
				batchNumber,
				notes,
				recordedBy,
				transformedAt,
				"inputProduct": inputProduct->{ name, category },
				"outputProduct": outputProduct->{ name, category }
			}
		`)
	]);

	const events = [
		...harvests.map((entry) => ({
			...entry,
			type: 'harvest',
			eventDate: entry.harvestDate
		})),
		...transformations.map((entry) => ({
			...entry,
			type: 'transformation',
			eventDate: entry.transformedAt ? entry.transformedAt.slice(0, 10) : null
		}))
	].sort((a, b) => new Date(b.eventDate ?? 0).getTime() - new Date(a.eventDate ?? 0).getTime());

	return { events };
}
