import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			precompress: false,
			fallback: 'app.html'
		}),
		alias: {
			'@shared-types': '../shared-types/src',
			'@shared-types/*': '../shared-types/src/*'
    	}
	}
};

export default config;