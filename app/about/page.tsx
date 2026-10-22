import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStorySection } from "@/components/about/AboutStorySection";
import { AboutStatsSection } from "@/components/about/AboutStatsSection";
import { AboutBeliefsSection } from "@/components/about/AboutBeliefsSection";
import { AboutLeadershipSection } from "@/components/about/AboutLeadershipSection";
import { AboutCtaSection } from "@/components/about/AboutCtaSection";

export const metadata: Metadata = {
  title: "About Us | GOSPELS Gothenburg Ministry",
  description:
    "A choir rehearsal that turned into a citywide worship movement. Discover the story, convictions, and leadership behind GOSPELS Gothenburg.",
  openGraph: {
    title: "About Us | GOSPELS Gothenburg Ministry",
    description:
      "A united ecumenical movement lifting the name of Jesus across 24 partner churches and a 65-voice mass choir in Gothenburg, Sweden.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0F172A] flex flex-col">
      {/* 1. Morrow Church Elevated Hero Card */}
      <AboutHero />

      {/* 2. Our Story Section (Photo Card + Editorial Narrative) */}
      <AboutStorySection />

      {/* 3. By The Numbers ("A movement, counted in names.") */}
      <AboutStatsSection />

      {/* 4. What We Believe ("Our convictions, without the jargon.") */}
      <AboutBeliefsSection />

      {/* 5. Leadership & Ministry Directors */}
      <AboutLeadershipSection />

      {/* 6. Get Involved / CTA Banner */}
      <AboutCtaSection />
    </div>
  );
}
