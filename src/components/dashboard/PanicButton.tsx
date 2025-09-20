"use client";

import { useState } from "react";
import EmergencyModal from "../ui/EmergencyModal";

export default function PanicButton() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
      <h2 className="mb-3 text-base font-semibold">Emergency</h2>
      <button
        onClick={() => setOpen(true)}
        className="mx-auto block w-full rounded-lg bg-red-600 px-6 py-6 text-lg font-bold uppercase tracking-wide text-white shadow hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
        aria-label="Open emergency modal"
      >
        SOS
      </button>
      {sent ? <p className="mt-2 text-sm text-green-700">Alert sent. Help is on the way.</p> : <p className="mt-2 text-sm text-gray-600">Press only in real emergencies.</p>}
      <EmergencyModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={(loc) => {
          setOpen(false);
          setSent(true);
          setTimeout(() => setSent(false), 4000);
          console.log("Emergency alert sent", loc);
        }}
      />
    </div>
  );
}
