import React from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  image_urls?: string[];
  is_available: boolean;
  category_id?: string;
  category_name?: string;
}

interface MenuCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function MenuCard({ product, onSelect }: MenuCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSelect = () => {
    if (product.is_available) {
      onSelect(product);
    }
  };

  return (
    <div 
      onClick={handleSelect}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col h-full border border-amber-100/70 ${
        product.is_available 
          ? "cursor-pointer transform hover:-translate-y-1" 
          : "opacity-85 cursor-not-allowed"
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full h-32 sm:h-40 md:h-48 bg-amber-50/50 overflow-hidden">
        {product.image_url === "☕" || !product.image_url ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-100 text-4xl">☕</div>
        ) : (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
          />
        )}
        {!product.is_available && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-white font-bold text-[10px] sm:text-xs bg-red-650 px-2.5 py-1 rounded-full shadow-md">
              Habis
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col p-3 sm:p-4">
        <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-amber-950 mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4 flex-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Footer Info & Add Button */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-amber-50">
          <p className="text-xs sm:text-sm md:text-base font-black text-amber-900">
            {formatPrice(product.price)}
          </p>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
            disabled={!product.is_available}
            className={`py-1 px-2.5 sm:py-1.5 sm:px-4 rounded-lg font-extrabold text-[10px] sm:text-xs md:text-sm transition-all active:scale-95 shadow-sm ${
              product.is_available 
                ? "bg-amber-800 hover:bg-amber-900 text-white cursor-pointer" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            + Beli
          </button>
        </div>
      </div>
    </div>
  );
}
