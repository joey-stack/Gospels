import React from "react";
import type { Metadata } from "next";
import { GlobalHeader } from "@/components/ui/GlobalHeader";
import { GlobalFooter } from "@/components/ui/GlobalFooter";
import { WatchHero } from "@/components/watch/WatchHero";
import { WatchFeaturedSection } from "@/components/watch/WatchFeaturedSection";
import { WatchArchiveCatalog } from "@/components/watch/WatchArchiveCatalog";
import { WatchUpcomingSeries } from "@/components/watch/WatchUpcomingSeries";
import { WatchPodcastPlatforms } from "@/components/watch/WatchPodcastPlatforms";

export const metadata: Metadata = {
  title: "Watch & Listen | GOSPELS Gothenburg Ministry",
  description:
    "Watch or listen to every gospel worship gathering, acoustic session, and choral concert from GOSPELS Gothenburg. Recorded live across Frihamnen and West Sweden.",
  openGraph: {
    title: "Watch & Listen | GOSPELS Gothenburg",
    description:
      "Watch or listen to every gospel worship gathering, acoustic session, and choral concert from GOSPELS Gothenburg. Recorded live across Frihamnen and West Sweden.",
    images: [
      {
        url: "/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png",
        width: 2400,
        height: 1471,
        alt: "Gospels Gothenburg Worship Gathering Sound Archive",
      },
    ],
  },
};

export default function WatchPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-slate-900 flex flex-col font-inter">
      {/* Global Floating Header matching Morrow Church */}
      <GlobalHeader />

      <main className="flex-1 w-full space-y-4 sm:space-y-6">
        {/* 1. Hero Section matching Morrow Church sermons hero */}
        <WatchHero />

        {/* 2. Featured Recording (Current Season: Holy Spirit Worship Frihamnen) */}
        <WatchFeaturedSection />

        {/* 3. Archive Catalog with Category Filtering & Search */}
        <WatchArchiveCatalog />

        {/* 4. Upcoming Series / Gathering Announcement Card */}
        <WatchUpcomingSeries />

        {/* 5. Podcast & Audio Streaming Channels */}
        <WatchPodcastPlatforms />
      </main>

      {/* Global Elevated Footer with giant GOSPELS wordmark */}
      <GlobalFooter />
    </div>
  );
}
