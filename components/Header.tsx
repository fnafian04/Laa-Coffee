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
              <h1 className="text-lg md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-100 to-white bg-clip-text text-transparent">
                Laa Coffee
              </h1>
              {tableNumber > 0 && (
                <p className="text-[10px] md:text-xs text-amber-200/90 font-medium tracking-wide">
                  Meja {tableNumber}
                </p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 hover:text-amber-200 relative py-1 ${
                pathname === "/" ? "text-amber-300 font-bold" : "text-amber-100"
              }`}
            >
              Beranda
              {pathname === "/" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
            <Link
              href="/menu"
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 hover:text-amber-200 relative py-1 ${
                pathname === "/menu" ? "text-amber-300 font-bold" : "text-amber-100"
              }`}
            >
              Pesan Menu
              {pathname === "/menu" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
            <Link
              href="/about"
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 hover:text-amber-200 relative py-1 ${
                pathname === "/about" ? "text-amber-300 font-bold" : "text-amber-100"
              }`}
            >
              Tentang Kami
              {pathname === "/about" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Cart Button (Desktop & Mobile header representation) */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 bg-amber-800/80 hover:bg-amber-800 border border-amber-700/30 rounded-xl transition active:scale-95 duration-200"
              aria-label="Keranjang belanja"
            >
              <span className="text-lg md:text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 bg-rose-600 border-2 border-amber-900 text-white text-[9px] px-1 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (md:hidden) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-amber-100/70 shadow-[0_-4px_20px_rgba(139,94,26,0.1)] px-4 py-2.5 flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 rounded-xl transition-all duration-200 ${
            pathname === "/" ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-[10px] tracking-tight">Beranda</span>
        </Link>

        <Link
          href="/menu"
          className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 rounded-xl transition-all duration-200 ${
            pathname === "/menu" ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"
          }`}
        >
          <span className="text-xl">🍽️</span>
          <span className="text-[10px] tracking-tight">Menu</span>
        </Link>

        <button
          onClick={onCartClick}
          className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 relative transition-all duration-200 ${
            cartCount > 0 ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"
          }`}
        >
          <span className="text-xl">🛒</span>
          <span className="text-[10px] tracking-tight">Keranjang</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 right-2.5 bg-rose-500 text-white font-extrabold text-[9px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {cartCount}
            </span>
          )}
        </button>

        <Link
          href="/about"
          className={`flex flex-col items-center justify-center gap-1 min-w-16 py-0.5 rounded-xl transition-all duration-200 ${
            pathname === "/about" ? "text-amber-800 font-bold scale-105" : "text-gray-400 hover:text-amber-800"
          }`}
        >
          <span className="text-xl">📍</span>
          <span className="text-[10px] tracking-tight">Kontak</span>
        </Link>
      </div>
    </>
  );
}
