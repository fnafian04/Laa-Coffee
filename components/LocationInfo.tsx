import React from "react";

interface LocationInfoProps {
  address: string;
  phone: string;
  operatingHours: string;
}

export default function LocationInfo({ address, phone, operatingHours }: LocationInfoProps) {
  return (
    <div className="space-y-6">
      {/* Address & Contact detail card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/5 p-6 md:p-8 border border-amber-100/50 space-y-6">
        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-wider select-none">
          Kontak Resmi
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-amber-950 mt-4 mb-2">Rincian Lokasi</h3>

        <div className="space-y-4">
          {/* Address */}
          <div className="flex gap-3">
            <span className="text-2xl p-2 bg-amber-50 rounded-xl h-fit">📍</span>
            <div>
              <h4 className="font-bold text-amber-950 text-xs md:text-sm mb-0.5">Alamat Kedai:</h4>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{address}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-3">
            <span className="text-2xl p-2 bg-amber-50 rounded-xl h-fit">📞</span>
            <div>
              <h4 className="font-bold text-amber-950 text-xs md:text-sm mb-0.5">No. Telepon WhatsApp:</h4>
              <p className="text-xs md:text-sm text-gray-600">{phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/5 p-6 md:p-8 border border-amber-100/50">
        <div className="flex gap-3">
          <span className="text-2xl p-2 bg-amber-50 rounded-xl h-fit">⏰</span>
          <div className="flex-1">
            <h4 className="font-bold text-amber-950 text-sm mb-2">Jam Operasional Harian</h4>
            <p className="text-xs md:text-sm text-amber-900 font-extrabold mb-2">{operatingHours}</p>
            <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">
              * Tips: Waktu terbaik nugas dengan tenang adalah pagi pukul 08:00 - 11:30 atau larut malam. Kafe biasanya cukup ramai pada jam bersantai sore pukul 16:00 - 20:00 WIB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
