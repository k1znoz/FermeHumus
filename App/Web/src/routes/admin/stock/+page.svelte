<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	const stocks = $derived(data.stocks ?? []);
	const focusProductId = $derived(data.focusProductId ?? null);

	// Copie locale editable des quantites, indexee par productId
	let quantities = $state({});
	$effect(() => {
		if (stocks.length === 0) return;

		const next = { ...quantities };
		for (const stock of stocks) {
			const productId = stock.product?._id;
			if (!productId) continue;
			if (next[productId] == null) {
				next[productId] = stock.quantity;
			}
		}
		quantities = next;
	});

	let search = $state('');
	let activeCategory = $state('all');
	let savingBulk = $state(false);

	const categories = $derived(['all', ...new Set(stocks.map((s) => s.product?.category).filter(Boolean))]);

	const filtered = $derived(
		stocks.filter((s) => {
			const matchSearch = s.product?.name?.toLowerCase().includes(search.toLowerCase());
			const matchCat = activeCategory === 'all' || s.product?.category === activeCategory;
			return matchSearch && matchCat;
		})
	);

	const dirtyEntries = $derived(
		stocks
			.filter((stock) => {
				const productId = stock.product?._id;
				if (!productId) return false;
				return Number(quantities[productId]) !== Number(stock.quantity);
			})
			.map((stock) => ({
				productId: stock.product._id,
				quantity: Math.max(0, Number(quantities[stock.product._id] ?? 0))
			}))
	);

	const dirtyCount = $derived(dirtyEntries.length);
	const dirtyPayload = $derived(JSON.stringify(dirtyEntries));

	function isLow(stock) {
		const productId = stock.product?._id;
		if (!productId) return false;
		return stock.lowStockThreshold != null && Number(quantities[productId] ?? 0) <= stock.lowStockThreshold;
	}

	function adjust(productId, delta) {
		quantities[productId] = Math.max(0, Number(quantities[productId] ?? 0) + delta);
	}

	function setQuantity(productId, rawValue) {
		const parsed = Number(rawValue);
		quantities[productId] = Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
	}

	function isFocused(stock) {
		return focusProductId && stock.product?._id === focusProductId;
	}
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-4">
	<h1 class="font-serif text-2xl font-semibold text-[#172c21] mb-6">Stock actuel</h1>
	<p class="mb-4 text-xs text-[#737873]">
		Ajuste plusieurs produits, puis valide tout en une seule fois.
	</p>

	{#if data.bulkSaved}
		<p class="mb-4 text-sm text-[#172c21] bg-[#d0e8d7] rounded-xl px-4 py-3">
			Modifications de stock enregistrees.
		</p>
	{/if}
	{#if form?.success}
		<p class="mb-4 text-sm text-[#172c21] bg-[#d0e8d7] rounded-xl px-4 py-3">
			{form.updatedCount ?? 0} stock(s) mis a jour.
		</p>
	{/if}

	{#if form?.error}
		<p class="mb-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{form.error}</p>
	{/if}

	{#if dirtyCount > 0}
		<form
			method="POST"
			action="?/bulkUpdateStock"
			use:enhance={() => {
				savingBulk = true;
				return async ({ update }) => {
					await update();
					savingBulk = false;
				};
			}}
			class="mb-4 rounded-2xl border border-[#d0e8d7] bg-[#edf7f0] p-3"
		>
			<input type="hidden" name="updates" value={dirtyPayload} />
			<p class="mb-3 text-xs font-semibold text-[#172c21]">
				{dirtyCount} produit{dirtyCount > 1 ? 's' : ''} en attente de validation
			</p>
			<div class="flex gap-2">
				<button
					type="submit"
					disabled={savingBulk}
					class="rounded-lg bg-[#172c21] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2d4236] transition-colors disabled:opacity-60"
				>
					{savingBulk ? 'Enregistrement...' : 'Enregistrer tout'}
				</button>
				<button
					type="button"
					onclick={() => {
						quantities = Object.fromEntries(stocks.map((stock) => [stock.product?._id, stock.quantity]));
					}}
					class="rounded-lg border border-[#c8d8cb] px-3 py-2 text-xs font-semibold text-[#424844] hover:bg-white transition-colors"
				>
					Annuler les modifications
				</button>
			</div>
		</form>
	{/if}

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
			{#each filtered as stock (stock.product?._id ?? stock._id)}
				{@const low = isLow(stock)}
				{@const productId = stock.product?._id}
				<div
					class="flex items-center gap-3 rounded-2xl bg-white border p-3 {isFocused(stock)
						? 'border-[#172c21] ring-1 ring-[#172c21]/30'
						: 'border-[#e3e2e0]'}"
				>
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
							{low ? '⚠ Stock bas :' : 'En stock :'} {productId ? quantities[productId] : stock.quantity} {stock.unit}
						</p>
					</div>

					<!-- Contrôle quantité (validation en lot) -->
					<div class="flex items-center gap-1 shrink-0">
						<button
							type="button"
							onclick={() => productId && adjust(productId, -1)}
							class="w-8 h-8 rounded-full border border-[#e3e2e0] flex items-center justify-center text-[#424844] hover:bg-[#f4f3f1] transition-colors"
						>−</button>

						<input
							type="number"
							min="0"
							step="1"
							value={productId ? quantities[productId] : stock.quantity}
							oninput={(event) => productId && setQuantity(productId, event.currentTarget.value)}
							class="w-16 rounded-lg border border-[#e3e2e0] bg-[#f4f3f1] px-2 py-1 text-center text-sm font-semibold text-[#1a1c1a] focus:border-[#172c21] focus:outline-none"
						/>

						<button
							type="button"
							onclick={() => productId && adjust(productId, 1)}
							class="w-8 h-8 rounded-full border border-[#e3e2e0] flex items-center justify-center text-[#424844] hover:bg-[#f4f3f1] transition-colors"
						>+</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
