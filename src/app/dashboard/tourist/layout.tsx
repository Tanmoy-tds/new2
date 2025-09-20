"use client";

import { useEffect, useState } from "react";
import TouristSidebar from "@/components/dashboard/TouristSidebar";
import TouristHeader from "@/components/dashboard/TouristHeader";
import AlertButton from "@/components/ui/AlertButton";

const STORAGE_KEY = "tourist.sidebarVisible";

export default function TouristLayout({ children }: { children: React.ReactNode }) {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(() => {
    try {
      const v = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      return v === null ? true : v === "1";
    } catch (err) {
      return true;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, sidebarVisible ? "1" : "0");
    } catch (err) {
      // ignore
    }
  }, [sidebarVisible]);

  function handleToggle() {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileOpen(true);
      return;
    }
    setSidebarVisible((s) => !s);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TouristSidebar visible={sidebarVisible || mobileOpen} />

      {/* Mobile drawer */}
      <div className={`mobile-drawer fixed inset-0 z-50 ${mobileOpen ? "" : "hidden"} md:hidden`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
        <div className="relative h-full w-72">
          <div className="absolute left-0 top-0 h-full w-72 shadow-2xl">
            <TouristSidebar visible={true} />
          </div>
        </div>
      </div>

      <div className={`${sidebarVisible ? "md:ml-64" : "md:ml-0"}`}>
        <div className="flex min-h-screen flex-col">
          <TouristHeader onToggleSidebar={handleToggle} sidebarVisible={sidebarVisible} />
          <main className="px-6 py-8 text-lg">
            <div className="mx-auto max-w-6xl space-y-8">{children}</div>
          </main>
        </div>
      </div>

      <AlertButton label="Alert Authorities" />
    </div>
  );
}
