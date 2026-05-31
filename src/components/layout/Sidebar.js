"use client";

import {
  Home,
  Wrench,
  Users,
  Package,
  UserCog,
  Wallet,
  TrendingUp,
  Settings,
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

export default function Sidebar({ activeMenu, setActiveMenu }) {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">FixTrack</h1>
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
  );
}
