import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { OnchainStoreContextType } from '../types';
import jacketImage from '../images/jacket.png';
import airpodsImage from '../images/airpods.png';
import mugImage from '../images/mug.png';
import bottleImage from '../images/bottle.png';
import type { Product } from 'src/types';

const emptyContext = {} as OnchainStoreContextType;

const OnchainStoreContext =
  createContext<OnchainStoreContextType>(emptyContext);

type OnchainStoreProviderReact = {
  children: ReactNode;
};

const products: Product[] = [
  { 
    id: 'product1', 
    name: `'BUILDER' JACKET`, 
    price: 0.04, 
    image: jacketImage,
    category: 'Clothing',
    description: 'Premium builder jacket for the modern developer',
    rating: 4.5,
    reviewCount: 12,
    inStock: true
  },
  {
    id: 'product2',
    name: `'DND, I'M BUILDING' AIRPODS`,
    price: 0.01,
    image: airpodsImage,
    category: 'Electronics',
    description: 'High-quality airpods for focused coding sessions',
    rating: 4.8,
    reviewCount: 8,
    inStock: true
  },
  {
    id: 'product3',
    name: `'CAFFEINATED TO BUILD' MUG`,
    price: 0.02,
    image: mugImage,
    category: 'Accessories',
    description: 'Perfect mug for your daily caffeine fix',
    rating: 4.2,
    reviewCount: 15,
    inStock: true
  },
  {
    id: 'product4',
    name: `'HYDRATED TO BUILD' BOTTLE`,
    price: 0.01,
    image: bottleImage,
    category: 'Accessories',
    description: 'Stay hydrated while building amazing things',
    rating: 4.6,
    reviewCount: 10,
    inStock: true
  },
];

export function OnchainStoreProvider({ children }: OnchainStoreProviderReact) {
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const addToWishlist = (productId: string) => {
    setWishlist(prev => [...prev, productId]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const value = useMemo(() => {
    return {
      quantities,
      setQuantities,
      products,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      recentlyViewed,
      addToRecentlyViewed,
    };
  }, [quantities, wishlist, searchQuery, selectedCategory, recentlyViewed]);

  return (
    <OnchainStoreContext.Provider value={value}>
      {children}
    </OnchainStoreContext.Provider>
  );
}

export function useOnchainStoreContext() {
  return useContext(OnchainStoreContext);
}
