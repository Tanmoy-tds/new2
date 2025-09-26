"use client";

import PanicButton from "@/components/dashboard/shared/PanicButton";

export default function QuickActions() {
  return (
    <div className="space-y-3">
      <PanicButton label="Emergency Panic Button" />
      <button className="w-full rounded-md border px-4 py-3 text-base flex items-center gap-2 justify-center">📍 Share Live Location</button>
      <button className="w-full rounded-md border px-4 py-3 text-base flex items-center gap-2 justify-center">📞 Contact Emergency Services</button>
      <button className="w-full rounded-md border px-4 py-3 text-base flex items-center gap-2 justify-center">📷 Report Incident</button>
    </div>
  );
}
