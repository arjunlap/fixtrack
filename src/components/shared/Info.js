"use client";

export default function Info({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-bold text-gray-900">{value || "-"}</p>
    </div>
  );
}
