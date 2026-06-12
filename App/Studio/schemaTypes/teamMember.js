import { defineType, defineField } from 'sanity';

export const teamMember = defineType({
	name: 'teamMember',
	title: "Membre de l'équipe",
	type: 'document',
	groups: [
		{ name: 'identity', title: 'Identite', default: true },
		{ name: 'display', title: 'Affichage' }
	],
	fields: [
		defineField({
			name: 'name',
			title: 'Nom',
			type: 'string',
			group: 'identity',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'role',
			title: 'Rôle',
			type: 'string',
			group: 'identity',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'bio',
			title: 'Bio courte',
			type: 'text',
			group: 'identity',
			rows: 3
		}),
		defineField({
			name: 'image',
			title: 'Portrait',
			type: 'image',
			group: 'display',
			options: { hotspot: true }
		}),
		defineField({
			name: 'order',
			title: 'Ordre d\'affichage',
			type: 'number',
			group: 'display',
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
