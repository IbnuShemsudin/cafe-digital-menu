import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { translations } from "../data/translations";

const LanguageContext = createContext();

const supportedLanguages = ["am", "en", "om"];

// =========================================================
// DEFAULT LANGUAGE
// =========================================================

const DEFAULT_LANGUAGE = "am";

// =========================================================
// LANGUAGE PROVIDER
// =========================================================

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage =
      localStorage.getItem("cafe-language");

    /*
    ---------------------------------------------------------
    If the customer has previously selected a language,
    restore that language.
    ---------------------------------------------------------
    */

    if (
      savedLanguage &&
      supportedLanguages.includes(savedLanguage)
    ) {
      return savedLanguage;
    }

    /*
    ---------------------------------------------------------
    New customer/device:
    DEFAULT = AMHARIC
    ---------------------------------------------------------
    */

    return DEFAULT_LANGUAGE;
  });

  // =======================================================
  // SAVE LANGUAGE
  // =======================================================

  useEffect(() => {
    localStorage.setItem(
      "cafe-language",
      language
    );

    // Set browser document language
    document.documentElement.lang = language;

    // Amharic, English and Afaan Oromoo use LTR
    document.documentElement.dir = "ltr";
  }, [language]);

  // =======================================================
  // CHANGE LANGUAGE
  // =======================================================

  const changeLanguage = (newLanguage) => {
    if (
      !supportedLanguages.includes(
        newLanguage
      )
    ) {
      return;
    }

    setLanguage(newLanguage);
  };

  // =======================================================
  // TRANSLATION
  // =======================================================

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations.am?.[key] ||
      key
    );
  };

  // =======================================================
  // LOCALIZED DATABASE TEXT
  // =======================================================

  const getLocalizedText = (value) => {
    if (!value) return "";

    /*
    If the database contains a normal string,
    return it directly.
    */

    if (typeof value === "string") {
      return value;
    }

    /*
    Try selected language first.

    If that translation doesn't exist,
    fall back to Amharic.

    Finally fall back to English.
    */

    return (
      value[language] ||
      value.am ||
      value.en ||
      ""
    );
  };

  // =======================================================
  // PROVIDER
  // =======================================================

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

// =========================================================
// USE LANGUAGE
// =========================================================

export const useLanguage = () => {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
};
