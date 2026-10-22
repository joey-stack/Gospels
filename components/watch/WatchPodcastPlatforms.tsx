"use client";

import React from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

export const WatchPodcastPlatforms: React.FC = () => {
  const { isSv } = useLanguage();

  const platforms = [
    {
      name: "Spotify",
      description: isSv
        ? "Hela ljudsessioner och utvalda svenska gospellovsångsspellistor"
        : "Full audio sessions and curated Swedish gospel worship playlists",
      icon: "graphic_eq",
      href: "https://spotify.com",
      badge: isSv ? "Strömma ljud" : "Stream Audio",
    },
    {
      name: "Apple Podcasts",
      description: isSv
        ? "Oavbrutna akustiska körinspelningar och sångmästarklasser"
        : "Uninterrupted acoustic choir recordings and vocal masterclass stems",
      icon: "podcasts",
      href: "https://podcasts.apple.com",
      badge: isSv ? "Prenumerera" : "Subscribe",
    },
    {
      name: "YouTube",
      description: isSv
        ? "4K flerkamerakonserter, repetitionsvideor och sångtexter"
        : "4K multicam worship nights, rehearsal vlogs, and lyric videos",
      icon: "smart_display",
      href: "https://youtube.com",
      badge: isSv ? "Se kanalen" : "Watch Channel",
    },
    {
      name: isSv ? "Swish / Gåva" : "Swish / Giving",
      description: isSv
        ? "Direkt mobilt stöd som finansierar stadsvid ljud- och körproduktion"
        : "Direct Swedish mobile support powering citywide sound production",
      icon: "favorite",
      href: "/give",
      badge: "Swish: 123 456 78 90",
    },
  ];

  return (
    <section className="w-full px-2.5 sm:px-5 py-10 sm:py-14">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#0D9488] text-xs font-semibold tracking-widest uppercase mb-3">
            <span className="w-5 h-[2px] bg-[#0D9488]" />
            <span>{isSv ? "STREAMINGKANALER" : "STREAMING CHANNELS"}</span>
          </div>
          <h2 className="font-hanken text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {isSv
              ? "Gospel från Göteborg, var du än lyssnar."
              : "Gothenburg Gospel, wherever you listen."}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl font-inter">
            {isSv
              ? "Strömma högkvalitativa körinspelningar på din musiktjänst eller följ våra videosändningar."
              : "Stream high-fidelity choir tracks on your preferred music service or subscribe to our video broadcasts."}
          </p>
        </div>

        {/* 4 Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {platforms.map((platform, idx) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              target={platform.href.startsWith("http") ? "_blank" : undefined}
              rel={platform.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group p-6 rounded-lg md:rounded-xl bg-white border border-slate-200/80 hover:border-[#0D9488]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#0D9488]/10 text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">
                    {platform.icon}
                  </span>
                </div>

                <h3 className="font-hanken font-bold text-lg text-slate-900 group-hover:text-[#0D9488] transition-colors">
                  {platform.name}
                </h3>

                <p className="font-inter text-xs text-slate-500 leading-relaxed">
                  {platform.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0D9488]">
                <span>{platform.badge}</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
