import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

const supportedLanguages = ["en", "am", "om"];

const detectBrowserLanguage = () => {
  const browserLanguage = navigator.language?.toLowerCase() || "en";

  if (browserLanguage.startsWith("am")) {
    return "am";
  }

  if (
    browserLanguage.startsWith("om") ||
    browserLanguage.startsWith("or")
  ) {
    return "om";
  }

  return "en";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("cafe-language");

    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }

    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("cafe-language", language);

    document.documentElement.lang = language;

    if (language === "am") {
      document.documentElement.dir = "ltr";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (!supportedLanguages.includes(newLanguage)) return;

    setLanguage(newLanguage);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const getLocalizedText = (value) => {
    if (!value) return "";

    if (typeof value === "string") {
      return value;
    }

    return value[language] || value.en || "";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        getLocalizedText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
};