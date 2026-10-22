import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface EventRowCardProps {
  id?: string;
  title: string;
  category: string;
  categoryDotColor?: string;
  status?: "REGISTRATION_OPEN" | "YET_TO_COME";
  dateBadge: {
    day: string;
    month: string;
    weekday: string;
  };
  timeString: string;
  location: string;
  imageUrl: string;
  imageAlt?: string;
  href: string;
}

import { useLanguage } from "@/context/LanguageContext";

export const EventRowCard: React.FC<EventRowCardProps> = ({
  title,
  category,
  categoryDotColor = "#0D9488",
  status = "REGISTRATION_OPEN",
  dateBadge,
  timeString,
  location,
  imageUrl,
  imageAlt,
  href,
}) => {
  const { isSv } = useLanguage();

  return (
    <Link
      href={href}
      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-7 p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl bg-[#F7FAFC] hover:bg-white border border-slate-200/80 hover:border-[#0D9488]/40 shadow-xs hover:shadow-md transition-all duration-200 text-left no-underline w-full cursor-pointer"
    >
      {/* Left Core: Thumbnail + Date + Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
        {/* 1. Square Thumbnail Image (Morrow Church 110x110 desktop / 88x88 mobile) */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 rounded-md sm:rounded-lg overflow-hidden bg-slate-900 border border-slate-200/60 shadow-xs">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 80px, 112px"
          />
        </div>

        {/* 2. Date Column (Morrow Church Date Block) */}
        <div className="flex flex-col shrink-0 sm:w-36 md:w-44">
          <time className="font-hanken font-bold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
            {dateBadge.month} {dateBadge.day}
          </time>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-inter mt-1">
            <span className="font-medium text-slate-700">{dateBadge.weekday}</span>
            <span>·</span>
            <span className="truncate">{timeString}</span>
          </div>
        </div>

        {/* 3. Event Body: Tag + Title + Location */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          {/* Tags Row: Category Tag + Status Badge */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Tag with Indicator Dot */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-200/70 text-slate-800 border border-slate-300/50 text-[11px] font-semibold w-fit">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: categoryDotColor }}
              />
              <span className="truncate">{category}</span>
            </div>

            {/* Event Status Indicator */}
            {status === "YET_TO_COME" ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold tracking-wide">
                <span className="material-symbols-outlined text-[13px] text-amber-600">schedule</span>
                <span>{isSv ? "Kommande · Släpps snart" : "Yet to Come · Announcement Soon"}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>{isSv ? "Säkra din plats" : "Registration Open"}</span>
              </span>
            )}
          </div>

          {/* Event Title */}
          <h3 className="font-hanken font-bold text-lg sm:text-xl md:text-2xl text-slate-900 tracking-tight group-hover:text-[#0D9488] transition-colors leading-snug">
            {title}
          </h3>

          {/* Location */}
          <p className="font-inter text-xs sm:text-sm text-slate-500 truncate">
            {location}
          </p>
        </div>
      </div>

      {/* Right Core: Trailing Action (Morrow Church Style) */}
      <div className="shrink-0 self-start sm:self-end md:self-center pt-2 sm:pt-0">
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-slate-300/80 bg-white text-slate-800 text-xs sm:text-sm font-semibold font-inter group-hover:border-[#0D9488] group-hover:text-[#0D9488] group-hover:bg-[#F0FDFA] transition-all shadow-xs">
          <span>
            {status === "YET_TO_COME"
              ? (isSv ? "Kommande Samling" : "Yet to Come")
              : (isSv ? "Boka Plats" : "Save your spot")}
          </span>
          <span className="material-symbols-outlined text-[17px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
};
