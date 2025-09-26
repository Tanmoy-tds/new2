"use client";

export default function SafetyScore({ value = 82 }: { value?: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="text-4xl font-extrabold text-green-600">{pct}%</div>
      <div className="w-full bg-gray-100 h-3 rounded-full mt-3 overflow-hidden"><div className="h-3 bg-green-600" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
