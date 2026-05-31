"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import DashboardPage from "@/components/dashboard/DashboardPage";
import ServicePage from "@/components/service/ServicePage";
import CustomerPage from "@/components/customer/CustomerPage";
import InventoryPage from "@/components/inventory/InventoryPage";
import TechnicianPage from "@/components/technician/TechnicianPage";
import FinancePage from "@/components/finance/FinancePage";
import MarketingPage from "@/components/marketing/MarketingPage";
import SettingsPage from "@/components/settings/SettingsPage";

import {
  initialServices,
  initialParts,
  initialTechnicians,
} from "@/data/initialData";

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [services, setServices] = useState(initialServices);
  const [parts, setParts] = useState(initialParts);
  const [technicians, setTechnicians] = useState(initialTechnicians);

  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-900">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">{activeMenu}</h2>

        <p className="text-gray-600 mb-8">
          {activeMenu === "Dashboard"
            ? "Ringkasan aktivitas service hari ini."
            : `Halaman ${activeMenu}`}
        </p>

        {activeMenu === "Dashboard" && <DashboardPage services={services} />}

        {activeMenu === "Service" && (
          <ServicePage services={services} setServices={setServices} />
        )}

        {activeMenu === "Customer" && <CustomerPage services={services} />}

        {activeMenu === "Inventaris" && (
          <InventoryPage parts={parts} setParts={setParts} />
        )}

        {activeMenu === "Teknisi" && (
          <TechnicianPage
            services={services}
            technicians={technicians}
            setTechnicians={setTechnicians}
          />
        )}

        {activeMenu === "Keuangan" && <FinancePage services={services} />}

        {activeMenu === "Marketing" && <MarketingPage services={services} />}

        {activeMenu === "Pengaturan" && <SettingsPage />}
      </main>
    </div>
  );
}
