import { ArrowRight, Coffee } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Hero = ({ onSpecialsClick }) => {
  const { t } = useLanguage();

  return (
    <section className="mt-4 sm:mt-6">
      <div
        className="
          relative
          min-h-[235px]
          overflow-hidden
          rounded-[22px]
          bg-[#3a2418]
          shadow-[0_14px_35px_rgba(58,36,24,0.14)]
          sm:min-h-[360px]
          sm:rounded-[28px]
          sm:shadow-[0_20px_50px_rgba(58,36,24,0.18)]
        "
      >
        {/* BACKGROUND IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85"
          alt="Fresh coffee"
          className="
            absolute inset-0
            h-full w-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#24140d]/90
            via-[#24140d]/65
            to-[#24140d]/10
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            flex
            min-h-[235px]
            max-w-xl
            flex-col
            justify-center
            px-5
            py-7
            sm:min-h-[360px]
            sm:px-10
            sm:py-10
          "
        >
          {/* GREETING */}
          <div className="flex items-center gap-1.5 text-[#e8b77f] sm:gap-2">
            <Coffee
              size={15}
              strokeWidth={1.8}
              className="sm:h-[17px] sm:w-[17px]"
            />

            <span className="text-[11px] font-medium sm:text-sm">
              {t("goodMorning")} 
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-2
              max-w-[280px]
              font-serif
              text-[27px]
              font-semibold
              leading-[1.08]
              text-white
              sm:mt-3
              sm:max-w-md
              sm:text-5xl
              sm:leading-tight
            "
          >
            {t("startYourDay")}
          </h2>

          {/* BUTTON */}
          <button
            type="button"
            onClick={onSpecialsClick}
            className="
              mt-5
              flex
              w-fit
              items-center
              gap-2.5
              rounded-full
              bg-[#a8663d]
              px-4
              py-2.5
              text-[12px]
              font-semibold
              text-white
              shadow-lg
              transition
              hover:bg-[#b9764b]
              active:scale-95
              sm:mt-7
              sm:gap-3
              sm:px-5
              sm:py-3
              sm:text-sm
            "
          >
            {t("viewSpecials")}

            <ArrowRight
              size={15}
              className="sm:h-[17px] sm:w-[17px]"
            />
          </button>
        </div>

        {/* SLIDER INDICATORS */}
        <div
          className="
            absolute
            bottom-4
            left-1/2
            flex
            -translate-x-1/2
            gap-1.5
            sm:bottom-5
          "
        >
          <span className="h-1.5 w-6 rounded-full bg-white sm:w-7" />

          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />

          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;