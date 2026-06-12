import * as server from '../entries/pages/admin/products/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/+page.server.js";
export const imports = ["_app/immutable/nodes/9.D6gcXyxz.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BpNUit2C.js","_app/immutable/chunks/CFtk-p1X.js","_app/immutable/chunks/aXS0oh3w.js","_app/immutable/chunks/CkuIzasD.js","_app/immutable/chunks/CwB_Nkvr.js","_app/immutable/chunks/C_brrasM.js","_app/immutable/chunks/C6-lQX8C.js"];
export const stylesheets = [];
export const fonts = [];
