<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<svelte:head>
	<title>Accès équipe — Ferme de l'Humus</title>
</svelte:head>

<div class="min-h-dvh flex items-center justify-center bg-[#faf9f6] px-6">
	<div class="w-full max-w-sm">
		<div class="mb-10 text-center">
			<p class="font-serif text-3xl font-semibold text-[#172c21]">Ferme de l'Humus</p>
			<p class="mt-1 text-sm text-[#424844]">Espace équipe — accès restreint</p>
		</div>

		<form method="POST" use:enhance class="space-y-4">
			<div>
				<label for="password" class="block text-sm font-medium text-[#1a1c1a] mb-1">
					Mot de passe
				</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					autocomplete="current-password"
					class="w-full rounded-xl border border-[#c2c8c2] bg-white px-4 py-3 text-[#1a1c1a] placeholder:text-[#737873] focus:border-[#172c21] focus:outline-none focus:ring-1 focus:ring-[#172c21]"
					placeholder="••••••••"
				/>
			</div>

			{#if form?.error}
				<p class="text-sm text-red-600">{form.error}</p>
			{/if}

			<button
				type="submit"
				class="w-full rounded-xl bg-[#172c21] py-3 text-sm font-medium text-white hover:bg-[#2d4236] transition-colors"
			>
				Accéder à l'espace équipe
			</button>
		</form>

		<p class="mt-8 text-center text-xs text-[#737873]">Humus & Earth — Régénération & Transparence</p>
	</div>
</div>
