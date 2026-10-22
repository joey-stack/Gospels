"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const AboutStorySection: React.FC = () => {
  const { language } = useLanguage();
  const isSv = language === "sv";

  return (
    <section className="w-full px-2.5 sm:px-5 py-10 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Photo Card (Matching Morrow Church Story Card) */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-lg md:rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900">
            <Image
              src="/assets/whatsapp_image_2026_10_16_at_8.28.06_am_2.png"
              alt="Gospels Gothenburg Choir Rehearsal and Fellowship in Frihamnen"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-5 font-inter">
            <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider block">
              {isSv ? "— VÅR HISTORIA" : "— OUR STORY"}
            </span>

            <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              {isSv
                ? "Från en bönesamling i Frihamnen till lovsång över hela staden."
                : "From a prayer circle in Frihamnen to citywide praise."}
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {isSv
                  ? "I början av 2024 samlades lovsångsledare och körledare från lutherska, pingst- och internationella kyrkor över hela Göteborg för en enkel kväll av bön och körrepetition. Det fanns inga stora program – bara en öppen Bibel, stämmor nedskrivna på servetter och en gemensam längtan efter att se Jesu namn lyftas utan splittring över vår stad."
                  : "In early 2024, worship leaders and choir conductors from Lutheran, Pentecostal, and International churches across Gothenburg gathered for an unscripted evening of prayer and choral rehearsal. There were no grand programs—just an open Bible, harmony parts written on napkins, and a shared hunger to see Jesus lifted without division over our city."}
              </p>
              <p>
                {isSv
                  ? "Framåt hösten hade den samlingen tänt en ekumenisk gemenskap som överbryggade språk och samfundsgränser. Idag samlas över tjugofyra partnerförsamlingar och en 65-rösters masskör i Smyrna Frihamnen, på Gustav Adolfs Torg och i kyrkor över hela Göteborg. Vårt hjärta förblir detsamma: orubblig tillbedjan av Kristus, musikalisk excellens och ständig förbön för varje invånare i Göteborg."
                  : "By autumn, that single gathering had ignited an ecumenical fellowship bridging linguistic and denominational lines. Today, over twenty-four partner assemblies and a 65-voice mass choir gather across Smyrna Frihamnen, Gustav Adolfs Torg, and sanctuaries throughout Gothenburg. Our heartbeat remains unchanged: uncompromised adoration of Christ, choral excellence, and standing in prayer for every citizen of Gothenburg."}
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-t border-slate-200/80">
              <span>{isSv ? "GRUNDAT 2024" : "FOUNDED 2024"}</span>
              <span className="text-slate-300">—</span>
              <span>
                {isSv
                  ? "24 PARTNERFÖRSAMLINGAR I GÖTEBORG"
                  : "24 PARTNER ASSEMBLIES ACROSS GÖTEBORG"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
