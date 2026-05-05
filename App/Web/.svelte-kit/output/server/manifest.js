export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BzwzdlMJ.js",app:"_app/immutable/entry/app.Bynm0KAT.js",imports:["_app/immutable/entry/start.BzwzdlMJ.js","_app/immutable/chunks/DMnzFy0G.js","_app/immutable/chunks/BW99R-_D.js","_app/immutable/chunks/CEpQ2GYW.js","_app/immutable/chunks/B6yCXVl_.js","_app/immutable/entry/app.Bynm0KAT.js","_app/immutable/chunks/BW99R-_D.js","_app/immutable/chunks/BEYCGH7o.js","_app/immutable/chunks/DB6IhUCB.js","_app/immutable/chunks/B6yCXVl_.js","_app/immutable/chunks/Bx_8wvU-.js","_app/immutable/chunks/DjDrAeGI.js","_app/immutable/chunks/CEpQ2GYW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/a-propos",
				pattern: /^\/a-propos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/cgu",
				pattern: /^\/cgu\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/cgv",
				pattern: /^\/cgv\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/mentions-legales",
				pattern: /^\/mentions-legales\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/ou-nous-trouver",
				pattern: /^\/ou-nous-trouver\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/politique-de-confidentialite",
				pattern: /^\/politique-de-confidentialite\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/produits",
				pattern: /^\/produits\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/reserver",
				pattern: /^\/reserver\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
