import adapter from 'svelte-kit-sst';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess({
    script: {
      tsconfigFile: './tsconfig.json',
    },
  }),
  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
      '$lib/*': 'src/lib/*',
      'route/*': 'src/routes/*',
    },
    typescript: {
      config: {
        compilerOptions: {
          strict: true,
          noImplicitAny: true,
        },
      },
    },
  },
};

export default config;