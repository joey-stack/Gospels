import type { Metadata } from "next";
import { GiveHero } from "@/components/give/GiveHero";
import { GiveMethodsBento } from "@/components/give/GiveMethodsBento";
import { GiveBreakdownSection } from "@/components/give/GiveBreakdownSection";
import { GiveScriptureSection } from "@/components/give/GiveScriptureSection";
import { GiveFaqSection } from "@/components/give/GiveFaqSection";

export const metadata: Metadata = {
  title: "Kingdom Giving & Stewardship | GOSPELS Gothenburg",
  description:
    "Support the worship of Jesus in Gothenburg through official Swish giving, monthly Kingdom Partner stewardship, or international checkout. 100% community supported non-profit ministry.",
  openGraph: {
    title: "Kingdom Giving & Stewardship | GOSPELS Gothenburg",
    description:
      "Every krona empowers city square worship, inter-church choral training, open public admission concerts, and prayer across West Sweden.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function GivePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0F172A] flex flex-col">
      {/* 1. Morrow Church Style Elevated Hero Card */}
      <GiveHero />

      {/* 2. Primary Giving Methods Bento: Swish, Monthly Partner, Card */}
      <GiveMethodsBento />

      {/* 3. Audited Financial Transparency & Giving Breakdown */}
      <GiveBreakdownSection />

      {/* 4. Liturgical Scripture Callout (2 Corinthians 9:7) */}
      <GiveScriptureSection />

      {/* 5. Stewardship FAQ Accordion */}
      <GiveFaqSection />
    </div>
  );
}
