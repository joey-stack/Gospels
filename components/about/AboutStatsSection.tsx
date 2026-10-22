"use client";

import React from "react";

export const AboutStatsSection: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 py-6 sm:py-10">
      <div className="w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white p-8 sm:p-12 md:p-16 border border-slate-700/60 shadow-xl relative font-inter">
        {/* Ambient Nordic Teal Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider block">
            — 2025–2026 AT GOSPELS
          </span>
          <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            A movement, counted in names.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Behind every number below is someone we can point to across the room at Frihamnen on a worship evening.
          </p>
        </div>

        {/* 3 Metric Columns matching Morrow Church Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-4 border-t border-slate-700/60">
          {/* Metric 1 */}
          <div className="space-y-2">
            <div className="font-hanken text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              24
            </div>
            <div className="text-base sm:text-lg font-semibold text-[#2DD4BF]">
              Partner Churches
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pentecostal, Lutheran, Mission Covenant, and International congregations across Gothenburg.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="space-y-2">
            <div className="font-hanken text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              65+
            </div>
            <div className="text-base sm:text-lg font-semibold text-[#2DD4BF]">
              Mass Choir Voices
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Four-part gospel harmonies convening youth, university students, and veteran singers.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="space-y-2">
            <div className="font-hanken text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              52
            </div>
            <div className="text-base sm:text-lg font-semibold text-[#2DD4BF]">
              Weekly Prayer Vigils
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fifty-two Tuesday prayer nights at Frihamnskyrkan, never once cancelled.
            </p>
          </div>
        </div>

        {/* Micro Footer Note */}
        <div className="relative z-10 pt-8 mt-8 border-t border-slate-800 text-[11px] text-slate-400">
          Reflecting Gothenburg ecumenical ministry records and active fellowship rosters.
        </div>
      </div>
    </section>
  );
};
