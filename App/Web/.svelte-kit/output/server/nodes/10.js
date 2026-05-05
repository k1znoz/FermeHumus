import * as server from '../entries/pages/admin/transform/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/transform/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/transform/+page.server.js";
export const imports = ["_app/immutable/nodes/10.LuR6JFf6.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/G9nvbAjP.js","_app/immutable/chunks/CE1V8P2P.js","_app/immutable/chunks/BEPcX9rR.js","_app/immutable/chunks/Clb3SH2K.js","_app/immutable/chunks/BoZLSqe7.js"];
export const stylesheets = [];
export const fonts = [];
