"use client";

import React, { useState, useEffect } from "react";
import { Product } from "./MenuCard";

interface ProductCustomizerModalProps {
  isOpen: boolean;
  product: (Product & { category_name?: string }) | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, temperature: string, customNotes: string) => void;
}

export default function ProductCustomizerModal({
  isOpen,
  product,
  onClose,
  onAddToCart,
}: ProductCustomizerModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<"hot" | "cold">("cold");
  const [customNotes, setCustomNotes] = useState("");

  // Reset states when modal is opened for a different product
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setTemperature("cold");
      setCustomNotes("");
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  // Check if product is a beverage (Minuman)
  const isBeverage =
    product.category_name?.toLowerCase().includes("minuman") ||
    product.description?.toLowerCase().includes("kopi") ||
    product.description?.toLowerCase().includes("teh") ||
    product.name?.toLowerCase().includes("espresso") ||
    product.name?.toLowerCase().includes("cappuccino") ||
    product.name?.toLowerCase().includes("latte") ||
    product.name?.toLowerCase().includes("americano");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (val: number) => {
    if (val >= 1) {
      setQuantity(val);
    }
  };

  const handleConfirm = () => {
    onAddToCart(
      product,
      quantity,
      isBeverage ? temperature : "",
      customNotes.trim()
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-amber-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Product Image Panel */}
        <div className="relative w-full h-48 bg-amber-50 flex-shrink-0">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-all font-semibold active:scale-90"
            aria-label="Tutup kustomisasi"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Header Info */}
          <div>
            <div className="flex justify-between items-start gap-2 mb-2">
              <h2 className="text-xl font-bold text-amber-900 leading-tight">
                {product.name}
              </h2>
              <span className="text-lg font-bold text-amber-800 flex-shrink-0">
                {formatPrice(product.price)}
              </span>
            </div>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>

          {/* Temperature Option (Only for Beverages) */}
          {isBeverage && (
            <div className="space-y-3">
              <h3 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                <span>🌡️</span> Pilihan Suhu
              </h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setTemperature("hot")}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all active:scale-95 ${
                    temperature === "hot"
                      ? "border-red-500 bg-red-50 text-red-700 shadow-sm scale-[1.02]"
                      : "border-amber-200 text-amber-900 bg-amber-50/50 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-lg">🔥</span> Panas
                </button>
                <button
                  type="button"
                  onClick={() => setTemperature("cold")}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all active:scale-95 ${
                    temperature === "cold"
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm scale-[1.02]"
                      : "border-amber-200 text-amber-900 bg-amber-50/50 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-lg">❄️</span> Dingin
                </button>
              </div>
            </div>
          )}

          {/* Special Requests (Notes) */}
          <div className="space-y-2">
            <label
              htmlFor="customNotes"
              className="font-bold text-amber-900 text-sm flex items-center gap-1.5"
            >
              <span>💬</span> Catatan Tambahan untuk Kasir
            </label>
            <textarea
              id="customNotes"
              rows={2}
              maxLength={150}
              placeholder="Contoh: esnya dikit, gulanya dikit, pedas manis, dll."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full border-2 border-amber-200 rounded-xl p-3 focus:outline-none focus:border-amber-600 text-sm text-amber-900 placeholder-amber-300 resize-none h-20 transition-colors"
            />
            <div className="text-right text-xs text-amber-600">
              {customNotes.length}/150 karakter
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
            <span className="font-bold text-amber-900 text-sm">Pilih Jumlah</span>
            <div className="flex items-center border-2 border-amber-300 rounded-xl bg-white overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-1.5 text-amber-800 font-bold hover:bg-amber-50 disabled:opacity-40 transition-colors text-lg"
              >
                −
              </button>
              <span className="w-12 text-center text-amber-900 font-bold text-base">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1.5 text-amber-800 font-bold hover:bg-amber-50 transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="sticky bottom-0 bg-white border-t border-amber-100 p-4 flex-shrink-0">
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-between"
          >
            <span>📥 Tambah ke Keranjang</span>
            <span className="bg-amber-900/40 px-3 py-1 rounded-lg text-sm font-semibold">
              {formatPrice(product.price * quantity)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
