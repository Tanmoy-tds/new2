"use client";

import { useMemo } from "react";

type Props = {
  title?: string;
  userName?: string;
  onToggleSidebar?: () => void;
  sidebarVisible?: boolean;
};

export default function TouristHeader({ title = "Tourist Dashboard", userName = "Traveler", onToggleSidebar, sidebarVisible = true }: Props) {
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white/90 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
            aria-expanded={sidebarVisible}
            className="inline-flex items-center justify-center h-10 w-10 rounded-md border bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform duration-300 ${sidebarVisible ? "rotate-0" : "-rotate-90"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 5h12v2H4V5zM4 9h12v2H4V9zM4 13h12v2H4v-2z" />
            </svg>
          </button>
        )}

        <div>
          <h1 className="text-2xl font-bold leading-none">{title}</h1>
          <p className="mt-0.5 text-sm text-gray-600">{greeting}, {userName}</p>
        </div>
      </div>

      <button aria-label="Notifications" className="relative rounded-full p-2 text-gray-700 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12 2a6 6 0 0 0-6 6v3.1l-.894 1.79A1 1 0 0 0 6 14h12a1 1 0 0 0 .894-1.11L18 11.1V8a6 6 0 0 0-6-6Zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Z" />
        </svg>
        <span className="absolute right-1 top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
}
