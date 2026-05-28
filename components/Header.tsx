"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  tableNumber?: number;
  cartCount?: number;
  onCartClick?: () => void;
  onAdminClick?: () => void;
}

export default function Header({ tableNumber = 0, cartCount = 0, onCartClick, onAdminClick }: HeaderProps) {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-950/95 to-amber-900/95 backdrop-blur-md border-b border-amber-800/10 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3.5 md:px-6 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
            <div className="text-2xl md:text-3xl transition-transform group-hover:scale-110 duration-300">☕</div>
            <div>
              <h1 className="text-lg md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-100 to-white bg-clip-text text-transparent">Laa Coffee</h1>
              {tableNumber > 0 && <p className="text-[10px] md:text-xs text-amber-200/90 font-medium tracking-wide">Meja {tableNumber}</p>}
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={`text-sm font-semibold tracking-wide transition-colors duration-250 hover:text-amber-200 relative py-1 ${pathname === "/" ? "text-amber-300 font-bold" : "text-amber-100"}`}>
              Beranda
              {pathname === "/" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />}
            </Link>
            <Link href="/menu" className={`text-sm font-semibold tracking-wide transition-colors duration-250 hover:text-amber-200 relative py-1 ${pathname === "/menu" ? "text-amber-300 font-bold" : "text-amber-100"}`}>
              Pesan Menu
              {pathname === "/menu" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />}
            </Link>
            <Link href="/about" className={`text-sm font-semibold tracking-wide transition-colors duration-250 hover:text-amber-200 relative py-1 ${pathname === "/about" ? "text-amber-300 font-bold" : "text-amber-100"}`}>
              Tentang Kami
              {pathname === "/about" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Cart Button (Desktop & Mobile header representation) */}
            <button onClick={onCartClick} className="relative p-2.5 bg-amber-800/80 hover:bg-amber-800 border border-amber-700/30 rounded-xl transition active:scale-95 duration-200" aria-label="Keranjang belanja">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white md:w-6 md:h-6 w-5 h-5">
                <circle cx="9" cy="21" r="1" fill="currentColor" />
                <circle cx="20" cy="21" r="1" fill="currentColor" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 bg-rose-600 border-2 border-amber-900 text-white text-[9px] px-1 rounded-full flex items-center justify-center font-bold animate-pulse">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (md:hidden) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-amber-100/70 shadow-[0_-4px_20px_rgba(139,94,26,0.1)] px-4 py-2.5 flex items-center justify-around">
        <Link href="/" className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 rounded-xl transition-all duration-200 ${pathname === "/" ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"}`}>
          <span className="text-xl">🏠</span>
          <span className="text-[10px] tracking-tight">Beranda</span>
        </Link>

        <Link
          href="/menu"
          className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 rounded-xl transition-all duration-200 ${pathname === "/menu" ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"}`}
        >
          <span className="text-xl">🍽️</span>
          <span className="text-[10px] tracking-tight">Menu</span>
        </Link>

        <button
          onClick={onCartClick}
          className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 relative transition-all duration-200 ${cartCount > 0 ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span className="text-[10px] tracking-tight">Keranjang</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 right-2.5 bg-rose-500 text-white font-extrabold text-[9px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white animate-bounce">{cartCount}</span>
          )}
        </button>

        <Link
          href="/about"
          className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 rounded-xl transition-all duration-200 ${pathname === "/about" ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"}`}
        >
          <span className="text-xl">📍</span>
          <span className="text-[10px] tracking-tight">Kontak</span>
        </Link>
      </div>

      {/* Floating WhatsApp CS Widget */}
      <a
        href="https://wa.me/6281999238377?text=Halo%20Laa%20Coffee,%20saya%20ingin%20tanya%20mengenai%20layanan/pesanan%20meja."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 md:p-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group flex items-center gap-2 border border-white/10"
        title="Hubungi WhatsApp Kami"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.486 5.355 1.488 5.393 0 9.774-4.381 9.778-9.777.002-2.614-1.015-5.07-2.864-6.92-1.849-1.849-4.307-2.868-6.926-2.869-5.396 0-9.777 4.381-9.782 9.778-.002 2.015.524 3.987 1.522 5.679L2.83 21.284l5.127-1.345c.01-.002.019-.004.03-.006.015.006.03.01.045.015-.316-.279.16-.07.16-.07zm11.365-7.054c-.29-.146-1.72-.85-1.985-.947-.267-.098-.46-.147-.655.147-.194.293-.75.946-.92 1.14-.167.197-.336.22-.626.075-.29-.146-1.229-.452-2.34-1.444-.863-.77-1.447-1.722-1.616-2.015-.17-.29-.018-.448.128-.593.13-.13.29-.34.436-.51.145-.17.194-.294.29-.49.098-.195.048-.367-.024-.513-.074-.147-.656-1.58-.9-2.164-.237-.57-.478-.493-.655-.502-.17-.008-.363-.01-.557-.01-.194 0-.51.073-.777.367-.267.294-1.02 1-1.02 2.441 0 1.443 1.05 2.839 1.196 3.033.145.195 2.065 3.155 5.005 4.43 1.745.759 2.535.882 3.44.757.562-.077 1.72-.704 1.962-1.385.243-.68.243-1.267.17-1.39-.074-.125-.268-.196-.558-.342z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-xs md:text-sm font-bold tracking-wide whitespace-nowrap text-white">
          Takon
        </span>
      </a>
    </>
  );
}
