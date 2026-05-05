import * as server from '../entries/pages/admin/history/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/history/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/history/+page.server.js";
export const imports = ["_app/immutable/nodes/7.Cq_Yvc4z.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/G9nvbAjP.js","_app/immutable/chunks/CE1V8P2P.js","_app/immutable/chunks/BEPcX9rR.js","_app/immutable/chunks/Clb3SH2K.js","_app/immutable/chunks/Bg5Yts6F.js"];
export const stylesheets = [];
export const fonts = [];
