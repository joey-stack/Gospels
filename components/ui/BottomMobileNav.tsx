"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomMobileNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: "home", exact: true },
    { name: "Events", href: "/events/holy-spirit-worship", icon: "calendar_month", exact: false },
    { name: "Watch", href: "/#watch", icon: "library_music", exact: false },
    { name: "Prayer", href: "/#prayer", icon: "volunteer_activism", exact: false },
    { name: "Give", href: "/give", icon: "favorite", exact: false },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800/90 py-1.5 px-2 flex justify-around items-center md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      {navItems.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors duration-150 min-w-[56px] ${
              isActive
                ? "text-[#00685f] dark:text-[#2DD4BF] font-semibold"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] transition-transform ${
                isActive ? "scale-105" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] tracking-tight mt-0.5 leading-none">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
