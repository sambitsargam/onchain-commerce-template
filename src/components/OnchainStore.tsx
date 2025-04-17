import { useState } from 'react';
import { Banner } from './Banner';
import Navbar from './Navbar';
import OnchainStoreCart from './OnchainStoreCart';
import OnchainStoreItems from './OnchainStoreItems';
import { OnchainStoreProvider } from './OnchainStoreProvider';
import OnchainStoreSummary from './OnchainStoreSummary';

export default function OnchainStore() {
  const [showModal, setShowModal] = useState(false);

  return (
    <OnchainStoreProvider>
      <div className="relative min-h-screen w-full bg-gray-50 font-sansMono">
        <Banner />
        <Navbar />
        <main className="mx-auto flex max-w-6xl flex-col px-4 pt-24 pb-16 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <OnchainStoreSummary />
            <OnchainStoreItems />
          </div>
          <OnchainStoreCart showModal={showModal} setShowModal={setShowModal} />
        </main>
      </div>
    </OnchainStoreProvider>
  );
}
