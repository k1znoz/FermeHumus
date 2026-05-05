import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const client = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true
});
const writeClient = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: void 0
});
imageUrlBuilder(client);
async function getProducts(category = null) {
  const filter = category ? `&& category == $category` : "";
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
async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0] {
		heroTitle, heroSubtitle, philosophyTitle, philosophyBody, newsletterEnabled,
		"heroImage": heroImage.asset->url,
		"philosophyImage": philosophyImage.asset->url
	}`);
}
async function getTeam() {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role,
      "image": image.asset->url
    }`
  );
}
async function getMarkets() {
  return client.fetch(`*[_type == "market"] | order(type asc, name asc)`);
}
async function getFarmStay() {
  return client.fetch(`*[_type == "farmStay"][0]`);
}
export {
  getProducts as a,
  getTeam as b,
  client as c,
  getMarkets as d,
  getFarmStay as e,
  getSiteSettings as g,
  writeClient as w
};
