"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HeartHandshake, Check, Landmark, CreditCard, Lock, Sparkles, ArrowRight } from "lucide-react";
import { submitKingdomPartnerSubscription } from "@/app/actions";

interface PartnerSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: number;
}

interface Tier {
  id: string;
  name: string;
  amount: number;
  description: string;
}

const TIERS: Tier[] = [
  {
    id: "supporter",
    name: "Supporter",
    amount: 150,
    description: "Sponsors choir sheet music, rehearsal tea, and sound cables.",
  },
  {
    id: "patron",
    name: "Patron",
    amount: 350,
    description: "Funds student choir travel grants and guest vocal masterclasses.",
  },
  {
    id: "pillar",
    name: "Pillar",
    amount: 750,
    description: "Sponsors city square generator power & acoustic staging at Gustav Adolfs Torg.",
  },
];

export const PartnerSubscriptionModal: React.FC<PartnerSubscriptionModalProps> = ({
  isOpen,
  onClose,
  defaultTier = 150,
}) => {
  const [selectedTier, setSelectedTier] = useState<Tier>(
    TIERS.find((t) => t.amount === defaultTier) || TIERS[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<"autogiro" | "card">("autogiro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [personnummer, setPersonnummer] = useState("");
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("tier", selectedTier.amount.toString());
    formData.append("tierName", selectedTier.name);
    formData.append("paymentMethod", paymentMethod);
    if (personnummer) formData.append("personnummer", personnummer);

    startTransition(async () => {
      const res = await submitKingdomPartnerSubscription(formData);
      if (res.success) {
        setSuccessMsg(res.message || "Tack så mycket för ditt partnerskap!");
      } else {
        setErrorMsg(res.errors?.name || res.errors?.email || res.message || "Ett fel uppstod.");
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#FAFBFD] text-[#0F172A] rounded-lg md:rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-6 font-inter"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center border border-[#0D9488]/20">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-hanken font-bold text-base sm:text-lg text-slate-900 leading-tight">
                    Kingdom Monthly Partner
                  </h3>
                  <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                    GOSPELS GÖTEBORG
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                aria-label="Stäng ruta"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {successMsg ? (
              <div className="p-6 sm:p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-hanken text-xl font-bold text-slate-900">
                  Tack för ditt partnerskap!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {successMsg}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-colors"
                >
                  Stäng
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Sustaining Pillar Note */}
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-md text-xs text-teal-800 flex items-center gap-2 font-medium">
                  <Sparkles className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Choose your monthly tier to anchor choral worship across Gothenburg.</span>
                </div>

                {/* Tier Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-800">
                    Select Partnership Tier
                  </label>
                  <div className="space-y-2">
                    {TIERS.map((tier) => {
                      const isSelected = selectedTier.id === tier.id;
                      return (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedTier(tier)}
                          className={`p-3 rounded-md border cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#0D9488] bg-white ring-1 ring-[#0D9488]"
                              : "border-slate-200 bg-white/70 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-hanken text-xs sm:text-sm font-bold text-slate-900">
                              {tier.name}
                            </span>
                            <span className="font-hanken text-xs sm:text-sm font-extrabold text-[#0D9488]">
                              {tier.amount} kr<span className="text-[11px] font-normal text-slate-500">/mo</span>
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {tier.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Astrid Lindén"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="astrid@goteborg.se"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("autogiro")}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold border transition-all ${
                        paymentMethod === "autogiro"
                          ? "border-[#0D9488] bg-teal-50 text-[#0D9488] font-bold"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Landmark className="w-3.5 h-3.5" />
                      <span>Autogiro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold border transition-all ${
                        paymentMethod === "card"
                          ? "border-[#0D9488] bg-teal-50 text-[#0D9488] font-bold"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Debit / Card</span>
                    </button>
                  </div>
                </div>

                {/* Swedish Personnummer for Tax Relief */}
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">
                    Personnummer (valfritt för skattereduktion hos Skatteverket)
                  </label>
                  <input
                    type="text"
                    value={personnummer}
                    onChange={(e) => setPersonnummer(e.target.value)}
                    placeholder="ÅÅÅÅMMDD-XXXX"
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none font-mono"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>
                    {isPending
                      ? "Registrerar..."
                      : `Start Monthly Partnership (${selectedTier.amount} kr/mo)`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                  <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Cancel anytime with one click. Monthly prayer letter included.</span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
