import { client } from '$lib/sanity.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [stocks, recentHarvests] = await Promise.all([
		client.fetch(`
			*[_type == "stockEntry"] {
				_id,
				quantity,
				unit,
				lowStockThreshold,
				updatedAt,
				"product": product->{ _id, name, category }
			}
		`),
		client.fetch(`
			*[_type == "harvestEntry"] | order(_createdAt desc) [0...5] {
				_id,
				quantity,
				unit,
				harvestDate,
				recordedBy,
				"product": product->{ name }
			}
		`)
	]);

	const lowStock = stocks.filter(
		(s) => s.lowStockThreshold != null && s.quantity <= s.lowStockThreshold
	);

	const totalValue = 0; // Placeholder, peut être calculé si prix associé

	return { stocks, recentHarvests, lowStockCount: lowStock.length, totalValue };
}
