"use client";

import Card from "@/components/dashboard/ui/Card";
import ItineraryCard from "@/components/dashboard/tourist/ItineraryCard";
import { ITINERARY } from "@/data/mockData";

export default function ItineraryPage() {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Itinerary</h2>
        <p className="text-sm text-gray-600 mt-2">Your upcoming trip schedule and activities.</p>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {ITINERARY.map((it) => (
          <ItineraryCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}
