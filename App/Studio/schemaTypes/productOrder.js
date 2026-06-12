import { defineArrayMember, defineField, defineType } from 'sanity';
import {
	ORDER_PICKUP_LOCATIONS,
	ORDER_REFERRAL_SOURCES,
	ORDER_STATUSES
} from './shared.js';

const STATUS_LABELS = {
	reserved: 'Reservee',
	confirmed: 'Confirmee',
	prepared: 'Preparee',
	cancelled: 'Annulee'
};

export const productOrder = defineType({
	name: 'productOrder',
	title: 'Commande produit',
	type: 'document',
	groups: [
		{ name: 'order', title: 'Commande', default: true },
		{ name: 'customer', title: 'Client' },
		{ name: 'items', title: 'Lignes' },
		{ name: 'notes', title: 'Suivi' }
	],
	fields: [
		defineField({
			name: 'orderNumber',
			title: 'Numéro de commande',
			type: 'string',
			group: 'order',
			description: 'Identifiant transmis au client et à l\'équipe pour le suivi.',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'status',
			title: 'Statut',
			type: 'string',
			group: 'order',
			initialValue: 'reserved',
			description: 'Mettre à jour l\'avancement de la commande.',
			options: {
				list: ORDER_STATUSES,
				layout: 'radio'
			}
			,
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'customerName',
			title: 'Nom du client',
			type: 'string',
			group: 'customer',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'customerEmail',
			title: 'Email',
			type: 'string',
			group: 'customer',
			validation: (Rule) =>
				Rule.required().custom((value) => {
					if (!value) return 'Email obligatoire.';
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : 'Format email invalide.';
				})
		}),
		defineField({
			name: 'customerPhone',
			title: 'Téléphone',
			type: 'string',
			group: 'customer',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'pickupLocation',
			title: 'Point de retrait',
			type: 'string',
			group: 'order',
			options: {
				list: ORDER_PICKUP_LOCATIONS.map((location) => ({ title: location, value: location }))
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'referralSource',
			title: 'Comment le client a connu la ferme',
			type: 'string',
			group: 'customer',
			options: {
				list: ORDER_REFERRAL_SOURCES.map((source) => ({ title: source, value: source }))
			}
		}),
		defineField({
			name: 'newsletterOptIn',
			title: 'Newsletter',
			type: 'boolean',
			group: 'customer',
			initialValue: false
		}),
		defineField({
			name: 'notes',
			title: 'Notes',
			type: 'text',
			group: 'notes',
			rows: 4
		}),
		defineField({
			name: 'reservedAt',
			title: 'Date de réservation',
			type: 'datetime',
			group: 'order'
		}),
		defineField({
			name: 'totalAmount',
			title: 'Total',
			type: 'number',
			group: 'order',
			description: 'Montant total estimé de la commande.',
			validation: (Rule) => Rule.required().min(0)
		}),
		defineField({
			name: 'items',
			title: 'Lignes de commande',
			type: 'array',
			group: 'items',
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