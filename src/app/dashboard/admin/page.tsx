import Link from "next/link";

type Alert = {
  id: string;
  type: "Panic" | "Geo-Fence Breach" | "Anomaly";
  tourist: string;
  location: string;
  time: string;
  priority: "high" | "medium" | "low";
};

type Tourist = {
  id: string;
  name: string;
  nationality: string;
  safetyScore: number;
  lastSeen: string;
};

const SAMPLE_ALERTS: Alert[] = [
  { id: "a1", type: "Panic", tourist: "John Doe", location: "Point A (34.012, -118.49)", time: "2m ago", priority: "high" },
  { id: "a2", type: "Geo-Fence Breach", tourist: "Maria Gomez", location: "Cliff Zone", time: "12m ago", priority: "medium" },
  { id: "a3", type: "Anomaly", tourist: "Li Wei", location: "River Bank", time: "35m ago", priority: "low" },
];

const SAMPLE_TOURISTS: Tourist[] = [
  { id: "t1", name: "John Doe", nationality: "USA", safetyScore: 42, lastSeen: "Near Point A" },
  { id: "t2", name: "Maria Gomez", nationality: "Spain", safetyScore: 61, lastSeen: "Hotel Sunrise" },
  { id: "t3", name: "Li Wei", nationality: "China", safetyScore: 78, lastSeen: "River Bank" },
];

export default function AdminDashboard() {
  const active = SAMPLE_ALERTS.filter((a) => a.priority === "high").length;
  const tourists = SAMPLE_TOURISTS.length;
  const responded = 0;
  const pending = SAMPLE_ALERTS.length - responded;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-4">
        <h1 className="text-2xl font-bold text-gray-800">Tourist Safety Monitoring Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring and incident response system for authorities</p>
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Active Tourists</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{tourists}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Active Alerts</p>
              <p className="mt-1 text-2xl font-semibold text-red-600">{SAMPLE_ALERTS.length}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Responded</p>
              <p className="mt-1 text-2xl font-semibold text-green-600">{responded}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="mt-1 text-2xl font-semibold text-orange-600">{pending}</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">Live Map Overview</h2>
              <Link href="/dashboard/admin" className="text-sm text-blue-600">Open Map</Link>
            </div>

            <div className="mt-3 h-64 w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50">
              {/* Lightweight placeholder map so page is self contained */}
              <div className="h-full w-full grid place-items-center text-gray-500">
                <svg className="h-12 w-12 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 10c2-3 5-5 9-5s7 2 9 5v7c-2 3-5 5-9 5s-7-2-9-5v-7z" />
                  <circle cx="12" cy="10" r="2" />
                </svg>
                <div className="mt-2 text-sm">Interactive map placeholder — integrate LiveMap component here</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="text-lg font-medium text-gray-800">Recent Alerts</h2>

            <ul className="mt-3 divide-y">
              {SAMPLE_ALERTS.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-2.5 w-2.5 rounded-full ${a.priority === 'high' ? 'bg-red-600' : a.priority === 'medium' ? 'bg-orange-500' : 'bg-gray-400'}`} />
                      <p className="text-sm font-medium text-gray-900">{a.type} — {a.tourist}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{a.location} • {a.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/admin/alerts`} className="text-sm text-blue-600">View</Link>
                    <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">Dispatch</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <Link href="/dashboard/admin/alerts" className="block rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Open Alert Center</Link>
              <Link href="/dashboard/admin/tourists" className="block rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Open Tourist Roster</Link>
              <Link href="/dashboard/admin/fir" className="block rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Create E-FIR</Link>
              <Link href="/dashboard/admin/analytics" className="block rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">Open Analytics</Link>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-sm font-medium text-gray-700">Top Tourists (by anomaly)</h3>
            <table className="mt-3 w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_TOURISTS.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="py-2 text-gray-800"><Link href={`/dashboard/admin/tourists`}>{t.name}</Link></td>
                    <td className={`py-2 font-medium ${t.safetyScore < 50 ? 'text-red-600' : t.safetyScore < 70 ? 'text-orange-500' : 'text-green-600'}`}>{t.safetyScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <h3 className="text-sm font-medium text-gray-700">System Status</h3>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <dt className="text-xs text-gray-500">Map API</dt>
                <dd>Connected</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Alerts Queue</dt>
                <dd>{SAMPLE_ALERTS.length} items</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">DB</dt>
                <dd>Healthy</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Last Sync</dt>
                <dd>1m ago</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </div>
  );
}
