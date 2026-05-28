"use client";

interface CompletedOrderItemProps {
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
}

export default function CompletedOrderItem({ orderId, customerName, orderTime, totalAmount, index, items }: CompletedOrderItemProps) {
  return (
    <div className="bg-white border-l-4 border-green-500 rounded-lg p-4 flex flex-col md:flex-row md:items-start md:justify-between hover:shadow-md transition-shadow gap-4">
      {/* Left - Order Info */}
      <div className="flex items-start gap-3 md:gap-4 flex-1">
        {/* Number Badge */}
        <div className="bg-green-500 text-white rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm md:text-base flex-shrink-0 mt-0.5">{index}</div>

        {/* Order Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-amber-900 text-sm md:text-base">{orderId}</h3>
              <span className="bg-green-100 text-green-700 text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full">✓ Selesai</span>
            </div>
            {/* Total amount (only visible on mobile here, hidden on md) */}
            <span className="text-base font-black text-amber-900 md:hidden">Rp {totalAmount.toLocaleString("id-ID")}</span>
          </div>
          <p className="text-xs md:text-sm text-amber-700 font-semibold mb-2 flex flex-wrap gap-1 items-center">
            <span className="text-amber-900 font-bold">{customerName}</span>
            <span className="text-amber-400">•</span>
            <span className="text-amber-600">{orderTime}</span>
          </p>

          {/* Nested Order Items List */}
          {items && items.length > 0 && (
            <div className="mt-2 space-y-1.5 border-t border-dashed border-amber-200 pt-2 max-w-lg">
              {items.map((item) => (
                <div key={item.id} className="text-xs text-amber-900 bg-amber-50/50 p-2 rounded flex flex-col gap-0.5 border border-amber-100/50">
                  <div className="flex justify-between items-start gap-2 font-bold">
                    <span className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                      <span className="break-words">{item.product?.name}</span>
                      {item.temperature && (
                        <span className={`text-[8px] px-1 py-0.5 rounded font-extrabold flex-shrink-0 ${
                          item.temperature === "hot" ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          {item.temperature === "hot" ? "HOT" : "COLD"}
                        </span>
                      )}
                    </span>
                    <span className="text-amber-800 font-extrabold flex-shrink-0">x{item.quantity}</span>
                  </div>
                  {item.custom_notes && (
                    <p className="text-[10px] text-gray-500 italic mt-0.5 border-l-2 border-amber-300 pl-1">
                      Catatan: {item.custom_notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right - Amount (hidden on mobile header, shown here on desktop) */}
      <div className="hidden md:flex flex-col items-end flex-shrink-0">
        <span className="text-xs text-amber-600 font-semibold">Total Tagihan</span>
        <span className="text-lg font-black text-amber-900">Rp {totalAmount.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
}
