"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItemProps = {
  href: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

export function NavItem({ href, icon, label, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={
        `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition duration-200 outline-none ` +
        (isActive
          ? "bg-blue-600 text-white shadow-sm focus:ring-2 focus:ring-blue-600"
          : "text-slate-700 hover:bg-blue-50 hover:text-slate-900 focus:ring-2 focus:ring-blue-600")
      }
    >
      <span className="text-base" aria-hidden>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}


