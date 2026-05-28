"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllOrders, getAllProducts } from "@/lib/database";

interface StatCard {
  title: string;
  value: number;
  icon: string;
  link: string;
  linkText: string;
  color: string;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  tableNumber: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  time: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [processingCount, setProcessingCount] = useState(0);
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
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [ordersData, productsData] = await Promise.all([getAllOrders(), getAllProducts()]);

      const pendingPaymentOrders = ordersData?.filter((o: any) => o.status === "pending_verification") || [];
      const processingOrders = ordersData?.filter((o: any) => o.status === "confirmed") || [];

      setPendingCount(pendingPaymentOrders.length);
      setProcessingCount(processingOrders.length);

      // Map Stats
      setStats([
        {
          title: "Total Menu",
          value: productsData?.length || 0,
          icon: "🍽️",
          link: "/admin/menu/manage",
          linkText: "Kelola Menu →",
          color: "from-emerald-500 to-teal-600 text-white shadow-emerald-100",
        },
        {
          title: "Total Pesanan",
          value: ordersData?.length || 0,
          icon: "📦",
          link: "/admin/orders",
          linkText: "Lihat Semua →",
          color: "from-amber-500 to-orange-600 text-white shadow-amber-100",
        },
        {
          title: "Menunggu Validasi",
          value: pendingPaymentOrders.length,
          icon: "⏱️",
          link: "/admin/payments/validation",
          linkText: "Validasi Sekarang →",
          color: "from-rose-500 to-red-600 text-white shadow-rose-100",
        },
        {
          title: "Sedang Diproses",
          value: processingOrders.length,
          icon: "🔄",
          link: "/admin/orders",
          linkText: "Lihat Dapur →",
          color: "from-blue-500 to-indigo-600 text-white shadow-blue-100",
        },
      ]);

      // Map 5 Recent Orders
      if (ordersData && ordersData.length > 0) {
        const sortedOrders = [...ordersData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

        setRecentOrders(
          sortedOrders.map((o: any) => ({
            id: o.id,
            orderNumber: o.order_number,
            customerName: o.customer_name,
            tableNumber: o.table_number,
            totalPrice: Number(o.total_price) || 0,
            status: o.status,
            paymentStatus: o.payment_status,
            time: new Date(o.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          })),
        );
      } else {
        setRecentOrders([]);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-bold">Selesai</span>;
      case "confirmed":
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-full font-bold">Diproses</span>;
      case "pending_verification":
        return <span className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-2.5 py-1 rounded-full font-bold">Menunggu Validasi</span>;
      case "cancelled":
        return <span className="bg-gray-50 text-gray-700 border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold">Batal</span>;
      default:
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-bold">Baru</span>;
    }
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50/50">
        <div className="text-center">
          <div className="inline-block animate-spin text-5xl mb-4">☕</div>
          <p className="text-amber-700 font-semibold">Memuat dashboard kasir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-1 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 border-b border-amber-200 pb-4 md:pb-5">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-amber-900 tracking-tight break-words">Haloo mama dan bapak 😁</h1>
          <p className="text-xs md:text-sm text-amber-700 mt-1">Kelola penjualan & pantau real-time</p>
          <p className="text-[10px] md:text-xs font-semibold text-amber-600/80 mt-2 bg-amber-100/50 inline-block px-3 py-1 rounded-lg border border-amber-200 min-h-[28px]">{currentDateTime || "Memuat waktu..."}</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="hidden md:inline-flex items-center justify-center px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm active:scale-95"
          title="Refresh data dashboard"
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group`}>
            {/* Absolute decorative bubble */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />

            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div>
                <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-wider">{stat.title}</p>
                <p className="text-2xl md:text-4xl font-black mt-1 md:mt-2 leading-none">{stat.value}</p>
              </div>
              <span className="text-2xl md:text-3xl p-1.5 md:p-2 bg-white/10 rounded-lg md:rounded-xl backdrop-blur-md">{stat.icon}</span>
            </div>
            <Link
              href={stat.link}
              className="inline-flex items-center justify-center mt-4 px-3.5 py-1.5 bg-white/20 hover:bg-white/30 border border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white transition-all active:scale-95 duration-200 shadow-sm"
            >
              {stat.linkText}
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1 Column: Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">⚡ Aksi Cepat</h2>
          <div className="flex flex-col gap-4">
            {/* Action 1: Buat Pesanan */}
            <Link href="/admin/orders/create" className="bg-white rounded-xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all hover:border-amber-400 group active:scale-[0.99] flex items-center gap-4">
              <span className="text-3xl p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">📝</span>
              <div>
                <h3 className="font-bold text-amber-900 text-base">Buat Pesanan</h3>
                <p className="text-xs text-amber-700">Buat pesanan baru untuk pelanggan di kasir</p>
              </div>
            </Link>

            {/* Action 2: Validasi Pembayaran */}
            <Link href="/admin/payments/validation" className="bg-white rounded-xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all hover:border-amber-400 group active:scale-[0.99] flex items-center gap-4">
              <span className="text-3xl p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">⏱️</span>
              <div>
                <h3 className="font-bold text-amber-900 text-base flex items-center gap-1.5">
                  <span>Validasi Pembayaran</span>
                  {pendingCount > 0 && <span className="bg-rose-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">{pendingCount}</span>}
                </h3>
                <p className="text-xs text-amber-700">{pendingCount > 0 ? `${pendingCount} pesanan menunggu validasi pembayaran` : "Tidak ada pembayaran pending"}</p>
              </div>
            </Link>

            {/* Action 3: Pesanan Pelanggan / Dapur */}
            <Link href="/admin/orders" className="bg-white rounded-xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all hover:border-amber-400 group active:scale-[0.99] flex items-center gap-4">
              <span className="text-3xl p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">📦</span>
              <div>
                <h3 className="font-bold text-amber-900 text-base flex items-center gap-1.5">
                  <span>Antrean Dapur</span>
                  {processingCount > 0 && <span className="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">{processingCount}</span>}
                </h3>
                <p className="text-xs text-amber-700">{processingCount > 0 ? `${processingCount} pesanan sedang diproses di dapur` : "Dapur sedang kosong"}</p>
              </div>
            </Link>

            {/* Action 4: Kelola Menu */}
            <Link href="/admin/menu/manage" className="bg-white rounded-xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all hover:border-amber-400 group active:scale-[0.99] flex items-center gap-4">
              <span className="text-3xl p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">🍽️</span>
              <div>
                <h3 className="font-bold text-amber-900 text-base">Kelola Menu</h3>
                <p className="text-xs text-amber-700">Tambah menu baru atau edit ketersediaan menu</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Right 2 Columns: Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">📋 Aktivitas Transaksi Terbaru</h2>
            <Link href="/admin/settlement" className="text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline">
              Lihat Settlement Lengkap →
            </Link>
          </div>

          <div className="bg-white rounded-2xl border-2 border-amber-200 p-6 shadow-sm overflow-hidden">
            {recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-amber-100 text-amber-900 text-left">
                      <th className="pb-3 font-bold">Pesanan</th>
                      <th className="pb-3 font-bold">Pelanggan</th>
                      <th className="pb-3 font-bold text-center">Meja</th>
                      <th className="pb-3 font-bold">Jam</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-3.5 font-bold text-amber-900">{order.orderNumber}</td>
                        <td className="py-3.5 font-semibold text-gray-700">{order.customerName}</td>
                        <td className="py-3.5 text-center text-gray-600 font-semibold">{order.tableNumber}</td>
                        <td className="py-3.5 text-gray-500">{order.time}</td>
                        <td className="py-3.5">{getStatusBadge(order.status)}</td>
                        <td className="py-3.5 text-right font-black text-amber-950">{formatPrice(order.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500 italic space-y-2">
                <span className="text-4xl block">📦</span>
                <p className="font-semibold text-amber-900">Belum Ada Transaksi Masuk</p>
                <p className="text-xs text-amber-700">Pesanan baru dari menu pelanggan akan muncul di sini secara otomatis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
