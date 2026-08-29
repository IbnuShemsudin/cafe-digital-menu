import { ArrowRight, Coffee } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Hero = ({ onSpecialsClick }) => {
  const { t } = useLanguage();

  return (
    <section className="mt-6">

      <div className="relative min-h-[300px] overflow-hidden rounded-[28px] bg-[#3a2418] shadow-[0_20px_50px_rgba(58,36,24,0.18)] sm:min-h-[360px]">

        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85"
          alt="Fresh coffee"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#24140d]/90 via-[#24140d]/60 to-transparent" />

        <div className="relative flex min-h-[300px] max-w-xl flex-col justify-center px-7 py-10 sm:min-h-[360px] sm:px-10">

          <div className="flex items-center gap-2 text-[#e8b77f]">
            <Coffee size={17} />

            <span className="text-sm font-medium">
              {t("goodMorning")} ☀️
            </span>
          </div>

          <h2 className="mt-3 max-w-md font-serif text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {t("startYourDay")}
          </h2>

          <button
            type="button"
            onClick={onSpecialsClick}
            className="mt-7 flex w-fit items-center gap-3 rounded-full bg-[#a8663d] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#b9764b] active:scale-95"
          >
            {t("viewSpecials")}

            <ArrowRight size={17} />
          </button>

        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="h-1.5 w-7 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        </div>

      </div>

    </section>
  );
};

export default Hero;