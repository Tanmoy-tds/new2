"use client";

import Card from "@/components/dashboard/ui/Card";
import Toggle from "@/components/dashboard/ui/Toggle";
import { useState } from "react";

export default function LocationCard() {
  const [sharing, setSharing] = useState(false);
  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="text-sm text-gray-600">Current Location</div>
        <div className="mt-1 font-semibold text-lg">Shillong, Meghalaya</div>
        <div className="text-xs text-gray-500">Last updated: 2 min ago</div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Toggle checked={sharing} onChange={setSharing} />
        <div className="text-xs text-gray-500">{sharing ? 'Sharing' : 'Not sharing'}</div>
      </div>
    </Card>
  );
}
