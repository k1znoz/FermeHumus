import * as server from '../entries/pages/admin/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/5.Br56nTCm.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C6akWLxI.js","_app/immutable/chunks/BU1nDvWL.js","_app/immutable/chunks/rcWAhc1y.js","_app/immutable/chunks/mIQ42c6Q.js","_app/immutable/chunks/CzYh1VgA.js"];
export const stylesheets = [];
export const fonts = [];
