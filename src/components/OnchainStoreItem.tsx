import type { Product } from 'src/types';
import Image from 'next/image';
import QuantityInput from './QuantityInput';

export default function OnchainStoreItem({ id, name, price, image }: Product) {
  return (
    <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="mb-2 flex items-start justify-between">
        <h2 className="text-sm font-medium text-gray-800">{name}</h2>
      </div>
      <div className="flex grow items-center justify-center overflow-hidden rounded-md bg-gray-50 p-4 md:relative">
        <Image
          src={image}
          alt={name}
          className="object-contain max-h-64 w-auto"
          width={300}
          height={300}
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">
          {price.toFixed(2)} USDC
        </p>
        <QuantityInput productId={id} />
      </div>
    </div>
  );
}
