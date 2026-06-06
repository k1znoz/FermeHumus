<svelte:head>
	<title>Où Nous Trouver — Ferme de l'Humus</title>
	<meta name="description" content="Retrouvez nos produits sur les marchés locaux, en AMAP, ou visitez notre labo à Ailly-sur-Somme. Horaires et itinéraires." />
</svelte:head>

<div class="pt-32 pb-xl px-margin-mobile md:px-0">
	<div class="max-w-[1140px] mx-auto">

		<!-- Hero Header -->
		<section class="mb-lg text-center md:text-left">
			<span class="font-label-caps text-secondary uppercase tracking-[0.2em] mb-sm block">Trouver nos produits</span>
			<h1 class="font-h1 text-h1 text-primary mb-md">Où nous trouver</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
				De la terre à votre table. Retrouvez nos récoltes saisonnières sur les marchés locaux, en AMAP,
				ou venez nous rendre visite directement au labo à Ailly-sur-Somme.
			</p>
		</section>

		<!-- Marchés & AMAP -->
		<section class="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-xl">

			<!-- Marchés -->
			<div class="bg-white p-lg rounded-xl shadow-ambient border border-outline-variant/10">
				<div class="flex items-center gap-3 mb-md">
					<span class="material-symbols-outlined text-secondary">storefront</span>
					<h2 class="font-h2 text-h2 text-primary">Marchés</h2>
				</div>
				<ul class="space-y-md">
					<li class="flex items-start gap-4">
						<div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
							<span class="material-symbols-outlined text-primary text-base">event</span>
						</div>
						<div>
							<p class="font-bold text-primary">Marché de Rivery</p>
							<p class="text-sm text-on-surface-variant">Mardi de 16h30 à 19h</p>
							<p class="text-xs text-outline italic mt-0.5">Place de la mairie, Rivery</p>
						</div>
					</li>
				</ul>
			</div>

			<!-- AMAP -->
			<div class="bg-white p-lg rounded-xl shadow-ambient border border-outline-variant/10">
				<div class="flex items-center gap-3 mb-md">
					<span class="material-symbols-outlined text-secondary">volunteer_activism</span>
					<h2 class="font-h2 text-h2 text-primary">AMAP</h2>
				</div>
				<ul class="space-y-md">
					<li class="flex items-start gap-4">
						<div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
							<span class="material-symbols-outlined text-primary text-base">location_on</span>
						</div>
						<div>
							<p class="font-bold text-primary">AMAP de Salouël</p>
							<p class="text-sm text-on-surface-variant">Jeudi soir</p>
							<p class="text-xs text-outline italic mt-0.5">Salle de l'Arc, Salouël</p>
						</div>
					</li>
					<li class="flex items-start gap-4">
						<div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
							<span class="material-symbols-outlined text-primary text-base">location_on</span>
						</div>
						<div>
							<p class="font-bold text-primary">AMAP Ché Carotte</p>
							<p class="text-sm text-on-surface-variant">Jeudi soir</p>
							<p class="text-xs text-outline italic mt-0.5">Espace Dewailly, Amiens</p>
						</div>
					</li>
				</ul>
			</div>
		</section>

		<!-- Labo de transformation -->
		<section class="grid grid-cols-1 md:grid-cols-2 gap-xl items-center mb-xl">
			<div class="order-1">
				<span class="font-label-caps text-secondary uppercase tracking-[0.2em] mb-sm block">Sur rendez-vous</span>
				<h2 class="font-h2 text-h2 text-primary mb-md">Labo de transformation</h2>
				<p class="font-body-md text-on-surface-variant mb-lg">
					Notre labo est ouvert sur rendez-vous. Venez découvrir nos produits transformés directement
					sur place ou passez commande lors de votre visite.
				</p>

				<div class="space-y-gutter mb-lg">
					<div class="bg-surface-container-low p-md rounded-lg flex items-center gap-4">
						<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">location_on</span>
						<div>
							<p class="font-bold text-primary">Adresse</p>
							<p class="text-sm text-on-surface-variant">15 bis rue du Pont<br />80470 Ailly-sur-Somme</p>
						</div>
					</div>
					<div class="bg-surface-container-low p-md rounded-lg flex items-center gap-4">
						<span class="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">schedule</span>
						<div>
							<p class="font-bold text-primary">Horaires</p>
							<p class="text-sm text-on-surface-variant">Sur rendez-vous uniquement</p>
						</div>
					</div>
				</div>

				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-xl bg-[#172c21] text-white px-6 py-3 text-sm font-semibold hover:bg-[#2d4236] transition-colors"
				>
					<span class="material-symbols-outlined text-base">calendar_month</span>
					Prendre rendez-vous
				</a>
			</div>

			<div class="order-2">
				<div class="relative rounded-2xl overflow-hidden aspect-video shadow-ambient bg-surface-container-low flex items-center justify-center">
					<span class="material-symbols-outlined text-5xl text-outline">science</span>
				</div>
			</div>
		</section>

	</div>
</div>
