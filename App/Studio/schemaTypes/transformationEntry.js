import { defineType, defineField } from 'sanity';
import { STOCK_UNIT_OPTIONS } from './shared.js';

export const transformationEntry = defineType({
	name: 'transformationEntry',
	title: 'Transformation',
	type: 'document',
	groups: [
		{ name: 'input', title: 'Entree', default: true },
		{ name: 'output', title: 'Sortie' },
		{ name: 'traceability', title: 'Tracabilite' }
	],
	fields: [
		defineField({
			name: 'inputProduct',
			title: 'Produit brut utilise',
			type: 'reference',
			group: 'input',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'inputQuantity',
			title: 'Quantite consommee',
			type: 'number',
			group: 'input',
			validation: (Rule) => Rule.required().positive()
		}),
		defineField({
			name: 'inputUnit',
			title: 'Unite produit brut',
			type: 'string',
			group: 'input',
			options: {
				list: STOCK_UNIT_OPTIONS
			},
			initialValue: 'kg',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'outputProduct',
			title: 'Produit transforme',
			type: 'reference',
			group: 'output',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'outputQuantity',
			title: 'Quantite produite',
			type: 'number',
			group: 'output',
			validation: (Rule) => Rule.required().positive()
		}),
		defineField({
			name: 'outputUnit',
			title: 'Unite produit final',
			type: 'string',
			group: 'output',
			options: {
				list: STOCK_UNIT_OPTIONS
			},
			initialValue: 'kg',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'estimatedWaste',
			title: 'Pertes estimees',
			type: 'number',
			group: 'output',
			validation: (Rule) => Rule.min(0)
		}),
		defineField({
			name: 'batchNumber',
			title: 'Numero de lot',
			type: 'string',
			group: 'traceability',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'notes',
			title: 'Notes de production',
			type: 'text',
			group: 'traceability',
			rows: 3
		}),
		defineField({
			name: 'recordedBy',
			title: 'Enregistre par',
			type: 'string',
			group: 'traceability'
		}),
		defineField({
			name: 'transformedAt',
			title: 'Date de transformation',
			type: 'datetime',
			group: 'traceability',
			validation: (Rule) => Rule.required()
		})
	],
	orderings: [
		{
			title: 'Plus recentes',
			name: 'dateDesc',
			by: [{ field: 'transformedAt', direction: 'desc' }]
		}
	],
	preview: {
		select: {
			inputName: 'inputProduct.name',
			outputName: 'outputProduct.name',
			outputQuantity: 'outputQuantity',
			outputUnit: 'outputUnit'
		},
		prepare({ inputName, outputName, outputQuantity, outputUnit }) {
			return {
				title: `${inputName ?? 'Brut'} -> ${outputName ?? 'Transforme'}`,
				subtitle: `${outputQuantity ?? 0} ${outputUnit ?? ''}`
			};
		}
	}
});
