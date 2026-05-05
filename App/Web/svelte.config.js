import adapter from '@sveltejs/adapter-vercel';
import adapterAuto from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: process.env.VERCEL ? adapter() : adapterAuto()
	}
};

export default config;
