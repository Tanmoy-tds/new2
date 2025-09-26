"use client";

import Card from "@/components/dashboard/ui/Card";
import { ItineraryItem } from "@/data/mockData";

export default function ItineraryCard({ item }: { item: ItineraryItem }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-gray-800 text-lg">{item.title}</div>
          <div className="text-sm text-gray-600">{item.time}</div>
          {item.notes && <div className="text-sm text-gray-500 mt-1">{item.notes}</div>}
        </div>
        <div className="text-sm text-gray-400">{item.id}</div>
      </div>
    </Card>
  );
}
