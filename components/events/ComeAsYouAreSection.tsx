"use client";

import React from "react";
import { motion } from "framer-motion";

export const ComeAsYouAreSection: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-[#F1F5F9]/60 rounded-lg md:rounded-xl p-8 sm:p-12 md:p-16 text-center border border-slate-200/50 relative shadow-sm"
      >
        <div className="w-12 h-12 rounded-md bg-white mx-auto flex items-center justify-center text-[#0D9488] shadow-sm mb-4 border border-slate-100">
          <span className="material-symbols-outlined text-[24px]">favorite</span>
        </div>

        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold block mb-1">
          NORDIC FELLOWSHIP
        </span>
        <h2 className="font-hanken text-3xl sm:text-4xl text-slate-900 font-bold mb-3 tracking-tight">
          Come As You Are
        </h2>
        <p className="font-inter text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Warm Scandinavian hospitality welcomes families, young believers, seekers, and all Christian denominations. Join us in Frihamnen for shared fellowship, warm Swedish fika coffee, and open communion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-slate-200/60 text-left">
          <div className="bg-white p-5 sm:p-6 rounded-md border border-slate-200/40 shadow-sm flex items-start gap-3.5">
            <span className="material-symbols-outlined text-[#0D9488] text-[22px] shrink-0 mt-0.5">
              local_cafe
            </span>
            <div>
              <h4 className="font-hanken text-sm font-semibold text-slate-900">
                Swedish Fika
              </h4>
              <p className="font-inter text-xs text-slate-500 mt-1 leading-relaxed">
                Complimentary coffee &amp; cinnamon buns post-gathering in the fellowship foyer.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-md border border-slate-200/40 shadow-sm flex items-start gap-3.5">
            <span className="material-symbols-outlined text-[#0D9488] text-[22px] shrink-0 mt-0.5">
              accessible
            </span>
            <div>
              <h4 className="font-hanken text-sm font-semibold text-slate-900">
                Full Accessibility
              </h4>
              <p className="font-inter text-xs text-slate-500 mt-1 leading-relaxed">
                Accessible ramp entry, hearing induction audio loops, and wheelchair seating.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-md border border-slate-200/40 shadow-sm flex items-start gap-3.5">
            <span className="material-symbols-outlined text-[#0D9488] text-[22px] shrink-0 mt-0.5">
              family_restroom
            </span>
            <div>
              <h4 className="font-hanken text-sm font-semibold text-slate-900">
                Family Welcoming
              </h4>
              <p className="font-inter text-xs text-slate-500 mt-1 leading-relaxed">
                Quiet family room with live audio and video feed available for parents with infants.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
