"use client";

import { useState } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: Array<{
    id: string;
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    temperature?: "hot" | "cold";
    customNotes?: string;
  }>;
  totalPrice: number;
  onSubmit: (formData: { customerName: string; phoneNumber: string; tableNumber: string; paymentMethod: string }) => void;
  onCancel: () => void;
}

export default function CheckoutModal({ isOpen, cartItems, totalPrice, onSubmit, onCancel }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    tableNumber: "1",
    paymentMethod: "Cash",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.phoneNumber.trim() || !formData.tableNumber.trim()) {
      alert("Silakan isi semua data");
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 sticky top-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🛒</span>
            <h2 className="text-2xl font-bold">Checkout</h2>
          </div>
          <p className="text-amber-100">Periska kembali pesanan sebelum dikirim</p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">👤 Data Pelanggan</h3>

            {/* Nama Pelanggan */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">Nama Pelanggan</label>
              <input
                type="text"
                placeholder="Nama Anda"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-300"
              />
            </div>

            {/* No HP */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">No HP</label>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-300"
              />
            </div>

            {/* Nomor Meja */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">Nomor Meja</label>
              <select
                value={formData.tableNumber}
                onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    Meja {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">Metode Pembayaran</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 bg-white"
              >
                <option value="Cash">💵 Cash</option>
                <option value="QRIS">🔳 QRIS</option>
                <option value="Transfer">🏦 Transfer</option>
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b-2 border-amber-200" />

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">📋 Ringkasan Pesanan</h3>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-amber-900">
                      {item.product_name}
                      <span className="text-xs text-amber-700 ml-1">× {item.quantity}</span>
                    </span>
                    <span className="font-semibold text-amber-900">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                  </div>
                  {item.temperature && (
                    <p className="text-xs text-amber-700">
                      {item.temperature === "hot" ? "🔥 Panas" : "❄️ Dingin"}
                    </p>
                  )}
                  {item.customNotes && (
                    <p className="text-xs text-gray-600 italic">💬 {item.customNotes}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t-2 border-amber-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-900">Total:</span>
                <span className="text-2xl font-bold text-amber-900">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onCancel} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg transition-all active:scale-95">
              Pesan Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
