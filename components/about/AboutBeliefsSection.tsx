"use client";

import React from "react";
import { Sun, Heart, BookOpen, Flame, Users, Landmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BELIEFS_EN = [
  {
    icon: Sun,
    title: "Creator and Father",
    description:
      "Everything that exists was made on purpose by a God who loves Gothenburg and keeps showing up for His people.",
  },
  {
    icon: Heart,
    title: "Rescue through Jesus",
    description:
      "Jesus took our place on the cross and walked out of the grave bodily. In Him we find forgiveness, peace, and eternal life.",
  },
  {
    icon: BookOpen,
    title: "Scripture we lean on",
    description:
      "Through the Bible, God speaks with authority to ordinary people. We study it together, sing its promises, and try to live it.",
  },
  {
    icon: Flame,
    title: "The Holy Spirit’s power",
    description:
      "The Holy Spirit moves actively today—inspiring sacred praise, comforting the broken, and uniting believers across traditions.",
  },
  {
    icon: Users,
    title: "One body, not divided",
    description:
      "Beyond denominational labels, we belong to one body of Christ. When we lift our voices in praise, division falls away.",
  },
  {
    icon: Landmark,
    title: "Good for the city",
    description:
      "Gothenburg should be a kinder, more joyful place because believers are here. We intercede for every district and neighborhood.",
  },
];

const BELIEFS_SV = [
  {
    icon: Sun,
    title: "Skapare och Fader",
    description:
      "Allt som existerar skapades med mening av en Gud som älskar Göteborg och aldrig överger sitt folk.",
  },
  {
    icon: Heart,
    title: "Räddning genom Jesus",
    description:
      "Jesus tog vår plats på korset och uppstod kroppsligen från graven. I Honom finner vi förlåtelse, frid och evigt liv.",
  },
  {
    icon: BookOpen,
    title: "Skriften vi lutar oss mot",
    description:
      "Genom Bibeln talar Gud med auktoritet till vanliga människor. Vi studerar den tillsammans, sjunger dess sanningar och söker leva efter den.",
  },
  {
    icon: Flame,
    title: "Den Helige Andes kraft",
    description:
      "Den Helige Ande verkar aktivt idag – inspirerar lovsång, tröstar de sörjande och förenar troende över alla traditioner.",
  },
  {
    icon: Users,
    title: "En enda kropp, odelad",
    description:
      "Bortom samfundsetiketter tillhör vi Kristi enda kropp. När vi förenar våra röster i lovsång faller all splittring bort.",
  },
  {
    icon: Landmark,
    title: "Till välsignelse för staden",
    description:
      "Göteborg ska vara en vänligare, mer hoppfull plats tack vare att Guds folk finns här. Vi ber för varje stadsdel och kvarter.",
  },
];

export const AboutBeliefsSection: React.FC = () => {
  const { language } = useLanguage();
  const isSv = language === "sv";
  const beliefs = isSv ? BELIEFS_SV : BELIEFS_EN;

  return (
    <section className="w-full px-2.5 sm:px-5 py-12 sm:py-20 font-inter">
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Header Block */}
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider block">
            {isSv ? "— VÅR TRO" : "— WHAT WE BELIEVE"}
          </span>
          <h2 className="font-hanken text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            {isSv ? "Vår övertygelse, utan krångliga ord." : "Our convictions, without the jargon."}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isSv
              ? "Gospels Göteborg vilar tryggt på de historiska apostoliska och nicenska trosbekännelserna. Med vardagliga ord ser det ut så här:"
              : "Gospels Gothenburg is an ecumenical Christian ministry standing firmly on the historic Apostles’ and Nicene Creeds. In everyday words, it looks like this:"}
          </p>
        </div>

        {/* 2x3 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {beliefs.map((belief) => {
            const Icon = belief.icon;
            return (
              <div
                key={belief.title}
                className="rounded-lg sm:rounded-xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-md bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-hanken text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {belief.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {belief.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
