"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, MessageCircle, PhoneCall, Heart } from "lucide-react";

export const PrayerHero: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 pt-3 sm:pt-4 pb-6">
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white border border-slate-700/60 shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 md:p-14">
        {/* Background Gothenburg Prayer Sanctuary Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png"
            alt="Gospels Gothenburg Prayer & Intercession Gathering"
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
            <span className="text-[#2DD4BF] font-medium">Need Prayer?</span>
          </nav>

          {/* Morrow Church Style Upper Dash Tag */}
          <div className="text-[11px] font-semibold text-[#2DD4BF] uppercase tracking-wider font-inter">
            — PRAYER &amp; INTERCESSION
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
            We’d love to pray with{" "}
            <span className="font-eb italic font-normal text-[#2DD4BF]">
              you.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="font-inter text-slate-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl"
          >
            A dedicated team of intercessors reads every request. For urgent care or emergency prayer, text or call{" "}
            <a href="tel:+46311234567" className="text-[#2DD4BF] font-medium hover:underline">
              +46 31 123 45 67
            </a>{" "}
            any time.
          </motion.p>
        </div>

        {/* Bottom Bar: Pastoral Trust & WhatsApp Emergency Intercession */}
        <div className="relative z-10 pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-inter text-xs text-slate-300">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
              <span>100% Confidential &amp; Pastoral Trust</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <Heart className="w-4 h-4 text-[#2DD4BF]" />
              <span>Citywide Gothenburg Intercession Chain</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/46311234567?text=Hello%20Gospels%20Gothenburg,%20I%20would%20like%20prayer%20for..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-[#2DD4BF] hover:text-white border border-[#2DD4BF]/30 transition-all text-xs font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Prayer Line ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
