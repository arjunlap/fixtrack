"use client";

import { useState } from "react";
import { Settings, Wrench, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import Input from "@/components/shared/Input";
import Info from "@/components/shared/Info";
import { statusList } from "@/data/initialData";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    shopName: "FixTrack Service Center",
    ownerName: "Owner FixTrack",
    phone: "081234567890",
    address: "Bekasi Selatan",
    invoicePrefix: "INV",
    warrantyDays: "30",
    adminEmail: "admin@fixtrack.local",
    whatsappGateway: "Manual WA Link",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setSettings({
      ...settings,
      [name]: value,
    });
  }

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Status Aplikasi" value="MVP Local" icon={<Settings />} />
        <StatCard title="Invoice Prefix" value={settings.invoicePrefix} icon={<Wrench />} />
        <StatCard title="Garansi Default" value={`${settings.warrantyDays} hari`} icon={<CheckCircle />} />
        <StatCard title="WA Gateway" value="Manual" icon={<Clock />} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-5 col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Pengaturan Toko
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nama Toko"
              name="shopName"
              value={settings.shopName}
              onChange={handleChange}
            />

            <Input
              label="Nama Owner"
              name="ownerName"
              value={settings.ownerName}
              onChange={handleChange}
            />

            <Input
              label="No WhatsApp Toko"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />

            <Input
              label="Alamat Toko"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />

            <Input
              label="Prefix Invoice"
              name="invoicePrefix"
              value={settings.invoicePrefix}
              onChange={handleChange}
            />

            <Input
              label="Garansi Default Hari"
              name="warrantyDays"
              value={settings.warrantyDays}
              onChange={handleChange}
            />

            <Input
              label="Email Admin"
              name="adminEmail"
              value={settings.adminEmail}
              onChange={handleChange}
            />

            <Input
              label="WhatsApp Gateway"
              name="whatsappGateway"
              value={settings.whatsappGateway}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => alert("Pengaturan tersimpan sementara di React state. Database belum dipasang.")}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Workflow Service
          </h3>

          <div className="space-y-2">
            {statusList.map((status, index) => (
              <div
                key={status}
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
              >
                <span className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">
                  {index + 1}
                </span>

                <span className="font-semibold text-gray-900">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Ringkasan Sistem
        </h3>

        <div className="grid grid-cols-4 gap-4">
          <Info label="Nama Aplikasi" value="FixTrack 2.0" />
          <Info label="Mode" value="Localhost MVP" />
          <Info label="Frontend" value="Next.js + Tailwind" />
          <Info label="Database" value="Belum dipasang" />
          <Info label="Login" value="Belum dipasang" />
          <Info label="Multi Tenant" value="Belum dipasang" />
          <Info label="Invoice" value="Print Browser" />
          <Info label="WhatsApp" value="Manual Link" />
        </div>
      </div>
    </div>
  );
}
