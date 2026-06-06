import * as server from '../entries/pages/admin/history/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/history/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/history/+page.server.js";
export const imports = ["_app/immutable/nodes/7.cyJCRfz5.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CNNK7k-J.js","_app/immutable/chunks/DS3_WAnu.js","_app/immutable/chunks/_cpMr-pD.js","_app/immutable/chunks/PZMRa0Cx.js","_app/immutable/chunks/Cf9UvY2H.js"];
export const stylesheets = [];
export const fonts = [];
