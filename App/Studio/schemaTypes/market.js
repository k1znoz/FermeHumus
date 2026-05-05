import { defineType, defineField } from 'sanity';

export const market = defineType({
	name: 'market',
	title: 'Point de vente',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Nom',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Marché', value: 'marche' },
					{ title: 'Partenaire', value: 'partenaire' }
				],
				layout: 'radio'
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'schedule',
			title: 'Horaires',
			description: 'Ex: Samedi, 08:00 — 13:00',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'address',
			title: 'Adresse / Lieu',
			type: 'string'
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'schedule'
		}
	}
});
