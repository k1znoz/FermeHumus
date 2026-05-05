import { b as attr, d as escape_html, f as derived, h as head, e as ensure_array_like, a as attr_class, s as stringify } from "../../../chunks/renderer.js";
import { F as FAB } from "../../../chunks/FAB.js";
function ProductCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { product } = $$props;
    const stockLabel = derived(() => product.stock ? `${product.stock.quantity ?? 0} ${product.stock.unit ?? ""}`.trim() : null);
    $$renderer2.push(`<div class="bg-white rounded-xl shadow-ambient overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col"><div class="aspect-[4/3] overflow-hidden"><img${attr("src", product.image || "https://placehold.co/600x450/efeeeb/172c21?text=Photo+bientôt")}${attr("alt", product.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/></div> <div class="p-md flex flex-col gap-sm flex-1"><div class="flex justify-between items-start"><div class="flex-1 min-w-0 pr-2">`);
    if (product.badge) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-xs block">${escape_html(product.badge)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs block">${escape_html(product.category)}</span>`);
    }
    $$renderer2.push(`<!--]--> <h3 class="font-h3 text-h3 text-primary">${escape_html(product.name)}</h3></div> <span class="font-h3 text-h3 text-primary whitespace-nowrap">${escape_html(product.price.toFixed(2))}€</span></div> <p class="font-body-md text-on-surface-variant line-clamp-2 flex-1">${escape_html(product.description)}</p> `);
    if (stockLabel()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="text-xs text-on-surface-variant">En stock: <span class="font-semibold text-primary">${escape_html(stockLabel())}</span></p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button class="mt-base w-full bg-secondary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"><span class="material-symbols-outlined text-[20px]">add</span> <span class="font-label-caps uppercase tracking-widest text-[11px]">Ajouter au panier</span></button></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const allProducts = derived(() => data.products?.length ? data.products : [
      {
        _id: "1",
        name: "Miel de Forêt",
        category: "Produits transformés",
        price: 8.5,
        description: "Récolté à froid, ce miel exprime toute la diversité florale de nos lisières boisées.",
        image: "https://cataas.com/cat"
      },
      {
        _id: "2",
        name: "Plant de Tomate 'Noire de Crimée'",
        category: "Plants potagers",
        price: 3.2,
        description: "Variété ancienne vigoureuse, cultivée sans intrants chimiques. Idéal pour votre potager.",
        image: "https://cataas.com/cat"
      },
      {
        _id: "3",
        name: "Fraises de jardin",
        category: "Fruits",
        price: 5,
        description: "Petites, sucrées et intensément parfumées. Cueillies à maturité chaque matin.",
        image: "https://cataas.com/cat"
      },
      {
        _id: "4",
        name: "Panier Surprise",
        category: "Légumes",
        price: 14,
        description: "Un assortiment de 4 à 5 variétés de légumes fraîchement récoltés cette semaine.",
        image: "https://cataas.com/cat"
      }
    ]);
    const categories = derived(() => ["Tous", ...new Set(allProducts().map((p) => p.category))]);
    let activeCategory = "Tous";
    const filtered = derived(
      () => allProducts()
    );
    let cartCount = 0;
    head("28k0ar", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Nos Produits — Ferme de l'Humus</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Découvrez nos produits biologiques : légumes, fruits, plants potagers et produits transformés artisanaux."/>`);
    });
    $$renderer2.push(`<div class="pt-24 pb-32 px-margin-mobile md:px-lg max-w-[1140px] mx-auto"><section class="mb-lg"><h1 class="font-h1 text-h1 text-primary mb-sm">Notre Catalogue</h1> <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Découvrez les fruits de notre travail régénératif. Des produits cultivés avec soin, dans le
respect du vivant et de la transparence totale.</p></section> <section class="flex flex-wrap gap-sm mb-lg" role="group" aria-label="Filtrer les produits"><!--[-->`);
    const each_array = ensure_array_like(categories());
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`px-6 py-2 rounded-full font-medium transition-all ${stringify(activeCategory === cat ? "bg-primary-container text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high")}`)}>${escape_html(cat)}</button>`);
    }
    $$renderer2.push(`<!--]--></section> <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md"><!--[-->`);
    const each_array_1 = ensure_array_like(filtered());
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let product = each_array_1[$$index_1];
      ProductCard($$renderer2, { product });
    }
    $$renderer2.push(`<!--]--></section></div> `);
    {
      $$renderer2.push("<!--[-1-->");
      FAB($$renderer2, { count: cartCount });
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
