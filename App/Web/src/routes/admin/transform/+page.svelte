<script>
	let { data, form } = $props();
	const rawStocks = $derived(data.rawStocks ?? []);

	let selectedInputProductId = $state('');
	$effect(() => {
		if (!selectedInputProductId && rawStocks.length > 0) {
			selectedInputProductId = rawStocks[0]?.product?._id ?? '';
		}
	});

	const selectedRawStock = $derived(
		rawStocks.find((entry) => entry.product?._id === selectedInputProductId)
	);
</script>

<div class="max-w-md mx-auto px-5 pt-6 pb-6">
	<div class="flex items-center gap-3 mb-4">
		<a href="/admin" class="text-[#737873] hover:text-[#1a1c1a] transition-colors" aria-label="Retour">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M19 12H5m7-7-7 7 7 7" />
			</svg>
		</a>
		<h1 class="font-serif text-2xl text-[#172c21]">Nouvelle Transformation</h1>
	</div>

	<div class="rounded-2xl overflow-hidden border border-[#e3e2e0] mb-5 bg-white shadow-[0_4px_20px_rgba(45,66,54,0.05)]">
		<div
			class="h-36 bg-cover bg-center"
			style="background-image: linear-gradient(to top, rgba(23,44,33,0.55), rgba(23,44,33,0.1)), url('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1100&q=80');"
		></div>
		<p class="px-4 py-3 text-lg font-serif text-[#172c21]">Du champ au garde-manger</p>
	</div>

	<form method="POST" class="space-y-4">
		<div class="rounded-2xl bg-white border border-[#e3e2e0] p-4 space-y-3">
			<p class="text-base font-serif text-[#172c21]">Ingredients utilises</p>

			<div>
				<label for="inputProductId" class="block text-sm text-[#424844] mb-1">Produit brut</label>
				<select
					id="inputProductId"
					name="inputProductId"
					bind:value={selectedInputProductId}
					required
					class="w-full rounded-xl bg-[#f5f5dc] px-4 py-3 text-sm text-[#1a1c1a] border border-transparent focus:border-[#964824] focus:outline-none"
				>
					{#each rawStocks as stock}
						<option value={stock.product?._id}>{stock.product?.name} ({stock.quantity} {stock.unit})</option>
					{/each}
				</select>
			</div>

			<input type="hidden" name="inputUnit" value={selectedRawStock?.unit ?? 'kg'} />

			<div class="grid grid-cols-[1fr_auto] gap-3 items-end">
				<div>
					<label for="inputQuantity" class="block text-sm text-[#424844] mb-1">Quantite consommee</label>
					<div class="grid grid-cols-[1fr_auto] rounded-xl overflow-hidden border border-[#e3e2e0]">
						<input
							id="inputQuantity"
							name="inputQuantity"
							type="number"
							min="0.01"
							step="0.01"
							required
							class="bg-[#f5f5dc] px-3 py-2.5 text-sm text-[#1a1c1a] focus:outline-none"
						/>
						<span class="bg-[#f5f5dc] px-3 py-2.5 text-sm text-[#737873]">{selectedRawStock?.unit ?? 'kg'}</span>
					</div>
				</div>
				<div class="rounded-xl bg-[#f4f3f1] px-3 py-2.5 border border-[#e3e2e0] min-w-[120px]">
					<p class="text-xs text-[#737873]">Stock actuel</p>
					<p class="text-sm font-semibold text-[#172c21]">
						{selectedRawStock?.quantity ?? 0} {selectedRawStock?.unit ?? ''}
					</p>
				</div>
			</div>
		</div>

		<div class="flex justify-center py-1">
			<div class="h-11 w-11 rounded-full bg-[#964824] text-white grid place-items-center shadow-[0_8px_18px_rgba(45,66,54,0.2)]">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M7 7h11v11" /><path d="M17 7 7 17" /><path d="M17 17H6V6" />
				</svg>
			</div>
		</div>

		<div class="rounded-2xl bg-white border border-[#e3e2e0] p-4 space-y-3">
			<p class="text-base font-serif text-[#172c21]">Produit final</p>

			<div>
				<label for="outputProductId" class="block text-sm text-[#424844] mb-1">Produit transforme</label>
				<select
					id="outputProductId"
					name="outputProductId"
					required
					class="w-full rounded-xl bg-[#f5f5dc] px-4 py-3 text-sm text-[#1a1c1a] border border-transparent focus:border-[#964824] focus:outline-none"
				>
					{#each data.transformedProducts as product}
						<option value={product._id}>{product.name}</option>
					{/each}
				</select>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div>
					<label for="outputQuantity" class="block text-sm text-[#424844] mb-1">Quantite produite</label>
					<input
						id="outputQuantity"
						name="outputQuantity"
						type="number"
						min="0.01"
						step="0.01"
						required
						class="w-full rounded-xl bg-[#f5f5dc] px-4 py-3 text-sm text-[#1a1c1a] border border-transparent focus:border-[#964824] focus:outline-none"
					/>
				</div>
				<div>
					<label for="outputUnit" class="block text-sm text-[#424844] mb-1">Unite de mesure</label>
					<select
						id="outputUnit"
						name="outputUnit"
						required
						class="w-full rounded-xl bg-[#f5f5dc] px-4 py-3 text-sm text-[#1a1c1a] border border-transparent focus:border-[#964824] focus:outline-none"
					>
						{#each data.units as unit}
							<option value={unit} selected={unit === 'L'}>{unit}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="rounded-2xl bg-white border border-[#e3e2e0] p-4 grid grid-cols-[1fr_auto] items-end gap-3">
			<div>
				<label for="estimatedWaste" class="block text-sm text-[#424844] mb-1">Pertes estimees</label>
				<input
					id="estimatedWaste"
					name="estimatedWaste"
					type="number"
					min="0"
					step="0.01"
					value="0"
					class="w-full rounded-xl bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] border border-[#e3e2e0] focus:border-[#964824] focus:outline-none"
				/>
			</div>
			<span class="pb-3 text-sm text-[#424844]">kg</span>
		</div>

		<div class="rounded-2xl bg-white border border-[#e3e2e0] p-4 space-y-3">
			<div>
				<label for="batchNumber" class="block text-sm text-[#424844] mb-1">Numero de lot (Batch)</label>
				<input
					id="batchNumber"
					name="batchNumber"
					type="text"
					required
					placeholder="TR-2026-001"
					class="w-full rounded-xl bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] border border-[#e3e2e0] focus:border-[#964824] focus:outline-none"
				/>
			</div>
			<div>
				<label for="recordedBy" class="block text-sm text-[#424844] mb-1">Enregistre par</label>
				<input
					id="recordedBy"
					name="recordedBy"
					type="text"
					placeholder="Votre prenom"
					class="w-full rounded-xl bg-[#f4f3f1] px-4 py-3 text-sm text-[#1a1c1a] border border-[#e3e2e0] focus:border-[#964824] focus:outline-none"
				/>
			</div>
			<div>
				<label for="notes" class="block text-sm text-[#424844] mb-1">Notes de production</label>
				<textarea
					id="notes"
					name="notes"
					rows="3"
					placeholder="Ajouter des details sur la recette ou les conditions..."
					class="w-full rounded-xl bg-[#f5f5dc] px-4 py-3 text-sm text-[#1a1c1a] border border-transparent focus:border-[#964824] focus:outline-none resize-none"
				></textarea>
			</div>
		</div>

		{#if form?.error}
			<p class="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{form.error}</p>
		{/if}

		{#if data.success}
			<p class="text-sm text-[#172c21] bg-[#d0e8d7] rounded-xl px-4 py-3">Transformation enregistree et stocks mis a jour.</p>
		{/if}

		<button
			type="submit"
			class="w-full rounded-2xl bg-[#172c21] py-4 text-white text-base font-semibold hover:bg-[#2d4236] transition-colors"
		>
			Valider la Transformation
		</button>
	</form>
</div>
