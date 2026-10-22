"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/lib/translations";

export type { Language };

interface LanguageContextType {
  language: Language;
  isSv: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof translations)["en"];
}

const defaultContext: LanguageContextType = {
  language: "en",
  isSv: false,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.en,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Sync with localStorage on client mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gospels_language") as Language;
      if (saved === "en" || saved === "sv") {
        setLanguage(saved);
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("gospels_language", lang);
    } catch (e) {
      // Ignore localStorage errors
    }
  };

  const toggleLanguage = () => {
    handleSetLanguage(language === "en" ? "sv" : "en");
  };

  const isSv = language === "sv";
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        isSv,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
