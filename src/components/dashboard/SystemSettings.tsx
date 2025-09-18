export default function SystemSettings() {
  return (
    <div className="system-settings space-y-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <h2 className="text-lg font-medium text-gray-800">System Administration</h2>
        <p className="text-sm text-gray-500 mt-1">Manage users, geo-fences, AI sensitivity and integrations.</p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="text-sm font-medium text-gray-700">User Management</h3>
        <p className="mt-2 text-sm text-gray-600">Create accounts for police and tourism staff with role based access.</p>
      </div>
    </div>
  );
}
