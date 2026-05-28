"use client";

import { useState } from "react";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  temperature?: "hot" | "cold";
  customNotes?: string;
}

interface OrderCardProps {
  orderId: string;
  customerName: string;
  orderTime: string;
  totalAmount: number;
  paymentMethod: string;
  minumanItems: OrderItem[];
  makananItems: OrderItem[];
  onValidate: () => void;
}

export default function OrderCard({ orderId, customerName, orderTime, totalAmount, paymentMethod, minumanItems, makananItems, onValidate }: OrderCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl border-2 border-amber-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-amber-700 font-semibold">ID Pesanan</p>
            <h3 className="text-xl font-bold text-amber-900">{orderId}</h3>
          </div>
        </div>

        <div className="space-y-2 bg-amber-50 rounded-lg p-3">
          <div>
            <p className="text-xs text-amber-700">Atas Nama:</p>
            <p className="text-sm font-bold text-amber-900">{customerName}</p>
          </div>
          <div>
            <p className="text-xs text-amber-700">Metode Pembayaran:</p>
            <div className="text-sm font-bold text-amber-900 mt-0.5">
              {paymentMethod?.toLowerCase() === "qris" ? (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-950 px-2 py-0.5 rounded border border-amber-300 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-amber-900">
                    <rect width="5" height="5" x="3" y="3" rx="1"/>
                    <rect width="5" height="5" x="16" y="3" rx="1"/>
                    <rect width="5" height="5" x="3" y="16" rx="1"/>
                    <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                    <path d="M21 21v.01"/>
                    <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                    <path d="M3 12h.01"/>
                    <path d="M12 3h.01"/>
                    <path d="M12 16v.01"/>
                    <path d="M16 12h1"/>
                    <path d="M21 12v.01"/>
                    <path d="M12 21v-1"/>
                  </svg>
                  <span>QRIS</span>
                </span>
              ) : paymentMethod?.toLowerCase() === "cash" || paymentMethod?.toLowerCase() === "tunai" ? (
                <span>💵 Cash</span>
              ) : (
                <span>🏦 Transfer</span>
              )}
            </div>
          </div>
          <div className="text-xs text-amber-600">{orderTime}</div>
        </div>
      </div>

      {/* Items Display */}
      <div className="space-y-3 mb-4">
        {/* Minuman */}
        {minumanItems.length > 0 && (
          <div className="border-2 border-amber-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-amber-900 flex items-center gap-2">☕ Minuman</h4>
              <span className="bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded">{minumanItems.length} item</span>
            </div>
            <div className="space-y-2">
              {minumanItems.map((item, idx) => (
                <div key={idx} className="border-b border-amber-50 last:border-0 pb-1.5 last:pb-0">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-amber-900 flex items-center gap-1.5 flex-wrap">
                      <span>{item.name}</span>
                      {item.temperature && (
                        <span className={`text-[9px] px-1 py-0.5 rounded font-bold ${
                          item.temperature === "hot" ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          {item.temperature === "hot" ? "PANAS" : "DINGIN"}
                        </span>
                      )}
                    </span>
                    <span className="text-amber-700 font-semibold">
                      {item.quantity}x Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                  {item.customNotes && (
                    <p className="text-[10px] text-gray-500 italic mt-1 ml-1 bg-amber-50/50 p-1 rounded border border-amber-100/50">
                      💬 Catatan: {item.customNotes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Makanan */}
        {makananItems.length > 0 && (
          <div className="border-2 border-amber-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-amber-900 flex items-center gap-2">🍜 Makanan</h4>
              <span className="bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded">{makananItems.length} item</span>
            </div>
            <div className="space-y-2">
              {makananItems.map((item, idx) => (
                <div key={idx} className="border-b border-amber-50 last:border-0 pb-1.5 last:pb-0">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-amber-900">{item.name}</span>
                    <span className="text-amber-700 font-semibold">
                      {item.quantity}x Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                  {item.customNotes && (
                    <p className="text-[10px] text-gray-500 italic mt-1 ml-1 bg-amber-50/50 p-1 rounded border border-amber-100/50">
                      💬 Catatan: {item.customNotes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-b-2 border-amber-100 mb-3" />

      {/* Total */}
      <div className="bg-amber-50 rounded-lg p-3 mb-4 flex justify-between items-center">
        <span className="font-bold text-amber-900">💳 Total:</span>
        <span className="text-lg font-bold text-amber-900">Rp {totalAmount.toLocaleString("id-ID")}</span>
      </div>

      {/* Action Button */}
      <button
        onClick={onValidate}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
      >
        ✓ Validasi & Proses
      </button>
    </div>
  );
}
