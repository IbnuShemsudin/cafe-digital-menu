import { useState } from "react";
import { Heart, Leaf, CircleDot, Flame, Sparkles, ChevronRight } from "lucide-react";
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

  const price = item.price ?? item.priceETB ?? null;

  const isAvailable = item.availability === "available";
  const isPopular = item.tags?.includes("popular");
  const isNew = item.tags?.includes("new");
  const showImage = item.image && !imageFailed;

  const handleSelect = () => {
    if (!isAvailable) return;
    onSelect(item);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  const handleFavorite = (event) => {
    event.stopPropagation();
    onToggleFavorite(item._id);
  };

  const FavoriteButton = ({ className }) => (
    <button
      type="button"
      onClick={handleFavorite}
      aria-label={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
      aria-pressed={isFavorite}
      className={className}
    >
      <Heart
        size={variant === "feature" ? 18 : 20}
        className={`transition-all duration-300 ${
          isFavorite
            ? "fill-[#8b4f2f] text-[#8b4f2f] scale-110"
            : variant === "feature"
              ? "text-white/80 hover:text-white"
              : "text-[#a27a60] hover:text-[#8b4f2f]"
        }`}
      />
    </button>
  );

  /* =========================================================
     FEATURE VARIANT — Spotlight card for popular rail
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
        className={`group relative flex h-[380px] w-full flex-col overflow-hidden rounded-3xl border border-[#eadfd6] bg-white text-left shadow-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#8b4f2f] ${
          isAvailable
            ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#8b4f2f]/10"
            : "cursor-not-allowed opacity-60"
        }`}
      >
        {/* Top Image / Visual Display */}
        <div className="relative h-[220px] w-full overflow-hidden bg-[#faf7f2]">
          {showImage ? (
            <img
              src={item.image}
              alt={name}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#efe5dc] to-[#eadfd6] text-5xl shadow-inner">
              {item.category === "coffee" ? "☕" : "🍽"}
            </div>
          )}

          {/* Vignette Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Floating Rank Badge */}
          {typeof rank === "number" && (
            <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md font-mono text-xs font-semibold text-white shadow-sm">
              #{String(rank).padStart(2, "0")}
            </span>
          )}

          {/* Favorite Button */}
          <FavoriteButton className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:bg-white shadow-sm" />

          {/* Badges / Availability */}
          {!isAvailable ? (
            <span className="absolute bottom-3.5 left-4 rounded-full bg-black/70 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
              Sold out
            </span>
          ) : (
            price != null && (
              <span className="absolute bottom-3.5 left-4 rounded-full bg-white/95 px-3.5 py-1.5 font-mono text-sm font-bold text-[#3a2418] shadow-sm backdrop-blur-sm">
                {price} ETB
              </span>
            )
          )}
        </div>

        {/* Content Details */}
        <div className="flex flex-1 flex-col justify-between p-5 bg-gradient-to-b from-white to-[#faf7f2]/50">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-serif text-xl font-bold leading-snug text-[#3a2418] group-hover:text-[#8b4f2f] transition-colors">
                {name}
              </h3>
              {isNew && (
                <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#8b4f2f]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#8b4f2f]">
                  <Sparkles size={11} /> New
                </span>
              )}
            </div>
            {description && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#81736a]">
                {description}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#eadfd6]/60">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#a27a60]">
              {item.category || "Specialty"}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-[#8b4f2f] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              View <ChevronRight size={15} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ROW VARIANT — Main list item view
  ========================================================= */
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={name}
      aria-disabled={!isAvailable}
      onClick={handleSelect}
      onKeyDown={handleCardKeyDown}
      className={`group relative flex w-full items-center justify-between gap-5 rounded-2xl border border-[#eadfd6]/80 bg-white p-5 shadow-sm text-left outline-none transition-all duration-300 ${
        isAvailable
          ? "cursor-pointer hover:border-[#8b4f2f]/30 hover:bg-[#faf7f2]/40 hover:shadow-md"
          : "cursor-not-allowed opacity-55"
      }`}
    >
      <div className="flex items-center gap-5 min-w-0 flex-1">
        {/* Thumbnail Display */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#eadfd6] bg-[#faf7f2]">
          {showImage ? (
            <img
              src={item.image}
              alt={name}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-3xl">
              {item.category === "coffee" ? "☕" : "🍽"}
            </span>
          )}

          {isPopular && (
            <span
              title="Customer favorite"
              className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#8b4f2f] text-white shadow-sm"
            >
              <Flame size={12} />
            </span>
          )}
        </div>

        {/* Text & Metadata */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-[#3a2418] truncate group-hover:text-[#8b4f2f] transition-colors">
              {name}
            </h3>

            {isNew && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#8b4f2f]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#8b4f2f]">
                <Sparkles size={11} /> New
              </span>
            )}
          </div>

          {description && (
            <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-[#81736a]">
              {description}
            </p>
          )}

          <div className="mt-2.5 flex items-center gap-3">
            {item.tags?.includes("vegetarian") && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <Leaf size={13} /> Vegetarian
              </span>
            )}
            {!isAvailable && (
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                <CircleDot size={12} /> Sold out
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Favorite Controls */}
      <div className="flex shrink-0 items-center gap-4 pl-2">
        {price != null && (
          <span className="font-mono text-base font-bold text-[#8b4f2f] bg-[#8b4f2f]/5 px-3 py-1.5 rounded-xl">
            {price} <span className="text-xs font-normal">ETB</span>
          </span>
        )}

        <FavoriteButton className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfd6] bg-white transition-all duration-200 hover:border-[#8b4f2f]/30 hover:bg-[#faf7f2] hover:shadow-sm" />
      </div>
    </div>
  );
}

export default MenuCard;