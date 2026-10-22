"use client";

import React, { useState, useTransition } from "react";
import {
  Smartphone,
  Copy,
  Check,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Globe2,
  Lock,
  Landmark,
  Sparkles,
} from "lucide-react";
import { SwishGivingModal } from "@/components/give/SwishGivingModal";
import { submitKingdomPartnerSubscription, submitDonationIntent } from "@/app/actions";

interface Tier {
  id: string;
  name: string;
  amount: number;
  description: string;
}

const PARTNERSHIP_TIERS: Tier[] = [
  {
    id: "supporter",
    name: "Supporter",
    amount: 150,
    description: "Sponsors choir sheet music, rehearsal tea, and sound cables.",
  },
  {
    id: "patron",
    name: "Patron",
    amount: 350,
    description: "Funds student choir travel grants and guest vocal masterclasses.",
  },
  {
    id: "pillar",
    name: "Pillar",
    amount: 750,
    description: "Sponsors city square generator power & acoustic staging at Gustav Adolfs Torg.",
  },
];

export const GiveMethodsBento: React.FC = () => {
  // Swish State
  const [swishModalOpen, setSwishModalOpen] = useState(false);
  const [swishAmount, setSwishAmount] = useState<number>(150);
  const [swishCopied, setSwishCopied] = useState(false);

  // Kingdom Partner State
  const [selectedTier, setSelectedTier] = useState<Tier>(PARTNERSHIP_TIERS[0]);
  const [partnerPaymentMethod, setPartnerPaymentMethod] = useState<"autogiro" | "card">("autogiro");
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPersonnummer, setPartnerPersonnummer] = useState("");
  const [partnerSuccessMsg, setPartnerSuccessMsg] = useState<string | null>(null);
  const [partnerErrorMsg, setPartnerErrorMsg] = useState<string | null>(null);
  const [isPendingPartner, startPartnerTransition] = useTransition();

  // International & Card Checkout State
  const [cardFrequency, setCardFrequency] = useState<"one-time" | "monthly">("one-time");
  const [currency, setCurrency] = useState<"SEK" | "EUR" | "USD" | "NOK">("SEK");
  const [cardAmount, setCardAmount] = useState<string>("250");
  const [cardDonorEmail, setCardDonorEmail] = useState<string>("");
  const [cardSuccessMsg, setCardSuccessMsg] = useState<string | null>(null);
  const [isPendingCard, startCardTransition] = useTransition();

  const handleCopySwish = () => {
    navigator.clipboard.writeText("1234567890");
    setSwishCopied(true);
    setTimeout(() => setSwishCopied(false), 2000);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerErrorMsg(null);
    setPartnerSuccessMsg(null);

    const formData = new FormData();
    formData.append("name", partnerName);
    formData.append("email", partnerEmail);
    formData.append("tier", selectedTier.amount.toString());
    formData.append("tierName", selectedTier.name);
    formData.append("paymentMethod", partnerPaymentMethod);
    if (partnerPersonnummer) {
      formData.append("personnummer", partnerPersonnummer);
    }

    startPartnerTransition(async () => {
      const res = await submitKingdomPartnerSubscription(formData);
      if (res.success) {
        setPartnerSuccessMsg(res.message || "Tack så mycket för ditt partnerskap!");
      } else {
        setPartnerErrorMsg(res.errors?.name || res.errors?.email || res.message || "Ett fel uppstod.");
      }
    });
  };

  const handleCardDonation = (method: string) => {
    setCardSuccessMsg(null);
    const formData = new FormData();
    formData.append("amount", cardAmount);
    formData.append("currency", currency);
    formData.append("frequency", cardFrequency);
    formData.append("method", method);
    formData.append("email", cardDonorEmail);

    startCardTransition(async () => {
      const res = await submitDonationIntent(formData);
      if (res.success) {
        setCardSuccessMsg(res.message || "Thank you for your generous gift!");
      }
    });
  };

  return (
    <section className="w-full px-2.5 sm:px-5 my-8 space-y-6">
      {/* Upper Grid: Swish (Left) vs Kingdom Partner (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* ======================================================== */}
        {/* CARD 1: Official Swish Giving                            */}
        {/* ======================================================== */}
        <div className="bg-white border border-slate-200/90 rounded-lg md:rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden font-inter">
          {/* Subtle Ambient Teal Halo */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Card Header & Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-md bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center text-[#0D9488] shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider block font-inter">
                    Fastest &amp; Direct
                  </span>
                  <h2 className="font-hanken text-xl sm:text-2xl font-bold text-slate-900">
                    Official Swish Giving
                  </h2>
                </div>
              </div>

              <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                Sverige Instant
              </span>
            </div>

            {/* Swish Interactive Centerpiece */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 sm:p-5 mb-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              {/* QR Container (Clickable to open interactive Swish modal) */}
              <button
                type="button"
                onClick={() => setSwishModalOpen(true)}
                className="bg-white p-2.5 rounded-md border border-slate-300 shadow-xs flex flex-col items-center shrink-0 hover:border-[#0D9488] transition-colors group cursor-pointer"
                title="Klicka för att förstora Swish QR-kod"
              >
                <div className="w-24 h-24 bg-[#0F172A] rounded flex flex-col items-center justify-center text-white text-center p-2 group-hover:bg-[#0A1530] transition-colors">
                  <QrCode className="w-8 h-8 text-[#2DD4BF] mb-1" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold">
                    Scan via Swish
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium mt-1">
                  Direct Camera Scan
                </span>
              </button>

              {/* Number & Reference Guide */}
              <div className="space-y-3 w-full">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                    GOSPELS Swish-nummer
                  </span>
                  <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-md border border-slate-300 mt-1 shadow-2xs">
                    <span className="font-hanken text-lg sm:text-xl font-bold text-slate-900 tracking-wider">
                      123 456 78 90
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySwish}
                      className="text-xs font-semibold text-[#0D9488] hover:text-[#0F766E] transition-colors flex items-center gap-1"
                    >
                      {swishCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Kopierat!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Kopiera</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                    Meddelande / Reference
                  </span>
                  <p className="text-xs text-slate-700 font-medium bg-white px-3 py-1.5 rounded border border-dashed border-slate-300">
                    Märkt: <span className="text-[#0D9488] font-bold">GÅVA</span> eller event t.ex.{" "}
                    <span className="text-slate-900 font-bold">HSW2026</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Preset Amounts */}
            <div className="space-y-2 mb-6">
              <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider block">
                Välj snabbbelopp (SEK)
              </span>
              <div className="grid grid-cols-5 gap-2">
                {[50, 150, 300, 500].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setSwishAmount(val);
                      setSwishModalOpen(true);
                    }}
                    className={`py-2 px-1 text-center rounded-md border text-xs font-semibold transition-all ${
                      swishAmount === val
                        ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488] font-bold ring-1 ring-[#0D9488]"
                        : "border-slate-200 bg-white hover:border-[#0D9488]/60 text-slate-700"
                    }`}
                  >
                    {val} kr
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSwishModalOpen(true)}
                  className="py-2 px-1 text-center rounded-md border border-slate-200 bg-white hover:border-[#0D9488]/60 text-slate-700 text-xs font-semibold transition-all"
                >
                  Valfritt
                </button>
              </div>
            </div>
          </div>

          {/* Action & Verification Note */}
          <div className="space-y-3.5 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSwishModalOpen(true)}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white transition-all py-2.5 px-4 rounded-md text-xs sm:text-sm font-semibold text-center shadow-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <QrCode className="w-4 h-4" />
                <span>Open Swish on Mobile</span>
              </button>

              <button
                type="button"
                onClick={handleCopySwish}
                className="border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors py-2.5 px-4 rounded-md text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2"
              >
                {swishCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Nummer kopierat!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copy Swish Number</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>
                Bankgiro: <strong className="text-slate-800 font-mono">5542-8891</strong> · Strict non-profit Swedish accounting standards.
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CARD 2: Become a Gothenburg Kingdom Partner (Monthly)     */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#0D9488]/50 rounded-lg md:rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden font-inter">
          {/* Sustaining Pillar Badge */}
          <div className="absolute top-0 right-0 bg-[#0D9488] text-white text-[10px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-bl-md shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Sustaining Pillar</span>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-[#0D9488] text-xs font-bold tracking-wider uppercase mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Continuous Monthly Impact</span>
              </div>
              <h2 className="font-hanken text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                Become a Gothenburg Kingdom Partner
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Provide a dependable monthly foundation for city-wide choral ministry and public adoration.
              </p>
            </div>

            {/* Tier Selector */}
            <div className="space-y-2.5">
              {PARTNERSHIP_TIERS.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <label
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`relative flex items-start p-3 sm:p-3.5 rounded-md cursor-pointer transition-all border ${
                      isSelected
                        ? "border-[#0D9488] bg-[#0D9488]/5 ring-1 ring-[#0D9488]"
                        : "border-slate-200 bg-white hover:border-[#0D9488]/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="partnership_tier"
                      checked={isSelected}
                      onChange={() => setSelectedTier(tier)}
                      className="mt-1 text-[#0D9488] focus:ring-[#0D9488] border-slate-300"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-hanken text-sm font-bold text-slate-900">
                          {tier.name}
                        </span>
                        <span className="font-hanken text-sm font-extrabold text-[#0D9488]">
                          {tier.amount} kr
                          <span className="text-xs text-slate-500 font-normal">/mo</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                        {tier.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Registration Form */}
            <form onSubmit={handlePartnerSubmit} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Astrid Lindén"
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="astrid@goteborg.se"
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
                  />
                </div>
              </div>

              {/* Payment Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPartnerPaymentMethod("autogiro")}
                    className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-semibold border transition-all ${
                      partnerPaymentMethod === "autogiro"
                        ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488] font-bold"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Autogiro / Bankgiro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPartnerPaymentMethod("card")}
                    className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-semibold border transition-all ${
                      partnerPaymentMethod === "card"
                        ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488] font-bold"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Debit / Credit Card</span>
                  </button>
                </div>
              </div>

              {/* Optional Swedish Personnummer for Tax Reduction */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">
                  Personnummer (valfritt för skattereduktion hos Skatteverket)
                </label>
                <input
                  type="text"
                  value={partnerPersonnummer}
                  onChange={(e) => setPartnerPersonnummer(e.target.value)}
                  placeholder="ÅÅÅÅMMDD-XXXX"
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none font-mono"
                />
              </div>

              {/* Status alerts */}
              {partnerSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
                  {partnerSuccessMsg}
                </div>
              )}
              {partnerErrorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800">
                  {partnerErrorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isPendingPartner}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-md transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95 mt-2"
              >
                <span>
                  {isPendingPartner
                    ? "Registrerar..."
                    : `Start Monthly Partnership (${selectedTier.amount} kr/mo)`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-center gap-1.5 text-center text-slate-500 text-xs">
            <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Cancel anytime with one click. Monthly ministry prayer letter included.</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CARD 3: International Friends & Card Checkout (Wide)     */}
      {/* ======================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-lg md:rounded-xl p-6 sm:p-8 shadow-sm font-inter space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#0D9488]" />
              <h2 className="font-hanken text-lg sm:text-xl font-bold text-slate-900">
                International Friends &amp; Card Checkout
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Giving from Norway, Denmark, Europe or across the global worship diaspora.
            </p>
          </div>

          {/* Controls: Single vs Recurring & Currency */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Frequency Toggle */}
            <div className="bg-slate-100 p-1 rounded-md flex items-center text-xs">
              <button
                type="button"
                onClick={() => setCardFrequency("one-time")}
                className={`px-3 py-1.5 rounded font-semibold transition-all ${
                  cardFrequency === "one-time"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setCardFrequency("monthly")}
                className={`px-3 py-1.5 rounded font-semibold transition-all ${
                  cardFrequency === "monthly"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-md text-xs">
              {(["SEK", "EUR", "USD", "NOK"] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1.5 rounded font-bold transition-all ${
                    currency === curr
                      ? "bg-[#0D9488] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Amount Input & Instant Payment Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          {/* Custom Amount */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Amount ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                {currency === "USD" ? "$" : currency === "EUR" ? "€" : "kr"}
              </span>
              <input
                type="number"
                value={cardAmount}
                onChange={(e) => setCardAmount(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-bold text-slate-900 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
              />
            </div>
          </div>

          {/* Secure Digital Express (Apple Pay & Google Pay) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Secure Digital Express
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isPendingCard}
                onClick={() => handleCardDonation("apple_pay")}
                className="flex-1 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Apple Pay</span>
              </button>
              <button
                type="button"
                disabled={isPendingCard}
                onClick={() => handleCardDonation("google_pay")}
                className="flex-1 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Google Pay</span>
              </button>
            </div>
          </div>

          {/* Direct Card Processing Button */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Card Processing
            </label>
            <button
              type="button"
              disabled={isPendingCard}
              onClick={() => handleCardDonation("card")}
              className="w-full py-2 bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-60 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>Credit / Debit Card via Stripe</span>
            </button>
          </div>
        </div>

        {/* Transaction success notification */}
        {cardSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800">
            {cardSuccessMsg}
          </div>
        )}

        {/* Trust Badges Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-slate-500 text-xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>Encrypted 256-bit SSL Banking Protocol via Stripe</span>
          </span>
          <div className="flex items-center gap-3 text-slate-400 font-bold text-[10px] tracking-wider">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>APPLE PAY</span>
            <span>AUTOGIRO</span>
          </div>
        </div>
      </div>

      {/* Interactive Swish Modal Dialog */}
      <SwishGivingModal
        isOpen={swishModalOpen}
        onClose={() => setSwishModalOpen(false)}
        initialAmount={swishAmount}
      />
    </section>
  );
};
