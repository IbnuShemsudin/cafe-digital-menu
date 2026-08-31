import { useEffect, useMemo, useState } from "react";
import {
  Coffee,
  GlassWater,
  UtensilsCrossed,
  CakeSlice,
  Croissant,
  Sandwich,
  Cookie,
  Search,
  RefreshCw,
  Plus,
  ChevronRight,
  CheckCircle2,
  CircleOff,
  Sparkles,
  ChefHat,
  X,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";
import { getMenuItems } from "../../services/api";

/* =========================================================
   CATEGORY CONFIG
========================================================= */

const categories = [
  {
    value: "coffee",
    label: "Coffee",
    description:
      "Espresso-based drinks, traditional coffee and specialty brews.",
    icon: Coffee,
  },
  {
    value: "drinks",
    label: "Drinks",
    description:
      "Refreshing hot and cold beverages for every occasion.",
    icon: GlassWater,
  },
  {
    value: "breakfast",
    label: "Breakfast",
    description:
      "Fresh breakfast options to start the day right.",
    icon: Sandwich,
  },
  {
    value: "lunch",
    label: "Lunch",
    description:
      "Delicious midday meals prepared fresh in the cafe.",
    icon: UtensilsCrossed,
  },
  {
    value: "dinner",
    label: "Dinner",
    description:
      "Hearty evening dishes made with quality ingredients.",
    icon: UtensilsCrossed,
  },
  {
    value: "desserts",
    label: "Desserts",
    description:
      "Sweet treats and delicious ways to finish your meal.",
    icon: CakeSlice,
  },
  {
    value: "pastries",
    label: "Pastries",
    description:
      "Freshly baked pastries, croissants and bakery favorites.",
    icon: Croissant,
  },
  {
    value: "snacks",
    label: "Snacks",
    description:
      "Light bites and quick snacks for any time of day.",
    icon: Cookie,
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getCategoryItems = (items, category) => {
  return items.filter(
    (item) => item?.category === category
  );
};

const getAvailableItems = (items) => {
  return items.filter(
    (item) => item?.availability === "available"
  );
};

const getSoldOutItems = (items) => {
  return items.filter(
    (item) => item?.availability === "sold-out"
  );
};

const getSeasonalItems = (items) => {
  return items.filter(
    (item) => item?.availability === "seasonal"
  );
};

/* =========================================================
   COMPONENT
========================================================= */

function AdminCategories() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  /* =======================================================
     LOAD MENU
  ======================================================= */

  const loadMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMenuItems();

      const menuData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      setItems(menuData);
    } catch (err) {
      console.error(
        "Load categories error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load category information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredCategories = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    if (!searchValue) {
      return categories;
    }

    return categories.filter((category) => {
      return (
        category.label
          .toLowerCase()
          .includes(searchValue) ||
        category.description
          .toLowerCase()
          .includes(searchValue)
      );
    });
  }, [search]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalItems = items.length;

  const availableItems =
    getAvailableItems(items).length;

  const soldOutItems =
    getSoldOutItems(items).length;

  const seasonalItems =
    getSeasonalItems(items).length;

  const activeCategories = categories.filter(
    (category) =>
      getCategoryItems(
        items,
        category.value
      ).length > 0
  ).length;

  /* =======================================================
     SELECT CATEGORY
  ======================================================= */

  const openCategory = (category) => {
    setSelectedCategory(category);
  };

  const closeCategory = () => {
    setSelectedCategory(null);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f1e5dc] text-[#8b4f2f]">
                <ChefHat size={17} />
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a27a60]">
                Cafe Administration
              </p>
            </div>

            <h1 className="font-serif text-3xl font-semibold text-[#3a2418] sm:text-4xl">
              Categories
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#81736a]">
              Organize your digital menu into
              clear categories and keep track
              of what is currently available.
            </p>
          </div>

          <div className="flex w-full gap-3 sm:w-auto">

            <button
              type="button"
              onClick={loadMenu}
              disabled={loading}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#dfd2c8] bg-white px-4 text-sm font-semibold text-[#5d5048] transition hover:bg-[#f5eee8] disabled:opacity-50 sm:flex-none"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              <span className="hidden xs:inline sm:inline">
                Refresh
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "/admin/menu")
              }
              className="flex h-12 flex-[1.5] items-center justify-center gap-2 rounded-2xl bg-[#8b4f2f] px-5 text-sm font-semibold text-white shadow-lg shadow-[#8b4f2f]/15 transition hover:bg-[#754126] active:scale-[0.98] sm:flex-none"
            >
              <Plus size={18} />

              <span>Add Menu Item</span>
            </button>

          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#efcfc7] bg-[#fff4f1] p-4 text-sm text-[#9b493b]">
            <CircleOff
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {/* =================================================
            OVERVIEW STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <OverviewCard
            label="Categories"
            value={activeCategories}
            total={categories.length}
            icon={<ChefHat size={18} />}
          />

          <OverviewCard
            label="Menu Items"
            value={totalItems}
            icon={<UtensilsCrossed size={18} />}
          />

          <OverviewCard
            label="Available"
            value={availableItems}
            icon={<CheckCircle2 size={18} />}
            valueClass="text-[#52734e]"
          />

          <OverviewCard
            label="Sold Out"
            value={soldOutItems}
            icon={<CircleOff size={18} />}
            valueClass="text-[#9b493b]"
          />

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="mb-6 rounded-3xl border border-[#eadfd6] bg-white p-3 shadow-sm sm:p-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b887b]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search categories..."
              className="h-12 w-full rounded-2xl border border-[#e4d9d0] bg-[#faf7f2] pl-11 pr-11 text-sm text-[#3a2418] outline-none transition placeholder:text-[#a5968b] focus:border-[#8b4f2f] focus:ring-2 focus:ring-[#8b4f2f]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8f7d72] transition hover:bg-[#eee5de]"
              >
                <X size={16} />
              </button>
            )}

          </div>

        </div>

        {/* =================================================
            CATEGORY GRID
        ================================================= */}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (item) => (
                <CategorySkeleton
                  key={item}
                />
              )
            )}

          </div>
        ) : filteredCategories.length === 0 ? (
          <EmptySearch />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredCategories.map(
              (category) => (
                <CategoryCard
                  key={category.value}
                  category={category}
                  items={items}
                  onClick={() =>
                    openCategory(
                      category
                    )
                  }
                />
              )
            )}

          </div>
        )}

        {/* =================================================
            BOTTOM INFORMATION
        ================================================= */}

        <div className="mt-6 overflow-hidden rounded-3xl bg-[#3a2418] p-6 text-white sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles size={20} />
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold">
                  Keep your menu organized
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-white/60">
                  Categories are automatically
                  calculated from the menu items
                  currently stored in your system.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "/admin/menu")
              }
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#3a2418] transition hover:bg-[#f5eee8]"
            >
              Manage Menu

              <ChevronRight size={15} />
            </button>

          </div>

        </div>

        {/* =================================================
            CATEGORY DETAIL MODAL
        ================================================= */}

        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            items={items}
            onClose={closeCategory}
          />
        )}

      </div>
    </AdminLayout>
  );
}

/* =========================================================
   OVERVIEW CARD
========================================================= */

function OverviewCard({
  label,
  value,
  total,
  icon,
  valueClass = "text-[#3a2418]",
}) {
  return (
    <div className="rounded-2xl border border-[#eadfd6] bg-white p-4 shadow-sm sm:p-5">

      <div className="flex items-center justify-between gap-2">

        <p className="text-[11px] font-medium text-[#9b887b] sm:text-xs">
          {label}
        </p>

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f4ebe4] text-[#8b4f2f]">
          {icon}
        </div>

      </div>

      <div className="mt-3 flex items-end gap-1.5">

        <p
          className={`text-2xl font-bold ${valueClass}`}
        >
          {value}
        </p>

        {total !== undefined && (
          <span className="mb-1 text-xs text-[#a5968b]">
            / {total}
          </span>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({
  category,
  items,
  onClick,
}) {
  const Icon = category.icon;

  const categoryItems =
    getCategoryItems(
      items,
      category.value
    );

  const available =
    categoryItems.filter(
      (item) =>
        item?.availability ===
        "available"
    ).length;

  const soldOut =
    categoryItems.filter(
      (item) =>
        item?.availability ===
        "sold-out"
    ).length;

  const seasonal =
    categoryItems.filter(
      (item) =>
        item?.availability ===
        "seasonal"
    ).length;

  const hasItems =
    categoryItems.length > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-[26px] border border-[#eadfd6] bg-white p-5 text-left shadow-[0_8px_30px_rgba(58,36,24,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#d9c4b4] hover:shadow-[0_16px_40px_rgba(58,36,24,0.09)] active:scale-[0.99]"
    >

      {/* Decorative circle */}

      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#faf1eb] transition duration-500 group-hover:scale-125" />

      {/* Icon */}

      <div className="relative flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e8df] text-[#8b4f2f] transition duration-300 group-hover:bg-[#8b4f2f] group-hover:text-white">
          <Icon size={22} strokeWidth={1.8} />
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-[#b5a69c] transition group-hover:bg-[#f5eee8] group-hover:text-[#8b4f2f]">
          <ChevronRight size={18} />
        </div>

      </div>

      {/* Title */}

      <div className="relative mt-5">

        <div className="flex items-center justify-between gap-3">

          <h3 className="font-serif text-xl font-semibold text-[#3a2418]">
            {category.label}
          </h3>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              hasItems
                ? "bg-[#e8f0e5] text-[#52734e]"
                : "bg-[#f3eee9] text-[#9b887b]"
            }`}
          >
            {categoryItems.length}{" "}
            {categoryItems.length === 1
              ? "item"
              : "items"}
          </span>

        </div>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-[#81736a]">
          {category.description}
        </p>

      </div>

      {/* Stats */}

      <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-[#eee6df] pt-4">

        <MiniStat
          label="Available"
          value={available}
          valueClass="text-[#52734e]"
        />

        <MiniStat
          label="Sold Out"
          value={soldOut}
          valueClass="text-[#9b493b]"
        />

        <MiniStat
          label="Seasonal"
          value={seasonal}
          valueClass="text-[#b47a35]"
        />

      </div>

    </button>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  valueClass,
}) {
  return (
    <div>

      <p
        className={`text-base font-bold ${valueClass}`}
      >
        {value}
      </p>

      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-[#aa9b90]">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   CATEGORY MODAL
========================================================= */

function CategoryModal({
  category,
  items,
  onClose,
}) {
  const Icon = category.icon;

  const categoryItems =
    getCategoryItems(
      items,
      category.value
    );

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center bg-[#241a15]/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={onClose}
    >

      <div
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[30px] bg-[#faf7f2] shadow-2xl sm:rounded-[30px]"
      >

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eadfd6] bg-white/95 px-5 py-4 backdrop-blur sm:px-7">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f3e8df] text-[#8b4f2f]">
              <Icon size={21} />
            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a27a60]">
                Category
              </p>

              <h2 className="truncate font-serif text-xl font-semibold text-[#3a2418]">
                {category.label}
              </h2>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4ebe4] text-[#5d5048] transition hover:bg-[#eadfd6]"
          >
            <X size={19} />
          </button>

        </div>

        {/* Content */}

        <div className="p-5 sm:p-7">

          <p className="text-sm leading-6 text-[#81736a]">
            {category.description}
          </p>

          {categoryItems.length ===
          0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-[#d9ccc2] bg-white px-5 py-10 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4ebe4] text-[#8b4f2f]">
                <ChefHat size={24} />
              </div>

              <h3 className="mt-4 font-serif text-lg font-semibold text-[#3a2418]">
                No items yet
              </h3>

              <p className="mt-1 text-xs text-[#81736a]">
                This category does not
                have any menu items.
              </p>

            </div>
          ) : (
            <div className="mt-6 space-y-3">

              {categoryItems.map(
                (item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 rounded-2xl border border-[#eadfd6] bg-white p-3 sm:p-4"
                  >

                    {/* Image */}

                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f2ebe5] sm:h-16 sm:w-16">

                      {item?.image ? (
                        <img
                          src={item.image}
                          alt={
                            item?.name?.en ||
                            "Menu item"
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#aa9b90]">
                          <ChefHat
                            size={20}
                          />
                        </div>
                      )}

                    </div>

                    {/* Info */}

                    <div className="min-w-0 flex-1">

                      <h4 className="truncate text-sm font-bold text-[#3a2418]">
                        {item?.name?.en ||
                          "Untitled Item"}
                      </h4>

                      {item?.name?.am && (
                        <p className="mt-0.5 truncate text-[11px] text-[#9b887b]">
                          {item.name.am}
                        </p>
                      )}

                      <div className="mt-1.5 flex items-center gap-2">

                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                            item?.availability ===
                            "available"
                              ? "bg-[#e8f0e5] text-[#52734e]"
                              : item?.availability ===
                                "sold-out"
                              ? "bg-[#f6e2dc] text-[#9b493b]"
                              : "bg-[#f6ead7] text-[#a66e2d]"
                          }`}
                        >
                          {item?.availability ===
                          "sold-out"
                            ? "Sold Out"
                            : item?.availability ===
                              "seasonal"
                            ? "Seasonal"
                            : "Available"}
                        </span>

                      </div>

                    </div>

                    {/* Price */}

                    <div className="shrink-0 text-right">

                      <span className="text-[9px] text-[#9b887b]">
                        ETB
                      </span>

                      <p className="text-sm font-bold text-[#3a2418] sm:text-base">
                        {Number(
                          item?.price || 0
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

          {/* Footer */}

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-2xl bg-[#8b4f2f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#754126]"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function CategorySkeleton() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#eadfd6] bg-white p-5">

      <div className="h-12 w-12 animate-pulse rounded-2xl bg-[#eee6df]" />

      <div className="mt-5 h-6 w-1/2 animate-pulse rounded-lg bg-[#eee6df]" />

      <div className="mt-3 space-y-2">

        <div className="h-3 w-full animate-pulse rounded bg-[#eee6df]" />

        <div className="h-3 w-4/5 animate-pulse rounded bg-[#eee6df]" />

      </div>

      <div className="mt-5 border-t border-[#eee6df] pt-4">

        <div className="grid grid-cols-3 gap-2">

          <div className="h-8 animate-pulse rounded bg-[#eee6df]" />
          <div className="h-8 animate-pulse rounded bg-[#eee6df]" />
          <div className="h-8 animate-pulse rounded bg-[#eee6df]" />

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   EMPTY SEARCH
========================================================= */

function EmptySearch() {
  return (
    <div className="rounded-3xl border border-dashed border-[#d9ccc2] bg-white px-6 py-16 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4ebe4] text-[#8b4f2f]">
        <Search size={27} />
      </div>

      <h3 className="mt-5 font-serif text-2xl font-semibold text-[#3a2418]">
        No categories found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#81736a]">
        Try searching for another category.
      </p>

    </div>
  );
}

export default AdminCategories;