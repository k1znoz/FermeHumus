<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/** @type {{ cartCount?: number }} */
	let { cartCount = 0 } = $props();

	const navLinks = [
		{ href: '/', label: 'Accueil' },
		{ href: '/produits', label: 'Produits' },
		{ href: '/a-propos', label: 'À Propos' },
		{ href: '/ou-nous-trouver', label: 'Nous trouver' },
		{ href: '/reserver', label: 'Séjour' }
	];

	let menuOpen = $state(false);
	let isScrolled = $state(false);
	const isHome = $derived($page.url.pathname === '/');
	const transparent = $derived(isHome && !isScrolled);
	const toggleMenu = () => (menuOpen = !menuOpen);

	onMount(() => {
		const onScroll = () => {
			isScrolled = window.scrollY > 12;
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<header
	class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 transition-all duration-300
		{transparent
			? 'bg-transparent border-b border-transparent'
			: 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#2D4236]/10 shadow-[0px_4px_20px_rgba(45,66,54,0.05)]'}"
>
	<!-- Logo / Brand -->
	<div class="flex items-center gap-4">
		<button
			onclick={toggleMenu}
			class="material-symbols-outlined cursor-pointer hover:opacity-80 transition-colors duration-300 md:hidden {transparent ? 'text-white [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.4))]' : 'text-[#2D4236]'}"
			aria-label="Menu"
		>
			menu
		</button>
		<a
			href="/"
			class="text-xl font-semibold italic font-newsreader tracking-tight transition-colors duration-300
				{transparent ? 'text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]' : 'text-[#2D4236]'}"
		>
			Ferme de l'Humus
		</a>
	</div>

	<!-- Desktop Nav -->
	<nav class="hidden md:flex gap-8 items-center">
		{#each navLinks as link}
			<a
				href={link.href}
				class="font-newsreader font-medium tracking-tight transition-all duration-300 hover:opacity-80
					{transparent
						? $page.url.pathname === link.href
							? 'text-white border-b-2 border-white [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]'
							: 'text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]'
						: $page.url.pathname === link.href
							? 'text-[#2D4236] border-b-2 border-[#2D4236]'
							: 'text-[#2D4236]/70'}"
			>
				{link.label}
			</a>
		{/each}
	</nav>

	<!-- Book CTA -->
	<a
		href="/reserver"
		class="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-caps uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
	>
		Réserver
	</a>
</header>

<!-- Mobile Drawer -->
{#if menuOpen}
	<div
		class="fixed inset-0 z-40 bg-black/40"
		onclick={toggleMenu}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && toggleMenu()}
		aria-label="Fermer le menu"
	></div>
	<nav
		class="fixed top-0 left-0 h-full w-72 z-50 bg-surface flex flex-col pt-24 px-6 gap-2 shadow-xl"
	>
		<button
			onclick={toggleMenu}
			class="absolute top-5 right-5 material-symbols-outlined text-primary"
			aria-label="Fermer"
		>
			close
		</button>
		{#each navLinks as link}
			<a
				href={link.href}
				onclick={toggleMenu}
				class="py-3 px-4 rounded-lg font-newsreader font-medium text-lg transition-colors
          {$page.url.pathname === link.href
					? 'bg-primary-fixed text-primary'
					: 'text-[#2D4236]/80 hover:bg-surface-container'}"
			>
				{link.label}
			</a>
		{/each}
		<a
			href="/reserver"
			onclick={toggleMenu}
			class="mt-auto mb-8 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-caps uppercase tracking-widest text-center hover:opacity-90 transition-all"
		>
			Réserver un séjour
		</a>
	</nav>
{/if}
