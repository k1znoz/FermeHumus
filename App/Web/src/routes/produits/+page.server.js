import { getProducts } from '$lib/sanity.js';

export async function load() {
	try {
		const products = await getProducts();
		return { products };
	} catch {
		return { products: [] };
	}
}
