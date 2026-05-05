import { getProducts, getSiteSettings } from '$lib/sanity.js';

export async function load() {
	try {
		const [settings, featuredProducts] = await Promise.all([
			getSiteSettings(),
			getProducts()
		]);
		return { settings, featuredProducts: featuredProducts.slice(0, 3) };
	} catch {
		return { settings: null, featuredProducts: [] };
	}
}
