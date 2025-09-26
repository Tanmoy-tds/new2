"use client";

import Card from "@/components/dashboard/ui/Card";
import SafetyCard from "@/components/dashboard/tourist/SafetyCard";
import AlertsCard from "@/components/dashboard/tourist/AlertsCard";

export default function SafetyPage() {
  return (
    <div className="space-y-6">
      <SafetyCard />
      <Card>
        <h2 className="text-lg font-semibold">Safety Resources</h2>
        <p className="mt-2 text-sm text-gray-700">Guidelines, advisories and tips for staying safe during your travels.</p>
      </Card>
      <AlertsCard />
    </div>
  );
}
