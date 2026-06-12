import { defineType, defineField } from 'sanity';
import { STOCK_UNIT_OPTIONS } from './shared.js';

export const stockEntry = defineType({
	name: 'stockEntry',
	title: 'Stock',
	type: 'document',
	groups: [
		{ name: 'product', title: 'Produit', default: true },
		{ name: 'levels', title: 'Niveaux' },
		{ name: 'meta', title: 'Suivi' }
	],
	fields: [
		defineField({
			name: 'product',
			title: 'Produit',
			type: 'reference',
			group: 'product',
			to: [{ type: 'product' }],
			validation: (Rule) =>
				Rule.required().custom(async (value, context) => {
					if (!value?._ref) return true;

					const documentId = context.document?._id;
					if (!documentId) return true;

					const publishedId = documentId.replace(/^drafts\./, '');
					const draftId = `drafts.${publishedId}`;

					const count = await context
						.getClient({ apiVersion: '2024-01-01' })
						.fetch(
							'count(*[_type == "stockEntry" && product._ref == $productRef && !(_id in [$draftId, $publishedId])])',
							{
								productRef: value._ref,
								draftId,
								publishedId
							}
						);

					return count === 0 ? true : 'Un seul document de stock est autorise par produit.';
				})
		}),
		defineField({
			name: 'quantity',
			title: 'Quantité en stock',
			type: 'number',
			group: 'levels',
			initialValue: 0,
			validation: (Rule) => Rule.required().min(0)
		}),
		defineField({
			name: 'unit',
			title: 'Unité',
			type: 'string',
			group: 'levels',
			options: {
				list: STOCK_UNIT_OPTIONS
			},
			initialValue: 'kg',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'lowStockThreshold',
			title: 'Seuil d\'alerte stock bas',
			description: 'En dessous de cette quantité, une alerte est affichée',
			type: 'number',
			group: 'levels',
			initialValue: 5,
			validation: (Rule) => Rule.min(0)
		}),
		defineField({
			name: 'updatedAt',
			title: 'Dernière mise à jour',
			type: 'datetime',
			group: 'meta',
			options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' }
		})
	],
	preview: {
		select: {
			title: 'product.name',
			quantity: 'quantity',
			unit: 'unit'
		},
		prepare({ title, quantity, unit }) {
			return {
				title: title ?? 'Produit inconnu',
				subtitle: `${quantity ?? 0} ${unit ?? ''}`
			};
		}
	}
});
