import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.bB7Ceu-t.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C6akWLxI.js","_app/immutable/chunks/BU1nDvWL.js","_app/immutable/chunks/rcWAhc1y.js","_app/immutable/chunks/mIQ42c6Q.js","_app/immutable/chunks/B02YeozN.js","_app/immutable/chunks/1_cVcJn_.js","_app/immutable/chunks/BEETywSD.js","_app/immutable/chunks/Cq4HrXvZ.js","_app/immutable/chunks/CAk4OO_c.js","_app/immutable/chunks/D0mzrR9L.js"];
export const stylesheets = [];
export const fonts = [];
