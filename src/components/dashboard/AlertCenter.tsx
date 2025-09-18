import Link from 'next/link';

type Alert = { id: string; type: string; tourist: string; location: string; time: string; priority: string };
const ALERTS: Alert[] = [
  { id: 'a1', type: 'Panic', tourist: 'John Doe', location: 'Point A', time: '2m ago', priority: 'high' },
  { id: 'a2', type: 'Geo-Fence Breach', tourist: 'Maria Gomez', location: 'Cliff Zone', time: '12m ago', priority: 'medium' },
];

export default function AlertCenter() {
  return (
    <div className="alert-center space-y-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <h2 className="text-lg font-medium text-gray-800">Active Alerts Queue</h2>
        <p className="text-sm text-gray-500 mt-1">Priority alerts are listed first. Use the dispatch action to notify nearest unit.</p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <ul className="divide-y">
          {ALERTS.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${a.priority === 'high' ? 'bg-red-600' : 'bg-orange-500'}`} />
                  <div className="text-sm font-medium text-gray-900">{a.type} — {a.tourist}</div>
                </div>
                <div className="text-xs text-gray-500">{a.location} • {a.time}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/dashboard/admin/alerts/${a.id}`} className="text-sm text-blue-600">Details</Link>
                <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">Dispatch</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
