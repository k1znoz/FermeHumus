<script>
	import { page } from '$app/stores';

	let { children } = $props();

	const navItems = [
		{ href: '/admin', label: 'Tableau de bord', icon: 'dashboard' },
		{ href: '/admin/stock', label: 'Stock', icon: 'stock' },
		{ href: '/admin/harvest', label: 'Récolte', icon: 'harvest' },
		{ href: '/admin/transform', label: 'Atelier', icon: 'transform' },
		{ href: '/admin/history', label: 'Historique', icon: 'history' }
	];

	function isActive(href) {
		if (href === '/admin') return $page.url.pathname === '/admin';
		return $page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<title>Admin — Ferme de l'Humus</title>
</svelte:head>

<div class="min-h-dvh bg-[#faf9f6] pb-20 font-sans">
	{@render children()}
</div>

<!-- Barre de navigation fixe en bas -->
<nav class="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e3e2e0] bg-white">
	<div class="mx-auto flex max-w-md items-center justify-around px-2 py-2">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors {isActive(item.href)
					? 'text-[#172c21]'
					: 'text-[#737873] hover:text-[#424844]'}"
			>
				{#if item.icon === 'dashboard'}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
						<rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
					</svg>
				{:else if item.icon === 'stock'}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
						<path d="M20 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z" />
						<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
						<line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
					</svg>
				{:else if item.icon === 'harvest'}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
						<path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
						<circle cx="12" cy="9" r="2.5" />
					</svg>
				{:else if item.icon === 'history'}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
						<polyline points="12 8 12 12 14 14" />
						<path d="M3.05 11a9 9 0 1 0 .5-4.5" /><polyline points="3 3 3 7 7 7" />
					</svg>
				{:else if item.icon === 'transform'}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
						<path d="M7 7h11v11" />
						<path d="M17 7 7 17" />
						<path d="M17 17H6V6" />
					</svg>
				{/if}
				<span class="text-[10px] font-medium">{item.label}</span>
			</a>
		{/each}

		<form method="POST" action="/admin/logout">
			<button
				type="submit"
				class="flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[#737873] hover:text-[#964824] transition-colors"
				title="Déconnexion"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
					<polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
				</svg>
				<span class="text-[10px] font-medium">Quitter</span>
			</button>
		</form>
	</div>
</nav>
