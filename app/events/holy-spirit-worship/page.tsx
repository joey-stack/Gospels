import type { Metadata } from "next";
import { EventHero } from "@/components/events/EventHero";
import { EventDetailMain } from "@/components/events/EventDetailMain";
import { EventMoreSection } from "@/components/events/EventMoreSection";

export const metadata: Metadata = {
  title: "Holy Spirit Worship 2026 | GOSPELS Gothenburg",
  description:
    "An evening devoted entirely to uninterrupted praise, collective prayer, and multi-church gospel choirs convening at Smyrna Frihamnen in Gothenburg.",
  openGraph: {
    title: "Holy Spirit Worship 2026 | GOSPELS Gothenburg",
    description:
      "Join us for an uninterrupted night of collective worship, prayer, and multi-church gospel praise at Smyrna Frihamnskyrkan in Gothenburg.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function HolySpiritWorshipEventPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0F172A] flex flex-col">
      {/* 1. Morrow Church Event Header Card */}
      <EventHero />

      {/* 2. Morrow Church Two-Column Detail Grid (Prose + Sticky Aside Specs & RSVP) */}
      <EventDetailMain />

      {/* 3. Morrow Church 'More events.' Section */}
      <EventMoreSection />
    </div>
  );
}
