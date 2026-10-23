"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

// Relume Logo 3: Continuous Marquee of Partner Church Logos
export const PartnerChurchesSection: React.FC = () => {
  const { isSv } = useLanguage();
  const logos = [

    {
      name: "Svenska kyrkan",
      src: "/logos/svenska-kyrkan.svg",
      width: 150,
      height: 44,
      className: "h-9 w-auto object-contain",
    },
    {
      name: "The Salvation Army",
      src: "/logos/salvation-army.svg",
      width: 140,
      height: 44,
      className: "h-9 w-auto object-contain",
    },
    {
      name: "RCCG Jesus Connection",
      src: "/logos/rccg.png",
      width: 130,
      height: 48,
      className: "h-11 w-auto object-contain",
    },
    {
      name: "Pingst Sverige",
      src: "/logos/pingst.png",
      width: 130,
      height: 44,
      className: "h-8 w-auto object-contain",
    },
    {
      name: "Hillsong Sweden",
      src: "/logos/hillsong.png",
      width: 140,
      height: 44,
      className: "h-8 w-auto object-contain",
    },
  ];

  // Quadruple the logos array for completely seamless infinite loop
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full px-2.5 sm:px-5 py-12 md:py-16 overflow-hidden"
      id="churches"
    >
      <div className="w-full">
        {/* Header Label */}
        <div className="text-center mb-8 md:mb-10">
          <span className="font-label-sm text-xs uppercase tracking-widest text-[#0D9488] font-bold block mb-1">
            {isSv ? "EKUMENISK GEMENSKAP & ENHET" : "ECUMENICAL FELLOWSHIP & UNITY"}
          </span>
          <h3 className="font-hanken text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isSv
              ? "Partnerkyrkor & Församlingar över hela Göteborg"
              : "Partner Churches & Fellowships Across Gothenburg"}
          </h3>
        </div>

        {/* Relume Logo 3: Infinite Marquee Row with Left & Right Gradient Fades */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left Gradient Fade Mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F9FF] to-transparent z-10" />

          {/* Marquee Track */}
          <div className="animate-marquee-left flex items-center gap-12 sm:gap-16 md:gap-20">
            {marqueeLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex items-center justify-center shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-200"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={logo.className}
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Right Gradient Fade Mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F9FF] to-transparent z-10" />
        </div>
      </div>
    </motion.section>
  );
};
