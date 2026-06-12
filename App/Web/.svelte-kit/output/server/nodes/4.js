import * as server from '../entries/pages/a-propos/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/a-propos/_page.svelte.js')).default);
export { server };
export const server_id = 'src/routes/a-propos/+page.server.js';
export const imports = [
  '_app/immutable/nodes/4.CaJCNZgy.js',
  '_app/immutable/chunks/CWj6FrbW.js',
  '_app/immutable/chunks/BpNUit2C.js',
  '_app/immutable/chunks/CFtk-p1X.js',
  '_app/immutable/chunks/CkuIzasD.js',
  '_app/immutable/chunks/BVF5w8FN.js',
  '_app/immutable/chunks/CwB_Nkvr.js',
  '_app/immutable/chunks/C_brrasM.js',
  '_app/immutable/chunks/Dxx4ZRBS.js',
  '_app/immutable/chunks/aXS0oh3w.js',
  '_app/immutable/chunks/D7E7u6D4.js',
  '_app/immutable/chunks/GRI5L9m5.js',
  '_app/immutable/chunks/D0mTwc6i.js',
];
export const stylesheets = [];
export const fonts = [];
