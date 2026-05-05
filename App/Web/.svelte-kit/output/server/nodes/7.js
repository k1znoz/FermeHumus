import * as server from '../entries/pages/ou-nous-trouver/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ou-nous-trouver/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/ou-nous-trouver/+page.server.js";
export const imports = ["_app/immutable/nodes/7.DZnkDAUG.js","_app/immutable/chunks/DB6IhUCB.js","_app/immutable/chunks/BW99R-_D.js","_app/immutable/chunks/BEYCGH7o.js","_app/immutable/chunks/Bx_8wvU-.js","_app/immutable/chunks/BSES2oKg.js","_app/immutable/chunks/BZ07t5f_.js"];
export const stylesheets = [];
export const fonts = [];
