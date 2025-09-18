export default function LiveMap() {
  return (
    <div className="live-map rounded-lg bg-white p-4 shadow">
      <h2 className="text-lg font-medium text-gray-800">Live Map</h2>
      <div className="mt-3 h-80 w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50">
        <div className="h-full w-full grid place-items-center text-gray-500">
          <svg className="h-16 w-16 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 10c2-3 5-5 9-5s7 2 9 5v7c-2 3-5 5-9 5s-7-2-9-5v-7z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
          <div className="mt-2 text-sm">Interactive map placeholder — integrate a map provider (Google/OSM) here</div>
        </div>
      </div>
    </div>
  );
}
