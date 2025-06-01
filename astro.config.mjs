// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://albin-mema.github.io',
  base: '/beach-bar-joni-golem/',
  integrations: [],

  i18n: {
    locales: ['en', 'sq', 'it', 'pl', 'de'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },
});