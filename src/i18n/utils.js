import { getRelativeLocaleUrl } from 'astro:i18n';

// Language configuration
export const languages = {
  en: 'English',
  sq: 'Shqip',
  it: 'Italiano', 
  pl: 'Polski',
  de: 'Deutsch'
};

export const defaultLang = 'en';

// Get current language from URL
export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang;
  return defaultLang;
}

// Load translation for a specific language
export async function getTranslations(lang) {
  try {
    const translations = await import(`./translations/${lang}.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}, falling back to ${defaultLang}`);
    const fallback = await import(`./translations/${defaultLang}.json`);
    return fallback.default;
  }
}

// Translation function factory
export function useTranslations(translations) {
  return function t(key) {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found`);
        return key;
      }
    }
    
    return value;
  };
}

// Get currency symbol based on language
export function getCurrency(lang) {
  return lang === 'sq' ? 'L' : '€';
}

// Convert price based on language and currency
export function formatPrice(price, lang) {
  const currency = getCurrency(lang);
  
  // Extract numeric value from price string (e.g., "600 L" -> 600)
  const numericPrice = parseInt(price.replace(/[^\d]/g, ''));
  
  if (lang === 'sq') {
    // Albanian uses Lek
    return `${numericPrice} ${currency}`;
  } else {
    // Convert Lek to Euro (approximate rate: 100 Lek = 1 Euro)
    const euroPrice = Math.round(numericPrice / 100);
    return `${euroPrice}${currency}`;
  }
}

// Generate localized URL using Astro's built-in i18n
export function getLocalizedUrl(path, lang) {
  return getRelativeLocaleUrl(lang, path);
}

// Get all available languages with their URLs for current path
export function getLanguageUrls(currentPath, currentLang) {
  const urls = {};
  
  for (const [lang, label] of Object.entries(languages)) {
    urls[lang] = {
      label,
      url: getLocalizedUrl(currentPath, lang),
      current: lang === currentLang
    };
  }
  
  return urls;
}
