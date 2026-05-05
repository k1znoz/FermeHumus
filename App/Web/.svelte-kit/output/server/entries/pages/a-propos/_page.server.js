import { b as getTeam } from "../../../chunks/sanity.js";
async function load() {
  try {
    const team = await getTeam();
    return { team };
  } catch {
    return { team: [] };
  }
}
export {
  load
};
