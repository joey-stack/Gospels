"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const MobileHomepageView: React.FC = () => {
  return (
    <div className="w-full bg-[#F9FAFB] dark:bg-[#0B132B] px-4 pt-20 pb-12 space-y-6">
      {/* 1. Mobile Hero Block */}
      <section className="space-y-4">
        {/* Gothenburg Location Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F3F1] dark:bg-teal-950/60 border border-[#CDEAE5] dark:border-teal-800 text-[#00685f] dark:text-[#2DD4BF] text-xs font-semibold">
          <span className="material-symbols-outlined text-[15px]">location_on</span>
          <span>Gothenburg, Sweden • Est. 2024</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-hanken font-bold text-4xl text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          One Voice.
          <br />
          One Heart.
          <br />
          <span className="font-eb italic font-normal text-[#00685f] dark:text-[#2DD4BF]">
            All Gothenburg.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="font-inter text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Uniting over 500 gospel voices across West Sweden in sacred fellowship and civic adoration.
        </p>

        {/* Live Praise Video/Photo Card */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 shadow-md border border-slate-200/60 dark:border-slate-800">
          <Image
            src="/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png"
            alt="Gothenburg Worship Night Live Praise"
            fill
            quality={95}
            className="object-cover"
            priority
          />
          {/* Bottom overlay bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white text-[11px] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
              <span>GOTHENBURG WORSHIP NIGHT</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-medium border border-white/20">
              Live Praise
            </span>
          </div>
        </div>

        {/* Dual Hero Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <Link
            href="/events/holy-spirit-worship"
            className="w-full bg-[#00685f] hover:bg-[#0D9488] text-white font-semibold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
            <span>Complimentary RSVP: Holy Spirit 2026</span>
          </Link>

          <a
            href="#events"
            className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm py-3 px-4 rounded-lg border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-500 dark:text-slate-400">
              map
            </span>
            <span>Explore 2027 Torg Gathering</span>
          </a>
        </div>
      </section>

      {/* 2. Fast Mobile Pass Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/80 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00685f] dark:text-[#2DD4BF]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>FAST MOBILE PASS</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
            Saturday 28 Mar 2026
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-hanken font-bold text-lg text-slate-900 dark:text-white">
            Smyrna Frihamnskyrkan
          </h3>
          <span className="font-bold text-sm text-[#00685f] dark:text-[#2DD4BF]">18:30 CET</span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Complimentary Admission • 1,000 Seats Total{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">(78% Reserved)</span>
        </p>

        {/* Progress track */}
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div className="bg-[#00685f] dark:bg-[#2DD4BF] h-full w-[78%] rounded-full" />
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href="/events/holy-spirit-worship"
            className="flex-1 bg-[#00685f] hover:bg-[#0D9488] text-white font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
            <span>Reserve 1-Tap Ticket</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.share) {
                navigator
                  .share({
                    title: "Holy Spirit Worship 2026",
                    url: window.location.origin + "/events/holy-spirit-worship",
                  })
                  .catch(() => {});
              }
            }}
            aria-label="Share Event"
            className="p-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg flex items-center justify-center transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
        </div>
      </div>

      {/* 3. Scripture Quote Callout */}
      <div className="border-l-4 border-[#00685f] dark:border-[#2DD4BF] bg-[#F4F9F8] dark:bg-slate-800/60 p-5 rounded-r-xl shadow-xs relative">
        <p className="font-eb italic text-lg leading-relaxed text-slate-800 dark:text-slate-200 mb-3">
          “Mitt hjärta är frimodigt, o Gud, jag vill sjunga och spela, ja, min själ vill prisa dig.”
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            PSALTAREN 108:1
          </span>
          <span className="material-symbols-outlined text-[#00685f]/40 dark:text-[#2DD4BF]/40 text-xl">
            format_quote
          </span>
        </div>
      </div>

      {/* 4. Gatherings & Nights Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-hanken font-bold text-xl text-slate-900 dark:text-white leading-tight">
              Gatherings &amp; Nights
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Complimentary entry worship fellowship
            </p>
          </div>
          <Link
            href="/events/holy-spirit-worship"
            className="text-xs font-bold text-[#00685f] dark:text-[#2DD4BF] flex items-center gap-0.5 hover:underline"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </div>

        {/* Event Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png"
              alt="Holy Spirit Worship 2026"
              fill
              quality={95}
              className="object-cover"
            />
            {/* Date Badge */}
            <div className="absolute top-3 left-3 bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden text-center w-12 border border-slate-100 dark:border-slate-800">
              <div className="bg-[#00685f] text-white text-[9px] font-bold uppercase py-0.5">
                MAR
              </div>
              <div className="text-slate-900 dark:text-white font-bold text-base py-1 leading-none">
                28
              </div>
            </div>
            {/* Fika Badge */}
            <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm text-[10px] font-semibold text-slate-800 dark:text-slate-200">
              Fika Included
            </div>
          </div>

          <div className="p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f] dark:text-[#2DD4BF]">
              MASS CHOIR &amp; STRINGS
            </span>
            <h3 className="font-hanken font-bold text-base text-slate-900 dark:text-white leading-tight">
              Holy Spirit Worship 2026
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              Frihamnen&apos;s grand hall reverberates with sacred harmonies led by 12 Gothenburg worship choirs.
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  schedule
                </span>
                <span>18:30 CET</span>
              </div>
              <Link
                href="/events/holy-spirit-worship"
                className="font-bold text-[#00685f] dark:text-[#2DD4BF] hover:underline"
              >
                Complimentary RSVP
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ministry Services 2x2 Grid */}
      <section className="space-y-3">
        <div>
          <h2 className="font-hanken font-bold text-xl text-slate-900 dark:text-white leading-tight">
            Ministry Services
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Community links and kingdom actions
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Need Prayer? */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative w-10 h-10 rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                <Image
                  src="/assets/whatsapp_image_2026_10_16_at_8.28.06_am_2.png"
                  alt="Prayer Intercession"
                  fill
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#00685f]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-base">
                    volunteer_activism
                  </span>
                </div>
              </div>
              <h3 className="font-hanken font-bold text-sm text-slate-900 dark:text-white">
                Need Prayer?
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                Direct confidential pastoral intercession.
              </p>
            </div>
            <a
              href="#prayer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#00685f] dark:text-[#2DD4BF] mt-3 hover:underline"
            >
              <span>Submit request</span>
              <span className="text-xs">↗</span>
            </a>
          </div>

          {/* Card 2: Swish Offering */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#00685f] dark:text-[#2DD4BF] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl">volunteer_activism</span>
              </div>
              <h3 className="font-hanken font-bold text-sm text-slate-900 dark:text-white">
                Swish Offering
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                Support citywide worship nights.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#00685f] dark:text-[#2DD4BF]">
              <span>123 456 78 90</span>
              <span className="text-[11px]">📲</span>
            </div>
          </div>

          {/* Card 3: Watch & Listen */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl">play_circle</span>
              </div>
              <h3 className="font-hanken font-bold text-sm text-slate-900 dark:text-white">
                Watch &amp; Listen
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                Multi-tracks and concert replays in HD.
              </p>
            </div>
            <a
              href="#watch"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#00685f] dark:text-[#2DD4BF] mt-3 hover:underline"
            >
              <span>Listen now</span>
              <span className="text-xs">→</span>
            </a>
          </div>

          {/* Card 4: Choir Auditions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl">group_add</span>
              </div>
              <h3 className="font-hanken font-bold text-sm text-slate-900 dark:text-white">
                Choir Auditions
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                Join Magnus K. &amp; the 500-voice mass choir.
              </p>
            </div>
            <a
              href="#events"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#00685f] dark:text-[#2DD4BF] mt-3 hover:underline"
            >
              <span>Sign up</span>
              <span className="text-xs">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Partner Sanctuaries Banner */}
      <div className="bg-[#EEF2FF] dark:bg-slate-800/80 border border-[#E0E7FF] dark:border-slate-700 rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 text-[#00685f] dark:text-[#2DD4BF] flex items-center justify-center shadow-xs shrink-0">
            <span className="material-symbols-outlined text-lg">church</span>
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
              Partner Sanctuaries
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
              Smyrna • Betlehemskyrkan • Saron • Korskyrkan
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400 text-lg">verified</span>
      </div>
    </div>
  );
};
