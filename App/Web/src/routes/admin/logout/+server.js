import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
	cookies.delete('admin_session', { path: '/' });
	throw redirect(303, '/admin/login');
}
