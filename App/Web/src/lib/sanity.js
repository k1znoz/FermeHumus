import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
	dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	useCdn: true
});

// Client avec token pour les mutations (write) côté serveur uniquement
export const writeClient = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
	dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	useCdn: false,
	token: import.meta.env.SANITY_API_WRITE_TOKEN
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
		`*[_type == "product" ${filter} && coalesce(*[_type == "stockEntry" && product._ref == ^._id][0].quantity, 0) > 0] | order(_createdAt desc) {
			_id,
			name,
			category,
			price,
			description,
			badge,
			"image": image.asset->url,
			"stock": *[_type == "stockEntry" && product._ref == ^._id][0] {
				quantity,
				unit,
				lowStockThreshold
			}
		}`,
		category ? { category } : {}
	);
}

export async function getSiteSettings() {
	return client.fetch(`*[_type == "siteSettings"][0] {
		heroTitle, heroSubtitle, philosophyTitle, philosophyBody, newsletterEnabled,
		"heroImage": heroImage.asset->url,
		"philosophyImage": philosophyImage.asset->url
	}`);
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
