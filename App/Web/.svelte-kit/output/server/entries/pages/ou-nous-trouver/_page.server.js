import { c as getMarkets } from "../../../chunks/sanity.js";
async function load() {
  try {
    const markets = await getMarkets();
    return { markets };
  } catch {
    return { markets: [] };
  }
}
export {
  load
};
