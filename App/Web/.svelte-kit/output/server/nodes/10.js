import * as server from '../entries/pages/admin/products/new/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/admin/products/new/_page.svelte.js'))
    .default);
export { server };
export const server_id = 'src/routes/admin/products/new/+page.server.js';
export const imports = [
  '_app/immutable/nodes/10.DVI11nBa.js',
  '_app/immutable/chunks/CWj6FrbW.js',
  '_app/immutable/chunks/BpNUit2C.js',
  '_app/immutable/chunks/CFtk-p1X.js',
  '_app/immutable/chunks/aXS0oh3w.js',
  '_app/immutable/chunks/CkuIzasD.js',
  '_app/immutable/chunks/D-PHEfAp.js',
  '_app/immutable/chunks/CXZVox8e.js',
  '_app/immutable/chunks/NprSnXPW.js',
  '_app/immutable/chunks/D0mTwc6i.js',
  '_app/immutable/chunks/CwB_Nkvr.js',
];
export const stylesheets = [];
export const fonts = [];
