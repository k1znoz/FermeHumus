import * as server from '../entries/pages/admin/login/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/admin/login/_page.svelte.js')).default);
export { server };
export const server_id = 'src/routes/admin/login/+page.server.js';
export const imports = [
  '_app/immutable/nodes/8.ol39Os5-.js',
  '_app/immutable/chunks/CWj6FrbW.js',
  '_app/immutable/chunks/BpNUit2C.js',
  '_app/immutable/chunks/CFtk-p1X.js',
  '_app/immutable/chunks/aXS0oh3w.js',
  '_app/immutable/chunks/BVF5w8FN.js',
  '_app/immutable/chunks/D-PHEfAp.js',
  '_app/immutable/chunks/CXZVox8e.js',
  '_app/immutable/chunks/NprSnXPW.js',
  '_app/immutable/chunks/D0mTwc6i.js',
];
export const stylesheets = [];
export const fonts = [];
