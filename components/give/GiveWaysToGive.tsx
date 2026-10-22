"use client";

import React, { useState } from "react";
import { Smartphone, HeartHandshake, Landmark, ArrowUpRight, Check, Copy } from "lucide-react";
import { SwishGivingModal } from "@/components/give/SwishGivingModal";
import { PartnerSubscriptionModal } from "@/components/give/PartnerSubscriptionModal";

export const GiveWaysToGive: React.FC = () => {
  const [swishModalOpen, setSwishModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [bankgiroCopied, setBankgiroCopied] = useState(false);

  const handleCopyBankgiro = () => {
    navigator.clipboard.writeText("5542-8891");
    setBankgiroCopied(true);
    setTimeout(() => setBankgiroCopied(false), 2000);
  };

  return (
    <>
      <section className="w-full px-2.5 sm:px-5 my-12 sm:my-16">
        <div className="w-full space-y-8 font-inter">
          {/* Section Header (Morrow Church Style) */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider block">
              — WAYS TO GIVE
            </span>
            <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Choose how you’d like to give.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Online gifts are processed through verified Swedish non-profit banking, Swish, or card payment.
            </p>
          </div>

          {/* 3 Horizontal Stacked Full-Width Bento Cards (Morrow Church Exact Layout) */}
          <div className="space-y-4">
            {/* Card 1: One time / Swish */}
            <div className="w-full bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all hover:border-slate-300">
              {/* Left Column: Icon + Title + Description */}
              <div className="flex items-start gap-4 lg:w-1/3">
                <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-hanken text-xl font-bold text-slate-900">
                    One time
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Any amount, today, from Swish, a card, or a bank account.
                  </p>
                </div>
              </div>

              {/* Middle Column: 3 Checkmarks */}
              <div className="lg:w-1/3 space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Swish 123 456 78 90 or Bankgiro 5542-8891</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Card, Apple Pay, Google Pay or Autogiro</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Immediate receipt sent by email</span>
                </div>
              </div>

              {/* Right Column: CTA Button */}
              <div className="lg:w-1/4 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => setSwishModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-md text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2 font-inter"
                >
                  <span>Give once</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>

            {/* Card 2: Monthly Kingdom Partner */}
            <div className="w-full bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all hover:border-slate-300">
              {/* Left Column: Icon + Title + Description */}
              <div className="flex items-start gap-4 lg:w-1/3">
                <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488] shrink-0 mt-0.5">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-hanken text-xl font-bold text-slate-900">
                    Monthly
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Steady gifts let us plan city choral concerts and worship nights with confidence.
                  </p>
                </div>
              </div>

              {/* Middle Column: 3 Checkmarks */}
              <div className="lg:w-1/3 space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>You choose the tier (150, 350, or 750 kr/mo)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Pause or adjust whenever with one click</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>A single annual summary statement each January</span>
                </div>
              </div>

              {/* Right Column: CTA Button */}
              <div className="lg:w-1/4 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-md text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2 font-inter"
                >
                  <span>Set up monthly giving</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>

            {/* Card 3: Other ways / Bankgiro & Tax Relief */}
            <div className="w-full bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all hover:border-slate-300">
              {/* Left Column: Icon + Title + Description */}
              <div className="flex items-start gap-4 lg:w-1/3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-hanken text-xl font-bold text-slate-900">
                    Other ways
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Direct bank transfers, Skattereduktion för gåvor, and church covenant gifts.
                  </p>
                </div>
              </div>

              {/* Middle Column: 3 Checkmarks */}
              <div className="lg:w-1/3 space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Bankgiro: 5542-8891 (Ideell Förening 802490-1234)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Automatic Swedish tax deduction with personnummer</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Confidential chat with our treasurer</span>
                </div>
              </div>

              {/* Right Column: Copy Bankgiro / Email Treasurer */}
              <div className="lg:w-1/4 flex lg:justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCopyBankgiro}
                  className="px-4 py-3 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-md text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{bankgiroCopied ? "Kopierat!" : "5542-8891"}</span>
                </button>
                <a
                  href="mailto:ekonomi@gospelsgoteborg.se?subject=Stewardship%20Inquiry"
                  className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-md text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Ask the treasurer</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Subtext Disclaimer (Morrow Church Style) */}
          <p className="text-xs text-slate-500 leading-relaxed font-inter">
            GOSPELS Gothenburg is a registered Swedish ideell förening (Org.nr 802490-1234). Donations are tax-deductible in Sweden under Skatteverket regulations for registered gift recipients.
          </p>
        </div>
      </section>

      {/* Swish Giving Modal */}
      <SwishGivingModal
        isOpen={swishModalOpen}
        onClose={() => setSwishModalOpen(false)}
        initialAmount={150}
      />

      {/* Monthly Partner Registration Modal */}
      <PartnerSubscriptionModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />
    </>
  );
};
