import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Coffee,
  Menu,
  X,
  LogIn,
  UserPlus,
  Globe2,
  ChevronDown,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const {
    language,
    setLanguage,
  } = useLanguage();

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setLanguageOpen(false);
  };

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

  const currentLanguage =
    languages.find(
      (item) => item.code === language
    ) || languages[0];

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setLanguageOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#C89550]/30 bg-[#FBF3E7]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3A281F] text-[#FBF3E7] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Coffee
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1 className="[font-family:'Fraunces',serif] text-xl font-semibold leading-none text-[#1F140D]">
              Cafe
            </h1>

            <p className="mt-1 [font-family:'IBM_Plex_Mono',monospace] text-[9px] uppercase tracking-[0.2em] text-[#B5502D]">
              Digital Menu
            </p>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="hidden items-center gap-3 sm:flex">

          {/* =================================================
              LANGUAGE PICKER
          ================================================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setLanguageOpen(!languageOpen)
              }
              className="flex items-center gap-2 rounded-[3px] border border-[#E4D3BE] bg-white/60 px-3.5 py-2.5 text-sm font-medium text-[#3A281F] transition hover:border-[#B5502D]/50 hover:bg-white"
            >
              <Globe2
                size={16}
                className="text-[#B5502D]"
              />

              <span>
                {currentLanguage.short}
              </span>

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  languageOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[#E4D3BE] bg-white p-1.5 shadow-xl">

                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() =>
                      handleLanguageChange(
                        item.code
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      language === item.code
                        ? "bg-[#B5502D]/10 font-semibold text-[#B5502D]"
                        : "text-[#3A281F] hover:bg-[#FBF3E7]"
                    }`}
                  >
                    <span>
                      {item.label}
                    </span>

                    {language === item.code && (
                      <span className="text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* =================================================
              ADMIN LOGIN
          ================================================= */}

          <NavLink
            to="/admin/login"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-[3px] border px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "border-[#B5502D] bg-[#B5502D]/10 text-[#B5502D]"
                  : "border-[#E4D3BE] bg-white/60 text-[#3A281F] hover:border-[#B5502D]/50 hover:bg-white"
              }`
            }
          >
            <LogIn size={16} />
            <span>Admin Login</span>
          </NavLink>

          {/* =================================================
              REGISTER
          ================================================= */}

          <NavLink
            to="/admin/register"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-[3px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all ${
                isActive
                  ? "bg-[#9C4324]"
                  : "bg-[#B5502D] hover:bg-[#9C4324]"
              }`
            }
          >
            <UserPlus size={16} />
            <span>Register</span>
          </NavLink>

        </nav>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#E4D3BE] bg-white/60 text-[#3A281F] transition hover:bg-white sm:hidden"
        >
          {mobileOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>

      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {mobileOpen && (
        <div className="border-t border-[#E4D3BE] bg-[#FBF3E7] px-4 pb-5 pt-4 sm:hidden">

          <div className="mx-auto flex max-w-6xl flex-col gap-2">

            {/* =================================================
                HOME
            ================================================= */}

            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `rounded-[3px] px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#B5502D]/10 text-[#B5502D]"
                    : "text-[#3A281F] hover:bg-white"
                }`
              }
            >
              Home
            </NavLink>

            {/* =================================================
                LANGUAGE
            ================================================= */}

            <div className="rounded-[3px] border border-[#E4D3BE] bg-white/60 p-2">

              <div className="mb-2 flex items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#8B6F5A]">
                <Globe2
                  size={15}
                  className="text-[#B5502D]"
                />

                Language
              </div>

              <div className="grid grid-cols-3 gap-1.5">

                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() =>
                      handleLanguageChange(
                        item.code
                      )
                    }
                    className={`rounded-[3px] px-2 py-2.5 text-xs font-medium transition ${
                      language === item.code
                        ? "bg-[#B5502D] text-white"
                        : "bg-[#FBF3E7] text-[#3A281F] hover:bg-[#E9D9C8]"
                    }`}
                  >
                    {item.short}
                  </button>
                ))}

              </div>

            </div>

            {/* =================================================
                ADMIN LOGIN
            ================================================= */}

            <NavLink
              to="/admin/login"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[3px] border px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-[#B5502D] bg-[#B5502D]/10 text-[#B5502D]"
                    : "border-[#E4D3BE] bg-white/60 text-[#3A281F] hover:bg-white"
                }`
              }
            >
              <LogIn size={17} />
              Admin Login
            </NavLink>

            {/* =================================================
                REGISTER
            ================================================= */}

            <NavLink
              to="/admin/register"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[3px] px-4 py-3 text-sm font-semibold text-white transition ${
                  isActive
                    ? "bg-[#9C4324]"
                    : "bg-[#B5502D] hover:bg-[#9C4324]"
                }`
              }
            >
              <UserPlus size={17} />
              Register
            </NavLink>

          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
