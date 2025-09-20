type ItineraryItem = {
  date: string;
  location: string;
  accommodation: string;
  notes?: string;
};

const itinerary: ItineraryItem[] = [
  { date: "2025-09-22", location: "Guwahati", accommodation: "Brahmaputra Hotel", notes: "Check-in 2 PM" },
  { date: "2025-09-23", location: "Shillong", accommodation: "Pine View Lodge", notes: "Visit Elephant Falls" },
  { date: "2025-09-24", location: "Cherrapunji", accommodation: "Cloud Resort", notes: "Living root bridges hike" },
  { date: "2025-09-25", location: "Kaziranga", accommodation: "Safari Camp", notes: "Early morning safari" },
];

export default function ItineraryView({ expanded = false }: { expanded?: boolean }) {
  if (!expanded) {
    const nextTwo = itinerary.slice(0, 2);
    return (
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Upcoming Itinerary</h2>
        </div>
        <ul className="space-y-3">
          {nextTwo.map((item) => (
            <li key={item.date} className="flex items-start justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{item.location}</p>
                <p className="text-xs text-gray-600">{new Date(item.date).toDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-700">{item.accommodation}</p>
                {item.notes ? <p className="text-xs text-gray-500">{item.notes}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Full Itinerary</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Accommodation</th>
              <th className="px-3 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {itinerary.map((item) => (
              <tr key={item.date} className="border-b last:border-0">
                <td className="px-3 py-2 text-gray-700">{new Date(item.date).toDateString()}</td>
                <td className="px-3 py-2 font-medium">{item.location}</td>
                <td className="px-3 py-2 text-gray-700">{item.accommodation}</td>
                <td className="px-3 py-2 text-gray-600">{item.notes || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
