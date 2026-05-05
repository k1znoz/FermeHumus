import * as server from '../entries/pages/produits/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/produits/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/produits/+page.server.js";
export const imports = ["_app/immutable/nodes/9.I-8dBn54.js","_app/immutable/chunks/DB6IhUCB.js","_app/immutable/chunks/BW99R-_D.js","_app/immutable/chunks/BEYCGH7o.js","_app/immutable/chunks/Bx_8wvU-.js","_app/immutable/chunks/BSES2oKg.js","_app/immutable/chunks/BZ07t5f_.js","_app/immutable/chunks/D6UDa1ug.js","_app/immutable/chunks/DerbGazj.js","_app/immutable/chunks/DjDrAeGI.js","_app/immutable/chunks/CEpQ2GYW.js","_app/immutable/chunks/CUoF86B9.js"];
export const stylesheets = [];
export const fonts = [];
