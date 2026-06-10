<svelte:head>
	<title>Commande validée — Ferme de l'Humus</title>
	<meta name="description" content="Votre commande a bien été enregistrée et votre stock a été réservé." />
</svelte:head>

<script>
	let { data } = $props();
	const order = $derived(data.order);
	const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

	function formatMoney(value) {
		return money.format(value ?? 0);
	}

	function formatDate(value) {
		if (!value) return 'Date non précisée';
		return new Intl.DateTimeFormat('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(new Date(value));
	}
</script>

<div class="pt-24 pb-20 px-margin-mobile md:px-lg">
	<div class="max-w-[1040px] mx-auto relative">
		<div class="absolute -z-10 inset-x-8 top-6 h-[460px] rounded-[42px] bg-[radial-gradient(circle_at_top_left,rgba(143,170,145,0.22),transparent_58%),radial-gradient(circle_at_bottom_right,rgba(23,44,33,0.12),transparent_62%)]"></div>

		<section class="rounded-[32px] bg-white border border-[#2D4236]/10 shadow-ambient overflow-hidden">
			{#if order}
				<div class="grid lg:grid-cols-[0.95fr_1.05fr]">
					<div class="bg-[linear-gradient(160deg,#0f2b20_0%,#173a2b_52%,#1f4b37_100%)] text-white p-lg md:p-xl flex flex-col gap-7">
						<div class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/20">
							<span class="material-symbols-outlined text-[#d0e8d7]">check_circle</span>
						</div>

						<div>
							<p class="font-label-caps uppercase tracking-[0.22em] text-[#d0e8d7]">Commande confirmée</p>
							<h1 class="font-h1 text-h1 mt-3 mb-4 leading-[1.04]">Votre sélection est bien enregistrée.</h1>
							<p class="text-white/85 leading-relaxed max-w-[26ch]">
								Les quantités ont été réservées et la demande est transmise à l'atelier.
							</p>
						</div>

						<div class="rounded-2xl bg-white/10 border border-white/15 p-4 text-sm leading-relaxed backdrop-blur-[2px]">
							<p class="font-semibold text-white">Prochaine étape</p>
							<p class="mt-2 text-white/80">
								Nous vous confirmons le retrait par e-mail ou téléphone dès validation interne.
							</p>
						</div>

						<div class="grid grid-cols-2 gap-3 text-xs">
							<div class="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
								<p class="uppercase tracking-widest text-white/65">Réservée le</p>
								<p class="text-white mt-1 font-medium normal-case tracking-normal">{formatDate(order.reservedAt)}</p>
							</div>
							<div class="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
								<p class="uppercase tracking-widest text-white/65">Statut</p>
								<p class="text-white mt-1 font-medium">Réservée</p>
							</div>
						</div>
					</div>

					<div class="p-lg md:p-xl">
						<div class="rounded-2xl border border-[#2D4236]/10 bg-[#f5f5dc] p-5 md:p-6">
							<div class="flex flex-wrap items-start justify-between gap-4">
								<div>
									<p class="text-[11px] uppercase tracking-[0.16em] text-secondary font-semibold">Numéro de commande</p>
									<p class="font-h2 text-h2 text-primary mt-2 break-all">{order.orderNumber}</p>
								</div>
								<div class="rounded-xl bg-white/80 border border-[#2D4236]/10 px-4 py-2">
									<p class="text-xs uppercase tracking-widest text-on-surface-variant">Montant estimé</p>
									<p class="font-semibold text-secondary mt-1">{formatMoney(order.totalAmount)}</p>
								</div>
							</div>
						</div>

						<div class="mt-6">
							<div class="flex items-center justify-between mb-3">
								<h2 class="font-h3 text-primary">Résumé</h2>
								<p class="text-sm text-on-surface-variant">{order.items?.length ?? 0} article{(order.items?.length ?? 0) > 1 ? 's' : ''}</p>
							</div>
							<div class="space-y-2.5">
								{#each order.items ?? [] as item}
									<div class="flex items-center justify-between gap-4 rounded-xl border border-[#e3e2e0] bg-white px-4 py-3">
										<div class="min-w-0">
											<p class="font-medium text-primary truncate">{item.productName}</p>
											<p class="text-sm text-on-surface-variant">Quantité: {item.quantity} · Prix unitaire: {formatMoney(item.unitPrice)}</p>
										</div>
										<p class="font-semibold text-secondary whitespace-nowrap">{formatMoney(item.subtotal)}</p>
									</div>
								{/each}
							</div>
						</div>

						<div class="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
							<div class="rounded-xl bg-surface-container-low p-4 border border-[#2D4236]/8">
								<p class="text-on-surface-variant">Point de retrait</p>
								<p class="font-medium text-primary mt-1 leading-snug">{order.pickupLocation}</p>
							</div>
							<div class="rounded-xl bg-surface-container-low p-4 border border-[#2D4236]/8">
								<p class="text-on-surface-variant">Suivi</p>
								<p class="font-medium text-primary mt-1">Votre sélection est bloquée en stock.</p>
							</div>
						</div>

						<div class="mt-6 flex flex-wrap gap-3">
							<a href="/produits" class="inline-flex items-center gap-2 rounded-xl bg-secondary text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-colors">
								<span class="material-symbols-outlined text-base">shopping_bag</span>
								Continuer mes achats
							</a>
							<a href="/ou-nous-trouver" class="inline-flex items-center gap-2 rounded-xl border border-[#2D4236]/15 bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-surface-container-low transition-colors">
								<span class="material-symbols-outlined text-base">storefront</span>
								Infos retrait
							</a>
						</div>
					</div>
				</div>
			{:else}
				<div class="p-xl text-center max-w-[680px] mx-auto">
					<div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5dc] border border-[#2D4236]/15 text-secondary mb-4">
						<span class="material-symbols-outlined">receipt_long</span>
					</div>
					<p class="font-h2 text-h2 text-primary">Commande introuvable</p>
					<p class="text-on-surface-variant mt-3 max-w-[48ch] mx-auto">
						Le lien de confirmation est incomplet ou la commande n'a pas encore été enregistrée.
					</p>
					<div class="mt-6 flex justify-center">
						<a href="/produits" class="inline-flex items-center gap-2 rounded-xl bg-secondary text-white px-6 py-3 font-semibold hover:opacity-90 transition-colors">
							<span class="material-symbols-outlined text-base">shopping_bag</span>
							Retour aux produits
						</a>
					</div>
				</div>
			{/if}
		</section>
	</div>
</div>