"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { InteractiveVideoModal, VideoModalData } from "./InteractiveVideoModal";

export const WatchFeaturedSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<VideoModalData | null>(null);

  const featuredSession: VideoModalData = {
    title: "Holy Spirit Worship 2026 — Live at Smyrna Frihamnen",
    speaker: "GOSPELS MASS CHOIR & ENSEMBLE",
    date: "MARCH 2026",
    duration: "58 MIN",
    location: "Smyrna Frihamnskyrkan, Gothenburg",
    videoSrc: "/assets/WhatsApp_Video_2026-10-16_at_8.28.07_AM.mp4",
    description:
      "Full multicam video record and live acoustic sound from our citywide gathering in Frihamnen. An evening of unhurried gospel worship, intercession, and united voices representing congregations across Gothenburg.",
  };

  const handleOpenPlayer = () => {
    setModalData(featuredSession);
    setModalOpen(true);
  };

  return (
    <>
      <section className="w-full px-2.5 sm:px-5 py-10 sm:py-14" id="featured-session">
        <div className="w-full">
          {/* Section Kicker */}
          <div className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-[#0D9488] mb-3">
            <span className="w-5 h-[2px] bg-[#0D9488]" />
            <span>FEATURED RECORDING · CURRENT SEASON</span>
          </div>

          <h2 className="font-hanken text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 sm:mb-10">
            Holy Spirit Worship Live.
          </h2>

          {/* Featured Large Video Card: Morrow Church Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg md:rounded-xl overflow-hidden bg-slate-900 border border-slate-800/90 shadow-2xl group min-h-[460px] sm:min-h-[500px] md:min-h-[560px] flex flex-col justify-end"
          >
            {/* Background Video Frame / Image using upscaled asset */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png"
                alt="Holy Spirit Worship Night at Smyrna Frihamnen"
                fill
                priority
                quality={95}
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 brightness-[0.78]"
                sizes="100vw"
              />
              {/* Dark subtle gradient overlay allowing clear see-through */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530] via-[#0A1530]/65 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530]/90 via-[#0A1530]/40 to-transparent" />
            </div>

            {/* Central Play Trigger - Hidden on mobile to avoid text collision, shown on sm+ */}
            <div className="hidden sm:flex absolute inset-0 z-10 items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={handleOpenPlayer}
                className="pointer-events-auto w-20 h-20 rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-2xl cursor-pointer"
                aria-label="Play recording"
              >
                <span
                  className="material-symbols-outlined text-4xl text-white ml-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </button>
            </div>

            {/* Bottom Card Content: Left Metadata + Right Action Buttons */}
            <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              {/* Left: Metadata & Narrative */}
              <div className="max-w-2xl space-y-3">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  <span className="text-[#2DD4BF] font-bold">LIVE CONCERT ARCHIVE</span>
                  <span className="text-slate-500">——</span>
                  <span>MARCH 2026</span>
                  <span className="text-slate-500">——</span>
                  <span>58 MIN</span>
                  <span className="text-slate-500">——</span>
                  <span className="text-slate-400">4K HDR</span>
                </div>

                <h3 className="font-hanken text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                  {featuredSession.title}
                </h3>

                <p className="font-inter text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  {featuredSession.description}
                </p>

                <div className="pt-1 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="material-symbols-outlined text-sm text-[#2DD4BF]">
                      location_on
                    </span>
                    Smyrna Frihamnskyrkan, Frihamnen
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>150 Mass Choir Voices</span>
                </div>
              </div>

              {/* Right: Action Buttons (Watch & Listen) */}
              <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
                <button
                  type="button"
                  onClick={handleOpenPlayer}
                  className="bg-white hover:bg-slate-100 text-[#0F172A] font-semibold text-xs sm:text-sm px-5 py-3 rounded-md transition-all shadow-md active:scale-95 flex items-center gap-2 group/btn cursor-pointer"
                >
                  <span>Watch recording</span>
                  <span
                    className="material-symbols-outlined text-base sm:text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenPlayer}
                  className="border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-semibold text-xs sm:text-sm px-5 py-3 rounded-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Live audio</span>
                  <span className="material-symbols-outlined text-base sm:text-lg text-[#2DD4BF]">
                    headphones
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Video Modal */}
      <InteractiveVideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />
    </>
  );
};
