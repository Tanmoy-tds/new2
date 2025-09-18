export default function MapMarker({ color = 'red' }: { color?: string }) {
  const bg = color === 'red' ? 'bg-red-600' : color === 'orange' ? 'bg-orange-500' : 'bg-green-600';
  return <span className={`inline-block h-3 w-3 rounded-full ${bg}`} aria-hidden />;
}
