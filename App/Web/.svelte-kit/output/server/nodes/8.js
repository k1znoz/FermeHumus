import * as server from '../entries/pages/admin/login/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/login/+page.server.js";
export const imports = ["_app/immutable/nodes/8.BogwzLTG.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C6akWLxI.js","_app/immutable/chunks/BU1nDvWL.js","_app/immutable/chunks/rcWAhc1y.js","_app/immutable/chunks/B02YeozN.js","_app/immutable/chunks/C_J--DCf.js","_app/immutable/chunks/BH_716I9.js","_app/immutable/chunks/CvRUJbV1.js","_app/immutable/chunks/D0mzrR9L.js"];
export const stylesheets = [];
export const fonts = [];
