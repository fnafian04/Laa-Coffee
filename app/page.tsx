"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const LAA_COFFEE_INFO = {
  address: "Jl. Raya Jetis, Dusun Sidolegi, Paringan, Kec. Jetis, Kabupaten Mojokerto, Jawa Timur 61352",
  phone: "0819-9923-8377",
};

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.0524021703673!2d112.4737428!3d-7.4047919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780e54840e85df:0xd85c4aa566e2af10!2sLaa%20Coffee!5e0!3m2!1sid!2sid!4v1716899111111";

export default function HomePage() {
  const router = useRouter();

  const handleCartOpenRedirect = () => {
    router.push("/menu?cart=open");
  };

  return (
    <div className="min-h-screen bg-amber-50/20 text-gray-800 selection:bg-amber-800 selection:text-white">
      <Header onCartClick={handleCartOpenRedirect} />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-amber-950 bg-cover bg-center overflow-hidden py-16 px-4" style={{ backgroundImage: "url('/images/cafe_hero_image.png')" }}>
        {/* Dark Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-amber-950/80" />

        {/* Content Container */}
        <div className="relative max-w-4xl w-full mx-auto text-center space-y-6 md:space-y-8 z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 px-4 py-1.5 rounded-full backdrop-blur-md text-amber-200 text-xs md:text-sm font-semibold tracking-wider uppercase select-none animate-pulse">
            <span>✨</span> Cozy Atmosphere & Premium Taste
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">Laa Coffee</h1>

          <p className="text-lg md:text-2xl text-amber-100 italic font-medium max-w-2xl mx-auto leading-relaxed">"Kedai Kopi Berkualitas dengan Suasana Nyaman dan Harga Terjangkau"</p>

          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Nikmati hari-hari produktif Anda dengan secangkir kopi hangat terbaik dan aneka hidangan lezat. Tempat ideal untuk bekerja secara remote, hang-out santai, maupun berkumpul bersama keluarga.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-md mx-auto sm:max-w-none">
            <Link
              href="/menu"
              className="bg-amber-700 hover:bg-amber-600 border border-amber-600/40 text-white font-bold py-4 px-10 rounded-2xl text-sm md:text-base transition-all active:scale-95 shadow-lg shadow-amber-950/30 flex items-center gap-2 justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span>Pesan Sekarang</span>
            </Link>
            <a
              href="https://www.google.com/maps/place/Laa+coffee/@-7.4047919,112.4737428,691m/data=!3m1!1e3!4m6!3m5!1s0x2e780e54840e85df:0xd85c4aa566e2af10!8m2!3d-7.4043688!4d112.4711769!16s%2Fg%2F11f0wry4b6?entry=ttu&g_ep=EgoyMDI2MDUyNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/15 text-white font-bold py-4 px-10 rounded-2xl text-sm md:text-base transition-all active:scale-95 border border-white/20 backdrop-blur-sm flex items-center gap-2 justify-center"
            >
              <span>📍</span> Petunjuk Lokasi
            </a>
          </div>
        </div>

        {/* Decorative Wave/Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50/20 to-transparent" />
      </section>

      {/* Why Choose Us & Featured Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 space-y-20 md:space-y-28">
        {/* Why Choose Us */}
        <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/5 p-8 md:p-12 border border-amber-100/50">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-950 flex items-center justify-center gap-2">
              <span>🌿</span> Kenapa Laa Coffee?
            </h2>
            <p className="text-sm text-amber-800/80 mt-2">Keseimbangan antara rasa otentik, kenyamanan, dan pelayanan prima.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-50/80 to-amber-100/40 p-6 rounded-2xl border border-amber-100/60 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl opacity-10">🏷️</div>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">🏷️</div>
                <h3 className="font-bold text-amber-950 text-lg">Harga Sangat Bersahabat</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">Kami menyajikan menu kelas kafe mewah dengan harga kaki lima yang bersahabat untuk pelajar, mahasiswa, maupun pekerja.</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50/80 to-amber-100/40 p-6 rounded-2xl border border-amber-100/60 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl opacity-10">⚡</div>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">⚡</div>
                <h3 className="font-bold text-amber-950 text-lg">Pelayanan Cepat & Akurat</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">Pesan dari meja Anda dengan sistem QR pintar, dan pesanan akan diproses secara real-time demi waktu tunggu yang minimal.</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50/80 to-amber-100/40 p-6 rounded-2xl border border-amber-100/60 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl opacity-10">❤️</div>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">❤️</div>
                <h3 className="font-bold text-amber-950 text-lg">Dibuat Higienis & Segar</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">Semua bahan dipilah ketat secara higienis, diseduh dan dimasak langsung saat Anda memesan untuk menjaga kenikmatan maksimal.</p>
            </div>
          </div>
        </div>

        {/* Location & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl shadow-amber-900/5 border border-amber-100/50">
          <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">Lokasi Kedai</span>
              <h2 className="text-2xl md:text-3xl font-black text-amber-950 tracking-tight">Kunjungi Laa Coffee</h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">Kami berlokasi di area strategis Mojokerto dengan suasana asri yang menenangkan. Silakan klik peta di samping untuk rute navigasi instan lewat Google Maps.</p>

            <div className="space-y-4 pt-2 border-t border-amber-50">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📍</span>
                <div className="text-xs">
                  <p className="font-bold text-amber-950">Alamat Lengkap</p>
                  <p className="text-gray-500 mt-0.5">{LAA_COFFEE_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📞</span>
                <div className="text-xs">
                  <p className="font-bold text-amber-950">Nomor Telepon</p>
                  <p className="text-gray-500 mt-0.5">{LAA_COFFEE_INFO.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 min-h-[320px] relative border-t lg:border-t-0 lg:border-l border-amber-100">
            <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={MAPS_EMBED_URL} className="w-full h-full absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-white py-12 px-4 border-t border-amber-900/20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo/Contact */}
            <div className="space-y-4">
              <Link href="/admin" className="flex items-center gap-2 select-none cursor-default">
                <span className="text-3xl">☕</span>
                <span className="text-xl font-extrabold tracking-tight">Laa Coffee</span>
              </Link>
              <p className="text-xs text-amber-200/70 leading-relaxed max-w-sm">Kedai kopi pilihan utama dengan seduhan berkualitas tinggi dan menu berselera tinggi untuk menemani momen produktif dan santai Anda.</p>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400">Jam Operasional</h4>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                Buka Setiap Hari
                <br />
                <span className="text-sm font-bold text-white mt-1 block">Pukul 08:00 - 22:00 WIB</span>
              </p>
            </div>

            {/* Navigation links */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400">Navigasi Cepat</h4>
              <ul className="text-xs text-amber-100/80 space-y-2.5">
                <li>
                  <Link href="/" className="hover:text-amber-300 hover:translate-x-1 transition-all duration-200 inline-block">
                    Beranda Utama
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-amber-300 hover:translate-x-1 transition-all duration-200 inline-block">
                    Pesan Menu Digital
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-300 hover:translate-x-1 transition-all duration-200 inline-block">
                    Info Kontak & Kafe
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-900/60 pt-6 text-center text-xs text-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>&copy; 2026 Laa Coffee. Semua hak cipta dilindungi.</p>
            <p>
              Developed by{" "}
              <a href="https://www.linkedin.com/in/haii-akunafiann/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-white transition-colors font-semibold">
                Nafi
              </a>{" "}
              &{" "}
              <a href="https://www.linkedin.com/in/eva-ristiyanti/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-white transition-colors font-semibold">
                Eva
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
