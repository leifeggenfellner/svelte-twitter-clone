import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$shared: './src/shared',
			$lib: './src/lib',
			$routes: './src/routes',
			$stores: './src/stores',
			$root: './src/',
			$scripts: './src/scripts'
		}
	}
};

export default config;
