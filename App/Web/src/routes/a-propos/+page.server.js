import { getTeam } from '$lib/sanity.js';

export async function load() {
	try {
		const team = await getTeam();
		return { team };
	} catch {
		return { team: [] };
	}
}
