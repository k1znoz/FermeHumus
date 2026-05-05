<script>
	let { data } = $props();

	const stocks = $derived(data.stocks ?? []);
	const recentHarvests = $derived(data.recentHarvests ?? []);
	const lowStockCount = $derived(data.lowStockCount ?? 0);
	const totalItems = $derived(stocks.length);
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-6">
	<!-- En-tête -->
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="font-serif text-2xl font-semibold text-[#172c21]">Tableau de bord</h1>
			<p class="text-sm text-[#737873] mt-0.5">Bonjour, bonne journée de récolte !</p>
		</div>
		<div class="w-10 h-10 rounded-full bg-[#d0e8d7] flex items-center justify-center">
			<svg class="w-5 h-5 text-[#172c21]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
			</svg>
		</div>
	</div>

	<!-- KPIs -->
	<div class="grid grid-cols-2 gap-3 mb-6">
		<div class="rounded-2xl bg-white border border-[#e3e2e0] p-4">
			<p class="text-xs text-[#737873] uppercase tracking-wide mb-1">Produits suivis</p>
			<p class="text-3xl font-semibold text-[#172c21]">{totalItems}</p>
		</div>
		<div class="rounded-2xl border p-4 {lowStockCount > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-[#e3e2e0]'}">
			<p class="text-xs uppercase tracking-wide mb-1 {lowStockCount > 0 ? 'text-red-500' : 'text-[#737873]'}">Stock bas</p>
			<p class="text-3xl font-semibold {lowStockCount > 0 ? 'text-red-600' : 'text-[#172c21]'}">{lowStockCount.toString().padStart(2, '0')}</p>
			<p class="text-xs text-[#737873] mt-0.5">Produits sous le seuil</p>
		</div>
	</div>

	<!-- Actions rapides -->
	<div class="mb-6">
		<p class="text-sm font-medium text-[#1a1c1a] mb-3">Actions rapides</p>
		<div class="grid grid-cols-2 gap-3">
			<a
				href="/admin/harvest"
				class="flex-1 flex items-center gap-2 rounded-2xl bg-[#172c21] text-white px-4 py-3 text-sm font-medium hover:bg-[#2d4236] transition-colors"
			>
				<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
					<circle cx="12" cy="9" r="2.5" />
				</svg>
				Nouvelle récolte
			</a>
			<a
				href="/admin/stock"
				class="flex-1 flex items-center gap-2 rounded-2xl bg-[#964824] text-white px-4 py-3 text-sm font-medium hover:bg-[#76300d] transition-colors"
			>
				<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M20 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z" />
					<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
				</svg>
				Modifier stock
			</a>
			<a
				href="/admin/transform"
				class="col-span-2 flex items-center gap-2 rounded-2xl bg-[#3d3f2d] text-white px-4 py-3 text-sm font-medium hover:bg-[#272919] transition-colors"
			>
				<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M7 7h11v11" />
					<path d="M17 7 7 17" />
					<path d="M17 17H6V6" />
				</svg>
				Nouvelle transformation
			</a>
		</div>
	</div>

	<!-- Activité récente -->
	<div>
		<div class="flex items-center justify-between mb-3">
			<p class="text-sm font-medium text-[#1a1c1a]">Récoltes récentes</p>
			<a href="/admin/history" class="text-xs text-[#964824] font-medium hover:underline">Tout voir</a>
		</div>

		{#if recentHarvests.length === 0}
			<p class="text-sm text-[#737873] text-center py-6">Aucune récolte enregistrée.</p>
		{:else}
			<div class="space-y-2">
				{#each recentHarvests as entry}
					<div class="flex items-center gap-3 rounded-2xl bg-white border border-[#e3e2e0] p-3">
						<div class="w-9 h-9 rounded-full bg-[#d0e8d7] flex items-center justify-center shrink-0">
							<svg class="w-4 h-4 text-[#172c21]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
								<path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
							</svg>
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-[#1a1c1a] truncate">
								+{entry.quantity} {entry.unit} — {entry.product?.name ?? '—'}
							</p>
							<p class="text-xs text-[#737873]">
								{entry.harvestDate ?? ''}
								{#if entry.recordedBy} · {entry.recordedBy}{/if}
							</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
