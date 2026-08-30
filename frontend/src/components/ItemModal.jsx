import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Heart,
  Clock3,
  Leaf,
  Flame,
  ShoppingBag,
  Tag,
  Wheat,
  Milk,
  Utensils,
  AlertTriangle,
  Star,
  CheckCircle2,
  XCircle,
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

  const itemId = item._id || item.id;

  const soldOut =
    item.availability === "sold-out" ||
    item.isAvailable === false;

  const seasonal =
    item.availability === "seasonal";

  const available =
    !soldOut && !seasonal;

  /*
  |--------------------------------------------------------------------------
  | TAG HELPERS
  |--------------------------------------------------------------------------
  */

  const hasTag = (tag) =>
    item.tags?.includes(tag);

  /*
  |--------------------------------------------------------------------------
  | LOCALIZED VALUES
  |--------------------------------------------------------------------------
  */

  const itemName =
    getLocalizedText(item.name);

  const itemDescription =
    getLocalizedText(item.description);

  /*
  |--------------------------------------------------------------------------
  | INGREDIENTS
  |--------------------------------------------------------------------------
  */

  const ingredients =
    Array.isArray(item.ingredients)
      ? item.ingredients
      : [];

  /*
  |--------------------------------------------------------------------------
  | ALLERGENS
  |--------------------------------------------------------------------------
  */

  const allergens =
    Array.isArray(item.allergens)
      ? item.allergens
      : [];

  /*
  |--------------------------------------------------------------------------
  | MODAL
  |--------------------------------------------------------------------------
  */

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">

        {/* =========================================================
            BACKDROP
        ========================================================= */}

        <motion.button
          type="button"
          aria-label="Close"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#241a15]/60 backdrop-blur-sm"
        />

        {/* =========================================================
            MODAL
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 50,
            scale: 0.98,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          className="
            relative
            max-h-[94vh]
            w-full
            max-w-2xl
            overflow-y-auto
            rounded-t-[26px]
            bg-[#faf7f2]
            shadow-2xl

            sm:max-h-[94vh]
            sm:rounded-[30px]
          "
        >

          {/* =======================================================
              IMAGE
          ======================================================= */}

          <div
            className="
              relative
              h-[220px]
              sm:h-[360px]
            "
          >

            <img
              src={item.image}
              alt={itemName}
              className="h-full w-full object-cover"
            />

            {/* IMAGE OVERLAY */}

            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 to-transparent" />

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              className="
                absolute
                left-3
                top-3
                flex
                h-10
                w-10
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
              <X size={19} />
            </button>

            {/* FAVORITE */}

            <button
              type="button"
              onClick={() =>
                onToggleFavorite(itemId)
              }
              className={`
                absolute
                right-3
                top-3
                flex
                h-10
                w-10
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
                size={19}
                fill={
                  isFavorite
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

            {/* AVAILABILITY BADGE */}

            <div className="absolute bottom-4 left-4 sm:left-6">

              {soldOut && (
                <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <XCircle size={14} />
                  Sold Out
                </span>
              )}

              {seasonal && (
                <span className="flex items-center gap-1.5 rounded-full bg-[#8b4f2f] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  <Star size={14} />
                  Seasonal
                </span>
              )}

              {available && (
                <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#52734e] shadow-lg">
                  <CheckCircle2 size={14} />
                  Available
                </span>
              )}

            </div>

          </div>

          {/* =======================================================
              CONTENT
          ======================================================= */}

          <div className="p-5 sm:p-8">

            {/* =====================================================
                TITLE + PRICE
            ===================================================== */}

            <div className="flex items-start justify-between gap-5">

              <div className="min-w-0">

                {/* CATEGORY */}

                {item.category && (
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#8b4f2f]">
                    <Tag size={13} />
                    {item.category}
                  </div>
                )}

                {/* NAME */}

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
                  {itemName}
                </h2>

                {/* TAGS */}

                <div className="mt-3 flex flex-wrap gap-2">

                  {hasTag("vegan") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#e8f0e5] px-3 py-1.5 text-[11px] font-semibold text-[#52734e]">
                      <Leaf size={12} />
                      Vegan
                    </span>
                  )}

                  {hasTag("vegetarian") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#e8f0e5] px-3 py-1.5 text-[11px] font-semibold text-[#52734e]">
                      <Leaf size={12} />
                      Vegetarian
                    </span>
                  )}

                  {hasTag("spicy") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#f6e2dc] px-3 py-1.5 text-[11px] font-semibold text-[#9b4a38]">
                      <Flame size={12} />
                      Spicy
                    </span>
                  )}

                  {hasTag("dairy-free") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#eee7dc] px-3 py-1.5 text-[11px] font-semibold text-[#75634f]">
                      <Milk size={12} />
                      Dairy Free
                    </span>
                  )}

                  {hasTag("gluten-free") && (
                    <span className="flex items-center gap-1 rounded-full bg-[#eee7dc] px-3 py-1.5 text-[11px] font-semibold text-[#75634f]">
                      <Wheat size={12} />
                      Gluten Free
                    </span>
                  )}

                </div>

              </div>

              {/* PRICE */}

              <div className="shrink-0 text-right">

                <span className="text-[10px] font-medium text-[#9b8c81]">
                  ETB
                </span>

                <p className="text-2xl font-bold text-[#3a2418] sm:text-3xl">
                  {item.price}
                </p>

              </div>

            </div>

            {/* DIVIDER */}

            <div className="my-5 h-px bg-[#e7ddd5]" />

            {/* =====================================================
                DESCRIPTION
            ===================================================== */}

            {itemDescription && (
              <section>

                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b4f2f]">
                  Description
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#665a52] sm:text-[15px]">
                  {itemDescription}
                </p>

              </section>
            )}

            {/* =====================================================
                QUICK INFO
            ===================================================== */}

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

              {/* PREPARATION */}

              {item.preparationTime && (
                <div className="rounded-2xl bg-white p-4">

                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#efe7dd] text-[#8b4f2f]">
                    <Clock3 size={17} />
                  </div>

                  <p className="text-[10px] font-medium uppercase tracking-wide text-[#9b8c81]">
                    Preparation
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#3a2418]">
                    {item.preparationTime}
                  </p>

                </div>
              )}

              {/* PORTION / SIZE */}

              {(item.size || item.portion) && (
                <div className="rounded-2xl bg-white p-4">

                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#efe7dd] text-[#8b4f2f]">
                    <Utensils size={17} />
                  </div>

                  <p className="text-[10px] font-medium uppercase tracking-wide text-[#9b8c81]">
                    Portion
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#3a2418]">
                    {item.size || item.portion}
                  </p>

                </div>
              )}

              {/* FEATURED */}

              {item.featured && (
                <div className="rounded-2xl bg-white p-4">

                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5ead8] text-[#a06b2c]">
                    <Star
                      size={17}
                      fill="currentColor"
                    />
                  </div>

                  <p className="text-[10px] font-medium uppercase tracking-wide text-[#9b8c81]">
                    Special
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#3a2418]">
                    Chef's Choice
                  </p>

                </div>
              )}

            </div>

            {/* =====================================================
                INGREDIENTS
            ===================================================== */}

            {ingredients.length > 0 && (
              <section className="mt-7">

                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8b4f2f]">
                  <Utensils size={14} />
                  Ingredients
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {ingredients.map(
                    (ingredient, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-[#e5d9cf] bg-white px-3 py-1.5 text-xs text-[#665a52]"
                      >
                        {typeof ingredient === "object"
                          ? getLocalizedText(
                              ingredient
                            )
                          : ingredient}
                      </span>
                    )
                  )}

                </div>

              </section>
            )}

            {/* =====================================================
                ALLERGENS
            ===================================================== */}

            {allergens.length > 0 && (
              <section className="mt-6 rounded-2xl border border-[#ead8ca] bg-[#fff9f4] p-4">

                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#9b4a38]">
                  <AlertTriangle size={15} />
                  Allergens
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {allergens.map(
                    (allergen, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#765b4d]"
                      >
                        {typeof allergen === "object"
                          ? getLocalizedText(
                              allergen
                            )
                          : allergen}
                      </span>
                    )
                  )}

                </div>

              </section>
            )}

            {/* =====================================================
                DIETARY INFORMATION
            ===================================================== */}

            {(hasTag("vegan") ||
              hasTag("vegetarian") ||
              hasTag("spicy") ||
              hasTag("dairy-free") ||
              hasTag("gluten-free")) && (
              <section className="mt-7">

                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b4f2f]">
                  Dietary Information
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">

                  {hasTag("vegan") && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#e8f0e5] p-3 text-sm text-[#52734e]">
                      <Leaf size={17} />
                      Suitable for vegans
                    </div>
                  )}

                  {hasTag("vegetarian") && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#e8f0e5] p-3 text-sm text-[#52734e]">
                      <Leaf size={17} />
                      Suitable for vegetarians
                    </div>
                  )}

                  {hasTag("spicy") && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#f6e2dc] p-3 text-sm text-[#9b4a38]">
                      <Flame size={17} />
                      Spicy dish
                    </div>
                  )}

                  {hasTag("dairy-free") && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#eee7dc] p-3 text-sm text-[#75634f]">
                      <Milk size={17} />
                      Dairy free
                    </div>
                  )}

                  {hasTag("gluten-free") && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#eee7dc] p-3 text-sm text-[#75634f]">
                      <Wheat size={17} />
                      Gluten free
                    </div>
                  )}

                </div>

              </section>
            )}

            {/* =====================================================
                ADD TO CART
            ===================================================== */}

            <button
              type="button"
              disabled={soldOut}
              className="
                mt-7
                flex
                h-13
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-2xl
                bg-[#8b4f2f]
                px-5
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-[#8b4f2f]/20
                transition
                hover:bg-[#754126]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:bg-[#cfc6bf]
              "
            >

              <ShoppingBag size={19} />

              {soldOut
                ? "Sold Out"
                : seasonal
                ? "Seasonal Item"
                : t("addToCart")}

            </button>

            {/* BOTTOM SPACE */}

            <div className="h-2" />

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default ItemModal;
