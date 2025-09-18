import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Live Map', href: '/dashboard/admin' },
  { label: 'Alerts', href: '/dashboard/admin/alerts' },
  { label: 'Tourists', href: '/dashboard/admin/tourists' },
  { label: 'Analytics', href: '/dashboard/admin/analytics' },
  { label: 'FIR', href: '/dashboard/admin/fir' },
  { label: 'Settings', href: '/dashboard/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="dashboard-sidebar w-64 shrink-0 bg-gray-900 text-white h-screen sticky top-0 hidden md:flex md:flex-col">
      <div className="brand px-5 py-4 text-lg font-semibold tracking-wide border-b border-gray-800">Authority Panel</div>
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`nav-link flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? 'bg-blue-600 text-white' : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-current" />
                  {n.label}
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
