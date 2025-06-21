import { cn, pressable } from '@coinbase/onchainkit/theme';
import { useCallback, useState } from 'react';
import {
  GITHUB_LINK,
  ONCHAINKIT_LINK,
  TEMPLATE_LINK,
  TWITTER_LINK,
} from 'src/links';
import { ExternalLinkSvg } from 'src/svg/ExternalLinkSvg';
import { MenuSvg } from 'src/svg/MenuSvg';
import OnchainKitShopSvg from 'src/svg/OnchainKitShopSvg';
import type { NavbarLinkReact } from 'src/types';
import { useOnchainStoreContext } from './OnchainStoreProvider';
import { motion } from 'framer-motion';

function NavbarLink({ link, label }: NavbarLinkReact) {
  return (
    <li>
      <a
        href={link}
        className={cn(
          'flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100',
          'text-gray-800',
        )}
        target="_blank"
        rel="noreferrer"
      >
        {label}
        <ExternalLinkSvg className="ml-1 h-4 w-4 opacity-60" />
      </a>
    </li>
  );
}

function WishlistLink() {
  const { wishlist } = useOnchainStoreContext();
  
  return (
    <li>
      <button
        className={cn(
          'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100',
          'text-gray-800 relative',
        )}
        onClick={() => {
          // For now, we'll just scroll to the wishlist section
          // In a real app, this would navigate to a wishlist page
          document.getElementById('wishlist-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg
          className="h-4 w-4"
          fill={wishlist.length > 0 ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Wishlist
        {wishlist.length > 0 && (
          <span
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
          >
            {wishlist.length}
          </span>
        )}
      </button>
    </li>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white shadow-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <OnchainKitShopSvg />
          <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            Template
          </span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-4">
            <WishlistLink />
            <NavbarLink link={TEMPLATE_LINK} label="Fork Template" />
            <NavbarLink link={ONCHAINKIT_LINK} label="OnchainKit" />
            <NavbarLink link={TWITTER_LINK} label="X" />
          </ul>
        </nav>
        <button
          type="button"
          className={cn('md:hidden p-2 rounded-lg hover:bg-gray-100', pressable.default)}
          onClick={toggleMenu}
        >
          <MenuSvg />
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100 md:hidden overflow-hidden"
        >
          <ul className="flex flex-col items-start space-y-1 px-4 py-3">
            <WishlistLink />
            <NavbarLink link={TEMPLATE_LINK} label="Fork Template" />
            <NavbarLink link={ONCHAINKIT_LINK} label="OnchainKit" />
            <NavbarLink link={GITHUB_LINK} label="GitHub" />
            <NavbarLink link={TWITTER_LINK} label="X" />
          </ul>
        </motion.div>
      )}
    </header>
  );
}
