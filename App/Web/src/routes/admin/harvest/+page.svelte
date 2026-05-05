<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	const units = ['kg', 'pcs', 'botte', 'barquette', 'doz', 'pot', 'L'];
	const conditions = [
		{ value: 'sec', label: 'Sec', icon: '☀' },
		{ value: 'humide', label: 'Humide', icon: '💧' },
		{ value: 'couvert', label: 'Couvert', icon: '☁' }
	];

	let selectedCondition = $state('');
	let submitting = $state(false);

	// Date du jour par défaut
	const today = new Date().toISOString().split('T')[0];
</script>

<div class="max-w-md mx-auto px-5 pt-10 pb-6">
	<div class="flex items-center gap-3 mb-6">
		<a href="/admin" class="text-[#737873] hover:text-[#1a1c1a] transition-colors">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M19 12H5m7-7-7 7 7 7" />
			</svg>
		</a>
		<h1 class="font-serif text-2xl font-semibold text-[#172c21]">Nouvelle Récolte</h1>
	</div>

	<div class="rounded-2xl bg-white border border-[#e3e2e0] p-5 mb-6">
		<p class="text-xs text-[#737873] uppercase tracking-wide mb-0.5">Détails du Lot</p>
		<p class="text-sm text-[#424844]">Enregistrez les produits fraîchement récoltés aujourd'hui.</p>
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
		class="space-y-5"
	>
		<!-- Produit -->
		<div>
			<label for="productId" class="block text-sm font-medium text-[#1a1c1a] mb-1">Produit <span class="text-red-500">*</span></label>
			<select
				id="productId"
				name="productId"
				required
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] focus:border-[#172c21] focus:outline-none appearance-none"
			>
				<option value="" disabled selected>Sélectionner un produit</option>
				{#each data.products as product}
					<option value={product._id}>{product.name} — {product.category}</option>
				{/each}
			</select>
		</div>

		<!-- Quantité + Unité -->
		<div class="grid grid-cols-2 gap-3">
			<div>
				<label for="quantity" class="block text-sm font-medium text-[#1a1c1a] mb-1">Quantité <span class="text-red-500">*</span></label>
				<input
					id="quantity"
					name="quantity"
					type="number"
					min="0.01"
					step="0.01"
					required
					placeholder="0.00"
					class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] focus:border-[#172c21] focus:outline-none"
				/>
			</div>
			<div>
				<label for="unit" class="block text-sm font-medium text-[#1a1c1a] mb-1">Unité <span class="text-red-500">*</span></label>
				<select
					id="unit"
					name="unit"
					required
					class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] focus:border-[#172c21] focus:outline-none appearance-none"
				>
					{#each units as u}
						<option value={u} selected={u === 'kg'}>{u}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Date -->
		<div>
			<label for="harvestDate" class="block text-sm font-medium text-[#1a1c1a] mb-1">Date <span class="text-red-500">*</span></label>
			<input
				id="harvestDate"
				name="harvestDate"
				type="date"
				value={today}
				required
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] focus:border-[#172c21] focus:outline-none"
			/>
		</div>

		<!-- Conditions terrain -->
		<div>
			<p class="text-sm font-medium text-[#1a1c1a] mb-2">Conditions de Terrain</p>
			<div class="grid grid-cols-3 gap-2">
				{#each conditions as cond}
					<label class="cursor-pointer">
						<input
							type="radio"
							name="terrainCondition"
							value={cond.value}
							class="sr-only"
							onchange={() => (selectedCondition = cond.value)}
						/>
						<div class="flex flex-col items-center gap-1 rounded-xl border py-3 transition-colors {selectedCondition === cond.value ? 'border-[#172c21] bg-[#d0e8d7]' : 'border-[#e3e2e0] bg-white hover:bg-[#f4f3f1]'}">
							<span class="text-xl">{cond.icon}</span>
							<span class="text-xs font-medium text-[#424844] uppercase tracking-wide">{cond.label}</span>
						</div>
					</label>
				{/each}
			</div>
		</div>

		<!-- Notes -->
		<div>
			<label for="notes" class="block text-sm font-medium text-[#1a1c1a] mb-1">Notes de qualité / N° de lot</label>
			<textarea
				id="notes"
				name="notes"
				rows="3"
				placeholder="Ex: Lot #2025-04. Excellente fermeté, calibre moyen…"
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] placeholder:text-[#737873] focus:border-[#172c21] focus:outline-none resize-none"
			></textarea>
		</div>

		<!-- Enregistré par -->
		<div>
			<label for="recordedBy" class="block text-sm font-medium text-[#1a1c1a] mb-1">Enregistré par</label>
			<input
				id="recordedBy"
				name="recordedBy"
				type="text"
				placeholder="Votre prénom"
				class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] placeholder:text-[#737873] focus:border-[#172c21] focus:outline-none"
			/>
		</div>

		{#if form?.error}
			<p class="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{form.error}</p>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#172c21] py-4 text-sm font-semibold text-white hover:bg-[#2d4236] transition-colors disabled:opacity-60"
		>
			{#if submitting}
				<svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
					<path d="M21 12a9 9 0 1 1-6.219-8.56" />
				</svg>
				Enregistrement…
			{:else}
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
					<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
					<polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
				</svg>
				Enregistrer la Récolte
			{/if}
		</button>

		<a href="/admin" class="block text-center text-sm text-[#964824] font-medium hover:underline">
			Annuler
		</a>
	</form>

	<p class="mt-10 text-center text-xs text-[#737873]">Humus & Earth — Régénération & Transparence</p>
</div>
