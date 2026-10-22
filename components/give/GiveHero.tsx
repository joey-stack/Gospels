"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, ShieldCheck, Ticket, Landmark, CreditCard } from "lucide-react";
import { SwishGivingModal } from "@/components/give/SwishGivingModal";
import { StripeGivingModal } from "@/components/give/StripeGivingModal";

export const GiveHero: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [stripeModalOpen, setStripeModalOpen] = useState(false);

  return (
    <>
      <section className="w-full px-2.5 sm:px-5 pt-3 sm:pt-4 pb-6">
        <div className="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-[#0A1530] text-white border border-slate-700/60 shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 md:p-14">
          {/* Background Gothenburg Choir / Worship Backdrop */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/whatsapp_image_2026_10_16_at_8.26.13_am.png"
              alt="Gospels Gothenburg Kingdom Worship and Choral Giving"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-30 brightness-95 saturate-95"
            />
            {/* Multi-layered Nordic Reverence Teal Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1530] via-[#0A1530]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1530]/95 via-[#0A1530]/80 to-[#0A1530]/40" />
          </div>

          {/* Top: Breadcrumbs & Ministry Hub Dash */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-300 font-inter">
              <Link href="/" className="hover:text-[#2DD4BF] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#2DD4BF] font-medium">Kingdom Giving</span>
            </nav>

            {/* Morrow Church Style Upper Dash Tag */}
            <div className="text-[11px] font-semibold text-[#2DD4BF] uppercase tracking-wider font-inter">
              — GIVE TO GOSPELS GÖTEBORG
            </div>
          </div>

          {/* Center: Main Editorial Headline & Description (Morrow Church Typography) */}
          <div className="relative z-10 max-w-3xl my-6 md:my-8">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-hanken text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.12]"
            >
              Every gift lifts worship over our{" "}
              <span className="font-eb italic font-normal text-[#2DD4BF]">
                city.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-inter text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6"
            >
              Gifts keep public city square acoustic staging ready, choir rehearsal tea brewed, and our neighbors across Gothenburg gathered in worship.
            </motion.p>

            {/* Trust Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-inter">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>Registered Non-Profit 802490-1234</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>100% Open Public Entry to All Gatherings</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>Annual Public Audited Accounts</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Morrow Church Dual Action & Direct Info */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-inter text-slate-300">
              <span className="font-semibold text-white">Bankgiro: 5542-8891</span>
              <span className="text-slate-500">·</span>
              <span className="text-[#2DD4BF] font-semibold">Swish: 123 456 78 90</span>
            </div>

            {/* Action Buttons: Stripe Card Giving + Swish */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setStripeModalOpen(true)}
                className="px-5 py-2.5 bg-[#2DD4BF] hover:bg-[#14B8A6] text-slate-950 rounded-md font-inter text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Give with Card (Stripe)</span>
                <span className="px-1.5 py-0.2 text-[9px] bg-slate-950/20 rounded font-bold uppercase tracking-wider">Test</span>
              </button>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-md font-inter text-xs sm:text-sm font-semibold transition-all border border-white/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Swish</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Swish Giving Modal */}
      <SwishGivingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialAmount={150}
      />

      {/* Stripe Test Mode Giving Modal */}
      <StripeGivingModal
        isOpen={stripeModalOpen}
        onClose={() => setStripeModalOpen(false)}
        initialAmount="250"
        initialCurrency="SEK"
        initialFrequency="one-time"
      />
    </>
  );
};
