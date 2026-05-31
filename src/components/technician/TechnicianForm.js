"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Input from "@/components/shared/Input";

export default function TechnicianForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    status: "Aktif",
    qcRate: "100",
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

    if (!form.name || !form.role) {
      alert("Nama dan role teknisi wajib diisi.");
      return;
    }

    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Teknisi Baru</h3>
            <p className="text-gray-600">Tambah teknisi atau admin operasional.</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nama" name="name" value={form.name} onChange={handleChange} />
            <Input label="Role" name="role" value={form.role} onChange={handleChange} placeholder="Teknisi / Admin" />
            <Input label="Status" name="status" value={form.status} onChange={handleChange} />
            <Input label="QC Rate" name="qcRate" value={form.qcRate} onChange={handleChange} placeholder="100" />
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900">
              Batal
            </button>

            <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white">
              Simpan Teknisi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
