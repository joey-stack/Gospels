"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const AtmosphereGallery: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 pb-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Worship Ministry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative rounded-lg overflow-hidden shadow-md border border-[#CBD5E1]/60 group h-72 bg-[#1E293B]"
        >
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png"
            alt="Fellowship choir and vibrant worship team leading praise in Gothenburg"
            fill
            quality={80}
            className="object-cover blur-[2.5px] scale-105 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#2DD4BF] block font-bold">
                Worship Ministry
              </span>
              <p className="font-hanken text-lg text-white font-bold">
                Joyful Gospel Expression
              </p>
            </div>
            <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-md text-xs text-white font-medium">
              Gothenburg 2026
            </span>
          </div>
        </motion.div>

        {/* Card 2: Multi-Church Assembly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="relative rounded-lg overflow-hidden shadow-md border border-[#CBD5E1]/60 group h-72 bg-[#1E293B]"
        >
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png"
            alt="Congregation members united in prayer and worship across Gothenburg"
            fill
            quality={80}
            className="object-cover blur-[2.5px] scale-105 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#2DD4BF] block font-bold">
                Multi-Church Assembly
              </span>
              <p className="font-hanken text-lg text-white font-bold">
                Collective Prayer &amp; Praise
              </p>
            </div>
            <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-md text-xs text-white font-medium">
              Gothenburg Fellowship
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
