import React from "react";

interface FacilitiesProps {
  amenities: string;
  atmosphere: string;
}

export default function Facilities({ amenities, atmosphere }: FacilitiesProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-amber-900/5 p-6 md:p-8 border border-amber-100/50">
      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-wider select-none">
        Kenyamanan Kafe
      </span>
      <h3 className="text-xl md:text-2xl font-extrabold text-amber-950 mt-4 mb-6">Fasilitas & Suasana</h3>

      <div className="space-y-6">
        {/* Atmosphere */}
        <div className="flex gap-3">
          <span className="text-2xl p-2 bg-amber-50 rounded-xl h-fit">☕</span>
          <div>
            <h4 className="font-bold text-amber-950 text-sm md:text-base mb-1">Suasana Kedai:</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{atmosphere}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex gap-3">
          <span className="text-2xl p-2 bg-amber-50 rounded-xl h-fit">🏠</span>
          <div>
            <h4 className="font-bold text-amber-950 text-sm md:text-base mb-1">Fasilitas Penunjang:</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{amenities}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
