"use client";

import { useEffect, useState } from "react";

const countryCodes = [
  { label: "Indonesia", code: "+62" },
  { label: "Malaysia", code: "+60" },
  { label: "Singapore", code: "+65" },
  { label: "Thailand", code: "+66" },
  { label: "USA", code: "+1" },
];

const currencies = ["IDR", "USD", "SGD", "MYR"];
const colors = ["Hitam", "Putih", "Merah", "Biru", "Hijau", "Emas", "Silver", "Ungu", "Lainnya"];

export default function ServiceForm({ onClose, onSave }) {
  const [technicians, setTechnicians] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    countryCode: "+62",
    customerPhone: "",
    customerAddress: "",
    brand: "",
    device: "",
    imei: "",
    color: "Hitam",
    issue: "",
    diagnosis: "",
    currency: "IDR",
    cost: "",
    technician: "",
    lockPattern: "",
  });

  useEffect(() => {
    async function loadTechnicians() {
      try {
        const res = await fetch("/api/technicians");
        const data = await res.json();
        setTechnicians(Array.isArray(data) ? data : []);
      } catch {
        setTechnicians([]);
      }
    }

    loadTechnicians();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.customerName || !form.customerPhone || !form.brand || !form.device || !form.issue) {
      alert("Nama, WA, brand, device, dan kerusakan wajib diisi.");
      return;
    }

    if (form.imei && form.imei.replace(/[^0-9]/g, "").length !== 15) {
      const ok = confirm("IMEI biasanya 15 digit. Tetap simpan?");
      if (!ok) return;
    }

    await onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b flex justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Service Baru</h2>
            <p className="text-gray-600">Input data service masuk</p>
          </div>
          <button onClick={onClose} className="text-gray-600 text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          <section>
            <h3 className="font-bold text-gray-900 mb-3">Data Customer</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nama Customer" name="customerName" value={form.customerName} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <label className="block">
                  <span className="text-sm text-gray-700">Kode Negara</span>
                  <select name="countryCode" value={form.countryCode} onChange={handleChange} className="mt-1 w-full border rounded-xl px-3 py-3 text-gray-900">
                    {countryCodes.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}
                  </select>
                </label>
                <div className="col-span-2">
                  <Input label="Nomor WhatsApp" name="customerPhone" value={form.customerPhone} onChange={handleChange} placeholder="8123456789" />
                </div>
              </div>
              <div className="col-span-2">
                <Input label="Alamat Customer" name="customerAddress" value={form.customerAddress} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-3">Data Perangkat</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} placeholder="Samsung / iPhone / Xiaomi" />
              <Input label="Device / Tipe HP" name="device" value={form.device} onChange={handleChange} placeholder="A54 / iPhone XR" />
              <Input label="IMEI" name="imei" value={form.imei} onChange={handleChange} placeholder="15 digit" />
              <label className="block">
                <span className="text-sm text-gray-700">Warna</span>
                <select name="color" value={form.color} onChange={handleChange} className="mt-1 w-full border rounded-xl px-4 py-3 text-gray-900">
                  {colors.map((color) => <option key={color} value={color}>{color}</option>)}
                </select>
              </label>
              <Input label="Kerusakan" name="issue" value={form.issue} onChange={handleChange} placeholder="LCD pecah / baterai boros" />
              <Input label="Diagnosa" name="diagnosis" value={form.diagnosis} onChange={handleChange} />
            </div>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-3">Biaya & Teknisi</h3>
            <div className="grid grid-cols-3 gap-4">
              <label className="block">
                <span className="text-sm text-gray-700">Currency</span>
                <select name="currency" value={form.currency} onChange={handleChange} className="mt-1 w-full border rounded-xl px-4 py-3 text-gray-900">
                  {currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </select>
              </label>
              <Input label="Biaya" name="cost" value={form.cost} onChange={handleChange} placeholder="500000 / 35.50" />
              <label className="block">
                <span className="text-sm text-gray-700">Teknisi</span>
                <select name="technician" value={form.technician} onChange={handleChange} className="mt-1 w-full border rounded-xl px-4 py-3 text-gray-900">
                  <option value="">Belum dipilih</option>
                  {technicians.map((tech) => <option key={tech.id || tech.name} value={tech.name}>{tech.name}</option>)}
                </select>
              </label>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-3">Keamanan</h3>
            <Input label="PIN / Pola sementara" name="lockPattern" value={form.lockPattern} onChange={handleChange} placeholder="1234 / 14789" />
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900">Batal</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white">Simpan Service</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder = "" }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder} className="mt-1 w-full border rounded-xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
    </label>
  );
}
