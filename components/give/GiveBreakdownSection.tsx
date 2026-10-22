"use client";

import React, { useState } from "react";
import { Volume2, Music, Shield, HeartHandshake } from "lucide-react";

interface AllocationItem {
  percentage: number;
  label: string;
  share: string;
  description: string;
  color: string;
  bgLight: string;
  textColor: string;
  icon: React.ReactNode;
}

const ALLOCATIONS: AllocationItem[] = [
  {
    percentage: 60,
    label: "Public Events & Acoustics",
    share: "60 kr of every 100 kr",
    description:
      "Open city square acoustic staging, professional sound engineering, and Gustav Adolfs Torg municipal permit fees.",
    color: "#0D9488",
    bgLight: "bg-[#0D9488]/10",
    textColor: "text-[#0D9488]",
    icon: <Volume2 className="w-5 h-5" />,
  },
  {
    percentage: 20,
    label: "Choir & Musician Training",
    share: "20 kr of every 100 kr",
    description:
      "Sheet music licenses, choral workshop facilities, and youth choir conductor apprenticeships across Gothenburg.",
    color: "#14B8A6",
    bgLight: "bg-[#14B8A6]/10",
    textColor: "text-[#14B8A6]",
    icon: <Music className="w-5 h-5" />,
  },
  {
    percentage: 15,
    label: "Governance & Compliance",
    share: "15 kr of every 100 kr",
    description:
      "Swedish ideell förening non-profit auditing, public safety insurances, venue bookings, and legal compliance.",
    color: "#0F172A",
    bgLight: "bg-slate-100",
    textColor: "text-slate-800",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    percentage: 5,
    label: "Intercession & Care",
    share: "5 kr of every 100 kr",
    description:
      "24/7 WhatsApp intercession infrastructure, prayer volunteer support, and pastoral hospital visitation logistics.",
    color: "#94A3B8",
    bgLight: "bg-slate-100",
    textColor: "text-slate-700",
    icon: <HeartHandshake className="w-5 h-5 text-slate-600" />,
  },
];

export const GiveBreakdownSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<AllocationItem | null>(null);

  return (
    <section className="w-full px-2.5 sm:px-5 my-12 sm:my-16">
      <div className="w-full space-y-8 font-inter">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
            Radical Openness
          </span>
          <h2 className="font-hanken text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Where Your Giving Goes
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Audited transparency is sacred. Here is exactly how every 100 SEK is stewarded in ministry:
          </p>
        </div>

        {/* Multi-Segment Percentage Distribution Bar */}
        <div className="w-full bg-slate-200 h-4 rounded-md overflow-hidden flex shadow-inner">
          {ALLOCATIONS.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
              className="h-full transition-opacity hover:opacity-85 cursor-pointer"
              title={`${item.percentage}% - ${item.label}`}
            />
          ))}
        </div>

        {/* 4 Progress Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ALLOCATIONS.map((item) => {
            const isHovered = activeItem?.label === item.label;
            return (
              <div
                key={item.label}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
                className={`bg-white border rounded-lg p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all ${
                  isHovered
                    ? "border-[#0D9488] ring-1 ring-[#0D9488] -translate-y-0.5"
                    : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-10 h-10 rounded-md ${item.bgLight} ${item.textColor} flex items-center justify-center`}
                    >
                      {item.icon}
                    </span>
                    <span className={`font-hanken text-2xl sm:text-3xl font-extrabold ${item.textColor}`}>
                      {item.percentage}%
                    </span>
                  </div>

                  <h3 className="font-hanken text-base font-bold text-slate-900 leading-snug">
                    {item.label}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className={`pt-4 mt-4 border-t border-slate-100 text-xs font-semibold ${item.textColor}`}>
                  {item.share}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
