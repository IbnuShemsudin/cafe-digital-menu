import {
  Coffee,
  Utensils,
  CakeSlice,
  CupSoda,
  Sandwich,
  Soup,
  Grid2X2,
} from "lucide-react";

const categoryIcons = {
  coffee: Coffee,
  drinks: CupSoda,
  breakfast: Sandwich,
  lunch: Utensils,
  dinner: Soup,
  desserts: CakeSlice,
  pastries: CakeSlice,
  snacks: Sandwich,
};

function formatCategory(category) {
  if (!category) return "";

  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function CategoryTabs({
  categories = [],
  selectedCategory,
  onCategoryChange,
}) {
  const allCategories = [
    {
      id: "all",
      name: "All",
      icon: Grid2X2,
    },

    ...categories.map((category) => ({
      id: category,
      name: formatCategory(category),
      icon:
        categoryIcons[category] ||
        Utensils,
    })),
  ];

  return (
    <section className="mt-6">
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        {allCategories.map((category) => {
          const Icon = category.icon;

          const isActive =
            selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                onCategoryChange(category.id)
              }
              className={`
                flex shrink-0 items-center gap-2
                rounded-full
                px-4 py-2.5
                text-sm font-semibold
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#8b4f2f] text-white shadow-sm"
                    : "border border-[#eadfd6] bg-white text-[#69584e] hover:border-[#d9c9bc] hover:bg-[#f4ebe4]"
                }
              `}
            >
              <Icon size={16} />

              <span>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryTabs;