"use client";

interface OrderItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderCartProps {
  items: OrderItemType[];
  onRemove: (itemId: string) => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onCheckout: () => void;
}

export default function OrderCart({ items, onRemove, onQuantityChange, onCheckout }: OrderCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white border-2 border-amber-600 rounded-xl p-6 h-fit sticky top-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-200">
        <span className="text-3xl">🛒</span>
        <h2 className="text-lg font-bold text-amber-900">Keranjang</h2>
      </div>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-4xl mb-2 block">🛒</span>
            <p className="text-amber-700">Belum ada item</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between items-start gap-2 p-3 bg-amber-50 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-amber-900 text-sm">{item.name}</p>
                <p className="text-xs text-amber-700">Rp {item.price.toLocaleString("id-ID")}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))} className="w-6 h-6 bg-amber-200 hover:bg-amber-300 rounded text-amber-900 text-sm">
                  −
                </button>
                <span className="w-6 text-center font-semibold text-amber-900">{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="w-6 h-6 bg-amber-200 hover:bg-amber-300 rounded text-amber-900 text-sm">
                  +
                </button>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 text-lg font-bold">
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      {items.length > 0 && <div className="border-b-2 border-amber-200 mb-4" />}

      {/* Total */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-amber-900">Total:</span>
            <span className="text-2xl font-bold text-amber-900">Rp {total.toLocaleString("id-ID")}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 rounded-lg transition-all active:scale-95"
            >
              Checkout
            </button>
            <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-2 rounded-lg transition-colors">Lanjut Belanja</button>
          </div>
        </div>
      )}
    </div>
  );
}
