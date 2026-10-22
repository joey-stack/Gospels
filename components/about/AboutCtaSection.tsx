"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Heart, MessageCircle } from "lucide-react";

export const AboutCtaSection: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-12 sm:my-18 mb-20 sm:mb-28 font-inter">
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-lg md:rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 p-8 sm:p-12 md:p-16 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider block">
              — GET INVOLVED
            </span>
            <h2 className="font-hanken text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Come sing, pray, or stand with us.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether you want to join the 65-voice mass choir, attend our next city praise night at Frihamnen, or submit a personal intercession request, there is a place for you in the fellowship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-medium transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#2DD4BF]" />
              <span>Upcoming Events</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#0D9488]" />
              <span>Contact &amp; Prayer</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
