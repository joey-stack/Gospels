"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventRowCard, EventRowCardProps } from "@/components/ui/EventRowCard";

type EventCategoryFilter = "all" | "indoor" | "public-square";

interface ExtendedEventRowCardProps extends EventRowCardProps {
  filterType: "indoor" | "public-square";
  description: string;
}

const ALL_EVENTS: ExtendedEventRowCardProps[] = [
  {
    id: "holy-spirit-worship",
    title: "Holy Spirit Worship 2026",
    category: "Indoor Sacred Gathering",
    categoryDotColor: "#0D9488",
    filterType: "indoor",
    dateBadge: {
      day: "28",
      month: "Mar",
      weekday: "Sat",
    },
    timeString: "18:30 – 21:30 CET",
    location: "Smyrna Frihamnskyrkan, Gothenburg",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png",
    imageAlt:
      "Congregation in reverent praise and unified worship at Holy Spirit Worship gathering in Gothenburg",
    href: "/events/holy-spirit-worship",
    description:
      "An unhurried evening of deep contemplation, choir polyphony, and spontaneous adoration across Gothenburg's partner churches.",
  },
  {
    id: "goteborgs-lovsangskonsert",
    title: "Göteborgs Lovsångskonsert 2027",
    category: "Public Square Outreach",
    categoryDotColor: "#2DD4BF",
    filterType: "public-square",
    dateBadge: {
      day: "12",
      month: "Jun",
      weekday: "Sat",
    },
    timeString: "17:00 – 20:30 CET",
    location: "Gustav Adolfs Torg, Göteborg",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png",
    imageAlt:
      "Worship leaders and choir singing with hands raised in city-wide praise",
    href: "/events/holy-spirit-worship",
    description:
      "Citywide mass choir bringing Swedish and English gospel songs straight into Gothenburg's historic municipal heart.",
  },
];

const FILTER_TABS: { key: EventCategoryFilter; label: string }[] = [
  { key: "all", label: "All Gatherings" },
  { key: "indoor", label: "Indoor Worship" },
  { key: "public-square", label: "Public Square Outreach" },
];

export const EventsCatalogClient: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<EventCategoryFilter>("all");

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return ALL_EVENTS;
    return ALL_EVENTS.filter((e) => e.filterType === activeFilter);
  }, [activeFilter]);

  const countForFilter = (filterKey: EventCategoryFilter) => {
    if (filterKey === "all") return ALL_EVENTS.length;
    return ALL_EVENTS.filter((e) => e.filterType === filterKey).length;
  };

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 sm:py-16 md:py-20 bg-[#F8F9FF]" id="events-catalogue">
      {/* Section Header matching Morrow Church: Eyebrow + H2 + Description */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#0D9488] font-semibold block mb-2">
            COMING UP
          </span>
          <h2 className="font-hanken text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight">
            Upcoming Gatherings in Gothenburg.
          </h2>
          <p className="font-inter text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
            Tap an event for details and RSVP. All gatherings offer complimentary open guest admission.
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200/80 shadow-xs text-xs font-inter text-slate-600 shrink-0 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
          <span>Active Calendar · 2 Gatherings</span>
        </div>
      </div>

      {/* Filter Tabs Bar (Refined architectural rounded-md buttons) */}
      <div className="w-full pt-8 pb-10 flex flex-wrap items-center gap-2.5">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.key;
          const count = countForFilter(tab.key);
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-inter transition-all duration-200 border cursor-pointer ${
                isActive
                  ? "bg-[#0A1530] text-white border-[#0A1530] shadow-xs font-semibold"
                  : "bg-white text-slate-600 border-slate-200/80 hover:border-slate-400 hover:text-slate-900 font-medium"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold leading-none ${
                  isActive
                    ? "bg-white/20 text-[#2DD4BF]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Events List of Horizontal EventRowCards */}
      <AnimatePresence mode="wait">
        {filteredEvents.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4 sm:gap-5 w-full"
          >
            {filteredEvents.map((event) => (
              <EventRowCard key={event.id} {...event} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full py-16 px-6 text-center bg-white rounded-lg border border-dashed border-slate-300 max-w-xl mx-auto my-8"
          >
            <h4 className="font-hanken text-lg font-bold text-slate-900 mb-2">
              No events found in this category
            </h4>
            <p className="font-inter text-sm text-slate-500 mb-6">
              Explore our full calendar or submit an ecumenical praise gathering for Gothenburg.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="px-4 py-2 rounded-md bg-[#0A1530] text-white text-xs font-semibold hover:bg-[#14224A] transition-colors cursor-pointer"
            >
              Reset to All Gatherings
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
