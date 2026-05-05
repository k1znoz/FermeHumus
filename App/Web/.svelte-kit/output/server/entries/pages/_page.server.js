import { g as getSiteSettings, a as getProducts } from "../../chunks/sanity.js";
async function load() {
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
export {
  load
};
