"use client";

import { useEffect, useState } from "react";
import ServiceForm from "@/components/service/ServiceForm";

const WORKFLOW_STATUSES = [
  "ANTRI",
  "DIAGNOSA",
  "MENUNGGU PART",
  "PROSES",
  "QC",
  "SELESAI",
  "DIAMBIL",
  "BATAL",
  "REFUND",
];

const STATUS_STYLE = {
  ANTRI: "bg-gray-100 text-gray-800",
  DIAGNOSA: "bg-blue-100 text-blue-800",
  "MENUNGGU PART": "bg-yellow-100 text-yellow-800",
  PROSES: "bg-purple-100 text-purple-800",
  QC: "bg-orange-100 text-orange-800",
  SELESAI: "bg-green-100 text-green-800",
  DIAMBIL: "bg-emerald-200 text-emerald-900",
  BATAL: "bg-red-100 text-red-800",
  REFUND: "bg-rose-200 text-rose-900",
};

const STATUS_BUTTON_STYLE = {
  ANTRI: "bg-gray-700 hover:bg-gray-800",
  DIAGNOSA: "bg-blue-600 hover:bg-blue-700",
  "MENUNGGU PART": "bg-yellow-500 hover:bg-yellow-600",
  PROSES: "bg-purple-600 hover:bg-purple-700",
  QC: "bg-orange-500 hover:bg-orange-600",
  SELESAI: "bg-green-600 hover:bg-green-700",
  DIAMBIL: "bg-emerald-700 hover:bg-emerald-800",
  BATAL: "bg-red-600 hover:bg-red-700",
  REFUND: "bg-rose-700 hover:bg-rose-800",
};

function formatMoney(value, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ServicePage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadServices() {
    const res = await fetch("/api/services");
    const data = await res.json();
    const safeData = Array.isArray(data) ? data : [];

    setServices(safeData);
    setSelectedService(safeData[0] || null);
    setLoading(false);
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function addService(formData) {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const created = await res.json();

    if (!res.ok) {
      alert(`${created?.error || "Gagal menyimpan service"}\n${created?.detail || ""}`);
      return;
    }

    setServices((prev) => [created, ...prev]);
    setSelectedService(created);
    setShowForm(false);
  }

  async function updateStatus(status) {
    if (!selectedService?.id) return;

    const res = await fetch("/api/services", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedService.id,
        status,
      }),
    });

    const updated = await res.json();

    if (!res.ok) {
      alert(`${updated?.error || "Gagal update status"}\n${updated?.detail || ""}`);
      return;
    }

    setServices((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );

    setSelectedService(updated);
  }

  async function deleteService() {
    if (!selectedService?.id) return;

    if (!confirm(`Hapus ${selectedService.invoice || "service ini"}?`)) return;

    await fetch(`/api/services?id=${selectedService.id}`, {
      method: "DELETE",
    });

    const remaining = services.filter((item) => item.id !== selectedService.id);
    setServices(remaining);
    setSelectedService(remaining[0] || null);
  }

  if (loading) {
    return <div className="text-gray-600">Loading service...</div>;
  }

  return (
    <div>
      {showForm && (
        <ServiceForm onClose={() => setShowForm(false)} onSave={addService} />
      )}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Daftar Service</h3>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              + Baru
            </button>
          </div>

          <div className="space-y-4">
            {services.length === 0 && (
              <div className="bg-white rounded-xl p-6 text-gray-600 shadow">
                Belum ada data service.
              </div>
            )}

            {services.map((item) => {
              const active = selectedService?.id === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedService(item)}
                  className={`w-full text-left rounded-xl p-5 shadow ${
                    active ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-lg">
                        {item.invoice || "Tanpa Invoice"}
                      </h4>

                      <p>{item.customerName || "Tanpa Nama"}</p>

                      <p className={active ? "text-gray-300" : "text-gray-600"}>
                        {item.brand || "-"} {item.device || ""}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold h-fit ${
                        active ? "bg-white text-gray-900" : STATUS_STYLE[item.status] || "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {item.status || "ANTRI"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-2">
          {!selectedService ? (
            <div className="bg-white rounded-xl p-8 shadow text-gray-600">
              Pilih service atau tambah service baru.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedService.invoice || "Tanpa Invoice"}
                  </h3>
                  <p className="text-gray-600">Detail Service</p>
                </div>

                <span
                  className={`px-4 py-2 rounded-xl h-fit font-semibold ${
                    STATUS_STYLE[selectedService.status] || "bg-gray-100 text-gray-900"
                  }`}
                >
                  {selectedService.status || "ANTRI"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Info label="Customer" value={selectedService.customerName} />
                <Info label="WhatsApp" value={selectedService.customerPhone} />
                <Info label="Alamat" value={selectedService.address} />
                <Info label="Brand" value={selectedService.brand} />
                <Info label="Device" value={selectedService.device} />
                <Info label="IMEI" value={selectedService.imei} />
                <Info label="Warna" value={selectedService.color} />
                <Info label="Kerusakan" value={selectedService.issue} />
                <Info label="Diagnosa" value={selectedService.diagnosis} />
                <Info
                  label="Biaya"
                  value={formatMoney(selectedService.cost, selectedService.currency || "IDR")}
                />
                <Info label="Teknisi" value={selectedService.technician} />
                <Info label="Pola / PIN" value={selectedService.lockPattern} />
                <Info label="Tracking Code" value={selectedService.trackingCode} />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() =>
  window.open(
    `/invoice/${selectedService.trackingCode}`,
    "_blank"
  )
}
                  className="bg-gray-900 text-white px-4 py-2 rounded-xl"
                >
                  Cetak Invoice
                </button>

                <button
                  onClick={() => {
                    const text = `Halo ${selectedService.customerName}, service ${selectedService.invoice} status saat ini: ${selectedService.status}. Tracking: ${selectedService.trackingCode}`;
                    const phone = String(selectedService.customerPhone || "").replace(/^0/, "62");
                    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Chat WA
                </button>
              </div>

              <div className="mt-6">
                <h4 className="font-bold text-gray-900 mb-3">
                  Update Status
                </h4>

                <div className="flex flex-wrap gap-3">
                  {WORKFLOW_STATUSES.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(status)}
                      className={`text-white px-4 py-2 rounded-xl ${
                        STATUS_BUTTON_STYLE[status] || "bg-gray-900"
                      }`}
                    >
                      {status}
                    </button>
                  ))}

                  <button
                    onClick={deleteService}
                    className="bg-red-700 text-white px-4 py-2 rounded-xl"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-4">
                  Timeline Status
                </h4>

                {(!selectedService.timeline || selectedService.timeline.length === 0) && (
                  <p className="text-gray-600">Belum ada riwayat status.</p>
                )}

                <div className="space-y-3">
                  {(selectedService.timeline || []).map((log, index) => (
                    <div
                      key={log.id || `${log.status}-${index}`}
                      className="flex gap-3 items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>

                      <div>
                        <div className="font-bold text-gray-900">
                          {log.status}
                        </div>
                        <div className="text-sm text-gray-600">
                          {log.note || "-"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(log.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-bold text-gray-900">{value || "-"}</p>
    </div>
  );
}
