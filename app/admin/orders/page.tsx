"use client";

import { useState, useEffect } from "react";
import ProcessingOrderItem from "@/components/admin/ProcessingOrderItem";
import CompletedOrderItem from "@/components/admin/CompletedOrderItem";
import OrderConfirmModal from "@/components/admin/OrderConfirmModal";
import { getOrdersByStatus, updateOrderStatus } from "@/lib/database";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  orderTime: string;
  totalAmount: number;
  items?: any[];
}

// Will be fetched from Supabase
const mockProcessingOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-1501",
    customerName: "Nafi",
    orderTime: "15 Nov 2025, 09:15",
    totalAmount: 84000,
  },
  {
    id: "2",
    orderId: "ORD-1504",
    customerName: "Eva",
    orderTime: "15 Nov 2025, 10:45",
    totalAmount: 68000,
  },
  {
    id: "3",
    orderId: "ORD-1505",
    customerName: "Nafi",
    orderTime: "15 Nov 2025, 11:15",
    totalAmount: 85000,
  },
];

const mockCompletedOrders: Order[] = [
  {
    id: "4",
    orderId: "ORD-1506",
    customerName: "Eva",
    orderTime: "15 Nov 2025, 11:45",
    totalAmount: 77000,
  },
];

export default function CustomerOrdersPage() {
  const [processingOrders, setProcessingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [selectedConfirmOrder, setSelectedConfirmOrder] = useState<Order | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentDateTime(`${dateStr} • ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const [processingData, completedData] = await Promise.all([getOrdersByStatus("confirmed"), getOrdersByStatus("completed")]);

      if (processingData) {
        setProcessingOrders(
          processingData.map((order: any) => ({
            id: order.id,
            orderId: order.order_number,
            customerName: order.customer_name,
            orderTime: new Date(order.created_at).toLocaleDateString("id-ID") + ", " + new Date(order.created_at).toLocaleTimeString("id-ID"),
            totalAmount: order.total_price,
            items: order.order_items || [],
          })),
        );
      }

      if (completedData) {
        setCompletedOrders(
          completedData.map((order: any) => ({
            id: order.id,
            orderId: order.order_number,
            customerName: order.customer_name,
            orderTime: new Date(order.created_at).toLocaleDateString("id-ID") + ", " + new Date(order.created_at).toLocaleTimeString("id-ID"),
            totalAmount: order.total_price,
            items: order.order_items || [],
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteClick = (order: Order) => {
    setSelectedConfirmOrder(order);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmComplete = async () => {
    if (!selectedConfirmOrder) return;
    setIsCompleting(true);
    try {
      await updateOrderStatus(selectedConfirmOrder.id, "completed");
      setProcessingOrders((prev) => prev.filter((o) => o.id !== selectedConfirmOrder.id));
      setCompletedOrders((prev) => {
        // Avoid adding duplicates if already present
        if (prev.some((o) => o.id === selectedConfirmOrder.id)) return prev;
        return [selectedConfirmOrder, ...prev];
      });
      setIsConfirmModalOpen(false);
      setSelectedConfirmOrder(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyelesaikan pesanan");
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin text-5xl mb-4">📦</div>
          <p className="text-amber-700 font-semibold">Memuat pesanan pelanggan...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto p-2 md:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4 md:pb-5">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-amber-900 tracking-tight break-words">Pesanan Pelanggan</h1>
          <p className="text-xs md:text-sm text-amber-700 mt-1">Pantau pesanan aktif di dapur</p>
          <p className="text-[10px] md:text-xs font-semibold text-amber-600/80 mt-2 bg-amber-100/50 inline-block px-3 py-1 rounded-lg border border-amber-200 min-h-[28px]">{currentDateTime || "Memuat waktu..."}</p>
        </div>
        <button
          onClick={fetchOrders}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm active:scale-95 w-full sm:w-auto"
          title="Refresh pesanan"
        >
          🔄 Refresh Antrean
        </button>
      </div>

      {/* Grid of Queues */}
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {/* Sedang Diproses Section */}
        <div className="bg-white rounded-lg md:rounded-2xl border-2 border-amber-200 p-4 md:p-6 shadow-sm space-y-4 md:space-y-6">
          <div className="flex items-center justify-between flex-row gap-2">
            <h2 className="text-lg md:text-xl font-bold text-amber-900 flex items-center gap-2">🔄 Diproses</h2>
            {processingOrders.length > 0 && (
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs shadow-md shadow-orange-100 animate-pulse">{processingOrders.length} Pesanan Aktif</span>
            )}
          </div>

          {processingOrders.length > 0 ? (
            <div className="space-y-4">
              {processingOrders.map((order, index) => (
                <ProcessingOrderItem
                  key={order.id}
                  orderId={order.orderId}
                  customerName={order.customerName}
                  orderTime={order.orderTime}
                  totalAmount={order.totalAmount}
                  index={index + 1}
                  items={order.items}
                  onComplete={() => handleCompleteClick(order)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 italic space-y-2">
              <span className="text-4xl block">🍳</span>
              <p className="font-semibold text-amber-900">Dapur Sedang Kosong</p>
              <p className="text-xs text-amber-700">Tidak ada pesanan baru yang sedang diproses di dapur.</p>
            </div>
          )}
        </div>

        {/* Riwayat Pesanan Selesai Section */}
        <div className="bg-white rounded-lg md:rounded-2xl border-2 border-amber-200 p-4 md:p-6 shadow-sm space-y-4 md:space-y-6">
          <div className="flex items-center justify-between flex-row gap-2">
            <h2 className="text-lg md:text-xl font-bold text-amber-900 flex items-center gap-2">✓ Selesai</h2>
            {completedOrders.length > 0 && <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs shadow-md shadow-emerald-100">{completedOrders.length} Pesanan Selesai</span>}
          </div>

          {completedOrders.length > 0 ? (
            <div className="space-y-4">
              {completedOrders.map((order, index) => (
                <CompletedOrderItem key={order.id} orderId={order.orderId} customerName={order.customerName} orderTime={order.orderTime} totalAmount={order.totalAmount} index={index + 1} items={order.items} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 italic space-y-2">
              <span className="text-4xl block">📋</span>
              <p className="font-semibold text-amber-900">Belum Ada Pesanan Selesai</p>
              <p className="text-xs text-amber-700">Selesaikan pesanan aktif di dapur untuk memindahkannya ke sini.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Completion Confirmation Modal */}
      <OrderConfirmModal
        isOpen={isConfirmModalOpen}
        orderId={selectedConfirmOrder?.orderId || ""}
        customerName={selectedConfirmOrder?.customerName || ""}
        totalAmount={selectedConfirmOrder?.totalAmount || 0}
        onConfirm={handleConfirmComplete}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setSelectedConfirmOrder(null);
        }}
        isLoading={isCompleting}
      />
    </div>
  );
}
