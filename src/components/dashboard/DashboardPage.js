"use client";

import { Wrench, Clock, CheckCircle, Wallet } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import { parseRupiah, formatRupiah } from "@/lib/utils";

export default function Dashboard({ services }) {
  const proses = services.filter((item) => item.status === "PROSES").length;
  const selesai = services.filter((item) => item.status === "SELESAI").length;
  const omzet = services.reduce((sum, item) => sum + parseRupiah(item.cost), 0);

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard title="Service Hari Ini" value={services.length} icon={<Wrench />} />
      <StatCard title="Dalam Proses" value={proses} icon={<Clock />} />
      <StatCard title="Selesai" value={selesai} icon={<CheckCircle />} />
      <StatCard title="Omzet Hari Ini" value={formatRupiah(omzet)} icon={<Wallet />} />
    </div>
  );
}
