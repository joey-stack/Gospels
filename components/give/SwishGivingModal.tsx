"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, ShieldCheck, Copy, Check, ExternalLink, HelpCircle, Edit2 } from "lucide-react";

interface SwishGivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
}

export const SwishGivingModal: React.FC<SwishGivingModalProps> = ({
  isOpen,
  onClose,
  initialAmount = 150,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [customInput, setCustomInput] = useState<string>(initialAmount.toString());
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(298); // 04:58

  useEffect(() => {
    setAmount(initialAmount);
    setCustomInput(initialAmount.toString());
  }, [initialAmount]);

  // Countdown timer simulation for BankID session
  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(298);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 298));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomInput(val.toString());
    setIsEditingAmount(false);
  };

  const handleCustomApply = () => {
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
      setIsEditingAmount(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#FAFBFD] text-[#0F172A] rounded-lg md:rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-6 font-inter"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center border border-[#0D9488]/20">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-hanken font-bold text-base sm:text-lg text-slate-900 leading-tight">
                    Gåva via Swish
                  </h3>
                  <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                    GOSPELS GÖTEBORG
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                aria-label="Stäng Swish-ruta"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Organization Trust Card */}
              <div className="p-3.5 bg-white border border-slate-200/90 rounded-md shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-hanken">
                      GOSPELS Ideell Förening
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Org.nr: 802490-1234 • 90-konto godkänt
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    BankID Verifierad
                  </span>
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 text-[10px] font-semibold">
                    Officiell
                  </span>
                </div>
              </div>

              {/* Chosen Gift Amount Card */}
              <div className="p-4 bg-white border border-slate-200/90 rounded-md shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Valt gåvobelopp</span>
                  <button
                    type="button"
                    onClick={() => setIsEditingAmount(!isEditingAmount)}
                    className="text-xs font-semibold text-[#0D9488] hover:text-[#0F766E] flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>{isEditingAmount ? "Klar" : "Ändra belopp"}</span>
                  </button>
                </div>

                {isEditingAmount ? (
                  <div className="space-y-2 pt-1 pb-1">
                    <div className="grid grid-cols-4 gap-2">
                      {[50, 150, 300, 500].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className={`py-1.5 text-xs font-semibold rounded border transition-colors ${
                            amount === preset
                              ? "bg-[#0D9488] text-white border-[#0D9488]"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {preset} kr
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                          kr
                        </span>
                        <input
                          type="number"
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none"
                          placeholder="Annat belopp"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleCustomApply}
                        className="px-3 py-1.5 bg-[#0D9488] text-white text-xs font-semibold rounded hover:bg-[#0F766E]"
                      >
                        Spara
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-hanken text-3xl font-extrabold text-slate-900">
                        {amount}
                      </span>
                      <span className="text-sm font-bold text-slate-600">SEK</span>
                    </div>

                    <span className="px-2.5 py-1 rounded bg-teal-50 border border-teal-100 text-teal-800 text-xs font-medium">
                      Gemenskap &amp; Lovsång
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Ändamål: Kollekten · Musikerstöd &amp; Lovsång</span>
                  <span className="font-semibold text-slate-700">Göteborg 2026</span>
                </div>
              </div>

              {/* QR Code Canvas */}
              <div className="p-5 bg-white border border-slate-200/90 rounded-md shadow-xs text-center space-y-4">
                {/* Validity Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Giltig i <strong className="font-mono text-slate-900">{formatTimer(secondsRemaining)}</strong></span>
                </div>

                {/* Styled Swish QR Graphic */}
                <div className="relative mx-auto w-48 h-48 sm:w-52 sm:h-52 p-3 bg-white border-2 border-slate-800/80 rounded-lg flex items-center justify-center shadow-inner">
                  {/* Custom SVG QR Representation */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-slate-900"
                    fill="currentColor"
                  >
                    {/* Corner 1 */}
                    <rect x="5" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="11" y="11" width="14" height="14" rx="1" />
                    {/* Corner 2 */}
                    <rect x="69" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="75" y="11" width="14" height="14" rx="1" />
                    {/* Corner 3 */}
                    <rect x="5" y="69" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="11" y="75" width="14" height="14" rx="1" />
                    
                    {/* Grid Pattern Dots */}
                    <circle cx="40" cy="10" r="2.5" />
                    <circle cx="48" cy="10" r="2.5" />
                    <circle cx="56" cy="10" r="2.5" />
                    <circle cx="44" cy="18" r="2.5" />
                    <circle cx="52" cy="18" r="2.5" />
                    <circle cx="60" cy="18" r="2.5" />
                    
                    <circle cx="10" cy="40" r="2.5" />
                    <circle cx="18" cy="40" r="2.5" />
                    <circle cx="10" cy="48" r="2.5" />
                    <circle cx="18" cy="48" r="2.5" />
                    <circle cx="10" cy="56" r="2.5" />
                    <circle cx="18" cy="56" r="2.5" />
                    
                    <circle cx="82" cy="40" r="2.5" />
                    <circle cx="90" cy="40" r="2.5" />
                    <circle cx="74" cy="48" r="2.5" />
                    <circle cx="82" cy="48" r="2.5" />
                    <circle cx="90" cy="56" r="2.5" />
                    
                    <circle cx="40" cy="82" r="2.5" />
                    <circle cx="48" cy="82" r="2.5" />
                    <circle cx="56" cy="82" r="2.5" />
                    <circle cx="44" cy="90" r="2.5" />
                    <circle cx="52" cy="90" r="2.5" />
                    <circle cx="60" cy="90" r="2.5" />
                    <circle cx="68" cy="90" r="2.5" />
                    
                    <circle cx="34" cy="34" r="2.5" />
                    <circle cx="66" cy="34" r="2.5" />
                    <circle cx="34" cy="66" r="2.5" />
                    <circle cx="66" cy="66" r="2.5" />
                  </svg>

                  {/* Central Swish Logo Badge */}
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center shadow-md">
                    <span className="text-[10px] font-black tracking-tight text-[#0D9488]">
                      SWISH
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Öppna Swish-appen på din telefon och scanna koden, eller klicka nedan för att öppna direkt.
                </p>

                {/* Mobile Direct Open Button */}
                <div className="space-y-2 pt-1">
                  <a
                    href={`swish://paymentrequest?token=GOSPELS-${amount}&amt=${amount}`}
                    className="w-full py-2.5 px-4 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold rounded-md shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Öppna Swish direkt i telefonen</span>
                  </a>

                  {/* Manual Swish Number & Copy */}
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs">
                    <div className="text-left">
                      <span className="text-[10px] text-slate-500 uppercase block">Swish-nummer</span>
                      <strong className="font-mono text-slate-900 font-bold">123 456 78 90</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy("1234567890")}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedNumber ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Kopierat!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Kopiera</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Help Link */}
            <div className="px-5 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Behöver du kvitto eller redovisningsstöd?</span>
              </span>
              <a
                href="mailto:ekonomi@gospelsgoteborg.se"
                className="font-semibold text-[#0D9488] hover:text-[#0F766E]"
              >
                Kontakta kassan
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
