import { d as getFarmStay } from "../../../chunks/sanity.js";
async function load() {
  try {
    const farmStay = await getFarmStay();
    return { farmStay };
  } catch {
    return { farmStay: null };
  }
}
export {
  load
};
