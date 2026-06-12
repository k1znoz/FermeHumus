export const index = 2;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default);
export const imports = [
  '_app/immutable/nodes/2.DMwxjeKO.js',
  '_app/immutable/chunks/CWj6FrbW.js',
  '_app/immutable/chunks/BpNUit2C.js',
  '_app/immutable/chunks/GRI5L9m5.js',
  '_app/immutable/chunks/D0mTwc6i.js',
  '_app/immutable/chunks/CFtk-p1X.js',
  '_app/immutable/chunks/Du9InNji.js',
  '_app/immutable/chunks/aXS0oh3w.js',
  '_app/immutable/chunks/CkuIzasD.js',
  '_app/immutable/chunks/BVF5w8FN.js',
  '_app/immutable/chunks/CwB_Nkvr.js',
  '_app/immutable/chunks/C_brrasM.js',
  '_app/immutable/chunks/CIw2u7yz.js',
  '_app/immutable/chunks/CXZVox8e.js',
  '_app/immutable/chunks/NprSnXPW.js',
];
export const stylesheets = [];
export const fonts = [];
