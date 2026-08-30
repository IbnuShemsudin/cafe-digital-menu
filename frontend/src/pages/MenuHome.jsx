import { useEffect, useMemo, useState } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import CategoryTabs from "../components/CategoryTabs";
import MenuCard from "../components/MenuCard";
import ItemModal from "../components/ItemModal";
import FilterPanel from "../components/FilterPanel";

import { useLanguage } from "../context/LanguageContext";
import { getMenuItems } from "../services/api";

/* =========================================================
   VISUAL SYSTEM
   Ethiopian coffee-house / menu board look

   Palette:
   #FBF3E7 parchment
   #1F140D ink
   #6B564A taupe
   #B5502D ember
   #C89550 gold
   #3A281F bark
========================================================= */

function MenuHome() {
  const { t } = useLanguage();

  /* =========================
     MENU STATE
  ========================= */

  const [menuItems, setMenuItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================
     FILTER STATE
  ========================= */

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [favorites, setFavorites] =
    useState([]);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [selectedFilters, setSelectedFilters] =
    useState([]);

  /* =========================
     LOAD MENU
  ========================= */

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getMenuItems();

        setMenuItems(
          response.data || []
        );
      } catch (error) {
        console.error(
          "Failed to load menu:",
          error
        );

        setError(
          error.message ||
            "Failed to load menu"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  /* =========================
     FAVORITES
  ========================= */

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter(
            (itemId) =>
              itemId !== id
          )
        : [...current, id]
    );
  };

  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {
    return [
      ...new Set(
        menuItems
          .map(
            (item) =>
              item.category
          )
          .filter(Boolean)
      ),
    ];
  }, [menuItems]);

  /* =========================
     FILTER MENU
  ========================= */

  const filteredItems = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return menuItems.filter((item) => {

      const matchesCategory =
        selectedCategory === "all" ||
        item.category ===
          selectedCategory;

      const searchableText = [
        item.name?.en,
        item.name?.am,
        item.name?.om,

        item.description?.en,
        item.description?.am,
        item.description?.om,

        item.ingredients?.en,
        item.ingredients?.am,
        item.ingredients?.om,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(
          query
        );

      const matchesFilters =
        selectedFilters.every(
          (filter) => {

            if (
              filter ===
              "available"
            ) {
              return (
                item.availability ===
                "available"
              );
            }

            if (
              filter ===
              "popular"
            ) {
              return item.tags?.includes(
                "popular"
              );
            }

            return item.tags?.includes(
              filter
            );
          }
        );

      return (
        matchesCategory &&
        matchesSearch &&
        matchesFilters
      );
    });
  }, [
    menuItems,
    selectedCategory,
    search,
    selectedFilters,
  ]);

  /* =========================
     POPULAR ITEMS
  ========================= */

  const popularItems = useMemo(() => {
    return menuItems.filter((item) =>
      item.tags?.includes("popular")
    );
  }, [menuItems]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF3E7]">
        <div className="text-center">

          <div className="relative mx-auto h-14 w-14">
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#E4D3BE] border-t-[#B5502D]" />

            <div className="absolute inset-[6px] rounded-full bg-[#FBF3E7]" />
          </div>

          <p className="mt-5 [font-family:'IBM_Plex_Mono',monospace] text-[11px] uppercase tracking-[0.2em] text-[#6B564A]">
            Brewing the menu
          </p>

        </div>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBF3E7] px-5">

        <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">

          <div className="w-full rounded-[4px] border border-[#E4D3BE] bg-white/70 p-9 text-center shadow-[0_1px_0_#fff_inset]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C89550]/50 text-2xl">
              ☕
            </div>

            <h2 className="mt-5 [font-family:'Fraunces',serif] text-2xl font-semibold text-[#1F140D]">
              The menu didn&apos;t brew
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6B564A]">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-[3px] bg-[#B5502D] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#9C4324]"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#1F140D] [font-family:'General_Sans',ui-sans-serif,system-ui]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">

        {/* SEARCH */}

        <section className="pt-5 sm:pt-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            onFilterClick={() =>
              setFilterOpen(true)
            }
          />
        </section>

        {/* HERO */}

        <Hero
          onSpecialsClick={() =>
            setSelectedCategory(
              "coffee"
            )
          }
        />

        {/* CATEGORIES */}

        <CategoryTabs
          categories={categories}
          selectedCategory={
            selectedCategory
          }
          onCategoryChange={
            setSelectedCategory
          }
        />

        {/* ACTIVE FILTERS */}

        {selectedFilters.length >
          0 && (
          <div className="mt-6 flex items-center gap-2 overflow-x-auto border-b border-dashed border-[#C89550]/40 pb-4">

            <span className="shrink-0 [font-family:'IBM_Plex_Mono',monospace] text-[10px] uppercase tracking-[0.18em] text-[#6B564A]">
              Filtered by
            </span>

            {selectedFilters.map(
              (filter) => (
                <span
                  key={filter}
                  className="shrink-0 rounded-full border border-[#B5502D]/30 bg-[#B5502D]/10 px-3 py-1 text-xs font-semibold capitalize tracking-wide text-[#B5502D]"
                >
                  {filter.replace(
                    "-",
                    " "
                  )}
                </span>
              )
            )}

          </div>
        )}

        {/* POPULAR */}

        {!search &&
          selectedCategory ===
            "all" &&
          selectedFilters.length ===
            0 &&
          popularItems.length > 0 && (
            <section className="mt-10 sm:mt-11">

              <SectionLabel
                eyebrow="Customer favorites"
                title={t("popular")}
              />

              <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-5 sm:px-6 lg:-mx-8 lg:px-8">

                {popularItems.map(
                  (item, index) => (
                    <div
                      key={item._id}
                      className="w-[270px] shrink-0 sm:w-[310px]"
                    >
                      <MenuCard
                        item={item}
                        onSelect={
                          setSelectedItem
                        }
                        isFavorite={favorites.includes(
                          item._id
                        )}
                        onToggleFavorite={
                          toggleFavorite
                        }
                        variant="feature"
                        rank={index + 1}
                      />
                    </div>
                  )
                )}

              </div>

            </section>
          )}

        {/* MAIN MENU */}

        <section className="mt-10 sm:mt-12">

          <SectionLabel
            eyebrow="Freshly prepared"
            title={
              search ||
              selectedFilters.length >
                0
                ? `${filteredItems.length} ${
                    filteredItems.length ===
                    1
                      ? "result"
                      : "results"
                  }`
                : "Our Menu"
            }
          />

          {filteredItems.length >
          0 ? (

            <div
              className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
                sm:gap-4
                lg:grid-cols-3
                lg:gap-5
              "
            >

              {filteredItems.map(
                (item) => (
                  <MenuCard
                    key={item._id}
                    item={item}
                    onSelect={
                      setSelectedItem
                    }
                    isFavorite={favorites.includes(
                      item._id
                    )}
                    onToggleFavorite={
                      toggleFavorite
                    }
                    variant="compact"
                  />
                )
              )}

            </div>

          ) : (

            <div className="rounded-[4px] border border-dashed border-[#C89550]/50 bg-white/40 px-6 py-16 text-center">

              <h3 className="[font-family:'Fraunces',serif] text-xl font-semibold text-[#1F140D]">
                {t("noResults")}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6B564A]">
                Try changing your
                search, category, or
                filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(
                    "all"
                  );
                  setSelectedFilters(
                    []
                  );
                }}
                className="mt-5 rounded-[3px] bg-[#B5502D] px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#9C4324]"
              >
                Clear Everything
              </button>

            </div>

          )}

        </section>

      </main>

      {/* ITEM DETAILS */}

      <ItemModal
        item={selectedItem}
        onClose={() =>
          setSelectedItem(null)
        }
        isFavorite={
          selectedItem
            ? favorites.includes(
                selectedItem._id
              )
            : false
        }
        onToggleFavorite={
          toggleFavorite
        }
      />

      {/* FILTERS */}

      <FilterPanel
        open={filterOpen}
        selectedFilters={
          selectedFilters
        }
        onChange={
          setSelectedFilters
        }
        onClose={() =>
          setFilterOpen(false)
        }
        onClear={() =>
          setSelectedFilters([])
        }
      />

    </div>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({
  eyebrow,
  title,
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#C89550]/40 pb-3">

      <div>

        <p className="mb-1 [font-family:'IBM_Plex_Mono',monospace] text-[10px] uppercase tracking-[0.22em] text-[#B5502D]">
          {eyebrow}
        </p>

        <h2 className="[font-family:'Fraunces',serif] text-[26px] font-semibold leading-none text-[#1F140D]">
          {title}
        </h2>

      </div>

      <span className="hidden shrink-0 text-[#C89550] sm:block">
        ⁘
      </span>

    </div>
  );
}

export default MenuHome;
