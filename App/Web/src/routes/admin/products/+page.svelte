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

	{#if filtered.length === 0}
		<p class="text-sm text-[#737873] text-center py-10">Aucun produit.</p>
	{:else}
		<div class="space-y-3">
			{#each filtered as product (product._id)}
				<div class="rounded-2xl bg-white border border-[#e3e2e0] p-3">
					<div class="flex items-center gap-3">
						<a href={'/admin/stock?product=' + product._id} class="flex min-w-0 flex-1 items-center gap-3">
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

							<svg class="h-5 w-5 shrink-0 text-[#737873]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
								<path d="m9 18 6-6-6-6" />
							</svg>
						</a>
						<a
							href={'/admin/products/' + product._id}
							class="shrink-0 rounded-lg p-2 text-[#737873] transition-colors hover:bg-[#d0e8d7] hover:text-[#172c21]"
							aria-label="Modifier le produit"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
								<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
								<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
							</svg>
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
