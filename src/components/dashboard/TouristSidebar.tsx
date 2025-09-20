"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; };

const navItems: NavItem[] = [
  { href: "/dashboard/tourist", label: "Dashboard" },
  { href: "/dashboard/tourist/profile", label: "Profile" },
  { href: "/dashboard/tourist/itinerary", label: "Itinerary" },
  { href: "/dashboard/tourist/safety", label: "Safety Center" },
  { href: "/dashboard/tourist/emergency", label: "Emergency" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard/tourist") return pathname === href;
  return pathname.startsWith(href);
}

export default function TouristSidebar({ visible = true }: { visible?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      aria-hidden={!visible}
      className={`fixed left-0 top-0 z-40 h-screen w-64 flex-col gap-4 border-r bg-slate-900 px-4 py-6 text-white transform transition-transform duration-300 ${
        visible ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:flex`}
    >
      <div className="mb-4 flex items-center gap-3">
        <img src="/indian-emblem.svg" alt="emblem" className="h-8 w-8" />
        <div>
          <div className="text-lg font-semibold">Tourist Panel</div>
          <div className="text-xs text-slate-300">Traveler</div>
        </div>
      </div>

      <nav className="mt-2 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors " +
                    (active
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white")
                  }
                >
                  <span className={`inline-block h-2 w-2 rounded-full ${active ? "bg-emerald-400" : "bg-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto text-xs text-slate-400">Stay safe and travel smart</div>
    </aside>
  );
}
