import { writeClient } from '$lib/sanity.js';
import { fail, redirect } from '@sveltejs/kit';

const categories = ['Légumes', 'Fruits', 'Plants potagers', 'Produits transformés', 'Miel & Conserves'];
const units = ['kg', 'pcs', 'botte', 'barquette', 'doz', 'pot', 'L'];

function toSlug(value) {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

/** @type {import('./$types').PageServerLoad} */
export function load() {
	return { categories, units };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString().trim();
		const category = data.get('category')?.toString();
		const price = Number(data.get('price'));
		const description = data.get('description')?.toString().trim();
		const badge = data.get('badge')?.toString().trim() || null;
		const unit = data.get('unit')?.toString();
		const initialStock = Number(data.get('initialStock') || 0);
		const lowStockThreshold = Number(data.get('lowStockThreshold') || 5);

		if (!name || !category || !categories.includes(category) || !description || !Number.isFinite(price) || price <= 0) {
			return fail(400, { error: 'Veuillez renseigner les champs obligatoires.' });
		}

		if (!unit || !units.includes(unit) || !Number.isFinite(initialStock) || initialStock < 0) {
			return fail(400, { error: 'Veuillez vérifier les informations de stock.' });
		}

		const slug = toSlug(name);
		if (!slug) {
			return fail(400, { error: 'Impossible de générer un slug valide à partir du nom.' });
		}

		const createdProduct = await writeClient.create({
			_type: 'product',
			name,
			slug: { _type: 'slug', current: slug },
			category,
			badge,
			price,
			description,
			available: true
		});

		await writeClient.create({
			_type: 'stockEntry',
			product: { _type: 'reference', _ref: createdProduct._id },
			quantity: initialStock,
			unit,
			lowStockThreshold: Number.isFinite(lowStockThreshold) && lowStockThreshold >= 0 ? lowStockThreshold : 5,
			updatedAt: new Date().toISOString()
		});

		throw redirect(303, '/admin/harvest?created=1');
	}
};
