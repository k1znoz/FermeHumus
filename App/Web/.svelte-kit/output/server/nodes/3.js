import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.ByDJ-TcF.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BpNUit2C.js","_app/immutable/chunks/CFtk-p1X.js","_app/immutable/chunks/aXS0oh3w.js","_app/immutable/chunks/CkuIzasD.js","_app/immutable/chunks/BVF5w8FN.js","_app/immutable/chunks/CwB_Nkvr.js","_app/immutable/chunks/Dxx4ZRBS.js","_app/immutable/chunks/D7E7u6D4.js","_app/immutable/chunks/GRI5L9m5.js","_app/immutable/chunks/D0mTwc6i.js"];
export const stylesheets = [];
export const fonts = [];
