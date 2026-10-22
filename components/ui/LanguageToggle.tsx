"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const LanguageToggle: React.FC<{ className?: string; size?: "sm" | "md" }> = ({
  className = "",
  size = "md",
}) => {
  const { language, setLanguage } = useLanguage();

  const isSmall = size === "sm";

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 select-none shadow-2xs ${className}`}
    >
      {/* English Toggle */}
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`${
          isSmall ? "px-2 py-0.5 text-[11px]" : "px-2.5 sm:px-3 py-1.5 text-xs"
        } font-semibold rounded-[4px] transition-all flex items-center gap-1 cursor-pointer ${
          language === "en"
            ? "bg-white dark:bg-[#0F172A] text-[#0D9488] dark:text-[#2DD4BF] shadow-xs font-bold border border-slate-200/60 dark:border-slate-700"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
        }`}
      >
        <span>ENG</span>
      </button>

      {/* Swedish Toggle */}
      <button
        type="button"
        onClick={() => setLanguage("sv")}
        aria-pressed={language === "sv"}
        className={`${
          isSmall ? "px-2 py-0.5 text-[11px]" : "px-2.5 sm:px-3 py-1.5 text-xs"
        } font-semibold rounded-[4px] transition-all flex items-center gap-1 cursor-pointer ${
          language === "sv"
            ? "bg-white dark:bg-[#0F172A] text-[#0D9488] dark:text-[#2DD4BF] shadow-xs font-bold border border-slate-200/60 dark:border-slate-700"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
        }`}
      >
        <span>SWE</span>
      </button>
    </div>
  );
};
