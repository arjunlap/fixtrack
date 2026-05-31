"use client";

import { useState } from "react";
import PartForm from "@/components/inventory/PartForm";

export default function InventoryPage({ parts, setParts }) {
  const [showForm, setShowForm] = useState(false);

  const lowStockParts = parts.filter(
    (part) => Number(part.stock) <= Number(part.minStock)
  );

  function addPart(newPart) {
    setParts([newPart, ...parts]);
    setShowForm(false);
  }

  return (
    <div>
      {showForm && (
        <PartForm onClose={() => setShowForm(false)} onSave={addPart} />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Inventaris Sparepart
          </h3>
          <p className="text-gray-600">
            Kelola stok, harga beli, harga jual, supplier, dan alert stok rendah.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          + Part Baru
        </button>
      </div>

      {lowStockParts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h4 className="font-bold text-yellow-900 mb-2">Alert Stok Rendah</h4>

          <div className="space-y-1">
            {lowStockParts.map((part) => (
              <p key={part.name} className="text-yellow-800">
                {part.name} tersisa {part.stock}. Minimum stok {part.minStock}.
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Nama Part</th>
              <th>Kategori</th>
              <th>Supplier</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Stok</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {parts.map((part) => {
              const isLow = Number(part.stock) <= Number(part.minStock);

              return (
                <tr key={part.name} className="border-t">
                  <td className="p-4 font-bold text-gray-900">{part.name}</td>
                  <td className="text-gray-700">{part.category}</td>
                  <td className="text-gray-700">{part.supplier}</td>
                  <td className="text-gray-700">{part.buyPrice}</td>
                  <td className="text-gray-700">{part.sellPrice}</td>
                  <td className="font-bold text-gray-900">{part.stock}</td>
                  <td>
                    {isLow ? (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-semibold">
                        Stok Rendah
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-semibold">
                        Aman
                      </span>
                    )}
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
