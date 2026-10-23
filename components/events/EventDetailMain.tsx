"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP, submitPrayerRequest } from "@/app/actions";
import { useLanguage } from "@/context/LanguageContext";
import { DigitalPassModal } from "@/components/events/DigitalPassModal";
import { TicketPass } from "@/lib/rsvpStore";

interface RSVPData {
  name: string;
  email: string;
  guests: string;
  church?: string;
  passId: string;
}

export const EventDetailMain: React.FC = () => {
  const { isSv } = useLanguage();
  const [isPendingRSVP, startRSVPTransition] = useTransition();
  const [confirmedRSVP, setConfirmedRSVP] = useState<RSVPData | null>(null);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  // Digital Pass Modal State
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<TicketPass | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

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
        let result: any;
        try {
          result = await submitRSVP(formData);
        } catch {
          // Fallback to API route if Server Action hit network or cache hash mismatch
          const res = await fetch("/api/rsvp", {
            method: "POST",
            body: formData,
          });
          result = await res.json();
        }

        if (result && result.success && result.data) {
          const { ticket, qrCodeDataUrl } = result.data;
          setCurrentTicket(ticket);
          setQrCodeUrl(qrCodeDataUrl);
          setConfirmedRSVP({
            name: ticket.name,
            email: ticket.email,
            guests: String(ticket.guests),
            church: ticket.church || "",
            passId: ticket.id,
          });
          setIsPassModalOpen(true);
        } else {
          setRsvpError(
            result?.errors?.name ||
              result?.errors?.email ||
              result?.message ||
              (isSv
                ? "Kontrollera fälten och försök igen."
                : "Please check the fields and try again.")
          );
        }
      } catch {
        setRsvpError(
          isSv
            ? "Ett oväntat nätverksfel uppstod. Försök igen."
            : "An unexpected network error occurred. Please try again."
        );
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
            text: isSv
              ? "Ditt konfidentiella böneämne har tagits emot av vårt själavårdsteam."
              : "Your confidential prayer request has been received by our pastoral team.",
          });
          form.reset();
        } else {
          setPrayerStatus({
            type: "error",
            text:
              result.errors?.requestText ||
              result.message ||
              (isSv
                ? "Kunde inte skicka böneämnet. Försök igen."
                : "Unable to submit prayer request. Please try again."),
          });
        }
      } catch {
        setPrayerStatus({
          type: "error",
          text: isSv
            ? "Ett fel uppstod vid inskickandet. Försök igen."
            : "An error occurred while submitting. Please try again.",
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
      "UID:gothenburg-worship-night@gospels.se",
      "DTSTAMP:20261023T120000Z",
      "SUMMARY:Gothenburg Worship Night",
      "DESCRIPTION:An evening devoted entirely to uninterrupted praise, collective prayer, and multi-church gospel choirs convening in Gothenburg.",
      "LOCATION:Gothenburg, Sweden",
      "STATUS:TENTATIVE",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "gothenburg-worship-night.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Gothenburg+Worship+Night&details=Uninterrupted+praise,+collective+prayer,+and+multi-church+gospel+choirs+convening+in+Gothenburg.&location=Gothenburg,+Sweden`;

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
              alt={
                isSv
                  ? "Händer lyfta i lovsång vid Gothenburg Worship Night i Göteborg"
                  : "Hands raised in reverent praise at Gothenburg Worship Night gathering in Gothenburg"
              }
              fill
              priority
              quality={95}
              className="object-cover blur-[3px] scale-105"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Lead Paragraph */}
          <p className="font-inter text-xl sm:text-2xl text-slate-800 font-normal leading-relaxed">
            {isSv
              ? "En kväll hängiven oavbruten lovsång, gemensam förbön och förenade gospelkörer i Göteborg."
              : "An evening devoted entirely to uninterrupted praise, collective prayer, and multi-church gospel choirs convening in Gothenburg."}
          </p>

          {/* Narrative Overview */}
          <div className="space-y-4 font-inter text-slate-600 text-sm sm:text-base leading-relaxed border-b border-slate-200/80 pb-10">
            <p>
              {isSv
                ? "Lovsångsteam, körsångare och pastorer från hela Västsverige förenas i Göteborg. Vi inleder med 90 minuter av sammanhängande gospel och tillbedjan, fortsätter med personliga bönestationer och avslutar med varmt fika."
                : "Worship teams, choir members, and pastoral elders from across West Sweden unite in Gothenburg. We begin with 90 minutes of continuous gospel adoration, transition into confidential prayer stations, and wrap up with warm Scandinavian fika fellowship."}
            </p>
            <p>
              {isSv
                ? "Oavsett om du tillhör en lokal församling, söker gemenskap eller aldrig tidigare har satt din fot i en kyrka är du varmt välkommen. Kom precis som du är, ta med vänner eller bara sitt och vila i körens vackra lovsång."
                : "Whether you belong to a local fellowship, are seeking community, or have never stepped into a Swedish sanctuary, you are genuinely welcome. Come as you are, bring friends, or simply come to sit in the quiet beauty of shared choral adoration."}
            </p>
          </div>

          {/* Section: What to expect */}
          <div className="space-y-6 border-b border-slate-200/80 pb-10">
            <h2 className="font-hanken text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
              {isSv ? "Vad du kan förvänta dig" : "What to expect"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  library_music
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  {isSv ? "Sammanhängande Lovsång" : "Continuous Praise"}
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  {isSv
                    ? "90 minuter av oavbruten kör- och församlingssång på svenska och engelska."
                    : "90 minutes of uninterrupted choral and congregational worship in Swedish and English."}
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  volunteer_activism
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  {isSv ? "Pastoral Förbön" : "Pastoral Prayer"}
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  {isSv
                    ? "Flerspråkiga bönestationer med förbön, helande och frid i strikt tystnadsplikt."
                    : "Multilingual prayer stations offering confidential care, physical healing, and peace."}
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  menu_book
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  {isSv ? "Gospelbudskap" : "Gospel Word"}
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  {isSv
                    ? "Ett Kristuscentrerat budskap om hopp och andlig förnyelse för Västra Götaland."
                    : "A Christ-centered gospel reflection on hope and spiritual renewal for Västra Götaland."}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Good to know */}
          <div className="space-y-6 border-b border-slate-200/80 pb-10">
            <h2 className="font-hanken text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
              {isSv ? "Bra att veta" : "Good to know"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  local_cafe
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  {isSv ? "Svenskt Fika" : "Swedish Fika"}
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  {isSv
                    ? "Varmt kaffe och nybakade kanelbullar serveras i foajén efter samlingen."
                    : "Complimentary coffee and fresh cinnamon buns served post-gathering in the foyer."}
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  accessible
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  {isSv ? "Full Tillgänglighet" : "Full Accessibility"}
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  {isSv
                    ? "Rampentré, hörselslinga och gott om rullstolsanpassade platser i salen."
                    : "Seamless ramp entry, audio hearing induction loops, and spacious seating."}
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-md border border-slate-200/60 shadow-xs space-y-2">
                <span className="material-symbols-outlined text-[#0D9488] text-[22px]">
                  family_restroom
                </span>
                <h4 className="font-hanken text-sm font-bold text-slate-900">
                  {isSv ? "Välkomnande för Familjer" : "Family Welcoming"}
                </h4>
                <p className="font-inter text-xs text-slate-600 leading-relaxed">
                  {isSv
                    ? "Lugnt familjerum med bild- och ljudöverföring för föräldrar med småbarn."
                    : "Quiet family room with live audio and video feed available for parents with infants."}
                </p>
              </div>
            </div>
          </div>

          {/* Scripture Callout Block (Matthew 18:20) */}
          <div className="w-full bg-[#F1F5F9]/80 border-l-4 border-[#0D9488] rounded-r-lg p-6 sm:p-8 shadow-xs">
            <blockquote className="font-eb text-xl sm:text-2xl text-slate-900 italic leading-relaxed">
              {isSv
                ? "”Ty där två eller tre är samlade i mitt namn, där är jag mitt ibland dem.”"
                : "“For where two or three gather in my name, there am I with them.”"}
            </blockquote>
            <cite className="block mt-3 text-xs font-semibold text-slate-500 tracking-wider uppercase not-italic">
              {isSv ? "— Matteus 18:20 · Svenska Folkbibeln" : "— Matthew 18:20 · Holy Scripture"}
            </cite>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Sticky Aside (Specs + Save your spot RSVP) */}
        {/* ========================================================= */}
        <aside className="w-full lg:w-[380px] xl:w-[420px] shrink-0 lg:sticky lg:top-28 space-y-6">
          <div className="bg-slate-50 rounded-lg md:rounded-xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            {/* Quick Specs Rows */}
            <div className="space-y-4">
              {/* Date */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {isSv ? "Datum" : "Date"}
                </span>
                <p className="font-hanken text-base font-semibold text-slate-900">
                  {isSv ? "Datum meddelas inom kort" : "Date to be announced soon"}
                </p>
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {isSv ? "Tid" : "Time"}
                </span>
                <p className="font-hanken text-base font-semibold text-slate-900">
                  {isSv ? "Tid meddelas inom kort" : "Time announced soon"}
                </p>
              </div>

              {/* Where */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {isSv ? "Plats" : "Where"}
                </span>
                <p className="font-hanken text-base font-semibold text-slate-900">
                  {isSv ? "Göteborg, Sverige" : "Gothenburg, Sweden"}
                </p>
                <p className="font-inter text-xs text-slate-500">
                  {isSv ? "Lokal & adress meddelas inom kort" : "Venue and address to be announced"}
                </p>
              </div>

              {/* Cost */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {isSv ? "Inträde" : "Cost"}
                </span>
                <p className="font-hanken text-base font-semibold text-[#0D9488]">
                  {isSv ? "Öppet inträde" : "Complimentary Admission"}
                </p>
                <p className="font-inter text-xs text-slate-500">
                  {isSv
                    ? "Öppet inträde för alla, anmälan hjälper oss att ställa fram stolar och förbereda fika."
                    : "Complimentary, and it helps us set enough chairs. We’ll send a reminder the day before."}
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
                    <span>{isSv ? "Plats Bekräftad" : "Pass Confirmed"}</span>
                  </div>

                  <div>
                    <h3 className="font-hanken text-2xl font-bold text-slate-900">
                      {isSv ? `Tack, ${confirmedRSVP.name}!` : `Thank you, ${confirmedRSVP.name}!`}
                    </h3>
                    <p className="font-inter text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {isSv
                        ? "Din platsreservation har registrerats för Göteborg Worship Night. En bekräftelse har skickats till "
                        : "Your seat reservation has been recorded for Gothenburg Worship Night. A digital confirmation notice has been dispatched to "}
                      <strong className="text-slate-900">{confirmedRSVP.email}</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-slate-900 text-white space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Pass ID</span>
                      <span className="font-mono text-[#2DD4BF] font-semibold">
                        #{confirmedRSVP.passId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>{isSv ? "Reserverat" : "Reserved"}</span>
                      <span className="text-white font-medium">
                        {isSv
                          ? `${confirmedRSVP.guests} ${confirmedRSVP.guests === "1" ? "Plats" : "Platser"}`
                          : `${confirmedRSVP.guests} ${confirmedRSVP.guests === "1" ? "Seat" : "Seats"}`}
                      </span>
                    </div>
                  </div>

                  {/* View / Download Ticket Pass Button */}
                  <button
                    type="button"
                    onClick={() => setIsPassModalOpen(true)}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-xs py-2.5 px-3 rounded-md transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                    <span>{isSv ? "Öppna / Ladda ner Biljettpass" : "View & Download Ticket Pass"}</span>
                  </button>

                  {/* Add to Calendar Sync */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                      {isSv ? "Lägg till i kalender" : "Add to your calendar"}
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
                        className="border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1 text-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm text-[#0D9488]">download</span>
                        <span>{isSv ? ".ics-fil" : ".ics file"}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setConfirmedRSVP(null)}
                    className="w-full text-xs text-[#0D9488] hover:underline font-semibold pt-2 text-center cursor-pointer"
                  >
                    {isSv ? "Anmäl ytterligare en deltagare" : "Register another attendee"}
                  </button>
                </div>
              ) : (
                /* Save your spot Form */
                <form onSubmit={handleRSVPSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-hanken text-xl font-bold text-slate-900">
                      {isSv ? "Boka din plats" : "Save your spot"}
                    </h3>
                    <p className="font-inter text-xs text-slate-500 mt-1">
                      {isSv
                        ? "Reservera ditt inträdespass på 30 sekunder."
                        : "Reserve your admission pass in 30 seconds."}
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
                      {isSv ? "Namn *" : "Name *"}
                    </label>
                    <input
                      id="rsvp-name"
                      name="name"
                      type="text"
                      required
                      placeholder={isSv ? "Ditt för- och efternamn" : "Your full name"}
                      className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0D9488] outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label
                      htmlFor="rsvp-email"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      {isSv ? "E-postadress *" : "Email *"}
                    </label>
                    <input
                      id="rsvp-email"
                      name="email"
                      type="email"
                      required
                      placeholder={isSv ? "din.epost@kyrkan.se" : "your.email@example.com"}
                      className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0D9488] outline-none transition-colors"
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-1">
                    <label
                      htmlFor="rsvp-guests"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block"
                    >
                      {isSv ? "Hur många kommer?" : "How many are coming?"}
                    </label>
                    <select
                      id="rsvp-guests"
                      name="guests"
                      defaultValue="1"
                      className="w-full bg-white border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#0D9488] outline-none transition-colors"
                    >
                      <option value="1">{isSv ? "1 Person (Bara jag)" : "1 Person (Just me)"}</option>
                      <option value="2">{isSv ? "2 Personer" : "2 People"}</option>
                      <option value="3">{isSv ? "3 Personer" : "3 People"}</option>
                      <option value="4">{isSv ? "4 Personer" : "4 People"}</option>
                      <option value="5">{isSv ? "5+ (Grupp / Gemenskap)" : "5+ (Fellowship group)"}</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPendingRSVP}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-md shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {isPendingRSVP
                        ? (isSv ? "Sparar plats..." : "Saving Spot...")
                        : (isSv ? "Boka min plats" : "Save my spot")}
                    </span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>

                  <p className="text-[11px] text-slate-400 leading-normal text-center">
                    {isSv
                      ? "Öppet inträde. Ingen kommersiell marknadsföring."
                      : "Complimentary admission. No commercial marketing."}
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
                  {isSv ? "Behöver du förbön inför kvällen?" : "Need prayer before?"}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsPrayerOpen(!isPrayerOpen)}
                className="text-xs text-[#0D9488] hover:underline font-semibold cursor-pointer"
              >
                {isPrayerOpen
                  ? (isSv ? "Stäng" : "Close")
                  : (isSv ? "Be om bön" : "Request")}
              </button>
            </div>

            <p className="font-inter text-xs text-slate-500 leading-relaxed">
              {isSv
                ? "Vårt pastorala förbönsteam ber i tystnadsplikt för helande, frid och upprättelse varje vecka."
                : "Our intercessory pastoral team confidentially prays for physical healing and peace every Thursday."}
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
                        placeholder={isSv ? "Namn (eller anonymt)" : "Name (or anonymous)"}
                        className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#0D9488]"
                      />
                      <textarea
                        name="requestText"
                        required
                        rows={2}
                        placeholder={isSv ? "Dela ditt böneämne..." : "Share your prayer request..."}
                        className="w-full bg-white border border-slate-200 rounded-md p-2.5 text-xs text-slate-900 outline-none focus:border-[#0D9488] resize-none"
                      />
                      <button
                        type="submit"
                        disabled={isPendingPrayer}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 rounded-md transition-colors cursor-pointer"
                      >
                        {isPendingPrayer
                          ? (isSv ? "Skickar..." : "Sending...")
                          : (isSv ? "Skicka böneämne" : "Send Request")}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>

      {/* Scannable Gate Admission Digital Pass Modal */}
      <DigitalPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        ticket={currentTicket}
        qrCodeUrl={qrCodeUrl}
      />
    </section>
  );
};
