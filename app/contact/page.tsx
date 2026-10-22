import type { Metadata } from "next";
import { PrayerHero } from "@/components/prayer/PrayerHero";
import { PrayerContactSection } from "@/components/prayer/PrayerContactSection";
import { PrayerQuestions } from "@/components/prayer/PrayerQuestions";

export const metadata: Metadata = {
  title: "Contact & Prayer | GOSPELS Gothenburg Ministry",
  description:
    "Write, call, or pray together. Connect with the GOSPELS Gothenburg ministry team, submit confidential prayer requests, or visit our Frihamnen sanctuary.",
  openGraph: {
    title: "Contact & Prayer | GOSPELS Gothenburg Ministry",
    description:
      "A dedicated pastoral team and intercessors standing with you before Jesus Christ.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function ContactPage() {
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
