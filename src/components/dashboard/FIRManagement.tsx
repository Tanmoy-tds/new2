import Link from 'next/link';

export default function FIRManagement() {
  return (
    <div className="fir-management space-y-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">E-FIR Management</h2>
          <Link href="/dashboard/admin/fir" className="text-sm text-blue-600">Open</Link>
        </div>
        <p className="text-sm text-gray-500 mt-1">Create and track FIRs auto-populated from alerts.</p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="text-sm font-medium text-gray-700">Recent FIRs</h3>
        <ul className="mt-3 divide-y text-sm text-gray-700">
          <li className="py-2">FIR #2025-001 — Missing Person — Submitted</li>
          <li className="py-2">FIR #2025-002 — Assault — Under Investigation</li>
        </ul>
      </div>
    </div>
  );
}
