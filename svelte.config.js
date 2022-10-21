import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$root: './src/',
			$lib: './src/lib',
			$components: './src/components',
			$shared: './src/shared',
			$routes: './src/routes',
			$stores: './src/stores',
			$types: './src/types',
			$utils: './src/utils'
		}
	}
};

export default config;
