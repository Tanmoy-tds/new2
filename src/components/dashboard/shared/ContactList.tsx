"use client";

import { EMERGENCY_CONTACTS } from "@/data/mockData";

export default function ContactList() {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="text-sm font-semibold mb-2">Emergency Contacts</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {EMERGENCY_CONTACTS.map((c) => (
          <li key={c.id} className="flex items-center justify-between">
            <div>{c.label}</div>
            <a href={`tel:${c.number}`} className="text-blue-600">{c.number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
