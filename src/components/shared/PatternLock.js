"use client";

export default function PatternLock({ pattern = [], size = 132 }) {
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
