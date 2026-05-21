"use client";

import React from "react";
import Header from "@/components/Header";
import LocationInfo from "@/components/LocationInfo";
import Facilities from "@/components/Facilities";

const LAA_COFFEE_INFO = {
  address: "Jl. Raya Jetis, Dusun Sidolegi, Paringan, Kec. Jetis, Kabupaten Mojokerto, Jawa Timur 61352",
  phone: "+62 819-9923-8377",
  operatingHours: "Kafe ini buka setiap hari mulai pukul 08.00 pagi hingga 22.00 malam.",
  atmosphere: "Santai, nyaman, dan tenang, cocok untuk bekerja dengan laptop, bersantai sendirian, maupun berkumpul bersama keluarga.",
  amenities: "Terdapat Wi-Fi gratis, area tempat duduk outdoor, dan toilet.",
  specialMenu: "Menawarkan berbagai pilihan kopi, teh panas, dan makanan ringan.",
  description:
    "Laa Coffee adalah kedai kopi yang terletak di Jalan Raya Jetis, Dusun Sidolegi, Paringan, Kecamatan Jetis, Kabupaten Mojokerto. Tempat ini menawarkan area bersantai yang nyaman untuk bekerja atau sekadar berkumpul bersama teman dengan harga yang sangat terjangkau.",
};

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.0523519238647!2d112.65047!3d-7.506599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780c9c9c9c9c9d%3A0x8c8c8c8c8c8c8c8c!2sLaa%20Coffee!5e0!3m2!1sid!2sid!4v1620000000000";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header onCartClick={() => {}} onAdminClick={() => {}} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">☕</span> Kunjungi Kami
          </h1>
          <p className="text-amber-100 text-base md:text-lg italic">Rasakan pengalaman bersantai yang nyaman dengan kopi berkualitas terbaik</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-10 md:py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">Tentang Laa Coffee</h3>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">{LAA_COFFEE_INFO.description}</p>
          </div>

          {/* Location Info with Maps */}
          <LocationInfo address={LAA_COFFEE_INFO.address} phone={LAA_COFFEE_INFO.phone} operatingHours={LAA_COFFEE_INFO.operatingHours} mapUrl={MAPS_EMBED_URL} />

          {/* Facilities */}
          <Facilities atmosphere={LAA_COFFEE_INFO.atmosphere} amenities={LAA_COFFEE_INFO.amenities} specialMenu={LAA_COFFEE_INFO.specialMenu} />

          {/* Why Choose Us */}
          <div className="bg-gradient-to-b from-green-50 to-amber-50 rounded-xl shadow-lg p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">
              <span className="text-3xl">🌿</span> Mengapa Memilih Laa Coffee?
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🏷️</div>
                <h4 className="font-bold text-amber-900 mb-2">Harga Terjangkau</h4>
                <p className="text-sm text-gray-700">Nikmati kopi dan makanan berkualitas dengan harga yang ramah di kantong pelajar dan pekerja.</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-bold text-amber-900 mb-2">Pelayanan Cepat</h4>
                <p className="text-sm text-gray-700">Proses pemesanan dan pengiriman yang efisien tanpa mengurangi kualitas pesanan Anda.</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">❤️</div>
                <h4 className="font-bold text-amber-900 mb-2">Dibuat Dengan Cinta</h4>
                <p className="text-sm text-gray-700">Semua makanan dan kue dibuat harian dengan bahan berkualitas dan resep spesial kami.</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a href="/" className="inline-flex items-center gap-3 bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-xl">
              <span>🛒</span> Pesan Menu Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-6 px-4 mt-10">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>&copy; 2024 Laa Coffee. Semua hak cipta dilindungi.</p>
          <p className="text-amber-200 mt-2">Kunjungi kami di Jl. Raya Jetis, Mojokerto</p>
        </div>
      </footer>
    </div>
  );
}
