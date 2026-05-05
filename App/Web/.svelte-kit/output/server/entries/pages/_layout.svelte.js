import { g as getContext, a as attr_class, e as ensure_array_like, b as attr, s as stringify, c as store_get, d as escape_html, u as unsubscribe_stores, h as head } from "../../chunks/renderer.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const navLinks = [
      { href: "/", label: "Accueil" },
      { href: "/produits", label: "Produits" },
      { href: "/a-propos", label: "À Propos" },
      { href: "/ou-nous-trouver", label: "Nous trouver" },
      { href: "/reserver", label: "Séjour" }
    ];
    $$renderer2.push(`<header${attr_class(`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 transition-all duration-300 ${stringify("bg-transparent border-b border-transparent")}`)}><div class="flex items-center gap-4"><button class="material-symbols-outlined text-[#2D4236] cursor-pointer hover:opacity-80 transition-opacity md:hidden" aria-label="Menu">menu</button> <a href="/" class="text-xl font-semibold text-[#2D4236] italic font-newsreader tracking-tight">Ferme de l'Humus</a></div> <nav class="hidden md:flex gap-8 items-center"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.href)}${attr_class(`font-newsreader font-medium tracking-tight transition-opacity hover:opacity-80 ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === link.href ? "text-[#2D4236] border-b-2 border-[#2D4236]" : "text-[#2D4236]/70")}`)}>${escape_html(link.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav> <a href="/reserver" class="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-caps uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">Réserver</a></header> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer) {
  $$renderer.push(`<footer class="w-full py-12 px-5 flex flex-col items-center gap-6 text-center bg-[#F5F5DC] border-t border-[#2D4236]/10 font-newsreader"><a href="/" class="text-lg font-bold text-[#2D4236]">Ferme de l'Humus</a> <div class="flex flex-wrap justify-center gap-8"><a href="/mentions-legales" class="text-[#2D4236]/60 text-xs tracking-wide hover:text-[#A0522D] transition-colors">Mentions Légales</a> <a href="/politique-de-confidentialite" class="text-[#2D4236]/60 text-xs tracking-wide hover:text-[#A0522D] transition-colors">Politique de Confidentialité</a> <a href="/cgv" class="text-[#2D4236]/60 text-xs tracking-wide hover:text-[#A0522D] transition-colors">CGV</a></div> <p class="text-[#2D4236]/60 text-xs">© 2024 Ferme de l'Humus. Régénération &amp; Transparence.</p></footer>`);
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Ferme de l'Humus — Cultiver le Vivant, Nourrir le Local</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Une agriculture régénératrice au service de la biodiversité et de votre santé. Produits biologiques, séjours à la ferme et marchés locaux."/>`);
  });
  Header($$renderer);
  $$renderer.push(`<!----> <main class="min-h-dvh">`);
  children($$renderer);
  $$renderer.push(`<!----></main> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
