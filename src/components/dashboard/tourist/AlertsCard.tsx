"use client";

import Card from "@/components/dashboard/ui/Card";

const MOCK_ALERTS = [
  { id: 1, title: 'Geofence breach', details: 'Entered medium risk area', time: '2h ago', level: 'medium' },
  { id: 2, title: 'Panic triggered', details: 'User triggered panic', time: '3h ago', level: 'critical' },
];

export default function AlertsCard() {
  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold">Recent Alerts</h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          {MOCK_ALERTS.map((a) => (
            <li key={a.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">{a.title}</div>
                <div className="text-xs text-gray-500">{a.details} • {a.time}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${a.level === 'critical' ? 'bg-red-600 text-white' : 'bg-yellow-400 text-black'}`}>{a.level}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-xs text-gray-500">&nbsp;</div>
    </Card>
  );
}
