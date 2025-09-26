"use client";

"use client";

import { useState } from "react";
import Card from "@/components/dashboard/ui/Card";
import Button from "@/components/dashboard/ui/Button";
import { UserProfile } from "@/data/mockData";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "traveler@example.com",
    phone: "+91 90000 00001",
    country: "India",
    passport: "X1234567",
  });

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Profile</h2>
        <form className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="block text-gray-700 mb-1">Full name</span>
            <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>

          <label className="text-sm">
            <span className="block text-gray-700 mb-1">Email</span>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>

          <label className="text-sm">
            <span className="block text-gray-700 mb-1">Phone</span>
            <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>

          <label className="text-sm">
            <span className="block text-gray-700 mb-1">Country</span>
            <input value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>

          <label className="text-sm md:col-span-2">
            <span className="block text-gray-700 mb-1">Passport</span>
            <input value={profile.passport} onChange={(e) => setProfile({ ...profile, passport: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </label>

          <div className="md:col-span-2 flex justify-end">
            <Button variant="primary">Save</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
