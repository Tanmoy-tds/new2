import Link from "next/link";

type Contact = { name: string; relationship: string; phone: string; priority?: number };

const contacts: Contact[] = [
  { name: "Primary Emergency Contact", relationship: "Family", phone: "+91 90000 00001", priority: 1 },
  { name: "Local Police", relationship: "Authority", phone: "100", priority: 2 },
  { name: "Tourist Helpline", relationship: "Support", phone: "1363", priority: 3 },
];

export default function EmergencyContacts({ expanded = false }: { expanded?: boolean }) {
  const sorted = [...contacts].sort((a, b) => (a.priority || 99) - (b.priority || 99));

  if (!expanded) {
    const top = sorted[0];
    return (
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Emergency Contact</h2>
          <Link href="/dashboard/tourist/emergency" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="text-sm font-medium">{top.name}</p>
            <p className="text-xs text-gray-600">{top.relationship}</p>
          </div>
          <a href={`tel:${top.phone.replace(/\s/g, "")}`} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white">Call {top.phone}</a>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold">Emergency Contacts</h2>
      <ul className="space-y-3">
        {sorted.map((c) => (
          <li key={c.name} className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-gray-600">{c.relationship}</p>
            </div>
            <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white">Call {c.phone}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
