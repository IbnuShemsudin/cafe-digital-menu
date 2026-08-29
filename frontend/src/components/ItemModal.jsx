import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Heart,
  Clock3,
  Leaf,
  Flame,
  ShoppingBag,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const ItemModal = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const { t, getLocalizedText } = useLanguage();

  if (!item) return null;

  const soldOut = item.availability === "sold-out";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">

        {/* BACKDROP */}
        <motion.button
          type="button"
          aria-label="Close"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#241a15]/55 backdrop-blur-sm"
        />

        {/* MODAL */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[30px] bg-[#faf7f2] shadow-2xl sm:rounded-[30px]"
        >

          {/* IMAGE */}
          <div className="relative h-[280px] sm:h-[340px]">

            <img
              src={item.image}
              alt={getLocalizedText(item.name)}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#3a2418] shadow-lg backdrop-blur-md transition hover:bg-white active:scale-90"
            >
              <X size={20} />
            </button>

            {/* Favorite */}
            <button
              type="button"
              onClick={() => onToggleFavorite(item.id)}
              className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition active:scale-90 ${
                isFavorite
                  ? "bg-white text-[#a94c4c]"
                  : "bg-white/90 text-[#3a2418]"
              }`}
            >
              <Heart
                size={20}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>

          </div>

          {/* CONTENT */}
          <div className="p-6 sm:p-8">

            <div className="flex items-start justify-between gap-5">

              <div>
                <h2 className="font-serif text-3xl font-semibold leading-tight text-[#3a2418]">
                  {getLocalizedText(item.name)}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">

                  {item.tags?.includes("vegan") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#e8f0e5] px-3 py-1.5 text-[11px] font-semibold text-[#52734e]">
                      <Leaf size={12} />
                      Vegan
                    </span>
                  )}

                  {item.tags?.includes("vegetarian") && (
                    <span className="rounded-full bg-[#e8f0e5] px-3 py-1.5 text-[11px] font-semibold text-[#52734e]">
                      Vegetarian
                    </span>
                  )}

                  {item.tags?.includes("spicy") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#f6e2dc] px-3 py-1.5 text-[11px] font-semibold text-[#9b4a38]">
                      <Flame size={12} />
                      Spicy
                    </span>
                  )}

                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] font-medium text-[#9b8c81]">
                  ETB
                </span>

                <p className="text-2xl font-bold text-[#3a2418]">
                  {item.price}
                </p>
              </div>

            </div>

            <div className="my-6 h-px bg-[#e7ddd5]" />

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#8b4f2f]">
                Description
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-[#665a52]">
                {getLocalizedText(item.description)}
              </p>
            </div>

            {/* PREPARATION */}
            {item.preparationTime && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe7dd] text-[#8b4f2f]">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="text-xs text-[#9b8c81]">
                    Preparation time
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-[#3a2418]">
                    {item.preparationTime}
                  </p>
                </div>
              </div>
            )}

            {/* ADD */}
            <button
              type="button"
              disabled={soldOut}
              className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#8b4f2f] text-sm font-bold text-white shadow-lg shadow-[#8b4f2f]/20 transition hover:bg-[#754126] active:scale-[0.99] disabled:bg-[#cfc6bf]"
            >
              <ShoppingBag size={19} />
              {soldOut ? t("soldOut") : t("addToCart")}
            </button>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default ItemModal;