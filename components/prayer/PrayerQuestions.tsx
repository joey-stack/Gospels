"use client";

import React from "react";

export const PrayerQuestions: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 my-12 sm:my-18 mb-20 sm:mb-28">
      <div className="w-full space-y-12 font-inter">
        {/* Centered Section Header (Morrow Church Style) */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider block">
            — PRAYER &amp; INTERCESSION QUESTIONS
          </span>
          <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Good to know.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Questions about intercession or pastoral care? Email{" "}
            <a
              href="mailto:intercession@gospelsgoteborg.se"
              className="text-[#0D9488] font-medium hover:underline"
            >
              intercession@gospelsgoteborg.se
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
                Who reads my prayer request?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Requests marked confidential are read only by designated pastoral leaders and intercessory directors. General prayer requests are prayed over by our committed Gothenburg intercessory team during Tuesday prayer vigils.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Can I submit a request anonymously?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes. If you prefer not to include your name or contact information, simply type &quot;Anonymous&quot; or leave the contact fields blank. The Lord knows your heart and every circumstance you face.
              </p>
            </div>
          </div>

          <div className="w-full border-t border-slate-200" />

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            <div className="space-y-2">
              <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Can I receive in-person prayer in Gothenburg?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes. You are welcome to join our weekly prayer gatherings across Gothenburg on Tuesday evenings at 18:30 or visit partner churches throughout the city. Our intercessors are always available to lay hands and pray with you.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Is there an urgent line for emergency prayer?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For urgent pastoral needs, hospital visits, or immediate crisis intercession, message our direct WhatsApp prayer line at +46 31 123 45 67 or email us with &quot;URGENT&quot; in the subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
