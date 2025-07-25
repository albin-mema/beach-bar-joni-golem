import { getRelativeLocaleUrl } from 'astro:i18n';

// Language configuration
export const languages: Record<string, string> = {
  en: 'English',
  sq: 'Shqip',
  it: 'Italiano',
  pl: 'Polski',
  de: 'Deutsch',
  fr: 'Français'
};

export const defaultLang: string = 'sq';

// Browser language detection
export function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return defaultLang;

  // Get browser languages in order of preference
  const browserLanguages = navigator.languages || [navigator.language || defaultLang];

  // Check each browser language against our supported languages
  for (const browserLang of browserLanguages) {
    // Extract language code (e.g., 'en-US' -> 'en', 'sq-AL' -> 'sq')
    const langCode = browserLang.toLowerCase().split('-')[0];

    // Check if we support this language
    if (langCode in languages) {
      return langCode;
    }
  }

  // Fallback to default language
  return defaultLang;
}

// Get preferred language (browser detection + localStorage)
export function getPreferredLanguage(): string {
  if (typeof window === 'undefined') return defaultLang;

  // First check if user has manually selected a language before
  const storedLang = localStorage.getItem('preferred-language');
  if (storedLang && storedLang in languages) {
    return storedLang;
  }

  // Otherwise detect from browser
  return detectBrowserLanguage();
}

// Store user's language preference
export function setLanguagePreference(lang: string): void {
  if (typeof window !== 'undefined' && lang in languages) {
    localStorage.setItem('preferred-language', lang);
  }
}

// Get current language from URL
export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang;
  return defaultLang;
}

// Load translation for a specific language
export async function getTranslations(lang: string): Promise<TranslationStructure> {
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
export type TranslationStructure = {
  wifi: {
    title: string;
    connectTitle: string;
    networkName: string;
    password: string;
    copiedMessage: string;
    buttonLabel: string;
  };
};

export function useTranslations<T extends TranslationStructure>(translations: T): (key: keyof T) => string {
  return function t(key: keyof T): string {
    if (typeof key !== 'string') return '';
    const keyParts = key.split('.');
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
    
    return typeof value === 'string' ? value : JSON.stringify(value);
  };
}

// Get currency symbol - now always returns Lek
export function getCurrency(lang: string): string {
  return 'L';
}

// Format price - now always uses Lek currency for all languages
export function formatPrice(price: string, lang: string): string {
  const currency = getCurrency(lang);

  // Extract numeric value from price string (e.g., "600 L" -> 600)
  const numericPrice = parseInt(price.replace(/[^\d]/g, ''));

  // Always use Lek pricing for all languages
  return `${numericPrice} ${currency}`;
}

// Generate localized URL using Astro's built-in i18n
export function getLocalizedUrl(path: string, lang: string): string {
  return getRelativeLocaleUrl(lang, path);
}

// Get all available languages with their URLs for current path
export function getLanguageUrls(currentPath: string, currentLang: string): Record<string, any> {
  const urls: Record<string, any> = {};
  
  for (const [lang, label] of Object.entries(languages)) {
    urls[lang] = {
      label,
      url: getLocalizedUrl(currentPath, lang),
      current: lang === currentLang
    };
  }
  
  return urls;
}
