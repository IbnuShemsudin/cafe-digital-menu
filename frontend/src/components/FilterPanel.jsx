import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Leaf,
  Flame,
  Wheat,
  MilkOff,
  X,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const filters = [
  {
    id: "all",
    label: {
      en: "All",
      am: "ሁሉም",
      om: "Hunda",
    },
  },
  {
    id: "vegetarian",
    label: {
      en: "Vegetarian",
      am: "ቬጀቴሪያን",
      om: "Vegetarian",
    },
    icon: Leaf,
  },
  {
    id: "vegan",
    label: {
      en: "Vegan",
      am: "ቪጋን",
      om: "Vegan",
    },
    icon: Leaf,
  },
  {
    id: "spicy",
    label: {
      en: "Spicy",
      am: "ቅመም ያለው",
      om: "Qaraawaa",
    },
    icon: Flame,
  },
  {
    id: "dairy-free",
    label: {
      en: "Dairy Free",
      am: "የወተት ውጤት የሌለው",
      om: "Aannan malee",
    },
    icon: MilkOff,
  },
  {
    id: "gluten-free",
    label: {
      en: "Gluten Free",
      am: "ግሉተን የሌለው",
      om: "Gluten malee",
    },
    icon: Wheat,
  },
  {
    id: "popular",
    label: {
      en: "Popular",
      am: "ተወዳጅ",
      om: "Beekamaa",
    },
  },
  {
    id: "available",
    label: {
      en: "Available",
      am: "የሚገኝ",
      om: "Kan jiru",
    },
  },
];

const FilterPanel = ({
  open,
  selectedFilters,
  onChange,
  onClose,
  onClear,
}) => {
  const { getLocalizedText } = useLanguage();

  const toggleFilter = (id) => {
    if (id === "all") {
      onChange([]);
      return;
    }

    const exists = selectedFilters.includes(id);

    if (exists) {
      onChange(
        selectedFilters.filter(
          (filter) => filter !== id
        )
      );
    } else {
      onChange([...selectedFilters, id]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150]">

          {/* BACKDROP */}
          <motion.button
            type="button"
            aria-label="Close filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#241a15]/45 backdrop-blur-sm"
          />

          {/* PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-[30px] bg-[#faf7f2] p-6 shadow-2xl sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[460px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[30px]"
          >

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a27a60]">
                  Refine menu
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#3a2418]">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5d5048] shadow-sm"
              >
                <X size={19} />
              </button>

            </div>

            <div className="grid grid-cols-2 gap-3">

              {filters.map((filter) => {

                const active =
                  filter.id === "all"
                    ? selectedFilters.length === 0
                    : selectedFilters.includes(
                        filter.id
                      );

                const Icon = filter.icon;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() =>
                      toggleFilter(filter.id)
                    }
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-[#8b4f2f] bg-[#8b4f2f] text-white"
                        : "border-[#e2d7ce] bg-white text-[#5d5048] hover:bg-[#f6efe9]"
                    }`}
                  >

                    <span className="flex items-center gap-2.5">

                      {Icon && (
                        <Icon
                          size={17}
                          strokeWidth={1.8}
                        />
                      )}

                      <span className="text-sm font-medium">
                        {getLocalizedText(filter.label)}
                      </span>

                    </span>

                    {active && (
                      <Check size={17} />
                    )}

                  </button>
                );
              })}

            </div>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={onClear}
                className="flex-1 rounded-2xl border border-[#dfd2c8] bg-white py-3.5 text-sm font-semibold text-[#6f5b4d]"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-[1.5] rounded-2xl bg-[#8b4f2f] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8b4f2f]/15"
              >
                Apply Filters
              </button>

            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;