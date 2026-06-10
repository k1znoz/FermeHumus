<svelte:head>
	<title>Commande validée — Ferme de l'Humus</title>
	<meta name="description" content="Votre commande a bien été enregistrée et votre stock a été réservé." />
</svelte:head>

<script>
	let { data } = $props();
	const order = $derived(data.order);
</script>

<div class="pt-28 pb-20 px-margin-mobile md:px-lg max-w-[960px] mx-auto">
	<section class="rounded-3xl bg-white border border-[#2D4236]/10 shadow-ambient overflow-hidden">
		<div class="grid md:grid-cols-[0.85fr_1.15fr]">
			<div class="bg-[#172c21] text-white p-lg md:p-xl flex flex-col justify-between gap-6">
				<div>
					<span class="font-label-caps uppercase tracking-[0.2em] text-[#d0e8d7] block mb-3">Commande reçue</span>
					<h1 class="font-h1 text-h1 mb-4">Votre sélection est bien enregistrée.</h1>
					<p class="text-white/80">
						Nous avons réservé les quantités demandées et transmis la commande à la ferme.
					</p>
				</div>
				<div class="rounded-2xl bg-white/10 border border-white/10 p-4 text-sm leading-relaxed">
					<p class="font-semibold">Que se passe-t-il maintenant ?</p>
					<p class="mt-2 text-white/80">
						L'atelier reçoit la demande, puis vous confirme le retrait par e-mail ou téléphone si besoin.
					</p>
				</div>
			</div>

			<div class="p-lg md:p-xl">
				{#if order}
					<div class="space-y-5">
						<div class="rounded-2xl bg-[#f5f5dc] border border-[#2D4236]/10 p-5">
							<p class="text-xs uppercase tracking-widest text-secondary font-semibold">Numéro de commande</p>
							<p class="font-h2 text-h2 text-primary mt-2">{order.orderNumber}</p>
							<p class="mt-2 text-sm text-on-surface-variant">Montant estimé: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(order.totalAmount ?? 0)}</p>
						</div>

						<div>
							<h2 class="font-h3 text-primary mb-3">Résumé</h2>
							<div class="space-y-2">
								{#each order.items ?? [] as item}
									<div class="flex items-center justify-between gap-4 rounded-xl border border-[#e3e2e0] px-4 py-3">
										<div>
											<p class="font-medium text-primary">{item.productName}</p>
											<p class="text-sm text-on-surface-variant">Quantité: {item.quantity}</p>
										</div>
										<p class="font-semibold text-secondary">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.subtotal ?? 0)}</p>
									</div>
								{/each}
							</div>
						</div>

						<div class="grid sm:grid-cols-2 gap-3 text-sm">
							<div class="rounded-xl bg-surface-container-low p-4">
								<p class="text-on-surface-variant">Point de retrait</p>
								<p class="font-medium text-primary mt-1">{order.pickupLocation}</p>
							</div>
							<div class="rounded-xl bg-surface-container-low p-4">
								<p class="text-on-surface-variant">Suivi</p>
								<p class="font-medium text-primary mt-1">Nous gardons votre sélection de côté.</p>
							</div>
						</div>
					</div>
				{:else}
					<div class="space-y-4">
						<p class="font-h2 text-h2 text-primary">Commande introuvable</p>
						<p class="text-on-surface-variant">Le lien de confirmation est incomplet ou la commande n'a pas encore été enregistrée.</p>
						<a href="/produits" class="inline-flex items-center gap-2 rounded-xl bg-secondary text-white px-6 py-3 font-semibold hover:opacity-90 transition-colors">
							<span class="material-symbols-outlined text-base">shopping_bag</span>
							Retour aux produits
						</a>
					</div>
				{/if}
			</div>
		</div>
	</section>
</div>