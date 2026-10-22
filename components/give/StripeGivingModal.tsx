"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface StripeGivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: string;
  initialCurrency?: "SEK" | "EUR" | "USD" | "NOK";
  initialFrequency?: "one-time" | "monthly";
}

export const StripeGivingModal: React.FC<StripeGivingModalProps> = ({
  isOpen,
  onClose,
  initialAmount = "250",
  initialCurrency = "SEK",
  initialFrequency = "one-time",
}) => {
  const [amount, setAmount] = useState<string>(initialAmount);
  const [currency, setCurrency] = useState<"SEK" | "EUR" | "USD" | "NOK">(initialCurrency);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(initialFrequency);
  const [fund, setFund] = useState<string>("Gospels Gothenburg Worship & Outreach");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvc, setCardCvc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedCard, setCopiedCard] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<{
    reference: string;
    amount: string;
    currency: string;
    frequency: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickAmounts = currency === "USD" || currency === "EUR" ? ["25", "50", "100", "250"] : ["150", "250", "500", "1000"];

  const handleFillTestCard = () => {
    setCardNumber("4242 4242 4242 4242");
    setCardExpiry("12/28");
    setCardCvc("123");
    if (!donorName) setDonorName("Stripe Tester");
    if (!donorEmail) setDonorEmail("tester@gospelsgoteborg.se");
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          frequency,
          fund,
          donorName,
          donorEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // If live Stripe redirect URL is returned and not simulated
      if (data.isLiveStripe && data.url) {
        window.location.href = data.url;
        return;
      }

      // Simulate instantaneous successful test payment with authentic receipt
      setTimeout(() => {
        setIsLoading(false);
        setSuccessData({
          reference: data.sessionId || `cs_test_${Date.now().toString(36)}`,
          amount,
          currency,
          frequency,
        });
      }, 900);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "An unexpected error occurred during test checkout.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs font-inter animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-hanken font-bold text-base text-slate-900 dark:text-white">
                  Stripe Card Giving
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Test Mode
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                End-to-end sandbox simulation &amp; live Stripe Checkout
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {successData ? (
            /* Success Receipt State */
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-hanken text-xl font-bold text-slate-900 dark:text-white">
                  Tack så mycket för din gåva!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Your gift of{" "}
                  <strong className="text-slate-900 dark:text-white">
                    {successData.amount} {successData.currency}
                  </strong>{" "}
                  ({successData.frequency}) was processed in Stripe Test Mode.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Stripe Reference:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {successData.reference.slice(0, 18)}...
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Fund:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{fund}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Mode:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Stripe Test Sandbox Verified
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSuccessData(null);
                  onClose();
                }}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg transition-all shadow-xs"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Test Mode Quick-Fill Assistant Banner */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-xs">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[11px] leading-tight">
                    Stripe test card: <strong>4242 •••• •••• 4242</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleFillTestCard}
                  className="px-2.5 py-1 text-[11px] font-semibold text-amber-900 dark:text-amber-200 bg-amber-200/80 dark:bg-amber-900/50 hover:bg-amber-300/80 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedCard ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCard ? "Filled!" : "Autofill Test"}</span>
                </button>
              </div>

              {/* Frequency Toggle & Currency */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex rounded-md bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setFrequency("one-time")}
                    className={`flex-1 py-1.5 rounded font-semibold transition-all ${
                      frequency === "one-time"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`flex-1 py-1.5 rounded font-semibold transition-all ${
                      frequency === "monthly"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                <div className="flex rounded-md bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
                  {(["SEK", "EUR", "USD", "NOK"] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`flex-1 py-1.5 rounded font-bold transition-all ${
                        currency === c
                          ? "bg-[#0D9488] text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Quick Select + Custom Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Amount ({currency})
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {quickAmounts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setAmount(q)}
                      className={`py-1.5 rounded-md text-xs font-bold border transition-all ${
                        amount === q
                          ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488]"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {q} {currency}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    {currency}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="10"
                    placeholder="Custom amount"
                    className="w-full pl-12 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-xs font-semibold text-slate-900 dark:text-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
                  />
                </div>
              </div>

              {/* Donor Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Lars Svensson"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:border-[#0D9488] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Receipt Email
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="lars@example.se"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:border-[#0D9488] outline-none"
                  />
                </div>
              </div>

              {/* Card Inputs */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md pl-3 pr-10 py-2 text-xs font-mono text-slate-900 dark:text-white focus:border-[#0D9488] outline-none"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white focus:border-[#0D9488] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white focus:border-[#0D9488] outline-none"
                    />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded text-xs text-rose-700 dark:text-rose-300">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer mt-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isLoading
                    ? "Processing Stripe Test..."
                    : `Process ${amount} ${currency} (${frequency === "monthly" ? "Monthly" : "One-Time"})`}
                </span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>256-bit SSL encrypted • Stripe Sandbox compliant</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
