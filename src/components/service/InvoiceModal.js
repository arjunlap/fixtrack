"use client";

import { useState } from "react";

function formatMoney(value, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return new Date().toLocaleDateString("id-ID");

  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function InvoiceModal({ service, onClose }) {
  const [printMode, setPrintMode] = useState("a4");

  function handlePrint(mode = printMode) {
    setPrintMode(mode);

    setTimeout(() => {
      window.print();
    }, 100);
  }

  if (!service) return null;

  const printClass =
    printMode === "thermal58"
      ? "print-thermal-58"
      : printMode === "thermal80"
      ? "print-thermal-80"
      : "print-a4";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6 no-print:bg-black/50 print:static print:bg-white print:p-0">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto print:overflow-visible print:shadow-none print:rounded-none print:max-w-none print:max-h-none">
        <div className="no-print flex items-center justify-between border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Preview Invoice</h3>
            <p className="text-gray-600">
              {service.invoice || "Tanpa Invoice"} · {service.customerName || "-"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePrint("a4")}
              className="bg-gray-900 text-white px-4 py-2 rounded-xl"
            >
              Cetak A4
            </button>

            <button
              onClick={() => handlePrint("thermal58")}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Thermal 58mm
            </button>

            <button
              onClick={() => handlePrint("thermal80")}
              className="bg-blue-700 text-white px-4 py-2 rounded-xl"
            >
              Thermal 80mm
            </button>

            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-900 px-4 py-2 rounded-xl"
            >
              Tutup
            </button>
          </div>
        </div>

        <div className={`print-area ${printClass} p-8 print:p-0 text-gray-900`}>
          {printMode === "a4" ? (
            <A4Invoice service={service} />
          ) : (
            <ThermalInvoice service={service} mode={printMode} />
          )}
        </div>
      </div>
    </div>
  );
}

function A4Invoice({ service }) {
  return (
    <div className="border rounded-2xl p-6 print:border print:rounded-none bg-white">
      <div className="flex justify-between border-b pb-5 mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">FixTrack</h1>
          <p className="text-gray-600">Nota Service HP</p>
          <p className="text-sm text-gray-500">Repair Management System</p>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-black">{service.invoice || "-"}</h2>
          <p className="text-gray-600">Tanggal: {formatDate(service.createdAt)}</p>
          <p className="font-semibold mt-1">Status: {service.status || "ANTRI"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <section>
          <h3 className="font-bold text-lg mb-3 border-b pb-2">Data Customer</h3>
          <InvoiceRow label="Nama" value={service.customerName} />
          <InvoiceRow label="WhatsApp" value={service.customerPhone} />
          <InvoiceRow label="Alamat" value={service.address} />
        </section>

        <section>
          <h3 className="font-bold text-lg mb-3 border-b pb-2">Data Perangkat</h3>
          <InvoiceRow label="Brand" value={service.brand} />
          <InvoiceRow label="Model / Tipe" value={service.device} />
          <InvoiceRow label="IMEI" value={service.imei} />
          <InvoiceRow label="Warna" value={service.color} />
        </section>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <section className="bg-gray-50 rounded-xl p-4 print:border">
          <h3 className="font-bold mb-2">Keluhan / Kerusakan</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{service.issue || "-"}</p>
        </section>

        <section className="bg-gray-50 rounded-xl p-4 print:border">
          <h3 className="font-bold mb-2">Diagnosa Teknisi</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{service.diagnosis || "-"}</p>
        </section>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <InfoBox label="Teknisi" value={service.technician || "-"} />
        <InfoBox label="Pola / PIN" value={service.lockPattern || "-"} />
        <InfoBox label="Tracking Code" value={service.trackingCode || "-"} />
      </div>

      <div className="border-t border-b py-5 mb-8">
        <div className="flex justify-between text-2xl font-black">
          <span>Total Biaya</span>
          <span>{formatMoney(service.cost, service.currency || "IDR")}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 mt-12 text-center">
        <div>
          <div className="h-24"></div>
          <div className="border-t pt-2 font-semibold">Customer</div>
        </div>

        <div>
          <div className="h-24"></div>
          <div className="border-t pt-2 font-semibold">Admin / Teknisi</div>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-500 leading-relaxed">
        <p>
          Simpan nota ini sebagai bukti pengambilan barang dan klaim garansi.
          Barang yang tidak diambil lebih dari 30 hari di luar tanggung jawab toko.
        </p>
        <p>
          Garansi berlaku sesuai ketentuan toko dan tidak berlaku untuk kerusakan akibat
          cairan, jatuh, terbakar, salah penggunaan, atau bongkar di tempat lain.
        </p>
      </div>
    </div>
  );
}

function ThermalInvoice({ service, mode }) {
  return (
    <div className="bg-white text-black leading-tight">
      <div className="text-center border-b border-dashed border-black pb-2 mb-2">
        <h1 className="text-lg font-black">FIXTRACK</h1>
        <p className="text-xs">NOTA SERVICE HP</p>
        <p className="text-xs">Repair Management System</p>
      </div>

      <div className="text-xs space-y-1 border-b border-dashed border-black pb-2 mb-2">
        <ThermalRow label="Invoice" value={service.invoice} />
        <ThermalRow label="Tanggal" value={formatDate(service.createdAt)} />
        <ThermalRow label="Status" value={service.status || "ANTRI"} />
        <ThermalRow label="Tracking" value={service.trackingCode} />
      </div>

      <div className="text-xs space-y-1 border-b border-dashed border-black pb-2 mb-2">
        <p className="font-bold">CUSTOMER</p>
        <ThermalRow label="Nama" value={service.customerName} />
        <ThermalRow label="WA" value={service.customerPhone} />
        <ThermalRow label="Alamat" value={service.address} />
      </div>

      <div className="text-xs space-y-1 border-b border-dashed border-black pb-2 mb-2">
        <p className="font-bold">PERANGKAT</p>
        <ThermalRow label="Brand" value={service.brand} />
        <ThermalRow label="Tipe" value={service.device} />
        <ThermalRow label="IMEI" value={service.imei} />
        <ThermalRow label="Warna" value={service.color} />
      </div>

      <div className="text-xs border-b border-dashed border-black pb-2 mb-2">
        <p className="font-bold">KELUHAN</p>
        <p>{service.issue || "-"}</p>
      </div>

      <div className="text-xs border-b border-dashed border-black pb-2 mb-2">
        <p className="font-bold">DIAGNOSA</p>
        <p>{service.diagnosis || "-"}</p>
      </div>

      <div className="text-xs space-y-1 border-b border-dashed border-black pb-2 mb-2">
        <ThermalRow label="Teknisi" value={service.technician} />
        <ThermalRow label="Pola/PIN" value={service.lockPattern} />
      </div>

      <div className="flex justify-between text-sm font-black border-b border-dashed border-black pb-2 mb-3">
        <span>TOTAL</span>
        <span>{formatMoney(service.cost, service.currency || "IDR")}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-xs mt-6">
        <div>
          <div className="h-12"></div>
          <div className="border-t border-black pt-1">Customer</div>
        </div>

        <div>
          <div className="h-12"></div>
          <div className="border-t border-black pt-1">Admin</div>
        </div>
      </div>

      <div className="text-center text-[10px] mt-4">
        <p>Terima kasih.</p>
        <p>Simpan nota ini sebagai bukti service.</p>
        <p>Dicetak dari FixTrack</p>
      </div>
    </div>
  );
}

function InvoiceRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-1 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-right">{value || "-"}</span>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 print:border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold text-gray-900">{value || "-"}</p>
    </div>
  );
}

function ThermalRow({ label, value }) {
  return (
    <div className="flex justify-between gap-2">
      <span>{label}</span>
      <span className="font-bold text-right break-all">{value || "-"}</span>
    </div>
  );
}
