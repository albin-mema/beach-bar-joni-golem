// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://albin-mema.github.io',
  base: '/beach-bar-joni-golem/',
  integrations: [],

  vite: {
    plugins: [tailwindcss()],
  },
});