"use client";

import PatternLock from "@/components/shared/PatternLock";

export default function InvoiceModal({ service, onClose }) {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 print:static print:bg-white print:p-0">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto print:shadow-none print:rounded-none print:max-w-full print:max-h-full">
        <div className="flex justify-between items-center border-b p-5 print:hidden">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Preview Invoice</h3>
            <p className="text-gray-600">Invoice {service.invoice}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-gray-900 text-white"
            >
              Print / PDF
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900"
            >
              Tutup
            </button>
          </div>
        </div>

        <div className="p-8 text-gray-900 print:p-6">
          <div className="border rounded-2xl p-6 print:border print:rounded-none">
            <div className="flex justify-between border-b pb-5 mb-5">
              <div>
                <h1 className="text-3xl font-bold">FixTrack</h1>
                <p className="text-gray-600">Nota Service HP</p>
                <p className="text-sm text-gray-500">Repair Management System</p>
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-bold">{service.invoice}</h2>
                <p className="text-gray-600">Status: {service.status}</p>
                <p className="text-gray-600">
                  Tanggal: {new Date().toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <h3 className="font-bold mb-2">Data Customer</h3>
                <p>Nama: {service.customer}</p>
                <p>WhatsApp: {service.wa}</p>
                <p>Alamat: {service.address || "-"}</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Data Perangkat</h3>
                <p>Perangkat: {service.device}</p>
                <p>IMEI: {service.imei || "-"}</p>
                <p>Warna: {service.color || "-"}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-gray-50 rounded-xl p-4 print:border">
                <h3 className="font-bold mb-3">Pola Kunci</h3>
                <PatternLock pattern={service.lockPattern || []} size={120} />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 print:border">
                <h3 className="font-bold mb-2">Keluhan Customer</h3>
                <p>{service.complaint || "-"}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 print:border">
                <h3 className="font-bold mb-2">Diagnosa Teknisi</h3>
                <p>{service.diagnosis || "-"}</p>
              </div>
            </div>

            <div className="border-t pt-5 mb-8">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Biaya</span>
                <span>{service.cost}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-12 text-center">
              <div>
                <div className="h-20"></div>
                <div className="border-t pt-2">Customer</div>
              </div>

              <div>
                <div className="h-20"></div>
                <div className="border-t pt-2">Admin</div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-8">
              Barang yang tidak diambil lebih dari 30 hari di luar tanggung jawab toko.
              Garansi berlaku sesuai ketentuan service. Simpan invoice ini sebagai bukti
              pengambilan dan klaim garansi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
