import React from "react";

interface LocationInfoProps {
  address: string;
  phone: string;
  operatingHours: string;
  mapUrl: string;
}

export default function LocationInfo({ address, phone, operatingHours, mapUrl }: LocationInfoProps) {
  return (
    <div className="space-y-8">
      {/* Google Maps */}
      <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-green-200">
        <div className="relative w-full h-96">
          <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={mapUrl} className="w-full h-full" />
        </div>
        <div className="p-4 bg-green-50">
          <a href="https://maps.app.goo.gl/9QhN5rtWNVWj2ygr9" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center gap-2">
            📍 Open in Maps
          </a>
        </div>
      </div>

      {/* Address & Contact */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-6">Rincian Lokasi & Kontak</h3>

        {/* Address */}
        <div className="flex gap-4">
          <span className="text-3xl">📍</span>
          <div>
            <h4 className="font-bold text-amber-900 mb-2">Alamat:</h4>
            <p className="text-gray-700">{address}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-4">
          <span className="text-3xl">📞</span>
          <div>
            <h4 className="font-bold text-amber-900 mb-2">No. Telepon:</h4>
            <p className="text-gray-700">{phone}</p>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
        <div className="flex gap-4">
          <span className="text-3xl">⏰</span>
          <div className="flex-1">
            <h4 className="font-bold text-amber-900 mb-3">Jam Operasional</h4>
            <p className="text-amber-800 font-semibold mb-2">{operatingHours}</p>
            <p className="text-sm text-gray-700">Waktu paling tenang untuk berkunjung (tidak terlalu ramai) adalah pada pagi atau larut malam, sedangkan kafe biasanya cukup sibuk pada sore hingga malam hari.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
