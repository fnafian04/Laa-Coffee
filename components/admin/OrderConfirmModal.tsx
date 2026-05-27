"use client";

interface OrderConfirmModalProps {
  isOpen: boolean;
  orderId: string;
  customerName: string;
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function OrderConfirmModal({
  isOpen,
  orderId,
  customerName,
  totalAmount,
  onConfirm,
  onCancel,
  isLoading = false,
}: OrderConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-animate {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full modal-animate border border-amber-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <h2 className="text-xl font-bold">Selesaikan Pesanan?</h2>
          </div>
          <p className="text-xs text-green-100">Pindahkan pesanan ke riwayat pesanan selesai</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-amber-900 font-semibold text-sm">
            Apakah Anda yakin ingin menandai pesanan berikut sebagai selesai?
          </p>
          
          <div className="bg-amber-50/50 border-2 border-amber-200 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-amber-700 font-medium">ID Pesanan:</span>
              <span className="font-bold text-amber-900">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700 font-medium">Nama Pelanggan:</span>
              <span className="font-bold text-amber-900">{customerName}</span>
            </div>
            <div className="border-t border-amber-200 pt-2 flex justify-between">
              <span className="text-amber-700 font-semibold">Total Nilai:</span>
              <span className="font-extrabold text-amber-900">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-xs text-blue-900 leading-relaxed">
            ℹ️ Tindakan ini akan mengonfirmasi ke pelanggan bahwa makanan/minuman telah disajikan secara lengkap.
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 flex gap-3 bg-gray-50/50">
          <button 
            onClick={onCancel} 
            disabled={isLoading} 
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-sm disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:scale-95 text-white font-semibold rounded-lg transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-1.5 text-sm"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Menyimpan...
              </>
            ) : (
              <>
                <span>✓</span>
                Ya, Selesai
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
