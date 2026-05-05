<script>
	let { data } = $props();

	const marches = $derived(data.markets?.filter((m) => m.type === 'marche') ?? [
		{ _id: '1', name: 'Marché de Granville', schedule: 'Samedi, 08:00 — 13:00', address: 'Place du Marché' },
		{ _id: '2', name: 'Marché Bio de Caen', schedule: 'Vendredi, 15:00 — 19:00', address: 'Place Saint-Sauveur' }
	]);

	const partenaires = $derived(data.markets?.filter((m) => m.type === 'partenaire') ?? [
		{ _id: '3', name: "L'Épicerie de Demain", schedule: 'Mar–Sam, 09:00 — 19:00', address: '' }
	]);
</script>

<svelte:head>
	<title>Où Nous Trouver — Ferme de l'Humus</title>
	<meta name="description" content="Retrouvez nos produits biologiques sur les marchés locaux, chez nos partenaires, ou venez directement à la ferme. Horaires et itinéraires." />
</svelte:head>

<div class="pt-32 pb-xl px-margin-mobile md:px-0">
	<div class="max-w-[1140px] mx-auto">

		<!-- Hero Header -->
		<section class="mb-lg text-center md:text-left">
			<span class="font-label-caps text-secondary uppercase tracking-[0.2em] mb-sm block">Trouver nos produits</span>
			<h1 class="font-h1 text-h1 text-primary mb-md">Où nous trouver</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
				De la terre à votre table. Retrouvez nos récoltes saisonnières sur les marchés locaux, dans
				nos boutiques partenaires, ou venez nous rendre visite directement à la ferme.
			</p>
		</section>

		<!-- Map + Markets Bento -->
		<section class="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-xl">
			<!-- Map -->
			<div
				class="md:col-span-8 h-[500px] bg-surface-container-low rounded-xl overflow-hidden relative shadow-ambient border border-outline-variant/20"
			>
				<img
					src="https://cataas.com/cat"
					alt="Carte de la région — Ferme de l'Humus"
					class="w-full h-full object-cover grayscale-[20%] opacity-90"
				/>
				<!-- Map Marker -->
				<div class="absolute top-1/4 left-1/3 group cursor-pointer">
					<div
						class="bg-secondary text-on-secondary p-2 rounded-full shadow-lg scale-100 group-hover:scale-110 transition-transform"
					>
						<span class="material-symbols-outlined block" style="font-variation-settings: 'FILL' 1;">location_on</span>
					</div>
					<div
						class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
					>
						<span class="text-xs font-bold text-primary">La Ferme de l'Humus</span>
					</div>
				</div>
				<!-- Zoom Controls -->
				<div class="absolute bottom-6 right-6 flex flex-col gap-2">
					<button class="bg-white/90 backdrop-blur p-2 rounded-lg shadow-md text-primary hover:bg-white transition-colors" aria-label="Zoom avant">
						<span class="material-symbols-outlined">add</span>
					</button>
					<button class="bg-white/90 backdrop-blur p-2 rounded-lg shadow-md text-primary hover:bg-white transition-colors" aria-label="Zoom arrière">
						<span class="material-symbols-outlined">remove</span>
					</button>
				</div>
			</div>

			<!-- Markets Sidebar -->
			<div class="md:col-span-4 flex flex-col gap-gutter">
				<div class="bg-white p-lg rounded-xl shadow-ambient border border-outline-variant/10 flex-1">
					<h3 class="font-h3 text-h3 text-primary mb-md">Marchés de Semaine</h3>
					<ul class="space-y-md">
						{#each marches as m (m._id)}
							<li class="flex items-start gap-4">
								<span class="material-symbols-outlined text-secondary mt-1">storefront</span>
								<div>
									<p class="font-bold text-primary">{m.name}</p>
									<p class="text-sm text-on-surface-variant">{m.schedule}</p>
									{#if m.address}
										<p class="text-xs text-outline italic">{m.address}</p>
									{/if}
								</div>
							</li>
						{/each}
					</ul>

					<div class="mt-lg pt-lg border-t border-outline-variant/10">
						<h3 class="font-h3 text-h3 text-primary mb-md">Partenaires</h3>
						<ul class="space-y-md">
							{#each partenaires as p (p._id)}
								<li class="flex items-start gap-4">
									<span class="material-symbols-outlined text-secondary mt-1">local_mall</span>
									<div>
										<p class="font-bold text-primary">{p.name}</p>
										<p class="text-sm text-on-surface-variant">{p.schedule}</p>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- Directions -->
		<section class="grid grid-cols-1 md:grid-cols-2 gap-xl items-center mb-xl">
			<div class="order-2 md:order-1">
				<div class="relative rounded-2xl overflow-hidden aspect-video shadow-ambient">
					<img
						src="https://cataas.com/cat"
						alt="Chemin menant à la ferme"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
			<div class="order-1 md:order-2">
				<span class="font-label-caps text-secondary uppercase tracking-[0.2em] mb-sm block">Venir à la Ferme</span>
				<h2 class="font-h2 text-h2 text-primary mb-md">Vente directe & Visites</h2>
				<p class="font-body-md text-on-surface-variant mb-lg">
					Nous vous accueillons tous les mercredis après-midi pour la vente directe au hangar.
					C'est l'occasion idéale de voir où poussent vos légumes et d'échanger sur nos pratiques
					de régénération.
				</p>
				<div class="space-y-gutter">
					<div class="bg-surface-container-low p-md rounded-lg flex items-center gap-4">
						<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">directions_car</span>
						<div>
							<p class="font-bold text-primary">Accès Voiture</p>
							<p class="text-sm text-on-surface-variant">D971, suivre "Chemin de l'Humus"</p>
						</div>
					</div>
					<div class="bg-surface-container-low p-md rounded-lg flex items-center gap-4">
						<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">schedule</span>
						<div>
							<p class="font-bold text-primary">Horaires d'ouverture</p>
							<p class="text-sm text-on-surface-variant">Mercredi, 14:00 — 18:30</p>
						</div>
					</div>
				</div>
				<a
					href="https://maps.google.com"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-lg flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all"
				>
					<span>Obtenir l'itinéraire</span>
					<span class="material-symbols-outlined">arrow_forward</span>
				</a>
			</div>
		</section>

	</div>
</div>
