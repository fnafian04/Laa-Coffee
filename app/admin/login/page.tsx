"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If already logged in, skip login page
    const auth = localStorage.getItem("laa_coffee_admin_auth");
    if (auth === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi!");
      return;
    }

    setIsLoading(true);

    // Simulate short network request for realism
    setTimeout(() => {
      if (username === "nafii123" && password === "1234567890") {
        localStorage.setItem("laa_coffee_admin_auth", "true");
        router.push("/admin");
      } else {
        setError("Username atau password salah!");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 flex items-center justify-center p-4 selection:bg-amber-800 selection:text-white">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Header/Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-2xl text-4xl shadow-sm border border-amber-100">☕</div>
          <h2 className="text-2xl font-black text-amber-900">Admin Login</h2>
          <p className="text-xs text-amber-700 font-medium">Masuk untuk mengelola pesanan, menu, dan settlement</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-2xl flex items-center gap-2">
            <span className="text-sm">⚠️</span>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-xs font-bold text-amber-900 uppercase tracking-wider">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-amber-100 rounded-2xl bg-amber-50/20 text-amber-950 placeholder-amber-450/70 focus:outline-none focus:border-amber-600 focus:bg-white text-sm transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-bold text-amber-900 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-3 border-2 border-amber-100 rounded-2xl bg-amber-50/20 text-amber-950 placeholder-amber-450/70 focus:outline-none focus:border-amber-600 focus:bg-white text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-amber-700 hover:text-amber-900 transition-colors focus:outline-none select-none text-base"
                title={showPassword ? "Sembunyikan Sandi" : "Lihat Sandi"}
              >
                {showPassword ? "🙈" : "🙊"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold rounded-2xl transition-all shadow-md shadow-amber-950/20 active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="animate-spin text-lg">⏳</span>
                <span>Memproses Masuk...</span>
              </>
            ) : (
              <span>Masuk Sekarang</span>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-amber-800 font-bold hover:text-amber-950 hover:underline">
            Kembali ke Beranda Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
