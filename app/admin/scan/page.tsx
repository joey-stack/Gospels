"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { TicketPass } from "@/lib/rsvpStore";

function GateScannerContent() {
  const { isSv } = useLanguage();
  const searchParams = useSearchParams();
  const initialTicketCode = searchParams.get("ticket") || "";

  const [ticketInput, setTicketInput] = useState(initialTicketCode);
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<TicketPass | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<
    "IDLE" | "VALID" | "ALREADY_CHECKED_IN" | "NOT_FOUND" | "CHECKED_IN_NOW"
  >("IDLE");
  const [statusMessage, setStatusMessage] = useState("");
  const [recentAdmissions, setRecentAdmissions] = useState<TicketPass[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Auto-verify if ticket parameter passed in URL
  useEffect(() => {
    if (initialTicketCode) {
      handleVerify(initialTicketCode);
    }
  }, [initialTicketCode]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera access denied or unavailable", err);
      setIsCameraActive(false);
      alert(
        isSv
          ? "Kameraåtkomst är inte tillgänglig på denna enhet. Du kan ange biljettkoden manuellt i fältet nedan."
          : "Camera stream is not available or permission was denied. You can manually enter or paste the ticket pass code below."
      );
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleVerify = async (codeToVerify?: string) => {
    let rawCode = (codeToVerify !== undefined ? codeToVerify : ticketInput).trim();
    if (!rawCode) return;

    // If usher scanned or pasted a full URL, extract ticket parameter
    if (rawCode.includes("ticket=")) {
      try {
        const url = new URL(rawCode);
        rawCode = url.searchParams.get("ticket") || rawCode;
      } catch {
        const match = rawCode.match(/ticket=([A-Za-z0-9_-]+)/);
        if (match) rawCode = match[1];
      }
    }

    // Strip leading '#' if present
    rawCode = rawCode.replace(/^#/, "");

    setIsVerifying(true);
    setVerifyStatus("IDLE");
    setStatusMessage("");

    try {
      const res = await fetch(`/api/admin/verify?ticket=${encodeURIComponent(rawCode)}`);
      const data = await res.json();

      if (data.success && data.ticket) {
        setCurrentTicket(data.ticket);
        if (data.ticket.checkedIn) {
          setVerifyStatus("ALREADY_CHECKED_IN");
          setStatusMessage(
            isSv
              ? `Varning: Detta pass släpptes redan in kl ${new Date(
                  data.ticket.checkedInAt
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`
              : `Warning: This pass was already admitted at ${new Date(
                  data.ticket.checkedInAt
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`
          );
        } else {
          setVerifyStatus("VALID");
          setStatusMessage(
            isSv
              ? "Giltigt pass! Redo att checkas in."
              : "Valid ticket pass! Ready for gate admission."
          );
        }
      } else {
        setCurrentTicket(null);
        setVerifyStatus("NOT_FOUND");
        setStatusMessage(
          isSv
            ? `Ingen registrering hittades för kod "${rawCode}". Hänvisa gästen till välkomstdisken.`
            : `No reservation found for code "${rawCode}". Please direct guest to the hospitality desk.`
        );
      }
    } catch {
      setVerifyStatus("NOT_FOUND");
      setStatusMessage(
        isSv
          ? "Kunde inte ansluta till databasen. Försök igen."
          : "Unable to verify ticket with server. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCheckIn = async () => {
    if (!currentTicket) return;
    setIsVerifying(true);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: currentTicket.id }),
      });
      const data = await res.json();

      if (data.success && data.ticket) {
        setCurrentTicket(data.ticket);
        setVerifyStatus("CHECKED_IN_NOW");
        setStatusMessage(
          isSv
            ? `Välkommen, ${data.ticket.name}! ${data.ticket.guests} person(er) insläppta.`
            : `Welcome, ${data.ticket.name}! ${data.ticket.guests} guest(s) successfully admitted.`
        );
        setRecentAdmissions((prev) => [data.ticket, ...prev.slice(0, 5)]);
      } else {
        alert(data.message || "Failed to check in");
      }
    } catch (err: any) {
      alert("Error checking in ticket: " + err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    setCurrentTicket(null);
    setVerifyStatus("IDLE");
    setStatusMessage("");
    setTicketInput("");
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488]">
              {isSv ? "ENTRÉKONTROLL LIVE" : "GATE ADMISSION LIVE"}
            </span>
          </div>
          <h1 className="font-hanken text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isSv ? "Scanna & Verifiera Biljettpass" : "Gate Admission & QR Scanner"}
          </h1>
          <p className="font-inter text-xs sm:text-sm text-slate-500 mt-1">
            {isSv
              ? "Verifiera deltagares platser i realtid vid kyrkans entré innan insläpp i kyrksalen."
              : "Verify attendee passes in real time at the sanctuary gate before admitting guests to the gathering."}
          </p>
        </div>

        {/* Action Toggle */}
        <div className="flex items-center gap-2">
          {isCameraActive ? (
            <button
              onClick={stopCamera}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3.5 rounded-md flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">videocam_off</span>
              <span>{isSv ? "Stäng Kamera" : "Turn Off Camera"}</span>
            </button>
          ) : (
            <button
              onClick={startCamera}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold py-2 px-3.5 rounded-md flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">photo_camera</span>
              <span>{isSv ? "Aktivera Kamera" : "Activate Camera"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (6 Cols): Input & Camera Scanner */}
        <div className="lg:col-span-6 space-y-6">
          {/* Active Camera Video Preview */}
          {isCameraActive && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border-2 border-[#0D9488] shadow-md flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Overlay Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-52 h-52 border-2 border-[#2DD4BF] rounded-lg shadow-lg relative animate-pulse">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded text-white text-[11px] font-medium">
                {isSv ? "Rikta kameran mot deltagarens QR-kod" : "Point camera at attendee QR code"}
              </div>
            </div>
          )}

          {/* Manual Code Entry Form */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label
                htmlFor="ticket-input"
                className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5"
              >
                {isSv ? "Skriv in eller scanna biljettkod" : "Enter or Scan Pass Code"}
              </label>
              <div className="flex gap-2">
                <input
                  id="ticket-input"
                  type="text"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleVerify();
                    }
                  }}
                  placeholder="e.g. HSW26-NAV-0418"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2.5 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
                />
                <button
                  onClick={() => handleVerify()}
                  disabled={isVerifying || !ticketInput.trim()}
                  className="bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-4 rounded-md shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                  <span>{isVerifying ? (isSv ? "Söker..." : "Verifying...") : (isSv ? "Verifiera" : "Verify Pass")}</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Pre-sets for Testing */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                {isSv ? "Snabbtesta förbokade biljetter:" : "Quick test sample passes:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {["HSW26-NAV-0418", "HSW26-NAV-1092", "HSW26-BAL-2301", "HSW26-NAV-3450"].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setTicketInput(code);
                      handleVerify(code);
                    }}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 hover:bg-[#F0FDFA] hover:text-[#0D9488] border border-slate-200 text-slate-700 transition-colors"
                  >
                    #{code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 Cols): Verification Result Display */}
        <div className="lg:col-span-6">
          {verifyStatus === "IDLE" && (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center flex flex-col items-center justify-center min-h-[340px]">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
              </div>
              <h3 className="font-hanken text-lg font-bold text-slate-700">
                {isSv ? "Väntar på pass..." : "Awaiting Attendee Scan"}
              </h3>
              <p className="font-inter text-xs text-slate-500 max-w-sm mt-1">
                {isSv
                  ? "Scanna deltagarens QR-kod med kameran eller skriv in passkoden för att kontrollera anmälan."
                  : "Scan the guest's digital pass QR code with your camera or enter their pass code to verify reservation."}
              </p>
            </div>
          )}

          {/* State: VALID (Ready for Admission) */}
          {verifyStatus === "VALID" && currentTicket && (
            <div className="bg-white rounded-xl border-2 border-[#0D9488] shadow-md overflow-hidden">
              <div className="bg-[#0D9488] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                  <span className="font-hanken font-bold text-base tracking-wide">
                    {isSv ? "GILTIG BILJETT • GODKÄND FÖR INSLÄPP" : "VALID PASS • READY FOR ADMISSION"}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded">
                  #{currentTicket.id}
                </span>
              </div>

              <div className="p-6 space-y-6">
                {/* Attendee Name & Seat Highlight */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isSv ? "Deltagare" : "Attendee"}
                    </span>
                    <h2 className="font-hanken text-2xl font-bold text-slate-900 mt-0.5">
                      {currentTicket.name}
                    </h2>
                    <p className="text-xs text-slate-500">{currentTicket.email}</p>
                    {currentTicket.church && (
                      <span className="inline-block mt-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {currentTicket.church}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {isSv ? "Platser" : "Reserved Seats"}
                    </span>
                    <span className="text-2xl font-bold text-[#0D9488] font-hanken">
                      {currentTicket.guests}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {currentTicket.guests > 1 ? (isSv ? "Personer" : "Guests") : (isSv ? "Person" : "Guest")}
                    </span>
                  </div>
                </div>

                {/* Event & Sanctuary Specs */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      {isSv ? "Samling" : "Gathering"}
                    </span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      {currentTicket.eventTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      {isSv ? "Sittplats / Sektion" : "Seating Section"}
                    </span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      {currentTicket.hall}
                    </span>
                  </div>
                </div>

                {/* Big Admission Action Button */}
                <div className="pt-2">
                  <button
                    onClick={handleCheckIn}
                    disabled={isVerifying}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">how_to_reg</span>
                    <span>
                      {isSv
                        ? `SLÄPP IN DELTAGARE (${currentTicket.guests} PERS)`
                        : `ADMIT ATTENDEE (${currentTicket.guests} SEATS)`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* State: CHECKED IN NOW (Success Flash) */}
          {verifyStatus === "CHECKED_IN_NOW" && currentTicket && (
            <div className="bg-white rounded-xl border-2 border-emerald-500 shadow-md p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                  {isSv ? "INSLÄPP BEKRÄFTAT" : "ADMISSION RECORDED"}
                </span>
                <h3 className="font-hanken text-2xl font-bold text-slate-900 mt-1">
                  {isSv ? `Välkommen in, ${currentTicket.name}!` : `Welcome, ${currentTicket.name}!`}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {currentTicket.guests} {currentTicket.guests > 1 ? "platser insläppta" : "plats insläppt"} • {currentTicket.hall}
                </p>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-md transition-colors cursor-pointer"
                >
                  {isSv ? "Scanna Nästa Deltagare →" : "Scan Next Attendee →"}
                </button>
              </div>
            </div>
          )}

          {/* State: ALREADY CHECKED IN (Duplicate Warning) */}
          {verifyStatus === "ALREADY_CHECKED_IN" && currentTicket && (
            <div className="bg-white rounded-xl border-2 border-amber-400 shadow-md overflow-hidden">
              <div className="bg-amber-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">warning</span>
                  <span className="font-hanken font-bold text-base tracking-wide">
                    {isSv ? "REDAN INSLÄPPT" : "ALREADY ADMITTED"}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded">
                  #{currentTicket.id}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800">
                  {statusMessage}
                </div>

                <div className="border-t border-slate-100 pt-3 text-xs space-y-1">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Pass Holder:</span>{" "}
                    <strong className="text-slate-900">{currentTicket.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Seats:</span>{" "}
                    <span>{currentTicket.guests}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-md transition-colors cursor-pointer"
                >
                  {isSv ? "Scanna Nästa Gäst" : "Scan Next Guest"}
                </button>
              </div>
            </div>
          )}

          {/* State: NOT FOUND */}
          {verifyStatus === "NOT_FOUND" && (
            <div className="bg-white rounded-xl border-2 border-red-400 shadow-md p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">cancel</span>
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest block">
                  {isSv ? "OGILTIG ELLER SAKNAS" : "NOT REGISTERED"}
                </span>
                <p className="font-inter text-xs text-slate-600 mt-2">
                  {statusMessage}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-md transition-colors cursor-pointer"
              >
                {isSv ? "Försök Igen" : "Try Again"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Stream: Recent Gate Admissions */}
      {recentAdmissions.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-hanken text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0D9488] text-base">history</span>
              <span>{isSv ? "Senast Insläppta Deltagare (Entré B)" : "Recent Gate Admissions (Entrance B)"}</span>
            </h3>
            <span className="text-xs text-slate-400">{recentAdmissions.length} logged</span>
          </div>

          <div className="divide-y divide-slate-100">
            {recentAdmissions.map((adm) => (
              <div key={adm.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500 font-semibold">#{adm.id}</span>
                  <span className="font-semibold text-slate-900">{adm.name}</span>
                  <span className="text-slate-400">({adm.guests} {adm.guests > 1 ? "seats" : "seat"})</span>
                </div>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check</span>
                  <span>Admitted</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GateScannerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500 text-xs">Loading Gate Scanner...</div>}>
      <GateScannerContent />
    </Suspense>
  );
}
