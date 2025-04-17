import { useCallback, useMemo } from 'react';
import { useOnchainStoreContext } from './OnchainStoreProvider';
// import useCreateCharge from 'src/hooks/useCreateCharge';
// import {
//   Checkout,
//   CheckoutButton,
//   LifecycleStatus,
// } from '@coinbase/onchainkit/checkout';
import type { OnchainStoreCartReact } from 'src/types';
import OnchainStoreModal from './OnchainStoreModal';
import { MockCheckoutButton } from './MockCheckoutButton';

export default function OnchainStoreCart({
  setShowModal,
  showModal,
}: OnchainStoreCartReact) {
  const { quantities, products } = useOnchainStoreContext();

  const totalSum = useMemo(() => {
    return (
      products?.reduce(
        (sum, product) => sum + (quantities[product.id] || 0) * product.price,
        0,
      ) || 0
    );
  }, [products, quantities]);

  // const { createCharge } = useCreateCharge();
  // const handleStatusChange = useCallback((status: LifecycleStatus) => {
  //   console.log('onStatus', status);
  // }, []);
  // const chargeHandler = useCallback(() => {
  //   const description = Object.keys(quantities)
  //     .map((productId) => {
  //       return `${productId}(${quantities[productId]})`;
  //     })
  //     .join(',');
  //   const chargeDetails = {
  //     name: 'commerce template charge',
  //     description,
  //     pricing_type: 'fixed_price',
  //     local_price: {
  //       amount: totalSum.toString(),
  //       currency: 'USD',
  //     },
  //   };
  //   return createCharge(chargeDetails);
  // }, [createCharge, quantities, totalSum]);
  // const key = useMemo(() => {
  //   if (!quantities) return '';
  //   const productIds = Object.keys(quantities);
  //   const values = Object.values(quantities).flat();
  //   return `${productIds.join('.')}-${values.join('.')}`;
  // }, [quantities]);

  const closeModal = useCallback(() => {
    setShowModal?.(false);
  }, [setShowModal]);

  const openModal = useCallback(() => {
    setShowModal?.(true);
  }, [setShowModal]);

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[95%] -translate-x-1/2 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-md sm:px-6">
      {showModal && <OnchainStoreModal closeModal={closeModal} />}
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span className="hidden text-xs text-gray-500 md:block">
          Built with OnchainKit
        </span>
        <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
          <h2 className="text-base font-semibold text-gray-800">
            TOTAL {totalSum.toFixed(2)} USDC
          </h2>
          <div className="w-full sm:w-64">
            {/* <Checkout
              key={key}
              onStatus={handleStatusChange}
              chargeHandler={chargeHandler}
            >
              <CheckoutButton
                coinbaseBranded={true}
                text="Pay with Crypto"
                disabled={!totalSum}
              />
            </Checkout> */}
            <MockCheckoutButton onClick={openModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
