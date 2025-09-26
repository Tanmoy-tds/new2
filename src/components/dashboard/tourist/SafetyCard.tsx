"use client";

import Card from "@/components/dashboard/ui/Card";
import SafetyScore from "@/components/dashboard/shared/SafetyScore";

export default function SafetyCard() {
  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="text-sm text-gray-600">Safety Score</div>
        <div className="mt-3"><SafetyScore value={85} /></div>
      </div>
      <div className="text-sm text-gray-500">Last updated: 2 min ago</div>
    </Card>
  );
}
