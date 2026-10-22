"use client";

import React from "react";

export const GiveQuestions: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-14 sm:my-20 mb-20 sm:mb-28">
      <div className="w-full space-y-12 font-inter">
        {/* Centered Section Header (Morrow Church Style) */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider block">
            — GIVING QUESTIONS
          </span>
          <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Good to know.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Questions about a gift? Email{" "}
            <a
              href="mailto:ekonomi@gospelsgoteborg.se"
              className="text-[#0D9488] font-medium hover:underline"
            >
              ekonomi@gospelsgoteborg.se
            </a>
            .
          </p>
        </div>

        {/* 2x2 Editorial Grid with Dividers (Morrow Church Exact Layout) */}
        <div className="w-full max-w-5xl mx-auto space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 pt-4">
            <div className="space-y-2">
              <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Does attending depend on giving?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No. Giving is how believers co-labor in city adoration. Every gathering, concert, and worship session has 100% open public admission for all citizens and guests.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Do donations count for Swedish taxes?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                They do. GOSPELS meets Skatteverket guidelines for approved gift deduction (Skattereduktion för gåvor). A single statement arrives in your inbox each January.
              </p>
            </div>
          </div>

          {/* Dividing Border */}
          <div className="w-full border-t border-slate-200/90 pt-8" />

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            <div className="space-y-2">
              <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Can I give in person on Sunday or at concerts?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes. Contactless Swish QR signs are placed at venue entrances, fellowship tables, and choir staging areas across Gothenburg.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 leading-snug">
                How do I change or pause recurring giving?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every monthly receipt includes a one-click direct management link to adjust your amount or pause anytime, or email our treasury team directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
