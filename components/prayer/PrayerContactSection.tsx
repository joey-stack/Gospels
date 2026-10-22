"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  MessageCircle,
  Sparkles,
  AlertCircle,
  Clock,
  Compass,
} from "lucide-react";
import { submitPrayerRequest } from "@/app/actions";

const PRAYER_CATEGORIES = [
  "Healing & Strength",
  "Family & Relationships",
  "Spiritual Renewal",
  "Youth & Students",
  "Comfort in Grief",
  "Worship & Music Ministry",
  "Financial Peace",
  "Thanksgiving",
  "Something else",
];

export const PrayerContactSection: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isConfidential, setIsConfidential] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Append selected categories
    selectedCategories.forEach((cat) => {
      formData.append("category", cat);
    });
    formData.append("confidential", isConfidential ? "true" : "false");

    startTransition(async () => {
      try {
        const res = await submitPrayerRequest(formData);
        if (res.success) {
          setStatus({
            type: "success",
            message: res.message || "Your prayer request has been received.",
          });
          form.reset();
          setSelectedCategories([]);
        } else {
          const errMsg =
            res.errors?.requestText ||
            res.errors?.email ||
            res.message ||
            "Please check your request details and try again.";
          setStatus({ type: "error", message: errMsg });
        }
      } catch (err) {
        setStatus({
          type: "error",
          message: "Unable to submit your prayer request. Please try again or WhatsApp us directly.",
        });
      }
    });
  };

  return (
    <section className="w-full px-2.5 sm:px-5 py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Main 2-Column Grid (Morrow Church Contact Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Contact Channels & Gothenburg Prayer Sanctuary */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-8">
            {/* Editorial Title & Subtitle */}
            <div className="space-y-4">
              <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                Write, call or pray together.
              </h2>
              <p className="font-inter text-slate-600 text-sm sm:text-base leading-relaxed">
                Tell us how we can stand in faith with you. Our intercession team gathers every Tuesday evening and Sunday morning at Frihamnskyrkan in central Gothenburg.
              </p>
            </div>

            {/* Direct Contact Channels matching Morrow Church list */}
            <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80 font-inter">
              {/* Phone */}
              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                  <Phone className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Phone &amp; Emergency Prayer
                  </div>
                  <a
                    href="tel:+46311234567"
                    className="text-sm sm:text-base font-semibold text-slate-900 hover:text-[#0D9488] transition-colors block"
                  >
                    +46 31 123 45 67
                  </a>
                  <p className="text-xs text-slate-500">
                    Tuesday to Friday, 09:00 – 16:00 CET
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                  <Mail className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Email Intercession Inbox
                  </div>
                  <a
                    href="mailto:intercession@gospelsgoteborg.se"
                    className="text-sm sm:text-base font-semibold text-slate-900 hover:text-[#0D9488] transition-colors block"
                  >
                    intercession@gospelsgoteborg.se
                  </a>
                  <p className="text-xs text-slate-500">
                    Confidential inbox monitored daily by pastoral leads
                  </p>
                </div>
              </div>

              {/* Address / Gathering Hub */}
              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                  <MapPin className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Gothenburg Prayer Gathering
                  </div>
                  <a
                    href="https://maps.google.com/?q=Frihamnsgatan+20,+417+56+Göteborg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-semibold text-slate-900 hover:text-[#0D9488] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Frihamnsgatan 20, 417 56 Göteborg</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <p className="text-xs text-slate-500">
                    Open for personal prayer &amp; fellowship Tuesdays 18:30 &amp; Sundays 10:00
                  </p>
                </div>
              </div>
            </div>

            {/* Gothenburg Prayer Sanctuary Visual Card (matching Morrow gray map preview) */}
            <div className="relative rounded-lg overflow-hidden border border-slate-200/90 bg-gradient-to-br from-slate-50 to-slate-100 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-inter">
                    Gothenburg Prayer Sanctuary
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                  Frihamnen
                </span>
              </div>

              <p className="text-xs text-slate-600 font-inter leading-relaxed mb-4">
                A quiet space dedicated to silent contemplation, personal adoration, and intercessory prayer over the city of Gothenburg. Walk-ins are always welcomed.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200 text-xs font-inter">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Next city prayer vigil: Tuesday 18:30 CET</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Frihamnsgatan+20,+417+56+Göteborg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs font-semibold text-[#0D9488] hover:text-[#0B7A6F] inline-flex items-center gap-1"
                >
                  <span>Google Maps ↗</span>
                </a>
              </div>
            </div>

            {/* Liturgical Scripture Quote Callout */}
            <div className="border-l-2 border-[#0D9488] pl-4 py-1 space-y-1.5">
              <p className="font-eb italic text-slate-700 text-sm sm:text-base leading-relaxed">
                “Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.”
              </p>
              <div className="text-xs font-inter font-semibold text-slate-500 uppercase tracking-wider">
                — Philippians 4:6–7
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Prayer Request Submission Card */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="rounded-lg sm:rounded-xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-sm relative">
              <AnimatePresence mode="wait">
                {status.type === "success" ? (
                  /* ========================================================= */
                  /* SUCCESS STATE: Gracious Pastoral Confirmation */
                  /* ========================================================= */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="py-8 sm:py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="max-w-md mx-auto space-y-3">
                      <h3 className="font-hanken text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Your prayer is lifted.
                      </h3>
                      <p className="font-inter text-slate-600 text-sm sm:text-base leading-relaxed">
                        {status.message}
                      </p>
                      <p className="font-eb italic text-slate-500 text-sm">
                        “The Lord is near to all who call on him, to all who call on him in truth.” — Psalm 145:18
                      </p>
                    </div>

                    {/* WhatsApp Action */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href="https://wa.me/46311234567?text=Hello%20Gospels%20Gothenburg,%20I%20just%20submitted%20a%20prayer%20request..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#0D9488] hover:bg-[#0B7A6F] text-white text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp with an Intercessor ↗</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setStatus({ type: "idle" })}
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto"
                      >
                        Send another request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ========================================================= */
                  /* ACTIVE FORM: Matching Morrow Church Contact Architecture */
                  /* ========================================================= */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 font-inter"
                  >
                    {/* Error Banner */}
                    {status.type === "error" && (
                      <div className="p-3.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{status.message}</span>
                      </div>
                    )}

                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="block text-xs sm:text-sm font-medium text-slate-700"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 rounded-md border border-slate-300/90 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all shadow-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="block text-xs sm:text-sm font-medium text-slate-700"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          className="w-full px-3.5 py-2.5 rounded-md border border-slate-300/90 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone (optional) */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="block text-xs sm:text-sm font-medium text-slate-700"
                      >
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+46 70 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-md border border-slate-300/90 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all shadow-sm"
                      />
                    </div>

                    {/* Row 3: Category Chips (Morrow: "What is it about? Pick any that fit.") */}
                    <div className="space-y-2.5 pt-1">
                      <label className="block text-xs sm:text-sm font-medium text-slate-700">
                        What is your prayer focus? Pick any that fit.
                      </label>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {PRAYER_CATEGORIES.map((cat) => {
                          const isSelected = selectedCategories.includes(cat);
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => toggleCategory(cat)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                                isSelected
                                  ? "bg-[#0F172A] text-white border-[#0F172A] shadow-sm"
                                  : "bg-white text-slate-700 border-slate-300/80 hover:border-slate-400 hover:bg-slate-50"
                              }`}
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? "bg-[#2DD4BF] border-[#2DD4BF] text-slate-950"
                                    : "border-slate-400 bg-white"
                                }`}
                              >
                                {isSelected && (
                                  <svg
                                    className="w-2.5 h-2.5 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </span>
                              <span>{cat}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 4: Prayer Request Message */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="requestText"
                        className="block text-xs sm:text-sm font-medium text-slate-700"
                      >
                        Prayer Request
                      </label>
                      <textarea
                        id="requestText"
                        name="requestText"
                        rows={5}
                        required
                        placeholder="How can we lift you before Jesus? Share as much or as little as you feel comfortable..."
                        className="w-full px-3.5 py-3 rounded-md border border-slate-300/90 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all shadow-sm resize-y min-h-[120px]"
                      />
                    </div>

                    {/* Row 5: Privacy / Pastoral Confidence Agreement */}
                    <div className="space-y-3 pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-600 select-none">
                        <input
                          type="checkbox"
                          defaultChecked
                          onChange={(e) => setIsConfidential(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488]"
                        />
                        <span>
                          I agree that Gospels Gothenburg may use these details to pray with me. Keep this request strictly confidential within pastoral leadership.
                        </span>
                      </label>
                    </div>

                    {/* Row 6: Submit Button (Morrow Church dark CTA) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3.5 px-6 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isPending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending prayer request...</span>
                          </>
                        ) : (
                          <>
                            <span>Send prayer request</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Micro Trust Note */}
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-inter pt-1">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Confidential intercession • Zero spam • Prayed over weekly</span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
