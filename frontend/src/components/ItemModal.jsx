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
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          className="
            relative
            max-h-[90vh]
            w-full
            max-w-xl
            overflow-y-auto
            rounded-t-[24px]
            bg-[#faf7f2]
            shadow-2xl

            sm:max-h-[92vh]
            sm:rounded-[30px]
          "
        >

          {/* IMAGE */}
          <div
            className="
              relative
              h-[190px]
              xs:h-[210px]
              sm:h-[340px]
            "
          >

            <img
              src={item.image}
              alt={getLocalizedText(item.name)}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent sm:h-32" />

            {/* CLOSE */}
            <button
              type="button"
              onClick={onClose}
              className="
                absolute
                left-3
                top-3
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-[#3a2418]
                shadow-lg
                backdrop-blur-md
                transition
                hover:bg-white
                active:scale-90

                sm:left-5
                sm:top-5
                sm:h-11
                sm:w-11
              "
            >
              <X
                size={18}
                className="sm:h-5 sm:w-5"
              />
            </button>

            {/* FAVORITE */}
            <button
              type="button"
              onClick={() => onToggleFavorite(item._id || item.id)}
              className={`
                absolute
                right-3
                top-3
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                shadow-lg
                backdrop-blur-md
                transition
                active:scale-90

                sm:right-5
                sm:top-5
                sm:h-11
                sm:w-11

                ${
                  isFavorite
                    ? "bg-white text-[#a94c4c]"
                    : "bg-white/90 text-[#3a2418]"
                }
              `}
            >
              <Heart
                size={18}
                className="sm:h-5 sm:w-5"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>

          </div>

          {/* CONTENT */}
          <div className="p-4 sm:p-8">

            {/* TITLE + PRICE */}
            <div className="flex items-start justify-between gap-3 sm:gap-5">

              <div className="min-w-0">

                <h2
                  className="
                    font-serif
                    text-2xl
                    font-semibold
                    leading-tight
                    text-[#3a2418]

                    sm:text-3xl
                  "
                >
                  {getLocalizedText(item.name)}
                </h2>

                {/* TAGS */}
                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">

                  {item.tags?.includes("vegan") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#e8f0e5] px-2.5 py-1 text-[10px] font-semibold text-[#52734e] sm:px-3 sm:py-1.5 sm:text-[11px]">
                      <Leaf size={11} />
                      Vegan
                    </span>
                  )}

                  {item.tags?.includes("vegetarian") && (
                    <span className="rounded-full bg-[#e8f0e5] px-2.5 py-1 text-[10px] font-semibold text-[#52734e] sm:px-3 sm:py-1.5 sm:text-[11px]">
                      Vegetarian
                    </span>
                  )}

                  {item.tags?.includes("spicy") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#f6e2dc] px-2.5 py-1 text-[10px] font-semibold text-[#9b4a38] sm:px-3 sm:py-1.5 sm:text-[11px]">
                      <Flame size={11} />
                      Spicy
                    </span>
                  )}

                </div>

              </div>

              {/* PRICE */}
              <div className="shrink-0 text-right">

                <span className="text-[9px] font-medium text-[#9b8c81] sm:text-[11px]">
                  ETB
                </span>

                <p className="text-xl font-bold text-[#3a2418] sm:text-2xl">
                  {item.price}
                </p>

              </div>

            </div>

            {/* DIVIDER */}
            <div className="my-4 h-px bg-[#e7ddd5] sm:my-6" />

            {/* DESCRIPTION */}
            <div>

              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b4f2f] sm:text-sm">
                Description
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-[#665a52] sm:mt-3 sm:text-[15px] sm:leading-7">
                {getLocalizedText(item.description)}
              </p>

            </div>

            {/* PREPARATION */}
            {item.preparationTime && (
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-white p-3 sm:mt-6 sm:rounded-2xl sm:p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#efe7dd] text-[#8b4f2f] sm:h-10 sm:w-10">
                  <Clock3 size={17} />
                </div>

                <div>

                  <p className="text-[10px] text-[#9b8c81] sm:text-xs">
                    Preparation time
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-[#3a2418] sm:text-sm">
                    {item.preparationTime}
                  </p>

                </div>

              </div>
            )}

            {/* ADD TO CART */}
            <button
              type="button"
              disabled={soldOut}
              className="
                mt-5
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-[#8b4f2f]
                text-xs
                font-bold
                text-white
                shadow-lg
                shadow-[#8b4f2f]/20
                transition
                hover:bg-[#754126]
                active:scale-[0.99]
                disabled:bg-[#cfc6bf]

                sm:mt-7
                sm:h-14
                sm:gap-3
                sm:rounded-2xl
                sm:text-sm
              "
            >
              <ShoppingBag
                size={17}
                className="sm:h-[19px] sm:w-[19px]"
              />

              {soldOut
                ? t("soldOut")
                : t("addToCart")}
            </button>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default ItemModal;