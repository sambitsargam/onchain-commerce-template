import { useCallback, useMemo } from 'react';
import type {
  Quantities,
  QuantityInputButtonReact,
  QuantityInputReact,
} from 'src/types';
import { useOnchainStoreContext } from './OnchainStoreProvider';
import PlusSvg from 'src/svg/PlusSvg';
import MinusSvg from 'src/svg/MinusSvg';
import { motion, AnimatePresence } from 'framer-motion';

function QuantityInputButton({
  onClick,
  svg,
  label,
}: QuantityInputButtonReact) {
  return (
    <motion.button
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 p-0"
      onClick={onClick}
      type="button"
      whileHover={{ scale: 1.05, borderColor: '#000' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="sr-only">{label}</span>
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: label.includes('Increase') ? 90 : -90 }}
        transition={{ duration: 0.2 }}
      >
        {svg}
      </motion.div>
    </motion.button>
  );
}

export default function QuantityInput({ productId }: QuantityInputReact) {
  const { quantities, setQuantities } = useOnchainStoreContext();

  const currentItemQuantity = useMemo(() => {
    return quantities[productId] || 0;
  }, [quantities, productId]);

  const handleIncrement = useCallback(() => {
    setQuantities((prev: Quantities) => {
      return { ...prev, [productId]: currentItemQuantity + 1 };
    });
  }, [currentItemQuantity, productId, setQuantities]);

  const handleDecrement = useCallback(() => {
    const newQuantity = Math.max(0, currentItemQuantity - 1);
    setQuantities((prev: Quantities) => {
      return { ...prev, [productId]: newQuantity };
    });
  }, [currentItemQuantity, productId, setQuantities]);

  return (
    <motion.div 
      className="flex items-center space-x-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <QuantityInputButton
        label="Decrease quantity"
        svg={<MinusSvg />}
        onClick={handleDecrement}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={currentItemQuantity}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-8 text-center font-medium text-sm"
        >
          {currentItemQuantity}
        </motion.span>
      </AnimatePresence>
      <QuantityInputButton
        label="Increase quantity"
        svg={<PlusSvg />}
        onClick={handleIncrement}
      />
    </motion.div>
  );
}
