import type { Metadata } from "next";
import { PrayerHero } from "@/components/prayer/PrayerHero";
import { PrayerContactSection } from "@/components/prayer/PrayerContactSection";
import { PrayerQuestions } from "@/components/prayer/PrayerQuestions";

export const metadata: Metadata = {
  title: "Need Prayer? | GOSPELS Gothenburg Ministry",
  description:
    "We’d love to pray with you. Share your prayer request or connect with our Gothenburg intercessory team. Every petition is held in pastoral trust.",
  openGraph: {
    title: "Need Prayer? | GOSPELS Gothenburg Ministry",
    description:
      "A dedicated team of intercessors reads every request and stands in agreement with you before Jesus Christ.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function PrayerPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0F172A] flex flex-col">
      {/* 1. Morrow Church Elevated Hero Card */}
      <PrayerHero />

      {/* 2. Morrow Church 2-Column Contact & Intercession Architecture */}
      <PrayerContactSection />

      {/* 3. Morrow Church 2x2 Questions Grid */}
      <PrayerQuestions />
    </div>
  );
}
