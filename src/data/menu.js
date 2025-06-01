// Menu data for Beach Bar Joni
export const menuData = {
  "Kokteil": {
    title: "Kokteil",
    items: [
      {
        name: "Spritz",
        price: "600 L",
        description: "Aperol, Prosecco, soda water, fresh orange slice",
        image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?fm=jpg&q=80&w=600&h=400&fit=crop&ixlib=rb-4.0.3",
        featured: true
      },
      {
        name: "Mojito",
        price: "600 L",
        description: "White rum, fresh mint leaves, lime juice, sugar, soda water",
        image: "https://images.unsplash.com/photo-1633807187088-90f58cb2048b?fm=jpg&q=80&w=600&h=400&fit=crop&ixlib=rb-4.0.3",
        featured: true
      },
      {
        name: "Margarita",
        price: "600 L",
        description: "Premium tequila, fresh lime juice, triple sec, salt rim",
        image: "https://images.unsplash.com/photo-1517620430776-0ec904756579?fm=jpg&q=80&w=600&h=400&fit=crop&ixlib=rb-4.0.3",
        featured: true
      },
      {
        name: "Caipiroska",
        price: "600 L"
      },
      {
        name: "Sex On The Beach",
        price: "600 L"
      },

    ]
  },
  "Birra": {
    title: "Birra",
    items: [
      {
        name: "Heineken",
        price: "300 L"
      },
      {
        name: "Korona",
        price: "350 L"
      },
      {
        name: "Peroni",
        price: "200 L"
      },
      {
        name: "Scheffer",
        price: "350 L"
      },
      {
        name: "Peja",
        price: "200 L"
      },
      {
        name: "Korca",
        price: "200 L"
      },
      {
        name: "Paulaner",
        price: "350 L"
      },
      {
        name: "Bavaria",
        price: "250 L"
      }
    ]
  },
  "Freskuese": {
    title: "Freskuese",
    items: [
      {
        name: "Coca Cola",
        price: "200 L"
      },
      {
        name: "Fanta",
        price: "200 L"
      },
      {
        name: "Lemon Soda",
        price: "200 L"
      },
      {
        name: "Orange Soda",
        price: "200 L"
      },
      {
        name: "Lipton",
        price: "200 L"
      },
      {
        name: "Akullore (kupa)",
        price: "100 L"
      },
      {
        name: "Schweppes",
        price: "200 L"
      },
      {
        name: "Bravo",
        price: "200 L"
      },
      {
        name: "Nestea",
        price: "200 L"
      },
      {
        name: "Red Bull",
        price: "350 L"
      },
      {
        name: "B52",
        price: "200 L"
      },
      {
        name: "Grodino",
        price: "150 L"
      },
      {
        name: "Rosse Limonade",
        price: "350 L"
      },
      {
        name: "Uje Vitamine",
        price: "150 L"
      },
      {
        name: "Ivi",
        price: "200 L"
      }
    ]
  },
  "Alkoolike": {
    title: "Alkoolike",
    items: [
      {
        name: "Gin",
        price: "300 L"
      },
      {
        name: "Bombay",
        price: "350 L"
      },
      {
        name: "Hendricks",
        price: "600 L"
      },
      {
        name: "Martini",
        price: "250 L"
      },
      {
        name: "Jagermeister",
        price: "300 L"
      },
      {
        name: "Konjak Skenderbeu",
        price: "150 L"
      },
      {
        name: "Raki",
        price: "100 L"
      },
      {
        name: "Tekila",
        price: "250 L"
      },
      {
        name: "Bacardi",
        price: "300 L"
      },
      {
        name: "Jack Daniels",
        price: "300 L"
      },
      {
        name: "Chivas",
        price: "300 L"
      },
      {
        name: "Vodka",
        price: "250 L"
      },
      {
        name: "Amaro",
        price: "250 L"
      },
      {
        name: "Amaro Del Kapo",
        price: "300 L"
      }
    ]
  },
  "Te Ngrohta": {
    title: "Te Ngrohta",
    items: [
      {
        name: "Kafe",
        price: "100 L"
      },
      {
        name: "Uje",
        price: "100 L"
      },
      {
        name: "Makiato",
        price: "100 L"
      },
      {
        name: "Caj i Ngrohte",
        price: "90 L"
      },
      {
        name: "Kakao",
        price: "150 L"
      },
      {
        name: "Kapucino",
        price: "200 L"
      },
      {
        name: "Latte",
        price: "200 L"
      },
      {
        name: "Fredo",
        price: "200 L"
      },
      {
        name: "Makiato E Madhe",
        price: "150 L"
      },
      {
        name: "Kafe E Madhe",
        price: "150 L"
      },
      {
        name: "Frape",
        price: "200 L"
      },
      {
        name: "Kapucino E Ftohte",
        price: "200 L"
      },
      {
        name: "Kakao E Ftohte",
        price: "200 L"
      }
    ]
  }
};

// Helper function to get all menu categories
export const getMenuCategories = () => {
  return Object.keys(menuData);
};

// Helper function to get a specific category
export const getMenuCategory = (categoryKey) => {
  return menuData[categoryKey];
};

// Helper function to get all menu items as a flat array
export const getAllMenuItems = () => {
  return Object.values(menuData).flatMap(category =>
    category.items.map(item => ({
      ...item,
      category: category.title
    }))
  );
};

// Helper function to search menu items by name
export const searchMenuItems = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return getAllMenuItems().filter(item =>
    item.name.toLowerCase().includes(term)
  );
};

// Helper function to filter items by price range
export const getItemsByPriceRange = (minPrice, maxPrice) => {
  return getAllMenuItems().filter(item => {
    const price = parseFloat(item.price.replace(' L', ''));
    return price >= minPrice && price <= maxPrice;
  });
};

// Helper function to get coffee and hot drinks
export const getHotDrinks = () => {
  return menuData["Te Ngrohta"].items;
};

// Helper function to get alcoholic drinks
export const getAlcoholicDrinks = () => {
  return [...menuData["Birra"].items, ...menuData["Kokteil"].items, ...menuData["Alkoolike"].items];
};

// Helper function to get non-alcoholic drinks
export const getNonAlcoholicDrinks = () => {
  return [...menuData["Te Ngrohta"].items, ...menuData["Freskuese"].items];
};

// Helper function to get featured cocktails
export const getFeaturedCocktails = () => {
  return menuData["Kokteil"].items.filter(item => item.featured);
};

// Helper function to get featured/recommended items
export const getFeaturedItems = () => {
  // Return a curated selection of featured items
  return [
    menuData["Te Ngrohta"].items.find(item => item.name === "Kafe"),
    menuData["Kokteil"].items.find(item => item.name === "Mojito"),
    menuData["Birra"].items.find(item => item.name === "Heineken"),
    menuData["Alkoolike"].items.find(item => item.name === "Raki")
  ].filter(Boolean); // Remove any undefined items
};
