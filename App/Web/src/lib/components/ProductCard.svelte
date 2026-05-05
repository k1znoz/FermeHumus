<script>
	/** @type {{ product: { _id: string, name: string, category: string, price: number, description: string, badge?: string, image?: string }, onAdd?: () => void }} */
	let { product, onAdd = () => {} } = $props();
</script>

<div
	class="bg-white rounded-xl shadow-ambient overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col"
>
	<!-- Image -->
	<div class="aspect-[4/3] overflow-hidden">
		<img
			src={product.image || 'https://placehold.co/600x450/efeeeb/172c21?text=Photo+bientôt'}
			alt={product.name}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			loading="lazy"
		/>
	</div>

	<!-- Content -->
	<div class="p-md flex flex-col gap-sm flex-1">
		<div class="flex justify-between items-start">
			<div class="flex-1 min-w-0 pr-2">
				{#if product.badge}
					<span
						class="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-xs block"
					>
						{product.badge}
					</span>
				{:else}
					<span
						class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-xs block"
					>
						{product.category}
					</span>
				{/if}
				<h3 class="font-h3 text-h3 text-primary">{product.name}</h3>
			</div>
			<span class="font-h3 text-h3 text-primary whitespace-nowrap">{product.price.toFixed(2)}€</span>
		</div>

		<p class="font-body-md text-on-surface-variant line-clamp-2 flex-1">{product.description}</p>

		<button
			onclick={onAdd}
			class="mt-base w-full bg-secondary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
		>
			<span class="material-symbols-outlined text-[20px]">add</span>
			<span class="font-label-caps uppercase tracking-widest text-[11px]">Ajouter au panier</span>
		</button>
	</div>
</div>
