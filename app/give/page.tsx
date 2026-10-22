import type { Metadata } from "next";
import { GiveHero } from "@/components/give/GiveHero";
import { GiveWaysToGive } from "@/components/give/GiveWaysToGive";
import { GiveWhereItGoes } from "@/components/give/GiveWhereItGoes";
import { GiveScriptureSection } from "@/components/give/GiveScriptureSection";
import { GiveQuestions } from "@/components/give/GiveQuestions";

export const metadata: Metadata = {
  title: "Give to GOSPELS | Kingdom Stewardship Gothenburg",
  description:
    "Support the worship of Jesus in Gothenburg through official Swedish Swish giving, monthly Kingdom Partner stewardship, or bankgiro. 100% community supported non-profit ministry.",
  openGraph: {
    title: "Give to GOSPELS | Kingdom Stewardship Gothenburg",
    description:
      "Every gift lifts worship over our city. Empowering city square adoration, united choir masterclasses, and ongoing prayer across Gothenburg.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function GivePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0F172A] flex flex-col">
      {/* 1. Morrow Church Elevated Hero Card */}
      <GiveHero />

      {/* 2. Morrow Church "Ways to Give" 3-Card Horizontal Stack */}
      <GiveWaysToGive />

      {/* 3. Morrow Church "Where It Goes" 2-Column Dark Section */}
      <GiveWhereItGoes />

      {/* 4. Liturgical Scripture Callout (2 Corinthians 9:7) */}
      <GiveScriptureSection />

      {/* 5. Morrow Church "Giving Questions" 2x2 Editorial Grid */}
      <GiveQuestions />
    </div>
  );
}
