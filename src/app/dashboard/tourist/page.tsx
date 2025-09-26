"use client";

import Card from "@/components/dashboard/ui/Card";
import SafetyCard from "@/components/dashboard/tourist/SafetyCard";
import LocationCard from "@/components/dashboard/tourist/LocationCard";
import AlertsCard from "@/components/dashboard/tourist/AlertsCard";
import EmergencyCard from "@/components/dashboard/tourist/EmergencyCard";
import QuickActions from "@/components/dashboard/tourist/QuickActions";
import ItineraryCard from "@/components/dashboard/tourist/ItineraryCard";
import { ITINERARY } from "@/data/mockData";

export default function TouristDashboardPage() {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
        {/* Four equal cards in a single row */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="h-44"><SafetyCard /></div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="h-44"><LocationCard /></div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="h-44"><AlertsCard /></div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div className="h-44">
            <Card className="h-full flex flex-col justify-between">
              <div>
                <div className="text-sm text-gray-600">Trip Progress</div>
                <div className="mt-2 font-semibold text-lg">Day 3/8</div>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full mt-2 overflow-hidden"><div className="h-3 bg-gray-800" style={{ width: '37%' }} /></div>
            </Card>
          </div>
        </div>

        {/* Recent Activity (left) and Quick Actions (right) */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>

            <ul className="mt-3 text-base text-gray-700 divide-y divide-gray-100">
              <li className="py-3 flex items-start gap-3">
                <div className="text-green-600 mt-1 text-lg">✅</div>
                <div>
                  <div className="font-medium text-gray-800 text-lg">Checked in at Elephant Falls</div>
                  <div className="text-sm text-gray-400">2 hours ago</div>
                </div>
              </li>
              <li className="py-3 flex items-start gap-3">
                <div className="text-yellow-500 mt-1 text-lg">⚠️</div>
                <div>
                  <div className="font-medium text-gray-800 text-lg">Entered medium-risk zone</div>
                  <div className="text-sm text-gray-400">4 hours ago</div>
                </div>
              </li>
              <li className="py-3 flex items-start gap-3">
                <div className="text-blue-500 mt-1 text-lg">📍</div>
                <div>
                  <div className="font-medium text-gray-800 text-lg">Route updated for Living Root Bridge</div>
                  <div className="text-sm text-gray-400">6 hours ago</div>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="mt-4">
            <h2 className="text-base font-semibold">Itinerary</h2>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {ITINERARY.map((it) => (<ItineraryCard key={it.id} item={it} />))}
            </div>
          </Card>
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <Card>
            <h3 className="text-base font-semibold text-gray-800">Quick Actions</h3>
            <div className="mt-3 space-y-3">
              <button className="w-full rounded-md bg-red-600 px-4 py-3 text-white font-semibold">Emergency Panic Button</button>
              <button className="w-full rounded-md border px-4 py-3">Share Live Location</button>
              <button className="w-full rounded-md border px-4 py-3">Contact Emergency Services</button>
              <button className="w-full rounded-md border px-4 py-3">Report Incident</button>
            </div>
          </Card>

          <Card className="mt-4">
            <h3 className="text-sm font-semibold text-gray-800">What's New</h3>
            <div className="mt-2 text-sm text-gray-700">New MICE digital catalogue released. Travel advisory updated for selected regions.</div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
