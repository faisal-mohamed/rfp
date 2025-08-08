"use client";

import { NavItem } from "./NavItem";
import { logout } from "@/lib/auth";
import { useCallback } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const handleLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-200 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] transform bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-r border-slate-200 shadow-md transition-transform duration-200 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="flex items-center gap-3 px-1">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-700 shadow" aria-hidden />
            <span className="text-base font-semibold tracking-tight text-slate-900">BlueDash</span>
          </div>

          <nav className="mt-2 flex-1 space-y-1">
            <NavItem href="/dashboard" icon={<span>📊</span>} label="Dashboard" onClick={onClose} />
            <NavItem href="/users" icon={<span>👥</span>} label="Users" onClick={onClose} />
          </nav>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}


