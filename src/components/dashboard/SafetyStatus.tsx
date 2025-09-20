import SafetyScoreMeter from "../ui/SafetyScoreMeter";

function getStatus(score: number) {
  if (score >= 70) return { label: "Safe", desc: "Your current area and activity appear safe.", color: "text-green-700", badge: "bg-green-100 text-green-700" };
  if (score >= 40) return { label: "Caution", desc: "Be aware of surroundings. Follow local advisories.", color: "text-amber-700", badge: "bg-amber-100 text-amber-700" };
  return { label: "Danger", desc: "High risk detected. Consider changing plans.", color: "text-red-700", badge: "bg-red-100 text-red-700" };
}

export default function SafetyStatus({ score = 82 }: { score?: number }) {
  const status = getStatus(score);

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Safety Status</h2>
        <span className={`rounded-full px-2 py-1 text-xs ${status.badge}`}>{status.label}</span>
      </div>
      <SafetyScoreMeter score={score} />
      <p className={`mt-3 text-sm ${status.color}`}>{status.desc}</p>
    </section>
  );
}
