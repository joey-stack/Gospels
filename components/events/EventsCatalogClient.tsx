"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventRowCard, EventRowCardProps } from "@/components/ui/EventRowCard";

import { useLanguage } from "@/context/LanguageContext";

type EventCategoryFilter = "all" | "indoor" | "public-square";

interface ExtendedEventRowCardProps extends EventRowCardProps {
  filterType: "indoor" | "public-square";
  description: string;
}

export const EventsCatalogClient: React.FC = () => {
  const { isSv } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<EventCategoryFilter>("all");

  const filterTabs: { key: EventCategoryFilter; label: string }[] = useMemo(
    () => [
      { key: "all", label: isSv ? "Alla samlingar" : "All Gatherings" },
      { key: "indoor", label: isSv ? "Lovsångskvällar" : "Indoor Worship" },
      { key: "public-square", label: isSv ? "Torglovsång" : "Public Square Outreach" },
    ],
    [isSv]
  );

  const allEvents: ExtendedEventRowCardProps[] = useMemo(
    () => [
      {
        id: "holy-spirit-worship",
        title: "Holy Spirit Worship 2026",
        category: isSv ? "Lovsångskväll inomhus" : "Indoor Sacred Gathering",
        categoryDotColor: "#0D9488",
        filterType: "indoor",
        status: "REGISTRATION_OPEN",
        dateBadge: {
          day: "28",
          month: isSv ? "Mar" : "Mar",
          weekday: isSv ? "Lör" : "Sat",
        },
        timeString: "18:30 – 21:30 CET",
        location: isSv ? "Smyrna Frihamnskyrkan, Göteborg" : "Smyrna Frihamnskyrkan, Gothenburg",
        imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png",
        imageAlt: isSv
          ? "Församlingen i tillbedjan och lovsång vid Holy Spirit Worship i Göteborg"
          : "Congregation in reverent praise and unified worship at Holy Spirit Worship gathering in Gothenburg",
        href: "/events/holy-spirit-worship",
        description: isSv
          ? "En kväll präglad av bön, körharmoni och spontan tillbedjan tillsammans med Göteborgs partnerkyrkor."
          : "An unhurried evening of deep contemplation, choir polyphony, and spontaneous adoration across Gothenburg's partner churches.",
      },
      {
        id: "goteborgs-lovsangskonsert",
        title: isSv ? "Göteborgs Lovsångskonsert 2027" : "Gothenburg Praise Concert 2027",
        category: isSv ? "Torglovsång & Evangelisation" : "Public Square Outreach",
        categoryDotColor: "#2DD4BF",
        filterType: "public-square",
        status: "YET_TO_COME",
        dateBadge: {
          day: "12",
          month: isSv ? "Jun" : "Jun",
          weekday: isSv ? "Lör" : "Sat",
        },
        timeString: "17:00 – 20:30 CET",
        location: "Gustav Adolfs Torg, Göteborg",
        imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png",
        imageAlt: isSv
          ? "Lovsångsledare och kör med lyfta händer i lovsång"
          : "Worship leaders and choir singing with hands raised in city-wide praise",
        href: "/events/holy-spirit-worship",
        description: isSv
          ? "Stadsvid masskör som framför gospelsånger på svenska och engelska mitt i Göteborgs historiska hjärta. Anmälan öppnar våren 2027."
          : "Citywide mass choir bringing Swedish and English gospel songs straight into Gothenburg's historic municipal heart. Registration opens Spring 2027.",
      },
      {
        id: "nordic-gospel-autumn-2027",
        title: isSv ? "Nordisk Gospelkonferens & Lovsång 2027" : "Nordic Gospel Conference & Worship 2027",
        category: isSv ? "Körledarworkshop & Konferens" : "Leadership Summit & Mass Choir",
        categoryDotColor: "#F59E0B",
        filterType: "indoor",
        status: "YET_TO_COME",
        dateBadge: {
          day: "16",
          month: isSv ? "Okt" : "Oct",
          weekday: isSv ? "Lör" : "Sat",
        },
        timeString: "10:00 – 22:00 CET",
        location: isSv ? "Betlehemskyrkan, Göteborg" : "Betlehemskyrkan, Gothenburg",
        imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am.png",
        imageAlt: isSv
          ? "Gospelkör och dirigenter under repetition i kyrksalen"
          : "Gospel choir and conductors during rehearsal in sanctuary",
        href: "/events/holy-spirit-worship",
        description: isSv
          ? "Heldagsmöte för körer och lovsångsteam från hela Norden. Program och anmälningslänk släpps under sommaren 2027."
          : "Full-day convening for choirs and worship teams across the Nordic nations. Full itinerary and registration release in Summer 2027.",
      },
    ],
    [isSv]
  );

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return allEvents;
    return allEvents.filter((e) => e.filterType === activeFilter);
  }, [activeFilter, allEvents]);

  const countForFilter = (filterKey: EventCategoryFilter) => {
    if (filterKey === "all") return allEvents.length;
    return allEvents.filter((e) => e.filterType === filterKey).length;
  };

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 sm:py-16 md:py-20 bg-[#F8F9FF]" id="events-catalogue">
      {/* Section Header matching Morrow Church: Eyebrow + H2 + Description */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#0D9488] font-semibold block mb-2">
            {isSv ? "KOMMANDE SAMLINGAR" : "COMING UP"}
          </span>
          <h2 className="font-hanken text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight">
            {isSv ? "Kommande samlingar i Göteborg." : "Upcoming Gatherings in Gothenburg."}
          </h2>
          <p className="font-inter text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
            {isSv
              ? "Klicka på en samling för detaljer och anmälan. Alla samlingar har öppet inträde för alla."
              : "Tap an event for details and RSVP. All gatherings offer complimentary open guest admission."}
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200/80 shadow-xs text-xs font-inter text-slate-600 shrink-0 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
          <span>
            {isSv
              ? `Aktiv Kalender · ${allEvents.length} Samlingar`
              : `Active Calendar · ${allEvents.length} Gatherings`}
          </span>
        </div>
      </div>

      {/* Filter Tabs Bar (Refined architectural rounded-md buttons) */}
      <div className="w-full pt-8 pb-10 flex flex-wrap items-center gap-2.5">
        {filterTabs.map((tab) => {
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
              {isSv ? "Inga samlingar i denna kategori" : "No events found in this category"}
            </h4>
            <p className="font-inter text-sm text-slate-500 mb-6">
              {isSv
                ? "Utforska vår fullständiga kalender eller anmäl en ekumenisk lovsångssamling i Göteborg."
                : "Explore our full calendar or submit an ecumenical praise gathering for Gothenburg."}
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="px-4 py-2 rounded-md bg-[#0A1530] text-white text-xs font-semibold hover:bg-[#14224A] transition-colors cursor-pointer"
            >
              {isSv ? "Återställ till alla samlingar" : "Reset to All Gatherings"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
