import React from "react";

interface HeaderProps {
  tableNumber?: number;
  cartCount?: number;
  onCartClick?: () => void;
  onAdminClick?: () => void;
}

export default function Header({ tableNumber = 0, cartCount = 0, onCartClick, onAdminClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-800 to-amber-900 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl md:text-3xl">☕</div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold">Laa Coffee</h1>
            {tableNumber > 0 && <p className="text-xs md:text-sm text-amber-100">Meja {tableNumber}</p>}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={onAdminClick} className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-amber-700 rounded-lg transition" aria-label="Admin">
            <span className="text-lg">🏠</span>
            <span className="text-sm">Admin</span>
          </button>

          {/* Cart Button */}
          <button onClick={onCartClick} className="relative p-2 md:p-3 hover:bg-amber-700 rounded-lg transition" aria-label="Keranjang belanja">
            <span className="text-xl md:text-2xl">🛒</span>
            {cartCount > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
