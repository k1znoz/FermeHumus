import { redirect, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const password = data.get('password');
		const adminPassword = env.ADMIN_PASSWORD;

		if (!adminPassword) {
			return fail(500, {
				error: 'ADMIN_PASSWORD n\'est pas configure dans le fichier .env.'
			});
		}

		if (password !== adminPassword) {
			return fail(401, { error: 'Mot de passe incorrect.' });
		}

		cookies.set('admin_session', 'authenticated', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: url.protocol === 'https:',
			maxAge: 60 * 60 * 8 // 8 heures
		});

		throw redirect(303, '/admin');
	}
};
