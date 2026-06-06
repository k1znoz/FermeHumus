import * as server from '../entries/pages/admin/login/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/login/+page.server.js";
export const imports = ["_app/immutable/nodes/8.D3pl3Nvd.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CNNK7k-J.js","_app/immutable/chunks/DS3_WAnu.js","_app/immutable/chunks/_cpMr-pD.js","_app/immutable/chunks/C-SwQZe7.js","_app/immutable/chunks/CBJ7arJI.js","_app/immutable/chunks/DDd63-dv.js","_app/immutable/chunks/C_cV6Oer.js","_app/immutable/chunks/DbUdyMxQ.js"];
export const stylesheets = [];
export const fonts = [];
