import { defineType, defineField } from 'sanity';

export const farmStay = defineType({
	name: 'farmStay',
	title: 'Séjour à la ferme',
	type: 'document',
	__experimental_actions: ['update', 'publish'],
	fields: [
		defineField({
			name: 'heroImage',
			title: 'Image principale',
			type: 'image',
			options: { hotspot: true }
		}),
		defineField({
			name: 'heroTitle',
			title: 'Titre principal',
			type: 'string'
		}),
		defineField({
			name: 'heroDescription',
			title: 'Description principale',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'amenities',
			title: 'Équipements Accueil Vélo',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'icon', title: 'Icône Material', type: 'string' },
						{ name: 'text', title: 'Description', type: 'string' }
					]
				}
			]
		}),
		defineField({
			name: 'bookingOptions',
			title: 'Options de réservation',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'id', title: 'ID', type: 'string' },
						{ name: 'title', title: 'Titre', type: 'string' },
						{ name: 'description', title: 'Description', type: 'string' },
						{ name: 'price', title: 'Prix affiché', type: 'string' }
					]
				}
			]
		}),
		defineField({
			name: 'basePrice',
			title: 'Prix de base / nuit (€)',
			type: 'number'
		})
	],
	preview: {
		prepare() {
			return { title: 'Séjour à la ferme' };
		}
	}
});
