import type { Product } from 'src/types';
import Image from 'next/image';
import QuantityInput from './QuantityInput';
import { motion } from 'framer-motion';

export default function OnchainStoreItem({ id, name, price, image }: Product) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
    >
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
