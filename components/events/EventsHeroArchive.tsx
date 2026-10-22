"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const EventsHeroArchive: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 pt-2.5 sm:pt-5 bg-[#F8F9FF]">
      {/* Morrow Church Style Elevated Event Header Card */}
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 px-6 sm:px-12 md:px-16 shadow-xl border border-slate-200/50">
        {/* Subtle Atmospheric Ambient Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.26.12_am_1.png"
            alt="Congregation praising together across Gothenburg ministries"
            fill
            priority
            quality={95}
            className="object-cover object-center brightness-95 contrast-[1.04] pointer-events-none"
            sizes="100vw"
          />
          {/* Soft translucent tint overlay allowing vivid picture clarity */}
          <div className="absolute inset-0 bg-[#0A1530]/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530]/65 via-[#0A1530]/15 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530]/65 via-[#0A1530]/15 to-transparent pointer-events-none" />
        </div>

        {/* Ambient Teal Lighting Spheres */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-16 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Content Stack */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-start text-left">
          {/* Breadcrumb Navigation */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-inter text-slate-400 mb-6"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-[#2DD4BF] font-medium">Events</span>
          </motion.nav>

          {/* Eyebrow Line with Accent Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-[#2DD4BF] mb-4"
          >
            <span className="w-7 h-[2px] bg-[#2DD4BF]" />
            <span>THE GOSPELS CALENDAR · GÖTEBORG MINISTRY NETWORK</span>
          </motion.div>

          {/* Main Title (H1) with Italic Serif Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-hanken text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.1] mb-6"
          >
            The calendar beyond{" "}
            <span className="font-eb italic font-normal text-[#2DD4BF]">
              Sunday.
            </span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-inter text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6"
          >
            Citywide praise nights, open-air street choir worship, vocal masterclasses, and sacred prayer vigils across Gothenburg. As a non-profit gospel music ministry organization, we unite vocalists, musicians, and partner churches across all traditions.
          </motion.p>

          {/* Meta Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300 font-inter"
          >
            <span className="font-medium text-white">2 Upcoming Gatherings</span>
            <span className="w-7 h-[1px] bg-white/25" />
            <span>Gothenburg &amp; Västra Götaland</span>
            <span className="w-7 h-[1px] bg-white/25" />
            <span>Non-Profit Organization</span>
            <span className="w-7 h-[1px] bg-white/25" />
            <span className="text-[#2DD4BF]">Complimentary Open Access</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
