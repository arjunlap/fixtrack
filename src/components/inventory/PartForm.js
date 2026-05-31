"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Input from "@/components/shared/Input";

export default function PartForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    supplier: "",
    buyPrice: "",
    sellPrice: "",
    stock: "",
    minStock: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.category || !form.stock || !form.minStock) {
      alert("Nama part, kategori, stok, dan minimum stok wajib diisi.");
      return;
    }

    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Part Baru</h3>
            <p className="text-gray-600">Tambah sparepart ke inventaris.</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nama Part" name="name" value={form.name} onChange={handleChange} />
            <Input label="Kategori" name="category" value={form.category} onChange={handleChange} />
            <Input label="Supplier" name="supplier" value={form.supplier} onChange={handleChange} />
            <Input label="Harga Beli" name="buyPrice" value={form.buyPrice} onChange={handleChange} placeholder="Rp 0" />
            <Input label="Harga Jual" name="sellPrice" value={form.sellPrice} onChange={handleChange} placeholder="Rp 0" />
            <Input label="Stok" name="stock" value={form.stock} onChange={handleChange} />
            <Input label="Minimum Stok" name="minStock" value={form.minStock} onChange={handleChange} />
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900">
              Batal
            </button>

            <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white">
              Simpan Part
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
