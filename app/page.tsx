"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";

const LAA_COFFEE_INFO = {
  address: "Jl. Raya Jetis, Dusun Sidolegi, Paringan, Kec. Jetis, Kabupaten Mojokerto, Jawa Timur 61352",
  phone: "+62 819-9923-8377",
};

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.0523519238647!2d112.65047!3d-7.506599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780c9c9c9c9c9d%3A0x8c8c8c8c8c8c8c8c!2sLaa%20Coffee!5e0!3m2!1sid!2sid!4v1620000000000";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header onCartClick={() => {}} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <div className="text-6xl md:text-7xl mb-4">☕</div>
          <h1 className="text-4xl md:text-6xl font-bold">Laa Coffee</h1>
          <p className="text-lg md:text-2xl text-amber-100 italic">
            Kedai Kopi Berkualitas dengan Suasana Nyaman dan Harga Terjangkau
          </p>
          <p className="text-amber-200 max-w-2xl mx-auto">
            Nikmati berbagai pilihan kopi spesial dan makanan lezat dengan kualitas terbaik di tempat yang tenang dan nyaman.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Link
              href="/menu"
              className="bg-white text-amber-800 hover:bg-amber-50 font-bold py-4 px-10 rounded-full text-lg transition inline-flex items-center gap-2 justify-center"
            >
              <span>🛒</span> Pesan Sekarang
            </Link>
            <a
              href="https://maps.app.goo.gl/9QhN5rtWNVWj2ygr9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-lg transition inline-flex items-center gap-2 justify-center"
            >
              <span>📍</span> Lihat di Maps
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-10 md:py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Why Choose Us */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center gap-2">
              <span>🌿</span> Mengapa Memilih Laa Coffee?
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🏷️</div>
                <h4 className="font-bold text-amber-900 mb-2">Harga Terjangkau</h4>
                <p className="text-sm text-gray-700">
                  Nikmati kopi dan makanan berkualitas dengan harga yang ramah di kantong pelajar dan pekerja.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-bold text-amber-900 mb-2">Pelayanan Cepat</h4>
                <p className="text-sm text-gray-700">
                  Proses pemesanan dan pengiriman yang efisien tanpa mengurangi kualitas pesanan Anda.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">❤️</div>
                <h4 className="font-bold text-amber-900 mb-2">Dibuat Dengan Cinta</h4>
                <p className="text-sm text-gray-700">
                  Semua makanan dan kue dibuat harian dengan bahan berkualitas dan resep spesial kami.
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-green-200">
            <div className="relative w-full h-96">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={MAPS_EMBED_URL}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
            >
              <span>🛒</span> Pesan Menu Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 px-4 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>📍</span> Kontak
              </h4>
              <p className="text-sm text-amber-100 mb-2">
                <strong>Alamat:</strong> Jl. Raya Jetis, Dusun Sidolegi, Paringan, Kec. Jetis, Kabupaten Mojokerto, Jawa Timur 61352
              </p>
              <p className="text-sm text-amber-100">
                <strong>Telepon:</strong> +62 819-9923-8377
              </p>
            </div>

            {/* Operating Hours */}
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>🕒</span> Jam Operasional
              </h4>
              <p className="text-sm text-amber-100">
                Setiap Hari <br /> Pukul 08:00 - 22:00
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="text-sm text-amber-100 space-y-2">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    → Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-white transition">
                    → Pesan Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition" title="Tentang Kami">
                    → ℹ️ Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-700 pt-6 text-center text-sm text-amber-200">
            <p>&copy; 2026 Laa Coffee. Semua hak cipta dilindungi.</p>
            <p className="mt-2">Develop by <a href="https://instagram.com/nafiandeva" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Nafi & Eva</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
