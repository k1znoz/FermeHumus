<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Simple cart state (replace with store in production)
	let cartCount = $state(0);
</script>

<svelte:head>
	<title>Ferme de l'Humus — Cultiver le Vivant, Nourrir le Local</title>
	<meta
		name="description"
		content="Une agriculture régénératrice au service de la biodiversité et de votre santé. Produits biologiques, séjours à la ferme et marchés locaux."
	/>
</svelte:head>

<Header {cartCount} />

<main class="min-h-dvh">
	{@render children()}
</main>

<Footer />
