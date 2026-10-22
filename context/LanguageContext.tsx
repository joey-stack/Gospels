"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "sv";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
});

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

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
