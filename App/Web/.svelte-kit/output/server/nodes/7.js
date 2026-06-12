import * as server from '../entries/pages/admin/history/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/admin/history/_page.svelte.js')).default);
export { server };
export const server_id = 'src/routes/admin/history/+page.server.js';
export const imports = [
  '_app/immutable/nodes/7.DwDs00s8.js',
  '_app/immutable/chunks/CWj6FrbW.js',
  '_app/immutable/chunks/BpNUit2C.js',
  '_app/immutable/chunks/CFtk-p1X.js',
  '_app/immutable/chunks/aXS0oh3w.js',
  '_app/immutable/chunks/CkuIzasD.js',
  '_app/immutable/chunks/C_brrasM.js',
];
export const stylesheets = [];
export const fonts = [];
