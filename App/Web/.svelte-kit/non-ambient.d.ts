
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/a-propos" | "/admin" | "/admin/harvest" | "/admin/history" | "/admin/login" | "/admin/logout" | "/admin/stock" | "/admin/transform" | "/cgu" | "/cgv" | "/mentions-legales" | "/ou-nous-trouver" | "/politique-de-confidentialite" | "/produits" | "/reserver";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/a-propos": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/harvest": Record<string, never>;
			"/admin/history": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/logout": Record<string, never>;
			"/admin/stock": Record<string, never>;
			"/admin/transform": Record<string, never>;
			"/cgu": Record<string, never>;
			"/cgv": Record<string, never>;
			"/mentions-legales": Record<string, never>;
			"/ou-nous-trouver": Record<string, never>;
			"/politique-de-confidentialite": Record<string, never>;
			"/produits": Record<string, never>;
			"/reserver": Record<string, never>
		};
		Pathname(): "/" | "/a-propos" | "/admin" | "/admin/harvest" | "/admin/history" | "/admin/login" | "/admin/logout" | "/admin/stock" | "/admin/transform" | "/cgu" | "/cgv" | "/mentions-legales" | "/ou-nous-trouver" | "/politique-de-confidentialite" | "/produits" | "/reserver";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}