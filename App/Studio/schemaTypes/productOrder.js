import { defineArrayMember, defineField, defineType } from 'sanity';

const STATUS_LABELS = {
	reserved: 'Réservée',
	confirmed: 'Confirmée',
	prepared: 'Préparée',
	cancelled: 'Annulée'
};

export const productOrder = defineType({
	name: 'productOrder',
	title: 'Commande produit',
	type: 'document',
	fields: [
		defineField({
			name: 'orderNumber',
			title: 'Numéro de commande',
			type: 'string',
			description: 'Identifiant transmis au client et à l\'équipe pour le suivi.',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'status',
			title: 'Statut',
			type: 'string',
			initialValue: 'reserved',
			description: 'Mettre à jour l\'avancement de la commande.',
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
			description: 'Montant total estimé de la commande.',
			validation: (Rule) => Rule.required().min(0)
		}),
		defineField({
			name: 'items',
			title: 'Lignes de commande',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'productOrderItem',
					title: 'Produit commandé',
					fields: [
						defineField({ name: 'product', title: 'Produit', type: 'reference', to: [{ type: 'product' }], validation: (Rule) => Rule.required() }),
						defineField({ name: 'productName', title: 'Nom du produit', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'quantity', title: 'Quantité', type: 'number', validation: (Rule) => Rule.required().min(1) }),
						defineField({ name: 'unitPrice', title: 'Prix unitaire', type: 'number', validation: (Rule) => Rule.required().min(0) }),
						defineField({ name: 'subtotal', title: 'Sous-total', type: 'number', validation: (Rule) => Rule.required().min(0) })
					],
					preview: {
						select: {
							title: 'productName',
							quantity: 'quantity',
							unitPrice: 'unitPrice',
							subtotal: 'subtotal'
						},
						prepare({ title, quantity, unitPrice, subtotal }) {
							return {
								title: title ?? 'Produit',
								subtitle: `${quantity ?? 0} × ${unitPrice ?? 0} EUR · Sous-total ${subtotal ?? 0} EUR`
							};
						}
					}
				})
			]
		})
	],
	preview: {
		select: {
			title: 'orderNumber',
			customerName: 'customerName',
			status: 'status',
			quantity: 'items.length',
			totalAmount: 'totalAmount',
			pickupLocation: 'pickupLocation'
		},
		prepare({ title, customerName, status, quantity, totalAmount, pickupLocation }) {
			const statusLabel = STATUS_LABELS[status] ?? status ?? 'Statut inconnu';
			return {
				title: title ?? 'Commande',
				subtitle: `${statusLabel} · ${customerName ?? 'Client'} · ${quantity ?? 0} ligne(s) · ${totalAmount ?? 0} EUR · ${pickupLocation ?? 'Retrait non précisé'}`
			};
		}
	}
});