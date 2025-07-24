// Menu item interface
export interface MenuItem {
  key: string;
  price: string;
  name: string;
  description?: string;
  image?: string;
  featured?: boolean;
}

// Menu category interface
export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

// Menu data structure
export interface MenuData {
  [categoryKey: string]: MenuCategory;
}

// Gallery image interface
export interface GalleryImage {
  src: string;
  alt: string;
}

// Translation structure
export interface Translations {
  [key: string]: any;
  menu?: {
    categories?: {
      [key: string]: string;
    };
    items?: {
      [key: string]: {
        name?: string;
        description?: string;
      };
    };
  };
}
