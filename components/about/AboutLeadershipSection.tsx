"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const LEADERS_EN = [
  {
    name: "Lukas Bergström",
    role: "Executive Director & Worship Pastor",
    bio: "Former classical choral scholar, now coordinating citywide gospel worship nights, public square permits, and ecumenical church relations.",
    image: "/leaders/lukas-bergstrom.jpg",
  },
  {
    name: "Miriam Ndayizeye",
    role: "Mass Choir Director & Vocal Coach",
    bio: "Vocal educator and gospel composer who trains our 65-voice mass choir, arranges four-part harmonies, and leads youth masterclasses.",
    image: "/leaders/miriam-ndayizeye.jpg",
  },
  {
    name: "Elias Lindgren",
    role: "Intercession & Gathering Operations",
    bio: "Leads the weekly Tuesday prayer vigils at Frihamnskyrkan, oversees intercessory teams, and ensures community care runs with excellence.",
    image: "/leaders/elias-lindgren.jpg",
  },
];

const LEADERS_SV = [
  {
    name: "Lukas Bergström",
    role: "Verkställande Ledare & Lovsångspastor",
    bio: "Tidigare klassisk körsångare, samordnar nu stadens gospellovsångskvällar, tillstånd för torgmöten och ekumeniska kyrkorelationer.",
    image: "/leaders/lukas-bergstrom.jpg",
  },
  {
    name: "Miriam Ndayizeye",
    role: "Masskörledare & Röstcoach",
    bio: "Vocal coach och gospelkompositör som tränar vår 65-rösters masskör, arrangerar fyrstämmiga harmonier och leder sångarworkshops för unga.",
    image: "/leaders/miriam-ndayizeye.jpg",
  },
  {
    name: "Elias Lindgren",
    role: "Förbön & Samlingskoordinator",
    bio: "Leder de veckovisa tisdagsbönerna i Frihamnskyrkan, ansvarar för böneteamen och säkerställer omsorg och gemenskap med excellens.",
    image: "/leaders/elias-lindgren.jpg",
  },
];

export const AboutLeadershipSection: React.FC = () => {
  const { language } = useLanguage();
  const isSv = language === "sv";
  const leaders = isSv ? LEADERS_SV : LEADERS_EN;

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 sm:py-20 font-inter border-t border-slate-200/80">
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Header Block */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider block">
            {isSv ? "— LEDARSKAP & MUSIKLEDARE" : "— LEADERSHIP & WORSHIP DIRECTORS"}
          </span>
          <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            {isSv ? "Människorna som tjänar vår stadsgemenskap." : "The people serving our citywide fellowship."}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isSv
              ? "Tre av oss samordnar plattformen dagligen. Allt annat i Gospels Göteborg bärs av hängivna pastorer, musiker och volontärer från våra partnerkyrkor."
              : "Three of us coordinate the platform daily. Everything else at Gospels Gothenburg runs on devoted pastors, musicians, and volunteers from partner churches."}
          </p>
        </div>

        {/* 3-Column Editorial Grid (Morrow Church Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {leaders.map((leader) => (
            <div key={leader.name} className="space-y-3.5 group">
              <div className="relative aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="space-y-1 pt-1">
                <h3 className="font-hanken text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {leader.name}
                </h3>
                <div className="text-xs font-semibold text-[#0D9488] tracking-wide">
                  {leader.role}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
