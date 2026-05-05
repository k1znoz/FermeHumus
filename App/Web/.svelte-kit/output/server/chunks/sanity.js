import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const client = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true
});
imageUrlBuilder(client);
async function getProducts(category = null) {
  const filter = category ? `&& category == $category` : "";
  return client.fetch(
    `*[_type == "product" ${filter}] | order(_createdAt desc) {
      _id, name, category, price, description, badge,
      "image": image.asset->url
    }`,
    category ? { category } : {}
  );
}
async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
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
  getMarkets as c,
  getFarmStay as d,
  getSiteSettings as g
};
