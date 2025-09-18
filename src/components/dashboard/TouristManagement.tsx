import Link from 'next/link';

type Tourist = { id: string; name: string; nationality: string; safetyScore: number; status: string };
const LIST: Tourist[] = [
  { id: 't1', name: 'John Doe', nationality: 'USA', safetyScore: 42, status: 'alert' },
  { id: 't2', name: 'Maria Gomez', nationality: 'Spain', safetyScore: 61, status: 'normal' },
  { id: 't3', name: 'Li Wei', nationality: 'China', safetyScore: 78, status: 'normal' },
];

export default function TouristManagement() {
  return (
    <div className="tourist-management space-y-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Tourist Roster</h2>
          <Link href="/dashboard/admin/tourists" className="text-sm text-blue-600">View All</Link>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="pb-2">Digital ID</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Nationality</th>
              <th className="pb-2">Safety</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {LIST.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="py-2 text-gray-700">{t.id}</td>
                <td className="py-2 text-gray-800"><Link href={`/dashboard/admin/tourists/${t.id}`}>{t.name}</Link></td>
                <td className="py-2 text-gray-700">{t.nationality}</td>
                <td className={`py-2 font-medium ${t.safetyScore < 50 ? 'text-red-600' : t.safetyScore < 70 ? 'text-orange-500' : 'text-green-600'}`}>{t.safetyScore}</td>
                <td className="py-2 text-gray-700 capitalize">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
