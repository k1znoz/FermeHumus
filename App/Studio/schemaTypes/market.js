import { defineType, defineField } from 'sanity';

export const market = defineType({
	name: 'market',
	title: 'Point de vente',
	type: 'document',
	groups: [
		{ name: 'core', title: 'Principal', default: true },
		{ name: 'location', title: 'Localisation' }
	],
	fields: [
		defineField({
			name: 'name',
			title: 'Nom',
			type: 'string',
			group: 'core',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			group: 'core',
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
			group: 'core',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'address',
			title: 'Adresse / Lieu',
			type: 'string',
			group: 'location'
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'schedule'
		}
	}
});
