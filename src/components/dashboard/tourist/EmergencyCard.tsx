"use client";

import Card from "@/components/dashboard/ui/Card";
import PanicButton from "@/components/dashboard/shared/PanicButton";
import ContactList from "@/components/dashboard/shared/ContactList";

export default function EmergencyCard() {
  return (
    <Card>
      <h3 className="text-base font-semibold">Quick Actions</h3>
      <div className="mt-3 space-y-2">
        <PanicButton />
        <button className="w-full rounded-md border px-4 py-3">Share Live Location</button>
        <button className="w-full rounded-md border px-4 py-3">Contact Emergency Services</button>
        <button className="w-full rounded-md border px-4 py-3">Report Incident</button>
      </div>
      <div className="mt-4">
        <ContactList />
      </div>
    </Card>
  );
}
