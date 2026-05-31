"use client";

import { useState } from "react";
import Info from "@/components/shared/Info";
import PatternLock from "@/components/shared/PatternLock";
import ServiceForm from "@/components/service/ServiceForm";
import InvoiceModal from "@/components/service/InvoiceModal";
import TrackingModal from "@/components/service/TrackingModal";
import StatusModal from "@/components/service/StatusModal";
import { openWhatsApp } from "@/lib/utils";

export default function ServicePage({ services, setServices }) {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [showForm, setShowForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  function addService(newService) {
    const nextNumber = services.length + 1;
    const invoice = `INV${String(nextNumber).padStart(3, "0")}`;

    const serviceData = {
      invoice,
      customer: newService.customer,
      wa: newService.wa,
      address: newService.address,
      brand: newService.brand,
      type: newService.type,
      device: `${newService.brand} ${newService.type}`,
      imei: newService.imei,
      color: newService.color,
      issue: newService.issue,
      complaint: newService.complaint,
      diagnosis: newService.diagnosis || "Belum ada diagnosa teknisi",
      status: "ANTRI",
      technician: newService.technician || "Belum dipilih",
      cost: newService.cost || "Rp 0",
      partCost: newService.partCost || "Rp 0",
      lockPattern: newService.lockPattern,
      timeline: ["Service masuk", "Status ANTRI"],
    };

    const updatedServices = [serviceData, ...services];

    setServices(updatedServices);
    setSelectedService(serviceData);
    setShowForm(false);
  }

  function updateStatus(newStatus) {
    const updatedServices = services.map((item) => {
      if (item.invoice === selectedService.invoice) {
        return {
          ...item,
          status: newStatus,
          timeline: [...item.timeline, `Status berubah ke ${newStatus}`],
        };
      }

      return item;
    });

    const updatedSelected = updatedServices.find(
      (item) => item.invoice === selectedService.invoice
    );

    setServices(updatedServices);
    setSelectedService(updatedSelected);
    setShowStatusModal(false);
  }

  return (
    <div>
      {showForm && (
        <ServiceForm onClose={() => setShowForm(false)} onSave={addService} />
      )}

      {showInvoice && (
        <InvoiceModal
          service={selectedService}
          onClose={() => setShowInvoice(false)}
        />
      )}

      {showTracking && (
        <TrackingModal
          service={selectedService}
          onClose={() => setShowTracking(false)}
        />
      )}

      {showStatusModal && (
        <StatusModal
          currentStatus={selectedService.status}
          onClose={() => setShowStatusModal(false)}
          onUpdate={updateStatus}
        />
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
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
            {services.map((item) => {
              const active = selectedService?.invoice === item.invoice;

              return (
                <button
                  key={item.invoice}
                  onClick={() => setSelectedService(item)}
                  className={`w-full text-left rounded-xl shadow p-5 transition ${
                    active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h4
                        className={`font-bold text-lg ${
                          active ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.invoice}
                      </h4>

                      <p className={active ? "text-gray-100" : "text-gray-800"}>
                        {item.customer}
                      </p>

                      <p
                        className={
                          active
                            ? "text-gray-300 text-sm"
                            : "text-gray-600 text-sm"
                        }
                      >
                        {item.device}
                      </p>
                    </div>

                    <span
                      className={
                        active
                          ? "bg-white text-gray-900 h-fit px-3 py-1 rounded-lg text-sm font-semibold"
                          : "bg-gray-100 text-gray-800 h-fit px-3 py-1 rounded-lg text-sm font-semibold"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedService && (
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedService.invoice}
                </h3>
                <p className="text-gray-600">Detail Service</p>
              </div>

              <span className="bg-gray-100 text-gray-900 h-fit px-4 py-2 rounded-xl font-semibold">
                {selectedService.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Info label="Customer" value={selectedService.customer} />
              <Info label="WhatsApp" value={selectedService.wa} />
              <Info label="Alamat" value={selectedService.address} />
              <Info label="Perangkat" value={selectedService.device} />
              <Info label="IMEI" value={selectedService.imei} />
              <Info label="Teknisi" value={selectedService.technician} />
              <Info label="Kerusakan" value={selectedService.issue} />
              <Info label="Biaya" value={selectedService.cost} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 col-span-1">
                <h4 className="font-bold mb-3 text-gray-900">Pola Kunci</h4>
                <PatternLock pattern={selectedService.lockPattern || []} />
                <p className="text-xs text-gray-500 mt-2">
                  Koordinat: [{(selectedService.lockPattern || []).join(", ")}]
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold mb-2 text-gray-900">Keluhan Customer</h4>
                <p className="text-gray-700">{selectedService.complaint}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold mb-2 text-gray-900">Diagnosa Teknisi</h4>
                <p className="text-gray-700">{selectedService.diagnosis}</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold mb-3 text-gray-900">Timeline</h4>

              <div className="space-y-2">
                {selectedService.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3 text-gray-700">
                    <span className="font-bold">{index + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => openWhatsApp(selectedService)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Chat WA
              </button>

              <button
                onClick={() => setShowInvoice(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded-xl"
              >
                Cetak Invoice
              </button>

              <button
                onClick={() => setShowStatusModal(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
              >
                Update Status
              </button>

              <button
                onClick={() => setShowTracking(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl"
              >
                Lihat Tracking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
