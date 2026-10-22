"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  User,
  Search,
  ExternalLink,
  Navigation,
  Map as MapIcon,
  LayoutGrid,
  CheckCircle2,
  ChevronRight,
  Info,
} from "lucide-react";

export interface ChurchPartner {
  id: string;
  name: string;
  swedishName?: string;
  tradition: string;
  languages: string;
  gatheringTime: string;
  serviceDay: string;
  address: string;
  district: string;
  pastor: string;
  ministryRole: string;
  tags: string[];
  websiteUrl: string;
  mapsUrl: string;
  imageUrl: string;
  logoUrl?: string;
  featured?: boolean;
  mapCoordinates: {
    top: string;
    left: string;
  };
}

export const CHURCH_PARTNERS: ChurchPartner[] = [
  {
    id: "smyrna",
    name: "Smyrna Frihamnskyrkan",
    swedishName: "Smyrnakyrkan Göteborg",
    tradition: "Evangelical · Pingst",
    languages: "Swedish & English",
    gatheringTime: "11:00 & 18:00",
    serviceDay: "SUN",
    address: "Frihamnsgatan 20, 417 55 Göteborg",
    district: "Frihamnen & Hisingen",
    pastor: "Pastor Tomas Sjödin & Pastoral Team",
    ministryRole:
      "Host venue for Holy Spirit Worship 2026, anchoring a collaborative 65-voice choir partnership and regional music director workshops.",
    tags: ["Youth Choir", "Intercessory Prayer", "Accessible Sanctuary", "65-Voice Mass Choir"],
    websiteUrl: "https://smyrna.se",
    mapsUrl: "https://maps.google.com/?q=Frihamnsgatan+20+Goteborg",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.26.13_am.png",
    logoUrl: "/logos/smyrna.png",
    featured: true,
    mapCoordinates: { top: "28%", left: "45%" },
  },
  {
    id: "rccg",
    name: "RCCG Jesus Connection",
    tradition: "International · Pentecostal",
    languages: "English & Yoruba",
    gatheringTime: "10:30 & Wed 18:30",
    serviceDay: "SUN",
    address: "Gamlestadsvägen 2, 415 02 Göteborg",
    district: "Västra Frölunda",
    pastor: "Pastor Adeola Bello & Leadership Team",
    ministryRole:
      "African and Caribbean gospel praise lead, supplying foundational live rhythm section musicians and vibrant mass choir section leaders.",
    tags: ["Mass Choir", "Community Outreach", "Bilingual", "Live Rhythm Section"],
    websiteUrl: "https://rccg.se",
    mapsUrl: "https://maps.google.com/?q=Gamlestadsvagen+2+Goteborg",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png",
    logoUrl: "/logos/rccg.png",
    featured: true,
    mapCoordinates: { top: "75%", left: "24%" },
  },
  {
    id: "goteborgskyrkan",
    name: "Göteborg Church",
    swedishName: "Göteborgskyrkan Centrum",
    tradition: "Independent · Ecumenical",
    languages: "Swedish",
    gatheringTime: "16:00",
    serviceDay: "SUN",
    address: "Drottninggatan 34, 411 14 Göteborg",
    district: "Centrum & Haga",
    pastor: "Rev. Jonas Lindqvist",
    ministryRole:
      "City center prayer vigils and Lovsångskonsert street staging support; university student outreach fellowship coordination.",
    tags: ["Downtown Acoustic", "Student Ministry", "Street Care", "Open Sanctuaries"],
    websiteUrl: "https://goteborgskyrkan.se",
    mapsUrl: "https://maps.google.com/?q=Drottninggatan+34+Goteborg",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png",
    logoUrl: "/logos/svenska-kyrkan.svg",
    mapCoordinates: { top: "52%", left: "62%" },
  },
  {
    id: "fralsningsarmen",
    name: "The Salvation Army",
    swedishName: "Frälsningsarmén Göteborg",
    tradition: "Salvationist · Brass & Choral",
    languages: "Swedish",
    gatheringTime: "10:00",
    serviceDay: "SUN",
    address: "Södra Vägen 42 & Hisingsgatan, Göteborg",
    district: "Centrum & Haga",
    pastor: "Major Kristina Holmberg",
    ministryRole:
      "Full brass accompaniment section for Göteborgs Lovsångskonsert, alongside emergency downtown winter warmth relief and pastoral care.",
    tags: ["Brass Ensemble", "Social Care & Soppkök", "Historic Sanctuary", "Choral Tradition"],
    websiteUrl: "https://fralsningsarmen.se",
    mapsUrl: "https://maps.google.com/?q=Sodra+Vagen+42+Goteborg",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png",
    logoUrl: "/logos/salvation-army.svg",
    mapCoordinates: { top: "68%", left: "70%" },
  },
  {
    id: "hillsong",
    name: "Hillsong Sweden (Gothenburg)",
    tradition: "Evangelical · Contemporary",
    languages: "Swedish & English",
    gatheringTime: "11:30 & 17:00",
    serviceDay: "SUN",
    address: "Lindholmsallén 34, 417 56 Göteborg",
    district: "Frihamnen & Hisingen",
    pastor: "Campus Pastoral Team",
    ministryRole:
      "Contemporary youth worship production, audio recording engineering, and student vocal masterclasses across university campuses.",
    tags: ["Contemporary Worship", "Audio Production", "Student Vocalists", "Bilingual"],
    websiteUrl: "https://hillsong.se",
    mapsUrl: "https://maps.google.com/?q=Lindholmsallen+34+Goteborg",
    imageUrl: "/assets/WhatsApp_Image_2026-10-16_at_8.28.06_AM.jpeg",
    logoUrl: "/logos/hillsong.png",
    mapCoordinates: { top: "36%", left: "38%" },
  },
  {
    id: "svenska-kyrkan",
    name: "Svenska Kyrkan Domkyrkan",
    swedishName: "Göteborgs Domkyrkopastorat",
    tradition: "Evangelical Lutheran",
    languages: "Swedish",
    gatheringTime: "11:00 Högmässa",
    serviceDay: "SUN",
    address: "Kyrkogatan 28, 411 15 Göteborg",
    district: "Centrum & Haga",
    pastor: "Cathedral Chapter & Dean",
    ministryRole:
      "Cathedral acoustic choir collaboration, classical and sacred gospel choral arrangements, and citywide unity prayer services.",
    tags: ["Cathedral Choir", "Pipe Organ & Gospel", "Sacred Liturgy", "Ecumenical Council"],
    websiteUrl: "https://svenskakyrkan.se/goteborg",
    mapsUrl: "https://maps.google.com/?q=Kyrkogatan+28+Goteborg",
    imageUrl: "/assets/WhatsApp_Image_2026-10-16_at_8.28.07_AM.jpeg",
    logoUrl: "/logos/svenska-kyrkan.svg",
    mapCoordinates: { top: "48%", left: "56%" },
  },
];

const FILTER_OPTIONS = [
  { id: "all", label: "All Fellowships (6)" },
  { id: "Frihamnen & Hisingen", label: "Frihamnen & Hisingen" },
  { id: "Centrum & Haga", label: "Centrum & Haga" },
  { id: "Västra Frölunda", label: "Västra Frölunda" },
  { id: "Swedish", label: "Swedish Speaking" },
  { id: "English", label: "Bilingual / English" },
];

export const PartnersInteractiveDirectory: React.FC = () => {
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChurchId, setActiveChurchId] = useState<string>("smyrna");

  const filteredChurches = useMemo(() => {
    return CHURCH_PARTNERS.filter((church) => {
      // Filter category check
      let matchesCategory = true;
      if (selectedFilter !== "all") {
        if (selectedFilter === "Swedish") {
          matchesCategory = church.languages.toLowerCase().includes("swedish");
        } else if (selectedFilter === "English") {
          matchesCategory = church.languages.toLowerCase().includes("english");
        } else {
          matchesCategory = church.district === selectedFilter;
        }
      }

      // Search query check
      let matchesSearch = true;
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        matchesSearch =
          church.name.toLowerCase().includes(query) ||
          (church.swedishName && church.swedishName.toLowerCase().includes(query)) ||
          church.district.toLowerCase().includes(query) ||
          church.pastor.toLowerCase().includes(query) ||
          church.tradition.toLowerCase().includes(query) ||
          church.tags.some((tag) => tag.toLowerCase().includes(query));
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const activeChurch = useMemo(() => {
    return (
      CHURCH_PARTNERS.find((c) => c.id === activeChurchId) ||
      filteredChurches[0] ||
      CHURCH_PARTNERS[0]
    );
  }, [activeChurchId, filteredChurches]);

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 md:py-16 bg-[#F8F9FF]">
      {/* Search and View Controls Bar */}
      <div className="w-full mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/90 p-2.5 sm:p-3 rounded-lg border border-slate-200/80 shadow-sm">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-md">
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-xs font-semibold font-inter transition-all ${
                viewMode === "map"
                  ? "bg-white text-[#0D9488] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-xs font-semibold font-inter transition-all ${
                viewMode === "grid"
                  ? "bg-white text-[#0D9488] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Directory Grid</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by church name, district, pastor, or language..."
              className="w-full pl-10 pr-4 py-2 text-xs font-inter bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
          {FILTER_OPTIONS.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#0D9488] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAP VIEW CONTENT */}
      {viewMode === "map" && (
        <motion.div
          key="map-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-[580px] sm:h-[640px] rounded-lg overflow-hidden border border-slate-200 shadow-md bg-[#E2E8F0] mb-16"
        >
          {/* Gothenburg Stylized Vector Map & River Canvas */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <svg
              className="w-full h-full text-slate-300"
              viewBox="0 0 1200 650"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Background Tint */}
              <rect width="1200" height="650" fill="#E2E8F0" />

              {/* Göta älv River System */}
              <path
                d="M-50,330 C200,320 380,240 520,270 C660,300 780,210 950,220 C1080,230 1180,180 1250,190"
                stroke="#93C5FD"
                strokeWidth="54"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.55"
              />
              <path
                d="M-50,330 C200,320 380,240 520,270 C660,300 780,210 950,220 C1080,230 1180,180 1250,190"
                stroke="#BAE6FD"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />

              {/* Harbor Basins & Frihamnen Water Inlet */}
              <path d="M470,250 L485,160 L550,170 L535,260 Z" fill="#BAE6FD" opacity="0.75" />
              <path d="M370,270 L360,195 L415,205 L425,265 Z" fill="#BAE6FD" opacity="0.65" />

              {/* Götaälvbron Bridge connection */}
              <line
                x1="525"
                y1="205"
                x2="565"
                y2="330"
                stroke="#64748B"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
              <text x="555" y="270" fill="#475569" fontSize="12" fontWeight="600" fontFamily="sans-serif">
                Götaälvbron
              </text>

              {/* Gothenburg Districts Context Labels */}
              <circle cx="280" cy="430" r="160" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" />
              <text x="210" y="450" fill="#64748B" fontSize="13" fontWeight="700" letterSpacing="0.1em">
                MAJORNA
              </text>
              <text x="430" y="135" fill="#0D9488" fontSize="13" fontWeight="800" letterSpacing="0.1em">
                FRIHAMNEN · SMYRNA
              </text>
              <text x="630" y="365" fill="#64748B" fontSize="13" fontWeight="700" letterSpacing="0.1em">
                CENTRUM / DROTTNINGGATAN
              </text>
              <text x="180" y="535" fill="#64748B" fontSize="13" fontWeight="700" letterSpacing="0.1em">
                VÄSTRA FRÖLUNDA · RCCG
              </text>
              <text x="730" y="440" fill="#64748B" fontSize="13" fontWeight="700" letterSpacing="0.1em">
                HAGA / SÖDRA VÄGEN
              </text>
            </svg>
          </div>

          {/* Top Left Info Badge Overlay */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-md border border-slate-200/90 shadow-sm max-w-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <p className="font-hanken text-xs font-bold text-slate-900">
                  Gothenburg Ecumenical Network
                </p>
                <p className="font-inter text-[11px] text-slate-500">
                  Click any pin to inspect church details &amp; ministry role.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Church Map Pins */}
          {filteredChurches.map((church) => {
            const isSelected = activeChurchId === church.id;
            return (
              <div
                key={church.id}
                style={{ top: church.mapCoordinates.top, left: church.mapCoordinates.left }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onClick={() => setActiveChurchId(church.id)}
              >
                {/* Ping animation when active */}
                {isSelected && (
                  <span className="animate-ping absolute inline-flex h-11 w-11 rounded-full bg-[#0D9488] opacity-35" />
                )}

                <button
                  aria-label={`Select ${church.name}`}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-all transform ${
                    isSelected
                      ? "bg-[#0D9488] text-white scale-110 ring-4 ring-[#0D9488]/20"
                      : "bg-[#0F172A] text-white hover:bg-[#0D9488] hover:scale-105"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </button>

                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-11 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[11px] font-medium py-1 px-2.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-30">
                  {church.name}
                </div>
              </div>
            );
          })}

          {/* Active Church Floating Detail Card (Bottom or Corner) */}
          <AnimatePresence mode="wait">
            {activeChurch && (
              <motion.div
                key={activeChurch.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-white/95 backdrop-blur-md rounded-lg p-5 border border-slate-200/90 shadow-xl"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded">
                      {activeChurch.tradition}
                    </span>
                    <h4 className="font-hanken text-base font-bold text-slate-900 mt-1">
                      {activeChurch.name}
                    </h4>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    {activeChurch.serviceDay} {activeChurch.gatheringTime}
                  </span>
                </div>

                <p className="font-inter text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span>{activeChurch.address}</span>
                </p>

                <p className="font-inter text-xs text-slate-700 bg-[#F1F5F9] p-2.5 rounded border-l-2 border-[#0D9488] mb-3 leading-relaxed">
                  <span className="font-semibold text-slate-900 block text-[11px] mb-0.5">
                    Gospel Ministry Role:
                  </span>
                  {activeChurch.ministryRole}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={activeChurch.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-3 bg-[#0D9488] hover:bg-[#0F766E] text-white text-center text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Visit Church</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={activeChurch.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* DIRECTORY BENTO CARDS GRID */}
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h2 className="font-hanken text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Member Parishes &amp; Assemblies
            </h2>
            <p className="font-inter text-sm text-slate-600 mt-1">
              Gathered in common confession, gospel music leadership, and citywide concert collaboration.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0D9488] bg-[#0D9488]/10 px-3 py-1.5 rounded-md self-start sm:self-auto border border-[#0D9488]/20">
            Showing {filteredChurches.length} Fellowships
          </span>
        </div>

        {filteredChurches.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="font-hanken text-lg font-bold text-slate-800">
              No fellowship matches your query
            </p>
            <p className="font-inter text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedFilter("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-[#0D9488] text-white text-xs font-semibold rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredChurches.map((church) => (
              <div
                key={church.id}
                className="bg-white rounded-lg p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#0D9488]/50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Header Badges Row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="bg-slate-100 text-[#0D9488] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                        {church.tradition}
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded">
                        {church.languages}
                      </span>
                    </div>

                    {/* Date/Service Time Badge */}
                    <div className="flex flex-col items-center justify-center w-12 border border-[#0D9488]/20 rounded overflow-hidden shrink-0 shadow-xs">
                      <div className="bg-[#0D9488] text-white w-full text-center text-[10px] font-bold py-0.5">
                        {church.serviceDay}
                      </div>
                      <div className="bg-slate-50 text-slate-900 w-full text-center text-xs font-bold py-1">
                        {church.gatheringTime.split("&")[0].trim()}
                      </div>
                    </div>
                  </div>

                  {/* Church Headline */}
                  <h3 className="font-hanken text-xl font-bold text-slate-900 mb-2">
                    {church.name}
                  </h3>
                  {church.swedishName && church.swedishName !== church.name && (
                    <p className="font-inter text-xs text-slate-500 -mt-1 mb-3 italic">
                      {church.swedishName}
                    </p>
                  )}

                  {/* Metadata Specs */}
                  <div className="space-y-2 mb-5 font-inter text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                      <span>{church.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                      <span>Services: {church.gatheringTime}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                      <span>{church.pastor}</span>
                    </p>
                  </div>

                  {/* Gospel Ministry Role Box */}
                  <div className="bg-[#F1F5F9] rounded p-3.5 border-l-4 border-[#0D9488] mb-5">
                    <span className="text-[11px] font-bold text-[#0D9488] uppercase block mb-1">
                      Gospel Ministry Role
                    </span>
                    <p className="font-inter text-xs text-slate-800 leading-relaxed">
                      {church.ministryRole}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {church.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <a
                    href={church.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-center text-xs font-semibold rounded transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={church.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
