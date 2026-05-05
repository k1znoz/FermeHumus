<script>
	let { data } = $props();

	let filter = $state('all');

	const filtered = $derived(
		filter === 'all' ? data.events : data.events.filter((event) => event.type === filter)
	);

	function formatDate(dateStr) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		if (d.toDateString() === today.toDateString()) return "Aujourd'hui";
		if (d.toDateString() === yesterday.toDateString()) return 'Hier';
		return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
	}

	// Groupe par date
	const grouped = $derived(
		filtered.reduce((acc, entry) => {
			const key = entry.eventDate ?? 'Sans date';
			if (!acc[key]) acc[key] = [];
			acc[key].push(entry);
			return acc;
		}, {})
	);
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-6">
	<!-- En-tête -->
	<div class="mb-1">
		<p class="text-xs font-semibold text-[#964824] uppercase tracking-widest">Journal des mouvements</p>
		<h1 class="font-serif text-2xl font-semibold text-[#172c21]">Historique</h1>
		<p class="text-sm text-[#737873] mt-0.5">Récoltes et transformations enregistrées par l'équipe.</p>
	</div>

	<!-- Filtres -->
	<div class="flex gap-2 mt-5 mb-6 overflow-x-auto scrollbar-none">
		{#each [['all', 'Tous'], ['harvest', 'Récoltes'], ['transformation', 'Transformations']] as [val, label]}
			<button
				onclick={() => (filter = val)}
				class="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors {filter === val
					? 'bg-[#172c21] text-white'
					: 'bg-[#e9e8e5] text-[#424844] hover:bg-[#d0e8d7]'}"
			>
				{label}
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="text-sm text-[#737873] text-center py-12">Aucun mouvement enregistré.</p>
	{:else}
		<div class="space-y-6">
			{#each Object.entries(grouped) as [date, entries]}
				<div>
					<p class="text-xs font-semibold text-[#737873] uppercase tracking-wide mb-2 ml-1">
						{formatDate(date)}
					</p>

					<!-- Timeline -->
					<div class="relative">
						<div class="absolute left-5 top-0 bottom-0 w-px bg-[#e3e2e0]"></div>
						<div class="space-y-3">
							{#each entries as entry}
								<div class="flex items-start gap-4 pl-1">
									<!-- Pastille -->
									{#if entry.type === 'harvest'}
										<div class="w-9 h-9 rounded-full bg-[#d0e8d7] border-2 border-white flex items-center justify-center shrink-0 z-10">
											<svg class="w-4 h-4 text-[#172c21]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
												<path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
											</svg>
										</div>
									{:else}
										<div class="w-9 h-9 rounded-full bg-[#ffdbcd] border-2 border-white flex items-center justify-center shrink-0 z-10">
											<svg class="w-4 h-4 text-[#964824]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
												<path d="M7 7h11v11" />
												<path d="M17 7 7 17" />
												<path d="M17 17H6V6" />
											</svg>
										</div>
									{/if}

									<!-- Contenu -->
									<div class="flex-1 rounded-2xl bg-white border border-[#e3e2e0] p-3">
										{#if entry.type === 'harvest'}
											<p class="text-sm font-semibold text-[#1a1c1a]">
												+{entry.quantity} {entry.unit} — {entry.product?.name ?? '—'}
											</p>
											<p class="text-xs text-[#737873] mt-0.5">
												Récolte
												{#if entry.recordedBy} · par <span class="font-medium text-[#424844]">{entry.recordedBy}</span>{/if}
												{#if entry.terrainCondition} · {entry.terrainCondition}{/if}
											</p>
										{:else}
											<p class="text-sm font-semibold text-[#1a1c1a]">
												{entry.inputProduct?.name ?? 'Brut'} -> {entry.outputProduct?.name ?? 'Transformé'}
											</p>
											<p class="text-xs text-[#737873] mt-0.5">
												-{entry.inputQuantity} {entry.inputUnit} / +{entry.outputQuantity} {entry.outputUnit}
												{#if entry.recordedBy} · par <span class="font-medium text-[#424844]">{entry.recordedBy}</span>{/if}
											</p>
											{#if entry.batchNumber}
												<p class="text-xs text-[#424844] mt-1">Lot: {entry.batchNumber}</p>
											{/if}
											{#if entry.estimatedWaste > 0}
												<p class="text-xs text-[#964824] mt-1">Pertes estimées: {entry.estimatedWaste}</p>
											{/if}
										{/if}
										{#if entry.notes}
											<p class="text-xs text-[#964824] mt-1 italic">{entry.notes}</p>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- CTA -->
	<div class="mt-10 grid grid-cols-2 gap-3">
		<a
			href="/admin/harvest"
			class="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#c2c8c2] py-4 text-sm text-[#737873] hover:border-[#172c21] hover:text-[#172c21] transition-colors"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
			</svg>
			Récolte
		</a>
		<a
			href="/admin/transform"
			class="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#c2c8c2] py-4 text-sm text-[#737873] hover:border-[#172c21] hover:text-[#172c21] transition-colors"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M7 7h11v11" />
				<path d="M17 7 7 17" />
				<path d="M17 17H6V6" />
			</svg>
			Transformation
		</a>
	</div>
</div>
