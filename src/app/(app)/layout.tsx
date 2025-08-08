"use client";

import { useEffect, useState } from "react";
import { isAuthed } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ok = isAuthed();
    setAuthed(ok);
    if (!ok) {
      router.replace("/login");
    }
  }, [router, pathname]);

  if (!authed) {
    return null;
  }

  return (
    <div className="min-h-svh bg-[linear-gradient(180deg,rgba(241,245,249,1)_0%,rgba(255,255,255,1)_40%)]">
      {/* Mobile topbar */}
      <div className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-slate-200 bg-white/70 px-3 backdrop-blur supports-[backdrop-filter]:backdrop-blur md:hidden">
        <button
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <span aria-hidden>☰</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-gradient-to-tr from-blue-600 to-blue-700" aria-hidden />
          <span className="text-sm font-semibold text-slate-900">BlueDash</span>
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:pl-[260px]">
        <main className="mx-auto max-w-6xl p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}


