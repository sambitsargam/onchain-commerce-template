import { motion } from 'framer-motion';
import Image from 'next/image';
import { useOnchainStoreContext } from './OnchainStoreProvider';
import WishlistButton from './WishlistButton';

export default function RecentlyViewed() {
  const { products, recentlyViewed, wishlist, addToWishlist, removeFromWishlist } = useOnchainStoreContext();

  const recentlyViewedProducts = products?.filter(product => 
    recentlyViewed.includes(product.id)
  ).slice(0, 4) || [];

  if (recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-xl font-semibold text-gray-800"
      >
        Recently Viewed
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {recentlyViewedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
          >
            <WishlistButton
              productId={product.id}
              isInWishlist={wishlist.includes(product.id)}
              onToggle={(productId) => {
                if (wishlist.includes(productId)) {
                  removeFromWishlist(productId);
                } else {
                  addToWishlist(productId);
                }
              }}
            />
            <div className="mb-2 flex items-center justify-center overflow-hidden rounded-md bg-gray-50 p-2">
              <Image
                src={product.image}
                alt={product.name}
                className="h-16 w-16 object-contain"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-xs font-medium text-gray-800 truncate">
              {product.name}
            </h3>
            <p className="text-xs font-semibold text-gray-900">
              {product.price.toFixed(2)} USDC
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 