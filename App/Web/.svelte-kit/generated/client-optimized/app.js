export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/a-propos": [~4],
		"/admin": [~5,[2]],
		"/admin/harvest": [~6,[2]],
		"/admin/history": [~7,[2]],
		"/admin/login": [8,[2]],
		"/admin/products/new": [~9,[2]],
		"/admin/stock": [~10,[2]],
		"/admin/transform": [~11,[2]],
		"/cgu": [12],
		"/cgv": [13],
		"/mentions-legales": [14],
		"/ou-nous-trouver": [~15],
		"/politique-de-confidentialite": [16],
		"/produits": [~17],
		"/reserver": [~18]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';