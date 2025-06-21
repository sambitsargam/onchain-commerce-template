import type { Product } from 'src/types';
import Image from 'next/image';
import QuantityInput from './QuantityInput';
import { motion } from 'framer-motion';
import { useOnchainStoreContext } from './OnchainStoreProvider';
import WishlistButton from './WishlistButton';

export default function OnchainStoreItem({ id, name, price, image, category, description, rating, reviewCount }: Product) {
  const { wishlist, addToWishlist, removeFromWishlist, addToRecentlyViewed } = useOnchainStoreContext();
  const isInWishlist = wishlist.includes(id);

  const handleProductClick = () => {
    addToRecentlyViewed(id);
  };

  const handleWishlistToggle = (productId: string) => {
    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="relative flex w-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
      onClick={handleProductClick}
    >
      <WishlistButton
        productId={id}
        isInWishlist={isInWishlist}
        onToggle={handleWishlistToggle}
      />
      
      <div className="mb-2 flex items-start justify-between">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-gray-800"
        >
          {name}
        </motion.h2>
      </div>

      {/* Category Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-2"
      >
        <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
          {category}
        </span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex grow items-center justify-center overflow-hidden rounded-md bg-gray-50 p-4 md:relative"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={image}
            alt={name}
            className="object-contain max-h-64 w-auto"
            width={300}
            height={300}
          />
        </motion.div>
      </motion.div>

      {/* Rating */}
      {rating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-2 flex items-center gap-1"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {rating} ({reviewCount} reviews)
          </span>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 flex items-center justify-between"
      >
        <motion.p 
          className="text-sm font-semibold text-gray-900"
          whileHover={{ scale: 1.05 }}
        >
          {price.toFixed(2)} USDC
        </motion.p>
        <QuantityInput productId={id} />
      </motion.div>
    </motion.div>
  );
}
