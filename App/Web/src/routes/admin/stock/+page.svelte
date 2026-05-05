<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
	const stocks = $derived(data.stocks ?? []);

	// Copie locale éditable des quantités
	let quantities = $state({});
	$effect(() => {
		if (Object.keys(quantities).length === 0 && stocks.length > 0) {
			quantities = Object.fromEntries(stocks.map((s) => [s._id, s.quantity]));
		}
	});

	let search = $state('');
	let activeCategory = $state('all');
	let saving = $state(null); // id en cours de sauvegarde

	const categories = $derived(['all', ...new Set(stocks.map((s) => s.product?.category).filter(Boolean))]);

	const filtered = $derived(
		stocks.filter((s) => {
			const matchSearch = s.product?.name?.toLowerCase().includes(search.toLowerCase());
			const matchCat = activeCategory === 'all' || s.product?.category === activeCategory;
			return matchSearch && matchCat;
		})
	);

	function isLow(stock) {
		return stock.lowStockThreshold != null && quantities[stock._id] <= stock.lowStockThreshold;
	}

	function adjust(id, delta) {
		quantities[id] = Math.max(0, (quantities[id] ?? 0) + delta);
	}
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-4">
	<h1 class="font-serif text-2xl font-semibold text-[#172c21] mb-6">Stock actuel</h1>

	<!-- Recherche -->
	<div class="relative mb-4">
		<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737873]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
			<circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
		</svg>
		<input
			type="search"
			placeholder="Rechercher un produit..."
			bind:value={search}
			class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] pl-9 pr-4 py-2.5 text-sm text-[#1a1c1a] placeholder:text-[#737873] focus:border-[#172c21] focus:outline-none"
		/>
	</div>

	<!-- Filtres catégorie -->
	<div class="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
		{#each categories as cat}
			<button
				onclick={() => (activeCategory = cat)}
				class="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors {activeCategory === cat
					? 'bg-[#172c21] text-white'
					: 'bg-[#e9e8e5] text-[#424844] hover:bg-[#d0e8d7]'}"
			>
				{cat === 'all' ? 'Tous' : cat}
			</button>
		{/each}
	</div>

	<!-- Liste des produits -->
	{#if filtered.length === 0}
		<p class="text-sm text-[#737873] text-center py-10">Aucun résultat.</p>
	{:else}
		<div class="space-y-3">
			{#each filtered as stock (stock._id)}
				{@const low = isLow(stock)}
				<div class="flex items-center gap-3 rounded-2xl bg-white border border-[#e3e2e0] p-3">
					<!-- Image -->
					{#if stock.product?.image}
						<img src={stock.product.image} alt={stock.product.name} class="w-16 h-16 rounded-xl object-cover shrink-0" />
					{:else}
						<div class="w-16 h-16 rounded-xl bg-[#e9e8e5] shrink-0 flex items-center justify-center">
							<svg class="w-6 h-6 text-[#737873]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
								<rect x="3" y="3" width="18" height="18" rx="2" /><path d="m3 9 4-4 4 4 4-4 4 4" />
							</svg>
						</div>
					{/if}

					<!-- Infos -->
					<div class="flex-1 min-w-0">
						<p class="text-sm font-semibold text-[#1a1c1a] truncate">{stock.product?.name ?? '—'}</p>
						<p class="text-xs {low ? 'text-red-500 font-semibold' : 'text-[#737873]'}">
							{low ? '⚠ Stock bas :' : 'En stock :'} {quantities[stock._id]} {stock.unit}
						</p>
					</div>

					<!-- Contrôle quantité + save -->
					<form
						method="POST"
						action="?/updateStock"
						use:enhance={() => {
							saving = stock._id;
							return async ({ update }) => {
								await update();
								saving = null;
							};
						}}
						class="flex items-center gap-1 shrink-0"
					>
						<input type="hidden" name="id" value={stock._id} />
						<input type="hidden" name="quantity" value={quantities[stock._id]} />

						<button
							type="button"
							onclick={() => adjust(stock._id, -1)}
							class="w-8 h-8 rounded-full border border-[#e3e2e0] flex items-center justify-center text-[#424844] hover:bg-[#f4f3f1] transition-colors"
						>−</button>

						<span class="w-10 text-center text-sm font-semibold text-[#1a1c1a]">
							{quantities[stock._id]}
						</span>

						<button
							type="button"
							onclick={() => adjust(stock._id, 1)}
							class="w-8 h-8 rounded-full border border-[#e3e2e0] flex items-center justify-center text-[#424844] hover:bg-[#f4f3f1] transition-colors"
						>+</button>

						<button
							type="submit"
							disabled={saving === stock._id}
							class="ml-1 w-8 h-8 rounded-full bg-[#172c21] flex items-center justify-center text-white hover:bg-[#2d4236] transition-colors disabled:opacity-50"
							title="Enregistrer"
						>
							{#if saving === stock._id}
								<svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
									<path d="M21 12a9 9 0 1 1-6.219-8.56" />
								</svg>
							{:else}
								<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
									<polyline points="20 6 9 17 4 12" />
								</svg>
							{/if}
						</button>
					</form>
				</div>
			{/each}
		</div>
	{/if}
</div>
