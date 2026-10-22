"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const EventsNewHereSection: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 py-12 sm:py-16 md:py-20 bg-[#F8F9FF]">
      {/* Elevated Card tailored to Gospels Non-Profit Organization */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full rounded-lg md:rounded-xl bg-[#0A1530] text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-xl border border-slate-800"
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mission & Identity as an Organization */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2DD4BF]">
              <span className="w-6 h-[2px] bg-[#2DD4BF]" />
              <span>GOTHENBURG URBAN GOSPEL FELLOWSHIP · NON-PROFIT</span>
            </div>

            <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              New to GOSPELS?{" "}
              <span className="font-eb italic font-normal text-[#2DD4BF]">
                Step into the fellowship.
              </span>
            </h2>

            <p className="font-inter text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              GOSPELS is a non-profit gospel music organization and ecumenical network uniting vocalists, musicians, and independent assemblies across Gothenburg. We are not a single church congregation—we are a cross-denominational movement dedicated to vocal praise and unity.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400 font-inter">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                Non-Profit Foundation
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                All Traditions Welcome
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                Vocalists &amp; Musicians
              </span>
            </div>
          </div>

          {/* Right Column: Ways to Participate & CTA Actions */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-7 border border-white/10 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#2DD4BF] block mb-1">
                WAYS TO PARTICIPATE
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-inter mt-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#2DD4BF] font-bold">✓</span>
                  <span><strong>Sing in the Mass Choir:</strong> Open auditions and seasonal vocal workshops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2DD4BF] font-bold">✓</span>
                  <span><strong>Partner as a Fellowship:</strong> Connect your assembly or choir to citywide worship nights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2DD4BF] font-bold">✓</span>
                  <span><strong>Volunteer:</strong> Sound production, event coordination, prayer, and hospitality.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/events/holy-spirit-worship#rsvp"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[#2DD4BF] text-slate-950 font-inter text-xs sm:text-sm font-semibold hover:bg-[#14B8A6] transition-colors shadow-xs text-center"
              >
                RSVP for Next Event
              </Link>

              <Link
                href="/#churches"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-white/10 text-white font-inter text-xs sm:text-sm font-medium hover:bg-white/15 transition-colors border border-white/15 text-center"
              >
                Explore Partner Hubs
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
