import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FloatingEventBanner } from "@/components/home/FloatingEventBanner";
import { MissionStrip } from "@/components/home/MissionStrip";
import { ScriptureMeditation } from "@/components/home/ScriptureMeditation";
import { WatchMediaSection } from "@/components/home/WatchMediaSection";
import { FeaturedEventsSection } from "@/components/home/FeaturedEventsSection";
import { PrayerIntercessionSection } from "@/components/home/PrayerIntercessionSection";
import { PartnerChurchesSection } from "@/components/home/PartnerChurchesSection";
import { KingdomGivingSection } from "@/components/home/KingdomGivingSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Relume Header 76 Hero Section */}
      <HeroSection />

      {/* 2. Overlapping Negative-Margin Event Banner */}
      <FloatingEventBanner />

      {/* 3. Three-Column Mission Strip */}
      <MissionStrip />

      {/* 4. Scripture Meditation Block in EB Garamond */}
      <ScriptureMeditation />

      {/* 5. Dark Charcoal Media Section (#0F172A) */}
      <WatchMediaSection />

      {/* 6. Featured Ministry Events Side-by-Side */}
      <FeaturedEventsSection />

      {/* 7. Pastoral Intercession & Real-Time Prayer Form */}
      <PrayerIntercessionSection />

      {/* 8. Partner Churches Ecumenical Grid */}
      <PartnerChurchesSection />

      {/* 9. Kingdom Stewardship Giving & Newsletter */}
      <KingdomGivingSection />
    </div>
  );
}
