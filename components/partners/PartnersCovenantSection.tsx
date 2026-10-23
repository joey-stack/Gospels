"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Music2, HeartHandshake, Download, Sparkles } from "lucide-react";
import { PartnerRegistrationModal } from "@/components/partners/PartnerRegistrationModal";

export const PartnersCovenantSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownloadPDF = () => {
    // Generate text/covenant download
    const covenantText = `GOSPELS GOTHENBURG — ECUMENICAL MINISTERIAL COVENANT
============================================================
City of Gothenburg, Västra Götaland · Non-Profit Ministry

PREAMBLE:
In dedication to Jesus Christ and inspired by John 17:21 ("That they all may be one"),
the participating Christian congregations of Gothenburg unite in mutual fellowship,
sacred gospel music, and ongoing intercessory prayer over our city.

OUR CORE COMMITMENTS:
1. DOCTRINAL DISTINCTIVES: Zero denominational compromise. Each local church retains
   its doctrinal integrity, pastoral autonomy, and traditions.
2. SACRED MUSIC COLLABORATION: Open sharing of mass choir arrangements, vocal training,
   and instrumental coordination for public citywide concerts.
3. INTERCESSORY COVERAGE: Joint standing prayer vigils, 24/7 prayer coordination, and
   social support initiatives throughout Gothenburg.

MEMBER HUB VENUES:
- Vasakyrkan (Centrum & Vasastan)
- RCCG Jesus Connection (Västra Frölunda)
- Göteborg Church (Centrum)
- The Salvation Army (Haga / Södra Vägen)
- Svenska Kyrkan Domkyrkan (Centrum)
- Hillsong Sweden (Hisingen)

Contact: partner@gospelsgoteborg.se
Website: https://github.com/joey-stack/Gospels
`;
    const blob = new Blob([covenantText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Gospels_Gothenburg_Ecumenical_Covenant.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="w-full px-2.5 sm:px-5 my-12 sm:my-16 mb-20 sm:mb-24">
        <div
          className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white p-8 sm:p-12 md:p-16 border border-slate-700/60 shadow-xl"
        >
          {/* Ambient Nordic Lighting Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0D9488]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/15 text-[#2DD4BF] text-xs font-semibold uppercase tracking-wider mb-5 font-inter">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Citywide Call to Pastors &amp; Music Leaders</span>
            </div>

            {/* Headline */}
            <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Is your church called to lift worship over{" "}
              <span className="font-eb italic font-normal text-[#2DD4BF]">
                Gothenburg?
              </span>
            </h2>

            {/* Description */}
            <p className="font-inter text-sm sm:text-base text-slate-300 mb-8 leading-relaxed max-w-2xl">
              We invite pastors, choir directors, and worship teams across Gothenburg to unite in joint choir rehearsals, regional prayer vigils, and citywide outreach concerts.
            </p>

            {/* Three Covenant Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-inter">
                <ShieldCheck className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>Zero denominational compromise</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-inter">
                <Music2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>Shared choir arrangements</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-inter">
                <HeartHandshake className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>Combined intercessory network</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="px-7 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold rounded-md transition-all shadow-md active:scale-95 flex items-center gap-2 font-inter"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Become a Partner Church</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 border border-white/20 hover:bg-white/10 text-[#F8FAFC] text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-2 font-inter"
              >
                <Download className="w-4 h-4" />
                <span>Download Ministry Covenant</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Registration Modal */}
      <PartnerRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
