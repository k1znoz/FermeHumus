import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
	dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	useCdn: true
});

const builder = imageUrlBuilder(client);

/** @param {import('@sanity/types').SanityImageSource} source */
export function urlFor(source) {
	return builder.image(source);
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getProducts(category = null) {
	const filter = category ? `&& category == $category` : '';
	return client.fetch(
		`*[_type == "product" ${filter}] | order(_createdAt desc) {
      _id, name, category, price, description, badge,
      "image": image.asset->url
    }`,
		category ? { category } : {}
	);
}

export async function getSiteSettings() {
	return client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getTeam() {
	return client.fetch(
		`*[_type == "teamMember"] | order(order asc) {
      _id, name, role,
      "image": image.asset->url
    }`
	);
}

export async function getMarkets() {
	return client.fetch(`*[_type == "market"] | order(type asc, name asc)`);
}

export async function getFarmStay() {
	return client.fetch(`*[_type == "farmStay"][0]`);
}
