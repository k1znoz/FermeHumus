<script>
	import FAB from '$lib/components/FAB.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';

	let { data } = $props();

	const { featuredProducts } = data;

	// Fallback products for when Sanity is not yet configured
	const fallbackProducts = [
		{
			_id: '1',
			name: 'Fruits de saison',
			badge: 'Saisonnier',
			subtitle: 'Panier mix de 3kg',
			price: 12.5,
			image: 'https://cataas.com/cat',
		},
		{
			_id: '2',
			name: 'Confitures artisanales',
			badge: 'Artisanal',
			subtitle: 'Pot 250g',
			price: 6.5,
			image: 'https://cataas.com/cat',
		},
		{
			_id: '3',
			name: 'Plants de légumes',
			badge: 'De saison',
			subtitle: 'Plaquette de 6',
			price: 4.0,
			image: 'https://cataas.com/cat',
		},
	];

	const products = $derived(featuredProducts?.length ? featuredProducts : fallbackProducts);
	let cartCount = $state(0);

	function addToCart() {
		cartCount++;
	}
</script>

<svelte:head>
	<title>Ferme de l'Humus — Cultiver le Vivant</title>
	<meta name="description" content="Ferme biologique régénératrice en Normandie. Produits frais, séjours à la ferme, et soirées tartes flambées." />
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────── -->
<section class="relative h-[751px] w-full flex items-end pb-xl px-margin-mobile md:px-lg overflow-hidden">
	<div class="absolute inset-0 z-0">
		<img
			class="w-full h-full object-cover"
			src="https://cataas.com/cat"
			alt="Ferme de l'Humus — paysage agricole régénérateur au coucher du soleil"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
	</div>
	<div class="relative z-10 max-w-4xl">
		<h1 class="font-h1 text-h1 text-white mb-md leading-none">
			Ferme de l'Humus : Cultiver le Vivant, Nourrir le Local.
		</h1>
		<p class="font-body-lg text-body-lg text-white/90 mb-lg max-w-xl">
			Une agriculture régénératrice au service de la biodiversité et de votre santé.
		</p>
		<a
			href="/a-propos"
			class="inline-block bg-secondary text-on-secondary px-8 py-4 rounded-lg font-label-caps uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
		>
			Découvrir la ferme
		</a>
	</div>
</section>

<!-- ─── Quick Actions ─────────────────────────────────────────────── -->
<section class="px-margin-mobile -mt-12 relative z-20 md:max-w-[1140px] md:mx-auto">
	<div
		class="grid grid-cols-3 gap-gutter bg-surface-container-lowest p-sm md:p-md rounded-xl shadow-ambient border border-outline-variant/10"
	>
		<a
			href="/produits"
			class="flex flex-col items-center gap-xs py-4 hover:bg-surface-container rounded-lg transition-colors"
		>
			<span class="material-symbols-outlined text-secondary text-3xl">shopping_basket</span>
			<span class="font-label-caps text-on-surface-variant text-[10px] md:text-xs uppercase">Commander</span>
		</a>
		<a
			href="/reserver"
			class="flex flex-col items-center gap-xs py-4 hover:bg-surface-container rounded-lg transition-colors"
		>
			<span class="material-symbols-outlined text-secondary text-3xl">calendar_today</span>
			<span class="font-label-caps text-on-surface-variant text-[10px] md:text-xs uppercase">Réserver</span>
		</a>
		<a
			href="/ou-nous-trouver"
			class="flex flex-col items-center gap-xs py-4 hover:bg-surface-container rounded-lg transition-colors"
		>
			<span class="material-symbols-outlined text-secondary text-3xl">location_on</span>
			<span class="font-label-caps text-on-surface-variant text-[10px] md:text-xs uppercase">Nous trouver</span>
		</a>
	</div>
</section>

<!-- ─── Storytelling ──────────────────────────────────────────────── -->
<section class="py-xl px-margin-mobile md:px-lg md:max-w-[1140px] md:mx-auto">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
		<div class="space-y-md">
			<span class="font-label-caps text-secondary tracking-widest uppercase">Notre Philosophie</span>
			<h2 class="font-h2 text-h2 text-primary">Le respect du sol comme fondement.</h2>
			<p class="font-body-md text-on-surface-variant leading-relaxed">
				À la Ferme de l'Humus, nous pratiquons une agriculture biologique qui va au-delà des labels.
				En prenant soin de la vie microbienne de nos sols, nous produisons des aliments d'une densité
				nutritionnelle exceptionnelle tout en restaurant les écosystèmes locaux.
			</p>
			<a
				href="/a-propos"
				class="inline-block border-b-2 border-secondary pb-1 font-label-caps text-primary hover:text-secondary transition-colors uppercase tracking-widest"
			>
				En savoir plus
			</a>
		</div>
		<div class="relative aspect-square rounded-xl overflow-hidden">
			<img
				class="w-full h-full object-cover"
				src="https://cataas.com/cat"
				alt="Mains tenant de la terre saine — symbole de l'agriculture biologique"
			/>
		</div>
	</div>
</section>

<!-- ─── Featured Products ─────────────────────────────────────────── -->
<section class="bg-surface-container-low py-xl px-margin-mobile">
	<div class="md:max-w-[1140px] md:mx-auto">
		<div class="flex justify-between items-end mb-lg">
			<h2 class="font-h2 text-h2 text-primary">Récoltes du moment</h2>
			<a href="/produits" class="font-label-caps text-secondary uppercase tracking-widest">Voir tout</a>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
			{#each products as product (product._id)}
				<div class="bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,66,54,0.05)] overflow-hidden group">
					<div class="aspect-[4/3] overflow-hidden">
						<img
							src={product.image || 'https://placehold.co/600x450/efeeeb/172c21?text=Photo+bient%C3%B4t'}
							alt={product.name}
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
					</div>
					<div class="p-md">
						{#if product.badge}
							<span class="font-label-caps text-on-tertiary-container bg-tertiary-fixed px-2 py-1 rounded-full text-[10px] mb-2 inline-block">
								{product.badge}
							</span>
						{/if}
						<h3 class="font-h3 text-h3 text-primary mb-xs">{product.name}</h3>
						<p class="font-body-md text-on-surface-variant mb-sm">{product.subtitle ?? product.description ?? ''}</p>
						<div class="flex justify-between items-center">
							<span class="font-bold text-primary">{product.price.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</span>
							<button
								onclick={addToCart}
								class="bg-primary text-on-primary p-2 rounded-lg flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
								aria-label="Ajouter {product.name} au panier"
							>
								<span class="material-symbols-outlined">add</span>
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Services ──────────────────────────────────────────────────── -->
<section class="py-xl px-margin-mobile md:px-lg md:max-w-[1140px] md:mx-auto">
	<h2 class="font-h2 text-h2 text-primary mb-lg text-center md:text-left">Vivre la Ferme</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-md">
		<ServiceCard
			title="Accueil Paysan"
			subtitle="Séjours immersifs au cœur du domaine."
			image="https://cataas.com/cat"
			href="/reserver"
		/>
		<ServiceCard
			title="Soirées Tartes Flambées"
			subtitle="Chaque vendredi soir, convivialité au feu de bois."
			image="https://cataas.com/cat"
			href="/reserver"
		/>
	</div>
</section>

<!-- ─── CTA ───────────────────────────────────────────────────────── -->
<section class="py-xl px-margin-mobile bg-[#F5F5DC]">
	<div class="md:max-w-2xl mx-auto text-center space-y-md">
		<h2 class="font-h1 text-h2 md:text-h1 text-primary">Rejoignez l'aventure paysanne</h2>
		<p class="font-body-lg text-on-surface-variant">
			Soutenez une agriculture de bon sens et restez informé de nos prochaines récoltes et événements.
		</p>
		<div class="pt-sm flex flex-col sm:flex-row gap-sm justify-center">
			<a
				href="/ou-nous-trouver"
				class="bg-primary text-on-primary px-lg py-4 rounded-lg font-label-caps uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all text-center"
			>
				Contactez-nous
			</a>
			<button
				class="border border-primary text-primary px-lg py-4 rounded-lg font-label-caps uppercase tracking-widest hover:bg-primary/5 transition-all"
			>
				S'inscrire à la newsletter
			</button>
		</div>
	</div>
</section>

<!-- FAB Basket -->
<FAB count={cartCount} />
