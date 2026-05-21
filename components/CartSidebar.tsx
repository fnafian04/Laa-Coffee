import React from "react";
import CartItem, { CartItemType } from "./CartItem";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, cartItems, onQuantityChange, onRemove, onCheckout }: CartSidebarProps) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />}

      {/* Sidebar - Desktop */}
      <div className={`hidden md:flex fixed right-0 top-0 h-screen w-96 bg-white shadow-2xl flex-col z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="bg-amber-800 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>🛒</span> Keranjang Belanja
          </h2>
          <button onClick={onClose} className="text-2xl hover:opacity-80 transition" aria-label="Tutup keranjang">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-4xl mb-3">🛒</span>
              <p className="text-gray-500 italic">Keranjang kosong, silakan tambah produk.</p>
            </div>
          ) : (
            cartItems.map((item) => <CartItem key={item.product_id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />)
          )}
        </div>

        {/* Footer with Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-amber-100 p-4 space-y-3 bg-amber-50">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-amber-900">Total:</span>
              <span className="text-xl font-bold text-amber-800">{formatPrice(totalPrice)}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
              <span>🛒</span> Pesan Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Mobile Bottom Sheet */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 transition-transform duration-300 max-h-[80vh] flex flex-col ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b border-amber-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2">
            <span>🛒</span> Keranjang
          </h2>
          <button onClick={onClose} className="text-2xl hover:opacity-70" aria-label="Tutup">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-3xl mb-2">🛒</span>
              <p className="text-gray-500 text-sm italic">Keranjang kosong</p>
            </div>
          ) : (
            cartItems.map((item) => <CartItem key={item.product_id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />)
          )}
        </div>

        {/* Footer with Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-amber-100 p-4 space-y-3 bg-amber-50 sticky bottom-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-900">Total:</span>
              <span className="text-lg font-bold text-amber-800">{formatPrice(totalPrice)}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
              <span>🛒</span> Pesan Sekarang
            </button>
          </div>
        )}
      </div>
    </>
  );
}
