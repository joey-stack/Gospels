"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface MediaArchiveItem {
  id: string;
  date: string;
  speaker: string;
  duration: string;
  title: string;
  series: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  audioUrl?: string;
}

const FEATURED_ARCHIVE: MediaArchiveItem = {
  id: "archive-1",
  date: "MARCH 2026",
  speaker: "GOSPELS MASS CHOIR & ENSEMBLE",
  duration: "58 MIN",
  title: "Holy Spirit Worship Night — Live at Smyrna Frihamnskyrkan",
  series: "LIVE CONCERT ARCHIVE",
  description:
    "Full multicam video record and live acoustic sound from our citywide gathering in Frihamnen. An evening of unhurried gospel worship, intercession, and united voices representing congregations across Gothenburg.",
  imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png",
};

const PAST_GATHERING_ARCHIVES: MediaArchiveItem[] = [
  {
    id: "archive-2",
    date: "JUNE 2025",
    speaker: "GOSPELS OUTREACH CHOIR",
    duration: "46 MIN",
    title: "Göteborgs Lovsångskonsert — Gustav Adolfs Torg",
    series: "PUBLIC SQUARE CONCERT",
    description: "City Center Open Air · Full Concert Archive",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png",
  },
  {
    id: "archive-3",
    date: "FEBRUARY 2025",
    speaker: "NORDIC VOCAL COLLECTIVE",
    duration: "62 MIN",
    title: "Nordic Gospel & Choral Workshop Concert",
    series: "WORKSHOP FINALE",
    description: "Masterclass Concert · Live Multi-Track Audio",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png",
  },
  {
    id: "archive-4",
    date: "NOVEMBER 2024",
    speaker: "UNITED ECUMENICAL CHOIR",
    duration: "51 MIN",
    title: "Night of Intercession & Gospel Hymns",
    series: "LIVE ENCOUNTER",
    description: "Smyrna Frihamnskyrkan · Live Session Record",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_2.png",
  },
];

export const WatchMediaSection: React.FC = () => {
  const { isSv } = useLanguage();
  const [activeMedia, setActiveMedia] = useState<MediaArchiveItem>(FEATURED_ARCHIVE);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 md:py-16 scroll-mt-28" id="watch">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
          <div>
            {/* Small uppercase kicker with line */}
            <div className="flex items-center gap-2 text-[#0D9488] text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-5 h-[2px] bg-[#0D9488]" />
              <span>{isSv ? "MEDIEARKIV" : "MEDIA ARCHIVE"}</span>
            </div>
            <h2 className="font-hanken text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              {isSv
                ? "Inspelade samlingar och konserter."
                : "Video records of all gatherings & events."}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl font-inter">
              {isSv
                ? "Varje stadsvid lovsångssamling, utomhuskonsert och sångworkshop bevaras här med flerkameravideo och flerspårsljud."
                : "Every citywide worship gathering, outdoor gospel concert, and vocal workshop is preserved here with live multicam video and multi-track audio."}
            </p>
          </div>

          <Link
            href="/watch"
            className="mt-5 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-semibold tracking-wide transition-all shadow-xs group self-start md:self-end"
          >
            <span>{isSv ? "Alla inspelningar" : "All event records"}</span>
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Featured Large Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-lg md:rounded-xl overflow-hidden bg-slate-900 border border-slate-800/90 shadow-xl group min-h-[440px] sm:min-h-[480px] md:min-h-[520px] flex flex-col justify-end"
        >
          {/* Background Video Frame / Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={activeMedia.imageUrl}
              alt={activeMedia.title}
              fill
              priority
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 brightness-[0.72]"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/40 to-transparent" />
          </div>

          {/* Central Play Trigger - Hidden on mobile to avoid text collision, shown on sm+ */}
          <div className="hidden sm:flex absolute inset-0 z-10 items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="pointer-events-auto w-16 h-16 rounded-md bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-xl cursor-pointer"
              aria-label="Play recording"
            >
              <span
                className="material-symbols-outlined text-3xl text-white ml-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
          </div>

          {/* Bottom Card Content: Left Metadata + Right Action Buttons */}
          <div className="relative z-10 p-5 sm:p-8 md:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
            {/* Left: Metadata & Narrative */}
            <div className="max-w-2xl space-y-2.5 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-semibold tracking-wider text-slate-300 uppercase">
                <span className="text-[#2DD4BF] font-bold">{activeMedia.series}</span>
                <span className="text-slate-500">——</span>
                <span>{activeMedia.date}</span>
                <span className="text-slate-500">——</span>
                <span>{activeMedia.duration}</span>
              </div>

              <h3 className="font-hanken text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                {activeMedia.title}
              </h3>

              <p className="font-inter text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                {activeMedia.description}
              </p>
            </div>

            {/* Right: Action Buttons (Watch & Listen) */}
            <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white hover:bg-slate-100 text-[#0F172A] font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-md transition-all shadow-md active:scale-95 flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>
                  {isSv
                    ? isPlaying
                      ? "Pausa video"
                      : "Se inspelning"
                    : isPlaying
                    ? "Pause video"
                    : "Watch recording"}
                </span>
                <span
                  className="material-symbols-outlined text-base sm:text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                className="border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>
                  {isSv
                    ? isAudioPlaying
                      ? "Pausa ljud"
                      : "Lyssna på ljud"
                    : isAudioPlaying
                    ? "Pause audio"
                    : "Live audio"}
                </span>
                <span className="material-symbols-outlined text-base sm:text-lg text-[#2DD4BF]">
                  {isAudioPlaying ? "volume_up" : "headphones"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section: Past Recorded Gatherings */}
        <div className="mt-12 md:mt-18">
          {/* Section Kicker */}
          <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {isSv
                ? "INSPELADE SAMLINGAR & KONSERTER"
                : "RECORDED GATHERINGS & SESSIONS"}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {isSv
                ? "Välj en samling för att spela upp"
                : "Select any gathering to load video"}
            </span>
          </div>

          {/* 3-Card Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PAST_GATHERING_ARCHIVES.map((media, index) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => {
                  setActiveMedia(media);
                  setIsPlaying(true);
                  if (typeof window !== "undefined") {
                    const el = document.getElementById("watch");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Card with Duration Badge */}
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80 group-hover:border-[#0D9488]/40 transition-colors shadow-sm mb-4">
                  <Image
                    src={media.imageUrl}
                    alt={media.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Series Title Watermark / Overlay */}
                  <div className="absolute top-3 left-4 text-[10px] uppercase font-bold tracking-widest text-white/90">
                    {media.series}
                  </div>

                  {/* Duration Badge Bottom Right */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white tracking-wider flex items-center gap-1.5 shadow-xs border border-white/10">
                    <span
                      className="material-symbols-outlined text-xs text-white"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                    <span>{media.duration}</span>
                  </div>
                </div>

                {/* Metadata Below Image */}
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1.5">
                  <span>{media.date}</span>
                  <span className="text-slate-300">——</span>
                  <span className="text-slate-600 group-hover:text-[#0D9488] transition-colors font-medium">
                    {media.speaker}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-hanken text-lg font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors leading-snug">
                  {media.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
