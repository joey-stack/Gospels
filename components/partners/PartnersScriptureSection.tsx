"use client";

import React from "react";
import { motion } from "framer-motion";

export const PartnersScriptureSection: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-10 sm:my-14">
      <div className="w-full bg-[#F1F5F9]/90 border-l-4 border-[#0D9488] rounded-r-lg p-8 sm:p-12 md:p-14 shadow-xs relative overflow-hidden">
        <blockquote className="font-eb text-2xl sm:text-3xl md:text-4xl text-[#0F172A] italic leading-relaxed max-w-4xl">
          “That they all may be one, as You, Father, are in Me, and I in You; that they also may be one in Us, that the world may believe that You sent Me.”
        </blockquote>
        <cite className="block mt-5 text-xs font-semibold text-[#64748B] tracking-widest uppercase not-italic font-inter">
          — John 17:21 · Den Heliga Skriften
        </cite>
      </div>
    </section>
  );
};
