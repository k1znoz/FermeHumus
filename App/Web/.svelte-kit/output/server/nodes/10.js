import * as server from '../entries/pages/admin/products/new/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/new/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/new/+page.server.js";
export const imports = ["_app/immutable/nodes/10.BWSfXVz6.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C6akWLxI.js","_app/immutable/chunks/BU1nDvWL.js","_app/immutable/chunks/rcWAhc1y.js","_app/immutable/chunks/mIQ42c6Q.js","_app/immutable/chunks/C_J--DCf.js","_app/immutable/chunks/BH_716I9.js","_app/immutable/chunks/CvRUJbV1.js","_app/immutable/chunks/D0mzrR9L.js","_app/immutable/chunks/1_cVcJn_.js"];
export const stylesheets = [];
export const fonts = [];
