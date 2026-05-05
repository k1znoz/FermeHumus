<script>
import FAB from '$lib/components/FAB.svelte';
import ProductCard from '$lib/components/ProductCard.svelte';

let { data } = $props();

const allProducts = $derived(data.products?.length
? data.products
: [
{
_id: '1',
name: 'Miel de Forêt',
category: 'Produits transformés',
price: 8.5,
description: "Récolté à froid, ce miel exprime toute la diversité florale de nos lisières boisées.",
image: 'https://cataas.com/cat',
},
{
_id: '2',
name: "Plant de Tomate 'Noire de Crimée'",
category: 'Plants potagers',
price: 3.2,
description: "Variété ancienne vigoureuse, cultivée sans intrants chimiques. Idéal pour votre potager.",
image: 'https://cataas.com/cat',
},
{
_id: '3',
name: 'Fraises de jardin',
category: 'Fruits',
price: 5.0,
description: "Petites, sucrées et intensément parfumées. Cueillies à maturité chaque matin.",
image: 'https://cataas.com/cat',
},
{
_id: '4',
name: 'Panier Surprise',
category: 'Légumes',
price: 14.0,
description: "Un assortiment de 4 à 5 variétés de légumes fraîchement récoltés cette semaine.",
image: 'https://cataas.com/cat',
},
  ]);

const categories = $derived(['Tous', ...new Set(allProducts.map((p) => p.category))]);
let activeCategory = $state('Tous');
const filtered = $derived(
activeCategory === 'Tous' ? allProducts : allProducts.filter((p) => p.category === activeCategory)
);

let cartCount = $state(0);
function addToCart() {
cartCount++;
}
</script>

<svelte:head>
<title>Nos Produits — Ferme de l'Humus</title>
<meta name="description" content="Découvrez nos produits biologiques : légumes, fruits, plants potagers et produits transformés artisanaux." />
</svelte:head>

<div class="pt-24 pb-32 px-margin-mobile md:px-lg max-w-[1140px] mx-auto">
<!-- Hero -->
<section class="mb-lg">
<h1 class="font-h1 text-h1 text-primary mb-sm">Notre Catalogue</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
Découvrez les fruits de notre travail régénératif. Des produits cultivés avec soin, dans le
respect du vivant et de la transparence totale.
</p>
</section>

<!-- Filters -->
<section class="flex flex-wrap gap-sm mb-lg" role="group" aria-label="Filtrer les produits">
{#each categories as cat}
<button
onclick={() => (activeCategory = cat)}
class="px-6 py-2 rounded-full font-medium transition-all
          {activeCategory === cat
? 'bg-primary-container text-on-primary'
: 'bg-surface-container text-on-surface hover:bg-surface-container-high'}"
>
{cat}
</button>
{/each}
</section>

<!-- Products Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
{#each filtered as product (product._id)}
<ProductCard {product} onAdd={addToCart} />
{/each}
</section>
</div>

<!-- Sticky Order Bar -->
{#if cartCount > 0}
<div class="fixed bottom-0 left-0 w-full bg-[#F5F5DC] border-t border-[#2D4236]/10 px-5 py-4 z-40">
<div class="max-w-[1140px] mx-auto flex items-center justify-between">
<div class="flex items-center gap-4">
<div
class="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary"
>
<span class="material-symbols-outlined">shopping_basket</span>
</div>
<div>
<h4 class="font-h3 text-body-lg text-primary leading-tight">Ma Commande</h4>
<p class="font-body-md text-on-surface-variant text-sm">{cartCount} article{cartCount > 1 ? 's' : ''}</p>
</div>
</div>
<button
class="bg-secondary text-white px-8 py-3 rounded-lg font-newsreader font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-secondary/20"
>
Valider ma sélection
</button>
</div>
</div>
{:else}
<FAB count={cartCount} />
{/if}