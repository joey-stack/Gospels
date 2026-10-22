"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { TicketPass } from "@/lib/rsvpStore";

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketPass | null;
  qrCodeUrl?: string;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose,
  ticket,
  qrCodeUrl,
}) => {
  const { isSv } = useLanguage();
  const ticketRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !ticket) return null;

  const handleDownload = () => {
    // If QR code is a data URL, we can download the ticket as a formatted HTML/image file or trigger print
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${ticket.eventTitle} Pass - ${ticket.name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; padding: 40px; color: #0f172a; }
            .ticket { max-width: 580px; margin: 0 auto; background: white; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
            .header { background: #0D9488; color: white; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0 0; opacity: 0.9; font-size: 14px; }
            .body { padding: 28px; }
            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px dashed #cbd5e1; }
            .meta-item label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; display: block; margin-bottom: 4px; }
            .meta-item span { font-size: 15px; font-weight: 600; color: #0f172a; }
            .qr-section { text-align: center; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
            .qr-code { width: 220px; height: 220px; margin: 0 auto; display: block; }
            .code { font-family: monospace; font-size: 16px; font-weight: bold; margin-top: 10px; letter-spacing: 1px; color: #0D9488; }
            .footer { padding: 16px 28px; background: #f1f5f9; text-align: center; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <p style="text-transform: uppercase; font-size: 11px; letter-spacing: 2px;">GOSPELS GOTHENBURG • OFFICIAL PASS</p>
              <h1>${ticket.eventTitle}</h1>
              <p>${ticket.eventSubtitle}</p>
            </div>
            <div class="body">
              <div class="meta-grid">
                <div class="meta-item">
                  <label>Attendee / Deltagare</label>
                  <span>${ticket.name}</span>
                </div>
                <div class="meta-item">
                  <label>Admission / Platser</label>
                  <span>${ticket.guests} ${ticket.guests > 1 ? "Seats" : "Seat"} (Complimentary)</span>
                </div>
                <div class="meta-item">
                  <label>Date & Time / Datum</label>
                  <span>${ticket.dateString}<br/>${ticket.timeString}</span>
                </div>
                <div class="meta-item">
                  <label>Sanctuary / Lokal</label>
                  <span>${ticket.venueName}<br/><span style="font-weight: 400; font-size: 13px; color: #64748b;">${ticket.hall}</span></span>
                </div>
              </div>
              <div class="qr-section">
                ${qrCodeUrl ? `<img src="${qrCodeUrl}" class="qr-code" alt="Entry QR" />` : ""}
                <div class="code">#${ticket.id}</div>
                <p style="font-size: 12px; color: #64748b; margin-top: 6px;">Show this QR code at Entrance B (West Narthex) for swift admission.</p>
              </div>
            </div>
            <div class="footer">
              West Sweden Gospel Fellowship • Smyrna Frihamnskyrkan, Frihamnsgatan 20, Göteborg
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    ticket.eventTitle
  )}&dates=20260328T173000Z/20260328T210000Z&details=${encodeURIComponent(
    `Official pass #${ticket.id} for ${ticket.name} (${ticket.guests} seats).`
  )}&location=${encodeURIComponent(ticket.venueName + ", " + ticket.venueAddress)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto text-slate-900"
        >
          {/* Top Status Header */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0D9488]"></span>
              </span>
              <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider">
                {isSv
                  ? "Bokning Bekräftad • Officiellt Inträdespass"
                  : "Reservation Confirmed • Official Entry Pass"}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Ticket Body: Two-Column Responsive Pass matching screen 19 */}
          <div ref={ticketRef} className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 8 Cols: Event & Attendee Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 bg-gradient-to-br from-white to-slate-50/60">
              <div className="space-y-6">
                {/* Event Header with Date Badge */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-md overflow-hidden border border-[#0D9488]/30 shadow-xs flex flex-col shrink-0">
                    <div className="bg-[#0D9488] text-white text-center py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      MAR
                    </div>
                    <div className="bg-white flex-1 flex items-center justify-center font-hanken font-bold text-xl text-slate-900">
                      28
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider block">
                      {isSv ? "Årlig Lovsångskväll" : "Annual Gathering"}
                    </span>
                    <h2 className="font-hanken text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                      {ticket.eventTitle}
                    </h2>
                    <p className="text-xs text-slate-500 font-inter mt-0.5">
                      {ticket.eventSubtitle}
                    </p>
                  </div>
                </div>

                {/* Attendee & Reservation Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-200/80 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isSv ? "Biljettinnehavare" : "Pass Holder"}
                    </span>
                    <p className="text-sm font-bold text-slate-900 font-hanken">
                      {ticket.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{ticket.email}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isSv ? "Antal Platser" : "Seats Reserved"}
                    </span>
                    <p className="text-sm font-bold text-slate-900 font-hanken">
                      {ticket.guests} {ticket.guests > 1 ? (isSv ? "Personer" : "Guests") : (isSv ? "Person" : "Guest")}
                    </p>
                    <p className="text-[11px] text-[#0D9488] font-semibold">
                      {isSv ? "Öppet inträde (Kostnadsfritt)" : "Complimentary Open Admission"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isSv ? "Datum & Tid" : "Date & Time"}
                    </span>
                    <p className="text-xs font-semibold text-slate-900">
                      {ticket.dateString}
                    </p>
                    <p className="text-[11px] text-slate-500">{ticket.timeString}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isSv ? "Kyrksal & Adress" : "Sanctuary Venue"}
                    </span>
                    <p className="text-xs font-semibold text-slate-900">
                      {ticket.venueName}
                    </p>
                    <p className="text-[11px] text-slate-500">{ticket.hall}</p>
                  </div>
                </div>

                {/* Fika Fellowship Notice */}
                <div className="flex items-center gap-3 p-3 rounded-md bg-[#F0FDFA] border border-[#0D9488]/20 text-xs text-slate-800">
                  <span className="material-symbols-outlined text-[#0D9488] text-[20px] shrink-0">
                    local_cafe
                  </span>
                  <span>
                    <strong>{isSv ? "Kyrkfika ingår:" : "Swedish Fika Included:"}</strong>{" "}
                    {isSv
                      ? "Nybakade kanelbullar och bryggkaffe serveras i atriet från kl 17:45."
                      : "Fresh Gothenburg cinnamon buns and artisan coffee served in the atrium from 17:45."}
                  </span>
                </div>
              </div>

              {/* Scripture Meditation Bar */}
              <div className="mt-5 p-3 rounded-md bg-slate-100 border-l-[3px] border-[#0D9488]">
                <p className="font-eb italic text-xs sm:text-sm text-slate-800">
                  {isSv
                    ? "»Där två eller tre är samlade i mitt namn, där är jag mitt ibland dem.«"
                    : "“Where two or three gather in my name, there am I with them.”"}
                </p>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mt-1">
                  Matteus 18:20
                </span>
              </div>
            </div>

            {/* Right 5 Cols: QR Code & Gate Pass Actions */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50 flex flex-col justify-between items-center text-center">
              <div className="w-full flex flex-col items-center">
                {/* Gate Credential Label */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span className="material-symbols-outlined text-[14px] text-[#0D9488]">
                    qr_code_scanner
                  </span>
                  <span>{isSv ? "Scannas vid entrén" : "Scan at Entrance"}</span>
                </div>

                {/* High Contrast QR Code */}
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-sm inline-block">
                  {qrCodeUrl ? (
                    <Image
                      src={qrCodeUrl}
                      alt={`QR Code Pass #${ticket.id}`}
                      width={180}
                      height={180}
                      className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded"
                      unoptimized
                    />
                  ) : (
                    <div className="w-40 h-40 sm:w-44 sm:h-44 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                      Loading QR...
                    </div>
                  )}
                </div>

                {/* Pass Code */}
                <span className="font-mono text-sm sm:text-base font-bold text-slate-900 tracking-widest mt-3">
                  #{ticket.id}
                </span>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[240px]">
                  {isSv
                    ? "Visa denna kod vid Entré B (Västra Narthex) för omedelbart inträde."
                    : "Present this scannable QR code on arrival at Entrance B for swift admission."}
                </p>
              </div>

              {/* Action Buttons: Download, Calendar, Close */}
              <div className="w-full space-y-2.5 mt-6 pt-5 border-t border-slate-200/80">
                {/* Download Pass Button */}
                <button
                  onClick={handleDownload}
                  className="w-full bg-[#0D9488] hover:bg-[#0F766E] active:scale-95 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>{isSv ? "Ladda ner / Skriv ut Biljett" : "Download / Print Pass"}</span>
                </button>

                {/* Add to Google Calendar */}
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-slate-100 active:scale-95 text-slate-700 border border-slate-300 font-medium text-xs py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span className="material-symbols-outlined text-sm text-[#0D9488]">
                    calendar_add_on
                  </span>
                  <span>{isSv ? "Lägg till i kalender" : "Add to Google Calendar"}</span>
                </a>

                {/* Dismiss */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-xs text-slate-500 hover:text-slate-800 font-medium py-1 text-center cursor-pointer transition-colors"
                >
                  {isSv ? "Stäng fönstret" : "Close pass view"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
