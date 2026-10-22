"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { submitRSVP } from "@/app/actions";

interface RSVPData {
  name: string;
  email: string;
  guests: string;
  church?: string;
  passId: string;
}

export const EventRSVPSection: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [confirmedRSVP, setConfirmedRSVP] = useState<RSVPData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const guests = formData.get("guests")?.toString().trim() || "1";
    const church = formData.get("church")?.toString().trim() || "";

    startTransition(async () => {
      try {
        const result = await submitRSVP(formData);
        if (result.success) {
          const passId = `HSW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
          setConfirmedRSVP({
            name,
            email,
            guests,
            church,
            passId,
          });
        } else {
          setErrorMessage(
            result.errors?.name ||
              result.errors?.email ||
              result.message ||
              "Please check the fields and try again."
          );
        }
      } catch (err) {
        setErrorMessage("An unexpected network error occurred. Please try again.");
      }
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const downloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Gospels Gothenburg//Gatherings//EN",
      "BEGIN:VEVENT",
      "UID:holy-spirit-worship-2026@gospels.se",
      "DTSTAMP:20260328T120000Z",
      "DTSTART:20260328T173000Z",
      "DTEND:20260328T210000Z",
      "SUMMARY:Holy Spirit Worship 2026",
      "DESCRIPTION:An evening devoted entirely to uninterrupted praise, collective prayer, and multi-church gospel choirs convening in Gothenburg.",
      "LOCATION:Smyrna Frihamnskyrkan, Frihamnsdagarna 4, 417 55 Göteborg",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "holy-spirit-worship-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Holy+Spirit+Worship+2026&dates=20260328T173000Z/20260328T210000Z&details=Uninterrupted+praise,+collective+prayer,+and+multi-church+gospel+choirs+convening+in+Gothenburg.&location=Smyrna+Frihamnskyrkan,+Frihamnsdagarna+4,+417+55+Göteborg`;

  return (
    <section className="w-full px-2.5 sm:px-5 py-12" id="rsvp-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive RSVP Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 bg-white rounded-lg p-8 sm:p-10 border border-slate-200/60 shadow-sm"
        >
          {confirmedRSVP ? (
            /* Instant Confirmation State */
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#CCFBF1] text-[#0D9488] font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Pass Confirmed</span>
              </div>

              <div>
                <h3 className="font-hanken text-3xl font-bold text-[#0F172A]">
                  Tack, {confirmedRSVP.name}!
                </h3>
                <p className="font-inter text-sm text-[#475569] mt-2">
                  Your seat reservation has been recorded for Holy Spirit Worship 2026. A digital confirmation notice has been dispatched to{" "}
                  <strong className="text-[#0F172A]">{confirmedRSVP.email}</strong>.
                </p>
              </div>

              {/* Digital Boarding Pass Ticket */}
              <div className="rounded-lg bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white p-6 sm:p-7 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#14B8A6]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-hanken font-bold text-lg text-white tracking-wider">
                      GOSPELS GÖTEBORG
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#2DD4BF] bg-white/10 px-2.5 py-1 rounded-md">
                    {confirmedRSVP.passId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-inter">
                  <div>
                    <span className="text-[#94A3B8] uppercase tracking-wider block text-[10px]">
                      Attendee
                    </span>
                    <span className="font-semibold text-white text-sm block mt-0.5">
                      {confirmedRSVP.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#94A3B8] uppercase tracking-wider block text-[10px]">
                      Guests Reserved
                    </span>
                    <span className="font-semibold text-white text-sm block mt-0.5">
                      {confirmedRSVP.guests} {confirmedRSVP.guests === "1" ? "Person" : "Seats"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#94A3B8] uppercase tracking-wider block text-[10px]">
                      Date &amp; Time
                    </span>
                    <span className="font-semibold text-white block mt-0.5">
                      Saturday, Mar 28 • 18:30 CET
                    </span>
                  </div>

                  <div>
                    <span className="text-[#94A3B8] uppercase tracking-wider block text-[10px]">
                      Venue
                    </span>
                    <span className="font-semibold text-white block mt-0.5">
                      Smyrna Frihamnskyrkan
                    </span>
                  </div>
                </div>

                {confirmedRSVP.church && (
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#94A3B8]">
                    <span>Fellowship delegation: </span>
                    <span className="text-[#E2E8F0] font-medium">{confirmedRSVP.church}</span>
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={downloadICS}
                  className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>Save to Calendar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmedRSVP(null)}
                  className="border border-[#CBD5E1] hover:bg-slate-50 text-[#475569] font-medium text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  Register Another Attendee
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Registration Form */
            <div>
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-[#0D9488] font-bold">
                  FAST ATTENDANCE REGISTRATION
                </span>
                <h2 className="font-hanken text-3xl text-slate-900 font-bold mt-1">
                  RSVP for Complimentary Entry
                </h2>
                <p className="font-inter text-sm text-slate-600 mt-2">
                  Admission is completely complimentary. Pre-registration assists our welcome team in coordinating seating and hospitality refreshments.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <input type="hidden" name="eventId" value="holy-spirit-worship-2026" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="full-name"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      Full Name *
                    </label>
                    <input
                      id="full-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Astrid Lindgren"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="astrid@kyrkan.se"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <label
                      htmlFor="guests"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      Number of Guests *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      defaultValue="1"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-[#0F172A] focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none transition-all"
                    >
                      <option value="1">1 Person (Just Me)</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3–5 Fellowship Group</option>
                      <option value="6">6+ Choir or Church Delegation</option>
                    </select>
                  </div>

                  {/* Church / District */}
                  <div className="space-y-2">
                    <label
                      htmlFor="church"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      Church / District <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="church"
                      name="church"
                      type="text"
                      placeholder="e.g. Betlehemskyrkan / Majorna"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white font-semibold text-sm py-3.5 rounded-lg shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Recording Reservation...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">check</span>
                        <span>RSVP for Complimentary Entry</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[12px] text-slate-500 text-center font-inter">
                  Your details are preserved in strict accordance with Swedish privacy laws. No commercial sharing.
                </p>
              </form>
            </div>
          )}
        </motion.div>

        {/* Right Column: Calendar, Sharing & Swish Bento Group */}
        <div className="lg:col-span-5 space-y-6">
          {/* Calendar Integration Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="bg-white rounded-lg p-6 border border-slate-200/60 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 text-[#0D9488]">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
              <h3 className="font-hanken text-base text-slate-900 font-bold">
                Save the Date
              </h3>
            </div>
            <p className="font-inter text-xs text-slate-600 leading-relaxed">
              Sync this gathering to your calendar of choice so you don't miss the 17:45 door opening in Frihamnen.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span className="material-symbols-outlined text-[15px] text-[#0D9488]">public</span>
                <span>Google</span>
              </a>

              <button
                type="button"
                onClick={downloadICS}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span className="material-symbols-outlined text-[15px] text-[#0D9488]">calendar_today</span>
                <span>Apple</span>
              </button>

              <button
                type="button"
                onClick={downloadICS}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span className="material-symbols-outlined text-[15px] text-[#0D9488]">download</span>
                <span>.ics</span>
              </button>
            </div>
          </motion.div>

          {/* Social Share Row Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="bg-white rounded-lg p-6 border border-slate-200/60 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 text-[#0D9488]">
              <span className="material-symbols-outlined text-[22px]">share</span>
              <h3 className="font-hanken text-base text-slate-900 font-bold">
                Invite Your Community
              </h3>
            </div>
            <p className="font-inter text-xs text-slate-600 leading-relaxed">
              Spread the word to fellow singers, cell groups, and worship musicians across Gothenburg.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://api.whatsapp.com/send?text=Join%20us%20for%20Holy%20Spirit%20Worship%202026%20at%20Smyrna%20Frihamnen%20Gothenburg!%20Complimentary%20RSVP:%20https://gospels.se/events/holy-spirit-worship"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-semibold text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://gospels.se/events/holy-spirit-worship"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-semibold text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                <span>Facebook</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-semibold text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedLink ? "done" : "link"}
                </span>
                <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </motion.div>

          {/* Swish Giving Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="bg-white rounded-lg p-6 border border-slate-200/60 shadow-sm flex items-center gap-5"
          >
            {/* Swish QR Code Mockup Badge */}
            <div className="w-16 h-16 bg-teal-50/70 rounded-md border border-teal-100 flex flex-col items-center justify-center text-center shrink-0">
              <span className="material-symbols-outlined text-[#0D9488] text-[28px]">qr_code_2</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">
                Swish QR
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-[#0D9488] uppercase font-bold tracking-wider">
                Voluntary Gåva
              </span>
              <h4 className="font-hanken text-base font-bold text-slate-900">
                Kingdom Offering
              </h4>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base text-slate-900 font-bold tracking-wider">
                  123 456 78 90
                </span>
              </div>
              <p className="font-inter text-xs text-slate-500">
                Märkt: <strong className="text-slate-800">HSW2026</strong> · Support travel grants for youth choirs.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
