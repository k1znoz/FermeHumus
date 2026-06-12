<script>
  import { enhance } from '$app/forms';
  import FAB from '$lib/components/FAB.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { ORDER_PICKUP_LOCATIONS, ORDER_REFERRAL_SOURCES } from '$lib/constants.js';

  let { data, form } = $props();
  let orderForm = $state(null);
  let submitting = $state(false);

  const visualFallbacks = [
    { match: ['coulis', 'tomate'], image: '/images/ferme/produit-coulis-tomates.jpg' },
    { match: ['confiture', 'prune'], image: '/images/ferme/produit-confiture-prunes.jpg' },
    { match: ['jus', 'pomme'], image: '/images/ferme/produit-jus-pomme-1l.jpg' },
    { match: ['plants', 'plant', 'blette'], image: '/images/ferme/serre-caisses.jpg' },
    { match: ['sirop'], image: '/images/ferme/produit-jus-pomme-1l.jpg' },
    { match: ['cornichon'], image: '/images/ferme/produit-coulis-tomates.jpg' },
    { match: ['shiitak'], image: '/images/ferme/labo-boris-confiture.jpg' }
  ];

  function resolveProductImage(product) {
    const source = `${product.name ?? ''} ${product.category ?? ''} ${product.description ?? ''}`.toLowerCase();
    const fallback = visualFallbacks.find(({ match }) => match.every((token) => source.includes(token)));
    return product.image || fallback?.image || '/images/ferme/produit-jus-pomme-1l.jpg';
  }

  const allProducts = $derived(
    (data.products ?? []).map((product) => ({
        ...product,
        image: resolveProductImage(product)
      }))
  );

  const categories = $derived(['Tous', ...new Set(allProducts.map((p) => p.category))]);
  let activeCategory = $state('Tous');
  const filtered = $derived(
    activeCategory === 'Tous' ? allProducts : allProducts.filter((p) => p.category === activeCategory)
  );

  let cart = $state([]);
  const cartCount = $derived(cart.reduce((sum, item) => sum + item.quantity, 0));
  const cartTotal = $derived(cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0));
  const cartPayload = $derived(cart.map(({ product, quantity }) => ({ productId: product._id, quantity })));
  const moneyFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

  function formatMoney(value) {
    return moneyFormatter.format(value);
  }

  function addToCart(product) {
    const existing = cart.find((item) => item.product._id === product._id);

    if (existing) {
      cart = cart.map((item) =>
        item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return;
    }

    cart = [...cart, { product, quantity: 1 }];
  }

  function removeFromCart(productId) {
    const existing = cart.find((item) => item.product._id === productId);
    if (!existing) {
      return;
    }

    if (existing.quantity <= 1) {
      cart = cart.filter((item) => item.product._id !== productId);
      return;
    }

    cart = cart.map((item) =>
      item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
  }

  function clearCart() {
    cart = [];
  }
</script>

<svelte:head>
<title>Nos Produits — Ferme de l'Humus</title>
<meta name="description" content="Produits de saison de la Ferme de l'Humus : frais, transformés et plants. Commande en direct et retrait local." />
</svelte:head>

<div class="pt-24 pb-32 px-margin-mobile md:px-lg max-w-[1140px] mx-auto">
<!-- Hero -->
<section class="mb-lg">
<h1 class="font-h1 text-h1 text-primary mb-sm">Notre Catalogue</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
Produits de saison cultivés à la ferme et transformation artisanale sur place. Commandez en ligne,
puis récupérez votre sélection sur marché ou sur rendez-vous.
</p>
</section>


{#if allProducts.length > 0}
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
{/if}

<!-- Products Grid -->
{#if filtered.length > 0}
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
{#each filtered as product (product._id)}
<ProductCard {product} onAdd={addToCart} />
{/each}
</section>
{:else}
<section class="mb-lg rounded-2xl border border-[#2D4236]/12 bg-[#f8f7f3] p-lg md:p-xl shadow-ambient">
  <div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-start">
    <div class="w-12 h-12 rounded-full bg-[#e9e8e5] text-[#2D4236] flex items-center justify-center">
      <span class="material-symbols-outlined">inventory_2</span>
    </div>
    <div>
      <p class="font-label-caps text-secondary uppercase tracking-widest mb-2">Un petit creux entre deux récoltes</p>
      <h2 class="font-h3 text-h3 text-primary mb-2">Notre catalogue est momentanément vide</h2>
      <p class="font-body-md text-on-surface-variant mb-4">
        Merci pour votre visite. En ce moment, tous nos produits sont écoulés ou en préparation.
        Nous remettons le catalogue à jour dès qu'une nouvelle récolte ou production est prête.
      </p>
      <div class="flex flex-wrap gap-3">
        <a href="/ou-nous-trouver" class="inline-flex items-center gap-2 rounded-xl bg-[#172c21] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#2d4236] transition-colors">
          <span class="material-symbols-outlined text-base">storefront</span>
          Voir nos prochains marchés
        </a>
        <a href="/contact" class="inline-flex items-center gap-2 rounded-xl border border-[#2D4236]/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors">
          <span class="material-symbols-outlined text-base">mail</span>
          Nous contacter
        </a>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Brand / Market harmony -->
<section class="mt-6 mb-xl rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/10 shadow-ambient">
  <div class="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-gutter items-stretch">
    <div class="p-lg md:p-xl">
      <div class="flex items-center gap-3 mb-md">
        <img
          src="/images/ferme/logo-fh.png"
          alt="Logo de la Ferme de l'Humus"
          class="h-12 w-12 object-contain rounded-full bg-white p-1 shadow-sm"
          loading="lazy"
        />
        <div>
          <span class="font-label-caps text-secondary uppercase tracking-widest block">Vente directe</span>
          <h2 class="font-h2 text-h2 text-primary">Produits de saison, marchés et retrait local</h2>
        </div>
      </div>
      <p class="font-body-md text-on-surface-variant mb-lg max-w-xl">
		Les repères sont les mêmes partout: logo, affiche marché et photos réelles. Vous commandez ici,
		puis vous choisissez le point de retrait qui vous convient.
      </p>
      <div class="flex flex-wrap gap-3">
        <a href="/ou-nous-trouver" class="inline-flex items-center gap-2 rounded-xl bg-[#172c21] text-white px-6 py-3 text-sm font-semibold hover:bg-[#2d4236] transition-colors">
          <span class="material-symbols-outlined text-base">storefront</span>
          Voir où nous trouver
        </a>
        <a href="/images/ferme/marche-affiche.pdf" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl border border-[#2D4236]/15 bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors">
          <span class="material-symbols-outlined text-base">picture_as_pdf</span>
          Affiche marché
        </a>
      </div>
    </div>
    <div class="bg-white p-md md:p-lg">
      <img
        src="/images/ferme/marche-affiche.jpg"
        alt="Affiche marché de la Ferme de l'Humus"
        class="w-full h-full object-cover rounded-xl shadow-[0px_4px_20px_rgba(45,66,54,0.05)]"
        loading="lazy"
      />
    </div>
  </div>
</section>

<!-- Tartes flambees events -->
<section class="mb-xl">
	<div class="max-w-[1140px] mx-auto rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-ambient p-lg md:p-xl grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-lg items-center">
		<div>
			<span class="font-label-caps text-secondary uppercase tracking-widest block mb-sm">Traiteur evenementiel</span>
			<h1 class="font-h1 text-h1 text-primary mb-md">Tartes flambees pour vos evenements</h1>
			<p class="font-body-md text-on-surface-variant mb-md">
				Fabrication paysanne avec des produits locaux bio, cuits sur place au four a bois le jour J.
			</p>
			<ul class="space-y-2 font-body-md text-on-surface-variant mb-lg">
				<li><strong>Format cocktail:</strong> 16 parts / tarte</li>
				<li><strong>Format repas:</strong> 4 a 6 parts / tarte</li>
				<li><strong>Minimum:</strong> 25 tartes flambees</li>
				<li><strong>Tarifs:</strong> 11,50 EUR (1 recette) et 13,50 EUR (2 recettes)</li>
			</ul>
			<div class="flex flex-wrap gap-3">
				<a href="/contact?subject=Devis%20tartes%20flambees" class="inline-flex items-center gap-2 rounded-xl bg-[#172c21] text-white px-6 py-3 text-sm font-semibold hover:bg-[#2d4236] transition-colors">
					<span class="material-symbols-outlined text-base">request_quote</span>
					Demander un devis
				</a>
				<a href="/images/ferme/tartes-flambees-evenements.pdf" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl border border-[#2D4236]/15 bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors">
					<span class="material-symbols-outlined text-base">picture_as_pdf</span>
					Voir la plaquette
				</a>
			</div>
		</div>
		<div class="bg-white rounded-xl p-md shadow-ambient">
			<img src="/images/ferme/marche-1mai-2026.jpg" alt="Prestation de la ferme pour des evenements locaux" class="w-full h-full rounded-lg object-cover" loading="lazy" />
		</div>
	</div>
</section>

</div>

<!-- Sticky Order Bar -->
{#if cartCount > 0}
<div class="fixed bottom-0 left-0 w-full bg-[#F5F5DC] border-t border-[#2D4236]/10 px-5 py-4 z-40">
  <div class="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary">
        <span class="material-symbols-outlined">shopping_basket</span>
      </div>
      <div>
        <h4 class="font-h3 text-body-lg text-primary leading-tight">Ma commande</h4>
        <p class="font-body-md text-on-surface-variant text-sm">{cartCount} article{cartCount > 1 ? 's' : ''} · {formatMoney(cartTotal)}</p>
      </div>
    </div>
    <button
      class="w-full sm:w-auto bg-secondary text-white px-8 py-3 rounded-lg font-newsreader font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-secondary/20"
      form="product-order-form"
      type="submit"
      disabled={submitting}
    >
	      {submitting ? 'Validation en cours…' : 'Valider ma sélection'}
    </button>
  </div>
</div>
{:else}
<FAB count={cartCount} />
{/if}

<button class="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl z-50 active:scale-90 transition-transform" aria-label="Réserver" form={cartCount > 0 ? 'product-order-form' : undefined} type={cartCount > 0 ? 'submit' : 'button'} disabled={submitting}>
  <span class="material-symbols-outlined">{cartCount > 0 ? 'shopping_bag' : 'calendar_today'}</span>
</button>

{#if cartCount > 0}
<section class="px-margin-mobile md:px-lg mb-36" id="validation-panier">
  <div class="max-w-[1140px] mx-auto rounded-2xl border border-[#2D4236]/10 bg-white shadow-ambient overflow-hidden">
    <div class="grid lg:grid-cols-[1.1fr_0.9fr]">
      <div class="p-lg md:p-xl bg-[#f5f5dc]">
        <p class="font-label-caps text-secondary uppercase tracking-widest mb-sm">Votre sélection</p>
        <h2 class="font-h2 text-h2 text-primary mb-md">Confirmer la commande</h2>
        <div class="space-y-3">
          {#each cart as item (item.product._id)}
            <div class="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 border border-[#2D4236]/10">
              <div class="min-w-0">
                <p class="font-medium text-primary truncate">{item.product.name}</p>
                <p class="text-sm text-on-surface-variant">{item.quantity} × {formatMoney(item.product.price)} = {formatMoney(item.quantity * item.product.price)}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button type="button" onclick={() => removeFromCart(item.product._id)} class="w-8 h-8 rounded-full border border-[#2D4236]/15 text-[#2D4236] hover:bg-white transition-colors" aria-label={`Retirer un ${item.product.name}`}>
                  −
                </button>
                <button type="button" onclick={() => addToCart(item.product)} class="w-8 h-8 rounded-full border border-[#2D4236]/15 text-[#2D4236] hover:bg-white transition-colors" aria-label={`Ajouter un ${item.product.name}`}>
                  +
                </button>
              </div>
            </div>
          {/each}
        </div>
        <div class="mt-6 flex items-center justify-between rounded-xl bg-white px-4 py-3 border border-[#2D4236]/10">
          <span class="font-medium text-primary">Total estimé</span>
          <span class="font-bold text-secondary">{formatMoney(cartTotal)}</span>
        </div>
        <p class="mt-4 text-sm text-on-surface-variant">La validation réserve les quantités en stock et transmet la commande à l'atelier.</p>
      </div>

      <div class="p-lg md:p-xl">
        <form
          id="product-order-form"
          bind:this={orderForm}
          method="POST"
          use:enhance={() => {
            submitting = true;
            return async ({ result, update }) => {
              await update();
              submitting = false;
              if (result.type === 'success') {
                clearCart();
                orderForm?.reset();
              }
            };
          }}
          class="space-y-4"
        >
          {#if form?.error}
            <p class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
          {/if}

          {#if form?.success}
            <div class="rounded-xl border border-[#2D4236]/15 bg-[#d0e8d7] px-4 py-3 text-sm text-[#172c21]">
              <p class="font-semibold">Commande validée {form.orderNumber ? `- ${form.orderNumber}` : ''}</p>
              <p class="mt-1">Les quantités ont été réservées et la notification a été envoyée à l'atelier.</p>
            </div>
          {/if}

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="customerName" class="block text-sm font-medium text-[#1a1c1a] mb-1">Nom et prénom *</label>
              <input id="customerName" name="customerName" type="text" required placeholder="Jean Dupont" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none" />
            </div>
            <div>
              <label for="customerEmail" class="block text-sm font-medium text-[#1a1c1a] mb-1">Adresse e-mail *</label>
              <input id="customerEmail" name="customerEmail" type="email" required placeholder="jean@exemple.com" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none" />
            </div>
          </div>

          <div>
            <label for="customerPhone" class="block text-sm font-medium text-[#1a1c1a] mb-1">Numéro de téléphone *</label>
            <input id="customerPhone" name="customerPhone" type="tel" required placeholder="06 00 00 00 00" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none" />
          </div>

          <div>
            <label for="pickupLocation" class="block text-sm font-medium text-[#1a1c1a] mb-1">Où souhaitez-vous retirer votre commande ? *</label>
            <select id="pickupLocation" name="pickupLocation" required class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none">
              <option value="" disabled selected>Choisir un point de retrait</option>
              {#each ORDER_PICKUP_LOCATIONS as pickupLocation}
                <option value={pickupLocation}>{pickupLocation}</option>
              {/each}
            </select>
          </div>

          <div>
            <label for="referralSource" class="block text-sm font-medium text-[#1a1c1a] mb-1">Par curiosité, comment avez-vous entendu parler de nous ?</label>
            <select id="referralSource" name="referralSource" class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none">
              <option value="">Choisir une réponse</option>
              {#each ORDER_REFERRAL_SOURCES as source}
                <option value={source}>{source}</option>
              {/each}
            </select>
          </div>

          <div class="flex items-start gap-3 rounded-xl border border-[#2D4236]/10 bg-white px-4 py-3">
            <input id="newsletterOptIn" name="newsletterOptIn" type="checkbox" class="mt-1 h-4 w-4 rounded border-[#2D4236]/30 text-[#172c21] focus:ring-[#172c21]" />
            <label for="newsletterOptIn" class="text-sm text-on-surface-variant">Je souhaite être inscrit.e à la newsletter de la ferme.</label>
          </div>

          <div>
            <label for="notes" class="block text-sm font-medium text-[#1a1c1a] mb-1">Questions, commentaires ou consignes</label>
            <textarea id="notes" name="notes" rows="4" placeholder="Informations utiles pour préparer la commande..." class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none resize-none"></textarea>
          </div>

          <input type="hidden" name="cart" value={JSON.stringify(cartPayload)} />
        </form>
      </div>
    </div>
  </div>
</section>
{/if}