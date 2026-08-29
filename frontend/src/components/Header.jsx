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
    languages.find(
      (item) => item.code === language
    ) || languages[0];

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#eadfd5]/80
          bg-[#faf7f2]/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            relative
            mx-auto
            flex
            h-[64px]
            max-w-6xl
            items-center
            justify-between
            px-3.5
            sm:h-[78px]
            sm:px-6
          "
        >
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* MENU BUTTON */}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-[#3a2418]
                transition
                hover:bg-[#efe7dd]
                active:scale-95
                sm:h-11
                sm:w-11
              "
            >
              <Menu
                size={20}
                strokeWidth={1.8}
                className="sm:h-[22px] sm:w-[22px]"
              />
            </button>

            {/* DESKTOP LOGO */}

            <div className="hidden items-center gap-3 sm:flex">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#8b4f2f]
                  text-white
                  shadow-sm
                "
              >
                <Coffee
                  size={19}
                  strokeWidth={1.8}
                />
              </div>

              <div className="leading-none">
                <h1
                  className="
                    font-serif
                    text-[19px]
                    font-semibold
                    tracking-[0.08em]
                    text-[#3a2418]
                  "
                >
                  CAFETERIA
                </h1>

                <p
                  className="
                    mt-1
                    text-[9px]
                    tracking-[0.18em]
                    text-[#8c7c70]
                  "
                >
                  GOOD COFFEE. GOOD MOOD.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              MOBILE LOGO
          ================================================= */}

          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              text-center
              sm:hidden
            "
          >
            <div className="flex items-center justify-center gap-1">
              <Coffee
                size={15}
                className="text-[#8b4f2f]"
                strokeWidth={2}
              />

              <h1
                className="
                  font-serif
                  text-[15px]
                  font-semibold
                  tracking-[0.07em]
                  text-[#3a2418]
                "
              >
                CAFETERIA
              </h1>
            </div>

            <p
              className="
                mt-0.5
                text-[7px]
                tracking-[0.13em]
                text-[#8c7c70]
              "
            >
              GOOD COFFEE. GOOD MOOD.
            </p>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="flex items-center gap-0.5 sm:gap-2">
            {/* CART */}

            <button
              type="button"
              aria-label="Shopping cart"
              className="
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-[#3a2418]
                transition
                hover:bg-[#efe7dd]
                active:scale-95
                sm:h-11
                sm:w-11
              "
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.8}
                className="sm:h-[21px] sm:w-[21px]"
              />

              <span
                className="
                  absolute
                  right-[2px]
                  top-[1px]
                  flex
                  h-[15px]
                  min-w-[15px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#8b4f2f]
                  px-1
                  text-[8px]
                  font-semibold
                  text-white
                  sm:right-[4px]
                  sm:top-[3px]
                  sm:h-[17px]
                  sm:min-w-[17px]
                  sm:text-[9px]
                "
              >
                0
              </span>
            </button>

            {/* LANGUAGE */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setLanguageOpen(
                    (previous) => !previous
                  )
                }
                aria-haspopup="menu"
                aria-expanded={languageOpen}
                className="
                  flex
                  h-9
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-[#ddcec2]
                  bg-white/70
                  px-2.5
                  text-[11px]
                  font-medium
                  text-[#3a2418]
                  shadow-sm
                  transition
                  hover:border-[#b8896e]
                  hover:bg-white
                  active:scale-95
                  sm:h-11
                  sm:gap-1.5
                  sm:px-3.5
                  sm:text-sm
                "
              >
                <span>
                  {currentLanguage.short}
                </span>

                <ChevronDown
                  size={13}
                  className={`
                    transition-transform
                    duration-200
                    sm:h-[15px]
                    sm:w-[15px]
                    ${
                      languageOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {/* LANGUAGE DROPDOWN */}

              {languageOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-[calc(100%+8px)]
                    w-44
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#eadfd5]
                    bg-white
                    p-1.5
                    shadow-[0_16px_40px_rgba(58,36,24,0.12)]
                    sm:top-[calc(100%+10px)]
                    sm:w-48
                    sm:p-2
                  "
                >
                  <div className="px-2.5 pb-1.5 pt-2 sm:px-3 sm:pb-2">
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-[#9b887a]
                        sm:text-[10px]
                      "
                    >
                      Language
                    </p>
                  </div>

                  {languages.map((item) => {
                    const active =
                      item.code === language;

                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          changeLanguage(
                            item.code
                          );
                          setLanguageOpen(false);
                        }}
                        className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-xl
                          px-2.5
                          py-2.5
                          text-left
                          transition
                          sm:px-3
                          sm:py-3
                          ${
                            active
                              ? "bg-[#8b4f2f] text-white"
                              : "text-[#3a2418] hover:bg-[#f5eee7]"
                          }
                        `}
                      >
                        <span className="text-xs font-medium sm:text-sm">
                          {item.label}
                        </span>

                        <span
                          className={`
                            text-[10px]
                            sm:text-xs
                            ${
                              active
                                ? "text-white/80"
                                : "text-[#9b887a]"
                            }
                          `}
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

      {/* =====================================================
          MOBILE SIDE MENU
      ===================================================== */}

      {menuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* OVERLAY */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="
              absolute
              inset-0
              bg-[#241a15]/40
              backdrop-blur-sm
            "
          />

          {/* DRAWER */}

          <aside
            className="
              relative
              h-full
              w-[78%]
              max-w-sm
              bg-[#faf7f2]
              p-5
              shadow-2xl
              sm:w-[82%]
              sm:p-6
            "
          >
            {/* DRAWER HEADER */}

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Coffee
                    size={19}
                    className="text-[#8b4f2f]"
                  />

                  <span
                    className="
                      font-serif
                      text-lg
                      font-semibold
                      tracking-wide
                      text-[#3a2418]
                      sm:text-xl
                    "
                  >
                    CAFETERIA
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-[#8c7c70] sm:text-xs">
                  Good coffee. Good mood.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  hover:bg-[#efe7dd]
                  sm:h-10
                  sm:w-10
                "
              >
                <X
                  size={19}
                  className="sm:h-[21px] sm:w-[21px]"
                />
              </button>
            </div>

            {/* DIVIDER */}

            <div className="my-6 h-px bg-[#eadfd5] sm:my-7" />

            {/* NAVIGATION */}

            <nav className="space-y-1.5 sm:space-y-2">
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
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="
                    w-full
                    rounded-xl
                    px-3.5
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-[#3a2418]
                    transition
                    hover:bg-[#efe7dd]
                    sm:rounded-2xl
                    sm:px-4
                    sm:py-4
                    sm:text-base
                  "
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* WELCOME CARD */}

            <div
              className="
                absolute
                bottom-5
                left-5
                right-5
                rounded-2xl
                bg-[#3a2418]
                p-4
                text-white
                sm:bottom-7
                sm:left-6
                sm:right-6
                sm:p-5
              "
            >
              <p className="text-sm font-medium">
                Welcome to Cafeteria ☕
              </p>

              <p className="mt-1 text-[11px] leading-5 text-white/65 sm:text-xs">
                Fresh coffee, delicious food and
                good moments.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;