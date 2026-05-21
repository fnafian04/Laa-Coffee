import React from "react";

export interface CartItemType {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const subtotal = item.price * item.quantity;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg p-3 md:p-4 border border-amber-100 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="w-16 md:w-20 h-16 md:h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">{item.product_name}</h4>
              <p className="text-xs md:text-sm text-gray-600">
                {formatPrice(item.price)} x {item.quantity}
              </p>
            </div>

            {/* Remove Button */}
            <button onClick={() => onRemove(item.product_id)} className="text-red-500 hover:text-red-700 text-lg hover:bg-red-50 rounded p-1 transition" aria-label="Hapus item">
              🗑️
            </button>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border border-amber-200 rounded bg-amber-50">
              <button onClick={() => onQuantityChange(item.product_id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-2 py-1 text-amber-700 hover:bg-amber-100 disabled:opacity-50 text-sm">
                −
              </button>
              <span className="px-3 py-1 text-sm font-semibold text-amber-900">{item.quantity}</span>
              <button onClick={() => onQuantityChange(item.product_id, item.quantity + 1)} className="px-2 py-1 text-amber-700 hover:bg-amber-100 text-sm">
                +
              </button>
            </div>

            {/* Subtotal */}
            <p className="font-bold text-amber-800 text-sm md:text-base">{formatPrice(subtotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
