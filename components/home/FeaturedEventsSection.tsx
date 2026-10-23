"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EventCard, EventCardProps } from "@/components/ui/EventCard";

import { useLanguage } from "@/context/LanguageContext";

export const FeaturedEventsSection: React.FC = () => {
  const { isSv } = useLanguage();

  const events: EventCardProps[] = [
    {
      id: "holy-spirit-worship",
      title: isSv ? "Göteborg Worship Night" : "Gothenburg Worship Night",
      category: isSv ? "Lovsångskväll i Göteborg" : "Gothenburg Worship Night",
      categoryDotColor: "#0D9488",
      dateBadge: {
        day: "TBA",
        month: isSv ? "DATUM" : "DATE",
        weekday: isSv ? "Datum meddelas" : "Date TBA",
      },
      timeString: isSv ? "Tid meddelas inom kort" : "Time announced soon",
      location: isSv ? "Göteborg · Plats meddelas" : "Gothenburg · Venue TBA",
      imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png",
      imageAlt: isSv
        ? "Församlingen i tillbedjan och lovsång vid Gothenburg Worship Night i Göteborg"
        : "Congregation in reverent praise and unified worship at Gothenburg Worship Night gathering in Gothenburg",
      href: "/events/holy-spirit-worship",
      status: "REGISTRATION_OPEN",
    },
    {
      id: "goteborgs-lovsangskonsert",
      title: isSv ? "Göteborgs Lovsångskonsert" : "Gothenburg Praise Concert",
      category: isSv ? "Torglovsång & Evangelisation" : "City-Wide Outreach",
      categoryDotColor: "#2DD4BF",
      status: "YET_TO_COME",
      dateBadge: {
        day: "TBA",
        month: isSv ? "DATUM" : "DATE",
        weekday: isSv ? "Datum meddelas" : "Date TBA",
      },
      timeString: isSv ? "Tid meddelas inom kort" : "Time announced soon",
      location: "Gustav Adolfs Torg, Göteborg",
      imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png",
      imageAlt: isSv
        ? "Lovsångsledare och masskör med lyfta händer i torglovsång"
        : "Worship leaders and choir singing with hands raised in city-wide praise",
      href: "/events/holy-spirit-worship",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full px-2.5 sm:px-5 py-12 md:py-16 scroll-mt-28"
      id="events"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
        <div>
          {/* Small uppercase kicker with line */}
          <div className="flex items-center gap-2 text-[#0D9488] text-xs font-semibold tracking-widest uppercase mb-3">
            <span className="w-5 h-[2px] bg-[#0D9488]" />
            <span>{isSv ? "KALENDER & SAMLINGAR" : "CALENDAR & GATHERINGS"}</span>
          </div>
          <h2 className="font-hanken text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isSv ? "Utvalda Samlingar & Konserter." : "Featured Ministry Events."}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl font-inter">
            {isSv
              ? "Alla samlingar är öppna för varje samfund, göteborgare och besökare i vår stad."
              : "All gatherings are open to every denomination, city resident, and newcomer across Gothenburg."}
          </p>
        </div>

        <Link
          href="/events"
          className="mt-5 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-semibold tracking-wide transition-all shadow-xs group self-start md:self-end"
        >
          <span>{isSv ? "Alla kommande samlingar" : "All upcoming gatherings"}</span>
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* 2-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </motion.section>
  );
};
