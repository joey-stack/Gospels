"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export const WatchHero: React.FC = () => {
  const { isSv } = useLanguage();

  return (
    <section className="w-full px-2.5 sm:px-5 pt-2.5 sm:pt-5 bg-[#F8F9FF]">
      {/* Morrow Church Style Elevated Header Card */}
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 px-6 sm:px-12 md:px-16 shadow-xl border border-slate-200/50">
        {/* Subtle Atmospheric Background using provided upscaled asset */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png"
            alt={
              isSv
                ? "Göteborgskör i hängiven lovsång och tillbedjan"
                : "Gothenburg cathedral choir in praise and reverent worship"
            }
            fill
            priority
            quality={95}
            className="object-cover object-center brightness-95 contrast-[1.04] pointer-events-none"
            sizes="100vw"
          />
          {/* Soft translucent tint overlay allowing vivid picture clarity */}
          <div className="absolute inset-0 bg-[#0A1530]/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530]/70 via-[#0A1530]/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530]/70 via-[#0A1530]/20 to-transparent pointer-events-none" />
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
            <Link href="/" className="hover:text-white transition-colors">
              {isSv ? "Hem" : "Home"}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-[#2DD4BF] font-medium">
              {isSv ? "Se & Lyssna" : "Watch & Listen"}
            </span>
          </motion.nav>

          {/* Eyebrow Line with Accent Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-[#2DD4BF] mb-4"
          >
            <span className="w-6 h-[2px] bg-[#2DD4BF]" />
            <span>
              {isSv
                ? "GÖTEBORGS LJUDARKIV · LIVEINSPELNINGAR"
                : "GOTHENBURG SOUND ARCHIVE · LIVE RECORDINGS"}
            </span>
          </motion.div>

          {/* Main Headline matching Morrow Church typography hierarchy */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-hanken text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.1] mb-6"
          >
            {isSv ? (
              <>
                Varje lovsångssamling,{" "}
                <span className="font-eb italic font-normal text-[#2DD4BF]">
                  inspelad live.
                </span>
              </>
            ) : (
              <>
                Every worship gathering,{" "}
                <span className="font-eb italic font-normal text-[#2DD4BF]">
                  recorded live.
                </span>
              </>
            )}
          </motion.h1>

          {/* Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-inter text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed font-normal"
          >
            {isSv
              ? "Se hemifrån, lyssna under pendlingen eller fördjupa dig i körarrangemang och stämsång tillsammans med lovsångsledare över Göteborg."
              : "Watch from home, listen on your commute, or study choir polyphony and vocal arrangements with worship leaders across Gothenburg."}
          </motion.p>

          {/* Action CTAs: Morrow Church Two-Button Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#featured-session"
              className="w-full sm:w-auto bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm px-6 py-3 rounded-md transition-all duration-150 active:scale-95 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isSv ? "Se senaste samlingen" : "Watch latest gathering"}</span>
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>

            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-md border border-white/25 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-[#2DD4BF]">
                headphones
              </span>
              <span>{isSv ? "Lyssna på Spotify" : "Listen on Spotify"}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
