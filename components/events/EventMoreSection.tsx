"use client";

import React from "react";
import { motion } from "framer-motion";
import { EventCard, EventCardProps } from "@/components/ui/EventCard";

const UPCOMING_MORE_EVENTS: EventCardProps[] = [
  {
    id: "goteborgs-lovsangskonsert",
    title: "Göteborgs Lovsångskonsert",
    category: "City-Wide Outreach",
    categoryDotColor: "#2DD4BF",
    dateBadge: {
      day: "13",
      month: "Jun",
      weekday: "Sat",
    },
    timeString: "17:00 – 20:30",
    location: "Gustav Adolfs Torg, Göteborg",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png",
    imageAlt:
      "Worship leaders and choir singing with hands raised in city-wide praise",
    href: "/events/holy-spirit-worship",
  },
  {
    id: "gospels-worship-night",
    title: "Smyrna Frihamnen Gospel Gathering",
    category: "Ecumenical Gathering",
    categoryDotColor: "#0D9488",
    dateBadge: {
      day: "28",
      month: "Mar",
      weekday: "Sat",
    },
    timeString: "18:30 – 21:30",
    location: "Smyrna Frihamnskyrkan",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png",
    imageAlt:
      "Fellowship assembly united in praise and prayer across Gothenburg",
    href: "/events/holy-spirit-worship",
  },
];

export const EventMoreSection: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 py-14 sm:py-20 border-t border-slate-200/80 bg-white">
      {/* Section Header matching Morrow Church 'More events.' */}
      <div className="mb-8 sm:mb-10">
        <span className="text-xs uppercase tracking-widest text-[#0D9488] font-bold block mb-1">
          ALSO COMING UP
        </span>
        <h2 className="font-hanken text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight">
          More events.
        </h2>
      </div>

      {/* 2-Card Grid using Morrow Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {UPCOMING_MORE_EVENTS.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
};
