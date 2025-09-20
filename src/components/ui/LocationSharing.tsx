"use client";

import { useState, useEffect } from "react";

type Props = {
  value?: boolean;
  onChange?: (enabled: boolean) => void;
};

export default function LocationSharing({ value, onChange }: Props) {
  const isControlled = typeof value === "boolean";
  const [enabled, setEnabled] = useState<boolean>(value ?? false);

  useEffect(() => {
    if (isControlled) setEnabled(value as boolean);
  }, [isControlled, value]);

  function toggle() {
    const next = !enabled;
    if (!isControlled) setEnabled(next);
    onChange?.(next);
  }

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-medium">Real-time Location Sharing</p>
        <p className="text-xs text-gray-600">Share your live location with authorities and trusted contacts.</p>
      </div>
      <button
        onClick={toggle}
        role="switch"
        aria-checked={enabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
