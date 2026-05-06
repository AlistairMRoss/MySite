import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],

    define: {
        __BUILD_ID__: JSON.stringify(Date.now().toString())
    },

    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
});
