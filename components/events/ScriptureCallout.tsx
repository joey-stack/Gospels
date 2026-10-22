"use client";

import React from "react";
import { motion } from "framer-motion";

export const ScriptureCallout: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-8 sm:my-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-[#F1F5F9]/75 border-l-4 border-[#0D9488] rounded-r-lg p-8 sm:p-10 md:p-12 shadow-sm"
      >
        <blockquote className="font-eb text-2xl sm:text-3xl md:text-4xl text-[#0F172A] italic leading-relaxed">
          “For where two or three gather in my name, there am I with them.”
        </blockquote>
        <cite className="block mt-4 text-xs font-semibold text-[#64748B] tracking-widest uppercase not-italic">
          — Matthew 18:20 · Heliga Skriften
        </cite>
      </motion.div>
    </section>
  );
};
