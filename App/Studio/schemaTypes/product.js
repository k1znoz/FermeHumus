import { defineType, defineField } from 'sanity';
import { PRODUCT_CATEGORIES } from './shared.js';

export const product = defineType({
	name: 'product',
	title: 'Produit',
	type: 'document',
	groups: [
		{ name: 'catalog', title: 'Catalogue', default: true },
		{ name: 'pricing', title: 'Prix' },
		{ name: 'availability', title: 'Disponibilite' },
		{ name: 'seasonality', title: 'Saisonnalite' }
	],
	fields: [
		defineField({
			name: 'name',
			title: 'Nom du produit',
			type: 'string',
			group: 'catalog',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'catalog',
			options: { source: 'name', maxLength: 96 },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Catégorie',
			type: 'string',
			group: 'catalog',
			options: {
				list: PRODUCT_CATEGORIES.map((category) => ({ title: category, value: category }))
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'badge',
			title: 'Badge (optionnel)',
			description: 'Ex: Saisonnier, Artisanal, Nouveauté',
			type: 'string',
			group: 'catalog'
		}),
		defineField({
			name: 'price',
			title: 'Prix (€)',
			type: 'number',
			group: 'pricing',
			validation: (Rule) => Rule.required().positive()
		}),
		defineField({
			name: 'description',
			title: 'Description courte',
			type: 'text',
			group: 'catalog',
			rows: 3,
			validation: (Rule) => Rule.required().max(200)
		}),
		defineField({
			name: 'image',
			title: 'Photo du produit (optionnel)',
			type: 'image',
			group: 'catalog',
			options: { hotspot: true }
		}),
		defineField({
			name: 'available',
			title: 'Disponible',
			description: 'Champ pilote automatiquement par les ecrans d\'administration Web selon le stock.',
			type: 'boolean',
			group: 'availability',
			initialValue: true,
			readOnly: true
		}),
		defineField({
			name: 'visibilityMode',
			title: 'Visibilité saisonnière',
			type: 'string',
			group: 'seasonality',
			initialValue: 'category',
			options: {
				list: [
					{ title: 'Règle de catégorie', value: 'category' },
					{ title: 'Toujours visible', value: 'always' },
					{ title: 'Période personnalisée', value: 'custom' }
				],
				layout: 'radio'
			},
			description: 'Par defaut, Plants est visible de mars a mi-juin.'
		}),
		defineField({
			name: 'seasonStartMonth',
			title: 'Debut - mois',
			type: 'number',
			group: 'seasonality',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) =>
				Rule.min(1)
					.max(12)
					.custom((value, context) => {
						if (context.document?.visibilityMode !== 'custom') return true;
						return typeof value === 'number' ? true : 'Champ obligatoire en mode personnalise.';
					})
		}),
		defineField({
			name: 'seasonStartDay',
			title: 'Debut - jour',
			type: 'number',
			group: 'seasonality',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) =>
				Rule.min(1)
					.max(31)
					.custom((value, context) => {
						if (context.document?.visibilityMode !== 'custom') return true;
						return typeof value === 'number' ? true : 'Champ obligatoire en mode personnalise.';
					})
		}),
		defineField({
			name: 'seasonEndMonth',
			title: 'Fin - mois',
			type: 'number',
			group: 'seasonality',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) =>
				Rule.min(1)
					.max(12)
					.custom((value, context) => {
						if (context.document?.visibilityMode !== 'custom') return true;
						return typeof value === 'number' ? true : 'Champ obligatoire en mode personnalise.';
					})
		}),
		defineField({
			name: 'seasonEndDay',
			title: 'Fin - jour',
			type: 'number',
			group: 'seasonality',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) =>
				Rule.min(1)
					.max(31)
					.custom((value, context) => {
						if (context.document?.visibilityMode !== 'custom') return true;
						return typeof value === 'number' ? true : 'Champ obligatoire en mode personnalise.';
					})
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'category',
			media: 'image'
		}
	}
});
