"use client";

import Card from "@/components/dashboard/ui/Card";
import ContactList from "@/components/dashboard/shared/ContactList";
import PanicButton from "@/components/dashboard/shared/PanicButton";

export default function EmergencyPage() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Emergency Contacts</h2>
          <PanicButton label="Panic" />
        </div>
        <p className="text-sm text-gray-600 mt-2">Call or reach out to local emergency services.</p>
      </Card>
      <ContactList />
    </div>
  );
}
