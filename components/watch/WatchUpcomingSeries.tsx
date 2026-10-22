"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const WatchUpcomingSeries: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 py-6 sm:py-8">
      {/* Morrow Church Style Announcement Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white p-8 sm:p-12 md:p-14 relative border border-slate-800 shadow-xl"
      >
        {/* Background Image using upscaled asset */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png"
            alt="Outdoor municipal praise at Gustav Adolfs Torg"
            fill
            quality={95}
            className="object-cover object-center brightness-50 contrast-105 pointer-events-none"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530] via-[#0A1530]/85 to-[#0A1530]/40 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#2DD4BF]">
            <span className="w-4 h-[2px] bg-[#2DD4BF]" />
            <span>COMING SUMMER 2027</span>
          </div>

          <h3 className="font-hanken text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
            Göteborgs Lovsångskonsert — Live from Gustav Adolfs Torg.
          </h3>

          <p className="font-inter text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
            A citywide outdoor mass choir bringing Swedish and English gospel songs straight into Gothenburg’s municipal heart. Live 4K multi-camera stream and multi-track recording will be archived here immediately following the broadcast.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-inter">
            <span className="px-3 py-1.5 rounded-md bg-white/10 text-white font-medium border border-white/15">
              Saturday, June 12, 2027
            </span>
            <span className="px-3 py-1.5 rounded-md bg-white/10 text-white font-medium border border-white/15">
              Gustav Adolfs Torg, Göteborg
            </span>
            <Link
              href="/events/holy-spirit-worship"
              className="inline-flex items-center gap-1.5 text-[#2DD4BF] hover:text-white font-semibold transition-colors"
            >
              <span>Event Details</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
