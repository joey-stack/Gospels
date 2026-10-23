"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export const MissionStrip: React.FC = () => {
  const { isSv } = useLanguage();

  const missions = [
    {
      id: "worship",
      icon: "church",
      title: isSv ? "Lovsångsuppvaknande" : "Worship Awakening",
      description: isSv
        ? "Ren, innerlig, Kristuscentrerad gospellovsång i skandinavisk mylla. Förankrad i djup hängivenhet, masskörsharmonier och vokal excellens."
        : "Pure, reverent, Christ-centered gospel praise in Scandinavian soil. Rooted in deep devotion, mass choir harmonies, and choral excellence.",
    },
    {
      id: "outreach",
      icon: "campaign",
      title: isSv ? "Offentlig Torglovsång" : "Public Gospel Outreach",
      description: isSv
        ? "Bär lovsången ut till stadens torg, broar och kajer över hela Göteborg för att möta människors hjärtan med evangeliet där de är."
        : "Taking worship out into city squares, bridges, and waterfront spaces across Gothenburg to meet hearts with the gospel right where they are.",
    },
    {
      id: "transformation",
      icon: "diversity_1",
      title: isSv ? "Stadsvid Förvandling" : "Citywide Transformation",
      description: isSv
        ? "Förenar generationer och olika kyrkotraditioner i gemensam bön och lovsång och bryter kulturell isolering i Guds rikes gemenskap."
        : "Uniting generations and diverse church traditions in collective prayer and praise, breaking cultural isolation through Kingdom fellowship.",
    },
  ];

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 md:py-16">
      <div className="w-full">
        {/* Morrow Church "First Sunday" 2-Column Split: Image Left, Eyebrow + Heading + 3 Stacked Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Full-Height Image Card matching right side total height */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] lg:min-h-full rounded-lg md:rounded-xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 group"
          >
            <Image
              src="/assets/whatsapp_image_2026_10_16_at_8.28.06_am_2.png"
              alt="Warm Christian fellowship and welcome at Gothenburg ministry gathering"
              fill
              quality={95}
              className="object-cover object-center blur-[2.5px] scale-105 group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Morrow-Style Pill Badge Overlay at bottom */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-md px-4 py-2.5 shadow-md border border-slate-200/80 flex flex-col gap-0.5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0D9488]">
                <span>{isSv ? "SAMLINGAR" : "GATHERINGS"}</span>
                <span className="text-slate-400">——</span>
                <span>{isSv ? "GÖTEBORG" : "GOTHENBURG"}</span>
              </div>
              <span className="font-hanken text-xs sm:text-sm font-bold text-slate-900">
                {isSv
                  ? "Tid meddelas inom kort · Alla är välkomna"
                  : "Time announced soon · All are welcome"}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Eyebrow + Heading + Subtitle + 3 Stacked List Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            {/* Section Header */}
            <div>
              <div className="flex items-center gap-2 text-[#0D9488] text-xs font-semibold tracking-widest uppercase mb-2">
                <span className="w-5 h-[2px] bg-[#0D9488]" />
                <span>{isSv ? "DEN NORDISKA RÖRELSEN" : "THE NORDIC MOVEMENT"}</span>
              </div>

              <h2 className="font-hanken text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                {isSv ? "Vår kallelse i Göteborg" : "Our Gothenburg Calling"}
              </h2>

              <p className="font-inter text-sm sm:text-base text-slate-600 mt-2 max-w-xl leading-relaxed">
                {isSv
                  ? "Återupprättar helig lovsång, offentlig torglovsång och förenad kristen gästfrihet över Västra Götaland."
                  : "Restoring sacred melody, outdoor public praise, and unified Christian hospitality across Västra Götaland."}
              </p>
            </div>

            {/* Three Stacked Cards (List style) */}
            <div className="flex flex-col gap-4 flex-1 justify-between">
              {missions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
                  className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-[#0D9488]/40 hover:shadow-md transition-all flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Icon Box */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-md bg-[#F0FDFA] border border-[#2DD4BF]/40 text-[#0D9488] flex items-center justify-center shrink-0 group-hover:bg-[#0D9488] group-hover:text-white transition-colors duration-200 shadow-xs">
                    <span className="material-symbols-outlined text-2xl">
                      {mission.icon}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors leading-snug mb-1">
                      {mission.title}
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
