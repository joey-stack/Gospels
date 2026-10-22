"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const GlobalFooter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full px-2.5 sm:px-5 pb-2.5 sm:pb-5 pt-0 bg-[#F8F9FF]">
      {/* Morrow Church Style Elevated Footer Card */}
      <div className="w-full rounded-lg md:rounded-xl bg-[#0A1530] text-white overflow-hidden pt-14 sm:pt-16 md:pt-20 px-6 sm:px-12 md:px-16 shadow-xl border border-slate-800 flex flex-col justify-between">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 sm:pb-16">
          {/* Left: Brand Identity & Monthly Note Subscription (Morrow Church Layout) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="GOSPELS Göteborg">
              <Image
                src="/brand/gospels-logo-white.png"
                alt="GOSPELS Göteborg"
                width={160}
                height={55}
                className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>

            <div className="space-y-2">
              <h3 className="font-hanken font-bold text-lg text-white">
                A short note every month.
              </h3>
              <p className="font-inter text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                Gospel praise night dates, choir rehearsal schedules, vocal masterclasses, and prayer updates across Gothenburg. In one concise email, nothing else.
              </p>
            </div>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-[#14224A] border border-white/15 rounded-md px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#2DD4BF] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-md bg-[#2DD4BF] text-slate-950 font-inter text-xs sm:text-sm font-semibold hover:bg-[#14B8A6] transition-colors cursor-pointer shadow-xs shrink-0 text-center"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            <span className="font-inter text-[11px] text-slate-400">
              Unsubscribe anytime. See our privacy terms.
            </span>
          </div>

          {/* Right: 3 Navigation Columns (Morrow Church Style) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-2 lg:pt-0">
            {/* Column 1: Gathering Hubs */}
            <div className="space-y-3 font-inter">
              <h4 className="font-hanken font-bold text-sm tracking-wide text-white uppercase">
                Worship Hubs
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="font-medium text-white">Smyrna Frihamnen</li>
                <li className="text-slate-400">Frihamnsgatan 20</li>
                <li className="font-medium text-white pt-1">Gustav Adolfs Torg</li>
                <li className="text-slate-400">Central Public Square</li>
                <li className="font-medium text-white pt-1">Vasakyrkan</li>
                <li className="text-slate-400">Centrum, Göteborg</li>
              </ul>
            </div>

            {/* Column 2: Explore Navigation */}
            <div className="space-y-3 font-inter">
              <h4 className="font-hanken font-bold text-sm tracking-wide text-white uppercase">
                Explore
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/about" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    About Gospels
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    Events Archive
                  </Link>
                </li>
                <li>
                  <Link href="/events/holy-spirit-worship" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    Holy Spirit Worship
                  </Link>
                </li>
                <li>
                  <Link href="/watch" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    Watch &amp; Listen
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    Partner Churches
                  </Link>
                </li>
                <li>
                  <Link href="/prayer" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    Need Prayer?
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Connect & Stewardship */}
            <div className="space-y-3 font-inter">
              <h4 className="font-hanken font-bold text-sm tracking-wide text-white uppercase">
                Connect
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-[#2DD4BF] transition-colors inline-flex items-center gap-1.5">
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-[#2DD4BF] transition-colors inline-flex items-center gap-1.5">
                    <span>YouTube</span>
                  </a>
                </li>
                <li>
                  <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-[#2DD4BF] transition-colors inline-flex items-center gap-1.5">
                    <span>Podcast</span>
                  </a>
                </li>
                <li>
                  <Link href="/give" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
                    Kingdom Giving
                  </Link>
                </li>
                <li className="pt-1 text-[#2DD4BF] font-medium text-xs">
                  Swish: 123 456 78 90
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="border-t border-white/10 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-inter">
          <div className="flex items-center gap-2">
            <span>© 2026 GOSPELS Gothenburg Ministry. Non-profit Christian fellowship.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/#prayer" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span className="text-slate-600">·</span>
            <Link href="/give" className="hover:text-white transition-colors">
              Giving Terms
            </Link>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Frihamnen · Göteborg</span>
          </div>
        </div>

        {/* Giant Bottom Wordmark matching Morrow Church ("GOSPELS" in bold, not italic) */}
        <div className="w-full flex items-center justify-center pt-4 sm:pt-6 pb-1 sm:pb-3 select-none pointer-events-none">
          <span className="font-hanken font-bold text-[11.5vw] sm:text-[12.8vw] md:text-[13.8vw] lg:text-[14.2vw] leading-none tracking-tight uppercase text-[#CADCF6] text-center block w-full whitespace-nowrap select-none">
            GOSPELS
          </span>
        </div>
      </div>
    </footer>
  );
};
