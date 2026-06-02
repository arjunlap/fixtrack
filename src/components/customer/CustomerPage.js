"use client";

import { useEffect, useState } from "react";
import { formatRupiah, openWhatsApp } from "@/lib/utils";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadCustomers() {
    const res = await fetch("/api/customers");
    const data = await res.json();
    const safeData = Array.isArray(data) ? data : [];

    setCustomers(safeData);
    setSelectedCustomer(safeData[0] || null);
    setLoading(false);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  if (loading) return <div className="text-gray-600">Loading customer...</div>;

  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-gray-600">
        Belum ada customer. Customer akan otomatis muncul setelah service baru dibuat.
      </div>
    );
  }

  const totalTransaction = selectedCustomer?.services?.reduce((sum, service) => sum + Number(service.cost || 0), 0) || 0;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Profile</h3>
        <div className="space-y-4">
          {customers.map((customer) => {
            const active = selectedCustomer?.id === customer.id;
            return (
              <button key={customer.id} onClick={() => setSelectedCustomer(customer)} className={`w-full text-left rounded-xl shadow p-5 ${active ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-50"}`}>
                <h4 className="font-bold text-lg">{customer.name}</h4>
                <p className={active ? "text-gray-200" : "text-gray-700"}>{customer.phone}</p>
                <p className={active ? "text-gray-300 text-sm" : "text-gray-600 text-sm"}>{customer.services?.length || 0} service</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="col-span-2 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{selectedCustomer?.name}</h3>
            <p className="text-gray-600">Profil customer otomatis dari database.</p>
          </div>
          <button onClick={() => openWhatsApp({ customer: selectedCustomer?.name, wa: selectedCustomer?.phone })} className="bg-green-600 text-white px-4 py-2 rounded-xl h-fit">Chat WA</button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Info label="WhatsApp" value={selectedCustomer?.phone} />
          <Info label="Alamat" value={selectedCustomer?.address} />
          <Info label="Jumlah Service" value={selectedCustomer?.services?.length || 0} />
          <Info label="Total Transaksi" value={formatRupiah(totalTransaction)} />
          <Info label="Service Terakhir" value={selectedCustomer?.services?.[0]?.invoice} />
          <Info label="Perangkat Terakhir" value={selectedCustomer?.services?.[0]?.device} />
        </div>

        <h4 className="text-xl font-bold text-gray-900 mb-4">Riwayat Service</h4>
        <div className="space-y-3">
          {selectedCustomer?.services?.map((service) => (
            <div key={service.id} className="border rounded-xl p-4 flex justify-between items-center">
              <div>
                <h5 className="font-bold text-gray-900">{service.invoice}</h5>
                <p className="text-gray-700">{service.brand} {service.device}</p>
                <p className="text-sm text-gray-600">{service.issue}</p>
              </div>
              <div className="text-right">
                <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">{service.status}</span>
                <p className="font-bold text-gray-900 mt-2">{service.currency || "IDR"} {Number(service.cost || 0).toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
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
