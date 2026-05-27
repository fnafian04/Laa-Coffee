"use client";

interface PaymentValidationModalProps {
  isOpen: boolean;
  orderId: string;
  customerName: string;
  paymentMethod: string;
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PaymentValidationModal({ isOpen, orderId, customerName, paymentMethod, totalAmount, onConfirm, onCancel, isLoading = false }: PaymentValidationModalProps) {
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
            <div className="flex justify-between">
              <span className="text-sm text-amber-700">Atas Nama:</span>
              <span className="font-bold text-amber-900">{customerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-amber-700">Metode Pembayaran:</span>
              <span className="font-bold text-amber-900 flex items-center gap-1">
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
              </span>
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
            onClick={onConfirm}
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
