/// <reference types="astro/client" />

// Declare Astro component modules
declare module "*.astro" {
  const Component: any;
  export default Component;
}

// Declare TypeScript modules
declare module "../types/menu" {
  export interface MenuItem {
    key: string;
    name: string;
    price: string;
    description?: string;
    image?: string;
    featured?: boolean;
  }

  export interface MenuCategory {
    title: string;
    items: MenuItem[];
  }

  export interface MenuData {
    [categoryKey: string]: MenuCategory;
  }

  export interface GalleryImage {
    src: string;
    alt: string;
  }

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
}
