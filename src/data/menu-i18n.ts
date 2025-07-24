import { formatPrice } from '../i18n/utils.ts';
import menuData from './menu-data.json';
import type { MenuData, Translations, MenuItem } from '../types/menu';

// Get localized menu data with proper pricing and translations
export function getLocalizedMenuData(lang: string, translations: Translations): MenuData {
  const localizedMenu: MenuData = {};

  // Category key mapping to match translation files
  const categoryKeyMap: Record<string, string> = {
    "Te Ngrohta": "teNgrohta",
    "Birra": "birra",
    "Kokteil": "kokteil",
    "Freskuese": "freskuese",
    "Alkoolike": "alkoolike"
  };

  for (const [categoryKey, category] of Object.entries(menuData as unknown as MenuData)) {
    const translationKey = categoryKeyMap[categoryKey] || categoryKey.toLowerCase();
    const translatedTitle = translations.menu?.categories?.[translationKey] || category.title;

    localizedMenu[categoryKey] = {
      title: translatedTitle,
      items: category.items.map(item => {
        const translatedItem = translations.menu?.items?.[item.key] || {};
        
        // Type-safe item construction
        const processedItem: MenuItem = {
          ...item,
          name: translatedItem.name || item.key,
          description: translatedItem.description || '',
          price: formatPrice(item.price, lang)
        };

        // Add BASE_URL to image path for proper resolution
        if (item.image) {
          processedItem.image = item.image;
        }

        return processedItem;
      }).filter(isMenuItem)
    };
  }

  return localizedMenu;
}

// Type guard for MenuItem validation
function isMenuItem(item: any): item is MenuItem {
  return typeof item.key === 'string' &&
         typeof item.price === 'string' &&
         typeof item.name === 'string';
}
