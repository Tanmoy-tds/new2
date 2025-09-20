"use client";

import { useEffect, useState } from "react";

const NEWS = [
  "24x7 Toll-free Tourist Helpline: 1800-11-1363 (Short Code: 136)",
  "New responsible travel guidelines released for North Eastern regions.",
  "Incredible India launches curated North East travel itineraries.",
  "National Tourism Awards nominations open — see eligibility and apply.",
];

export default function NewsTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % NEWS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-md bg-white border border-gray-200">
      <div className="px-4 py-2 flex items-center gap-4">
        <div className="text-sm font-semibold text-red-600">NEWS & UPDATES</div>
        <div className="flex-1 text-sm text-gray-700">
          <div className="transition-opacity duration-500">{NEWS[idx]}</div>
        </div>
        <div className="text-xs text-gray-500">{idx + 1}/{NEWS.length}</div>
      </div>
    </div>
  );
}
