"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitPrayerRequest } from "@/app/actions";

export const SanctuaryPrayerBlock: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePrayerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await submitPrayerRequest(formData);
        if (result.success) {
          setStatusMessage({
            type: "success",
            text:
              result.message ||
              "Your prayer request has been received. Our intercession team is standing in faith with you.",
          });
        } else {
          setStatusMessage({
            type: "error",
            text:
              result.message ||
              "Please check your prayer request and try submitting again.",
          });
        }
      } catch (err) {
        setStatusMessage({
          type: "error",
          text: "An error occurred while submitting your prayer request. Please try again.",
        });
      }
    });
  };

  return (
    <section className="w-full px-2.5 sm:px-5 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#1E293B] rounded-lg md:rounded-xl p-8 sm:p-12 text-white border border-slate-700/60 shadow-xl relative overflow-hidden"
      >
        {/* Ambient Teal Glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#14B8A6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 left-1/3 w-64 h-64 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#2DD4BF] text-xs uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
            <span>Gothenburg Ministry Hub Intercession</span>
          </div>

          <h2 className="font-hanken text-3xl sm:text-4xl text-white font-bold tracking-tight">
            Need prayer before this gathering?
          </h2>

          <p className="font-inter text-base text-[#CBD5E1] max-w-3xl leading-relaxed">
            Submit an anonymous request to our intercessory team. Our pastoral elders from Gothenburg partner congregations intercede confidentially for physical healing, peace, and family renewal every Thursday evening.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm px-6 py-3 rounded-md shadow-sm active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "close" : "send"}
              </span>
              <span>{isOpen ? "Close Prayer Form" : "Request Prayer"}</span>
            </button>

            <span className="text-xs text-slate-400 font-inter">
              Strictly pastoral and confidential. No registration required.
            </span>
          </div>

          {/* Expandable Prayer Form Drawer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-6 overflow-hidden"
              >
                <div className="bg-[#1E293B] p-6 sm:p-8 rounded-lg border border-white/10 shadow-lg max-w-3xl">
                  {statusMessage?.type === "success" ? (
                    <div className="py-4 space-y-3">
                      <div className="w-10 h-10 rounded-md bg-[#14B8A6]/20 text-[#2DD4BF] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">check</span>
                      </div>
                      <h4 className="font-hanken text-xl font-bold text-white">
                        Prayer Request Received
                      </h4>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        {statusMessage.text}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatusMessage(null);
                          setIsOpen(false);
                        }}
                        className="mt-2 text-xs text-[#2DD4BF] hover:underline font-semibold"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePrayerSubmit} className="space-y-4">
                      {statusMessage?.type === "error" && (
                        <div className="p-3 rounded-md bg-red-900/30 border border-red-500/50 text-xs text-red-300">
                          {statusMessage.text}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="prayer-name"
                            className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1"
                          >
                            Name <span className="font-normal">(or Anonymous)</span>
                          </label>
                          <input
                            id="prayer-name"
                            name="name"
                            type="text"
                            placeholder="Optional name"
                            className="w-full bg-[#0F172A] border border-[#334155] rounded-md px-4 py-2.5 text-xs text-white placeholder:text-[#64748B] focus:border-[#2DD4BF] outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="prayer-email"
                            className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1"
                          >
                            Email <span className="font-normal">(Optional for reply)</span>
                          </label>
                          <input
                            id="prayer-email"
                            name="email"
                            type="email"
                            placeholder="your.email@kyrkan.se"
                            className="w-full bg-[#0F172A] border border-[#334155] rounded-md px-4 py-2.5 text-xs text-white placeholder:text-[#64748B] focus:border-[#2DD4BF] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="prayer-text"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1"
                        >
                          How may our pastoral team intercede for you? *
                        </label>
                        <textarea
                          id="prayer-text"
                          name="requestText"
                          rows={3}
                          required
                          placeholder="Share your burden or praise report..."
                          className="w-full bg-[#0F172A] border border-[#334155] rounded-md p-3 text-xs text-white placeholder:text-[#64748B] focus:border-[#2DD4BF] outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isPending}
                        className="bg-[#14B8A6] hover:bg-[#0D9488] disabled:opacity-50 text-white font-semibold text-xs px-5 py-2.5 rounded-md transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        {isPending ? "Submitting..." : "Send Confidential Request"}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
