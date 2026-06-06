import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.CF76j8Fi.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CNNK7k-J.js","_app/immutable/chunks/DS3_WAnu.js","_app/immutable/chunks/_cpMr-pD.js","_app/immutable/chunks/PZMRa0Cx.js","_app/immutable/chunks/C-SwQZe7.js","_app/immutable/chunks/BTSgwHn4.js","_app/immutable/chunks/BY__OX5J.js","_app/immutable/chunks/BYM7duzX.js","_app/immutable/chunks/CPBebBFu.js","_app/immutable/chunks/DbUdyMxQ.js"];
export const stylesheets = [];
export const fonts = [];
