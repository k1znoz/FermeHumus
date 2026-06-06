import * as server from '../entries/pages/admin/products/new/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/new/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/new/+page.server.js";
export const imports = ["_app/immutable/nodes/10.DQSiIa2R.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CNNK7k-J.js","_app/immutable/chunks/DS3_WAnu.js","_app/immutable/chunks/_cpMr-pD.js","_app/immutable/chunks/PZMRa0Cx.js","_app/immutable/chunks/CBJ7arJI.js","_app/immutable/chunks/DDd63-dv.js","_app/immutable/chunks/C_cV6Oer.js","_app/immutable/chunks/DbUdyMxQ.js","_app/immutable/chunks/BTSgwHn4.js"];
export const stylesheets = [];
export const fonts = [];
