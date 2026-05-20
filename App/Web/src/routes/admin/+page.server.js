import { client } from '$lib/sanity.js';
import { aggregateStockEntries } from '$lib/server/stock.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [products, stockEntries, recentHarvests] = await Promise.all([
		client.fetch(`
			*[_type == "product"] | order(category asc, name asc) {
				_id,
				name,
				category
			}
		`),
		client.fetch(`
			*[_type == "stockEntry"] {
				_id,
				quantity,
				unit,
				lowStockThreshold,
				updatedAt,
				"productId": product._ref
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

	const groupedByProduct = stockEntries.reduce((acc, entry) => {
		if (!entry.productId) return acc;
		if (!acc[entry.productId]) acc[entry.productId] = [];
		acc[entry.productId].push(entry);
		return acc;
	}, {});

	const stocks = products.map((product) => {
		const { primary, totalQuantity, unit, lowStockThreshold } = aggregateStockEntries(groupedByProduct[product._id] ?? []);
		return {
			_id: primary?._id ?? `virtual-${product._id}`,
			quantity: totalQuantity,
			unit,
			lowStockThreshold,
			updatedAt: primary?.updatedAt ?? null,
			product
		};
	});

	const lowStock = stocks.filter(
		(s) => s.lowStockThreshold != null && s.quantity <= s.lowStockThreshold
	);

	const totalValue = 0; // Placeholder, peut être calculé si prix associé

	return { stocks, recentHarvests, lowStockCount: lowStock.length, totalValue };
}
