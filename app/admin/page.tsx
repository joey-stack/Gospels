"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TicketPass } from "@/lib/rsvpStore";

export default function AdminDashboardPage() {
  const { isSv } = useLanguage();
  const [tickets, setTickets] = useState<TicketPass[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/admin/tickets");
      const data = await res.json();
      if (data.success && data.tickets) {
        setTickets(data.tickets);
      }
    } catch (err) {
      console.error("Failed to load tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleToggleCheckIn = async (ticket: TicketPass) => {
    setActionLoading(ticket.id);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: ticket.id,
          action: ticket.checkedIn ? "undo" : "checkIn",
        }),
      });
      const data = await res.json();
      if (data.success && data.ticket) {
        setTickets((prev) =>
          prev.map((t) => (t.id === ticket.id ? data.ticket : t))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const totalSeats = tickets.reduce((acc, t) => acc + (t.guests || 1), 0);
  const admittedSeats = tickets
    .filter((t) => t.checkedIn)
    .reduce((acc, t) => acc + (t.guests || 1), 0);
  const admittedPercent = totalSeats > 0 ? Math.round((admittedSeats / totalSeats) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Pastoral Welcome & Date Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-hanken text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {isSv ? "Välkommen, Pastor Tomas" : "Welcome, Pastor Tomas"}
            </h1>
            <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
            <span className="text-xs text-slate-500 font-medium">Gothenburg Hub</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isSv
              ? "Gothenburg Worship Night • Göteborg • Samling förberedd"
              : "Gothenburg Worship Night • Gothenburg • Sanctuary Ready"}
          </p>
        </div>

        <Link
          href="/admin/scan"
          className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-md shadow-xs transition-all active:scale-95 flex items-center gap-2 self-start md:self-auto no-underline"
        >
          <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
          <span>{isSv ? "Öppna Entrékontroll (Scanner)" : "Launch Gate Scanner"}</span>
        </Link>
      </div>

      {/* Scripture & Encouragement Callout matching screen 10 */}
      <div className="bg-[#F1F5F9] border-l-4 border-[#0D9488] rounded-r-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="space-y-0.5">
          <p className="font-eb italic text-sm sm:text-base text-slate-800">
            {isSv
              ? "»Lova Herren, min själ, och förgät icke vad gott han har gjort.«"
              : "“Bless the Lord, O my soul, and forget not all his benefits.”"}
          </p>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Psaltaren 103:2 • Ministry Focus: Unity across Västra Götaland
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-[#0D9488] text-[11px] font-bold shrink-0 border border-slate-200">
          <span className="material-symbols-outlined text-[15px]">verified</span>
          <span>Gothenburg Lovsång Hub Active</span>
        </div>
      </div>

      {/* 4 Metric Cards matching Stitch screen 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isSv ? "Kommande Samlingar" : "Upcoming Gatherings"}</span>
            <span className="material-symbols-outlined text-[#0D9488] text-[20px]">calendar_month</span>
          </div>
          <div className="my-3">
            <div className="font-hanken text-2xl font-bold text-slate-900">2 Gatherings</div>
            <p className="text-xs text-slate-500 truncate mt-0.5">Holy Spirit Worship &amp; Lovsång</p>
          </div>
          <div className="text-[11px] text-[#0D9488] font-semibold border-t border-slate-100 pt-2 flex items-center justify-between">
            <span>1 Active • 1 Yet to Come</span>
            <span className="text-slate-400">Live</span>
          </div>
        </div>

        {/* Metric 2: Active RSVPs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isSv ? "Registrerade Platser" : "Active Seat RSVPs"}</span>
            <span className="material-symbols-outlined text-[#0D9488] text-[20px]">how_to_reg</span>
          </div>
          <div className="my-3">
            <div className="font-hanken text-2xl font-bold text-slate-900">
              {totalSeats} {isSv ? "Platser" : "Attendees"}
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {tickets.length} {isSv ? "Bokningar registrerade" : "Individual bookings"}
            </p>
          </div>
          <div className="text-[11px] text-[#0D9488] font-semibold border-t border-slate-100 pt-2 flex items-center justify-between">
            <span>Öppet inträde (Göteborg)</span>
            <span className="text-slate-500">Hall: 84%</span>
          </div>
        </div>

        {/* Metric 3: Gate Admitted */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isSv ? "Insläppta vid Entrén" : "Gate Admitted"}</span>
            <span className="material-symbols-outlined text-[#0D9488] text-[20px]">qr_code_scanner</span>
          </div>
          <div className="my-3">
            <div className="font-hanken text-2xl font-bold text-slate-900">
              {admittedSeats} / {totalSeats}
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {admittedPercent}% {isSv ? "incheckade i salen" : "checked into sanctuary"}
            </p>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold border-t border-slate-100 pt-2 flex items-center justify-between">
            <span>Entré B (West Narthex)</span>
            <span className="text-slate-400">Live feed</span>
          </div>
        </div>

        {/* Metric 4: Intercession */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>{isSv ? "Förböneärenden" : "Prayer Petitions"}</span>
            <span className="material-symbols-outlined text-[#0D9488] text-[20px]">folded_hands</span>
          </div>
          <div className="my-3">
            <div className="font-hanken text-2xl font-bold text-slate-900">14 Needs</div>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {isSv ? "Pastoral omsorg & WhatsApp" : "Pastoral intercession team"}
            </p>
          </div>
          <div className="text-[11px] text-[#0D9488] font-semibold border-t border-slate-100 pt-2 flex items-center justify-between">
            <span>9 prayed today</span>
            <span className="text-slate-400">Strict secrecy</span>
          </div>
        </div>
      </div>

      {/* Gate Entrance Quick Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-xl border border-slate-700 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0D9488] text-white text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Entrance Gate Ready</span>
          </div>
          <h3 className="font-hanken text-lg sm:text-xl font-bold">
            {isSv ? "Entrévärdarnas QR-Scanner är aktiv" : "Usher Gate Admission Scanner is Active"}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {isSv
              ? "Stå vid Entré B och scanna anländande besökares digitala pass för omedelbar verifiering."
              : "Stationed at Entrance B? Launch the live scanner on any mobile phone or tablet to verify and admit attendees."}
          </p>
        </div>

        <Link
          href="/admin/scan"
          className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm py-2.5 px-5 rounded-md transition-all active:scale-95 shrink-0 flex items-center gap-2 self-start sm:self-auto no-underline"
        >
          <span className="material-symbols-outlined text-lg text-[#0D9488]">qr_code_scanner</span>
          <span>{isSv ? "Öppna Scannern" : "Launch Scanner"}</span>
        </Link>
      </div>

      {/* Registered Attendees Roster Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-hanken text-base sm:text-lg font-bold text-slate-900">
              {isSv ? "Registrerade Besökare (Holy Spirit Worship 2026)" : "Registered Attendees (Holy Spirit Worship 2026)"}
            </h2>
            <p className="text-xs text-slate-500">
              {isSv
                ? "Hantera gästlistan och bocka av insläppta besökare vid dörren."
                : "Manage attendee registrations and live gate check-in status."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/tickets"
              className="text-xs text-[#0D9488] hover:underline font-semibold flex items-center gap-1"
            >
              <span>{isSv ? "Visa Alla" : "View All"}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading attendee roster...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Pass ID</th>
                  <th className="py-3 px-4">{isSv ? "Deltagare" : "Attendee"}</th>
                  <th className="py-3 px-4">{isSv ? "Församling / Kyrka" : "Church Fellowship"}</th>
                  <th className="py-3 px-4">{isSv ? "Platser" : "Seats"}</th>
                  <th className="py-3 px-4">{isSv ? "Status" : "Gate Status"}</th>
                  <th className="py-3 px-4 text-right">{isSv ? "Åtgärd" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.slice(0, 8).map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0D9488]">
                      #{ticket.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{ticket.name}</div>
                      <div className="text-[11px] text-slate-500">{ticket.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {ticket.church || "Gothenburg Fellowship"}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {ticket.guests} {ticket.guests > 1 ? "seats" : "seat"}
                    </td>
                    <td className="py-3.5 px-4">
                      {ticket.checkedIn ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>{isSv ? "Insläppt" : "Admitted"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>{isSv ? "Väntas" : "Pending"}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleCheckIn(ticket)}
                        disabled={actionLoading === ticket.id}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all active:scale-95 cursor-pointer ${
                          ticket.checkedIn
                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            : "bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs"
                        }`}
                      >
                        {actionLoading === ticket.id
                          ? "..."
                          : ticket.checkedIn
                          ? (isSv ? "Ångra" : "Undo")
                          : (isSv ? "Släpp in" : "Admit")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
