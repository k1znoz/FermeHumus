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
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOwg_XSaXTOZB4EVMFVEBwrREJ5DGQ-J8Lgd_n_cKKiRiN_eipl4_qeSvUg6hVh6pdVQIPOVWWrA1sGClAHiZ6_-d0fyJmSMRHLGg5EPlLRknCU_YaVTow7Xrz1u7PHSN8cqPzA6_Rthd9DsSRYcTZanc5dQM_AxZ5knK_O80vc7QIM-_A_Hkdt4Za9K4mliK00YaEtJRWhnBVH92xhV8-A-oCkcR32PY0DwtOvJeQjyMIpJbagQ5yGKpIEYrFwVQuZkARUporp_Pi",
      alt: "Terre fertile entre les mains"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyDsOUApmtC6itWBmdTzQ02gw6QLCuDLGY-YEhve4U57iZNyy_7V_MPifHwVyD_lMOYLa-MtnPHDx0uw-LWUBUuuflQ55i-mzv6LswM-PwLTYbppnzXyYhFfhIuL_oENziy6WX5FQMd7n5cbbPwpYswWFcM4KcgR8oxmlBdLPUUj0UYj4EP7zCUlM7Lcb_HtAknHVUNNfFJ1haCJ2OusVy0tHGktn481yZA1wxGWjSKcD1AgfERfpE5Qw1Uai1xJWW7XcIJt8ya5Bt",
      alt: "Ruches en lisière de prairie fleurie"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqj2YFAkuQnHT0I_j115yJ6UzXMPiKc8Do-5YDuqpAelFG0ToDwQJVlmJVcIEMDax_YoqIiqsGKoFhru7Jj4gqV2dGLm5IO1487wbedHkL_aQny4Bxzcr7BrNE1si7Qcc36e4L2ezaxLRkxgjhbrtY4ZpG5pDuSIkaoOrQwn7TuUR42tFf0wyYYaD5jz5K8zSOAyOFsl9q3Feo1gNTKoKRB3daShNAQklhelBHKWo4zwyOGeHfHVH9zrMJ-QTVNBzcI28deDqbHl",
      alt: "Bocaux de miel artisanal sur une table"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9OqAR7KG0oNzHtMtwinve4f6FcUmEWJvS9oNrJELVdMQMrTr6IZToVCA8KkT4Lp1CiUIcTKCGhu2rKILSP_n720cObidJHwNXcybmBgL2cVkT4i8ENlEEegWY2m1vpnR4SMofOulR-KSHNxjhWaK5LJ46YDbXCSDpO0E9QeDLGkWlJutLZ1sVVMTObgndQ0Aybhi1bdCR7fBfmorr6_kf9jk2nXHG-OlDQOUoPYAT8NGdpVxgHsF7KoBJBuSMQiMmw0u6Dr4ZmmcY",
      alt: "Grange en pierre et extension moderne"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7sB8LdNOseGqqYvk6hD3swTmcWQh2PugyhRMAIsmwNgJoHD8bDAcequiqg_rhht01JgCetJNUBQkBzScvFkZuYmxJ3jBm-oVh3TVTPAHjgIUhWOzWYKG0sIgB61ayXf2tAQcFktg8SinVVpl4qtTlvJwBQxwZOX2dAFksiOMPt_lpdSjrq8MQpIJAJgJuaZX2ncnKH1HR3QBEENteyVgip6rA2ejOVzTOaz92JQBITidFdfhB2qD5uX_Txts6BugGOC5T8huh9TT",
      alt: "Jardin en permaculture sous la lumière filtrante"
    }
  ];
  head("11ks5ly", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>À Propos — Ferme de l'Humus</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Découvrez l'histoire, la philosophie et l'équipe de la Ferme de l'Humus. Une agriculture régénératrice au cœur de la Normandie."/>`);
  });
  $$renderer.push(`<section class="pt-24 px-margin-mobile md:px-lg lg:px-xl py-lg"><div class="max-w-[1140px] mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center"><div><span class="font-label-caps text-secondary uppercase tracking-widest mb-sm block">Notre Histoire</span> <h1 class="font-h1 text-h1 text-primary mb-md">Régénérer la terre, nourrir l'âme.</h1> <p class="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-xl">La Ferme de l'Humus est née d'une volonté simple : redonner au sol sa vitalité naturelle
					pour offrir des produits d'une transparence absolue. Située au cœur de paysages préservés,
					notre exploitation est un laboratoire de vie.</p></div> <div class="relative rounded-xl overflow-hidden aspect-[4/5] shadow-ambient"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBELnA1oIzpsalx13xTnHkvfN76Hcr0PttvdTYlf0AgkfAOB-m1_NrHhSZmpqLIp8nPBF2DhoViZe-5Z749KLU3nIJrkMXBKlge1eY--vLoPMOL2YnOZfORT5dW2NevgR18yF0onzcO_-IzjWOgw2aVSwPOCLYJ2vKGkjAE1d5chec21HCVh6r_FEtY3FllGjdXY-VjgT2jCne-_TxDUBysFFu8G0DotsVHmU__SdFj0gq-zCKJimN3bU6HRzG_M8AHOXurkTNBH8IJ" alt="Vue aérienne de la ferme au lever du jour" class="w-full h-full object-cover"/></div></div></div></section> <section class="bg-surface-container-low py-xl px-margin-mobile md:px-lg lg:px-xl"><div class="max-w-[1140px] mx-auto"><div class="text-center mb-xl"><h2 class="font-h2 text-h2 text-primary">Nos piliers fondamentaux</h2> <div class="h-1 w-16 bg-secondary mx-auto mt-sm"></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-md"><!--[-->`);
  const each_array = ensure_array_like(values);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let v = each_array[$$index];
    $$renderer.push(`<div${attr_class(`bg-surface p-lg rounded-xl shadow-ambient flex flex-col gap-sm border-t-4 ${stringify(v.borderColor)}`)}><span${attr_class(`material-symbols-outlined ${stringify(v.iconColor)} text-4xl`)}>${escape_html(v.icon)}</span> <h3 class="font-h3 text-h3 text-primary">${escape_html(v.title)}</h3> <p class="text-on-surface-variant">${escape_html(v.description)}</p></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section> <section class="py-xl px-margin-mobile md:px-lg lg:px-xl"><div class="max-w-[1140px] mx-auto"><div class="flex flex-col lg:flex-row gap-xl items-center"><div class="w-full lg:w-1/2 grid grid-cols-2 gap-sm"><div class="rounded-xl overflow-hidden aspect-square shadow-ambient"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD60DMCRLFotzXXj_f4mk83JKMA9g095jyX0GGZHHZay6LaYGIFZlz4ZtLfTHNkbN2P2-cEw7s8nDBISm1pCm6FMVyLbOU-pdOkJ2yLNMLgq_j9afKzD5Xqimc63EgOWtFXjMZSCKwEtIXfp1tsJROyl7UDc_qhX8GjeCnkZjc_szW-L3fOtw3l_B1WuqbFGDr1yTWyD7yWeZbhYo4XPpvYuZhsL8KvyI_FQV-1mv5DRpmkLR0brhpNaRLdGz4HkfRwIz5AO3aeT7ZT" alt="Marc, fondateur" class="w-full h-full object-cover"/></div> <div class="rounded-xl overflow-hidden aspect-square shadow-ambient mt-lg"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvn_c5as_9LzghqnaPwDxxVibpINIR7fJ0XSZYCmlkBTNkYn3PBjCkSONtTnSL92PXuWGWp92ksRKsVrKLZw1tQ0nVDoTRyi8yUFuZ8DuEe9aINR-ms5letwjpwWnYJ0yy_JxxEZ2yyQpe1MkU2PU9mOU3w4IigUjDy7qmR1ip9pkRxiGbvUigjAd9-pHyhnzAFZ-vkSE0mFTxHUqDz95wagNb8m77KNM6GmiJhGfOZBqy5iaWxfyBnzSe5Z" alt="L'équipe en serre" class="w-full h-full object-cover"/></div></div> <div class="w-full lg:w-1/2"><h2 class="font-h2 text-h2 text-primary mb-md">L'équipe derrière le sillon</h2> <p class="font-body-lg text-body-lg text-on-surface-variant mb-md italic">"Nous ne sommes que les gardiens passagers d'une terre qui nous précède et nous survivra."</p> <p class="text-on-surface-variant mb-lg">Fondée par Marc et Elena, la ferme réunit aujourd'hui cinq passionnés. De la gestion des
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
