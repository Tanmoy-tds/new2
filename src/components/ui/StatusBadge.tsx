export default function StatusBadge({ status }: { status: 'normal' | 'warning' | 'critical' }) {
  const cls = status === 'normal' ? 'bg-green-100 text-green-800' : status === 'warning' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800';
  return <span className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${cls}`}>{status}</span>;
}
