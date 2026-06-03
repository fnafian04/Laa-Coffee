"use client";

import { useState, useEffect } from "react";

interface PaymentValidationModalProps {
  isOpen: boolean;
  orderId: string;
  customerName: string;
  paymentMethod: string;
  totalAmount: number;
  onConfirm: (updatedPaymentMethod: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PaymentValidationModal({ 
  isOpen, 
  orderId, 
  customerName, 
  paymentMethod, 
  totalAmount, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}: PaymentValidationModalProps) {
  const [localPaymentMethod, setLocalPaymentMethod] = useState(paymentMethod);

  useEffect(() => {
    if (isOpen) {
      setLocalPaymentMethod(paymentMethod);
    }
  }, [isOpen, paymentMethod]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Validasi Pembayaran</h2>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <p className="text-gray-700">
            Konfirmasi pembayaran pesanan <span className="font-bold text-amber-900">{orderId}</span>
          </p>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-amber-700">Atas Nama:</span>
              <span className="font-bold text-amber-900">{customerName}</span>
            </div>
            
            <div className="border-t border-amber-200/60 pt-2 flex flex-col gap-1.5">
              <label htmlFor="modal-payment-method" className="text-sm text-amber-700 font-semibold">Metode Pembayaran:</label>
              <select
                id="modal-payment-method"
                value={localPaymentMethod}
                onChange={(e) => setLocalPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border-2 border-amber-200 rounded-lg text-amber-900 bg-white font-bold focus:outline-none focus:border-amber-600 transition-colors cursor-pointer text-sm"
              >
                <option value="Cash">💵 Cash</option>
                <option value="QRIS">🔳 QRIS</option>
                <option value="Transfer">🏦 Transfer</option>
              </select>
            </div>
            <div className="border-t border-amber-200 pt-2 flex justify-between">
              <span className="text-sm font-semibold text-amber-700">Total:</span>
              <span className="font-bold text-amber-900">Rp {totalAmount.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-sm text-blue-900">ℹ️ Setelah divalidasi, pesanan akan langsung diproses.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={isLoading} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
            Batal
          </button>
          <button
            onClick={() => onConfirm(localPaymentMethod)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Ya, Validasi & Proses"}
          </button>
        </div>
      </div>
    </div>
  );
}
