import React from "react";

interface FacilitiesProps {
  amenities: string;
  atmosphere: string;
  specialMenu: string;
}

export default function Facilities({ amenities, atmosphere, specialMenu }: FacilitiesProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-amber-900 mb-8">Fasilitas & Suasana</h3>

      <div className="space-y-8">
        {/* Atmosphere */}
        <div>
          <h4 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
            <span>☕</span> Suasana:
          </h4>
          <p className="text-gray-700 leading-relaxed">{atmosphere}</p>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
            <span>🏠</span> Fasilitas:
          </h4>
          <p className="text-gray-700 leading-relaxed">{amenities}</p>
        </div>

        {/* Special Menu */}
        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-600">
          <h4 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
            <span>📋</span> Menu Andalan:
          </h4>
          <p className="text-gray-700 leading-relaxed">{specialMenu}</p>
        </div>
      </div>
    </div>
  );
}
