import * as server from '../entries/pages/a-propos/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/a-propos/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/a-propos/+page.server.js";
export const imports = ["_app/immutable/nodes/3.Db82ON4S.js","_app/immutable/chunks/DB6IhUCB.js","_app/immutable/chunks/BW99R-_D.js","_app/immutable/chunks/BEYCGH7o.js","_app/immutable/chunks/BSES2oKg.js","_app/immutable/chunks/BZ07t5f_.js","_app/immutable/chunks/CUoF86B9.js","_app/immutable/chunks/D6UDa1ug.js","_app/immutable/chunks/DerbGazj.js","_app/immutable/chunks/Bx_8wvU-.js","_app/immutable/chunks/DjDrAeGI.js","_app/immutable/chunks/CEpQ2GYW.js"];
export const stylesheets = [];
export const fonts = [];
