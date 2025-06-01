import { formatPrice } from '../i18n/utils.js';

// Base menu data with Albanian prices (in Lek) and translation keys
const baseMenuData = {
  "Kokteil": {
    title: "Kokteil",
    items: [
      {
        key: "spritz",
        price: "600 L",
        image: `${import.meta.env.BASE_URL}cocktails/spritz.jpg`,
        featured: true
      },
      {
        key: "mojito",
        price: "600 L",
        image: `${import.meta.env.BASE_URL}cocktails/mojito.jpg`,
        featured: true
      },
      {
        key: "caipiroska",
        price: "600 L",
        image: `${import.meta.env.BASE_URL}cocktails/caipiroska.jpg`,
        featured: true
      },
      {
        key: "sexOnTheBeach",
        price: "600 L",
        image: `${import.meta.env.BASE_URL}cocktails/sex-on-the-beach.jpg`,
        featured: true
      },
      {
        key: "margarita",
        price: "600 L",
        image: `${import.meta.env.BASE_URL}cocktails/margarita.jpg`,
        featured: true
      },

    ]
  },
  "Te Ngrohta": {
    title: "Te Ngrohta",
    items: [
      {
        key: "espresso",
        price: "100 L"
      },
      {
        key: "cappuccino",
        price: "150 L"
      },
      {
        key: "macchiato",
        price: "150 L"
      },
      {
        key: "americano",
        price: "120 L"
      },
      {
        key: "latte",
        price: "180 L"
      },
      {
        key: "hotChocolate",
        price: "200 L"
      },
      {
        key: "tea",
        price: "100 L"
      }
    ]
  },
  "Birra": {
    title: "Birra",
    items: [
      {
        key: "birraKorca",
        price: "300 L"
      },
      {
        key: "birraTirana",
        price: "300 L"
      },
      {
        key: "heineken",
        price: "350 L"
      },
      {
        key: "corona",
        price: "400 L"
      },
      {
        key: "stellaArtois",
        price: "400 L"
      }
    ]
  },
  "Freskuese": {
    title: "Freskuese",
    items: [
      {
        key: "cocaCola",
        price: "200 L"
      },
      {
        key: "fanta",
        price: "200 L"
      },
      {
        key: "sprite",
        price: "200 L"
      },
      {
        key: "water",
        price: "100 L"
      },
      {
        key: "freshOrangeJuice",
        price: "300 L"
      },
      {
        key: "lemonade",
        price: "250 L"
      }
    ]
  },
  "Alkoolike": {
    title: "Alkoolike",
    items: [
      {
        key: "raki",
        price: "300 L"
      },
      {
        key: "vodka",
        price: "400 L"
      },
      {
        key: "whiskey",
        price: "500 L"
      },
      {
        key: "gin",
        price: "450 L"
      },
      {
        key: "rum",
        price: "450 L"
      },
      {
        key: "tequila",
        price: "500 L"
      },
      {
        key: "brandy",
        price: "400 L"
      }
    ]
  }
};

// Get localized menu data with proper pricing and translations
export function getLocalizedMenuData(lang, translations) {
  const localizedMenu = {};

  for (const [categoryKey, category] of Object.entries(baseMenuData)) {
    const translatedTitle = translations.menu?.categories?.[categoryKey.toLowerCase()] || category.title;

    localizedMenu[categoryKey] = {
      title: translatedTitle,
      items: category.items.map(item => {
        const translatedItem = translations.menu?.items?.[item.key] || {};
        return {
          ...item,
          name: translatedItem.name || item.key,
          description: translatedItem.description || '',
          price: formatPrice(item.price, lang)
        };
      })
    };
  }

  return localizedMenu;
}
