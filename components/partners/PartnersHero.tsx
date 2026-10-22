"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export const PartnersHero: React.FC = () => {
  const { isSv } = useLanguage();

  return (
    <section className="w-full px-2.5 sm:px-5 pt-2.5 sm:pt-5 bg-[#F8F9FF]">
      {/* Morrow Church Style Elevated Event Header Card */}
      <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 px-6 sm:px-12 md:px-16 shadow-xl border border-slate-200/50">
        {/* Subtle Atmospheric Ambient Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.26.13_am.png"
            alt={
              isSv
                ? "Troende och gospelkörer förenade över församlingsgränser i Göteborg"
                : "Christian believers and gospel choirs united across Gothenburg churches"
            }
            fill
            priority
            quality={95}
            className="object-cover object-center brightness-95 contrast-[1.04] pointer-events-none"
            sizes="100vw"
          />
          {/* Soft translucent tint overlay allowing vivid picture clarity */}
          <div className="absolute inset-0 bg-[#0A1530]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530]/75 via-[#0A1530]/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530]/75 via-[#0A1530]/25 to-transparent pointer-events-none" />
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
              {isSv ? "Partnerkyrkor" : "Partner Churches"}
            </span>
          </motion.nav>

          {/* Eyebrow Line with Accent Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-[#2DD4BF] mb-4"
          >
            <span className="w-7 h-[2px] bg-[#2DD4BF]" />
            <span>
              {isSv
                ? "EKUMENISK GEMENSKAP · VÄSTRA GÖTALAND"
                : "ECUMENICAL FELLOWSHIP · VÄSTRA GÖTALAND"}
            </span>
          </motion.div>

          {/* Main Title (H1) with Italic Serif Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-hanken text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.1] mb-6"
          >
            {isSv ? (
              <>
                En kropp, en röst över{" "}
                <span className="font-eb italic font-normal text-[#2DD4BF]">
                  Göteborg.
                </span>
              </>
            ) : (
              <>
                One body, one voice over{" "}
                <span className="font-eb italic font-normal text-[#2DD4BF]">
                  Gothenburg.
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-inter text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6"
          >
            {isSv
              ? "En förenad gemenskap av troende över lutherska, pingst-, evangeliska och internationella församlingar som lyfter Jesus tillsammans över Göteborg genom gospellovsång, bönehelger och stadsvida konserter."
              : "A unified body of believers across Lutheran, Pentecostal, Evangelical, and International congregations lifting Jesus together over Gothenburg through sacred gospel music, combined prayer vigils, and citywide worship concerts."}
          </motion.p>

          {/* Meta Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300 font-inter"
          >
            <span className="font-medium text-white">
              {isSv ? "24 Medlemsförsamlingar" : "24 Member Parishes"}
            </span>
            <span className="w-7 h-[1px] bg-white/25" />
            <span>{isSv ? "Göteborg & Västra Götaland" : "Gothenburg & Västra Götaland"}</span>
            <span className="w-7 h-[1px] bg-white/25" />
            <span>{isSv ? "4 Samlingsplatser" : "4 Fellowship Hubs"}</span>
            <span className="w-7 h-[1px] bg-white/25" />
            <span className="text-[#2DD4BF]">
              {isSv ? "Ekumenisk enhet i Kristus" : "Zero Denominational Compromise"}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
