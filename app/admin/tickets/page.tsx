"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { TicketPass } from "@/lib/rsvpStore";

export default function AdminTicketsPage() {
  const { isSv } = useLanguage();
  const [tickets, setTickets] = useState<TicketPass[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"ALL" | "ADMITTED" | "PENDING">("ALL");
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

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Filter by status tab
      if (filterTab === "ADMITTED" && !t.checkedIn) return false;
      if (filterTab === "PENDING" && t.checkedIn) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = t.name.toLowerCase().includes(query);
        const matchEmail = t.email.toLowerCase().includes(query);
        const matchCode = t.id.toLowerCase().includes(query);
        const matchChurch = t.church ? t.church.toLowerCase().includes(query) : false;
        return matchName || matchEmail || matchCode || matchChurch;
      }

      return true;
    });
  }, [tickets, filterTab, searchQuery]);

  const totalSeats = tickets.reduce((acc, t) => acc + (t.guests || 1), 0);
  const admittedSeats = tickets
    .filter((t) => t.checkedIn)
    .reduce((acc, t) => acc + (t.guests || 1), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-hanken text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isSv ? "Deltagarlista & Entrépass" : "Attendee Roster & Tickets"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isSv
              ? `Totalt ${tickets.length} bokningar (${totalSeats} reserverade platser). ${admittedSeats} insläppta.`
              : `Total ${tickets.length} registrations (${totalSeats} reserved seats). ${admittedSeats} admitted.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/scan"
            className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold py-2 px-3.5 rounded-md flex items-center gap-1.5 shadow-xs transition-all no-underline"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>{isSv ? "Öppna Scanner" : "Launch Scanner"}</span>
          </Link>
        </div>
      </div>

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isSv
                ? "Sök på namn, e-post eller passkod..."
                : "Search by attendee name, email, or pass code..."
            }
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0D9488] outline-none"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setFilterTab("ALL")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
              filterTab === "ALL"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {isSv ? `Alla (${tickets.length})` : `All (${tickets.length})`}
          </button>
          <button
            onClick={() => setFilterTab("ADMITTED")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
              filterTab === "ADMITTED"
                ? "bg-white text-emerald-700 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {isSv
              ? `Insläppta (${tickets.filter((t) => t.checkedIn).length})`
              : `Admitted (${tickets.filter((t) => t.checkedIn).length})`}
          </button>
          <button
            onClick={() => setFilterTab("PENDING")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
              filterTab === "PENDING"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {isSv
              ? `Väntas (${tickets.filter((t) => !t.checkedIn).length})`
              : `Pending (${tickets.filter((t) => !t.checkedIn).length})`}
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Pass ID</th>
                <th className="py-3 px-4">{isSv ? "Deltagare" : "Attendee"}</th>
                <th className="py-3 px-4">{isSv ? "Platser" : "Seats"}</th>
                <th className="py-3 px-4">{isSv ? "Kyrka / Samfund" : "Fellowship"}</th>
                <th className="py-3 px-4">{isSv ? "Placering" : "Hall Section"}</th>
                <th className="py-3 px-4">{isSv ? "Status" : "Gate Status"}</th>
                <th className="py-3 px-4 text-right">{isSv ? "Insläpp" : "Gate Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0D9488]">
                    #{ticket.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{ticket.name}</div>
                    <div className="text-[11px] text-slate-500">{ticket.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {ticket.guests} {ticket.guests > 1 ? "seats" : "seat"}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {ticket.church || "Gothenburg Fellowship"}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 truncate max-w-[140px]">
                    {ticket.hall}
                  </td>
                  <td className="py-3.5 px-4">
                    {ticket.checkedIn ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{isSv ? "Insläppt" : "Admitted"}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200">
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
                        ? (isSv ? "Ångra Insläpp" : "Undo")
                        : (isSv ? "Släpp In" : "Admit")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
