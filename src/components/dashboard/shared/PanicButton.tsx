"use client";

import React, { useState } from "react";
import { publishAlert } from "@/utils/alertBus";

export default function PanicButton({ label = 'Emergency Panic Button' }: { label?: string }) {
  const [sending, setSending] = useState(false);
  function onClick() {
    if (sending) return;
    setSending(true);
    try {
      publishAlert({ id: crypto.randomUUID(), kind: 'panic', message: 'Panic triggered', from: { name: 'Tourist' }, createdAt: Date.now() });
    } finally {
      setTimeout(() => setSending(false), 1000);
    }
  }
  return (
    <button onClick={onClick} className="w-full rounded-md bg-red-600 px-4 py-3 text-white font-semibold">{sending ? 'Sending…' : label}</button>
  );
}
