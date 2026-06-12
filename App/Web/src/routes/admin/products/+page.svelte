<script>
	let { data } = $props();

	const products = $derived(data.products ?? []);
	let search = $state('');
	let activeCategory = $state('all');

	const categories = $derived(['all', ...new Set(products.map((p) => p.category).filter(Boolean))]);

	const filtered = $derived(
		products.filter((product) => {
			const matchSearch = product.name?.toLowerCase().includes(search.toLowerCase());
			const matchCategory = activeCategory === 'all' || product.category === activeCategory;
			return matchSearch && matchCategory;
		})
	);

	let selectedIds = $state([]);
	const selectedCount = $derived(selectedIds.length);
	const selectedIdsCsv = $derived(selectedIds.join(','));

	function toggleSelection(productId, checked) {
		if (checked) {
			if (!selectedIds.includes(productId)) {
				selectedIds = [...selectedIds, productId];
			}
			return;
		}

		selectedIds = selectedIds.filter((id) => id !== productId);
	}

	function toggleSelectAllVisible(checked) {
		if (checked) {
			const visibleIds = filtered.map((product) => product._id);
			selectedIds = Array.from(new Set([...selectedIds, ...visibleIds]));
			return;
		}

		const visibleSet = new Set(filtered.map((product) => product._id));
		selectedIds = selectedIds.filter((id) => !visibleSet.has(id));
	}

	const allVisibleSelected = $derived(
		filtered.length > 0 && filtered.every((product) => selectedIds.includes(product._id))
	);

	function formatDate(dateString) {
		if (!dateString) return 'Jamais mis a jour';
		return new Date(dateString).toLocaleDateString('fr-FR');
	}
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-4">
	<div class="flex items-center justify-between mb-5">
		<h1 class="font-serif text-2xl font-semibold text-[#172c21]">Produits</h1>
		<a
			href="/admin/products/new"
			class="rounded-xl bg-[#172c21] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2d4236] transition-colors"
		>
			Nouveau
		</a>
	</div>

	{#if data.created}
		<p class="mb-4 text-sm text-[#172c21] bg-[#d0e8d7] rounded-xl px-4 py-3">
			Produit créé avec succès.
		</p>
	{/if}
	{#if data.updated}
		<p class="mb-4 text-sm text-[#172c21] bg-[#d0e8d7] rounded-xl px-4 py-3">
			Produit mis à jour avec succès.
		</p>
	{/if}
	{#if data.bulkUpdated}
		<p class="mb-4 text-sm text-[#172c21] bg-[#d0e8d7] rounded-xl px-4 py-3">
			Disponibilite mise a jour sur les produits selectionnes.
		</p>
	{/if}

	{#if selectedCount > 0}
		<form method="POST" action="?/bulkAvailability" class="mb-4 rounded-2xl border border-[#d0e8d7] bg-[#edf7f0] p-3">
			<input type="hidden" name="selectedIds" value={selectedIdsCsv} />
			<p class="mb-3 text-xs font-semibold text-[#172c21]">
				{selectedCount} produit{selectedCount > 1 ? 's' : ''} selectionne{selectedCount > 1 ? 's' : ''}
			</p>
			<div class="flex flex-wrap gap-2">
				<button
					type="submit"
					name="availability"
					value="available"
					class="rounded-lg bg-[#172c21] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2d4236] transition-colors"
				>
					Marquer disponible
				</button>
				<button
					type="submit"
					name="availability"
					value="unavailable"
					class="rounded-lg bg-[#964824] px-3 py-2 text-xs font-semibold text-white hover:bg-[#7a3b1d] transition-colors"
				>
					Marquer indisponible
				</button>
				<button
					type="button"
					onclick={() => (selectedIds = [])}
					class="rounded-lg border border-[#c8d8cb] px-3 py-2 text-xs font-semibold text-[#424844] hover:bg-white transition-colors"
				>
					Vider la selection
				</button>
			</div>
		</form>
	{/if}

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

	<div class="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
		{#each categories as category}
			<button
				onclick={() => (activeCategory = category)}
				class="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors {activeCategory === category
					? 'bg-[#172c21] text-white'
					: 'bg-[#e9e8e5] text-[#424844] hover:bg-[#d0e8d7]'}"
			>
				{category === 'all' ? 'Tous' : category}
			</button>
		{/each}
	</div>

	{#if filtered.length > 0}
		<label class="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-[#424844]">
			<input
				type="checkbox"
				checked={allVisibleSelected}
				onchange={(event) => toggleSelectAllVisible(event.currentTarget.checked)}
				class="h-4 w-4 rounded border-[#b9b8b5] text-[#172c21] focus:ring-[#172c21]"
			/>
			Tout selectionner (resultats visibles)
		</label>
	{/if}

	{#if filtered.length === 0}
		<p class="text-sm text-[#737873] text-center py-10">Aucun produit.</p>
	{:else}
		<div class="space-y-3">
			{#each filtered as product (product._id)}
				<div class="rounded-2xl bg-white border border-[#e3e2e0] p-3">
					<div class="flex items-center gap-3">
						<label class="shrink-0">
							<input
								type="checkbox"
								checked={selectedIds.includes(product._id)}
								onchange={(event) => toggleSelection(product._id, event.currentTarget.checked)}
								class="h-4 w-4 rounded border-[#b9b8b5] text-[#172c21] focus:ring-[#172c21]"
								aria-label={'Selectionner ' + product.name}
							/>
						</label>
						<a href={'/admin/products/' + product._id} class="flex min-w-0 flex-1 items-center gap-3" aria-label={'Modifier ' + product.name}>
							{#if product.image}
								<img src={product.image} alt={product.name} class="h-14 w-14 shrink-0 rounded-xl object-cover" />
							{:else}
								<div class="h-14 w-14 shrink-0 rounded-xl bg-[#e9e8e5]"></div>
							{/if}

							<div class="min-w-0 flex-1">
								<p class="truncate text-sm font-semibold text-[#1a1c1a]">{product.name}</p>
								<p class="text-xs text-[#737873]">{product.category}</p>
								<p class="mt-1 text-xs {product.available ? 'text-[#172c21]' : 'text-[#964824]'}">
									{product.available ? 'Disponible' : 'Indisponible'}
									· {product.stock?.quantity ?? 0} {product.stock?.unit ?? 'kg'}
								</p>
								<p class="mt-0.5 text-[11px] text-[#737873]">
									Stock mis a jour: {formatDate(product.stock?.updatedAt)}
								</p>
							</div>

							<div class="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#172c21] px-3 py-2 text-white">
								<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
								</svg>
								<span class="text-[11px] font-semibold uppercase tracking-wide">Modifier</span>
							</div>
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
