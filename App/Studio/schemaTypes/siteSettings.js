import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Paramètres du site',
	type: 'document',
	__experimental_actions: ['update', 'publish'],
	fields: [
		defineField({
			name: 'heroTitle',
			title: 'Titre Hero',
			type: 'string'
		}),
		defineField({
			name: 'heroSubtitle',
			title: 'Sous-titre Hero',
			type: 'text',
			rows: 2
		}),
		defineField({
			name: 'heroImage',
			title: 'Image Hero',
			type: 'image',
			options: { hotspot: true }
		}),
		defineField({
			name: 'philosophyTitle',
			title: 'Titre Philosophie',
			type: 'string'
		}),
		defineField({
			name: 'philosophyBody',
			title: 'Texte Philosophie',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'philosophyImage',
			title: 'Image Philosophie',
			type: 'image',
			options: { hotspot: true }
		}),
		defineField({
			name: 'newsletterEnabled',
			title: 'Newsletter activée',
			type: 'boolean',
			initialValue: true
		})
	],
	preview: {
		prepare() {
			return { title: "Paramètres du site" };
		}
	}
});
