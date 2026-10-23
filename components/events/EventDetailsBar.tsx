"use client";

import React from "react";
import { motion } from "framer-motion";

export const EventDetailsBar: React.FC = () => {
  return (
    <section
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-[40px] -mt-12 sm:-mt-16 md:-mt-20 relative z-20 mb-12 md:mb-16"
      id="details-bar"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-lg border border-slate-200/90 shadow-xl p-5 sm:p-6 md:p-8 backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
      >
        {/* Date Item */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 first:pl-0">
          <div className="w-11 h-11 rounded-md bg-slate-100 flex items-center justify-center text-[#0D9488] shrink-0">
            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Date
            </span>
            <p className="font-hanken text-[16px] text-slate-900 font-semibold leading-snug">
              Datum meddelas (TBA)
            </p>
          </div>
        </div>

        {/* Time Item */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
          <div className="w-11 h-11 rounded-md bg-slate-100 flex items-center justify-center text-[#0D9488] shrink-0">
            <span className="material-symbols-outlined text-[24px]">schedule</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Time
            </span>
            <p className="font-hanken text-[16px] text-slate-900 font-semibold leading-snug">
              Tid meddelas inom kort
            </p>
          </div>
        </div>

        {/* Venue Item */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
          <div className="w-11 h-11 rounded-md bg-slate-100 flex items-center justify-center text-[#0D9488] shrink-0">
            <span className="material-symbols-outlined text-[24px]">location_on</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Venue
            </span>
            <p className="font-hanken text-[16px] text-slate-900 font-semibold leading-snug">
              Göteborg
            </p>
            <span className="text-xs text-slate-500">Plats meddelas inom kort</span>
          </div>
        </div>

        {/* Admission Item */}
        <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
          <div className="w-11 h-11 rounded-md bg-slate-100 flex items-center justify-center text-[#0D9488] shrink-0">
            <span className="material-symbols-outlined text-[24px]">confirmation_number</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Admission
            </span>
            <p className="font-hanken text-[16px] text-[#0D9488] font-semibold leading-snug">
              Complimentary Pass
            </p>
            <span className="text-xs text-slate-500">Open to all</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
