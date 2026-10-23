"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ShieldCheck, Church, ArrowRight, Loader2, FileText } from "lucide-react";
import { submitPartnerChurchRegistration } from "@/app/actions";

interface PartnerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerRegistrationModal: React.FC<PartnerRegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);

    try {
      const res = await submitPartnerChurchRegistration(formData);
      if (res.success) {
        setSuccessData(res.data);
      } else {
        if (res.errors) {
          setFieldErrors(res.errors);
        }
        setErrorMessage(res.message || "Please correct the highlighted fields.");
      }
    } catch (err: any) {
      setErrorMessage("Network error occurred. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setErrorMessage(null);
    setFieldErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F172A]/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="bg-[#0A1530] text-white p-6 sm:p-7 relative">
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#2DD4BF] mb-2 font-inter">
                <ShieldCheck className="w-4 h-4" />
                <span>ECUMENICAL COVENANT REGISTRATION</span>
              </div>
              <h3 className="font-hanken text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Register as a Partner Church
              </h3>
              <p className="font-inter text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
                Enter your fellowship into the Gothenburg Gospels Ministry Network. Unite in regional concerts, joint choir rehearsals, and 24/7 prayer coverage.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {successData ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0D9488] flex items-center justify-center mx-auto mb-4 border border-[#0D9488]/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-hanken text-2xl font-bold text-slate-900 mb-2">
                    Covenant Registration Confirmed
                  </h4>
                  <p className="font-inter text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">{successData.churchName}</strong> has been enrolled into the GOSPELS Gothenburg Ecumenical Network. A welcome packet and choir rehearsal schedule have been dispatched to <strong className="text-slate-900 font-semibold">{successData.email}</strong>.
                  </p>

                  <div className="bg-[#F8F9FF] p-4 rounded-md border border-slate-200/80 text-left max-w-md mx-auto text-xs font-inter space-y-2 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Covenant ID:</span>
                      <span className="font-mono font-semibold text-slate-900">{successData.id}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tradition / Stream:</span>
                      <span className="font-semibold text-slate-900">{successData.tradition}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Ministerial Lead:</span>
                      <span className="font-semibold text-slate-900">{successData.contactName}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Area of Collaboration:</span>
                      <span className="font-semibold text-slate-900">{successData.collaborationRole}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-8 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold rounded-md transition-colors"
                  >
                    Done &amp; Return to Directory
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs font-inter">
                      {errorMessage}
                    </div>
                  )}

                  {/* Church & Tradition Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                        Church / Congregation Name *
                      </label>
                      <input
                        type="text"
                        name="churchName"
                        required
                        placeholder="e.g. Vasakyrkan Göteborg"
                        className="w-full px-3.5 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none"
                      />
                      {fieldErrors.churchName && (
                        <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.churchName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                        Denominational Stream *
                      </label>
                      <select
                        name="tradition"
                        defaultValue="Evangelical / Pingst"
                        className="w-full px-3 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none bg-white"
                      >
                        <option value="Evangelical / Pingst">Evangelical · Pingst</option>
                        <option value="Church of Sweden (Svenska Kyrkan)">Church of Sweden (Svenska Kyrkan)</option>
                        <option value="Salvation Army (Frälsningsarmén)">The Salvation Army (Frälsningsarmén)</option>
                        <option value="International / Pentecostal">International / Pentecostal</option>
                        <option value="Independent / Ecumenical">Independent / Ecumenical</option>
                        <option value="Baptist / Evangelical">Baptist / Evangelical</option>
                      </select>
                    </div>
                  </div>

                  {/* Minister & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                        Lead Pastor / Worship Director *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        placeholder="e.g. Pastor Tomas Sjödin"
                        className="w-full px-3.5 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none"
                      />
                      {fieldErrors.contactName && (
                        <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.contactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                        Ministerial Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="pastor@church.se"
                        className="w-full px-3.5 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none"
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & District Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+46 31 000 00 00"
                        className="w-full px-3.5 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                        Gothenburg District *
                      </label>
                      <select
                        name="district"
                        defaultValue="Centrum & Haga"
                        className="w-full px-3 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none bg-white"
                      >
                        <option value="Lindholmen & Hisingen">Lindholmen &amp; Hisingen</option>
                        <option value="Centrum & Haga">Centrum &amp; Haga</option>
                        <option value="Majorna & Linné">Majorna &amp; Linné</option>
                        <option value="Västra Frölunda">Västra Frölunda</option>
                        <option value="Östra Göteborg & Angered">Östra Göteborg &amp; Angered</option>
                        <option value="Regional Västra Götaland">Regional Västra Götaland</option>
                      </select>
                    </div>
                  </div>

                  {/* Collaboration Role */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                      Primary Ministry Collaboration Role *
                    </label>
                    <select
                      name="collaborationRole"
                      defaultValue="Mass Choir Vocalists & Section Leaders"
                      className="w-full px-3 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none bg-white"
                    >
                      <option value="Mass Choir Vocalists & Section Leaders">
                        Mass Choir Vocalists &amp; Section Leaders
                      </option>
                      <option value="Live Rhythm Section & Horn Musicians">
                        Live Rhythm Section &amp; Horn Musicians
                      </option>
                      <option value="Venue & Sanctuary Hosting for Regional Concerts">
                        Venue &amp; Sanctuary Hosting for Regional Concerts
                      </option>
                      <option value="24/7 City Intercession & Prayer Vigils">
                        24/7 City Intercession &amp; Prayer Vigils
                      </option>
                      <option value="Youth & Campus Student Outreach">
                        Youth &amp; Campus Student Outreach
                      </option>
                    </select>
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1 font-inter">
                      Additional Message / Choir Strengths (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Share details on your choir size, musical instruments, or upcoming church gatherings..."
                      className="w-full px-3.5 py-2 text-xs font-inter border border-slate-300 rounded focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] outline-none resize-none"
                    />
                  </div>

                  {/* Covenant Checkbox */}
                  <div className="bg-[#F8F9FF] p-3.5 rounded border border-slate-200">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-inter text-slate-700">
                      <input
                        type="checkbox"
                        name="covenantAgreed"
                        required
                        className="mt-0.5 rounded text-[#0D9488] focus:ring-[#0D9488]/20"
                      />
                      <span>
                        We affirm the <strong>Gothenburg Ecumenical Covenant</strong> to lift Jesus in unity through gospel music, prayer, and mutual fellowship with zero denominational compromise.
                      </span>
                    </label>
                    {fieldErrors.covenantAgreed && (
                      <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.covenantAgreed}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-slate-400 text-white text-xs font-semibold rounded transition-colors flex items-center gap-2 shadow-xs"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Registering Fellowship...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Covenant Registration</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
