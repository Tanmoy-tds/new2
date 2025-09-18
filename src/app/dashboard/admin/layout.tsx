"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Live Map", href: "/dashboard/admin" },
  { label: "Alerts", href: "/dashboard/admin/alerts" },
  { label: "Tourists", href: "/dashboard/admin/tourists" },
  { label: "Analytics", href: "/dashboard/admin/analytics" },
  { label: "FIR", href: "/dashboard/admin/fir" },
  { label: "Settings", href: "/dashboard/admin/settings" },
];

function useClock() {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const formatted = useMemo(() => {
    const d = now;
    const date = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const time = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${date} • ${time}`;
  }, [now]);
  return formatted;
}

function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="admin-sidebar w-64 shrink-0 bg-gray-900 text-white h-screen sticky top-0 hidden md:flex md:flex-col">
      <div className="sidebar-brand px-5 py-4 text-lg font-semibold tracking-wide border-b border-gray-800">Authority Panel</div>
      <nav className="sidebar-nav flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-200 hover:bg-gray-800 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-current" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-800">RBAC: Admin</div>
    </aside>
  );
}

function AdminHeader() {
  const clock = useClock();
  const router = useRouter();
  function onSearchSubmit(formData: FormData) {
    const q = String(formData.get("q") || "").trim();
    const to = q ? `/dashboard/admin/tourists?q=${encodeURIComponent(q)}` : "/dashboard/admin/tourists";
    router.push(to);
  }
  return (
    <header className="admin-header sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-gray-700"
            onClick={() => {
              const el = document.querySelector(".mobile-drawer");
              if (el) el.classList.remove("hidden");
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-gray-900">Authorities Dashboard</h1>
          <span className="hidden sm:inline-flex text-xs text-gray-500" aria-live="polite">{clock}</span>
        </div>

        <div className="flex items-center gap-3">
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              onSearchSubmit(fd);
            }}
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell flex min-h-screen bg-gray-100">
      {/* Mobile drawer */}
      <div className="mobile-drawer fixed inset-0 z-20 hidden md:hidden">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => document.querySelector(".mobile-drawer")?.classList.add("hidden")}
        />
        <div className="relative h-full w-72">
          <div className="absolute left-0 top-0 h-full w-72 shadow-2xl">
            <AdminSidebar />
          </div>
        </div>
      </div>

      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />
        <main className="content-area flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          {/* Global status widgets */}
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Active Tourists</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">0</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Active Alerts</p>
              <p className="mt-1 text-2xl font-semibold text-red-600">0</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Responded</p>
              <p className="mt-1 text-2xl font-semibold text-green-600">0</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="mt-1 text-2xl font-semibold text-orange-600">0</p>
            </div>
          </section>

          <div className="mt-4" />
          {children}
        </main>
      </div>
    </div>
  );
}
