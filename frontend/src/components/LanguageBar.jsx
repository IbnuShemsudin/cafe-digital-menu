import { Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function LanguageBar() {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    {
      code: "en",
      label: "English",
      shortLabel: "EN",
    },
    {
      code: "am",
      label: "አማርኛ",
      shortLabel: "አማ",
    },
    {
      code: "om",
      label: "Afaan Oromoo",
      shortLabel: "OM",
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Soft background gradient */}
      <div className="pointer-events-none absolute inset-0 -top-10 bg-gradient-to-t from-[#faf7f2] via-[#faf7f2]/90 to-transparent" />

      <div className="relative border-t border-[#E4D3BE]/80 bg-white/90 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        <div className="mx-auto max-w-lg">
          {/* Language Tabs */}
          <div className="grid grid-cols-3 rounded-2xl border border-[#E4D3BE] bg-[#F7F1EB] p-1.5 shadow-sm">
            {languages.map((item) => {
              const isActive = language === item.code;

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => changeLanguage(item.code)}
                  aria-label={`Change language to ${item.label}`}
                  aria-pressed={isActive}
                  className={`
                    group relative flex min-h-[52px] items-center justify-center
                    rounded-xl px-2 py-2.5
                    text-center text-xs font-semibold
                    transition-all duration-300
                    sm:text-sm
                    ${
                      isActive
                        ? `
                          bg-[#B5502D]
                          text-white
                          shadow-lg
                          shadow-[#B5502D]/25
                          scale-[1.02]
                        `
                        : `
                          text-[#756056]
                          hover:bg-white
                          hover:text-[#3A2818]
                        `
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}

                  <div className="flex flex-col items-center">
                    {/* Mobile abbreviation */}
                    <span className="sm:hidden">
                      {item.code === "en"
                        ? "English"
                        : item.shortLabel}
                    </span>

                    {/* Desktop/full label */}
                    <span className="hidden sm:block">
                      {item.label}
                    </span>

                    {/* Small active line */}
                    {isActive && (
                      <span className="mt-1 h-0.5 w-5 rounded-full bg-white/70" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Small hint */}
          <p className="mt-2 text-center text-[10px] font-medium tracking-wide text-[#A27A60]">
            Select your preferred language
          </p>
        </div>
      </div>
    </div>
  );
}

export default LanguageBar;