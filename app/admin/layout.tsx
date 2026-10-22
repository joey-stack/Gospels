"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSv } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/admin",
      label: isSv ? "Översikt" : "Dashboard",
      icon: "dashboard",
      badge: null,
    },
    {
      href: "/admin/scan",
      label: isSv ? "Entrékontroll (Scanner)" : "Gate Scanner",
      icon: "qr_code_scanner",
      badge: isSv ? "Live" : "Live",
      badgeColor: "bg-[#0D9488] text-white",
    },
    {
      href: "/admin/tickets",
      label: isSv ? "Gästlista & Biljetter" : "RSVP Attendees",
      icon: "confirmation_number",
      badge: "1.2k",
      badgeColor: "bg-slate-200 text-slate-700",
    },
    {
      href: "/events",
      label: isSv ? "Publik Webbplats" : "Public Site",
      icon: "open_in_new",
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row font-inter">
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 min-h-screen sticky top-0 h-screen justify-between z-20">
        <div>
          {/* Logo & Platform Title */}
          <div className="p-6 border-b border-slate-200/80 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 no-underline">
              <div className="w-9 h-9 rounded-md bg-[#0D9488] flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-xl">church</span>
              </div>
              <div className="flex flex-col">
                <span className="font-hanken font-bold text-base text-slate-900 tracking-tight leading-none">
                  GOSPELS Admin
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#0D9488] mt-1">
                  Gothenburg Ministry Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Gate Scanner Button */}
          <div className="p-4">
            <Link
              href="/admin/scan"
              className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold py-2.5 px-3.5 rounded-md flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 no-underline"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              <span>{isSv ? "Öppna Entréscanner" : "Launch Gate Scanner"}</span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-semibold transition-colors no-underline ${
                    isActive
                      ? "bg-[#F0FDFA] text-[#0D9488] border border-[#0D9488]/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isActive ? "text-[#0D9488]" : "text-slate-400"
                      }`}
                    >
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        link.badgeColor || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pastoral Profile Card in Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/30 flex items-center justify-center text-[#0D9488] font-bold text-sm shrink-0">
              TS
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">
                Tomas Sjödin
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                {isSv ? "Pastoral Föreståndare" : "Lead Pastoral Steward"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <Link href="/admin" className="flex items-center gap-2 no-underline">
            <div className="w-7 h-7 rounded-md bg-[#0D9488] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-base">church</span>
            </div>
            <span className="font-hanken font-bold text-sm text-slate-900">
              GOSPELS Admin
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/scan"
              className="p-1.5 rounded-md bg-[#0D9488] text-white flex items-center"
              title="Scanner"
            >
              <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-xs font-semibold text-slate-700"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-lg text-[#0D9488]">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 px-8 items-center justify-between sticky top-0 z-10 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="text-xs font-semibold text-slate-700">
              {isSv
                ? "Smyrna Frihamnskyrkan • Entré B & Huvudsalen Redo"
                : "Smyrna Frihamnskyrkan • Entrance B & Sanctuary Ready"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-medium text-slate-500 hover:text-[#0D9488] flex items-center gap-1 transition-colors no-underline"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>{isSv ? "Till hemsidan" : "Back to Home"}</span>
            </Link>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
