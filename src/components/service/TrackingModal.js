"use client";

import { X } from "lucide-react";
import Info from "@/components/shared/Info";
import { openWhatsApp } from "@/lib/utils";

export default function TrackingModal({ service, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Tracking Customer</h3>
            <p className="text-gray-600">cek.fixtrack.id/{service.invoice}</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-5">
            <p className="text-sm text-gray-300">Invoice</p>
            <h2 className="text-3xl font-bold">{service.invoice}</h2>
            <p className="mt-2">{service.device}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <Info label="Customer" value={service.customer} />
            <Info label="Status" value={service.status} />
            <Info label="Perangkat" value={service.device} />
            <Info label="Estimasi Biaya" value={service.cost} />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <h4 className="font-bold mb-3 text-gray-900">Timeline</h4>

            <div className="space-y-2">
              {service.timeline.map((item, index) => (
                <div key={index} className="flex gap-3 text-gray-700">
                  <span className="font-bold">{index + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => openWhatsApp(service)}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-xl"
          >
            Chat Admin via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
