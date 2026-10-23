"use client";

import React from "react";
import { motion } from "framer-motion";

interface StandingAppointment {
  day: string;
  time: string;
  title: string;
  location: string;
  description: string;
  tag: string;
}

const STANDING_APPOINTMENTS: StandingAppointment[] = [
  {
    day: "Tuesdays",
    time: "Every Tuesday · 18:30 – 20:30 CET",
    title: "Community Choir Rehearsals",
    location: "Central Choir Hall, Göteborg",
    description:
      "Open multi-church choir rehearsals bringing vocalists together from across Västra Götaland to learn contemporary gospel arrangements and vocal polyphony.",
    tag: "Choral Fellowship",
  },
  {
    day: "Thursdays",
    time: "Every Thursday · 19:00 – 20:30 CET",
    title: "Citywide Intercession & Prayer",
    location: "Vasakyrkan Gothenburg",
    description:
      "Ecumenical prayer vigil joining worship leaders, intercessors, and ministry partners to intercede for Gothenburg's spiritual climate, youth, and public square.",
    tag: "City Intercession",
  },
  {
    day: "First Saturdays",
    time: "Monthly · 11:00 – 13:00 CET",
    title: "Public Square Street Choir Outreach",
    location: "Brunnsparken & Gustav Adolfs Torg",
    description:
      "Open-air acoustic gospel concerts and street evangelism in Gothenburg's central civic squares, sharing hope and uplifting live worship with city residents.",
    tag: "Urban Outreach",
  },
  {
    day: "Bi-Weekly Saturdays",
    time: "Alternate Saturdays · 14:00 – 17:00 CET",
    title: "Musicians & Directors Masterclass",
    location: "RCCG Jesus Connection Hub, Gamlestaden",
    description:
      "Instrumental workshops, rhythm section clinics, vocal coaching, and leadership training for gospel choir directors and musicians across Gothenburg.",
    tag: "Masterclass",
  },
];

export const EventsStandingAppointments: React.FC = () => {
  return (
    <section className="w-full px-2.5 sm:px-5 py-14 sm:py-16 md:py-20 bg-[#F1F5F9] border-t border-slate-200/80">
      <div className="w-full">
        {/* Section Heading tailored for Gospels Organization Rhythms */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-[2px] bg-[#0D9488]" />
            <span className="text-xs uppercase tracking-widest text-[#0D9488] font-semibold">
              YEAR-ROUND MINISTRY INITIATIVES · ONGOING RHYTHMS
            </span>
          </div>
          <h2 className="font-hanken text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight">
            The ongoing organization rhythms.
          </h2>
          <p className="font-inter text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Beyond our major seasonal concerts and worship nights, these four ministry initiatives run year-round to build Gothenburg&apos;s gospel choir community and worship culture.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDING_APPOINTMENTS.map((item, idx) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group bg-white rounded-lg p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:border-[#0D9488]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Day & Tag Header */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-4">
                  <span className="font-hanken font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                    {item.day}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold font-inter bg-slate-100 text-slate-600 group-hover:bg-[#F0FDFA] group-hover:text-[#0D9488] transition-colors">
                    {item.tag}
                  </span>
                </div>

                {/* Time & Title */}
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0D9488] mb-1 font-inter">
                  {item.time}
                </div>
                <h3 className="font-hanken font-bold text-lg text-slate-900 tracking-tight mb-2 group-hover:text-[#0D9488] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Location Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-inter">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                <span className="truncate">{item.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
