import { defineType, defineField } from 'sanity';

export const teamMember = defineType({
	name: 'teamMember',
	title: "Membre de l'équipe",
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Nom',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'role',
			title: 'Rôle',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'bio',
			title: 'Bio courte',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'image',
			title: 'Portrait',
			type: 'image',
			options: { hotspot: true }
		}),
		defineField({
			name: 'order',
			title: 'Ordre d\'affichage',
			type: 'number',
			initialValue: 99
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'role',
			media: 'image'
		}
	}
});
