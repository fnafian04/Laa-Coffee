"use client";

import { useState, useEffect } from "react";
import OrderCard from "@/components/admin/OrderCard";
import PaymentValidationModal from "@/components/admin/PaymentValidationModal";
import { getOrdersByStatus, updatePaymentStatus, updateOrderStatus, updateOrderPaymentMethod } from "@/lib/database";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  orderTime: string;
  totalAmount: number;
  paymentMethod: string;
  minumanItems: OrderItem[];
  makananItems: OrderItem[];
}

// Mock data will be replaced by Supabase
const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-1501",
    customerName: "Nafi",
    orderTime: "15 Nov 2025, 09:15",
    totalAmount: 84000,
    paymentMethod: "QRIS",
    minumanItems: [{ name: "Cappuccino", price: 32000, quantity: 2 }],
    makananItems: [{ name: "Nasi Megono", price: 20000, quantity: 1 }],
  },
  {
    id: "2",
    orderId: "ORD-1502",
    customerName: "Budi",
    orderTime: "15 Nov 2025, 09:45",
    totalAmount: 110000,
    paymentMethod: "Transfer Bank",
    minumanItems: [
      { name: "Latte", price: 30000, quantity: 2 },
      { name: "Espresso", price: 25000, quantity: 1 },
    ],
    makananItems: [{ name: "Croissant", price: 25000, quantity: 2 }],
  },
  {
    id: "3",
    orderId: "ORD-1503",
    customerName: "Siti",
    orderTime: "15 Nov 2025, 10:15",
    totalAmount: 62000,
    paymentMethod: "Cash",
    minumanItems: [{ name: "Americano", price: 28000, quantity: 1 }],
    makananItems: [{ name: "Sandwich", price: 34000, quantity: 1 }],
  },
];

export default function PaymentValidationPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getOrdersByStatus("pending_verification");
      if (data) {
        setOrders(
          data.map((order: any) => ({
            id: order.id,
            orderId: order.order_number,
            customerName: order.customer_name,
            orderTime: new Date(order.created_at).toLocaleDateString("id-ID") + ", " + new Date(order.created_at).toLocaleTimeString("id-ID"),
            totalAmount: order.total_price,
            paymentMethod: order.payment_method,
            minumanItems:
              order.order_items
                ?.filter((item: any) => item.product?.category?.name === "Minuman")
                .map((item: any) => ({
                  name: item.product?.name || "",
                  price: item.price,
                  quantity: item.quantity,
                  temperature: item.temperature,
                  customNotes: item.custom_notes,
                })) || [],
            makananItems:
              order.order_items
                ?.filter((item: any) => item.product?.category?.name !== "Minuman")
                .map((item: any) => ({
                  name: item.product?.name || "",
                  price: item.price,
                  quantity: item.quantity,
                  temperature: item.temperature,
                  customNotes: item.custom_notes,
                })) || [],
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleConfirmValidation = async (updatedPaymentMethod: string) => {
    if (!selectedOrder) return;

    setIsProcessing(true);
    try {
      const promises = [
        updatePaymentStatus(selectedOrder.id, "paid"),
        updateOrderStatus(selectedOrder.id, "confirmed"),
      ];

      // If the payment method was updated by the cashier, save the change
      if (updatedPaymentMethod && updatedPaymentMethod !== selectedOrder.paymentMethod) {
        promises.push(updateOrderPaymentMethod(selectedOrder.id, updatedPaymentMethod));
      }

      await Promise.all(promises);

      // Remove order from list
      setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id));
      setIsModalOpen(false);
      setSelectedOrder(null);
      alert(`Pesanan ${selectedOrder.orderId} berhasil divalidasi dan diproses!`);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal memvalidasi pesanan");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelValidation = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin text-5xl mb-4">⏳</div>
          <p className="text-amber-700 font-semibold">Memuat pesanan menunggu validasi...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto p-2 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 border-b border-amber-200 pb-4 md:pb-5">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-amber-900 tracking-tight break-words">Validasi Pembayaran</h1>
          <p className="text-xs md:text-sm text-amber-700 mt-1">Validasi pembayaran pesanan masuk</p>
          <p className="text-[10px] md:text-xs font-semibold text-amber-600/80 mt-2 bg-amber-100/50 inline-block px-3 py-1 rounded-lg border border-amber-200 min-h-[28px]">{currentDateTime || "Memuat waktu..."}</p>
        </div>
      </div>

      {/* Pesanan Masuk Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-amber-900 flex items-center gap-2">📋 Menunggu Validasi</h2>
        </div>

        {/* Orders Grid */}
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                orderId={order.orderId}
                customerName={order.customerName}
                orderTime={order.orderTime}
                totalAmount={order.totalAmount}
                paymentMethod={order.paymentMethod}
                minumanItems={order.minumanItems}
                makananItems={order.makananItems}
                onValidate={() => handleValidateClick(order)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-16 text-center shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm border border-emerald-100">✓</div>
            <div>
              <p className="text-2xl font-black text-amber-900 mb-1">Semua Pesanan Tervalidasi</p>
              <p className="text-sm text-amber-700">Bagus! Tidak ada pesanan baru yang menunggu antrean validasi pembayaran.</p>
            </div>
          </div>
        )}
      </div>

      {/* Payment Validation Modal */}
      <PaymentValidationModal
        isOpen={isModalOpen}
        orderId={selectedOrder?.orderId || ""}
        customerName={selectedOrder?.customerName || ""}
        paymentMethod={selectedOrder?.paymentMethod || ""}
        totalAmount={selectedOrder?.totalAmount || 0}
        onConfirm={handleConfirmValidation}
        onCancel={handleCancelValidation}
        isLoading={isProcessing}
      />
    </div>
  );
}
