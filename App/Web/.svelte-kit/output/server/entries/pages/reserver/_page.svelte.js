import { h as head, e as ensure_array_like, d as escape_html, b as attr, a as attr_class, s as stringify, ab as derived } from "../../../chunks/renderer.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const amenities = [
      {
        icon: "garage",
        text: "Stockage sécurisé couvert avec bornes de recharge pour vélos électriques."
      },
      {
        icon: "build",
        text: "Kit de réparation et pompe professionnelle tout valves."
      },
      {
        icon: "local_laundry_service",
        text: "Service de lavage express et séchoirs spécialisés pour vêtements de cyclisme."
      }
    ];
    const options = [
      {
        id: "breakfast",
        title: "Petit-déjeuner Fermier",
        description: "Pain frais, œufs de la ferme, confiture maison & miel.",
        price: "12€ / pers.",
        checked: true
      },
      {
        id: "aperitif",
        title: "Apéritif Local",
        description: "Cidre artisanal, fromages locaux & crudités du jardin.",
        price: "18€ / planche",
        checked: false
      }
    ];
    const today = /* @__PURE__ */ new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedOptions = { breakfast: true, aperitif: false };
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ];
    const daysInMonth = derived(() => new Date(currentYear, currentMonth + 1, 0).getDate());
    const firstDayOfMonth = derived(() => {
      const d = new Date(currentYear, currentMonth, 1).getDay();
      return d === 0 ? 6 : d - 1;
    });
    function isDayInRange(day) {
      return false;
    }
    function isDaySelected(day) {
      return false;
    }
    function isPast(day) {
      const date = new Date(currentYear, currentMonth, day);
      return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
    const nights = derived(() => {
      return 0;
    });
    head("1c6bp3b", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Réserver un Séjour — Ferme de l'Humus</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Planifiez votre retraite agricole à la Ferme de l'Humus. Label Accueil Vélo, petit-déjeuner fermier et séjours immersifs en pleine nature."/>`);
    });
    $$renderer2.push(`<section class="pt-24 px-margin-mobile md:px-lg mb-xl"><div class="relative w-full h-[530px] rounded-xl overflow-hidden shadow-ambient"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE2EsGTVCKE-Yi2-voz9EsbQrZaTDeZNPjC7l9RsT_4NdmH7dmAPtW-3OMHxkDP2g5wkmOuzUQGwFwormYg7kbX2w2b6yRAWjd1Crdrt88HOjiVQZfLgzJ5kAizniJFRUBPzgwF5jkQuxiMtNuRWQQZ5e786oieEBLL2GSnJX_txOT0OcJ_deRO3Ry0My2oS-Ar461Cefhwtx_nLgfXbrhzBMfvR-4jIrSZGm6bd9fJwvv5pdD6h5vW7hG0svAixfOqnt57yJR2mrA" alt="Séjour à la Ferme de l'Humus" class="w-full h-full object-cover"/> <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-8 md:p-16"><h1 class="font-h1 text-white mb-4">Farm Stay Experience</h1> <p class="font-body-lg text-white/90 max-w-2xl">Reconnectez-vous avec le rythme des saisons. Un sanctuaire conçu pour les voyageurs lents et
				les amoureux de la nature.</p></div></div></section> <section class="px-margin-mobile md:px-lg mb-xl grid md:grid-cols-2 gap-lg items-center"><div><div class="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed-variant px-4 py-1 rounded-full mb-6"><span class="material-symbols-outlined text-[18px]">directions_bike</span> <span class="font-label-caps uppercase text-[11px]">Label Accueil Vélo</span></div> <h2 class="font-h2 text-h2 text-primary mb-6">Une étape pour les nomades modernes</h2> <p class="font-body-md text-on-surface-variant mb-6">Situé directement sur la voie verte, la Ferme de l'Humus est une destination certifiée <em class="font-medium text-primary">Accueil Vélo</em>. Nous offrons tout ce dont le cyclotouriste
			a besoin pour une pause régénératrice.</p> <ul class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(amenities);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let a = each_array[$$index];
      $$renderer2.push(`<li class="flex items-start gap-4"><span class="material-symbols-outlined text-secondary">${escape_html(a.icon)}</span> <span class="font-body-md">${escape_html(a.text)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div class="bg-surface-container rounded-xl p-8 overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVTGd7cY6D8ylHwJ3gJ2FGk8L6WDhIcDu1WfzsgAx9LT9osGNzI-ou7TSLq4yK1sW3bL72dTX7VM_JJOAUvT2254g4ti-XEzvCRoqo1WEh-FZcOJxU2u1C6jsStcD1G7EFHxpnLirXULJHmAjlOYGOLdxN1q-mynCYYMGXtvAPuQ5OBe7ULO2c1rDbVNUhtvr1geVFMaZ7TXnqB44-Fy7AHjR5yUzVTxHUqDz95wagNb8m77KNM6GmiJhGfOZBqy5iaWxfyBnzSe5Z" alt="Vélo contre le mur de la ferme" class="rounded-lg shadow-ambient w-full aspect-square object-cover"/></div></section> <section class="px-margin-mobile md:px-lg mb-xl"><div class="bg-surface-container-low rounded-xl p-8 md:p-12 shadow-ambient border border-outline-variant/20"><div class="max-w-4xl mx-auto"><div class="text-center mb-12"><h2 class="font-h2 text-h2 text-primary">Planifiez votre séjour</h2> <p class="font-body-md text-on-surface-variant">Choisissez vos dates et personnalisez votre séjour avec nos options farm-to-table.</p></div> <div class="grid lg:grid-cols-5 gap-12"><div class="lg:col-span-3 space-y-8"><div><h3 class="font-h3 text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined">calendar_month</span> 1. Choisissez vos dates</h3> <div class="bg-white rounded-lg p-6 border border-outline-variant/30"><div class="flex justify-between items-center mb-6"><span class="font-newsreader font-bold text-lg">${escape_html(monthNames[currentMonth])} ${escape_html(currentYear)}</span> <div class="flex gap-2"><button class="p-1 hover:bg-surface-container rounded transition-colors" aria-label="Mois précédent"><span class="material-symbols-outlined">chevron_left</span></button> <button class="p-1 hover:bg-surface-container rounded transition-colors" aria-label="Mois suivant"><span class="material-symbols-outlined">chevron_right</span></button></div></div> <div class="grid grid-cols-7 gap-1 text-center text-xs font-label-caps text-on-surface-variant mb-2"><!--[-->`);
    const each_array_1 = ensure_array_like(["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"]);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let d = each_array_1[$$index_1];
      $$renderer2.push(`<span>${escape_html(d)}</span>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-7 gap-1"><!--[-->`);
    const each_array_2 = ensure_array_like(Array(firstDayOfMonth()));
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      each_array_2[$$index_2];
      $$renderer2.push(`<div></div>`);
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_3 = ensure_array_like(Array(daysInMonth()));
    for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
      each_array_3[i];
      const day = i + 1;
      $$renderer2.push(`<button${attr("disabled", isPast(day), true)}${attr_class(`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${stringify(isPast(day) ? "text-on-surface-variant/30 cursor-not-allowed" : isDaySelected() ? "bg-primary text-white" : isDayInRange() ? "bg-primary-fixed text-primary" : "hover:bg-primary-fixed")}`)}>${escape_html(day)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div><h3 class="font-h3 text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined">restaurant</span> 2. Ajoutez vos options</h3> <div class="grid sm:grid-cols-2 gap-4"><!--[-->`);
    const each_array_4 = ensure_array_like(options);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let opt = each_array_4[$$index_4];
      $$renderer2.push(`<label${attr_class(`relative flex flex-col p-4 bg-white rounded-lg border-2 cursor-pointer transition-all shadow-sm ${stringify(selectedOptions[opt.id] ? "border-primary bg-primary-fixed/20" : "border-transparent hover:border-primary-container/20")}`)}><input type="checkbox" class="absolute top-4 right-4 h-5 w-5 rounded border-outline-variant text-primary focus:ring-secondary"${attr("checked", selectedOptions[opt.id], true)}/> <span class="font-newsreader font-bold text-primary text-lg">${escape_html(opt.title)}</span> <span class="font-body-md text-on-surface-variant text-sm mt-1">${escape_html(opt.description)}</span> <span class="mt-4 font-bold text-secondary">${escape_html(opt.price)}</span></label>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="lg:col-span-2"><div class="sticky top-28 bg-white rounded-xl p-8 shadow-ambient border border-outline-variant/30"><h3 class="font-h3 text-h3 text-primary mb-6">3. Vos coordonnées</h3> <form class="space-y-4"><div><label class="block font-label-caps text-on-surface-variant mb-2 uppercase text-[11px]">Nom complet</label> <input type="text" placeholder="Jean Dupont" autocomplete="name" class="w-full bg-surface rounded-lg border-none focus:ring-1 focus:ring-secondary py-3 px-4 font-body-md text-on-surface"/></div> <div><label class="block font-label-caps text-on-surface-variant mb-2 uppercase text-[11px]">Adresse e-mail</label> <input type="email" placeholder="jean@exemple.com" autocomplete="email" class="w-full bg-surface rounded-lg border-none focus:ring-1 focus:ring-secondary py-3 px-4 font-body-md text-on-surface"/></div> <div class="grid grid-cols-2 gap-4"><div><label class="block font-label-caps text-on-surface-variant mb-2 uppercase text-[11px]">Adultes</label> <select class="w-full bg-surface rounded-lg border-none focus:ring-1 focus:ring-secondary py-3 px-4 font-body-md text-on-surface">`);
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`1`);
    });
    $$renderer2.option({ selected: true }, ($$renderer3) => {
      $$renderer3.push(`2`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`3`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`4`);
    });
    $$renderer2.push(`</select></div> <div><label class="block font-label-caps text-on-surface-variant mb-2 uppercase text-[11px]">Enfants</label> <select class="w-full bg-surface rounded-lg border-none focus:ring-1 focus:ring-secondary py-3 px-4 font-body-md text-on-surface">`);
    $$renderer2.option({ selected: true }, ($$renderer3) => {
      $$renderer3.push(`0`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`1`);
    });
    $$renderer2.option({}, ($$renderer3) => {
      $$renderer3.push(`2`);
    });
    $$renderer2.push(`</select></div></div> <div class="pt-6 border-t border-outline-variant/20 mt-4 space-y-2">`);
    if (nights() > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex justify-between items-center"><span class="font-body-md text-on-surface-variant">Séjour (${escape_html(nights())} nuit${escape_html(nights() > 1 ? "s" : "")})</span> <span class="font-body-md font-bold">${escape_html((nights() * 90).toLocaleString("fr-FR", { minimumFractionDigits: 2 }))} €</span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="flex justify-between items-center"><span class="font-body-md text-on-surface-variant">Options (Petit-déjeuner ×2)</span> <span class="font-body-md font-bold">24,00 €</span></div>`);
    }
    $$renderer2.push(`<!--]--> <button type="submit" class="w-full bg-secondary text-on-secondary font-bold py-4 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg mt-4">Confirmer la demande de réservation</button> <p class="text-[11px] text-center text-on-surface-variant/60 mt-2 leading-relaxed">Aucun prélèvement maintenant. Confirmation par e-mail sous 24h.</p></div></form></div></div></div></div></div></section> <section class="px-margin-mobile md:px-lg mb-xl"><div class="grid md:grid-cols-3 gap-gutter"><div class="p-8 bg-white rounded-xl shadow-ambient border border-outline-variant/10 flex flex-col items-center text-center"><span class="material-symbols-outlined text-primary-container text-4xl mb-4">verified_user</span> <h4 class="font-newsreader font-bold text-primary text-xl mb-2">Sourcing Transparent</h4> <p class="font-body-md text-on-surface-variant">Chaque ingrédient de votre panier petit-déjeuner est cultivé ici même ou par notre voisin Marc.</p></div> <div class="p-8 bg-white rounded-xl shadow-ambient border border-outline-variant/10 flex flex-col items-center text-center"><span class="material-symbols-outlined text-primary-container text-4xl mb-4">nature_people</span> <h4 class="font-newsreader font-bold text-primary text-xl mb-2">Vie en Permaculture</h4> <p class="font-body-md text-on-surface-variant">Vivez la régénération de l'intérieur. Des visites de nos jardins riches en humus sont incluses dans chaque séjour.</p></div> <div class="p-8 bg-white rounded-xl shadow-ambient border border-outline-variant/10 flex flex-col items-center text-center"><span class="material-symbols-outlined text-primary-container text-4xl mb-4">local_shipping</span> <h4 class="font-newsreader font-bold text-primary text-xl mb-2">Séjour Zéro Déchet</h4> <p class="font-body-md text-on-surface-variant">Nous fournissons des produits en vrac et des installations de compostage pour alléger votre empreinte écologique.</p></div></div></section> <button class="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl z-50 active:scale-90 transition-transform" aria-label="Réserver"><span class="material-symbols-outlined">calendar_today</span></button>`);
  });
}
export {
  _page as default
};
