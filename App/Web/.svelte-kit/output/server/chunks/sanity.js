import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { C as CATEGORY_VISIBILITY_WINDOWS } from "./constants.js";
function toMonthDayNumber(month, day) {
  const m = Number(month);
  const d = Number(day);
  if (!Number.isInteger(m) || !Number.isInteger(d) || m < 1 || m > 12 || d < 1 || d > 31) {
    return null;
  }
  return m * 100 + d;
}
function isWithinWindow(date, start, end) {
  const current = date.getMonth() + 1;
  const today = date.getDate();
  const currentValue = current * 100 + today;
  const startValue = toMonthDayNumber(start?.month, start?.day);
  const endValue = toMonthDayNumber(end?.month, end?.day);
  if (startValue == null || endValue == null) {
    return true;
  }
  if (startValue <= endValue) {
    return currentValue >= startValue && currentValue <= endValue;
  }
  return currentValue >= startValue || currentValue <= endValue;
}
function getProductWindow(product) {
  if (product.visibilityMode === "always") {
    return null;
  }
  if (product.visibilityMode === "custom") {
    return {
      start: {
        month: product.seasonStartMonth,
        day: product.seasonStartDay
      },
      end: {
        month: product.seasonEndMonth,
        day: product.seasonEndDay
      }
    };
  }
  return CATEGORY_VISIBILITY_WINDOWS[product.category] ?? null;
}
function isProductVisibleToday(product, date = /* @__PURE__ */ new Date()) {
  const window = getProductWindow(product);
  if (!window) {
    return true;
  }
  return isWithinWindow(date, window.start, window.end);
}
const client = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false
});
createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: void 0
});
imageUrlBuilder(client);
async function getProducts(category = null) {
  const filter = category ? `&& category == $category` : "";
  const products = await client.fetch(
    `*[_type == "product" ${filter} && available == true] | order(_createdAt desc) {
			_id,
			name,
			category,
			price,
			description,
			badge,
			visibilityMode,
			seasonStartMonth,
			seasonStartDay,
			seasonEndMonth,
			seasonEndDay,
			"image": image.asset->url,
			"stock": *[_type == "stockEntry" && product._ref == ^._id][0] {
				quantity,
				unit,
				lowStockThreshold
			}
		}`,
    category ? { category } : {}
  );
  return products.filter((product) => isProductVisibleToday(product));
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
  getSiteSettings as g
};
