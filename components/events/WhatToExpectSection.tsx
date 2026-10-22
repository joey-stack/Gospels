"use client";

import React from "react";
import { motion } from "framer-motion";

export const WhatToExpectSection: React.FC = () => {
  const pillars = [
    {
      num: "1",
      icon: "library_music",
      tag: "PRAISE & HARMONY",
      title: "Worship",
      description:
        "Uninterrupted Swedish & English choral gospel praise led by united worship teams drawn from across Gothenburg's regional fellowships.",
      footerIcon: "schedule",
      badge: "90 Minutes Continuous Praise",
    },
    {
      num: "2",
      icon: "church",
      tag: "INTERCESSION & CARE",
      title: "Prayer",
      description:
        "Intercessory prayer stations with multilingual pastoral elders from partner churches ready to minister healing, blessing, and listening care.",
      footerIcon: "language",
      badge: "Swedish, English & Arabic Prayer",
    },
    {
      num: "3",
      icon: "menu_book",
      tag: "GOSPEL HOPE",
      title: "Word",
      description:
        "A brief, Christ-centered gospel reflection on hope and spiritual revival for Västra Götaland, anchoring our hearts before evening adoration.",
      footerIcon: "person",
      badge: "Rev. Jonas Lindqvist",
    },
  ];

  return (
    <section className="w-full px-2.5 sm:px-5 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#0D9488] font-bold">
          THE GATHERING ORDER
        </span>
        <h2 className="font-hanken text-3xl sm:text-4xl text-[#0F172A] font-bold">
          What to Expect
        </h2>
        <p className="font-inter text-base text-[#64748B]">
          Crafted with generous spatial pacing and reverence, our schedule invites unity across Gothenburg’s diverse faith communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            className="bg-white rounded-lg p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-md bg-teal-50 flex items-center justify-center text-[#0D9488] mb-6 group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">{pillar.icon}</span>
            </div>

            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block mb-1">
              {pillar.tag}
            </span>
            <h3 className="font-hanken text-xl text-slate-900 font-bold mb-3">
              {pillar.num}. {pillar.title}
            </h3>
            <p className="font-inter text-sm text-slate-600 leading-relaxed">
              {pillar.description}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 text-slate-600 text-xs">
              <span className="material-symbols-outlined text-[16px] text-slate-500">{pillar.footerIcon}</span>
              <span>{pillar.badge}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
