import { useState } from "react";
import {
  Heart,
  Leaf,
  CircleDot,
  Flame,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

function MenuCard({
  item,
  onSelect,
  isFavorite,
  onToggleFavorite,
  variant = "row",
  rank,
}) {
  const { language } = useLanguage();

  const [imageFailed, setImageFailed] = useState(false);

  /* =========================================================
     LOCALIZED CONTENT
  ========================================================= */

  const name =
    item.name?.[language] ||
    item.name?.en ||
    item.name?.am ||
    item.name?.om ||
    "";

  const description =
    item.description?.[language] ||
    item.description?.en ||
    item.description?.am ||
    item.description?.om ||
    "";

  const price =
    item.price ??
    item.priceETB ??
    null;

  /* =========================================================
     STATUS
  ========================================================= */

  const isAvailable =
    item.availability === "available";

  const isPopular =
    item.tags?.includes("popular");

  const isNew =
    item.tags?.includes("new");

  const isVegetarian =
    item.tags?.includes("vegetarian");

  const showImage =
    item.image && !imageFailed;

  /* =========================================================
     ACTIONS
  ========================================================= */

  const handleSelect = () => {
    if (!isAvailable) return;

    onSelect(item);
  };

  const handleCardKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleSelect();
    }
  };

  const handleFavorite = (event) => {
    event.stopPropagation();

    onToggleFavorite(item._id);
  };

  /* =========================================================
     FAVORITE BUTTON
  ========================================================= */

  const FavoriteButton = ({
    className = "",
    dark = false,
  }) => (
    <button
      type="button"
      onClick={handleFavorite}
      aria-label={
        isFavorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
      aria-pressed={isFavorite}
      className={`group/favorite ${className}`}
    >
      <Heart
        size={
          variant === "feature"
            ? 18
            : 17
        }
        strokeWidth={1.8}
        className={`transition-all duration-300 ${
          isFavorite
            ? "scale-110 fill-[#B5502D] text-[#B5502D]"
            : dark
              ? "text-white/90 group-hover/favorite:text-white"
              : "text-[#A27A60] group-hover/favorite:text-[#B5502D]"
        }`}
      />
    </button>
  );

  /* =========================================================
     FEATURE CARD
  ========================================================= */

  if (variant === "feature") {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={name}
        aria-disabled={!isAvailable}
        onClick={handleSelect}
        onKeyDown={handleCardKeyDown}
        className={`group relative flex h-[390px] w-full flex-col overflow-hidden rounded-[30px] border border-[#E8D8C7] bg-white text-left shadow-[0_8px_30px_rgba(74,45,28,0.06)] outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#B5502D] ${
          isAvailable
            ? "cursor-pointer hover:-translate-y-1.5 hover:border-[#D9B99F] hover:shadow-[0_20px_45px_rgba(74,45,28,0.12)]"
            : "cursor-not-allowed opacity-60"
        }`}
      >
        {/* IMAGE */}

        <div className="relative h-[225px] w-full shrink-0 overflow-hidden bg-[#EFE5DC]">
          {showImage ? (
            <img
              src={item.image}
              alt={name}
              loading="lazy"
              onError={() =>
                setImageFailed(true)
              }
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F2E8DF] via-[#E9D8C8] to-[#DDBFA8] text-6xl">
              {item.category === "coffee"
                ? "☕"
                : "🍽️"}
            </div>
          )}

          {/* PREMIUM IMAGE OVERLAY */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/15" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />

          {/* TOP LEFT BADGES */}

          <div className="absolute left-4 top-4 flex items-center gap-2">
            {typeof rank === "number" && (
              <span className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 px-2 font-mono text-[10px] font-bold text-white shadow-lg backdrop-blur-xl">
                #{String(rank).padStart(2, "0")}
              </span>
            )}

            {isPopular && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#B5502D]/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md">
                <Flame size={11} />
                Popular
              </span>
            )}
          </div>

          {/* FAVORITE */}

          <FavoriteButton
            dark
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/25 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white"
          />

          {/* PRICE */}

          {!isAvailable ? (
            <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/65 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
              Sold Out
            </span>
          ) : (
            price != null && (
              <span className="absolute bottom-4 left-4 inline-flex items-baseline gap-1 rounded-2xl border border-white/50 bg-white/95 px-3.5 py-2 font-mono text-base font-bold text-[#3A2818] shadow-xl backdrop-blur-md">
                {price}
                <span className="text-[9px] font-semibold tracking-wide text-[#8B6A56]">
                  ETB
                </span>
              </span>
            )
          )}
        </div>

        {/* CONTENT */}

        <div className="flex min-h-0 flex-1 flex-col justify-between bg-gradient-to-b from-white to-[#FCF8F4] p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="line-clamp-1 font-serif text-xl font-bold leading-tight text-[#3A2818] transition-colors duration-300 group-hover:text-[#B5502D]">
                {name}
              </h3>

              {isNew && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#B5502D]/15 bg-[#B5502D]/8 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#B5502D]">
                  <Sparkles size={10} />
                  New
                </span>
              )}
            </div>

            {description && (
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#725E51]">
                {description}
              </p>
            )}
          </div>

          {/* BOTTOM */}

          <div className="mt-4 flex items-center justify-between border-t border-[#E8D8C7]/70 pt-3">
            <span className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-[#A27A60]">
              {item.category || "Specialty"}
            </span>

            <span className="flex translate-x-2 items-center gap-1 text-xs font-bold text-[#B5502D] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Explore
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     COMPACT CARD
  ========================================================= */

  if (variant === "compact") {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={name}
        aria-disabled={!isAvailable}
        onClick={handleSelect}
        onKeyDown={handleCardKeyDown}
        className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-[22px] border bg-white p-3 text-left outline-none transition-all duration-400 sm:gap-4 sm:rounded-[25px] sm:p-3.5 ${
          isAvailable
            ? "cursor-pointer border-[#E8D8C7] shadow-[0_5px_20px_rgba(74,45,28,0.045)] hover:-translate-y-0.5 hover:border-[#D9B99F] hover:shadow-[0_14px_30px_rgba(74,45,28,0.09)]"
            : "cursor-not-allowed border-[#E8D8C7] opacity-55"
        }`}
      >
        {/* IMAGE */}

        <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-[18px] border border-[#E8D8C7] bg-[#FAF7F2] sm:h-[94px] sm:w-[94px] sm:rounded-[20px]">
          {showImage ? (
            <img
              src={item.image}
              alt={name}
              loading="lazy"
              onError={() =>
                setImageFailed(true)
              }
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F1E6DC] to-[#E2C8B4] text-3xl">
              {item.category === "coffee"
                ? "☕"
                : "🍽️"}
            </div>
          )}

          {/* IMAGE GRADIENT */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* POPULAR */}

          {isPopular && (
            <span
              title="Customer favorite"
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#B5502D] text-white shadow-lg"
            >
              <Flame size={10} />
            </span>
          )}
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1 self-stretch py-0.5">
          <div className="flex h-full flex-col justify-between">
            {/* TOP */}

            <div>
              <div className="flex items-start gap-2">
                <h3 className="min-w-0 flex-1 truncate font-serif text-[15px] font-bold leading-snug text-[#3A2818] transition-colors duration-300 group-hover:text-[#B5502D] sm:text-base">
                  {name}
                </h3>

                {isNew && (
                  <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#B5502D]/8 px-1.5 py-1 text-[8px] font-bold uppercase tracking-wide text-[#B5502D] sm:px-2">
                    <Sparkles size={8} />
                    New
                  </span>
                )}
              </div>

              {description && (
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[#725E51] sm:text-xs sm:leading-5">
                  {description}
                </p>
              )}
            </div>

            {/* BOTTOM */}

            <div className="mt-2 flex items-end justify-between gap-2">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-[9px] font-bold uppercase tracking-[0.13em] text-[#A27A60] sm:text-[10px]">
                  {item.category || "Specialty"}
                </span>

                {isVegetarian && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-700 sm:text-[10px]">
                    <Leaf size={10} />
                    Vegetarian
                  </span>
                )}

                {!isAvailable && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-800 sm:text-[10px]">
                    <CircleDot size={9} />
                    Sold out
                  </span>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {price != null && (
                  <span className="rounded-xl bg-[#B5502D]/7 px-2.5 py-1.5 font-mono text-[11px] font-bold text-[#B5502D] sm:px-3 sm:text-xs">
                    {price}
                    <span className="ml-1 text-[8px] font-semibold text-[#9C7057]">
                      ETB
                    </span>
                  </span>
                )}

                <FavoriteButton
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8D8C7] bg-white transition-all duration-300 hover:border-[#D9B99F] hover:bg-[#FAF7F2] hover:shadow-sm sm:h-9 sm:w-9"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ROW CARD
  ========================================================= */

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={name}
      aria-disabled={!isAvailable}
      onClick={handleSelect}
      onKeyDown={handleCardKeyDown}
      className={`group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[22px] border bg-white p-4 text-left outline-none transition-all duration-400 sm:gap-5 sm:p-5 ${
        isAvailable
          ? "cursor-pointer border-[#E8D8C7] shadow-[0_5px_20px_rgba(74,45,28,0.04)] hover:border-[#D9B99F] hover:bg-[#FFFCF9] hover:shadow-[0_12px_28px_rgba(74,45,28,0.08)]"
          : "cursor-not-allowed border-[#E8D8C7] opacity-55"
      }`}
    >
      {/* LEFT */}

      <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
        {/* THUMBNAIL */}

        <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[18px] border border-[#E8D8C7] bg-[#FAF7F2] sm:h-20 sm:w-20">
          {showImage ? (
            <img
              src={item.image}
              alt={name}
              loading="lazy"
              onError={() =>
                setImageFailed(true)
              }
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F1E6DC] to-[#E2C8B4] text-2xl sm:text-3xl">
              {item.category === "coffee"
                ? "☕"
                : "🍽️"}
            </div>
          )}

          {isPopular && (
            <span className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#B5502D] text-white shadow-sm">
              <Flame size={9} />
            </span>
          )}
        </div>

        {/* TEXT */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-serif text-base font-bold text-[#3A2818] transition-colors duration-300 group-hover:text-[#B5502D] sm:text-lg">
              {name}
            </h3>

            {isNew && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#B5502D]/8 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#B5502D]">
                <Sparkles size={9} />
                New
              </span>
            )}
          </div>

          {description && (
            <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-[#725E51] sm:text-sm">
              {description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-3">
            {isVegetarian && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 sm:text-xs">
                <Leaf size={11} />
                Vegetarian
              </span>
            )}

            {!isAvailable && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 sm:text-xs">
                <CircleDot size={10} />
                Sold out
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {price != null && (
          <span className="rounded-xl bg-[#B5502D]/7 px-2.5 py-1.5 font-mono text-xs font-bold text-[#B5502D] sm:px-3 sm:py-2 sm:text-sm">
            {price}
            <span className="ml-1 text-[8px] font-semibold text-[#9C7057] sm:text-[9px]">
              ETB
            </span>
          </span>
        )}

        <FavoriteButton
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8D8C7] bg-white transition-all duration-300 hover:border-[#D9B99F] hover:bg-[#FAF7F2] hover:shadow-sm sm:h-10 sm:w-10"
        />

        <ChevronRight
          size={17}
          className="hidden text-[#C6AA96] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#B5502D] sm:block"
        />
      </div>
    </div>
  );
}

export default MenuCard;