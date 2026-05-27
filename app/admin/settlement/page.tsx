"use client";

import { useState, useEffect } from "react";
import { getAllOrders } from "@/lib/database";

interface DailyReport {
  date: string;
  totalOrders: number;
  totalRevenue: number; // Only paid orders
  pendingRevenue: number; // Unpaid orders
  paidOrdersCount: number;
  unpaidOrdersCount: number;
  completedOrdersCount: number;
  cashRevenue: number;
  qrisRevenue: number;
  transferRevenue: number;
  setoranCash: number; // Multiple of 50k
}

interface ReportItem {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  status: "paid" | "unpaid";
  completionStatus: "completed" | "processing" | "pending_verification" | "cancelled";
  paymentMethod: string;
  time: string;
  date: string;
  tableNumber: number;
}

// Custom vector-perfect SVG QR Code Icon
function QrCodeIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-4 h-4 text-amber-900 inline-block align-middle flex-shrink-0" 
      style={{ minWidth: "16px" }}
    >
      <rect width="5" height="5" x="3" y="3" rx="1"/>
      <rect width="5" height="5" x="16" y="3" rx="1"/>
      <rect width="5" height="5" x="3" y="16" rx="1"/>
      <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
      <path d="M21 21v.01"/>
      <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
      <path d="M3 12h.01"/>
      <path d="M12 3h.01"/>
      <path d="M12 16v.01"/>
      <path d="M16 12h1"/>
      <path d="M21 12v.01"/>
      <path d="M12 21v-1"/>
    </svg>
  );
}

export default function SettlementPage() {
  const [report, setReport] = useState<DailyReport>({
    date: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
    totalOrders: 0,
    totalRevenue: 0,
    pendingRevenue: 0,
    paidOrdersCount: 0,
    unpaidOrdersCount: 0,
    completedOrdersCount: 0,
    cashRevenue: 0,
    qrisRevenue: 0,
    transferRevenue: 0,
    setoranCash: 0,
  });
  const [reportItems, setReportItems] = useState<ReportItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"all" | "paid" | "unpaid">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettlementData();
  }, []);

  const fetchSettlementData = async () => {
    try {
      setIsLoading(true);
      const ordersData = await getAllOrders();

      if (ordersData && ordersData.length > 0) {
        // Filter orders
        const paidOrders = ordersData.filter((o: any) => o.payment_status === "paid");
        const unpaidOrders = ordersData.filter((o: any) => o.payment_status === "unpaid" || o.payment_status === "pending_verification");
        const completedOrders = ordersData.filter((o: any) => o.status === "completed");

        // Calculate revenues
        const totalRevenue = paidOrders.reduce((sum: number, o: any) => sum + (Number(o.total_price) || 0), 0);
        const pendingRevenue = unpaidOrders.reduce((sum: number, o: any) => sum + (Number(o.total_price) || 0), 0);

        // Payment method breakdown for PAID orders only
        const cashRevenue = paidOrders
          .filter((o: any) => o.payment_method?.toLowerCase() === "cash" || o.payment_method?.toLowerCase() === "tunai")
          .reduce((sum: number, o: any) => sum + (Number(o.total_price) || 0), 0);
        
        const qrisRevenue = paidOrders
          .filter((o: any) => o.payment_method?.toLowerCase() === "qris")
          .reduce((sum: number, o: any) => sum + (Number(o.total_price) || 0), 0);

        const transferRevenue = paidOrders
          .filter((o: any) => o.payment_method?.toLowerCase().includes("transfer") || o.payment_method?.toLowerCase().includes("bank"))
          .reduce((sum: number, o: any) => sum + (Number(o.total_price) || 0), 0);

        // Setoran cash is strictly in multiples of Rp 50.000 or Rp 100.000
        const setoranCash = Math.floor(cashRevenue / 50000) * 50000;

        setReport({
          date: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
          totalOrders: ordersData.length,
          totalRevenue,
          pendingRevenue,
          paidOrdersCount: paidOrders.length,
          unpaidOrdersCount: unpaidOrders.length,
          completedOrdersCount: completedOrders.length,
          cashRevenue,
          qrisRevenue,
          transferRevenue,
          setoranCash,
        });

        setReportItems(
          ordersData.map((order: any) => ({
            id: order.id,
            orderId: order.order_number,
            customerName: order.customer_name,
            amount: Number(order.total_price) || 0,
            status: order.payment_status === "paid" ? "paid" : "unpaid",
            completionStatus: order.status,
            paymentMethod: order.payment_method || "Cash",
            time: new Date(order.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            date: new Date(order.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }),
            tableNumber: order.table_number,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching settlement data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = selectedStatus === "all" ? reportItems : reportItems.filter((item) => item.status === selectedStatus);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPercentage = (value: number) => {
    if (report.totalRevenue === 0) return "0%";
    return `${Math.round((value / report.totalRevenue) * 100)}%`;
  };

  return (
    <div className="space-y-8 p-1 md:p-4 max-w-7xl mx-auto print-container">
      {/* Print styles override - Optimized for POS Thermal Receipt (80mm) */}
      <style jsx global>{`
        @media print {
          @page {
            size: portrait;
            margin: 4mm 2mm;
          }
          body {
            background-color: white !important;
            color: black !important;
            font-family: 'Courier New', Courier, monospace !important;
            font-size: 11px !important;
            line-height: 1.3 !important;
          }
          aside, nav, .print-hide, button, select, .instruction-note, .emoji-print-hide {
            display: none !important;
          }
          main, .print-container {
            margin: 0 auto !important;
            padding: 0 !important;
            width: 80mm !important;
            max-width: 80mm !important;
            background: white !important;
            color: black !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
          }
          .print-header {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            margin-bottom: 12px !important;
            padding-bottom: 6px !important;
            border-bottom: 1px dashed #000 !important;
          }
          .print-header h1 {
            font-size: 16px !important;
            font-weight: bold !important;
            margin: 0 !important;
            color: black !important;
          }
          .print-header p {
            margin: 2px 0 0 0 !important;
            font-size: 9px !important;
            color: black !important;
          }
          .print-card-grid {
            display: block !important;
            margin-bottom: 10px !important;
            border-bottom: 1px dashed #000 !important;
            padding-bottom: 5px !important;
          }
          .print-card {
            border: none !important;
            padding: 4px 0 !important;
            border-radius: 0 !important;
            background: transparent !important;
            color: black !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .print-card p {
            margin: 0 !important;
            color: black !important;
            font-size: 11px !important;
          }
          .print-card .print-label {
            font-weight: normal !important;
            color: black !important;
            font-size: 11px !important;
          }
          .print-card .print-value {
            font-weight: bold !important;
            color: black !important;
            font-size: 12px !important;
          }
          .print-border {
            border: none !important;
            padding: 0 !important;
            margin-top: 10px !important;
          }
          .print-border h2 {
            font-size: 12px !important;
            font-weight: bold !important;
            margin-bottom: 6px !important;
            border-bottom: 1px dashed #000 !important;
            padding-bottom: 3px !important;
          }
          .print-border .space-y-4 {
            margin-top: 5px !important;
            margin-bottom: 5px !important;
          }
          .print-border .space-y-4 > div {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 3px 0 !important;
          }
          .w-full.bg-gray-100.h-2.5 {
            display: none !important;
          }
          .print-border-box {
            border: 1px dashed #000 !important;
            padding: 6px !important;
            margin-top: 8px !important;
            font-size: 9px !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-top: 10px !important;
          }
          th {
            border-bottom: 1px dashed #000 !important;
            border-top: 1px dashed #000 !important;
            padding: 5px 0 !important;
            font-size: 10px !important;
            color: black !important;
            font-weight: bold !important;
          }
          td {
            border-bottom: 1px dotted #eee !important;
            padding: 5px 0 !important;
            font-size: 9px !important;
            color: black !important;
          }
          .print-hide-column {
            display: none !important;
          }
          td span, td div {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            color: black !important;
          }
          .print-signature-area {
            display: flex !important;
            justify-content: space-between !important;
            margin-top: 30px !important;
            page-break-inside: avoid !important;
            border-top: 1px dashed #000 !important;
            padding-top: 15px !important;
          }
          .print-signature-box {
            text-align: center !important;
            width: 45% !important;
            color: black !important;
          }
          .print-signature-box p {
            margin: 0 !important;
            font-size: 9px !important;
          }
        }
      `}</style>

      {/* Screen Header / Print Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200 pb-5">
        <div>
          <div className="print-header hidden">
            <h1 className="text-3xl font-black tracking-wider text-black">LAA COFFEE</h1>
            <p className="text-sm font-semibold tracking-wide uppercase">Laporan Keuangan & Settlement Harian</p>
            <p className="text-xs text-gray-500 mt-1">Tanggal Cetak: {new Date().toLocaleString("id-ID")}</p>
          </div>
          <h1 className="text-3xl font-extrabold text-amber-900 leading-tight print-hide">Settlement Laporan Keuangan</h1>
          <p className="text-sm text-amber-700 mt-1 print-hide">Ringkasan pendapatan harian dan serah terima setoran uang kasir.</p>
        </div>
        <div className="flex items-center gap-3 print-hide">
          <button 
            onClick={fetchSettlementData}
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-xl text-sm transition-all duration-200"
            title="Muat ulang data"
          >
            🔄 Refresh
          </button>
          <button 
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            🖨️ Cetak Laporan
          </button>
        </div>
      </div>

      {/* Guidance Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl text-sm text-blue-900 leading-relaxed instruction-note print-hide">
        <p className="font-bold flex items-center gap-1.5 text-base">
          <span>ℹ️</span> Petunjuk Pembukuan Kasir:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Omset dicatat berdasarkan transaksi yang telah diselesaikan pembayarannya (Lunas).</li>
          <li>Setoran Cash dihitung otomatis dalam kelipatan Rp 50.000 atau Rp 100.000. Pecahan kecil atau total tunai di bawah Rp 50.000 tetap disimpan di laci kasir untuk uang kembalian.</li>
          <li>Cetak rekap harian ini untuk distaples bersama uang setoran cash fisik yang akan diserahkan. Jika printer bermasalah, simpan laporan sebagai file PDF untuk dikirimkan langsung ke Owner.</li>
        </ul>
      </div>

      {/* Key Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print-card-grid">
        {/* Realized Revenue */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl p-6 shadow-md border border-emerald-500 relative overflow-hidden print-card">
          <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest print-label"><span className="emoji-print-hide">💰 </span>Total Omset</p>
          <p className="text-3xl font-black mt-2 leading-none print-value">{formatPrice(report.totalRevenue)}</p>
          <p className="text-xs text-emerald-200 mt-3 flex items-center gap-1.5 print-hide">
            <span>✓</span> Dari {report.paidOrdersCount} pesanan lunas
          </p>
        </div>

        {/* Setoran Cash */}
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl p-6 shadow-md border border-amber-500 relative overflow-hidden print-card">
          <p className="text-xs font-bold text-amber-100 uppercase tracking-widest print-label"><span className="emoji-print-hide">💵 </span>Setoran Cash</p>
          <p className="text-3xl font-black mt-2 leading-none print-value">{formatPrice(report.setoranCash)}</p>
          <p className="text-xs text-amber-200 mt-3 print-hide">
            {report.setoranCash > 0 
              ? `Kelipatan Rp 50k/100k. Sisa receh ${formatPrice(report.cashRevenue - report.setoranCash)} di laci.`
              : report.cashRevenue > 0
                ? `Tunai belum mencapai Rp 50k. Semua uang ${formatPrice(report.cashRevenue)} tetap di laci.`
                : "Belum ada transaksi tunai hari ini."}
          </p>
        </div>

        {/* Pending Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-200 relative print-card">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest print-label"><span className="emoji-print-hide">⏳ </span>Pending</p>
          <p className="text-2xl font-black mt-2 text-amber-900 leading-none print-value">{formatPrice(report.pendingRevenue)}</p>
          <p className="text-xs text-amber-600 mt-3 font-semibold print-hide">
            ⚠️ {report.unpaidOrdersCount} pesanan belum bayar
          </p>
        </div>

        {/* Total Orders Volume */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-amber-200 relative print-card">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest print-label"><span className="emoji-print-hide">📋 </span>Total Pesanan</p>
          <p className="text-3xl font-black mt-2 text-gray-800 leading-none print-value">{report.totalOrders}</p>
          <p className="text-xs text-gray-500 mt-3 print-hide">
            {report.paidOrdersCount} Lunas • {report.unpaidOrdersCount} Pending
          </p>
        </div>
      </div>

      {/* Payment Method Breakdown & Financial Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle - Payment Breakdown */}
        <div className="lg:col-span-1 bg-white rounded-2xl border-2 border-amber-200 p-6 space-y-6 print-border">
          <div>
            <h2 className="text-lg font-black text-amber-900 flex items-center gap-2">💳 Metode Pembayaran</h2>
            <p className="text-xs text-gray-500 mt-0.5 print-hide">Rincian pendapatan berdasarkan cara bayar</p>
          </div>

          <div className="space-y-4">
            {/* Cash */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray-700 flex items-center gap-1.5"><span className="emoji-print-hide">💵 </span>Cash</span>
                <div className="flex items-center gap-2">
                  <span className="text-amber-950 font-bold">{formatPrice(report.cashRevenue)}</span>
                  <span className="text-xs text-emerald-700 px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded-md font-bold print-hide">{getPercentage(report.cashRevenue)}</span>
                  <span className="text-[10px] text-gray-500 hidden print:inline">({getPercentage(report.cashRevenue)})</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: getPercentage(report.cashRevenue) }} />
              </div>
            </div>

            {/* QRIS */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray-700 flex items-center gap-1.5">
                  <span className="emoji-print-hide"><QrCodeIcon /></span>
                  <span>QRIS</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-amber-950 font-bold">{formatPrice(report.qrisRevenue)}</span>
                  <span className="text-xs text-blue-700 px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded-md font-bold print-hide">{getPercentage(report.qrisRevenue)}</span>
                  <span className="text-[10px] text-gray-500 hidden print:inline">({getPercentage(report.qrisRevenue)})</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: getPercentage(report.qrisRevenue) }} />
              </div>
            </div>

            {/* Transfer */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-gray-700 flex items-center gap-1.5"><span className="emoji-print-hide">🏦 </span>Transfer</span>
                <div className="flex items-center gap-2">
                  <span className="text-amber-950 font-bold">{formatPrice(report.transferRevenue)}</span>
                  <span className="text-xs text-indigo-700 px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 rounded-md font-bold print-hide">{getPercentage(report.transferRevenue)}</span>
                  <span className="text-[10px] text-gray-500 hidden print:inline">({getPercentage(report.transferRevenue)})</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: getPercentage(report.transferRevenue) }} />
              </div>
            </div>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-xs text-amber-900 leading-relaxed space-y-1 print-border-box">
            <p className="font-bold">💡 Audit Setoran Uang:</p>
            <p>Setoran Cash hanya mengambil uang kertas kelipatan Rp 50.000 atau Rp 100.000. Uang tunai di bawah Rp 50.000 tidak dimasukkan ke dalam setoran dan tetap di laci.</p>
            <p className="mt-1 font-semibold text-emerald-800">Uang disetor: {formatPrice(report.setoranCash)}</p>
            <p className="text-amber-800">Sisa uang di laci: {formatPrice(report.cashRevenue - report.setoranCash)}</p>
          </div>
        </div>

        {/* Right - Audit Status & Completion */}
        <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-amber-200 p-6 print-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 print-hide">
            <div>
              <h2 className="text-lg font-black text-amber-900">📋 Daftar Detail Transaksi</h2>
              <p className="text-xs text-gray-500">Log semua pesanan harian</p>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-1.5 bg-amber-50 p-1.5 rounded-xl border border-amber-200">
              <button 
                onClick={() => setSelectedStatus("all")} 
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedStatus === "all" ? "bg-amber-800 text-white shadow-sm" : "text-amber-900 hover:bg-amber-200/50"}`}
              >
                Semua ({reportItems.length})
              </button>
              <button 
                onClick={() => setSelectedStatus("paid")} 
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedStatus === "paid" ? "bg-emerald-600 text-white shadow-sm" : "text-emerald-800 hover:bg-emerald-100/50"}`}
              >
                Lunas ({report.paidOrdersCount})
              </button>
              <button 
                onClick={() => setSelectedStatus("unpaid")} 
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedStatus === "unpaid" ? "bg-amber-600 text-white shadow-sm" : "text-amber-900 hover:bg-amber-100/50"}`}
              >
                Pending ({report.unpaidOrdersCount})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-200 text-amber-950">
                  <th className="text-left pb-3 font-bold">Pesanan</th>
                  <th className="text-left pb-3 font-bold">Pelanggan</th>
                  <th className="text-left pb-3 font-bold print-hide">Waktu</th>
                  <th className="text-center pb-3 font-bold">Metode</th>
                  <th className="text-center pb-3 font-bold print-hide-column">Status Bayar</th>
                  <th className="text-right pb-3 font-bold">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 font-bold text-amber-900">
                        {item.orderId}
                        <span className="block font-normal text-[10px] text-gray-500 md:hidden mt-0.5">Meja {item.tableNumber} • {item.time}</span>
                      </td>
                      <td className="py-3 text-gray-700">
                        {item.customerName}
                        <span className="hidden md:inline text-xs text-gray-500 font-semibold ml-2">Meja {item.tableNumber}</span>
                      </td>
                      <td className="py-3 text-gray-500 print-hide">{item.time}</td>
                      <td className="py-3 text-center text-xs font-bold text-amber-800">
                        <span className="inline-flex items-center gap-1">
                          {item.paymentMethod?.toLowerCase() === "qris" ? (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-950 font-bold px-2 py-0.5 rounded border border-amber-200 text-xs">
                              <span className="print-hide-column"><QrCodeIcon /></span>
                              <span>QRIS</span>
                            </span>
                          ) : item.paymentMethod?.toLowerCase() === "cash" || item.paymentMethod?.toLowerCase() === "tunai" ? (
                            <span><span className="emoji-print-hide">💵 </span>Cash</span>
                          ) : (
                            <span><span className="emoji-print-hide">🏦 </span>Transfer</span>
                          )}
                        </span>
                      </td>
                      <td className="py-3 text-center print-hide-column">
                        <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          item.status === "paid" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {item.status === "paid" ? "Lunas" : "Belum Lunas"}
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-amber-900">{formatPrice(item.amount)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                      Tidak ada data pesanan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Printable Signature Block */}
      <div className="print-signature-area hidden">
        <div className="print-signature-box">
          <p>Disiapkan Oleh,</p>
          <br />
          <br />
          <p className="font-bold">____________________</p>
          <p className="text-[10px] text-gray-500 mt-1">Kasir Shift</p>
        </div>
        <div className="print-signature-box">
          <p>Disetujui Oleh,</p>
          <br />
          <br />
          <p className="font-bold">____________________</p>
          <p className="text-[10px] text-gray-500 mt-1">Supervisor / Pemilik</p>
        </div>
      </div>
    </div>
  );
}
