import { client } from '$lib/sanity.js';
import { aggregateStockEntries } from '$lib/server/stock.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const baseProducts = await client.fetch(`
		*[_type == "product"] | order(category asc, name asc) {
			_id,
			name,
			category,
			available,
			"image": image.asset->url
		}
	`);

	const stockEntries = await client.fetch(`
		*[_type == "stockEntry" && defined(product._ref)] {
			_id,
			quantity,
			unit,
			updatedAt,
			"productId": product._ref
		}
	`);

	const groupedByProduct = stockEntries.reduce((acc, entry) => {
		if (!entry.productId) return acc;
		if (!acc[entry.productId]) acc[entry.productId] = [];
		acc[entry.productId].push(entry);
		return acc;
	}, {});

	const products = baseProducts.map((product) => {
		const { primary, totalQuantity, unit } = aggregateStockEntries(groupedByProduct[product._id] ?? []);
		return {
			...product,
			stock: {
				_id: primary?._id ?? null,
				quantity: totalQuantity,
				unit,
				updatedAt: primary?.updatedAt ?? null
			}
		};
	});

	return {
		products,
		created: url.searchParams.get('created') === '1',
		updated: url.searchParams.get('updated') === '1'
	};
}
