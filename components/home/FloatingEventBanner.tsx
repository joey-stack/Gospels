"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingEventBanner: React.FC = () => {
  const { isSv } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-[40px] -mt-12 sm:-mt-16 md:-mt-20 relative z-20 mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-lg border border-slate-200/90 shadow-xl p-5 sm:p-6 md:p-8 backdrop-blur-md"
      >
        {/* Layout: Single clean structure on mobile matching EventHero card, expanding horizontally on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
          {/* Top/Left: Calendar Box + Gathering Info */}
          <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
            {/* Calendar Date Box - TBA state */}
            <div className="w-16 sm:w-20 rounded-md overflow-hidden border border-[#0D9488]/30 shrink-0 text-center shadow-xs">
              <div className="bg-[#0D9488] text-white text-[10px] sm:text-[11px] py-1 uppercase font-bold tracking-widest">
                {isSv ? "DATUM" : "DATE"}
              </div>
              <div className="bg-slate-50 py-2 sm:py-2.5 font-hanken text-lg sm:text-xl font-bold text-slate-900 tracking-wider">
                TBA
              </div>
            </div>

            {/* Event Name & Gathering Details */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#0D9488] uppercase font-bold tracking-wider">
                  {isSv ? "Kommande samling" : "Upcoming Gathering"}
                </span>
                <span className="text-slate-300 text-xs hidden sm:inline">·</span>
                <span className="text-slate-500 text-xs hidden sm:inline">
                  {isSv ? "Göteborg, Sverige" : "Gothenburg, Sweden"}
                </span>
              </div>

              <h3 className="font-hanken text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-tight">
                {isSv ? "Göteborg Worship Night" : "Gothenburg Worship Night"}
              </h3>

              <p className="font-inter text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 pt-0.5">
                <span className="material-symbols-outlined text-base text-[#0D9488] shrink-0">
                  location_on
                </span>
                <span className="truncate">
                  {isSv
                    ? "Göteborg · Plats meddelas inom kort"
                    : "Gothenburg · Venue to be announced"}
                </span>
              </p>
            </div>
          </div>

          {/* Divider on mobile */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 lg:pt-0 lg:border-t-0 lg:shrink-0">
            <div className="flex items-center justify-between sm:justify-start gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#0D9488]">
                  schedule
                </span>
                {isSv ? "Tid & datum meddelas snart" : "Date & time announced soon"}
              </span>
              <span className="text-[#0D9488] font-semibold bg-[#F0FDFA] px-2.5 py-1 rounded-md border border-[#2DD4BF]/30">
                {isSv ? "Öppet inträde" : "Complimentary entry"}
              </span>
            </div>

            {/* CTA RSVP Button */}
            <Link
              href="/events/holy-spirit-worship"
              className="w-full sm:w-auto bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm px-6 sm:px-8 py-3 rounded-md transition-all duration-150 active:scale-95 shadow-md hover:shadow-teal-600/25 flex items-center justify-center gap-2"
            >
              <span>{isSv ? "Boka plats" : "Reserve Pass"}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
