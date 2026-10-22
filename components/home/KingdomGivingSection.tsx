"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const KingdomGivingSection: React.FC = () => {
  const { isSv } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full px-2.5 sm:px-5 py-12 md:py-16"
      id="partner"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kingdom Giving Block */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-lg p-8 md:p-10 border border-[#E2E8F0] custom-shadow-tinted flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                {isSv ? "GEMENSKAPENS FÖRVALTARSKAP" : "COMMUNITY STEWARDSHIP"}
              </span>
              {/* Swish Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container rounded-md text-xs font-semibold text-on-surface">
                <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                <span>Swish: 123 456 78 90</span>
              </div>
            </div>
            <h3 className="font-headline-lg text-headline-lg font-bold text-[#0F172A]">
              {isSv ? "Stöd med 150 kr/månad" : "Give 150 kr/month"}
            </h3>
            <p className="font-body-md text-body-md text-secondary mt-2">
              {isSv
                ? "Stöd torglovsång och ljudutrustning i Göteborg. Din gåva möjliggör mobila elverk, körscener, kollektivtrafikstöd och offentliga polistillstånd."
                : "Support street worship and sound equipment in Gothenburg. Your seed enables portable generators, choir staging, transit subsidies, and public square ministry permits."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-primary text-xl">speaker</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">
                  {isSv ? "Akustik- & Ljudutrustning" : "Acoustic & Audio Rig Gear"}
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-primary text-xl">groups</span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">
                  {isSv ? "Ungdomskörsresor & Övningar" : "Youth Choir Travel & Rehearsal"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-outline-variant/30">
            <Link
              href="/give"
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold font-label-md text-label-md px-6 py-3 rounded-md transition-all active:scale-95 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>{isSv ? "Bli Partner" : "Become a Partner"}</span>
              <span className="material-symbols-outlined text-sm">favorite</span>
            </Link>
            <span className="text-xs text-secondary">
              {isSv ? "Bankgiro: 5542-8891 (Märkt: GOSPEL)" : "Direct bank giro: 5542-8891 (Ref: GOSPEL)"}
            </span>
          </div>
        </div>

        {/* Newsletter Signup Form */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-lg p-8 md:p-10 border border-[#E2E8F0] custom-shadow-tinted flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              {isSv ? "HÅLL DIG UPPDATERAD" : "STAY CONNECTED"}
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-[#0F172A] mt-2">
              {isSv ? "Bli en del av Göteborgs lovsångsrörelse" : "Join Gothenburg's worship movement"}
            </h3>
            <p className="font-body-sm text-body-sm text-secondary mt-2">
              {isSv
                ? "Få månatliga uppdateringar om spontana torgsamlingar, körworkshops och samlingsplatser."
                : "Receive monthly notices for impromptu open-air worship sessions, choir workshops, and venue confirmations."}
            </p>
            {subscribed ? (
              <div className="mt-6 p-4 rounded-md bg-primary-fixed/30 border border-primary/20 text-center">
                <span className="font-headline-sm text-headline-sm font-bold text-[#0F172A] block">
                  {isSv ? "Prenumeration Bekräftad" : "Subscribed Successfully"}
                </span>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  {isSv
                    ? "Tack för att du står tillsammans med Göteborgs lovsångsrörelse."
                    : "Thank you for standing with the Gothenburg worship movement."}
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-3" onSubmit={handleSubscribe}>
                <div>
                  <label className="block font-label-md text-label-md text-[#0F172A] mb-1 font-semibold">
                    {isSv ? "Din E-postadress" : "Your Email"}
                  </label>
                  <input
                    className="w-full bg-white border border-[#CBD5E1] rounded-md px-4 py-2.5 text-body-md text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 transition-all"
                    placeholder={isSv ? "namn@kyrka.se" : "name@example.com"}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold font-label-md text-label-md py-3 rounded-md transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  type="submit"
                >
                  <span>{isSv ? "Prenumerera" : "Subscribe"}</span>
                  <span className="material-symbols-outlined text-sm">mail</span>
                </button>
              </form>
            )}
          </div>
          <p className="text-[11px] text-secondary mt-6">
            {isSv
              ? "Vi respekterar din inkorg. Avsluta prenumerationen när som helst med ett klick. Ingen reklam."
              : "We respect your inbox. Unsubscribe anytime with one tap. Zero advertising."}
          </p>
        </div>
      </div>
    </motion.section>
  );
};
