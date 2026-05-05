import * as server from '../entries/pages/admin/stock/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/stock/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/stock/+page.server.js";
export const imports = ["_app/immutable/nodes/10.B23Aca2j.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/G9nvbAjP.js","_app/immutable/chunks/CE1V8P2P.js","_app/immutable/chunks/BEPcX9rR.js","_app/immutable/chunks/Clb3SH2K.js","_app/immutable/chunks/Dzwjddxm.js","_app/immutable/chunks/CcS08zHf.js","_app/immutable/chunks/BHWQruFt.js","_app/immutable/chunks/CZWWANLr.js","_app/immutable/chunks/BoZLSqe7.js","_app/immutable/chunks/Bg5Yts6F.js","_app/immutable/chunks/K4fHWbAS.js"];
export const stylesheets = [];
export const fonts = [];
