import { a as attr_class, s as stringify, e as ensure_array_like, b as attr, c as store_get, d as escape_html, u as unsubscribe_stores, f as derived, h as head } from "../../chunks/renderer.js";
import { p as page } from "../../chunks/stores.js";
import "clsx";
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
    const isHome = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname === "/");
    const transparent = derived(() => isHome() && true);
    $$renderer2.push(`<header${attr_class(`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 transition-all duration-300 ${stringify(transparent() ? "bg-transparent border-b border-transparent" : "bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#2D4236]/10 shadow-[0px_4px_20px_rgba(45,66,54,0.05)]")}`)}><div class="flex items-center gap-4"><button${attr_class(`material-symbols-outlined cursor-pointer hover:opacity-80 transition-colors duration-300 md:hidden ${stringify(transparent() ? "text-white [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.4))]" : "text-[#2D4236]")}`)} aria-label="Menu">menu</button> <a href="/"${attr_class(`text-xl font-semibold italic font-newsreader tracking-tight transition-colors duration-300 ${stringify(transparent() ? "text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]" : "text-[#2D4236]")}`)}>Ferme de l'Humus</a></div> <nav class="hidden md:flex gap-8 items-center"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.href)}${attr_class(`font-newsreader font-medium tracking-tight transition-all duration-300 hover:opacity-80 ${stringify(transparent() ? store_get($$store_subs ??= {}, "$page", page).url.pathname === link.href ? "text-white border-b-2 border-white [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]" : "text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]" : store_get($$store_subs ??= {}, "$page", page).url.pathname === link.href ? "text-[#2D4236] border-b-2 border-[#2D4236]" : "text-[#2D4236]/70")}`)}>${escape_html(link.label)}</a>`);
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
  $$renderer.push(`<footer class="relative w-full py-12 px-5 flex flex-col items-center gap-6 text-center bg-[#F5F5DC] border-t border-[#2D4236]/10 font-newsreader"><a href="/" class="text-lg font-bold text-[#2D4236]">Ferme de l'Humus</a> <div class="flex flex-wrap justify-center gap-8"><a href="/mentions-legales" class="text-[#2D4236]/60 text-xs tracking-wide hover:text-[#A0522D] transition-colors">Mentions Légales</a> <a href="/politique-de-confidentialite" class="text-[#2D4236]/60 text-xs tracking-wide hover:text-[#A0522D] transition-colors">Politique de Confidentialité</a> <a href="/cgv" class="text-[#2D4236]/60 text-xs tracking-wide hover:text-[#A0522D] transition-colors">CGV</a></div> <p class="text-[#2D4236]/60 text-xs">© 2024 Ferme de l'Humus. Régénération &amp; Transparence.</p> <a href="/admin/login" aria-label="Acces equipe" title="Acces equipe" class="absolute left-3 bottom-3 inline-block h-4 w-4 rounded-full border border-[#2D4236]/20 opacity-15 transition-opacity hover:opacity-50 focus:opacity-70 focus:outline-none focus:ring-1 focus:ring-[#2D4236]/40"><span class="sr-only">Acces equipe</span></a></footer>`);
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const isAdminRoute = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin"));
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Ferme de l'Humus — Cultiver le Vivant, Nourrir le Local</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Une agriculture régénératrice au service de la biodiversité et de votre santé. Produits biologiques, séjours à la ferme et marchés locaux."/>`);
    });
    if (!isAdminRoute()) {
      $$renderer2.push("<!--[0-->");
      Header($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <main class="min-h-dvh">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    if (!isAdminRoute()) {
      $$renderer2.push("<!--[0-->");
      Footer($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
