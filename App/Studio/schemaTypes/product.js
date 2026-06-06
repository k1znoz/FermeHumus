import { defineType, defineField } from 'sanity';

export const product = defineType({
	name: 'product',
	title: 'Produit',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Nom du produit',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'name', maxLength: 96 },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Catégorie',
			type: 'string',
			options: {
				list: [
					{ title: 'Conserves', value: 'Conserves' },
					{ title: 'Produits frais', value: 'Produits frais' },
					{ title: 'Plants', value: 'Plants' }
				]
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'badge',
			title: 'Badge (optionnel)',
			description: 'Ex: Saisonnier, Artisanal, Nouveauté',
			type: 'string'
		}),
		defineField({
			name: 'price',
			title: 'Prix (€)',
			type: 'number',
			validation: (Rule) => Rule.required().positive()
		}),
		defineField({
			name: 'description',
			title: 'Description courte',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required().max(200)
		}),
		defineField({
			name: 'image',
			title: 'Photo du produit (optionnel)',
			type: 'image',
			options: { hotspot: true }
		}),
		defineField({
			name: 'available',
			title: 'Disponible',
			type: 'boolean',
			initialValue: true
		}),
		defineField({
			name: 'visibilityMode',
			title: 'Visibilité saisonnière',
			type: 'string',
			initialValue: 'category',
			options: {
				list: [
					{ title: 'Règle de catégorie', value: 'category' },
					{ title: 'Toujours visible', value: 'always' },
					{ title: 'Période personnalisée', value: 'custom' }
				],
				layout: 'radio'
			},
			description: 'Par défaut, Plants est visible de mars à mi-juin.'
		}),
		defineField({
			name: 'seasonStartMonth',
			title: 'Début - mois',
			type: 'number',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) => Rule.min(1).max(12)
		}),
		defineField({
			name: 'seasonStartDay',
			title: 'Début - jour',
			type: 'number',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) => Rule.min(1).max(31)
		}),
		defineField({
			name: 'seasonEndMonth',
			title: 'Fin - mois',
			type: 'number',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) => Rule.min(1).max(12)
		}),
		defineField({
			name: 'seasonEndDay',
			title: 'Fin - jour',
			type: 'number',
			hidden: ({ document }) => document?.visibilityMode !== 'custom',
			validation: (Rule) => Rule.min(1).max(31)
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
