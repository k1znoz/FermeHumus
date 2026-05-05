import { getFarmStay } from '$lib/sanity.js';

export async function load() {
	try {
		const farmStay = await getFarmStay();
		return { farmStay };
	} catch {
		return { farmStay: null };
	}
}
