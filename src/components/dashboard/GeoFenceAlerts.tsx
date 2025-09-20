type Alert = { id: string; message: string; time: string; severity: "info" | "warn" | "danger" };

const recentAlerts: Alert[] = [
  { id: "1", message: "You entered a medium-risk zone near market area.", time: "10 min ago", severity: "warn" },
  { id: "2", message: "Heavy rainfall alert for your region.", time: "1 hr ago", severity: "info" },
  { id: "3", message: "Avoid isolated trails after dusk.", time: "Yesterday", severity: "danger" },
];

function badge(severity: Alert["severity"]) {
  switch (severity) {
    case "danger":
      return "bg-red-100 text-red-700";
    case "warn":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

export default function GeoFenceAlerts() {
  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold">Recent Alerts</h2>
      <ul className="space-y-3">
        {recentAlerts.map((a) => (
          <li key={a.id} className="flex items-start justify-between rounded-lg border p-3">
            <div className="pr-3">
              <p className="text-sm text-gray-800">{a.message}</p>
              <p className="text-xs text-gray-500">{a.time}</p>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs ${badge(a.severity)}`}>{a.severity.toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
