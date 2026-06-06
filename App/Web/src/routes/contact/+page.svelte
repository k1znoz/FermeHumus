<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Nous contacter — Ferme de l'Humus</title>
	<meta name="description" content="Contactez la Ferme de l'Humus pour prendre rendez-vous au labo ou pour toute question." />
</svelte:head>

<div class="pt-32 pb-xl px-margin-mobile md:px-0">
	<div class="max-w-[640px] mx-auto">

		<section class="mb-lg text-center">
			<span class="font-label-caps text-secondary uppercase tracking-[0.2em] mb-sm block">Prendre rendez-vous</span>
			<h1 class="font-h1 text-h1 text-primary mb-md">Nous contacter</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant">
				Une question, une commande, ou vous souhaitez visiter notre labo à Ailly-sur-Somme ?
				Envoyez-nous un message et nous vous répondrons rapidement.
			</p>
		</section>

		{#if form?.success}
			<div class="bg-[#d0e8d7] border border-[#172c21]/20 rounded-xl p-6 text-center mb-lg">
				<span class="material-symbols-outlined text-4xl text-[#172c21] mb-2 block">check_circle</span>
				<p class="font-bold text-[#172c21]">Message envoyé !</p>
				<p class="text-sm text-[#172c21]/80 mt-1">Nous vous répondrons dans les meilleurs délais.</p>
			</div>
		{:else}
			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
				class="bg-white rounded-2xl border border-outline-variant/10 shadow-ambient p-lg space-y-4"
			>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label for="name" class="block text-sm font-medium text-[#1a1c1a] mb-1">Nom *</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							placeholder="Votre nom"
							class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-[#1a1c1a] mb-1">Email *</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							placeholder="votre@email.fr"
							class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
						/>
					</div>
				</div>

				<div>
					<label for="subject" class="block text-sm font-medium text-[#1a1c1a] mb-1">Objet</label>
					<input
						id="subject"
						name="subject"
						type="text"
						placeholder="Prise de rendez-vous au labo"
						class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none"
					/>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-[#1a1c1a] mb-1">Message *</label>
					<textarea
						id="message"
						name="message"
						rows="5"
						required
						placeholder="Votre message…"
						class="w-full rounded-xl border border-[#e3e2e0] bg-[#f4f3f1] px-4 py-3 text-sm focus:border-[#172c21] focus:outline-none resize-none"
					></textarea>
				</div>

				{#if form?.error}
					<p class="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{form.error}</p>
				{/if}

				<button
					type="submit"
					disabled={submitting}
					class="w-full rounded-2xl bg-[#172c21] py-4 text-sm font-semibold text-white hover:bg-[#2d4236] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
				>
					{#if submitting}
						Envoi en cours…
					{:else}
						<span class="material-symbols-outlined text-base">send</span>
						Envoyer le message
					{/if}
				</button>

				<p class="text-xs text-center text-on-surface-variant">
					Ou écrivez-nous directement à
					<a href="mailto:fermehumus@gmail.com" class="text-secondary font-medium hover:underline">fermehumus@gmail.com</a>
				</p>
			</form>
		{/if}

	</div>
</div>
