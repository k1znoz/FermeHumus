import * as server from '../entries/pages/a-propos/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/a-propos/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/a-propos/+page.server.js";
export const imports = ["_app/immutable/nodes/4.DL4lNi1m.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CNNK7k-J.js","_app/immutable/chunks/DS3_WAnu.js","_app/immutable/chunks/PZMRa0Cx.js","_app/immutable/chunks/C-SwQZe7.js","_app/immutable/chunks/BTSgwHn4.js","_app/immutable/chunks/Cf9UvY2H.js","_app/immutable/chunks/BY__OX5J.js","_app/immutable/chunks/_cpMr-pD.js","_app/immutable/chunks/BYM7duzX.js","_app/immutable/chunks/CPBebBFu.js","_app/immutable/chunks/DbUdyMxQ.js"];
export const stylesheets = [];
export const fonts = [];
