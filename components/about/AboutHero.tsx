"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Church, Music2, Sparkles, HeartHandshake } from "lucide-react";

export const AboutHero: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 pt-3 sm:pt-4 pb-6">
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white border border-slate-700/60 shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 md:p-14">
        {/* Background Gothenburg Choir Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.26.13_am.png"
            alt="Gospels Gothenburg Ecumenical Worship Movement"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 brightness-95 saturate-95"
          />
          {/* Multi-layered Nordic Reverence Teal Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530] via-[#0A1530]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530]/95 via-[#0A1530]/80 to-[#0A1530]/40" />
        </div>

        {/* Top: Breadcrumbs & Upper Dash Tag */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-300 font-inter">
            <Link href="/" className="hover:text-[#2DD4BF] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#2DD4BF] font-medium">About Gospels</span>
          </nav>

          {/* Morrow Church Style Upper Dash Tag */}
          <div className="text-[11px] font-semibold text-[#2DD4BF] uppercase tracking-wider font-inter">
            — ABOUT GOSPELS GÖTEBORG
          </div>
        </div>

        {/* Center: Main Editorial Headline & Description (Morrow Church Typography) */}
        <div className="relative z-10 max-w-3xl my-6 md:my-8">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-hanken text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.12]"
          >
            A choir rehearsal that turned into a{" "}
            <span className="font-eb italic font-normal text-[#2DD4BF]">
              movement.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="font-inter text-slate-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl"
          >
            Gospels began in 2024 with twelve worship leaders and a shared acoustic guitar in Frihamnen. Two years later, over twenty-four partner churches unite to lift Jesus over Gothenburg.
          </motion.p>
        </div>

        {/* Bottom Bar: Quick Movement Credentials */}
        <div className="relative z-10 pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-inter text-xs text-slate-300">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 text-slate-200">
              <Church className="w-4 h-4 text-[#2DD4BF]" />
              <span>24 Partner Assemblies</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <Music2 className="w-4 h-4 text-[#2DD4BF]" />
              <span>65-Voice Mass Choir</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <HeartHandshake className="w-4 h-4 text-[#2DD4BF]" />
              <span>John 17:21 Ecumenical Covenant</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-[#2DD4BF] hover:text-white border border-[#2DD4BF]/30 transition-all text-xs font-medium"
            >
              <span>Explore Gatherings ↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
