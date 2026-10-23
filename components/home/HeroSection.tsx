"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Morrow Church Inspired Hero Section (Card style with outer padding and rounded corners)
export const HeroSection: React.FC = () => {
  const { t, isSv, language } = useLanguage();

  return (
    <section className="w-full px-2.5 sm:px-5 pt-2.5 sm:pt-5 bg-[#F8F9FF]">
      {/* Hero Card with Outer Padding & Rounded Corners matching Morrow Church */}
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0F172A] text-white pt-28 pb-24 sm:pt-36 sm:pb-32 md:pt-44 md:pb-40 px-6 sm:px-12 md:px-20 min-h-[640px] md:min-h-[740px] flex items-center shadow-xl border border-slate-200/50">
        {/* 1. High-Definition Sharp Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png"
            alt="Congregation praising with raised hands at Gothenburg gospel worship gathering"
            fill
            priority
            quality={82}
            className="object-cover object-center brightness-95 contrast-[1.04] blur-[3px] scale-105"
            sizes="100vw"
          />
          {/* Soft translucent tint overlay allowing vivid picture clarity */}
          <div className="absolute inset-0 bg-[#0F172A]/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/65 via-[#0F172A]/15 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/65 via-[#0F172A]/15 to-transparent pointer-events-none" />
        </div>

        {/* Atmospheric Ambient Glows */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-start text-left">
          {/* Morrow Kicker Line */}
          <motion.div
            key={`kicker-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-[#2DD4BF] mb-5"
          >
            <span className="w-6 h-[2px] bg-[#2DD4BF]" />
            <span>
              {isSv
                ? "FÖRENADE I LOVSÅNG ÖVER GÖTEBORG"
                : "UNITED IN PRAISE ACROSS GOTHENBURG"}
            </span>
          </motion.div>

          {/* Headline with Italic Serif Accent Word */}
          <motion.h1
            key={`h1-${language}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-hanken text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.1] mb-6"
          >
            {isSv ? (
              <>
                <span className="block sm:inline">Bär lovsången ut på </span>
                <span className="block sm:inline">
                  Göteborgs{" "}
                  <span className="font-eb italic font-normal text-[#2DD4BF]">
                    gator.
                  </span>
                </span>
              </>
            ) : (
              <>
                <span className="block sm:inline">Bring worship to the </span>
                <span className="block sm:inline">
                  streets of{" "}
                  <span className="font-eb italic font-normal text-[#2DD4BF]">
                    Gothenburg.
                  </span>
                </span>
              </>
            )}
          </motion.h1>

          {/* Narrative Subtitle */}
          <motion.p
            key={`p-${language}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-inter text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed font-normal"
          >
            {isSv
              ? "Förenar kyrkor, lovsångsledare och sökare över hela Göteborg genom hängivna gospelsamlingar och stadsvid lovsång."
              : "Connecting churches, worship leaders, and seekers across Gothenburg through reverent gospel music gatherings and citywide praise."}
          </motion.p>

          {/* Action Buttons: Morrow Style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/events/holy-spirit-worship"
              className="w-full sm:w-auto bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm px-6 py-3 rounded-md transition-all duration-150 active:scale-95 shadow-md hover:shadow-teal-500/25 flex items-center justify-center gap-2 group"
            >
              <span>{t.nav.nextEvent}</span>
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>

            <a
              href="#watch"
              className="w-full sm:w-auto px-5 py-3 rounded-md border border-white/25 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <span
                className="material-symbols-outlined text-base text-[#2DD4BF]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              <span>{isSv ? "Se senaste samlingen" : "Watch latest message"}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
