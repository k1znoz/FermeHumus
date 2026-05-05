import { getMarkets } from '$lib/sanity.js';

export async function load() {
	try {
		const markets = await getMarkets();
		return { markets };
	} catch {
		return { markets: [] };
	}
}
