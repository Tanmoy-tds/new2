"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: (location?: { lat: number; lng: number }) => void;
};

export default function EmergencyModal({ open, onCancel, onConfirm }: Props) {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!open) return;
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }
    const id = navigator.geolocation.getCurrentPosition(
      (pos) => {
        setError(undefined);
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => setError("Unable to fetch location")
    );
    return () => {
      void id;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md rounded-xl border bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold">Send Emergency Alert?</h3>
        <p className="mt-2 text-sm text-gray-600">Confirm to notify authorities and your emergency contacts with your current location.</p>
        <div className="mt-4 rounded-lg border bg-gray-50 p-3 text-sm">
          <p className="font-medium">Current location</p>
          {loc ? (
            <p className="text-gray-700">Lat: {loc.lat.toFixed(5)}, Lng: {loc.lng.toFixed(5)}</p>
          ) : (
            <p className="text-gray-500">{error || "Fetching location..."}</p>
          )}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={() => onConfirm(loc)} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Send Alert</button>
        </div>
      </div>
    </div>
  );
}
