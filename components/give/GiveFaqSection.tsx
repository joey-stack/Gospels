"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "non-profit-status",
    question: "Is GOSPELS an officially registered Swedish non-profit (Ideell förening)?",
    answer:
      "Yes. GOSPELS is registered as an ideell förening under organization number 802490-1234 in Gothenburg, Västra Götaland. We operate under Swedish non-profit governance regulations with independent annual auditing presented at our yearly general meeting.",
  },
  {
    id: "admission-policy",
    question: "Are tickets or admissions ever charged for GOSPELS events?",
    answer:
      "Never. It is a foundational pillar of our vision that every gathering, concert, and worship session—including Holy Spirit Worship and Göteborgs Lovsångskonsert—has 100% open public admission for all citizens and visitors, funded solely through voluntary kingdom giving.",
  },
  {
    id: "tax-deduction",
    question: "Can I deduct my donation on Swedish taxes (Skattereduktion för gåvor)?",
    answer:
      "Giving towards our registered social relief initiatives meets the criteria established under Skatteverket's regulations for gifts to approved organizations (minimum 200 SEK per gift, up to 12,000 SEK annually). If you supply your personnummer with your monthly partnership, your Swedish tax deduction is reported automatically to Skatteverket.",
  },
  {
    id: "cancel-monthly",
    question: "How do I update or cancel my monthly Kingdom Partner giving?",
    answer:
      "You maintain full sovereignty over your partnership. Every monthly receipt email contains a one-click direct management link allowing you to adjust tiers, update your bank account or card, or pause contributions instantly. You may also email ekonomi@gospelsgoteborg.se at any time.",
  },
];

export const GiveFaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>("admission-policy");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="w-full px-2.5 sm:px-5 my-12 sm:my-16 mb-20 sm:mb-24">
      <div className="max-w-4xl mx-auto space-y-8 font-inter">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
            Clarity &amp; Confidence
          </span>
          <h2 className="font-hanken text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Stewardship Questions Answered
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200/90 rounded-md sm:rounded-lg overflow-hidden shadow-2xs transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-[#0D9488] shrink-0" />
                    <span className="font-hanken text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0D9488]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed font-inter bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
