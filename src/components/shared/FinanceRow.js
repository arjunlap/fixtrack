"use client";

export default function FinanceRow({ label, value, strong = false }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-600">{label}</span>
      <span className={strong ? "font-bold text-gray-900" : "text-gray-900"}>
        {value}
      </span>
    </div>
  );
}
