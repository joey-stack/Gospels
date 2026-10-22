"use client";

import React from "react";
import { motion } from "framer-motion";

export const ScriptureMeditation: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-8 rounded-r-xl border-l-[3px] border-[#0D9488] bg-[#F1F5F9] shadow-sm"
      >
        <p className="font-scripture-quote text-scripture-quote text-[#111827] italic leading-relaxed">
          “For where two or three gather in my name, there am I with them. Let the sounds of Gothenburg echo with living waters and thanksgiving.”
        </p>
        <span className="block mt-3 font-label-sm text-label-sm uppercase tracking-wider text-[#64748B]">
          Matthew 18:20 • Nordic Ministry Dedication
        </span>
      </motion.div>
    </section>
  );
};
