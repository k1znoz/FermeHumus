import { defineType, defineField } from 'sanity';

export const stockEntry = defineType({
	name: 'stockEntry',
	title: 'Stock',
	type: 'document',
	fields: [
		defineField({
			name: 'product',
			title: 'Produit',
			type: 'reference',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'quantity',
			title: 'Quantité en stock',
			type: 'number',
			initialValue: 0,
			validation: (Rule) => Rule.required().min(0)
		}),
		defineField({
			name: 'unit',
			title: 'Unité',
			type: 'string',
			options: {
				list: [
					{ title: 'kg', value: 'kg' },
					{ title: 'pièce(s)', value: 'pcs' },
					{ title: 'botte(s)', value: 'botte' },
					{ title: 'barquette(s)', value: 'barquette' },
					{ title: 'douzaine(s)', value: 'doz' },
					{ title: 'pot(s)', value: 'pot' },
					{ title: 'litre(s)', value: 'L' }
				]
			},
			initialValue: 'kg',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'lowStockThreshold',
			title: 'Seuil d\'alerte stock bas',
			description: 'En dessous de cette quantité, une alerte est affichée',
			type: 'number',
			initialValue: 5,
			validation: (Rule) => Rule.min(0)
		}),
		defineField({
			name: 'updatedAt',
			title: 'Dernière mise à jour',
			type: 'datetime',
			options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' }
		})
	],
	preview: {
		select: {
			title: 'product.name',
			quantity: 'quantity',
			unit: 'unit'
		},
		prepare({ title, quantity, unit }) {
			return {
				title: title ?? 'Produit inconnu',
				subtitle: `${quantity ?? 0} ${unit ?? ''}`
			};
		}
	}
});
