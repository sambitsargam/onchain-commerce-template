import { motion } from 'framer-motion';
import type { WishlistButtonReact } from 'src/types';

export default function WishlistButton({
  productId,
  isInWishlist,
  onToggle,
}: WishlistButtonReact) {
  return (
    <motion.button
      onClick={() => onToggle(productId)}
      className="absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-md"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <motion.svg
        className={`h-5 w-5 ${
          isInWishlist ? 'text-red-500' : 'text-gray-400'
        }`}
        fill={isInWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={false}
        animate={{
          scale: isInWishlist ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </motion.svg>
    </motion.button>
  );
} 