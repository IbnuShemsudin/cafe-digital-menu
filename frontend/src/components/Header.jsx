import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Coffee,
  ShoppingBag,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const languages = [
  {
    code: "en",
    label: "English",
    short: "EN",
  },
  {
    code: "am",
    label: "አማርኛ",
    short: "አማ",
  },
  {
    code: "om",
    label: "Afaan Oromoo",
    short: "OM",
  },
];

const Header = () => {
  const { language, changeLanguage } = useLanguage();

  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLanguage =
    languages.find((item) => item.code === language) || languages[0];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#eadfd5]/80 bg-[#faf7f2]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-6xl items-center justify-between px-5 sm:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#3a2418] transition hover:bg-[#efe7dd] active:scale-95"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>

            {/* Desktop logo */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b4f2f] text-white shadow-sm">
                <Coffee size={19} strokeWidth={1.8} />
              </div>

              <div className="leading-none">
                <h1 className="font-serif text-[19px] font-semibold tracking-[0.08em] text-[#3a2418]">
                  CAFETERIA
                </h1>

                <p className="mt-1 text-[9px] tracking-[0.18em] text-[#8c7c70]">
                  GOOD COFFEE. GOOD MOOD.
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center sm:hidden">
            <div className="flex items-center justify-center gap-1.5">
              <Coffee
                size={17}
                className="text-[#8b4f2f]"
                strokeWidth={2}
              />

              <h1 className="font-serif text-[17px] font-semibold tracking-[0.08em] text-[#3a2418]">
                CAFETERIA
              </h1>
            </div>

            <p className="mt-1 text-[8px] tracking-[0.15em] text-[#8c7c70]">
              GOOD COFFEE. GOOD MOOD.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            {/* Cart */}
            <button
              type="button"
              aria-label="Shopping cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#3a2418] transition hover:bg-[#efe7dd] active:scale-95"
            >
              <ShoppingBag size={21} strokeWidth={1.8} />

              <span className="absolute right-[4px] top-[3px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#8b4f2f] px-1 text-[9px] font-semibold text-white">
                0
              </span>
            </button>

            {/* Language */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setLanguageOpen((previous) => !previous)
                }
                aria-haspopup="menu"
                aria-expanded={languageOpen}
                className="flex h-11 items-center gap-1.5 rounded-full border border-[#ddcec2] bg-white/70 px-3.5 text-sm font-medium text-[#3a2418] shadow-sm transition hover:border-[#b8896e] hover:bg-white active:scale-95"
              >
                <span>{currentLanguage.short}</span>

                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    languageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-48 overflow-hidden rounded-2xl border border-[#eadfd5] bg-white p-2 shadow-[0_16px_40px_rgba(58,36,24,0.12)]">
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9b887a]">
                      Language
                    </p>
                  </div>

                  {languages.map((item) => {
                    const active = item.code === language;

                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          changeLanguage(item.code);
                          setLanguageOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                          active
                            ? "bg-[#8b4f2f] text-white"
                            : "text-[#3a2418] hover:bg-[#f5eee7]"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>

                        <span
                          className={`text-xs ${
                            active
                              ? "text-white/80"
                              : "text-[#9b887a]"
                          }`}
                        >
                          {item.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-[#241a15]/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="relative h-full w-[82%] max-w-sm bg-[#faf7f2] p-6 shadow-2xl">

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Coffee
                    size={20}
                    className="text-[#8b4f2f]"
                  />

                  <span className="font-serif text-xl font-semibold tracking-wide text-[#3a2418]">
                    CAFETERIA
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#8c7c70]">
                  Good coffee. Good mood.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#efe7dd]"
              >
                <X size={21} />
              </button>
            </div>

            <div className="my-7 h-px bg-[#eadfd5]" />

            <nav className="space-y-2">
              {[
                "Home",
                "Menu",
                "Favorites",
                "About",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-2xl px-4 py-4 text-left text-base font-medium text-[#3a2418] transition hover:bg-[#efe7dd]"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-7 left-6 right-6 rounded-2xl bg-[#3a2418] p-5 text-white">
              <p className="text-sm font-medium">
                Welcome to Cafeteria ☕
              </p>

              <p className="mt-1 text-xs leading-5 text-white/65">
                Fresh coffee, delicious food and good moments.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;