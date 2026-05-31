"use client";

import { useMemo, useState } from "react";
import Info from "@/components/shared/Info";
import { openWhatsApp, parseRupiah, formatRupiah } from "@/lib/utils";

export default function CustomerPage({ services }) {
  const customers = useMemo(() => {
    const map = new Map();

    services.forEach((service) => {
      const key = service.wa || service.customer;

      if (!map.has(key)) {
        map.set(key, {
          name: service.customer,
          wa: service.wa,
          address: service.address,
          totalService: 0,
          totalTransaction: 0,
          history: [],
        });
      }

      const customer = map.get(key);

      customer.totalService += 1;
      customer.totalTransaction += parseRupiah(service.cost);
      customer.history.push(service);
    });

    return Array.from(map.values());
  }, [services]);

  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Profile
        </h3>

        <div className="space-y-4">
          {customers.map((customer) => {
            const active = selectedCustomer?.wa === customer.wa;

            return (
              <button
                key={customer.wa}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full text-left rounded-xl shadow p-5 ${
                  active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
                }`}
              >
                <h4 className={`font-bold text-lg ${active ? "text-white" : "text-gray-900"}`}>
                  {customer.name}
                </h4>
                <p className={active ? "text-gray-200" : "text-gray-700"}>
                  {customer.wa}
                </p>
                <p className={active ? "text-gray-300 text-sm" : "text-gray-600 text-sm"}>
                  {customer.totalService} service
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedCustomer && (
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCustomer.name}
              </h3>
              <p className="text-gray-600">Profil customer otomatis dari data service.</p>
            </div>

            <button
              onClick={() =>
                openWhatsApp({
                  customer: selectedCustomer.name,
                  wa: selectedCustomer.wa,
                  invoice: "-",
                  device: "-",
                  status: "-",
                  complaint: "-",
                  cost: "-",
                })
              }
              className="bg-green-600 text-white px-4 py-2 rounded-xl h-fit"
            >
              Chat WA
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Info label="WhatsApp" value={selectedCustomer.wa} />
            <Info label="Alamat" value={selectedCustomer.address} />
            <Info label="Jumlah Service" value={selectedCustomer.totalService} />
            <Info
              label="Total Transaksi"
              value={formatRupiah(selectedCustomer.totalTransaction)}
            />
            <Info
              label="Service Terakhir"
              value={selectedCustomer.history[0]?.invoice}
            />
            <Info
              label="Perangkat Terakhir"
              value={selectedCustomer.history[0]?.device}
            />
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">
            Riwayat Service
          </h4>

          <div className="space-y-3">
            {selectedCustomer.history.map((service) => (
              <div
                key={service.invoice}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h5 className="font-bold text-gray-900">{service.invoice}</h5>
                  <p className="text-gray-700">{service.device}</p>
                  <p className="text-sm text-gray-600">{service.complaint}</p>
                </div>

                <div className="text-right">
                  <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">
                    {service.status}
                  </span>
                  <p className="font-bold text-gray-900 mt-2">{service.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
