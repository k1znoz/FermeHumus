<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let submitting = $state(false);
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-6">
	<div class="flex items-center gap-3 mb-6">
		<a href="/admin/products" aria-label="Retour aux produits" class="text-[#737873] hover:text-[#1a1c1a] transition-colors">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M19 12H5m7-7-7 7 7 7" />
			</svg>
		</a>
		<h1 class="font-serif text-2xl font-semibold text-[#172c21]">Modifier le produit</h1>
	</div>

	<form
		method="POST"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
		class="space-y-4"
	>
		<div>
			<label for="name" class="block text-sm font-medium text-[#1a1c1a] mb-1">Nom du produit *</label>
			<input
				id="name"
				name="name"
				type="text"
				required
				value={data.product.name}
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
			/>
		</div>

		<div>
			<label for="category" class="block text-sm font-medium text-[#1a1c1a] mb-1">Catégorie *</label>
			<select
				id="category"
				name="category"
				required
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
			>
				{#each data.categories as category}
					<option value={category} selected={category === data.product.category}>{category}</option>
				{/each}
			</select>
		</div>

		<div class="grid grid-cols-2 gap-3">
			<div>
				<label for="price" class="block text-sm font-medium text-[#1a1c1a] mb-1">Prix (€) *</label>
				<input
					id="price"
					name="price"
					type="number"
					step="0.01"
					min="0.01"
					required
					value={data.product.price}
					class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
				/>
			</div>
			<div>
				<label for="badge" class="block text-sm font-medium text-[#1a1c1a] mb-1">Badge</label>
				<input
					id="badge"
					name="badge"
					type="text"
					placeholder="Saisonnier"
					value={data.product.badge ?? ''}
					class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
				/>
			</div>
		</div>

		<div>
			<label for="description" class="block text-sm font-medium text-[#1a1c1a] mb-1">Description courte *</label>
			<textarea
				id="description"
				name="description"
				rows="3"
				required
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none resize-none"
			>{data.product.description}</textarea>
		</div>

		<div>
			<label for="available" class="block text-sm font-medium text-[#1a1c1a] mb-1">Disponibilité</label>
			<select
				id="available"
				name="available"
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
			>
				<option value="true" selected={data.product.available}>Disponible</option>
				<option value="false" selected={!data.product.available}>Indisponible</option>
			</select>
		</div>

		{#if form?.error}
			<p class="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{form.error}</p>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="w-full rounded-2xl bg-[#172c21] py-4 text-sm font-semibold text-white hover:bg-[#2d4236] transition-colors disabled:opacity-60"
		>
			{submitting ? 'Enregistrement…' : 'Enregistrer les modifications'}
		</button>
	</form>
</div>
