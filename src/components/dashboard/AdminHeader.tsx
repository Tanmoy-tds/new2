'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const d = now;
    const date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${date} • ${time}`;
  }, [now]);
}

export default function AdminHeader() {
  const clock = useClock();
  const router = useRouter();

  return (
    <header className="admin-header sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-semibold text-gray-900">Authorities Dashboard</h1>
          <span className="hidden sm:inline-flex text-xs text-gray-500" aria-live="polite">{clock}</span>
        </div>

        <div className="flex items-center gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget as HTMLFormElement).get('q') as string;
              const to = q ? `/dashboard/admin/tourists?q=${encodeURIComponent(q)}` : '/dashboard/admin/tourists';
              router.push(to);
            }}
            className="relative"
          >
            <input
              name="q"
              type="search"
              placeholder="Search tourist by name, ID, phone"
              className="w-64 max-w-[70vw] rounded-md border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" />
              </svg>
            </span>
          </form>

          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white">0</span>
          </button>

          <div className="flex items-center gap-2 rounded-full border border-gray-300 px-2 py-1">
            <div className="h-6 w-6 rounded-full bg-blue-600 text-white grid place-items-center text-xs">A</div>
            <span className="text-sm text-gray-800">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
