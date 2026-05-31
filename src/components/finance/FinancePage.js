"use client";

import { Wallet, TrendingUp, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import FinanceRow from "@/components/shared/FinanceRow";
import { parseRupiah, formatRupiah } from "@/lib/utils";

export default function FinancePage({ services }) {
  const income = services.reduce(
    (sum, service) => sum + parseRupiah(service.cost),
    0
  );

  const partExpense = services.reduce(
    (sum, service) => sum + parseRupiah(service.partCost),
    0
  );

  const operationalExpense = 250000;
  const totalExpense = partExpense + operationalExpense;
  const profit = income - totalExpense;

  const receivable = services
    .filter((service) => service.status !== "DIAMBIL")
    .reduce((sum, service) => sum + parseRupiah(service.cost), 0);

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Pendapatan"
          value={formatRupiah(income)}
          icon={<Wallet />}
        />

        <StatCard
          title="Pengeluaran"
          value={formatRupiah(totalExpense)}
          icon={<TrendingUp />}
        />

        <StatCard
          title="Profit"
          value={formatRupiah(profit)}
          icon={<CheckCircle />}
        />

        <StatCard
          title="Piutang Service"
          value={formatRupiah(receivable)}
          icon={<Clock />}
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold text-gray-900 mb-3">Ringkasan Kas</h3>

          <div className="space-y-3">
            <FinanceRow label="Pendapatan Service" value={formatRupiah(income)} />
            <FinanceRow label="Modal Sparepart" value={formatRupiah(partExpense)} />
            <FinanceRow label="Operasional" value={formatRupiah(operationalExpense)} />
            <FinanceRow label="Total Pengeluaran" value={formatRupiah(totalExpense)} />
            <FinanceRow label="Profit Bersih" value={formatRupiah(profit)} strong />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold text-gray-900 mb-3">Status Pembayaran</h3>

          <div className="space-y-3">
            <FinanceRow
              label="Sudah Diambil"
              value={
                services.filter((service) => service.status === "DIAMBIL").length
              }
            />
            <FinanceRow
              label="Belum Diambil"
              value={
                services.filter((service) => service.status !== "DIAMBIL").length
              }
            />
            <FinanceRow label="Estimasi Piutang" value={formatRupiah(receivable)} strong />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold text-gray-900 mb-3">Catatan</h3>

          <p className="text-gray-600 text-sm">
            Modul ini masih otomatis menghitung dari data service. Nanti saat
            database dipasang, transaksi akan dipisah menjadi pendapatan,
            pengeluaran, hutang/piutang, dan laporan profit harian.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-xl font-bold text-gray-900">Riwayat Transaksi Service</h3>
          <p className="text-gray-600">Otomatis dari invoice service.</p>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Invoice</th>
              <th>Customer</th>
              <th>Perangkat</th>
              <th>Status</th>
              <th>Pendapatan</th>
              <th>Modal Part</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => {
              const revenue = parseRupiah(service.cost);
              const cost = parseRupiah(service.partCost);
              const itemProfit = revenue - cost;

              return (
                <tr key={service.invoice} className="border-t">
                  <td className="p-4 font-bold text-gray-900">
                    {service.invoice}
                  </td>
                  <td className="text-gray-700">{service.customer}</td>
                  <td className="text-gray-700">{service.device}</td>
                  <td>
                    <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">
                      {service.status}
                    </span>
                  </td>
                  <td className="text-gray-900 font-semibold">
                    {formatRupiah(revenue)}
                  </td>
                  <td className="text-gray-700">{formatRupiah(cost)}</td>
                  <td
                    className={`font-bold ${
                      itemProfit >= 0 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {formatRupiah(itemProfit)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
