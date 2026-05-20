import adapterAuto from '@sveltejs/adapter-auto';
import adapterVercel from '@sveltejs/adapter-vercel';

const isVercelBuild = Boolean(process.env.VERCEL);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: isVercelBuild ? adapterVercel() : adapterAuto()
	}
};

export default config;
