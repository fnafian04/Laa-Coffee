"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getOrdersByStatus } from "@/lib/database";

export default function Sidebar() {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States for real-time notifications
  const [previousOrders, setPreviousOrders] = useState<any[]>([]);
  const [activeNotification, setActiveNotification] = useState<{
    id: string;
    customerName: string;
    tableNumber: number;
    orderNumber: string;
  } | null>(null);

  const previousOrdersRef = useRef<any[]>([]);
  const isFirstLoadRef = useRef(true);

  // Keep refs in sync to avoid interval resets
  useEffect(() => {
    previousOrdersRef.current = previousOrders;
  }, [previousOrders]);

  // Audio alert chime using browser Web Audio API
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };
      
      const now = audioCtx.currentTime;
      playTone(587.33, now, 0.15); // D5
      playTone(880.00, now + 0.1, 0.3); // A5
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  // Poll pending orders count and check for new orders
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const data = await getOrdersByStatus("pending_verification");
        if (data) {
          setPendingCount(data.length);

          if (!isFirstLoadRef.current) {
            // Find orders that were not in our previous list
            const newOrders = data.filter(
              (newOrder: any) => !previousOrdersRef.current.some((prevOrder) => prevOrder.id === newOrder.id)
            );

            if (newOrders.length > 0) {
              const newest = newOrders[0];
              setActiveNotification({
                id: newest.id,
                customerName: newest.customer_name,
                tableNumber: newest.table_number,
                orderNumber: newest.order_number,
              });

              // Play notification alert chime
              playBeep();

              // Broadcast custom event so active validation screens reload instantly
              window.dispatchEvent(new CustomEvent("new-order-received", { detail: newest }));
            }
          } else {
            isFirstLoadRef.current = false;
          }

          setPreviousOrders(data);
        }
      } catch (error) {
        console.error("Error fetching pending count for sidebar:", error);
      }
    };

    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss toast notification after 8 seconds
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

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
    <>
      {/* Hamburger Button for Mobile - Highest Z-Index */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden fixed top-4 left-4 z-[60] bg-amber-900 text-white p-2.5 rounded-lg shadow-lg hover:bg-amber-800 transition-colors" title="Toggle menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-[55]" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gradient-to-b from-amber-900 via-amber-850 to-amber-900 text-amber-50 min-h-screen transition-all duration-300 fixed left-0 top-0 shadow-2xl z-[58] border-r border-amber-700 transform md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-amber-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl bg-amber-600/30 p-2.5 rounded-xl">☕</div>
            <div>
              <h1 className="font-bold text-lg text-white">Laa Coffee</h1>
              <p className="text-xs text-amber-200">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-amber-100 hover:text-white p-1" title="Tutup menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group ${
                  isActive ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/40" : "text-amber-100 hover:bg-amber-700/50 hover:text-white"
                }`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="font-medium flex-1 text-sm">{item.label}</span>
                {item.label === "Validasi Pembayaran" && pendingCount > 0 && <span className="bg-rose-500 text-white font-bold rounded-full animate-pulse flex items-center justify-center px-2 py-0.5 text-[10px]">{pendingCount}</span>}
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

      {/* Floating Toast Notification Banner */}
      {activeNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-[90%] sm:max-w-md bg-amber-950/95 text-white p-4 rounded-2xl shadow-2xl border border-amber-800 backdrop-blur-md flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl animate-bounce">🔔</span>
            <div className="min-w-0">
              <p className="font-black text-sm text-amber-200">Pesanan Baru Masuk!</p>
              <p className="text-xs text-amber-100 mt-0.5 font-bold truncate">
                {activeNotification.customerName} (Meja {activeNotification.tableNumber})
              </p>
              <p className="text-[10px] text-amber-400 font-semibold mt-0.5">
                {activeNotification.orderNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/admin/payments/validation"
              onClick={() => setActiveNotification(null)}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-md"
            >
              Lihat
            </Link>
            <button
              onClick={() => setActiveNotification(null)}
              className="text-gray-400 hover:text-white text-sm p-1"
              title="Tutup"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
