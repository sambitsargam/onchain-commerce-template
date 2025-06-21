import OnchainStoreItem from './OnchainStoreItem';
import { useOnchainStoreContext } from './OnchainStoreProvider';
import SearchFilter from './SearchFilter';
import RecentlyViewed from './RecentlyViewed';
import { useMemo } from 'react';

export default function OnchainStoreItems() {
  const { products, searchQuery, selectedCategory } = useOnchainStoreContext();

  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="grow">
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={useOnchainStoreContext().setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={useOnchainStoreContext().setSelectedCategory}
        categories={categories}
      />
      
      <RecentlyViewed />
      
      <div className="mb-16 md:mb-0">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              className="h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid h-full grid-cols-1 grid-rows-2 sm:grid-cols-2">
            {filteredProducts.map((item) => (
              <OnchainStoreItem {...item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
