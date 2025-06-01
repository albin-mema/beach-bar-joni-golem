import { formatPrice } from '../i18n/utils.js';
import menuData from './menu-data.json';

// Get localized menu data with proper pricing and translations
export function getLocalizedMenuData(lang, translations) {
  const localizedMenu = {};

  // Category key mapping to match translation files
  const categoryKeyMap = {
    "Te Ngrohta": "teNgrohta",
    "Birra": "birra",
    "Kokteil": "kokteil",
    "Freskuese": "freskuese",
    "Alkoolike": "alkoolike"
  };

  for (const [categoryKey, category] of Object.entries(menuData)) {
    const translationKey = categoryKeyMap[categoryKey] || categoryKey.toLowerCase();
    const translatedTitle = translations.menu?.categories?.[translationKey] || category.title;

    localizedMenu[categoryKey] = {
      title: translatedTitle,
      items: category.items.map(item => {
        const translatedItem = translations.menu?.items?.[item.key] || {};

        // Handle image paths with BASE_URL
        const processedItem = {
          ...item,
          name: translatedItem.name || item.key,
          description: translatedItem.description || '',
          price: formatPrice(item.price, lang)
        };

        // Add BASE_URL to image path if it exists
        if (item.image) {
          processedItem.image = `${import.meta.env.BASE_URL}${item.image}`;
        }

        return processedItem;
      })
    };
  }

  return localizedMenu;
}
