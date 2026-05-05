import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const isAdminRoute = event.url.pathname.startsWith('/admin');
	const isLoginRoute = event.url.pathname === '/admin/login';

	if (isAdminRoute && !isLoginRoute) {
		const session = event.cookies.get('admin_session');
		if (!session || session !== 'authenticated') {
			throw redirect(303, '/admin/login');
		}
	}

	return resolve(event);
}
