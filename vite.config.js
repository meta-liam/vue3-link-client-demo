// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   base: './',
//   build: {
//     outDir: 'dist',//Specify the output directory (relative to project root).
//   }
// });


import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		legacy({
			targets: ['ie>=11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		}),
	],
});
