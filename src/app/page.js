"use client";

import { useMemo, useState } from "react";
import {
  Home,
  Wrench,
  Users,
  Package,
  UserCog,
  Wallet,
  TrendingUp,
  Settings,
  Clock,
  CheckCircle,
  X,
  MessageCircle,
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

const statusList = [
  "ANTRI",
  "DIAGNOSA",
  "MENUNGGU SPAREPART",
  "PROSES",
  "QC",
  "SELESAI",
  "DIAMBIL",
  "BATAL",
  "REFUND",
];

const initialServices = [
  {
    invoice: "INV001",
    customer: "Budi Santoso",
    wa: "081234567890",
    address: "Bekasi Selatan",
    device: "Samsung A13",
    brand: "Samsung",
    type: "A13",
    imei: "352099112233441",
    color: "Black",
    issue: "LCD pecah",
    complaint: "HP jatuh, layar bergaris hijau",
    diagnosis: "LCD rusak, frame aman",
    status: "ANTRI",
    cost: "Rp 450.000",
    lockPattern: [0, 1, 4, 7, 8],
    timeline: ["Service masuk", "Status ANTRI"],
  },
  {
    invoice: "INV002",
    customer: "Siti Aminah",
    wa: "082211122233",
    address: "Rawalumbu",
    device: "iPhone XR",
    brand: "iPhone",
    type: "XR",
    imei: "357222334455667",
    color: "Red",
    issue: "Baterai boros",
    complaint: "Baterai cepat habis",
    diagnosis: "Battery health 72%, perlu ganti baterai",
    status: "PROSES",
    cost: "Rp 380.000",
    lockPattern: [2, 4, 6, 8],
    timeline: ["Service masuk", "Diagnosa", "Masuk proses"],
  },
  {
    invoice: "INV003",
    customer: "Agus",
    wa: "085733344455",
    address: "Summarecon Bekasi",
    device: "Redmi Note 10",
    brand: "Xiaomi",
    type: "Redmi Note 10",
    imei: "861998887776665",
    color: "Blue",
    issue: "Konektor cas longgar",
    complaint: "Kadang masuk charger kadang tidak",
    diagnosis: "Sub board charger perlu diganti",
    status: "SELESAI",
    cost: "Rp 220.000",
    lockPattern: [0, 3, 4, 5, 8],
    timeline: ["Service masuk", "Diagnosa", "Proses", "QC", "Selesai"],
  },
];
const initialParts = [
  {
    name: "LCD Samsung A13",
    category: "LCD",
    supplier: "Jakarta Part",
    buyPrice: "Rp 210.000",
    sellPrice: "Rp 350.000",
    stock: 2,
    minStock: 3,
  },
  {
    name: "Baterai iPhone XR",
    category: "Baterai",
    supplier: "Apple Part ID",
    buyPrice: "Rp 185.000",
    sellPrice: "Rp 320.000",
    stock: 1,
    minStock: 2,
  },
  {
    name: "Sub Board Redmi Note 10",
    category: "Connector",
    supplier: "Grosir HP",
    buyPrice: "Rp 85.000",
    sellPrice: "Rp 160.000",
    stock: 6,
    minStock: 2,
  },
];
export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [services, setServices] = useState(initialServices);
  const [parts, setParts] = useState(initialParts);

  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-900">
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

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">{activeMenu}</h2>

        <p className="text-gray-600 mb-8">
          {activeMenu === "Dashboard"
            ? "Ringkasan aktivitas service hari ini."
            : `Halaman ${activeMenu}`}
        </p>

        {activeMenu === "Dashboard" && <Dashboard services={services} />}

        {activeMenu === "Service" && (
          <ServicePage services={services} setServices={setServices} />
        )}

        {activeMenu === "Customer" && <CustomerPage services={services} />}
        {activeMenu === "Inventaris" && (<InventoryPage parts={parts} setParts={setParts} />
        )}
        {activeMenu !== "Dashboard" &&
          activeMenu !== "Service" &&
          activeMenu !== "Customer" && 
          activeMenu !== "Inventaris" &&          (
            <div className="bg-white rounded-xl p-8 shadow">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                Modul {activeMenu}
              </h3>
              <p className="text-gray-600">
                Halaman {activeMenu} akan dibangun berikutnya.
              </p>
            </div>
          )}
      </main>
    </div>
  );
}

function Dashboard({ services }) {
  const proses = services.filter((item) => item.status === "PROSES").length;
  const selesai = services.filter((item) => item.status === "SELESAI").length;

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard title="Service Hari Ini" value={services.length} icon={<Wrench />} />
      <StatCard title="Dalam Proses" value={proses} icon={<Clock />} />
      <StatCard title="Selesai" value={selesai} icon={<CheckCircle />} />
      <StatCard title="Omzet Hari Ini" value="Rp 2.350.000" icon={<Wallet />} />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <div className="text-gray-800">{icon}</div>
      <h3 className="mt-3 text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function ServicePage({ services, setServices }) {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [showForm, setShowForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  function addService(newService) {
    const nextNumber = services.length + 1;
    const invoice = `INV${String(nextNumber).padStart(3, "0")}`;

    const serviceData = {
      invoice,
      customer: newService.customer,
      wa: newService.wa,
      address: newService.address,
      brand: newService.brand,
      type: newService.type,
      device: `${newService.brand} ${newService.type}`,
      imei: newService.imei,
      color: newService.color,
      issue: newService.issue,
      complaint: newService.complaint,
      diagnosis: newService.diagnosis || "Belum ada diagnosa teknisi",
      status: "ANTRI",
      cost: newService.cost || "Rp 0",
      lockPattern: newService.lockPattern,
      timeline: ["Service masuk", "Status ANTRI"],
    };

    const updatedServices = [serviceData, ...services];

    setServices(updatedServices);
    setSelectedService(serviceData);
    setShowForm(false);
  }

  function updateStatus(newStatus) {
    const updatedServices = services.map((item) => {
      if (item.invoice === selectedService.invoice) {
        return {
          ...item,
          status: newStatus,
          timeline: [...item.timeline, `Status berubah ke ${newStatus}`],
        };
      }

      return item;
    });

    const updatedSelected = updatedServices.find(
      (item) => item.invoice === selectedService.invoice
    );

    setServices(updatedServices);
    setSelectedService(updatedSelected);
    setShowStatusModal(false);
  }

  return (
    <div>
      {showForm && (
        <ServiceForm onClose={() => setShowForm(false)} onSave={addService} />
      )}

      {showInvoice && (
        <InvoiceModal
          service={selectedService}
          onClose={() => setShowInvoice(false)}
        />
      )}

      {showTracking && (
        <TrackingModal
          service={selectedService}
          onClose={() => setShowTracking(false)}
        />
      )}

      {showStatusModal && (
        <StatusModal
          currentStatus={selectedService.status}
          onClose={() => setShowStatusModal(false)}
          onUpdate={updateStatus}
        />
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Daftar Service</h3>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              + Baru
            </button>
          </div>

          <div className="space-y-4">
            {services.map((item) => {
              const active = selectedService?.invoice === item.invoice;

              return (
                <button
                  key={item.invoice}
                  onClick={() => setSelectedService(item)}
                  className={`w-full text-left rounded-xl shadow p-5 transition ${
                    active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h4
                        className={`font-bold text-lg ${
                          active ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.invoice}
                      </h4>

                      <p className={active ? "text-gray-100" : "text-gray-800"}>
                        {item.customer}
                      </p>

                      <p
                        className={
                          active
                            ? "text-gray-300 text-sm"
                            : "text-gray-600 text-sm"
                        }
                      >
                        {item.device}
                      </p>
                    </div>

                    <span
                      className={
                        active
                          ? "bg-white text-gray-900 h-fit px-3 py-1 rounded-lg text-sm font-semibold"
                          : "bg-gray-100 text-gray-800 h-fit px-3 py-1 rounded-lg text-sm font-semibold"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedService && (
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedService.invoice}
                </h3>
                <p className="text-gray-600">Detail Service</p>
              </div>

              <span className="bg-gray-100 text-gray-900 h-fit px-4 py-2 rounded-xl font-semibold">
                {selectedService.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Info label="Customer" value={selectedService.customer} />
              <Info label="WhatsApp" value={selectedService.wa} />
              <Info label="Alamat" value={selectedService.address} />
              <Info label="Perangkat" value={selectedService.device} />
              <Info label="IMEI" value={selectedService.imei} />
              <Info label="Warna" value={selectedService.color} />
              <Info label="Kerusakan" value={selectedService.issue} />
              <Info label="Biaya" value={selectedService.cost} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 col-span-1">
                <h4 className="font-bold mb-3 text-gray-900">Pola Kunci</h4>
                <PatternLock pattern={selectedService.lockPattern || []} />
                <p className="text-xs text-gray-500 mt-2">
                  Koordinat: [{(selectedService.lockPattern || []).join(", ")}]
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold mb-2 text-gray-900">Keluhan Customer</h4>
                <p className="text-gray-700">{selectedService.complaint}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold mb-2 text-gray-900">Diagnosa Teknisi</h4>
                <p className="text-gray-700">{selectedService.diagnosis}</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold mb-3 text-gray-900">Timeline</h4>

              <div className="space-y-2">
                {selectedService.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3 text-gray-700">
                    <span className="font-bold">{index + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => openWhatsApp(selectedService)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Chat WA
              </button>

              <button
                onClick={() => setShowInvoice(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded-xl"
              >
                Cetak Invoice
              </button>

              <button
                onClick={() => setShowStatusModal(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
              >
                Update Status
              </button>

              <button
                onClick={() => setShowTracking(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl"
              >
                Lihat Tracking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomerPage({ services }) {
  const customers = useMemo(() => {
    const map = new Map();

    services.forEach((service) => {
      const key = service.wa || service.customer;

      if (!map.has(key)) {
        map.set(key, {
          name: service.customer,
          wa: service.wa,
          address: service.address,
          totalService: 0,
          totalTransaction: 0,
          history: [],
        });
      }

      const customer = map.get(key);

      customer.totalService += 1;
      customer.totalTransaction += parseRupiah(service.cost);
      customer.history.push(service);
    });

    return Array.from(map.values());
  }, [services]);

  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);

  if (!selectedCustomer && customers.length > 0) {
    setSelectedCustomer(customers[0]);
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Profile
        </h3>

        <div className="space-y-4">
          {customers.map((customer) => {
            const active = selectedCustomer?.wa === customer.wa;

            return (
              <button
                key={customer.wa}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full text-left rounded-xl shadow p-5 ${
                  active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
                }`}
              >
                <h4 className={`font-bold text-lg ${active ? "text-white" : "text-gray-900"}`}>
                  {customer.name}
                </h4>
                <p className={active ? "text-gray-200" : "text-gray-700"}>
                  {customer.wa}
                </p>
                <p className={active ? "text-gray-300 text-sm" : "text-gray-600 text-sm"}>
                  {customer.totalService} service
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedCustomer && (
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCustomer.name}
              </h3>
              <p className="text-gray-600">Profil customer otomatis dari data service.</p>
            </div>

            <button
              onClick={() =>
                openWhatsApp({
                  customer: selectedCustomer.name,
                  wa: selectedCustomer.wa,
                  invoice: "-",
                  device: "-",
                  status: "-",
                  complaint: "-",
                  cost: "-",
                })
              }
              className="bg-green-600 text-white px-4 py-2 rounded-xl h-fit"
            >
              Chat WA
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Info label="WhatsApp" value={selectedCustomer.wa} />
            <Info label="Alamat" value={selectedCustomer.address} />
            <Info label="Jumlah Service" value={selectedCustomer.totalService} />
            <Info
              label="Total Transaksi"
              value={formatRupiah(selectedCustomer.totalTransaction)}
            />
            <Info
              label="Service Terakhir"
              value={selectedCustomer.history[0]?.invoice}
            />
            <Info
              label="Perangkat Terakhir"
              value={selectedCustomer.history[0]?.device}
            />
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">
            Riwayat Service
          </h4>

          <div className="space-y-3">
            {selectedCustomer.history.map((service) => (
              <div
                key={service.invoice}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h5 className="font-bold text-gray-900">{service.invoice}</h5>
                  <p className="text-gray-700">{service.device}</p>
                  <p className="text-sm text-gray-600">{service.complaint}</p>
                </div>

                <div className="text-right">
                  <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">
                    {service.status}
                  </span>
                  <p className="font-bold text-gray-900 mt-2">{service.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function InventoryPage({ parts, setParts }) {
  const [showForm, setShowForm] = useState(false);

  const lowStockParts = parts.filter((part) => Number(part.stock) <= Number(part.minStock));

  function addPart(newPart) {
    setParts([newPart, ...parts]);
    setShowForm(false);
  }

  return (
    <div>
      {showForm && (
        <PartForm
          onClose={() => setShowForm(false)}
          onSave={addPart}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Inventaris Sparepart</h3>
          <p className="text-gray-600">Kelola stok, harga beli, harga jual, supplier, dan alert stok rendah.</p>
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

function PartForm({ onClose, onSave }) {
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
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              Simpan Part
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function TrackingModal({ service, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Tracking Customer</h3>
            <p className="text-gray-600">cek.fixtrack.id/{service.invoice}</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-5">
            <p className="text-sm text-gray-300">Invoice</p>
            <h2 className="text-3xl font-bold">{service.invoice}</h2>
            <p className="mt-2">{service.device}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <Info label="Customer" value={service.customer} />
            <Info label="Status" value={service.status} />
            <Info label="Perangkat" value={service.device} />
            <Info label="Estimasi Biaya" value={service.cost} />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <h4 className="font-bold mb-3 text-gray-900">Timeline</h4>

            <div className="space-y-2">
              {service.timeline.map((item, index) => (
                <div key={index} className="flex gap-3 text-gray-700">
                  <span className="font-bold">{index + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => openWhatsApp(service)}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-xl"
          >
            Chat Admin via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

function PatternLock({ pattern = [], size = 132 }) {
  const gap = size / 3;

  const points = Array.from({ length: 9 }, (_, i) => ({
    x: (i % 3) * gap + gap / 2,
    y: Math.floor(i / 3) * gap + gap / 2,
  }));

  const path = pattern
    .filter((index) => points[index])
    .map((index, i) => `${i === 0 ? "M" : "L"} ${points[index].x} ${points[index].y}`)
    .join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="bg-gray-900 rounded-xl">
      {pattern.length > 1 && (
        <path d={path} fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      )}

      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={pattern.includes(index) ? 7 : 5}
          fill={pattern.includes(index) ? "white" : "#6b7280"}
        />
      ))}
    </svg>
  );
}

function PatternInput({ value, onChange }) {
  function togglePoint(index) {
    if (value.includes(index)) {
      onChange(value.filter((item) => item !== index));
      return;
    }

    onChange([...value, index]);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 w-40">
        {Array.from({ length: 9 }, (_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => togglePoint(index)}
            className={`w-12 h-12 rounded-full font-bold ${
              value.includes(index)
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Minimal 4 titik. Urutan klik akan menjadi garis pola.
      </p>
    </div>
  );
}

function InvoiceModal({ service, onClose }) {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 print:static print:bg-white print:p-0">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto print:shadow-none print:rounded-none print:max-w-full print:max-h-full">
        <div className="flex justify-between items-center border-b p-5 print:hidden">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Preview Invoice</h3>
            <p className="text-gray-600">Invoice {service.invoice}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-gray-900 text-white"
            >
              Print / PDF
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900"
            >
              Tutup
            </button>
          </div>
        </div>

        <div className="p-8 text-gray-900 print:p-6">
          <div className="border rounded-2xl p-6 print:border print:rounded-none">
            <div className="flex justify-between border-b pb-5 mb-5">
              <div>
                <h1 className="text-3xl font-bold">FixTrack</h1>
                <p className="text-gray-600">Nota Service HP</p>
                <p className="text-sm text-gray-500">Repair Management System</p>
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-bold">{service.invoice}</h2>
                <p className="text-gray-600">Status: {service.status}</p>
                <p className="text-gray-600">
                  Tanggal: {new Date().toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <h3 className="font-bold mb-2">Data Customer</h3>
                <p>Nama: {service.customer}</p>
                <p>WhatsApp: {service.wa}</p>
                <p>Alamat: {service.address || "-"}</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Data Perangkat</h3>
                <p>Perangkat: {service.device}</p>
                <p>IMEI: {service.imei || "-"}</p>
                <p>Warna: {service.color || "-"}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-gray-50 rounded-xl p-4 print:border">
                <h3 className="font-bold mb-3">Pola Kunci</h3>
                <PatternLock pattern={service.lockPattern || []} size={120} />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 print:border">
                <h3 className="font-bold mb-2">Keluhan Customer</h3>
                <p>{service.complaint || "-"}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 print:border">
                <h3 className="font-bold mb-2">Diagnosa Teknisi</h3>
                <p>{service.diagnosis || "-"}</p>
              </div>
            </div>

            <div className="border-t pt-5 mb-8">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Biaya</span>
                <span>{service.cost}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-12 text-center">
              <div>
                <div className="h-20"></div>
                <div className="border-t pt-2">Customer</div>
              </div>

              <div>
                <div className="h-20"></div>
                <div className="border-t pt-2">Admin</div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-8">
              Barang yang tidak diambil lebih dari 30 hari di luar tanggung jawab toko.
              Garansi berlaku sesuai ketentuan service. Simpan invoice ini sebagai bukti
              pengambilan dan klaim garansi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusModal({ currentStatus, onClose, onUpdate }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Update Status</h3>
            <p className="text-gray-600">Status saat ini: {currentStatus}</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={22} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 gap-3">
          {statusList.map((status) => (
            <button
              key={status}
              onClick={() => onUpdate(status)}
              className={`px-4 py-3 rounded-xl font-semibold ${
                currentStatus === status
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceForm({ onClose, onSave }) {
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
    cost: "",
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
              <Input label="Estimasi Biaya" name="cost" value={form.cost} onChange={handleChange} placeholder="Rp 0" />
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
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-900"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              Simpan Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function openWhatsApp(service) {
  const phone = String(service.wa || "").replace(/^0/, "62");

  const message = `Halo ${service.customer}, berikut update service HP Anda:

Invoice: ${service.invoice}
Perangkat: ${service.device}
Status: ${service.status}
Keluhan: ${service.complaint}
Estimasi Biaya: ${service.cost}

Terima kasih.
- FixTrack`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function parseRupiah(value) {
  return Number(String(value || "0").replace(/[^0-9]/g, "")) || 0;
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function Input({ label, name, value, onChange, placeholder = "" }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-full border rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="mt-1 w-full border rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-bold text-gray-900">{value || "-"}</p>
    </div>
  );
}