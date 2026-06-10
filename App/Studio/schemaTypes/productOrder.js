import { defineField, defineType } from 'sanity';

export const productOrder = defineType({
	name: 'productOrder',
	title: 'Commande produit',
	type: 'document',
	fields: [
		defineField({
			name: 'orderNumber',
			title: 'Numéro de commande',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'status',
			title: 'Statut',
			type: 'string',
			initialValue: 'reserved',
			options: {
				list: [
					{ title: 'Réservée', value: 'reserved' },
					{ title: 'Confirmée', value: 'confirmed' },
					{ title: 'Préparée', value: 'prepared' },
					{ title: 'Annulée', value: 'cancelled' }
				]
			}
		}),
		defineField({
			name: 'customerName',
			title: 'Nom du client',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'customerEmail',
			title: 'Email',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'customerPhone',
			title: 'Téléphone',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'pickupLocation',
			title: 'Point de retrait',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'referralSource',
			title: 'Comment le client a connu la ferme',
			type: 'string'
		}),
		defineField({
			name: 'newsletterOptIn',
			title: 'Newsletter',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'notes',
			title: 'Notes',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'reservedAt',
			title: 'Date de réservation',
			type: 'datetime'
		}),
		defineField({
			name: 'totalAmount',
			title: 'Total',
			type: 'number',
			validation: (Rule) => Rule.required().min(0)
		}),
		defineField({
			name: 'items',
			title: 'Lignes de commande',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'productOrderItem',
					fields: [
						{ name: 'product', title: 'Produit', type: 'reference', to: [{ type: 'product' }], validation: (Rule) => Rule.required() },
						{ name: 'productName', title: 'Nom du produit', type: 'string', validation: (Rule) => Rule.required() },
						{ name: 'quantity', title: 'Quantité', type: 'number', validation: (Rule) => Rule.required().min(1) },
						{ name: 'unitPrice', title: 'Prix unitaire', type: 'number', validation: (Rule) => Rule.required().min(0) },
						{ name: 'subtotal', title: 'Sous-total', type: 'number', validation: (Rule) => Rule.required().min(0) }
					]
				}
			]
		})
	],
	preview: {
		select: {
			title: 'orderNumber',
			subtitle: 'customerName',
			quantity: 'items.length',
			totalAmount: 'totalAmount'
		},
		prepare({ title, subtitle, quantity, totalAmount }) {
			return {
				title: title ?? 'Commande',
				subtitle: `${subtitle ?? 'Client'} · ${quantity ?? 0} ligne(s) · ${totalAmount ?? 0} €`
			};
		}
	}
});