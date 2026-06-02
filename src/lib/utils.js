export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function parseRupiah(value) {
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9]/g, "")) || 0;
}

export function openWhatsApp(service) {
  const phone = String(service.wa || service.phone || service.customerPhone || "").replace(/^0/, "62");

  const message = `Halo ${service.customer || service.customerName || ""}, berikut update service HP Anda:\n\nInvoice: ${service.invoice || "-"}\nPerangkat: ${service.device || "-"}\nStatus: ${service.status || "-"}\nKeluhan: ${service.complaint || service.issue || "-"}\nEstimasi Biaya: ${formatRupiah(service.cost || 0)}\n\nTerima kasih.\n- FixTrack`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

export function generateInvoiceNumber() {
  const now = new Date();
  return `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Date.now().toString().slice(-4)}`;
}
