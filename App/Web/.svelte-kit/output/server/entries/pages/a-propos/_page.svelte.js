import { h as head, e as ensure_array_like, a as attr_class, s as stringify, d as escape_html, b as attr } from "../../../chunks/renderer.js";
import { F as FAB } from "../../../chunks/FAB.js";
function _page($$renderer, $$props) {
  let { data } = $$props;
  const values = [
    {
      icon: "eco",
      iconColor: "text-primary",
      title: "Agriculture Biologique",
      description: "Au-delà du label, c'est une philosophie de non-intervention chimique pour laisser s'exprimer le terroir.",
      borderColor: "border-primary"
    },
    {
      icon: "layers",
      iconColor: "text-secondary",
      title: "Respect du Sol",
      description: "Nous pratiquons le non-labour et le compostage de surface pour préserver la vie microbienne indispensable.",
      borderColor: "border-secondary"
    },
    {
      icon: "groups",
      iconColor: "text-on-tertiary-container",
      title: "Dimension Humaine",
      description: "Une ferme à taille réelle, où le lien social et la transmission priment sur la productivité industrielle.",
      borderColor: "border-on-tertiary-container"
    }
  ];
  const galleryImages = [
    { src: "https://cataas.com/cat", alt: "Champ de légumes" },
    { src: "https://cataas.com/cat", alt: "Serre de la ferme" },
    { src: "https://cataas.com/cat", alt: "Récolte du matin" }
  ];
  head("11ks5ly", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>À propos — Ferme de l'Humus</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Découvrez l'histoire, la philosophie et l'équipe de la Ferme de l'Humus. Une agriculture régénératrice au cœur de la Normandie."/>`);
  });
  $$renderer.push(`<section class="pt-24 px-margin-mobile md:px-lg lg:px-xl py-lg"><div class="max-w-[1140px] mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center"><div><span class="font-label-caps text-secondary uppercase tracking-widest mb-sm block">Notre Histoire</span> <h1 class="font-h1 text-h1 text-primary mb-md">Régénérer la terre, nourrir l'âme.</h1> <p class="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-xl">La Ferme de l'Humus est née d'une volonté simple : redonner au sol sa vitalité naturelle
					pour offrir des produits d'une transparence absolue. Située au cœur de paysages préservés,
					notre exploitation est un laboratoire de vie.</p></div> <div class="relative rounded-xl overflow-hidden aspect-[4/5] shadow-ambient"><img src="https://cataas.com/cat" alt="Vue aérienne de la ferme au lever du jour" class="w-full h-full object-cover"/></div></div></div></section> <section class="bg-surface-container-low py-xl px-margin-mobile md:px-lg lg:px-xl"><div class="max-w-[1140px] mx-auto"><div class="text-center mb-xl"><h2 class="font-h2 text-h2 text-primary">Nos piliers fondamentaux</h2> <div class="h-1 w-16 bg-secondary mx-auto mt-sm"></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-md"><!--[-->`);
  const each_array = ensure_array_like(values);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let v = each_array[$$index];
    $$renderer.push(`<div${attr_class(`bg-surface p-lg rounded-xl shadow-ambient flex flex-col gap-sm border-t-4 ${stringify(v.borderColor)}`)}><span${attr_class(`material-symbols-outlined ${stringify(v.iconColor)} text-4xl`)}>${escape_html(v.icon)}</span> <h3 class="font-h3 text-h3 text-primary">${escape_html(v.title)}</h3> <p class="text-on-surface-variant">${escape_html(v.description)}</p></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="py-xl px-margin-mobile md:px-lg lg:px-xl"><div class="max-w-[1140px] mx-auto"><div class="flex flex-col lg:flex-row gap-xl items-center"><div class="w-full lg:w-1/2 grid grid-cols-2 gap-sm"><div class="rounded-xl overflow-hidden aspect-square shadow-ambient"><img src="https://cataas.com/cat" alt="Marc, fondateur" class="w-full h-full object-cover"/></div> <div class="rounded-xl overflow-hidden aspect-square shadow-ambient mt-lg"><img src="https://cataas.com/cat" alt="L'équipe en serre" class="w-full h-full object-cover"/></div></div> <div class="w-full lg:w-1/2"><h2 class="font-h2 text-h2 text-primary mb-md">L'équipe derrière le sillon</h2> <p class="font-body-lg text-body-lg text-on-surface-variant mb-md italic">"Nous ne sommes que les gardiens passagers d'une terre qui nous précède et nous survivra."</p> <p class="text-on-surface-variant mb-lg">Fondée par Marc et Elena, la ferme réunit aujourd'hui cinq passionnés. De la gestion des
					semis à la relation avec nos clients locaux, chaque geste est porté par la même exigence de
					qualité et de bienveillance.</p> <div class="flex flex-wrap gap-sm"><span class="bg-[#F5F5DC] text-primary px-4 py-1 rounded-full font-label-caps text-[11px] uppercase border border-primary/10">Marc — Fondateur</span> <span class="bg-[#F5F5DC] text-primary px-4 py-1 rounded-full font-label-caps text-[11px] uppercase border border-primary/10">Elena — Agronomie</span> <span class="bg-[#F5F5DC] text-primary px-4 py-1 rounded-full font-label-caps text-[11px] uppercase border border-primary/10">Lucas — Logistique</span></div></div></div></div></section> <section class="bg-primary text-on-primary py-xl px-margin-mobile md:px-lg lg:px-xl"><div class="max-w-[1140px] mx-auto"><div class="mb-lg"><h2 class="font-h2 text-h2 mb-xs">L'environnement</h2> <p class="opacity-80">Immersion au sein de notre écosystème vivant.</p></div> <div class="columns-1 md:columns-2 lg:columns-3 gap-md space-y-md"><!--[-->`);
  const each_array_1 = ensure_array_like(galleryImages);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let img = each_array_1[$$index_1];
    $$renderer.push(`<div class="rounded-lg overflow-hidden break-inside-avoid"><img${attr("src", img.src)}${attr("alt", img.alt)} class="w-full h-auto hover:scale-105 transition-transform duration-500" loading="lazy"/></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="py-xl px-margin-mobile text-center max-w-2xl mx-auto"><h2 class="font-h2 text-h2 text-primary mb-md">Envie de voir par vous-même ?</h2> <p class="font-body-lg text-on-surface-variant mb-lg">Nous organisons des visites pédagogiques chaque samedi matin. Venez découvrir nos méthodes et
		goûter aux fruits de notre travail.</p> <div class="flex flex-col sm:flex-row justify-center gap-sm"><a href="/reserver" class="bg-secondary text-on-secondary px-lg py-sm rounded-lg font-label-caps uppercase tracking-widest hover:opacity-90 transition-all shadow-ambient text-center">Réserver une visite</a> <a href="/ou-nous-trouver" class="border border-primary text-primary px-lg py-sm rounded-lg font-label-caps uppercase tracking-widest hover:bg-primary/5 transition-all text-center">Nous contacter</a></div></section> `);
  FAB($$renderer, {});
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
