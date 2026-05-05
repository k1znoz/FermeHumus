import { defineType, defineField } from 'sanity';

export const transformationEntry = defineType({
	name: 'transformationEntry',
	title: 'Transformation',
	type: 'document',
	fields: [
		defineField({
			name: 'inputProduct',
			title: 'Produit brut utilise',
			type: 'reference',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'inputQuantity',
			title: 'Quantite consommee',
			type: 'number',
			validation: (Rule) => Rule.required().positive()
		}),
		defineField({
			name: 'inputUnit',
			title: 'Unite produit brut',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'outputProduct',
			title: 'Produit transforme',
			type: 'reference',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'outputQuantity',
			title: 'Quantite produite',
			type: 'number',
			validation: (Rule) => Rule.required().positive()
		}),
		defineField({
			name: 'outputUnit',
			title: 'Unite produit final',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'estimatedWaste',
			title: 'Pertes estimees',
			type: 'number',
			validation: (Rule) => Rule.min(0)
		}),
		defineField({
			name: 'batchNumber',
			title: 'Numero de lot',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'notes',
			title: 'Notes de production',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'recordedBy',
			title: 'Enregistre par',
			type: 'string'
		}),
		defineField({
			name: 'transformedAt',
			title: 'Date de transformation',
			type: 'datetime',
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
