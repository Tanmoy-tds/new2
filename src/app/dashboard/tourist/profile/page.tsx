"use client";

import { useState } from "react";
import LocationSharing from "@/components/ui/LocationSharing";

export default function TouristProfilePage() {
  const [form, setForm] = useState({
    name: "Alex Johnson",
    email: "traveler@example.com",
    phone: "+91 90000 00001",
    country: "India",
    passport: "X1234567",
  });

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold">Profile</h2>
        <form className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Full name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Phone</span>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Country</span>
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="mb-1 block text-gray-700">Passport</span>
            <input value={form.passport} onChange={(e) => setForm({ ...form, passport: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <div className="md:col-span-2">
            <button disabled className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Save (mock)</button>
          </div>
        </form>
      </section>
      <LocationSharing />
    </div>
  );
}
