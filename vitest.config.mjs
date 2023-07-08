import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: { alias: [{ find: '#lib', replacement: resolve('lib') }] },
	esbuild: {
		target: 'es2022',
	},
});
