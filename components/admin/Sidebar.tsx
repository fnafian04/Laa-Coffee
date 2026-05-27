"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getOrdersByStatus } from "@/lib/database";

export default function Sidebar() {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const data = await getOrdersByStatus("pending_verification");
        if (data) {
          setPendingCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching pending count for sidebar:", error);
      }
    };

    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("laa_coffee_admin_auth");
    window.location.href = "/admin/login";
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: "📊",
    },
    {
      label: "Buat Pesanan",
      href: "/admin/orders/create",
      icon: "📝",
    },
    {
      label: "Validasi Pembayaran",
      href: "/admin/payments/validation",
      icon: "✓",
    },
    {
      label: "Pesanan Pelanggan",
      href: "/admin/orders",
      icon: "📦",
    },
    {
      label: "Settlement",
      href: "/admin/settlement",
      icon: "📊",
    },
    {
      label: "Kelola Menu",
      href: "/admin/menu/manage",
      icon: "🍽️",
    },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-amber-900 via-amber-850 to-amber-900 text-amber-50 min-h-screen transition-all duration-300 fixed left-0 top-0 shadow-2xl z-50 border-r border-amber-700">
      {/* Header */}
      <div className="p-5 border-b border-amber-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl bg-amber-600/30 p-2.5 rounded-xl">☕</div>
          <div>
            <h1 className="font-bold text-lg text-white">Laa Coffee</h1>
            <p className="text-xs text-amber-200">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-6 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group ${
                isActive ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/40" : "text-amber-100 hover:bg-amber-700/50 hover:text-white"
              }`}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="font-medium flex-1 text-sm">{item.label}</span>
              {item.label === "Validasi Pembayaran" && pendingCount > 0 && (
                <span className="bg-rose-500 text-white font-bold rounded-full animate-pulse flex items-center justify-center px-2 py-0.5 text-[10px]">{pendingCount}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute bottom-16 left-4 right-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 active:scale-95"
        title="Keluar Admin"
      >
        Keluar
      </button>
    </aside>
  );
}
