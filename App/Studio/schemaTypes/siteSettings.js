import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Paramètres du site',
	type: 'document',
	__experimental_actions: ['update', 'publish'],
	groups: [
		{ name: 'hero', title: 'Hero', default: true },
		{ name: 'philosophy', title: 'Philosophie' },
		{ name: 'features', title: 'Fonctions' }
	],
	fields: [
		defineField({
			name: 'heroTitle',
			title: 'Titre Hero',
			type: 'string',
			group: 'hero',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'heroSubtitle',
			title: 'Sous-titre Hero',
			type: 'text',
			group: 'hero',
			rows: 2
		}),
		defineField({
			name: 'heroImage',
			title: 'Image Hero',
			type: 'image',
			group: 'hero',
			options: { hotspot: true }
		}),
		defineField({
			name: 'philosophyTitle',
			title: 'Titre Philosophie',
			type: 'string',
			group: 'philosophy'
		}),
		defineField({
			name: 'philosophyBody',
			title: 'Texte Philosophie',
			type: 'text',
			group: 'philosophy',
			rows: 4
		}),
		defineField({
			name: 'philosophyImage',
			title: 'Image Philosophie',
			type: 'image',
			group: 'philosophy',
			options: { hotspot: true }
		}),
		defineField({
			name: 'newsletterEnabled',
			title: 'Newsletter activée',
			type: 'boolean',
			group: 'features',
			initialValue: true
		})
	],
	preview: {
		prepare() {
			return { title: "Paramètres du site" };
		}
	}
});
