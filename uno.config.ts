import { defineConfig, presetUno, presetAttributify, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // Essential preset with common utilities
    presetAttributify(), // Enables attributify mode
    presetTypography(), // Typography utilities
  ],
  // Custom CSS rules for complex styles that can't be easily expressed with utility classes
  rules: [
    // Instagram gradient background
    ['instagram-gradient', {
      'background': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
    }],
  ],

  // Custom shortcuts for commonly used combinations
  shortcuts: {
    // Gallery container - improved mobile padding
    'gallery-container': 'max-w-6xl w-full mx-auto px-3 sm:px-5',

    // Gallery grid - better mobile spacing
    'gallery-grid': 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:gap-8 sm:gap-5',

    // Image wrapper - smaller radius on mobile
    'image-wrapper': 'bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl',

    // Menu image
    'menu-image': 'w-full h-auto block',

    // Header styles - better mobile spacing
    'header': 'text-center mb-8 sm:mb-10',
    'logo': 'w-20 h-20 mx-auto mb-3 rounded-full object-cover shadow-lg sm:w-24 sm:h-24 sm:mb-4 md:w-32 md:h-32',
    'header-title': 'text-gray-800 text-3xl mb-2 font-light sm:text-4xl md:text-5xl',
    'header-subtitle': 'text-gray-600 text-base sm:text-lg',

    // Body styles - reduced mobile padding
    'page-body': 'font-sans bg-gray-100 min-h-screen p-3 sm:p-5',

    // Instagram section - better mobile spacing
    'instagram-section': 'mt-8 sm:mt-12 w-full',
    'instagram-container': 'bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden p-4 sm:p-6',
    'instagram-embed-wrapper': 'flex justify-center',

    // Map section - better mobile spacing
    'map-section': 'mt-8 sm:mt-12 w-full',
    'map-container': 'bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden',
    'map-title': 'text-xl sm:text-2xl font-light text-gray-800 mb-2',
    'map-address': 'text-gray-600 text-sm sm:text-base',
    'map-iframe': 'w-full h-64 sm:h-80 border-0',
  },

  // Theme configuration
  theme: {
    colors: {
      gray: {
        100: '#f5f5f5',
        600: '#666',
        800: '#333',
      }
    }
  }
})
