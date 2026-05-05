import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.BwRjDF7o.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/G9nvbAjP.js","_app/immutable/chunks/CE1V8P2P.js","_app/immutable/chunks/BEPcX9rR.js","_app/immutable/chunks/Clb3SH2K.js","_app/immutable/chunks/D1NLfJJ6.js","_app/immutable/chunks/BoZLSqe7.js","_app/immutable/chunks/C3Ygi0jL.js","_app/immutable/chunks/BJlLIRcP.js","_app/immutable/chunks/hm26YSx6.js","_app/immutable/chunks/CZWWANLr.js"];
export const stylesheets = [];
export const fonts = [];
