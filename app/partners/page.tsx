import type { Metadata } from "next";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersInteractiveDirectory } from "@/components/partners/PartnersInteractiveDirectory";
import { PartnersScriptureSection } from "@/components/partners/PartnersScriptureSection";
import { PartnersCovenantSection } from "@/components/partners/PartnersCovenantSection";

export const metadata: Metadata = {
  title: "Partner Churches & Ecumenical Covenant | GOSPELS Gothenburg",
  description:
    "Explore partner churches, fellowship hubs, and gospel choir assemblies across Gothenburg. A united body lifting Jesus through gospel music, prayer, and mutual fellowship.",
  openGraph: {
    title: "Partner Churches & Ecumenical Covenant | GOSPELS Gothenburg",
    description:
      "24 partner churches and fellowship hubs united across Gothenburg for gospel concerts, choral worship, and citywide prayer vigils.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function PartnerChurchesPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0F172A] flex flex-col">
      {/* 1. Morrow Church Style Elevated Partner Header Card */}
      <PartnersHero />

      {/* 2. Interactive Map & Church Directory Bento Grid */}
      <PartnersInteractiveDirectory />

      {/* 3. Liturgical Scripture Callout (John 17:21) */}
      <PartnersScriptureSection />

      {/* 4. Ecumenical Covenant & Church Registration CTA Card */}
      <PartnersCovenantSection />
    </div>
  );
}
