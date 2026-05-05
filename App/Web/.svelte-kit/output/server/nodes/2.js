import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.BBE3cwmr.js","_app/immutable/chunks/DB6IhUCB.js","_app/immutable/chunks/BW99R-_D.js","_app/immutable/chunks/BEYCGH7o.js","_app/immutable/chunks/Bx_8wvU-.js","_app/immutable/chunks/BSES2oKg.js","_app/immutable/chunks/BZ07t5f_.js","_app/immutable/chunks/CUoF86B9.js","_app/immutable/chunks/DerbGazj.js","_app/immutable/chunks/DjDrAeGI.js","_app/immutable/chunks/CEpQ2GYW.js"];
export const stylesheets = [];
export const fonts = [];
