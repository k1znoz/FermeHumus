import { a as getProducts } from "../../../chunks/sanity.js";
async function load() {
  try {
    const products = await getProducts();
    return { products };
  } catch {
    return { products: [] };
  }
}
export {
  load
};
