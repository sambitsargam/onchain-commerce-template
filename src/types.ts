import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type NavbarLinkReact = {
  link: string;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string | StaticImageData;
  category: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
};

export type Review = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
};

export type Quantities = Record<string, number>;

export type QuantityInputReact = {
  productId: string;
};

export type OnchainStoreContextType = {
  quantities: Quantities;
  setQuantities: (
    quantities: Quantities | ((prev: Quantities) => Quantities),
  ) => void;
  products?: Product[];
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
};

export type QuantityInputButtonReact = {
  onClick: () => void;
  svg: ReactNode;
  label: string;
};

export type OnchainStoreCartReact = {
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
};

export type OnchainStoreModalReact = {
  closeModal: () => void;
};

export type MockCheckoutButtonReact = {
  onClick: () => void;
};

export type SearchFilterReact = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
};

export type WishlistButtonReact = {
  productId: string;
  isInWishlist: boolean;
  onToggle: (productId: string) => void;
};

export type ProductCardReact = {
  product: Product;
  isInWishlist: boolean;
  onWishlistToggle: (productId: string) => void;
  onProductClick: (productId: string) => void;
};
