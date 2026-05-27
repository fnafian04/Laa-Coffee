"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Facilities from "@/components/Facilities";
import LocationInfo from "@/components/LocationInfo";

const LAA_COFFEE_INFO = {
  address: "Jl. Raya Jetis, Dusun Sidolegi, Paringan, Kec. Jetis, Kabupaten Mojokerto, Jawa Timur 61352",
  phone: "+62 819-9923-8377",
  operatingHours: "Buka setiap hari pukul 08:00 - 22:00 WIB.",
  priceRange: "Sangat terjangkau, berkisar di angka Rp 25.000 atau kurang.",
  payment: "Tunai (cash) langsung di kasir, serta mendukung non-tunai (QRIS & Transfer) melalui sistem pesan meja digital.",
  atmosphere: "Kasual, santai, dan nyaman. Kedai ini sangat populer sebagai tempat nongkrong, sarapan santai, maupun bekerja/nugas menggunakan laptop.",
  amenities: "Free Wi-Fi berkecepatan tinggi, toilet bersih, musholla yang nyaman untuk beribadah, area lantai 2 dengan pemandangan terbuka, serta area tempat duduk outdoor yang asri. (Catatan: Laa Coffee mengusung konsep sejuk alami tanpa pendingin AC maupun kipas angin. Fasilitas akses kursi roda saat ini belum tersedia).",
  specialMenu: "Kopi racikan spesial, berbagai pilihan teh hangat, dan aneka makanan ringan / camilan lezat.",
  description:
    "Laa Coffee adalah kedai kopi kasual dan nyaman yang terletak di Jalan Raya Jetis, Dusun Sidolegi, Paringan, Kecamatan Jetis, Kabupaten Mojokerto. Tempat ini sangat populer sebagai lokasi sarapan santai, nongkrong seru, maupun ruang tenang untuk bekerja menggunakan laptop dengan harga menu yang sangat ramah di kantong.",
  visitTips: "Waktu paling sepi dan nyaman untuk datang biasanya pada pagi hari (sekitar pukul 08:00 - 10:00) atau malam hari, sementara waktu paling ramai terjadi pada sore hingga malam hari di hari Selasa, Kamis, Jumat, dan Sabtu."
};

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.0523519238647!2d112.65047!3d-7.506599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780c9c9c9d%3A0x8c8c8c8c8c8c8c8c!2sLaa%20Coffee!5e0!3m2!1sid!2sid!4v1620000000000";

export default function AboutPage() {
  const router = useRouter();

  const handleCartOpenRedirect = () => {
    router.push("/menu?cart=open");
  };

  return (
    <div className="min-h-screen bg-amber-50/20 text-gray-800 selection:bg-amber-800 selection:text-white">
      <Header onCartClick={handleCartOpenRedirect} />

      {/* Hero Section */}
      <section 
        className="relative py-14 md:py-20 bg-amber-950 bg-cover bg-center overflow-hidden text-center text-white"
        style={{ backgroundImage: "url('/images/cafe_hero_image.png')" }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative max-w-4xl mx-auto px-4 space-y-4 z-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center justify-center gap-2">
            <span>☕</span> Hubungi & Kunjungi Kami
          </h1>
          <p className="text-amber-100/90 text-sm md:text-lg italic font-medium max-w-xl mx-auto leading-relaxed">
            "Ruang ketiga yang nyaman dengan seduhan kopi berkualitas terbaik untuk produktivitas Anda"
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* About Description card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/5 p-6 md:p-10 border border-amber-100/50">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-wider select-none">
              Profil Kami
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-900 mt-4 mb-4">
              Tentang Laa Coffee
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {LAA_COFFEE_INFO.description}
            </p>
          </div>

          {/* Interactive Grid: Location details & Facilities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Column 1: Facilities & Amenities */}
            <div className="space-y-8">
              <Facilities 
                atmosphere={LAA_COFFEE_INFO.atmosphere} 
                amenities={LAA_COFFEE_INFO.amenities} 
              />
            </div>

            {/* Column 2: Location details & Operating Hours */}
            <div className="space-y-8">
              <LocationInfo 
                address={LAA_COFFEE_INFO.address} 
                phone={LAA_COFFEE_INFO.phone} 
                operatingHours={LAA_COFFEE_INFO.operatingHours} 
              />
            </div>
          </div>

          {/* Tips Berkunjung Card */}
          <div className="bg-amber-50/50 rounded-3xl p-6 md:p-8 border border-amber-100/70 shadow-sm max-w-4xl mx-auto">
            <div className="flex gap-3">
              <span className="text-2xl p-2 bg-white rounded-xl h-fit shadow-sm">💡</span>
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 text-sm mb-1.5">Tips Berkunjung & Waktu Terbaik</h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {LAA_COFFEE_INFO.visitTips}
                </p>
                <p className="text-[10px] text-gray-400 mt-3 italic">
                  * Catatan: Informasi operasional di atas dapat berubah sewaktu-waktu. Hubungi WhatsApp resmi kami untuk info reservasi tempat.
                </p>
              </div>
            </div>
          </div>

          {/* Centered Map Section */}
          <div className="space-y-4">
            <div className="text-center max-w-lg mx-auto">
              <h3 className="text-lg font-bold text-amber-900">Peta Lokasi Resmi</h3>
              <p className="text-xs text-gray-500 mt-1">Lihat rute navigasi instan lewat Google Maps di bawah ini.</p>
            </div>
            
            <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl shadow-amber-900/5 border border-amber-100/50 bg-white">
              <div className="relative w-full h-72 md:h-96">
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
              <div className="p-4 bg-amber-50/50 border-t border-amber-100 flex items-center justify-between px-6">
                <span className="text-xs text-amber-900 font-semibold">Petunjuk Arah Rute Navigasi:</span>
                <a
                  href="https://maps.app.goo.gl/9QhN5rtWNVWj2ygr9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-amber-800 hover:bg-amber-950 text-white font-bold px-4 py-2 rounded-xl transition shadow-sm active:scale-95 animate-pulse"
                >
                  🗺️ Buka Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Elegant CTA Block */}
          <div className="text-center bg-gradient-to-r from-amber-950 to-amber-900 text-white rounded-3xl p-8 md:p-12 shadow-xl shadow-amber-950/20 border border-amber-850/20 space-y-6 max-w-4xl mx-auto relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Sudah Menemukan Tempat Duduk yang Nyaman?
            </h3>
            <p className="text-xs md:text-sm text-amber-200/80 max-w-xl mx-auto leading-relaxed">
              Pesan langsung dari meja Anda tanpa harus mengantre di kasir. Pilih minuman favorit Anda, sesuaikan selera (panas/dingin), dan bayar praktis lewat HP.
            </p>
            <div className="pt-4">
              <a 
                href="/menu" 
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 border border-amber-600/30 text-white font-bold py-3.5 px-8 rounded-2xl text-sm transition-all active:scale-95 shadow-md shadow-black/25"
              >
                <span>🛒</span> Pesan Sekarang Juga
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-white py-12 px-4 border-t border-amber-900/10 bg-amber-950">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact */}
            <div className="space-y-4">
              <Link href="/admin" className="flex items-center gap-2 select-none cursor-default">
                <span className="text-3xl">☕</span>
                <span className="text-xl font-extrabold tracking-tight">Laa Coffee</span>
              </Link>
              <p className="text-xs text-amber-200/70 leading-relaxed max-w-sm">
                Tempat ternyaman untuk produktivitas Anda di Mojokerto dengan sajian seduhan berkualitas dan harga terjangkau.
              </p>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400">Jam Operasional</h4>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                Buka Setiap Hari<br />
                <span className="text-sm font-bold text-white mt-1 block">Pukul 08:00 - 22:00 WIB</span>
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400">Navigasi Cepat</h4>
              <ul className="text-xs text-amber-100/80 space-y-2.5">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    → Beranda Utama
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-white transition-colors">
                    → Pesan Menu Digital
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    → Info Kontak & Kafe
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-900/60 pt-6 text-center text-xs text-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>&copy; 2026 Laa Coffee. Semua hak cipta dilindungi.</p>
            <p>
              Developed by{" "}
              <a 
                href="https://instagram.com/nafiandeva" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-400 hover:text-white transition-colors font-semibold"
              >
                Nafi & Eva
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
