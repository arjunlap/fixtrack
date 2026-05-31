export function openWhatsApp(service) {
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

export function parseRupiah(value) {
  return Number(String(value || "0").replace(/[^0-9]/g, "")) || 0;
}

export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
