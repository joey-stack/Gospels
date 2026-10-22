"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { submitPrayerRequest } from "@/app/actions";
import { useLanguage } from "@/context/LanguageContext";

export const PrayerIntercessionSection: React.FC = () => {
  const { isSv } = useLanguage();
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
            text: isSv
              ? "Ditt böneämne har mottagits. Vårt förbönsteam står tillsammans med dig i tro inför Gud."
              : (result.message || "Your prayer request has been received. Our intercession team is standing in faith with you."),
          });
        } else {
          setStatusMessage({
            type: "error",
            text: isSv
              ? "Kontrollera ditt böneämne och försök igen."
              : (result.message || "Please check your prayer request and try submitting again."),
          });
        }
      } catch (err) {
        setStatusMessage({
          type: "error",
          text: isSv
            ? "Ett fel uppstod när böneämnet skulle skickas. Försök igen."
            : "An error occurred while submitting your prayer request. Please try again.",
        });
      }
    });
  };

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 md:py-16" id="prayer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-br from-surface-container-low to-surface-container p-8 md:p-14 rounded-lg border border-outline-variant/40 custom-shadow-tinted"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              {isSv ? "PASTORAL FÖRBÖN" : "PASTORAL INTERCESSION"}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#0F172A] font-bold mt-2">
              {isSv ? "Hur kan vi be för dig?" : "How Can We Pray for You?"}
            </h2>
            <p className="font-body-md text-body-md text-secondary mt-3 leading-relaxed">
              {isSv
                ? "Vårt förbönsteam från partnerkyrkor i Göteborg samlas regelbundet för att be för varje böneämne. Dela öppet eller var helt anonym."
                : "Our intercessory team from partner churches in Gothenburg meets weekly to pray over every request. You may share openly or remain anonymous."}
            </p>
            {/* WhatsApp Privacy Indicator */}
            <div className="mt-6 inline-flex items-center gap-3 p-3.5 bg-surface-container-lowest/80 rounded-md border border-outline-variant/30 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[#0D9488]">verified_user</span>
              <span>
                {isSv
                  ? "Konfidentiell själavård. Direkt WhatsApp-bönelinje finns tillgänglig efter anmälan."
                  : "Encrypted care. Direct WhatsApp prayer line also available upon submission."}
              </span>
            </div>
          </div>

          {/* Prayer Request Preview Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-8 rounded-lg border border-[#E2E8F0] shadow-sm">
            {statusMessage?.type === "success" ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed/50 text-primary mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">check</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-[#0F172A]">
                  {isSv ? "Böneämnet Mottaget" : "Request Received"}
                </h3>
                <p className="font-body-sm text-body-sm text-secondary max-w-md mx-auto">
                  {statusMessage.text}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStatusMessage(null)}
                    className="px-5 py-2.5 rounded-lg border border-primary/30 text-primary hover:bg-surface-container font-label-md text-label-md font-semibold cursor-pointer"
                  >
                    {isSv ? "Skicka ett till böneämne" : "Submit Another Request"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePrayerSubmit} className="space-y-4">
                {statusMessage?.type === "error" && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {statusMessage.text}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-label-md text-[#0F172A] mb-1.5 font-semibold">
                      {isSv ? "Ditt Förnamn (eller anonymt)" : "Your First Name (or Anonymous)"}
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder={isSv ? "T.ex. Astrid eller lämna tomt" : "E.g., Astrid or Leave Blank"}
                      className="w-full bg-white border border-[#CBD5E1] rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-[#0F172A] mb-1.5 font-semibold">
                      {isSv ? "Stadsdel i Göteborg" : "City District"}
                    </label>
                    <input
                      name="district"
                      type="text"
                      placeholder={isSv ? "T.ex. Majorna, Hisingen, Centrum" : "E.g., Majorna, Hisingen, Centrum"}
                      className="w-full bg-white border border-[#CBD5E1] rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-[#0F172A] mb-1.5 font-semibold">
                    {isSv ? "Böneämne *" : "Prayer Request *"}
                  </label>
                  <textarea
                    name="requestText"
                    rows={3}
                    required
                    placeholder={
                      isSv
                        ? "Dela vad som ligger på ditt hjärta gällande hälsa, familj, andlig vandring eller vår stad..."
                        : "Share what is on your heart for health, family, spiritual walk, or our city..."
                    }
                    className="w-full bg-white border border-[#CBD5E1] rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs text-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      name="confidential"
                      defaultChecked
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span>
                      {isSv
                        ? "Håll detta böneämne konfidentiellt inom ledarteamet"
                        : "Keep this request confidential within ministry leaders"}
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold font-label-md text-label-md px-6 py-3 rounded-lg transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {isPending
                        ? (isSv ? "Skickar..." : "Sending...")
                        : (isSv ? "Skicka böneämne" : "Send Prayer Request")}
                    </span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
