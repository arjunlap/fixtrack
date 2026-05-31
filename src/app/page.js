"use client";

import { useState } from "react";
import {
  Home,
  Wrench,
  Users,
  Package,
  UserCog,
  Wallet,
  TrendingUp,
  Settings,
  Clock,
  CheckCircle,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: Home },
  { name: "Service", icon: Wrench },
  { name: "Customer", icon: Users },
  { name: "Inventaris", icon: Package },
  { name: "Teknisi", icon: UserCog },
  { name: "Keuangan", icon: Wallet },
  { name: "Marketing", icon: TrendingUp },
  { name: "Pengaturan", icon: Settings },
];

const services = [
  {
    invoice: "INV001",
    customer: "Budi Santoso",
    wa: "081234567890",
    address: "Bekasi Selatan",
    device: "Samsung A13",
    imei: "352099112233441",
    color: "Black",
    issue: "LCD pecah",
    complaint: "HP jatuh, layar bergaris hijau",
    diagnosis: "LCD rusak, frame aman",
    status: "ANTRI",
    cost: "Rp 450.000",
  },
  {
    invoice: "INV002",
    customer: "Siti Aminah",
    wa: "082211122233",
    address: "Rawalumbu",
    device: "iPhone XR",
    imei: "357222334455667",
    color: "Red",
    issue: "Baterai boros",
    complaint: "Baterai cepat habis",
    diagnosis: "Battery health 72%, perlu ganti baterai",
    status: "PROSES",
    cost: "Rp 380.000",
  },
  {
    invoice: "INV003",
    customer: "Agus",
    wa: "085733344455",
    address: "Summarecon Bekasi",
    device: "Redmi Note 10",
    imei: "861998887776665",
    color: "Blue",
    issue: "Konektor cas longgar",
    complaint: "Kadang masuk charger kadang tidak",
    diagnosis: "Sub board charger perlu diganti",
    status: "SELESAI",
    cost: "Rp 220.000",
  },
];

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white border-r p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">FixTrack</h1>
          <p className="text-sm text-gray-500">Repair SaaS</p>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                  activeMenu === item.name
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-2">{activeMenu}</h2>

        <p className="text-gray-500 mb-8">
          {activeMenu === "Dashboard"
            ? "Ringkasan aktivitas service hari ini."
            : `Halaman ${activeMenu}`}
        </p>

        {activeMenu === "Dashboard" && <Dashboard />}
        {activeMenu === "Service" && <ServicePage />}

        {activeMenu !== "Dashboard" && activeMenu !== "Service" && (
          <div className="bg-white rounded-xl p-8 shadow">
            <h3 className="text-2xl font-bold mb-2">Modul {activeMenu}</h3>
            <p className="text-gray-500">
              Halaman {activeMenu} akan dibangun berikutnya.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard title="Service Hari Ini" value="12" icon={<Wrench />} />
      <StatCard title="Dalam Proses" value="5" icon={<Clock />} />
      <StatCard title="Selesai" value="4" icon={<CheckCircle />} />
      <StatCard title="Omzet Hari Ini" value="Rp 2.350.000" icon={<Wallet />} />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <div className="text-gray-700">{icon}</div>
      <h3 className="mt-3 text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ServicePage() {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Daftar Service</h3>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            + Baru
          </button>
        </div>

        <div className="space-y-4">
          {services.map((item) => (
            <button
              key={item.invoice}
              onClick={() => setSelectedService(item)}
              className={`w-full text-left rounded-xl shadow p-5 transition ${
                selectedService.invoice === item.invoice
                  ? "bg-gray-900 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-bold text-lg">{item.invoice}</h4>
                  <p
                    className={
                      selectedService.invoice === item.invoice
                        ? "text-gray-200"
                        : "text-gray-600"
                    }
                  >
                    {item.customer}
                  </p>
                  <p
                    className={
                      selectedService.invoice === item.invoice
                        ? "text-gray-300 text-sm"
                        : "text-gray-500 text-sm"
                    }
                  >
                    {item.device}
                  </p>
                </div>

                <span
                  className={
                    selectedService.invoice === item.invoice
                      ? "bg-white text-gray-900 h-fit px-3 py-1 rounded-lg text-sm"
                      : "bg-gray-100 h-fit px-3 py-1 rounded-lg text-sm"
                  }
                >
                  {item.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-2 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold">{selectedService.invoice}</h3>
            <p className="text-gray-500">Detail Service</p>
          </div>

          <span className="bg-gray-100 h-fit px-4 py-2 rounded-xl">
            {selectedService.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Info label="Customer" value={selectedService.customer} />
          <Info label="WhatsApp" value={selectedService.wa} />
          <Info label="Alamat" value={selectedService.address} />
          <Info label="Perangkat" value={selectedService.device} />
          <Info label="IMEI" value={selectedService.imei} />
          <Info label="Warna" value={selectedService.color} />
          <Info label="Kerusakan" value={selectedService.issue} />
          <Info label="Biaya" value={selectedService.cost} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold mb-2">Keluhan Customer</h4>
            <p className="text-gray-600">{selectedService.complaint}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold mb-2">Diagnosa Teknisi</h4>
            <p className="text-gray-600">{selectedService.diagnosis}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
            Chat WA
          </button>

          <button className="bg-gray-900 text-white px-4 py-2 rounded-xl">
            Cetak Invoice
          </button>

          <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}