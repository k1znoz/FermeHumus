<script>
	/** @type {{ title: string, subtitle: string, image: string, href?: string }} */
	let { title, subtitle, image, href = '#' } = $props();
</script>

<a
	{href}
	class="relative h-64 rounded-xl overflow-hidden flex items-end p-md group block"
>
	<img
		src={image}
		alt={title}
		class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
		loading="lazy"
	/>
	<div class="absolute inset-0 bg-black/30"></div>
	<div class="relative z-10">
		<h3 class="font-h3 text-white">{title}</h3>
		<p class="text-white/80 text-sm">{subtitle}</p>
	</div>
</a>
