"use client";

import React from "react";
import { Quote } from "lucide-react";

export const GiveScriptureSection: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-10 sm:my-14">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#F8FAFC] border-l-4 border-[#0D9488] rounded-md sm:rounded-lg p-6 sm:p-10 md:p-12 shadow-xs overflow-hidden">
          {/* Subtle Decorative Background Watermark */}
          <Quote className="absolute right-4 top-4 sm:right-6 sm:top-6 w-16 h-16 sm:w-20 sm:h-20 text-[#0D9488]/10 pointer-events-none select-none" />

          <blockquote className="font-eb italic text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed max-w-2xl">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
          </blockquote>

          <div className="mt-4 sm:mt-5 flex items-center gap-2.5">
            <div className="w-6 h-0.5 bg-[#0D9488]" />
            <cite className="font-inter text-xs font-bold tracking-wider text-slate-500 uppercase not-italic">
              2 CORINTHIANS 9:7 · 2 KORINTIERBREVET
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};
