"use client";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <div className="text-gray-800">{icon}</div>
      <h3 className="mt-3 text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
