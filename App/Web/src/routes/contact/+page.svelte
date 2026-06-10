<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { CONTACT_ADDRESS_LINES, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from '$lib/constants';

	let { form } = $props();
	let submitting = $state(false);

	const quoteMailto = $derived(
		`mailto:${CONTACT_EMAIL}?subject=Devis%20tartes%20flambees&body=Bonjour%2C%0A%0AJe%20souhaite%20un%20devis%20pour%20des%20tartes%20flambees.%0A-%20Date%20de%20l'evenement%20%3A%0A-%20Lieu%20%3A%0A-%20Nombre%20de%20personnes%20%3A%0A-%20Format%20(cocktail%20ou%20repas)%20%3A%0A-%20Informations%20complementaires%20%3A%0A%0AMerci.`
	);

	const defaultSubject = $derived($page.url.searchParams.get('subject') ?? 'Message depuis le site');
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
				Contact direct par téléphone, e-mail ou formulaire.
			</p>
			<div class="mt-md">
				<a href={quoteMailto} class="inline-flex items-center gap-2 rounded-xl bg-[#172c21] text-white px-6 py-3 text-sm font-semibold hover:bg-[#2d4236] transition-colors">
					<span class="material-symbols-outlined text-base">request_quote</span>
					Demander un devis tartes flambees
				</a>
			</div>
		</section>

		<section class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-lg">
			<a href={`tel:${CONTACT_PHONE_HREF}`} class="bg-white rounded-xl border border-outline-variant/10 shadow-ambient p-md hover:bg-surface-container-low transition-colors">
				<p class="font-label-caps text-secondary uppercase tracking-widest mb-1">Téléphone</p>
				<p class="font-h3 text-primary">{CONTACT_PHONE_DISPLAY}</p>
				<p class="text-sm text-on-surface-variant mt-1">Appel direct</p>
			</a>
			<a href={`mailto:${CONTACT_EMAIL}`} class="bg-white rounded-xl border border-outline-variant/10 shadow-ambient p-md hover:bg-surface-container-low transition-colors">
				<p class="font-label-caps text-secondary uppercase tracking-widest mb-1">Email</p>
				<p class="text-base font-semibold text-primary break-all">{CONTACT_EMAIL}</p>
				<p class="text-sm text-on-surface-variant mt-1">Réponse sous 24 à 48 h</p>
			</a>
			<a href="https://maps.google.com/?q=15+bis+rue+du+Pont+80470+Ailly-sur-Somme" target="_blank" rel="noreferrer" class="bg-white rounded-xl border border-outline-variant/10 shadow-ambient p-md hover:bg-surface-container-low transition-colors">
				<p class="font-label-caps text-secondary uppercase tracking-widest mb-1">Adresse</p>
				<p class="text-base font-semibold text-primary">{CONTACT_ADDRESS_LINES[0]}</p>
				<p class="text-sm text-on-surface-variant mt-1">{CONTACT_ADDRESS_LINES[1]}</p>
				<p class="text-sm text-on-surface-variant mt-1">Voir l'itinéraire</p>
			</a>
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
						value={defaultSubject}
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
					<a href={`mailto:${CONTACT_EMAIL}`} class="text-secondary font-medium hover:underline">{CONTACT_EMAIL}</a>
				</p>
			</form>
		{/if}

	</div>
</div>
