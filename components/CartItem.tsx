import React from "react";

export interface CartItemType {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
  quantity: number;
  temperature?: "hot" | "cold";
  customNotes?: string;
}

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (cartItemId: string, newQuantity: number) => void;
  onRemove: (cartItemId: string) => void;
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
    <div className="bg-white rounded-xl p-3.5 border border-amber-100 hover:shadow-md transition-all duration-200">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="w-16 md:w-20 h-16 md:h-20 bg-amber-50 rounded-lg overflow-hidden flex-shrink-0 border border-amber-100">
          {item.image_url === "☕" || !item.image_url ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-100 text-2xl">☕</div>
          ) : (
            <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-amber-900 text-sm md:text-base leading-tight">{item.product_name}</h4>
                
                {/* Temperature & Notes Labels */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.temperature && (
                    <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold ${
                      item.temperature === "hot" 
                        ? "bg-red-50 text-red-600 border border-red-100" 
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                      {item.temperature === "hot" ? "🔥 Panas" : "❄️ Dingin"}
                    </span>
                  )}
                  {item.customNotes && (
                    <span className="text-[10px] md:text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-100 italic line-clamp-1 max-w-[150px]">
                      💬 {item.customNotes}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {formatPrice(item.price)} x {item.quantity}
                </p>
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => onRemove(item.id)} 
                className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-1.5 transition-colors duration-150 flex-shrink-0 flex items-center justify-center" 
                aria-label="Hapus item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quantity Controls & Subtotal */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-amber-50/50">
            <div className="flex items-center border border-amber-300 rounded-lg bg-amber-50/50">
              <button 
                onClick={() => onQuantityChange(item.id, item.quantity - 1)} 
                disabled={item.quantity <= 1} 
                className="px-2.5 py-1 text-amber-800 font-bold hover:bg-amber-100 disabled:opacity-50 text-sm transition-colors"
              >
                −
              </button>
              <span className="px-2 py-1 text-xs font-bold text-amber-900 min-w-[20px] text-center">{item.quantity}</span>
              <button 
                onClick={() => onQuantityChange(item.id, item.quantity + 1)} 
                className="px-2.5 py-1 text-amber-800 font-bold hover:bg-amber-100 text-sm transition-colors"
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <p className="font-extrabold text-amber-800 text-sm md:text-base">{formatPrice(subtotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
