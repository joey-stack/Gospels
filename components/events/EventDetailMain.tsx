"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP, submitPrayerRequest } from "@/app/actions";

interface RSVPData {
  name: string;
  email: string;
  guests: string;
  church?: string;
  passId: string;
}

export const EventDetailMain: React.FC = () => {
  const [isPendingRSVP, startRSVPTransition] = useTransition();
  const [confirmedRSVP, setConfirmedRSVP] = useState<RSVPData | null>(null);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  // Prayer Drawer State
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [isPendingPrayer, startPrayerTransition] = useTransition();
  const [prayerStatus, setPrayerStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleRSVPSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRsvpError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const guests = formData.get("guests")?.toString().trim() || "1";
    const church = formData.get("church")?.toString().trim() || "";

    startRSVPTransition(async () => {
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
          setRsvpError(
            result.errors?.name ||
              result.errors?.email ||
              result.message ||
              "Please check the fields and try again."
          );
        }
      } catch {
        setRsvpError("An unexpected network error occurred. Please try again.");
      }
    });
  };

  const handlePrayerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrayerStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    startPrayerTransition(async () => {
      try {
        const result = await submitPrayerRequest(formData);
        if (result.success) {
          setPrayerStatus({
            type: "success",
            text: "Your confidential prayer request has been received by our pastoral team.",
          });
          form.reset();
        } else {
          setPrayerStatus({
            type: "error",
            text:
              result.errors?.requestText ||
              result.message ||
              "Unable to submit prayer request. Please try again.",
          });
        }
      } catch {
        setPrayerStatus({
          type: "error",
          text: "An error occurred while submitting. Please try again.",
        });
      }
    });
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
    <section className="w-full px-2.5 sm:px-5 py-10 sm:py-14 md:py-16">
      {/* Two-Column Responsive Grid matching Morrow Church 'Detail Grid' */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start w-full">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Prose & Narrative Content (max-width: 760px on desktop) */}
        {/* ========================================================= */}
        <div className="flex-1 w-full min-w-0 space-y-12">
          {/* Main Event Poster Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg md:rounded-xl bg-slate-900 border border-slate-200/60 shadow-sm">
            <Image
              src="/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png"
              alt="Hands raised in reverent praise at Holy Spirit Worship gathering in Gothenburg"
              fill
              priority
              quality={95}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Lead Paragraph */}
          <p className="font-inter text-xl sm:text-2xl text-slate-800 font-normal leading-relaxed">
            An evening devoted entirely to uninterrupted praise, collective prayer, and multi-church gospel choirs convening in Gothenburg.
          </p>

          {/* Narrative Overview */}
          <div className="space-y-4 font-inter text-slate-600 text-sm sm:text-base leading-relaxed border-b border-slate-200/80 pb-10">
            <p>
              Worship teams, choir members, and pastoral elders from across West Sweden unite in the sanctuary at Smyrna Frihamnskyrkan. We begin with 90 minutes of continuous gospel adoration, transition into confidential prayer stations, and wrap up with warm Scandinavian fika fellowship.
            </p>
            <p>
              Whether you belong to a local fellowship, are seeking community, or have never stepped into a Swedish sanctuary, you are genuinely welcome. Come as you are, bring friends, or simply come to sit in the quiet beauty of shared choral adoration.
            </p>
          </div>

          {/* Section: What to expect */}
          <div className="space-y-6 border-b border-slate-200/80 pb-10">
            <h2 className="font-hanken text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
              What to expect
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  library_music
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  Continuous Praise
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  90 minutes of uninterrupted choral and congregational worship in Swedish and English.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  volunteer_activism
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  Pastoral Prayer
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  Multilingual prayer stations offering confidential care, physical healing, and peace.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  menu_book
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  Gospel Word
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  A Christ-centered gospel reflection on hope and spiritual renewal for Västra Götaland.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Good to know (Come As You Are) */}
          <div className="space-y-6 border-b border-slate-200/80 pb-10">
            <h2 className="font-hanken text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
              Good to know
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  local_cafe
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  Swedish Fika
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  Complimentary coffee and fresh cinnamon buns served post-gathering in the foyer.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  accessible
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  Full Accessibility
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  Seamless ramp entry, audio hearing induction loops, and spacious seating.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  family_restroom
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  Family Welcoming
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  Quiet family room with live audio and video feed available for parents with infants.
                </p>
              </div>
            </div>
          </div>

          {/* Scripture Callout Block (Matthew 18:20) */}
          <div className="w-full bg-[#F1F5F9]/80 border-l-4 border-[#0D9488] rounded-r-lg p-6 sm:p-8 shadow-xs">
            <blockquote className="font-eb text-xl sm:text-2xl text-slate-900 italic leading-relaxed">
              “For where two or three gather in my name, there am I with them.”
            </blockquote>
            <cite className="block mt-3 text-xs font-semibold text-slate-500 tracking-wider uppercase not-italic">
              — Matthew 18:20 · Heliga Skriften
            </cite>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Sticky Aside (Specs + Save your spot RSVP) */}
        {/* ========================================================= */}
        <aside className="w-full lg:w-[380px] xl:w-[420px] shrink-0 lg:sticky lg:top-28 space-y-6">
          <div className="bg-slate-50 rounded-lg md:rounded-xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            {/* Quick Specs Rows matching Morrow Church */}
            <div className="space-y-4">
              {/* Date */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </span>
                <p className="font-hanken text-base font-semibold text-slate-900">
                  Saturday, March 28, 2026
                </p>
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Time
                </span>
                <p className="font-hanken text-base font-semibold text-slate-900">
                  18:30 to 21:30 CET{" "}
                  <span className="text-xs font-normal text-slate-500">
                    (Doors open 17:45)
                  </span>
                </p>
              </div>

              {/* Where */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Where
                </span>
                <p className="font-hanken text-base font-semibold text-slate-900">
                  Smyrna Frihamnskyrkan, Gothenburg
                </p>
                <p className="font-inter text-xs text-slate-500">
                  Frihamnsdagarna 4, 417 55 Göteborg
                </p>
              </div>

              {/* Cost */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Cost
                </span>
                <p className="font-hanken text-base font-semibold text-[#0D9488]">
                  Complimentary Admission
                </p>
                <p className="font-inter text-xs text-slate-500">
                  Complimentary, and it helps us set enough chairs. We’ll send a reminder the day before.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200/80 pt-6">
              {confirmedRSVP ? (
                /* Confirmed Boarding Pass State */
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#CCFBF1] text-[#0D9488] font-bold text-xs uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span>Pass Confirmed</span>
                  </div>

                  <div>
                    <h3 className="font-hanken text-2xl font-bold text-slate-900">
                      Tack, {confirmedRSVP.name}!
                    </h3>
                    <p className="font-inter text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Your seat reservation has been recorded for Holy Spirit Worship 2026. A digital confirmation notice has been dispatched to{" "}
                      <strong className="text-slate-900">{confirmedRSVP.email}</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-slate-900 text-white space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Pass ID</span>
                      <span className="font-mono text-[#2DD4BF] font-semibold">
                        {confirmedRSVP.passId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Reserved</span>
                      <span className="text-white font-medium">
                        {confirmedRSVP.guests} {confirmedRSVP.guests === "1" ? "Seat" : "Seats"}
                      </span>
                    </div>
                  </div>

                  {/* Add to Calendar Sync */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                      Add to your calendar
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1 text-center"
                      >
                        <span className="material-symbols-outlined text-sm text-[#0D9488]">public</span>
                        <span>Google</span>
                      </a>
                      <button
                        type="button"
                        onClick={downloadICS}
                        className="border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1 text-center"
                      >
                        <span className="material-symbols-outlined text-sm text-[#0D9488]">download</span>
                        <span>.ics file</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setConfirmedRSVP(null)}
                    className="w-full text-xs text-[#0D9488] hover:underline font-semibold pt-2 text-center"
                  >
                    Register another attendee
                  </button>
                </div>
              ) : (
                /* Save your spot Form */
                <form onSubmit={handleRSVPSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-hanken text-xl font-bold text-slate-900">
                      Save your spot
                    </h3>
                    <p className="font-inter text-xs text-slate-500 mt-1">
                      Reserve your admission pass in 30 seconds.
                    </p>
                  </div>

                  {rsvpError && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                      {rsvpError}
                    </div>
                  )}

                  <input type="hidden" name="eventId" value="holy-spirit-worship-2026" />

                  {/* Name */}
                  <div className="space-y-1">
                    <label
                      htmlFor="rsvp-name"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      Name *
                    </label>
                    <input
                      id="rsvp-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0D9488] outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label
                      htmlFor="rsvp-email"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      Email *
                    </label>
                    <input
                      id="rsvp-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your.email@kyrkan.se"
                      className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0D9488] outline-none transition-colors"
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-1">
                    <label
                      htmlFor="rsvp-guests"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      How many are coming?
                    </label>
                    <select
                      id="rsvp-guests"
                      name="guests"
                      defaultValue="1"
                      className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#0D9488] outline-none transition-colors"
                    >
                      <option value="1">1 Person (Just me)</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5+ (Fellowship group)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPendingRSVP}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-md shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{isPendingRSVP ? "Saving Spot..." : "Save my spot"}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>

                  <p className="text-[11px] text-slate-400 leading-normal text-center">
                    Complimentary admission. No commercial marketing.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Confidential Pastoral Prayer Intercession Drawer */}
          <div className="bg-slate-50 rounded-lg md:rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900">
                <span className="material-symbols-outlined text-[#0D9488] text-[20px]">
                  volunteer_activism
                </span>
                <h4 className="font-hanken text-sm font-bold">
                  Need prayer before?
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsPrayerOpen(!isPrayerOpen)}
                className="text-xs text-[#0D9488] hover:underline font-semibold"
              >
                {isPrayerOpen ? "Close" : "Request"}
              </button>
            </div>

            <p className="font-inter text-xs text-slate-500 leading-relaxed">
              Our intercessory pastoral team confidentially prays for physical healing and peace every Thursday.
            </p>

            <AnimatePresence>
              {isPrayerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pt-3 border-t border-slate-200/80 overflow-hidden"
                >
                  {prayerStatus?.type === "success" ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
                      {prayerStatus.text}
                    </div>
                  ) : (
                    <form onSubmit={handlePrayerSubmit} className="space-y-3">
                      {prayerStatus?.type === "error" && (
                        <div className="p-2.5 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
                          {prayerStatus.text}
                        </div>
                      )}
                      <input
                        name="name"
                        placeholder="Name (or anonymous)"
                        className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#0D9488]"
                      />
                      <textarea
                        name="requestText"
                        required
                        rows={2}
                        placeholder="Share your prayer request..."
                        className="w-full bg-white border border-slate-200 rounded-md p-2.5 text-xs text-slate-900 outline-none focus:border-[#0D9488] resize-none"
                      />
                      <button
                        type="submit"
                        disabled={isPendingPrayer}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 rounded-md transition-colors"
                      >
                        {isPendingPrayer ? "Sending..." : "Send Request"}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </section>
  );
};
