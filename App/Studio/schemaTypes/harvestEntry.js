import { defineType, defineField } from 'sanity';

export const harvestEntry = defineType({
	name: 'harvestEntry',
	title: 'Récolte',
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
			title: 'Quantité récoltée',
			type: 'number',
			validation: (Rule) => Rule.required().positive()
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
			name: 'harvestDate',
			title: 'Date de récolte',
			type: 'date',
			options: { dateFormat: 'DD/MM/YYYY' },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'terrainCondition',
			title: 'Conditions de terrain',
			type: 'string',
			options: {
				list: [
					{ title: 'Sec', value: 'sec' },
					{ title: 'Humide', value: 'humide' },
					{ title: 'Couvert', value: 'couvert' }
				],
				layout: 'radio'
			}
		}),
		defineField({
			name: 'notes',
			title: 'Notes de qualité / N° de lot',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'recordedBy',
			title: 'Enregistré par',
			type: 'string'
		})
	],
	orderings: [
		{
			title: 'Date de récolte (récent)',
			name: 'harvestDateDesc',
			by: [{ field: 'harvestDate', direction: 'desc' }]
		}
	],
	preview: {
		select: {
			title: 'product.name',
			date: 'harvestDate',
			quantity: 'quantity',
			unit: 'unit'
		},
		prepare({ title, date, quantity, unit }) {
			return {
				title: `+${quantity ?? 0} ${unit ?? 'kg'} — ${title ?? 'Produit inconnu'}`,
				subtitle: date ?? ''
			};
		}
	}
});
