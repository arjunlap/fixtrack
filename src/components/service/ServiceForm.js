"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/Textarea";
import PatternInput from "@/components/shared/PatternInput";

export default function ServiceForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    customer: "",
    wa: "",
    address: "",
    brand: "",
    type: "",
    imei: "",
    color: "",
    issue: "",
    complaint: "",
    diagnosis: "",
    technician: "",
    cost: "",
    partCost: "",
    lockPattern: [],
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handlePatternChange(pattern) {
    setForm({
      ...form,
      lockPattern: pattern,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.customer || !form.wa || !form.brand || !form.type || !form.complaint) {
      alert("Nama customer, WhatsApp, merek, tipe, dan keluhan wajib diisi.");
      return;
    }

    if (form.lockPattern.length < 4) {
      alert("Pola kunci minimal 4 titik.");
      return;
    }

    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Service Baru</h3>
            <p className="text-gray-600">Input data HP masuk service.</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          <div>
            <h4 className="font-bold mb-3 text-gray-900">Data Customer</h4>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Nama Customer" name="customer" value={form.customer} onChange={handleChange} />
              <Input label="WhatsApp" name="wa" value={form.wa} onChange={handleChange} />
              <Input label="Alamat" name="address" value={form.address} onChange={handleChange} />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-gray-900">Data Perangkat</h4>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Merek HP" name="brand" value={form.brand} onChange={handleChange} />
              <Input label="Tipe HP" name="type" value={form.type} onChange={handleChange} />
              <Input label="IMEI" name="imei" value={form.imei} onChange={handleChange} />
              <Input label="Warna" name="color" value={form.color} onChange={handleChange} />
              <Input label="Kerusakan" name="issue" value={form.issue} onChange={handleChange} />
              <Input label="Teknisi" name="technician" value={form.technician} onChange={handleChange} placeholder="Raka / Dimas" />
              <Input label="Estimasi Biaya" name="cost" value={form.cost} onChange={handleChange} placeholder="Rp 0" />
              <Input label="Modal Part" name="partCost" value={form.partCost} onChange={handleChange} placeholder="Rp 0" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold mb-3 text-gray-900">Pola Kunci</h4>
              <PatternInput value={form.lockPattern} onChange={handlePatternChange} />
              <p className="text-sm text-gray-600 mt-3">
                Dipilih: [{form.lockPattern.join(", ")}]
              </p>
            </div>

            <div className="col-span-2">
              <h4 className="font-bold mb-3 text-gray-900">Keluhan & Diagnosa</h4>

              <div className="grid grid-cols-2 gap-4">
                <Textarea label="Keluhan Customer" name="complaint" value={form.complaint} onChange={handleChange} />
                <Textarea label="Diagnosa Teknisi" name="diagnosis" value={form.diagnosis} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900">
              Batal
            </button>

            <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white">
              Simpan Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
