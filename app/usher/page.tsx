"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import jsQR from "jsqr";
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Users,
  ShieldCheck,
  DoorOpen,
  RefreshCw,
  LogOut,
  Camera,
  Flashlight,
  Sparkles,
} from "lucide-react";
import { TicketPass } from "@/lib/rsvpStore";

// Web Audio API success chime
function playChime(success = true) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";

    if (success) {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else {
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.frequency.setValueAtTime(220, ctx.currentTime + 0.12); // A3
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {
    // AudioContext blocked or unsupported
  }
}

export default function UsherAttendancePortal() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Gate / Attendance State
  const [selectedGate, setSelectedGate] = useState("Entrance B (West Narthex)");
  const [tickets, setTickets] = useState<TicketPass[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Camera Scanner State
  const [scannerOpen, setScannerOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [manualCode, setManualCode] = useState("");

  // Verification Result Modal
  const [scanResult, setScanResult] = useState<{
    status: "SUCCESS" | "ALREADY_CHECKED_IN" | "NOT_FOUND" | "ERROR";
    message: string;
    ticket?: TicketPass;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isProcessingRef = useRef(false);

  // Check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("gospels_usher_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch registered tickets from InsForge DB / API
  const fetchRoster = useCallback(async () => {
    setIsLoadingTickets(true);
    try {
      const res = await fetch("/api/admin/tickets");
      const data = await res.json();
      if (data.success && Array.isArray(data.tickets)) {
        setTickets(data.tickets);
      }
    } catch (err) {
      console.warn("Failed to fetch tickets roster:", err);
    } finally {
      setIsLoadingTickets(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRoster();
    }
  }, [isAuthenticated, fetchRoster]);

  // Handle PIN Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Steward Gate PIN: 7777 (or any 4+ char password)
    if (pinInput.trim() === "7777" || pinInput.trim().toLowerCase() === "gospels") {
      setIsAuthenticated(true);
      sessionStorage.setItem("gospels_usher_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Gate Access PIN. Please enter steward PIN (7777).");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gospels_usher_auth");
    setIsAuthenticated(false);
    stopScanner();
  };

  // Process Scanned Pass Payload
  const processPassCode = async (rawString: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    let ticketId = rawString.trim();
    let queryParams: URLSearchParams | null = null;

    // Handle full verification URLs e.g. https://domain.com/pass/HSW26-NAV-0418?name=...
    if (ticketId.includes("/pass/") || ticketId.includes("/verify/")) {
      try {
        const url = new URL(ticketId);
        queryParams = url.searchParams;
        const parts = url.pathname.split("/");
        ticketId = parts[parts.length - 1] || ticketId;
      } catch {
        const match = ticketId.match(/\/(?:pass|verify)\/([A-Za-z0-9_-]+)/);
        if (match) ticketId = match[1];
      }
    } else if (ticketId.includes("ticket=")) {
      try {
        const url = new URL(ticketId);
        queryParams = url.searchParams;
        ticketId = url.searchParams.get("ticket") || ticketId;
      } catch {
        const match = ticketId.match(/ticket=([A-Za-z0-9_-]+)/);
        if (match) ticketId = match[1];
      }
    }

    ticketId = ticketId.replace(/^#/, "").toUpperCase();

    // Reconstruct ticket object if params exist
    let fallbackTicket: TicketPass | undefined;
    if (queryParams && queryParams.get("name")) {
      fallbackTicket = {
        id: ticketId,
        eventId: "holy-spirit-worship-2026",
        eventTitle: "Gothenburg Worship Night",
        eventSubtitle: "Night of Adoration & Gospel Praise",
        dateString: "Datum meddelas inom kort",
        timeString: "Tid meddelas inom kort",
        venueName: "Göteborg (Plats meddelas)",
        venueAddress: "Göteborg, Sverige",
        hall: "Sanctuary Floor - Central Nave",
        name: queryParams.get("name") || "Registered Attendee",
        email: queryParams.get("email") || "attendee@gospels.se",
        guests: parseInt(queryParams.get("guests") || "1", 10),
        church: queryParams.get("church") || "Gothenburg Hub",
        checkedIn: true,
        checkedInAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
    }

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId,
          action: "checkin",
          ticket: fallbackTicket,
        }),
      });

      const data = await res.json();

      if (data.status === "ALREADY_CHECKED_IN") {
        playChime(false);
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        setScanResult({
          status: "ALREADY_CHECKED_IN",
          message: data.message || "This pass was already admitted at the entrance.",
          ticket: data.ticket,
        });
      } else if (data.success && data.ticket) {
        playChime(true);
        if (navigator.vibrate) navigator.vibrate(120);
        setScanResult({
          status: "SUCCESS",
          message: `Admitted at ${selectedGate}!`,
          ticket: data.ticket,
        });
        // Update local roster list immediately
        setTickets((prev) => {
          const idx = prev.findIndex((t) => t.id === data.ticket.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = data.ticket;
            return next;
          }
          return [data.ticket, ...prev];
        });
      } else {
        playChime(false);
        setScanResult({
          status: "NOT_FOUND",
          message: `Ticket #${ticketId} not found in registered attendee roster.`,
        });
      }
    } catch {
      setScanResult({
        status: "ERROR",
        message: "Network error validating ticket. Please retry.",
      });
    } finally {
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 1500);
    }
  };

  // Start Camera Stream
  const startScanner = async () => {
    setScannerOpen(true);
    setCameraError(null);
    setScanResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        requestAnimationFrame(tickScan);
      }
    } catch (err: any) {
      console.warn("Camera start failed:", err);
      setCameraActive(false);
      setCameraError(
        "Camera permission denied or camera unavailable. You can enter or paste the pass code below."
      );
    }
  };

  // Continuous Frame Scanner Loop
  const tickScan = () => {
    if (!videoRef.current || !streamRef.current) return;

    const video = videoRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA && !isProcessingRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code && code.data) {
          processPassCode(code.data);
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(tickScan);
  };

  // Stop Camera
  const stopScanner = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setScannerOpen(false);
    setScanResult(null);
  };

  // Toggle Torch / Flashlight
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track && (track.getCapabilities() as any)?.torch) {
      try {
        await (track as any).applyConstraints({
          advanced: [{ torch: !torchOn }],
        });
        setTorchOn(!torchOn);
      } catch {
        // Torch not supported
      }
    }
  };

  // Toggle check-in from roster row
  const handleToggleAttendee = async (ticket: TicketPass) => {
    const action = ticket.checkedIn ? "undo" : "checkin";
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: ticket.id, action, ticket }),
      });
      const data = await res.json();
      if (data.success && data.ticket) {
        setTickets((prev) =>
          prev.map((t) => (t.id === ticket.id ? data.ticket : t))
        );
      }
    } catch {
      alert("Network error updating admission status.");
    }
  };

  // KPI Calculations
  const totalRegisteredSeats = tickets.reduce((acc, t) => acc + (t.guests || 1), 0);
  const totalAdmittedSeats = tickets
    .filter((t) => t.checkedIn)
    .reduce((acc, t) => acc + (t.guests || 1), 0);
  const remainingSeats = Math.max(0, totalRegisteredSeats - totalAdmittedSeats);
  const capacityPct =
    totalRegisteredSeats > 0
      ? Math.round((totalAdmittedSeats / totalRegisteredSeats) * 100)
      : 0;

  // Filtered Roster
  const filteredTickets = tickets.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      (t.church && t.church.toLowerCase().includes(q))
    );
  });

  // -------------------------------------------------------------
  // VIEW: 1. PIN LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-center items-center px-4 font-inter">
        <div className="w-full max-w-sm bg-slate-900/80 border border-slate-700/80 rounded-2xl p-7 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/brand/gospels-logo-color.png"
                alt="Gospels Gothenburg"
                width={160}
                height={50}
                className="h-10 w-auto object-contain mx-auto"
                priority
              />
            </Link>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0D9488]/20 border border-[#2DD4BF]/30 text-[#2DD4BF] text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Usher Gate Portal</span>
            </div>
            <h1 className="font-hanken text-xl font-bold mt-3 text-white">
              Entrance Gatekeeper Login
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Official live pass scanner &amp; attendance recording app
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Steward Gate PIN
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. 7777)"
                className="w-full text-center text-xl tracking-[0.3em] py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#2DD4BF] transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 text-center font-medium">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-sm transition-all shadow-lg shadow-teal-900/30 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <DoorOpen className="w-4 h-4" />
              <span>Unlock Gate Scanner</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-500">
              Default Event Day PIN is <strong className="text-slate-300">7777</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: 2. USHER ATTENDANCE DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F0FDFA]/60 text-[#0F172A] font-inter pb-16">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-xs px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="hover:opacity-90">
            <Image
              src="/brand/gospels-logo-color.png"
              alt="Gospels"
              width={110}
              height={34}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <span className="text-[11px] font-extrabold text-[#0D9488] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            Usher Gate
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchRoster}
            title="Refresh database"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingTickets ? "animate-spin text-[#0D9488]" : ""}`} />
          </button>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-5">
        {/* Gate Selection Dropdown */}
        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <DoorOpen className="w-4 h-4 text-[#0D9488]" />
            <span>Active Station:</span>
          </div>
          <select
            value={selectedGate}
            onChange={(e) => setSelectedGate(e.target.value)}
            className="text-xs font-semibold bg-teal-50 border border-teal-200 text-[#0D9488] rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="Entrance B (West Narthex)">Entrance B (West Narthex)</option>
            <option value="Entrance A (Main Nave)">Entrance A (Main Nave)</option>
            <option value="Entrance C (East Gallery)">Entrance C (East Gallery)</option>
            <option value="Balcony Gallery Floor">Balcony Gallery Floor</option>
          </select>
        </div>

        {/* Live Attendance Metrics Card */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#0A1530] text-white p-5 rounded-2xl shadow-xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2DD4BF]">
                  Holy Spirit Worship 2026
                </span>
                <h2 className="text-lg font-hanken font-bold text-white mt-0.5">
                  Live Attendance Check-In
                </h2>
              </div>
              <div className="text-right">
                <span className="text-2xl font-hanken font-extrabold text-[#2DD4BF]">
                  {capacityPct}%
                </span>
                <span className="block text-[10px] text-slate-400">Admitted</span>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, capacityPct)}%` }}
              />
            </div>

            {/* 3 Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total</span>
                <span className="text-lg font-hanken font-extrabold text-white">
                  {totalRegisteredSeats}
                </span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5">
                <span className="text-[10px] text-emerald-300 block uppercase font-bold">In</span>
                <span className="text-lg font-hanken font-extrabold text-emerald-400">
                  {totalAdmittedSeats}
                </span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5">
                <span className="text-[10px] text-amber-300 block uppercase font-bold">Expected</span>
                <span className="text-lg font-hanken font-extrabold text-amber-400">
                  {remainingSeats}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTION BUTTON: TAKE ATTENDANCE / SCAN PASS */}
        <button
          onClick={startScanner}
          className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:from-[#0F766E] hover:to-[#0D9488] text-white font-extrabold text-base shadow-xl shadow-teal-900/20 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <span className="block text-base leading-tight font-hanken font-bold">
              Take Attendance / Scan Pass
            </span>
            <span className="block text-xs text-teal-100 font-normal">
              Opens phone camera to scan attendee QR pass
            </span>
          </div>
        </button>

        {/* Search Roster Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-hanken text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#0D9488]" />
              <span>Attendee Roster ({filteredTickets.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Live InsForge Database</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attendee by name, email, or #HSW26-..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0D9488] transition-colors"
            />
          </div>

          {/* Attendee Roster List */}
          <div className="space-y-2">
            {filteredTickets.map((t) => (
              <div
                key={t.id}
                className={`p-3.5 rounded-xl bg-white border transition-all flex items-center justify-between gap-3 shadow-2xs ${
                  t.checkedIn
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-slate-200 hover:border-teal-200"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 truncate">
                      {t.name}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      #{t.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{t.guests} {t.guests > 1 ? "Seats" : "Seat"}</span>
                    <span>•</span>
                    <span className="truncate">{t.church || "Fellowship"}</span>
                  </div>
                </div>

                {/* Admission Toggle Button */}
                <button
                  onClick={() => handleToggleAttendee(t)}
                  className={`px-3 py-2 rounded-lg font-bold text-xs shrink-0 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    t.checkedIn
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-[#0D9488] text-white hover:bg-[#0F766E]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.checkedIn ? "Admitted" : "Check In"}</span>
                </button>
              </div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                No matching attendees found.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* VIEW: 3. FULL SCREEN CAMERA QR CODE SCANNER MODAL */}
      {/* ------------------------------------------------------------- */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between text-white animate-in fade-in duration-200">
          {/* Top Scanner Bar */}
          <div className="p-4 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-white/10 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Live Gate Scanner
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTorch}
                title="Toggle Flashlight"
                className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                  torchOn ? "bg-amber-400 text-slate-900" : "bg-white/10 text-white"
                }`}
              >
                <Flashlight className="w-4 h-4" />
              </button>
              <button
                onClick={stopScanner}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Stream + Viewfinder Container */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
            />

            {/* Target Box Viewfinder */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-[#2DD4BF]/80 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] pointer-events-none flex flex-col justify-between p-2">
              {/* Corner Indicators */}
              <div className="flex justify-between">
                <span className="w-4 h-4 border-t-4 border-l-4 border-[#2DD4BF] rounded-tl-sm" />
                <span className="w-4 h-4 border-t-4 border-r-4 border-[#2DD4BF] rounded-tr-sm" />
              </div>

              {/* Animated Laser Scan Line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent shadow-[0_0_8px_#2DD4BF] animate-bounce" />

              <div className="flex justify-between">
                <span className="w-4 h-4 border-b-4 border-l-4 border-[#2DD4BF] rounded-bl-sm" />
                <span className="w-4 h-4 border-b-4 border-r-4 border-[#2DD4BF] rounded-br-sm" />
              </div>
            </div>

            {/* Instruction Banner */}
            <div className="absolute bottom-6 inset-x-0 text-center px-4 pointer-events-none">
              <p className="inline-block text-xs font-semibold bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-slate-200">
                Point camera directly at the pass QR code
              </p>
            </div>

            {cameraError && (
              <div className="absolute inset-x-6 bg-red-950/90 border border-red-500/50 p-4 rounded-xl text-center z-10 space-y-2">
                <p className="text-xs text-red-200">{cameraError}</p>
              </div>
            )}
          </div>

          {/* Bottom Manual Code Fallback Input */}
          <div className="p-4 bg-black/70 backdrop-blur-md border-t border-white/10 z-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (manualCode) processPassCode(manualCode);
              }}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Or enter pass code e.g. HSW26-NAV-..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#2DD4BF]"
              />
              <button
                type="submit"
                className="bg-[#0D9488] hover:bg-[#0F766E] px-4 py-2.5 rounded-xl font-bold text-xs text-white cursor-pointer"
              >
                Admit
              </button>
            </form>
          </div>

          {/* Result Card Pop-up Overlay */}
          {scanResult && (
            <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in zoom-in-95 duration-150">
              <div className="w-full max-w-sm bg-white text-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
                <div
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-md ${
                    scanResult.status === "SUCCESS"
                      ? "bg-emerald-100 text-emerald-600"
                      : scanResult.status === "ALREADY_CHECKED_IN"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {scanResult.status === "SUCCESS" && (
                    <CheckCircle2 className="w-9 h-9" />
                  )}
                  {scanResult.status === "ALREADY_CHECKED_IN" && (
                    <AlertCircle className="w-9 h-9" />
                  )}
                  {scanResult.status === "NOT_FOUND" && (
                    <AlertCircle className="w-9 h-9" />
                  )}
                </div>

                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${
                      scanResult.status === "SUCCESS"
                        ? "bg-emerald-50 text-emerald-700"
                        : scanResult.status === "ALREADY_CHECKED_IN"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {scanResult.status === "SUCCESS"
                      ? "✓ Attendee Admitted"
                      : scanResult.status === "ALREADY_CHECKED_IN"
                      ? "Already Checked In"
                      : "Pass Invalid"}
                  </span>

                  {scanResult.ticket ? (
                    <div className="mt-3 space-y-1">
                      <h3 className="font-hanken text-2xl font-extrabold text-slate-900">
                        {scanResult.ticket.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        #{scanResult.ticket.id} • {scanResult.ticket.guests}{" "}
                        {scanResult.ticket.guests > 1 ? "Seats" : "Seat"}
                      </p>
                      <p className="text-xs font-semibold text-[#0D9488]">
                        {scanResult.ticket.hall}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600 mt-2">
                      {scanResult.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setScanResult(null)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
                  >
                    Scan Next Pass
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
