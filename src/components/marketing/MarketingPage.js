"use client";

import { useState } from "react";
import { CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import StatCard from "@/components/shared/StatCard";

export default function MarketingPage({ services }) {
  const [selectedTemplate, setSelectedTemplate] = useState("selesai");

  const templates = {
    selesai: {
      title: "Service Selesai",
      message:
        "Halo {customer}, service HP {device} dengan invoice {invoice} sudah selesai. Silakan datang ke toko untuk pengambilan. Terima kasih.",
    },
    ambil: {
      title: "Reminder Ambil HP",
      message:
        "Halo {customer}, HP {device} dengan invoice {invoice} sudah selesai dan menunggu diambil. Mohon segera dikonfirmasi. Terima kasih.",
    },
    garansi: {
      title: "Info Garansi",
      message:
        "Halo {customer}, garansi service untuk invoice {invoice} masih aktif sesuai ketentuan toko. Jika ada kendala, silakan hubungi admin.",
    },
    review: {
      title: "Minta Review",
      message:
        "Halo {customer}, terima kasih sudah service di toko kami. Jika berkenan, mohon bantu beri review Google Maps agar layanan kami semakin baik.",
    },
    promo: {
      title: "Broadcast Promo",
      message:
        "Halo Kak, ada promo service HP minggu ini. Ganti baterai, LCD, konektor cas, dan pengecekan ringan. Silakan chat admin untuk info lengkap.",
    },
  };

  const completedServices = services.filter(
    (service) => service.status === "SELESAI"
  );

  const waitingPickup = services.filter(
    (service) => service.status === "SELESAI" || service.status === "QC"
  );

  function generateMessage(service) {
    const template = templates[selectedTemplate].message;

    return template
      .replaceAll("{customer}", service.customer)
      .replaceAll("{device}", service.device)
      .replaceAll("{invoice}", service.invoice);
  }

  function sendTemplate(service) {
    const phone = String(service.wa || "").replace(/^0/, "62");
    const message = generateMessage(service);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Service Selesai"
          value={completedServices.length}
          icon={<CheckCircle />}
        />

        <StatCard
          title="Menunggu Diambil"
          value={waitingPickup.length}
          icon={<Clock />}
        />

        <StatCard
          title="Customer Aktif"
          value={new Set(services.map((s) => s.wa)).size}
          icon={<Users />}
        />

        <StatCard
          title="Template WA"
          value={Object.keys(templates).length}
          icon={<TrendingUp />}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Template WhatsApp
          </h3>

          <div className="space-y-3">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`w-full text-left rounded-xl p-4 ${
                  selectedTemplate === key
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <h4 className="font-bold">{template.title}</h4>
                <p
                  className={
                    selectedTemplate === key
                      ? "text-gray-300 text-sm"
                      : "text-gray-600 text-sm"
                  }
                >
                  Klik untuk pilih template
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Preview Pesan
          </h3>

          <p className="text-gray-600 mb-4">
            Template: {templates[selectedTemplate].title}
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 whitespace-pre-line text-gray-800">
            {templates[selectedTemplate].message}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Kirim ke Customer
          </h3>

          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.invoice}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold text-gray-900">
                    {service.customer}
                  </h4>
                  <p className="text-gray-700">
                    {service.invoice} · {service.device}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {service.status}
                  </p>
                </div>

                <button
                  onClick={() => sendTemplate(service)}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Kirim WA
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
