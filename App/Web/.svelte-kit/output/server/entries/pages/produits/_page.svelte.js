import { b as attr, d as escape_html, f as derived, h as head, e as ensure_array_like, a as attr_class, s as stringify } from "../../../chunks/renderer.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { F as FAB } from "../../../chunks/FAB.js";
import { O as ORDER_PICKUP_LOCATIONS, e as ORDER_REFERRAL_SOURCES } from "../../../chunks/constants.js";
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
    let { data, form } = $$props;
    let submitting = false;
    const visualFallbacks = [
      {
        match: ["coulis", "tomate"],
        image: "/images/ferme/produit-coulis-tomates.jpg"
      },
      {
        match: ["confiture", "prune"],
        image: "/images/ferme/produit-confiture-prunes.jpg"
      },
      {
        match: ["jus", "pomme"],
        image: "/images/ferme/produit-jus-pomme-1l.jpg"
      },
      {
        match: ["plants", "plant", "blette"],
        image: "/images/ferme/serre-caisses.jpg"
      },
      {
        match: ["sirop"],
        image: "/images/ferme/produit-jus-pomme-1l.jpg"
      },
      {
        match: ["cornichon"],
        image: "/images/ferme/produit-coulis-tomates.jpg"
      },
      {
        match: ["shiitak"],
        image: "/images/ferme/labo-boris-confiture.jpg"
      }
    ];
    function resolveProductImage(product) {
      const source = `${product.name ?? ""} ${product.category ?? ""} ${product.description ?? ""}`.toLowerCase();
      const fallback = visualFallbacks.find(({ match }) => match.every((token) => source.includes(token)));
      return product.image || fallback?.image || "/images/ferme/produit-jus-pomme-1l.jpg";
    }
    const allProducts = derived(() => (data.products?.length ? data.products : [
      {
        _id: "1",
        name: "Miel de Forêt",
        category: "Conserves",
        price: 8.5,
        description: "Récolté à froid, ce miel exprime toute la diversité florale de nos lisières boisées.",
        image: "/images/ferme/produit-jus-pomme-1l.jpg"
      },
      {
        _id: "2",
        name: "Plant de Tomate 'Noire de Crimée'",
        category: "Plants",
        price: 3.2,
        description: "Variété ancienne vigoureuse, cultivée sans intrants chimiques. Idéal pour votre potager.",
        image: "/images/ferme/serre-caisses.jpg"
      },
      {
        _id: "3",
        name: "Fraises de jardin",
        category: "Produits frais",
        price: 5,
        description: "Petites, sucrées et intensément parfumées. Cueillies à maturité chaque matin.",
        image: "/images/ferme/produit-confiture-prunes.jpg"
      },
      {
        _id: "4",
        name: "Panier Surprise",
        category: "Produits frais",
        price: 14,
        description: "Un assortiment de 4 à 5 variétés de légumes fraîchement récoltés cette semaine.",
        image: "/images/ferme/serre-boris.jpg"
      }
    ]).map((product) => ({ ...product, image: resolveProductImage(product) })));
    const categories = derived(() => ["Tous", ...new Set(allProducts().map((p) => p.category))]);
    let activeCategory = "Tous";
    const filtered = derived(
      () => allProducts()
    );
    let cart = [];
    const cartCount = derived(() => cart.reduce((sum, item) => sum + item.quantity, 0));
    const cartTotal = derived(() => cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0));
    const cartPayload = derived(() => cart.map(({ product, quantity }) => ({ productId: product._id, quantity })));
    const moneyFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
    function formatMoney(value) {
      return moneyFormatter.format(value);
    }
    head("28k0ar", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Nos Produits — Ferme de l'Humus</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Produits de saison de la Ferme de l'Humus : frais, transformés et plants. Commande en direct et retrait local."/>`);
    });
    $$renderer2.push(`<div class="pt-24 pb-32 px-margin-mobile md:px-lg max-w-[1140px] mx-auto"><section class="mb-lg"><h1 class="font-h1 text-h1 text-primary mb-sm">Notre Catalogue</h1> <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Produits de saison cultivés à la ferme et transformation artisanale sur place. Commandez en ligne,
puis récupérez votre sélection sur marché ou sur rendez-vous.</p></section> <section class="mb-xl rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/10 shadow-ambient"><div class="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-gutter items-stretch"><div class="p-lg md:p-xl"><div class="flex items-center gap-3 mb-md"><img src="/images/ferme/logo-fh.png" alt="Logo de la Ferme de l'Humus" class="h-12 w-12 object-contain rounded-full bg-white p-1 shadow-sm" loading="lazy"/> <div><span class="font-label-caps text-secondary uppercase tracking-widest block">Vente directe</span> <h2 class="font-h2 text-h2 text-primary">Produits de saison, marchés et retrait local</h2></div></div> <p class="font-body-md text-on-surface-variant mb-lg max-w-xl">Les repères sont les mêmes partout: logo, affiche marché et photos réelles. Vous commandez ici,
		puis vous choisissez le point de retrait qui vous convient.</p> <div class="flex flex-wrap gap-3"><a href="/ou-nous-trouver" class="inline-flex items-center gap-2 rounded-xl bg-[#172c21] text-white px-6 py-3 text-sm font-semibold hover:bg-[#2d4236] transition-colors"><span class="material-symbols-outlined text-base">storefront</span> Voir où nous trouver</a> <a href="/images/ferme/marche-affiche.pdf" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl border border-[#2D4236]/15 bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors"><span class="material-symbols-outlined text-base">picture_as_pdf</span> Affiche marché</a></div></div> <div class="bg-white p-md md:p-lg"><img src="/images/ferme/marche-affiche.jpg" alt="Affiche marché de la Ferme de l'Humus" class="w-full h-full object-cover rounded-xl shadow-[0px_4px_20px_rgba(45,66,54,0.05)]" loading="lazy"/></div></div></section> <section class="flex flex-wrap gap-sm mb-lg" role="group" aria-label="Filtrer les produits"><!--[-->`);
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
    if (cartCount() > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed bottom-0 left-0 w-full bg-[#F5F5DC] border-t border-[#2D4236]/10 px-5 py-4 z-40"><div class="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary"><span class="material-symbols-outlined">shopping_basket</span></div> <div><h4 class="font-h3 text-body-lg text-primary leading-tight">Ma commande</h4> <p class="font-body-md text-on-surface-variant text-sm">${escape_html(cartCount())} article${escape_html(cartCount() > 1 ? "s" : "")} · ${escape_html(formatMoney(cartTotal()))}</p></div></div> <button class="w-full sm:w-auto bg-secondary text-white px-8 py-3 rounded-lg font-newsreader font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-secondary/20" form="product-order-form" type="submit"${attr("disabled", submitting, true)}>${escape_html("Valider ma sélection")}</button></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      FAB($$renderer2, { count: cartCount() });
    }
    $$renderer2.push(`<!--]--> <button class="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl z-50 active:scale-90 transition-transform" aria-label="Réserver"${attr("form", cartCount() > 0 ? "product-order-form" : void 0)}${attr("type", cartCount() > 0 ? "submit" : "button")}${attr("disabled", submitting, true)}><span class="material-symbols-outlined">${escape_html(cartCount() > 0 ? "shopping_bag" : "calendar_today")}</span></button> `);
    if (cartCount() > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="px-margin-mobile md:px-lg mb-36" id="validation-panier"><div class="max-w-[1140px] mx-auto rounded-2xl border border-[#2D4236]/10 bg-white shadow-ambient overflow-hidden"><div class="grid lg:grid-cols-[1.1fr_0.9fr]"><div class="p-lg md:p-xl bg-[#f5f5dc]"><p class="font-label-caps text-secondary uppercase tracking-widest mb-sm">Votre sélection</p> <h2 class="font-h2 text-h2 text-primary mb-md">Confirmer la commande</h2> <div class="space-y-3"><!--[-->`);
      const each_array_2 = ensure_array_like(cart);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let item = each_array_2[$$index_2];
        $$renderer2.push(`<div class="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 border border-[#2D4236]/10"><div class="min-w-0"><p class="font-medium text-primary truncate">${escape_html(item.product.name)}</p> <p class="text-sm text-on-surface-variant">${escape_html(item.quantity)} × ${escape_html(formatMoney(item.product.price))} = ${escape_html(formatMoney(item.quantity * item.product.price))}</p></div> <div class="flex items-center gap-2 shrink-0"><button type="button" class="w-8 h-8 rounded-full border border-[#2D4236]/15 text-[#2D4236] hover:bg-white transition-colors"${attr("aria-label", `Retirer un ${item.product.name}`)}>−</button> <button type="button" class="w-8 h-8 rounded-full border border-[#2D4236]/15 text-[#2D4236] hover:bg-white transition-colors"${attr("aria-label", `Ajouter un ${item.product.name}`)}>+</button></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-6 flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-[#2D4236]/10"><span class="font-medium text-primary">Total estimé</span> <span class="font-bold text-secondary">${escape_html(formatMoney(cartTotal()))}</span></div> <p class="mt-4 text-sm text-on-surface-variant">La validation réserve les quantités en stock et transmet la commande à l'atelier.</p></div> <div class="p-lg md:p-xl"><form id="product-order-form" method="POST" class="space-y-4">`);
      if (form?.error) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">${escape_html(form.error)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (form?.success) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="rounded-xl border border-[#2D4236]/15 bg-[#d0e8d7] px-4 py-3 text-sm text-[#172c21]"><p class="font-semibold">Commande validée ${escape_html(form.orderNumber ? `- ${form.orderNumber}` : "")}</p> <p class="mt-1">Les quantités ont été réservées et la notification a été envoyée à l'atelier.</p></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="grid md:grid-cols-2 gap-4"><div><label for="customerName" class="block text-sm font-medium text-[#1a1c1a] mb-1">Nom et prénom *</label> <input id="customerName" name="customerName" type="text" required="" placeholder="Jean Dupont" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"/></div> <div><label for="customerEmail" class="block text-sm font-medium text-[#1a1c1a] mb-1">Adresse e-mail *</label> <input id="customerEmail" name="customerEmail" type="email" required="" placeholder="jean@exemple.com" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"/></div></div> <div><label for="customerPhone" class="block text-sm font-medium text-[#1a1c1a] mb-1">Numéro de téléphone *</label> <input id="customerPhone" name="customerPhone" type="tel" required="" placeholder="06 00 00 00 00" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"/></div> <div><label for="pickupLocation" class="block text-sm font-medium text-[#1a1c1a] mb-1">Où souhaitez-vous retirer votre commande ? *</label> <select id="pickupLocation" name="pickupLocation" required="" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none">`);
      $$renderer2.option({ value: "", disabled: true, selected: true }, ($$renderer3) => {
        $$renderer3.push(`Choisir un point de retrait`);
      });
      $$renderer2.push(`<!--[-->`);
      const each_array_3 = ensure_array_like(ORDER_PICKUP_LOCATIONS);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let pickupLocation = each_array_3[$$index_3];
        $$renderer2.option({ value: pickupLocation }, ($$renderer3) => {
          $$renderer3.push(`${escape_html(pickupLocation)}`);
        });
      }
      $$renderer2.push(`<!--]--></select></div> <div><label for="referralSource" class="block text-sm font-medium text-[#1a1c1a] mb-1">Par curiosité, comment avez-vous entendu parler de nous ?</label> <select id="referralSource" name="referralSource" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none">`);
      $$renderer2.option({ value: "" }, ($$renderer3) => {
        $$renderer3.push(`Choisir une réponse`);
      });
      $$renderer2.push(`<!--[-->`);
      const each_array_4 = ensure_array_like(ORDER_REFERRAL_SOURCES);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let source = each_array_4[$$index_4];
        $$renderer2.option({ value: source }, ($$renderer3) => {
          $$renderer3.push(`${escape_html(source)}`);
        });
      }
      $$renderer2.push(`<!--]--></select></div> <div class="flex items-start gap-3 rounded-xl border border-[#2D4236]/10 bg-white px-4 py-3"><input id="newsletterOptIn" name="newsletterOptIn" type="checkbox" class="mt-1 h-4 w-4 rounded border-[#2D4236]/30 text-[#172c21] focus:ring-[#172c21]"/> <label for="newsletterOptIn" class="text-sm text-on-surface-variant">Je souhaite être inscrit.e à la newsletter de la ferme.</label></div> <div><label for="notes" class="block text-sm font-medium text-[#1a1c1a] mb-1">Questions, commentaires ou consignes</label> <textarea id="notes" name="notes" rows="4" placeholder="Informations utiles pour préparer la commande..." class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none resize-none"></textarea></div> <input type="hidden" name="cart"${attr("value", JSON.stringify(cartPayload()))}/></form></div></div></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
