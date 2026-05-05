<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let submitting = $state(false);
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-6">
	<div class="flex items-center gap-3 mb-6">
		<a href="/admin/harvest" aria-label="Retour à la récolte" class="text-[#737873] hover:text-[#1a1c1a] transition-colors">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M19 12H5m7-7-7 7 7 7" />
			</svg>
		</a>
		<h1 class="font-serif text-2xl font-semibold text-[#172c21]">Nouveau Produit</h1>
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
					<option value={category}>{category}</option>
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
			></textarea>
		</div>

		<div class="rounded-2xl border border-[#e3e2e0] bg-white p-4 space-y-3">
			<p class="text-sm font-semibold text-[#172c21]">Stock initial</p>
			<div class="grid grid-cols-2 gap-3">
				<div>
					<label for="initialStock" class="block text-sm font-medium text-[#1a1c1a] mb-1">Quantité</label>
					<input
						id="initialStock"
						name="initialStock"
						type="number"
						step="0.01"
						min="0"
						value="0"
						class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
					/>
				</div>
				<div>
					<label for="unit" class="block text-sm font-medium text-[#1a1c1a] mb-1">Unité</label>
					<select
						id="unit"
						name="unit"
						class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
					>
						{#each data.units as unit}
							<option value={unit} selected={unit === 'kg'}>{unit}</option>
						{/each}
					</select>
				</div>
			</div>
			<div>
				<label for="lowStockThreshold" class="block text-sm font-medium text-[#1a1c1a] mb-1">Seuil alerte stock bas</label>
				<input
					id="lowStockThreshold"
					name="lowStockThreshold"
					type="number"
					step="1"
					min="0"
					value="5"
					class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
				/>
			</div>
		</div>

		{#if form?.error}
			<p class="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{form.error}</p>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="w-full rounded-2xl bg-[#172c21] py-4 text-sm font-semibold text-white hover:bg-[#2d4236] transition-colors disabled:opacity-60"
		>
			{submitting ? 'Création…' : 'Créer le produit'}
		</button>
	</form>
</div>
