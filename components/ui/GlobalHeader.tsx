"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

interface DropdownItem {
  name: string;
  href: string;
  description: string;
  icon: string;
}

export const GlobalHeader: React.FC = () => {
  const { t, isSv, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navLinks = [
    { name: t.nav.about, href: "/about" },
    { name: t.nav.events, href: "/events" },
    { name: t.nav.watch, href: "/watch" },
    { name: t.nav.churches, href: "/partners" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const dropdownItems: DropdownItem[] = [
    {
      name: isSv ? "Behöver du bön?" : "Need Prayer?",
      href: "/prayer",
      description: isSv ? "Dela personliga böneämnen" : "Submit personal intercession requests",
      icon: "volunteer_activism",
    },
    {
      name: t.nav.kingdomGiving,
      href: "/give",
      description: isSv ? "Stöd vårt stadsvida arbete" : "Support our citywide ministry fund",
      icon: "favorite",
    },
    {
      name: isSv ? "Lovsångsarkiv" : "Worship Archives",
      href: "/watch",
      description: isSv ? "Körinspelningar och lovsångskvällar" : "Choir recordings and night sessions",
      icon: "library_music",
    },
    {
      name: isSv ? "Partnerförsamlingar" : "Partner Assemblies",
      href: "/partners",
      description: isSv ? "Utforska församlingsnätverket" : "Explore Gothenburg fellowship hubs",
      icon: "church",
    },
  ];

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Floating Navbar Island (Morrow Church Floating Navbar Style) */}
      <header className="fixed top-4 sm:top-7 md:top-9 inset-x-0 z-40 flex justify-center px-4 sm:px-8 md:px-12 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto pointer-events-auto bg-[#EBF1F6]/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border border-white/70 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-lg h-16 lg:h-[70px] px-4 md:px-6 flex items-center justify-between transition-all duration-200">
          {/* Left: Brand Logo (Stand-Out Gospels Emblem & Wordmark) */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] rounded-md transition-transform"
            aria-label="GOSPELS Göteborg"
          >
            <div className="relative h-10 sm:h-11 md:h-12 px-3 py-1.5 flex items-center bg-white/90 dark:bg-slate-900/90 rounded-md border border-slate-200/70 dark:border-slate-700/70 shadow-sm group-hover:shadow-md group-hover:border-[#0D9488]/40 group-hover:scale-[1.02] transition-all duration-200">
              <Image
                src="/brand/gospels-logo-color.png"
                alt="GOSPELS Göteborg"
                width={160}
                height={52}
                priority
                className="h-8 sm:h-9 md:h-10 w-auto object-contain filter contrast-[1.05] drop-shadow-sm"
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/events"
                  ? pathname.startsWith("/events")
                  : link.href === "/watch"
                  ? pathname.startsWith("/watch")
                  : pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-150 py-1.5 px-1 ${
                    isActive
                      ? "text-[#0D9488] font-semibold"
                      : "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Ministries Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-150 py-1.5 px-1 focus:outline-none ${
                  dropdownOpen
                    ? "text-[#0D9488] font-semibold"
                    : "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <span>{t.nav.ministries}</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-[#0D9488]" : "text-slate-400"
                  }`}
                >
                  keyboard_arrow_down
                </span>
              </button>

              {/* Floating Dropdown Card */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 pt-3 w-72 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl rounded-md shadow-xl border border-white/80 dark:border-slate-700/80 p-2 space-y-1">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-md hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-md bg-teal-50 dark:bg-teal-950/60 text-[#0D9488] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                          <span className="material-symbols-outlined text-[18px]">
                            {item.icon}
                          </span>
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#0D9488] transition-colors leading-tight">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle: ENG | SWE */}
            <LanguageToggle />

            <Link
              href="/events/holy-spirit-worship"
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-md px-4 py-2 text-sm font-semibold transition-all shadow-sm active:scale-95 flex items-center gap-1.5 whitespace-nowrap group"
            >
              <span>{t.nav.nextEvent}</span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Mobile Right Cluster (Language Toggle + Next Event Pill + Rounded Hamburger Toggle) */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle size="sm" />

            <Link
              href="/events/holy-spirit-worship"
              className="bg-white/80 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[#00685f] dark:text-[#2DD4BF] text-xs font-semibold px-2.5 py-1.5 rounded-md flex items-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>{t.nav.nextEvent}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300/60 transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <span className="material-symbols-outlined text-xl leading-none">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Slides In from the Right) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Slide-over Drawer Panel from Right */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-[#EBF1F6] dark:bg-[#0F172A] shadow-2xl p-6 flex flex-col justify-between border-l border-white/60 dark:border-slate-800 overflow-y-auto"
              aria-label="Mobile Navigation"
            >
              <div className="space-y-6">
                {/* Header row with logo and Close Button */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 group focus:outline-none"
                    aria-label="GOSPELS Göteborg"
                  >
                    <div className="relative h-10 px-3 py-1 flex items-center bg-white/95 dark:bg-slate-900/95 rounded-md border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                      <Image
                        src="/brand/gospels-logo-color.png"
                        alt="GOSPELS Göteborg"
                        width={140}
                        height={45}
                        priority
                        className="h-8 w-auto object-contain filter contrast-[1.05]"
                      />
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Close Navigation Menu"
                  >
                    <span className="material-symbols-outlined text-xl leading-none">close</span>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1.5">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === "/events"
                        ? pathname.startsWith("/events")
                        : link.href === "/watch"
                        ? pathname.startsWith("/watch")
                        : pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                          isActive
                            ? "bg-white/90 dark:bg-slate-800 text-[#0D9488] shadow-xs"
                            : "text-slate-800 dark:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  {/* Ministries Collapsible Accordion */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <span>{t.nav.ministries}</span>
                      <span
                        className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                          mobileAccordionOpen ? "rotate-180 text-[#0D9488]" : "text-slate-400"
                        }`}
                      >
                        keyboard_arrow_down
                      </span>
                    </button>

                    {mobileAccordionOpen && (
                      <div className="pl-3 pr-1 pt-1.5 pb-2 space-y-1">
                        {dropdownItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800 hover:text-[#0D9488] transition-colors"
                          >
                            <span className="material-symbols-outlined text-base text-[#0D9488]">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </nav>
              </div>

              {/* Bottom Actions Cluster */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {t.nav.languageSelect}
                  </span>
                  <LanguageToggle size="sm" />
                </div>

                <Link
                  href="/events/holy-spirit-worship"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>{t.nav.nextEvent}</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
