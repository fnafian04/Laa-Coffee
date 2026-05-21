import React, { useState } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
}

interface MenuCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function MenuCard({ product, onAddToCart }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity setelah ditambahkan
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative w-full h-40 md:h-48 bg-gray-200 overflow-hidden">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
        {!product.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Tidak Tersedia</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col p-3 md:p-4">
        <h3 className="text-base md:text-lg font-bold text-amber-900 mb-1">{product.name}</h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 flex-1 line-clamp-2">{product.description}</p>
        <p className="text-sm md:text-base font-bold text-amber-800 mb-3">{formatPrice(product.price)}</p>

        {/* Quantity & Add Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-amber-300 rounded-lg bg-amber-50">
            <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1} className="px-2 py-1 text-amber-800 hover:bg-amber-100 disabled:opacity-50">
              −
            </button>
            <input type="number" value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} className="w-10 text-center bg-transparent text-amber-900 font-semibold focus:outline-none" min="1" />
            <button onClick={() => handleQuantityChange(quantity + 1)} className="px-2 py-1 text-amber-800 hover:bg-amber-100">
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.is_available}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-white text-sm md:text-base transition-all ${product.is_available ? "bg-amber-700 hover:bg-amber-800 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
          >
            <span className="mr-1">+</span> Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
