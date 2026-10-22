"use client";

import React from "react";

interface SpendingCategory {
  label: string;
  percentage: number;
  barColor: string;
  share: string;
}

const CATEGORIES: SpendingCategory[] = [
  {
    label: "Public Events & Acoustics",
    percentage: 60,
    barColor: "bg-[#0D9488]", // Teal
    share: "60 kr of every 100 kr",
  },
  {
    label: "Choir & Musician Training",
    percentage: 20,
    barColor: "bg-[#14B8A6]", // Vibrant Cyan-Teal
    share: "20 kr of every 100 kr",
  },
  {
    label: "Governance & Compliance",
    percentage: 15,
    barColor: "bg-[#475569]", // Slate Gray
    share: "15 kr of every 100 kr",
  },
  {
    label: "Intercession & Care",
    percentage: 5,
    barColor: "bg-[#94A3B8]", // Clean Gray (per audio feedback)
    share: "5 kr of every 100 kr",
  },
];

export const GiveWhereItGoes: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-12 sm:my-16">
      <div className="w-full rounded-lg md:rounded-xl bg-[#0A1530] text-white p-8 sm:p-12 md:p-16 border border-slate-800 shadow-xl font-inter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Heading & Auditing Narrative (Morrow Church Layout) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider block">
              — WHERE IT GOES
            </span>
            <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              How last year’s gifts were spent.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md pt-2">
              Our elders and an independent CPA review the books each spring. Audited transparency is sacred to our mission. Ask, and we’ll email you the complete report.
            </p>
          </div>

          {/* Right Column: Horizontal Progress Bars (Morrow Church Layout) */}
          <div className="lg:col-span-7 space-y-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                  <span className="text-slate-200">{cat.label}</span>
                  <span className="font-mono text-slate-300 font-semibold">{cat.percentage}%</span>
                </div>
                {/* Progress Track */}
                <div className="w-full bg-[#1A2649] h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${cat.barColor}`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}

            <p className="text-[11px] text-slate-400 pt-3 border-t border-white/10 font-inter">
              Audited 2025–2026 ministry stewardship ledger. Swedish ideell förening non-profit accounting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
