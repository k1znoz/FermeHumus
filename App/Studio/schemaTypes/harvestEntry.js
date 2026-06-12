import { defineType, defineField } from 'sanity';
import { STOCK_UNIT_OPTIONS } from './shared.js';

export const harvestEntry = defineType({
	name: 'harvestEntry',
	title: 'Récolte',
	type: 'document',
	groups: [
		{ name: 'main', title: 'Saisie', default: true },
		{ name: 'traceability', title: 'Tracabilite' }
	],
	fields: [
		defineField({
			name: 'product',
			title: 'Produit',
			type: 'reference',
			group: 'main',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'quantity',
			title: 'Quantité récoltée',
			type: 'number',
			group: 'main',
			validation: (Rule) => Rule.required().positive()
		}),
		defineField({
			name: 'unit',
			title: 'Unité',
			type: 'string',
			group: 'main',
			options: {
				list: STOCK_UNIT_OPTIONS
			},
			initialValue: 'kg',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'harvestDate',
			title: 'Date de récolte',
			type: 'date',
			group: 'main',
			options: { dateFormat: 'DD/MM/YYYY' },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'terrainCondition',
			title: 'Conditions de terrain',
			type: 'string',
			group: 'traceability',
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
			group: 'traceability',
			rows: 3
		}),
		defineField({
			name: 'recordedBy',
			title: 'Enregistré par',
			type: 'string',
			group: 'traceability'
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
