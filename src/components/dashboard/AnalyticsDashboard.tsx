export default function AnalyticsDashboard() {
  return (
    <div className="analytics-dashboard space-y-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <h2 className="text-lg font-medium text-gray-800">Analytics & Reports</h2>
        <p className="text-sm text-gray-500 mt-1">Daily and monthly summaries, heatmaps and zone risk analysis.</p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="p-3">
            <p className="text-xs text-gray-500">Avg Response Time</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">5m 23s</p>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500">Incidents (30d)</p>
            <p className="mt-1 text-2xl font-semibold text-red-600">124</p>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500">Hot Zones</p>
            <p className="mt-1 text-2xl font-semibold text-orange-600">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
