// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: 'https://albin-mema.github.io',
  base: '/beach-bar-joni-golem/',
  integrations: [sentry(), spotlightjs(), compressor()],

  i18n: {
    locales: ['en', 'sq', 'it', 'pl', 'de', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  },

  // Performance optimizations
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
    // Enable compression and optimization
    format: 'directory'
  },

  // Development server configuration
  server: {
    headers: {
      // Less aggressive caching for development
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['albin-mema.github.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'albin-mema.github.io'
      }
    ]
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize build output
      cssCodeSplit: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: undefined,
          // Better asset naming with timestamp for cache busting
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      },
      // Enable source maps for debugging but keep them small
      sourcemap: false,
      // Optimize chunk size
      chunkSizeWarningLimit: 1000
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['lucide-astro'],
      exclude: ['@sentry/astro']
    }
  },

  // Prefetch settings for better performance
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport'
  },

  // Ensure proper GitHub Pages deployment
  trailingSlash: 'always'
});