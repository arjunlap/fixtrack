"use client";

export default function Input({ label, name, value, onChange, placeholder = "" }) {
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
