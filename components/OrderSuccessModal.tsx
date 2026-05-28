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
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold uppercase tracking-wide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>Nomor Order</span>
              </div>
              <p className="text-lg font-bold text-amber-900">{orderNumber}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span>Nama</span>
                </div>
                <p className="text-sm font-semibold text-amber-900">{customerName}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.59 0l6.97-6.97a1.125 1.125 0 000-1.59l-9.581-9.58A2.25 2.25 0 009.569 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                  <span>Meja</span>
                </div>
                <p className="text-sm font-semibold text-amber-900">Meja {tableNumber}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5M4.5 19.5h15M12 6.75a3 3 0 110 6 3 3 0 010-6z" />
                  </svg>
                  <span>Total</span>
                </div>
                <p className="text-lg font-bold text-amber-900">Rp {totalPrice.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>

          {/* Detail Pesanan */}
          <div>
            <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-amber-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              <span>Detail Pesanan</span>
            </h3>

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
            <div className="flex items-center gap-1.5 text-xs text-blue-900 font-semibold mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-blue-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083.985l-.379 1.161-.011.035m-.756-1.163l.756 1.163M12 2.25c4.717 0 8.522 3.805 8.522 8.522s-3.805 8.522-8.522 8.522a8.52 8.52 0 01-8.522-8.522c0-4.717 3.805-8.522 8.522-8.522z" />
              </svg>
              <span>Catatan Penting:</span>
            </div>
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
