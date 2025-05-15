import Image from 'next/image';
import CommerceScreenImage from '../images/commerceScreen.png';
import type { OnchainStoreModalReact } from 'src/types';
import { GITHUB_LINK } from 'src/links';
import { CloseSvg } from 'src/svg/CloseSvg';
import { motion, AnimatePresence } from 'framer-motion';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
    y: -20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

export default function OnchainStoreModal({
  closeModal,
}: OnchainStoreModalReact) {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      >
        <motion.div 
          className="relative z-10 flex h-full xs:h-auto max-w-lg flex-col gap-2 xs:rounded-[10px] bg-[white] p-6 px-10"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            className="absolute top-2 right-4"
            onClick={closeModal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <CloseSvg />
          </motion.button>
          <motion.div 
            className="flex flex-col items-start gap-2 pt-4 pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="font-bold"
              whileHover={{ scale: 1.02 }}
            >
              Try it locally
            </motion.div>
            <motion.span 
              className="text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a href={GITHUB_LINK} className="ock-text-primary hover:underline">
                Fork the template and experience the end-to-end checkout flow.{' '}
              </a>
              Your users will see the below screen when the payment flow is
              active.
            </motion.span>
            <motion.div 
              className="mx-auto flex grow justify-center py-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={CommerceScreenImage}
                  alt="Commerce Screen Preview"
                  className="mx-auto h-[400px] w-auto rounded-[10px]"
                />
              </motion.div>
            </motion.div>
            <motion.div 
              className="ock-text-foreground-muted text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              These products are not for sale. We have disabled the end-to-end
              checkout flow on production.
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
