import * as server from '../entries/pages/admin/products/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/+page.server.js";
export const imports = ["_app/immutable/nodes/9.Qt4-bmbs.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CNNK7k-J.js","_app/immutable/chunks/DS3_WAnu.js","_app/immutable/chunks/_cpMr-pD.js","_app/immutable/chunks/PZMRa0Cx.js","_app/immutable/chunks/BTSgwHn4.js","_app/immutable/chunks/Cf9UvY2H.js","_app/immutable/chunks/_GoajS-y.js"];
export const stylesheets = [];
export const fonts = [];
