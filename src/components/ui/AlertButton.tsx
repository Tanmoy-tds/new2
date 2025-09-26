"use client";

import { useState } from 'react';
import { publishAlert } from '@/utils/alertBus';

export default function AlertButton({ label = 'Raise Alert', kind = 'sos' as const }: { label?: string; kind?: 'panic' | 'sos' | 'anomaly' | 'custom' }) {
  const [sending, setSending] = useState(false);

  function triggerAlert() {
    if (sending) return;
    setSending(true);
    const alert = {
      id: crypto.randomUUID(),
      kind,
      message: 'User has requested immediate attention',
      from: { name: 'Tourist', id: 'demo-user' },
      createdAt: Date.now(),
    };
    publishAlert(alert);
    setTimeout(() => setSending(false), 800);
  }

  return (
    <button
      type="button"
      onClick={triggerAlert}
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-20 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 md:hidden"
    >
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
      <span className="font-semibold text-sm">{sending ? 'Sending…' : label}</span>
    </button>
  );
}
