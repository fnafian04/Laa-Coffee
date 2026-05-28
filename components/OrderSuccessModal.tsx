"use client";

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderNumber: string;
  customerName: string;
  tableNumber: string;
  totalPrice: number;
  cartItems: Array<{
    id: string;
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    temperature?: "hot" | "cold";
    customNotes?: string;
  }>;
  onClose: () => void;
}

export default function OrderSuccessModal({ isOpen, orderNumber, customerName, tableNumber, totalPrice, cartItems, onClose }: OrderSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes checkmarkBounce {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .checkmark-animate {
          animation: checkmarkBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      `}</style>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header - Success */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center checkmark-animate">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">Pesanan Berhasil!</h2>
          <p className="text-green-50 text-sm leading-relaxed">Pesananmu berhasil masuk ke sistem. Silahkan menuju ke kasir agar pesanan segera diproses</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Info Box */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-amber-200">
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">📋 Nomor Order</p>
              <p className="text-lg font-bold text-amber-900">{orderNumber}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs text-amber-700 font-semibold">👤 Nama</p>
                <p className="text-sm font-semibold text-amber-900">{customerName}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-amber-700 font-semibold">🪑 Meja</p>
                <p className="text-sm font-semibold text-amber-900">Meja {tableNumber}</p>
              </div>
              <div className="flex justify-between pt-2 border-t border-amber-200">
                <p className="text-xs text-amber-700 font-semibold">💰 Total</p>
                <p className="text-lg font-bold text-amber-900">Rp {totalPrice.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>

          {/* Detail Pesanan */}
          <div>
            <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">📦 Detail Pesanan</h3>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <div>
                      <span className="text-amber-900 font-bold">{item.product_name}</span>
                      <span className="text-amber-600 ml-2">× {item.quantity}</span>
                    </div>
                    <span className="font-semibold text-amber-900">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                  </div>
                  {/* Customization Details */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.temperature && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${item.temperature === "hot" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{item.temperature === "hot" ? "🔥 Panas" : "❄️ Dingin"}</span>
                    )}
                    {item.customNotes && <span className="text-[10px] bg-white text-gray-600 px-1.5 py-0.5 rounded border border-amber-100 italic">Catatan: {item.customNotes}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <p className="text-xs text-blue-900 font-semibold mb-1">ℹ️ Catatan Penting:</p>
            <p className="text-xs text-blue-800">Tunjukkan nomor order ini kepada kasir untuk memproses pesananmu</p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
}
