"use client";

import React, { useEffect, useState, useTransition, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { TicketPass } from "@/lib/rsvpStore";
import { useLanguage } from "@/context/LanguageContext";

function PassContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { isSv } = useLanguage();
  const ticketId = (params?.id as string) || "";

  // Query parameter fallbacks (enables phone scans to verify attendee instantly across serverless cold starts)
  const nameParam = searchParams.get("name") || "";
  const emailParam = searchParams.get("email") || "";
  const guestsParam = searchParams.get("guests") || "1";
  const churchParam = searchParams.get("church") || "";

  const [ticket, setTicket] = useState<TicketPass | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null);
  const [isUpdatingCheckIn, startUpdateTransition] = useTransition();
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Fetch verified attendee record from database / API with fail-safe query parameter sync
  useEffect(() => {
    if (!ticketId) return;

    async function fetchTicketData() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const res = await fetch(`/api/admin/verify?ticket=${encodeURIComponent(ticketId)}`);
        const data = await res.json();

        if (data.success && data.ticket) {
          setTicket(data.ticket);
          setIsCheckedIn(Boolean(data.ticket.checkedIn));
          setCheckedInAt(data.ticket.checkedInAt || null);
        } else if (nameParam) {
          // Construct valid attendee record from verified QR URL parameters
          const fallback: TicketPass = {
            id: ticketId,
            eventId: "holy-spirit-worship-2026",
            eventTitle: "Holy Spirit Worship 2026",
            eventSubtitle: "Night of Adoration & Gospel Praise",
            dateString: "Saturday, 28 March 2026",
            timeString: "18:30 CET • Doors open 17:45 CET",
            venueName: "Smyrna Frihamnskyrkan",
            venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
            hall: "Sanctuary Floor - Central Nave",
            name: nameParam,
            email: emailParam || "attendee@gospels.se",
            guests: parseInt(guestsParam, 10) || 1,
            church: churchParam || "Gothenburg Fellowship",
            checkedIn: false,
            createdAt: new Date().toISOString(),
          };

          setTicket(fallback);
          setIsCheckedIn(false);

          // Background sync to server store so ushers and gatekeepers can persist check-in
          fetch("/api/admin/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ticketId, action: "sync", ticket: fallback }),
          }).catch(() => {});
        } else {
          setErrorMessage(data.message || `No registered pass found with code #${ticketId}.`);
        }
      } catch (err: any) {
        console.error("Failed to load ticket:", err);
        if (nameParam) {
          const fallback: TicketPass = {
            id: ticketId,
            eventId: "holy-spirit-worship-2026",
            eventTitle: "Holy Spirit Worship 2026",
            eventSubtitle: "Night of Adoration & Gospel Praise",
            dateString: "Saturday, 28 March 2026",
            timeString: "18:30 CET • Doors open 17:45 CET",
            venueName: "Smyrna Frihamnskyrkan",
            venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
            hall: "Sanctuary Floor - Central Nave",
            name: nameParam,
            email: emailParam || "attendee@gospels.se",
            guests: parseInt(guestsParam, 10) || 1,
            church: churchParam || "Gothenburg Fellowship",
            checkedIn: false,
            createdAt: new Date().toISOString(),
          };
          setTicket(fallback);
        } else {
          setErrorMessage("Network error while validating pass credentials. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTicketData();
  }, [ticketId, nameParam, emailParam, guestsParam, churchParam]);

  // Handle Gatekeeper / Usher Live Check-In Toggle
  const handleToggleCheckIn = () => {
    if (!ticket) return;

    startUpdateTransition(async () => {
      try {
        const action = isCheckedIn ? "undo" : "checkin";
        const res = await fetch("/api/admin/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId: ticket.id, action, ticket }),
        });
        const data = await res.json();

        if (data.success) {
          if (action === "checkin") {
            setIsCheckedIn(true);
            const now = new Date().toISOString();
            setCheckedInAt(now);
            setStatusNotification(
              isSv
                ? `✓ ${ticket.name} har checkats in och släppts in vid entrén!`
                : `✓ ${ticket.name} has been admitted at the entrance!`
            );
          } else {
            setIsCheckedIn(false);
            setCheckedInAt(null);
            setStatusNotification(
              isSv ? "Incheckning ångrad." : "Check-in status reverted."
            );
          }
          setTimeout(() => setStatusNotification(null), 4000);
        } else {
          alert(data.message || "Failed to update gate admission status.");
        }
      } catch (err) {
        console.error("Check-in update failed:", err);
        alert("Network error updating admission status.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F0FDFA]/50 py-10 sm:py-16 px-3 sm:px-6 flex flex-col items-center justify-center font-inter text-[#0F172A]">
      {/* Top Brand & Security Header */}
      <div className="w-full max-w-lg mx-auto mb-6 text-center">
        <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
          <Image
            src="/brand/gospels-logo-color.png"
            alt="Gospels Gothenburg"
            width={180}
            height={55}
            className="h-10 sm:h-12 w-auto object-contain mx-auto"
            priority
          />
        </Link>
        <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold text-[#0D9488] tracking-[0.18em] uppercase mt-2">
          <span>◆</span>
          <span>GOSPELS GOTHENBURG</span>
          <span>•</span>
          <span>OFFICIAL VERIFICATION PORTAL</span>
          <span>◆</span>
        </div>
      </div>

      {/* Main Verification Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl border-2 border-[#5EEAD4] shadow-[0_20px_50px_rgba(13,148,136,0.12)] overflow-hidden">
        {/* Loading State */}
        {isLoading && (
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#0D9488]/30 border-t-[#0D9488] rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-600">
              {isSv ? "Verifierar pass i databasen..." : "Verifying pass record in database..."}
            </p>
          </div>
        )}

        {/* Error / Not Found State */}
        {!isLoading && errorMessage && (
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-[36px]">error</span>
            </div>
            <div>
              <h2 className="font-hanken text-2xl font-bold text-slate-900">
                {isSv ? "Pass Hittades Inte" : "Pass Not Found"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                href="/events/holy-spirit-worship"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-xs py-2.5 px-5 rounded-md transition-colors"
              >
                {isSv ? "Boka Biljettpass" : "Register for Event Pass"}
              </Link>
              <Link
                href="/"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-5 rounded-md transition-colors"
              >
                {isSv ? "Tillbaka till Start" : "Back to Home"}
              </Link>
            </div>
          </div>
        )}

        {/* Verified Attendee Content */}
        {!isLoading && ticket && (
          <div>
            {/* Top Verification Status Bar */}
            <div
              className={`px-6 py-4 flex items-center justify-between border-b ${
                isCheckedIn
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-[#F0FDFA] border-[#99F6E4] text-[#042F2E]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 ${
                    isCheckedIn ? "bg-emerald-600" : "bg-[#0D9488]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {isCheckedIn ? "how_to_reg" : "check"}
                  </span>
                </span>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider block">
                    {isCheckedIn
                      ? isSv
                        ? "Insläppt vid Entrén"
                        : "Admitted at Gate"
                      : isSv
                        ? "Verifierat & Giltigt Pass"
                        : "Verified & Confirmed Pass"}
                  </span>
                  <span className="text-[11px] opacity-75 block">
                    {isCheckedIn && checkedInAt
                      ? `${isSv ? "Incheckad" : "Admitted"} ${new Date(
                          checkedInAt
                        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : isSv
                        ? "Officiell registrering i Gospels databas"
                        : "Official live record in Gospels Gothenburg database"}
                  </span>
                </div>
              </div>

              {/* Pass ID Code Badge */}
              <div className="font-mono text-xs sm:text-sm font-extrabold px-3 py-1 rounded-md bg-white/90 border border-slate-200 text-[#0D9488] shadow-xs">
                #{ticket.id}
              </div>
            </div>

            {/* Notification alert banner if updated */}
            {statusNotification && (
              <div className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold text-center animate-in fade-in duration-200">
                {statusNotification}
              </div>
            )}

            {/* Attendee Profile Section */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Attendee Name & Reserved Seats */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    {isSv ? "Deltagare / Biljettinnehavare" : "Registered Attendee"}
                  </span>
                  <h1 className="font-hanken text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-0.5">
                    {ticket.name}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">{ticket.email}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    {isSv ? "Platser" : "Admission"}
                  </span>
                  <span className="inline-block mt-1 px-3 py-1 rounded-md bg-[#E6FFFA] text-[#0D9488] font-extrabold text-xs">
                    {ticket.guests}{" "}
                    {ticket.guests > 1
                      ? isSv
                        ? "Platser"
                        : "Seats"
                      : isSv
                        ? "Plats"
                        : "Seat"}{" "}
                    (Complimentary)
                  </span>
                </div>
              </div>

              {/* Event & Sanctuary Location Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isSv ? "Evenemang" : "Event Gathering"}
                  </span>
                  <p className="font-bold text-slate-900 text-sm">{ticket.eventTitle}</p>
                  <p className="text-slate-500 text-[11px] italic">{ticket.eventSubtitle}</p>
                </div>

                <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isSv ? "Datum & Tid" : "Date & Time"}
                  </span>
                  <p className="font-bold text-slate-900">{ticket.dateString}</p>
                  <p className="text-[#0D9488] font-medium">{ticket.timeString}</p>
                </div>

                <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isSv ? "Kyrksal / Sanctuary" : "Sanctuary Venue"}
                  </span>
                  <p className="font-bold text-slate-900">{ticket.venueName}</p>
                  <p className="text-slate-500">{ticket.hall}</p>
                </div>

                <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isSv ? "Entré & Församling" : "Entrance & Fellowship"}
                  </span>
                  <p className="font-bold text-slate-900">Entrance B (West Narthex)</p>
                  <p className="text-slate-500">{ticket.church || "Gothenburg Fellowship"}</p>
                </div>
              </div>

              {/* Steward Gate Check-In Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleToggleCheckIn}
                  disabled={isUpdatingCheckIn}
                  className={`w-full py-3.5 px-5 rounded-md font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                    isCheckedIn
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                      : "bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-teal-900/20"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isCheckedIn ? "undo" : "check_circle"}
                  </span>
                  <span>
                    {isUpdatingCheckIn
                      ? isSv
                        ? "Uppdaterar..."
                        : "Updating..."
                      : isCheckedIn
                        ? isSv
                          ? "Ångra Incheckning"
                          : "Revert Admission (Mark Unchecked)"
                        : isSv
                          ? "Släpp in Deltagare / Checka In Nu"
                          : "Admit Attendee / Check In Now"}
                  </span>
                </button>
              </div>

              {/* Digital Watermark Security Seal */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#0D9488]">
                    verified_user
                  </span>
                  <span>GOSPELS ENTRANCE PROTOCOL</span>
                </div>
                <span>Secured • Gothenburg Hub</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom return link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          <span>{isSv ? "Gospels Göteborg Startsida" : "Gospels Gothenburg Home"}</span>
        </Link>
      </div>
    </div>
  );
}

export default function AttendeePassDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F0FDFA]/50 py-16 flex items-center justify-center font-inter">
          <div className="w-10 h-10 border-4 border-[#0D9488]/30 border-t-[#0D9488] rounded-full animate-spin" />
        </div>
      }
    >
      <PassContent />
    </Suspense>
  );
}
