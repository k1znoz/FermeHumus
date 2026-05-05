import * as server from '../entries/pages/admin/login/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/login/+page.server.js";
export const imports = ["_app/immutable/nodes/8.Cn8_L4Y0.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/G9nvbAjP.js","_app/immutable/chunks/CE1V8P2P.js","_app/immutable/chunks/BEPcX9rR.js","_app/immutable/chunks/D1NLfJJ6.js","_app/immutable/chunks/CCli0n7F.js","_app/immutable/chunks/Bfnj5S2z.js","_app/immutable/chunks/BHWQruFt.js","_app/immutable/chunks/CZWWANLr.js"];
export const stylesheets = [];
export const fonts = [];
