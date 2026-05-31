"use client";

import { useState } from "react";
import Info from "@/components/shared/Info";
import TechnicianForm from "@/components/technician/TechnicianForm";
import { parseRupiah, formatRupiah } from "@/lib/utils";

export default function TechnicianPage({ services, technicians, setTechnicians }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(technicians[0]);

  function addTechnician(newTechnician) {
    const technicianData = {
      ...newTechnician,
      qcRate: Number(newTechnician.qcRate || 100),
    };

    setTechnicians([technicianData, ...technicians]);
    setSelectedTechnician(technicianData);
    setShowForm(false);
  }

  function getStats(name) {
    const techServices = services.filter((service) => service.technician === name);
    const completed = techServices.filter(
      (service) => service.status === "SELESAI" || service.status === "DIAMBIL"
    );

    const revenue = techServices.reduce(
      (sum, service) => sum + parseRupiah(service.cost),
      0
    );

    const partCost = techServices.reduce(
      (sum, service) => sum + parseRupiah(service.partCost),
      0
    );

    return {
      totalService: techServices.length,
      completedService: completed.length,
      revenue,
      profit: revenue - partCost,
    };
  }

  return (
    <div>
      {showForm && (
        <TechnicianForm
          onClose={() => setShowForm(false)}
          onSave={addTechnician}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Manajemen Teknisi</h3>
          <p className="text-gray-600">
            Pantau teknisi aktif, service selesai, omzet, profit, dan QC rate.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          + Teknisi Baru
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          {technicians.map((technician) => {
            const stats = getStats(technician.name);
            const active = selectedTechnician?.name === technician.name;

            return (
              <button
                key={technician.name}
                onClick={() => setSelectedTechnician(technician)}
                className={`w-full text-left rounded-xl shadow p-5 ${
                  active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
                }`}
              >
                <h4 className={`font-bold text-lg ${active ? "text-white" : "text-gray-900"}`}>
                  {technician.name}
                </h4>
                <p className={active ? "text-gray-200" : "text-gray-700"}>
                  {technician.role}
                </p>
                <p className={active ? "text-gray-300 text-sm" : "text-gray-600 text-sm"}>
                  {stats.totalService} service ditangani
                </p>
              </button>
            );
          })}
        </div>

        {selectedTechnician && (
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedTechnician.name}
                </h3>
                <p className="text-gray-600">{selectedTechnician.role}</p>
              </div>

              <span className="bg-green-100 text-green-800 h-fit px-4 py-2 rounded-xl font-semibold">
                {selectedTechnician.status}
              </span>
            </div>

            {(() => {
              const stats = getStats(selectedTechnician.name);

              return (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Info label="Total Service" value={stats.totalService} />
                    <Info label="Service Selesai" value={stats.completedService} />
                    <Info label="Omzet" value={formatRupiah(stats.revenue)} />
                    <Info label="Profit" value={formatRupiah(stats.profit)} />
                    <Info label="QC Rate" value={`${selectedTechnician.qcRate}%`} />
                    <Info label="Status" value={selectedTechnician.status} />
                    <Info label="Role" value={selectedTechnician.role} />
                    <Info
                      label="Rata-rata Profit"
                      value={
                        stats.totalService > 0
                          ? formatRupiah(Math.round(stats.profit / stats.totalService))
                          : formatRupiah(0)
                      }
                    />
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    Service Ditangani
                  </h4>

                  <div className="space-y-3">
                    {services
                      .filter((service) => service.technician === selectedTechnician.name)
                      .map((service) => (
                        <div
                          key={service.invoice}
                          className="border rounded-xl p-4 flex justify-between items-center"
                        >
                          <div>
                            <h5 className="font-bold text-gray-900">
                              {service.invoice}
                            </h5>
                            <p className="text-gray-700">{service.device}</p>
                            <p className="text-sm text-gray-600">
                              {service.customer}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">
                              {service.status}
                            </span>
                            <p className="font-bold text-gray-900 mt-2">
                              {service.cost}
                            </p>
                          </div>
                        </div>
                      ))}

                    {services.filter(
                      (service) => service.technician === selectedTechnician.name
                    ).length === 0 && (
                      <div className="bg-gray-50 rounded-xl p-6 text-gray-600">
                        Belum ada service untuk teknisi ini.
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
