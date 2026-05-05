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
					{ title: 'Légumes', value: 'Légumes' },
					{ title: 'Fruits', value: 'Fruits' },
					{ title: 'Plants potagers', value: 'Plants potagers' },
					{ title: 'Produits transformés', value: 'Produits transformés' },
					{ title: 'Miel & Conserves', value: 'Miel & Conserves' }
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
