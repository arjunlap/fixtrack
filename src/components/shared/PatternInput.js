"use client";

export default function PatternInput({ value, onChange }) {
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
