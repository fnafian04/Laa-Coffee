"use client";

interface ProcessingOrderItemProps {
  orderId: string;
  customerName: string;
  orderTime: string;
  totalAmount: number;
  index: number;
  items?: Array<{
    id: string;
    quantity: number;
    price: number;
    temperature?: "hot" | "cold";
    custom_notes?: string;
    product?: {
      name: string;
    };
  }>;
  onComplete: () => void;
}

export default function ProcessingOrderItem({ orderId, customerName, orderTime, totalAmount, index, items, onComplete }: ProcessingOrderItemProps) {
  return (
    <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow gap-4">
      {/* Left - Order Info */}
      <div className="flex items-start gap-4 flex-1">
        {/* Number Badge */}
        <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">{index}</div>

        {/* Order Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-amber-900">{orderId}</h3>
            <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">🔄 Diproses</span>
          </div>
          <p className="text-sm text-amber-700 font-semibold mb-2">
            {customerName} • {orderTime}
          </p>

          {/* Nested Order Items List */}
          {items && items.length > 0 && (
            <div className="mt-2 space-y-1.5 border-t border-dashed border-amber-200 pt-2 max-w-lg">
              {items.map((item) => (
                <div key={item.id} className="text-xs text-amber-900 bg-amber-50/50 p-1.5 rounded flex flex-col gap-0.5 border border-amber-100/50">
                  <div className="flex justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <span>{item.product?.name}</span>
                      {item.temperature && (
                        <span className={`text-[8px] px-1 py-0.5 rounded font-extrabold ${
                          item.temperature === "hot" ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          {item.temperature === "hot" ? "HOT" : "COLD"}
                        </span>
                      )}
                    </span>
                    <span className="text-amber-800 font-extrabold">x{item.quantity}</span>
                  </div>
                  {item.custom_notes && (
                    <p className="text-[10px] text-gray-500 italic mt-0.5 border-l-2 border-amber-300 pl-1">
                      💬 Catatan: {item.custom_notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right - Amount & Button */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <span className="text-lg font-extrabold text-amber-900">Rp {totalAmount.toLocaleString("id-ID")}</span>
        <button onClick={onComplete} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors active:scale-95 text-sm shadow-sm">
          ✓ Selesaikan Pesanan
        </button>
      </div>
    </div>
  );
}
