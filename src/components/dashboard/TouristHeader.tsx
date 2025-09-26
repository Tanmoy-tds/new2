"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: '/dashboard/tourist', label: 'Dashboard' },
  { href: '/dashboard/tourist/profile', label: 'Profile' },
  { href: '/dashboard/tourist/itinerary', label: 'Itinerary' },
  { href: '/dashboard/tourist/safety', label: 'Safety Center' },
  { href: '/dashboard/tourist/emergency', label: 'Emergency' },
];

export default function TouristHeader() {
  const pathname = usePathname();
  function Icon({ name }: { name: string }) {
    switch (name) {
      case 'Dashboard':
        return (
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z"/></svg>
        );
      case 'Profile':
        return (
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM21 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/></svg>
        );
      case 'Itinerary':
        return (
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 12h18M7 17h10"/></svg>
        );
      case 'Safety Center':
        return (
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l9 4-9 4-9-4 9-4zM12 10v10"/></svg>
        );
      case 'Emergency':
        return (
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>
        );
      default:
        return null;
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b w-full">
      <div className="w-full px-3 sm:px-6 py-2">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gray-100 grid place-items-center text-xl">🔰</div>
            <div>
              <div className="text-xl font-semibold text-gray-900">Smart Tourist Safety System</div>
              <div className="text-sm text-gray-500">AI-Powered Safety Monitoring &amp; Response</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-3 py-1 text-sm text-green-700">● Online</div>
            <button className="h-9 w-9 rounded-md border bg-white flex items-center justify-center" title="Settings">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zM19.4 15a1 1 0 0 0 .2 1.1l.9.9a1 1 0 0 1-1.4 1.4l-.9-.9a1 1 0 0 0-1.1-.2 7 7 0 0 1-2 .6 7 7 0 0 1-2 0 1 1 0 0 0-1.1.2l-.9.9A1 1 0 0 1 6.5 18l.9-.9a1 1 0 0 0 .2-1.1 7 7 0 0 1 0-2 1 1 0 0 0-.2-1.1L6.5 11A1 1 0 0 1 8 9.6l.9.9a1 1 0 0 0 1.1.2 7 7 0 0 1 2-.6 7 7 0 0 1 2 .6 1 1 0 0 0 1.1-.2l.9-.9A1 1 0 0 1 19.4 8l-.9.9a1 1 0 0 0-.2 1.1 7 7 0 0 1 0 2 1 1 0 0 0 .2 1.1l.9.9z"/></svg>
            </button>
          </div>
        </div>

        <div className="mt-2">
          <nav className="flex w-full bg-gray-100 rounded-full border border-gray-200 px-1 py-1 overflow-auto">
            {TABS.map((t) => {
              const active = pathname === t.href || pathname?.startsWith(t.href + '/');
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`flex-1 text-center px-3 py-2 text-base rounded-full ${active ? 'bg-white shadow-sm border border-gray-200 inline-flex items-center justify-center gap-2' : 'text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center gap-2'}`}
                >
                  <Icon name={t.label} />
                  <span>{t.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
