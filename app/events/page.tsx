import type { Metadata } from "next";
import { EventsHeroArchive } from "@/components/events/EventsHeroArchive";
import { EventsCatalogClient } from "@/components/events/EventsCatalogClient";
import { EventsStandingAppointments } from "@/components/events/EventsStandingAppointments";
import { EventsNewHereSection } from "@/components/events/EventsNewHereSection";

export const metadata: Metadata = {
  title: "Events & Gatherings | GOSPELS Gothenburg Ministry",
  description:
    "Explore upcoming gospel worship nights, open-air public square concerts, vocal workshops, and recurring weekly gatherings across Gothenburg, Sweden.",
  openGraph: {
    title: "Events & Gatherings | GOSPELS Gothenburg Ministry",
    description:
      "Citywide praise nights, open-air street choir worship, vocal masterclasses, and sacred prayer vigils across Gothenburg.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function EventsArchivePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0F172A] flex flex-col">
      {/* 1. Morrow Church Style Elevated Event Header Card */}
      <EventsHeroArchive />

      {/* 2. Interactive Events Catalog with Category Filter & 4:3 Event Cards Grid */}
      <EventsCatalogClient />

      {/* 3. The Standing Appointments / Weekly Rhythm Section */}
      <EventsStandingAppointments />

      {/* 4. New Here? Begin on a Sunday Section */}
      <EventsNewHereSection />
    </div>
  );
}
