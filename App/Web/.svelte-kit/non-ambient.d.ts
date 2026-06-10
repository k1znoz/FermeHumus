
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
		RouteId(): "/" | "/a-propos" | "/admin" | "/admin/harvest" | "/admin/history" | "/admin/login" | "/admin/logout" | "/admin/products" | "/admin/products/new" | "/admin/products/[id]" | "/admin/stock" | "/admin/transform" | "/cgu" | "/cgv" | "/contact" | "/mentions-legales" | "/ou-nous-trouver" | "/politique-de-confidentialite" | "/produits" | "/produits/confirmation" | "/reserver";
		RouteParams(): {
			"/admin/products/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/a-propos": Record<string, never>;
			"/admin": { id?: string };
			"/admin/harvest": Record<string, never>;
			"/admin/history": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/logout": Record<string, never>;
			"/admin/products": { id?: string };
			"/admin/products/new": Record<string, never>;
			"/admin/products/[id]": { id: string };
			"/admin/stock": Record<string, never>;
			"/admin/transform": Record<string, never>;
			"/cgu": Record<string, never>;
			"/cgv": Record<string, never>;
			"/contact": Record<string, never>;
			"/mentions-legales": Record<string, never>;
			"/ou-nous-trouver": Record<string, never>;
			"/politique-de-confidentialite": Record<string, never>;
			"/produits": Record<string, never>;
			"/produits/confirmation": Record<string, never>;
			"/reserver": Record<string, never>
		};
		Pathname(): "/" | "/a-propos" | "/admin" | "/admin/harvest" | "/admin/history" | "/admin/login" | "/admin/logout" | "/admin/products" | "/admin/products/new" | `/admin/products/${string}` & {} | "/admin/stock" | "/admin/transform" | "/cgu" | "/cgv" | "/contact" | "/mentions-legales" | "/ou-nous-trouver" | "/politique-de-confidentialite" | "/produits" | "/produits/confirmation" | "/reserver";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | "/images/ferme/labo-boris-confiture.jpg" | "/images/ferme/logo-fh.png" | "/images/ferme/marche-1mai-2026.jpg" | "/images/ferme/marche-affiche.jpg" | "/images/ferme/marche-affiche.pdf" | "/images/ferme/produit-confiture-prunes.jpg" | "/images/ferme/produit-coulis-tomates.jpg" | "/images/ferme/produit-jus-pomme-1l.jpg" | "/images/ferme/serre-boris.jpg" | "/images/ferme/serre-caisses.jpg" | "/images/ferme/tartes-flambees-evenements.pdf" | string & {};
	}
}