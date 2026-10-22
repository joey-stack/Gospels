"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Ticket, Landmark, ChevronRight, Sparkles } from "lucide-react";

export const GiveHero: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 pt-3 sm:pt-4 pb-6">
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white border border-slate-700/60 shadow-xl min-h-[460px] md:min-h-[500px] flex flex-col justify-between p-6 sm:p-10 md:p-14">
        {/* Background Gothenburg Choir / Worship Backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.26.13_am.png"
            alt="Gospels Gothenburg Kingdom Worship and Choral Giving"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 brightness-90 saturate-90"
          />
          {/* Multi-layered Nordic Reverence Teal Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530] via-[#0A1530]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530]/95 via-[#0A1530]/80 to-[#0A1530]/40" />
        </div>

        {/* Top: Breadcrumbs & Ministry Hub Pill */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-300 font-inter">
            <Link href="/" className="hover:text-[#2DD4BF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#2DD4BF] font-medium">Kingdom Giving</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 border border-white/15 text-[#2DD4BF] text-xs font-semibold uppercase tracking-wider font-inter">
            <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
            <span>Kingdom Stewardship · Gothenburg Ministry Hub</span>
          </div>
        </div>

        {/* Center: Main Headline & Theological Subtext */}
        <div className="relative z-10 max-w-3xl my-6 md:my-8">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-hanken text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.12]"
          >
            Support the Worship of Jesus in{" "}
            <span className="font-eb italic font-normal text-[#2DD4BF]">
              Gothenburg.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-inter text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6"
          >
            GOSPELS is entirely non-profit and community supported. Every Swedish krona empowers city square worship, inter-church choral training, open public concerts, and continuous prayer across West Sweden.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="pt-2 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-300 font-inter"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2DD4BF] shrink-0" />
              <span>Registered Non-Profit 802490-1234</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#2DD4BF] shrink-0" />
              <span>100% Open Public Entry to All Gatherings</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#2DD4BF] shrink-0" />
              <span>Annual Public Audited Accounts</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stat Highlights */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-inter text-slate-300">
          <div className="flex items-center gap-6">
            <div>
              <span className="font-hanken text-lg sm:text-xl font-bold text-white">0 kr</span>
              <span className="text-slate-400 ml-1.5">Admission to worship nights</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/15" />
            <div>
              <span className="font-hanken text-lg sm:text-xl font-bold text-[#2DD4BF]">100%</span>
              <span className="text-slate-400 ml-1.5">Voluntary fellowship funded</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
            <span>Bankgiro: 5542-8891 · Swish: 123 456 78 90</span>
          </div>
        </div>
      </div>
    </section>
  );
};
