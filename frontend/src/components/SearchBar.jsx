import { Search, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const SearchBar = ({
  value,
  onChange,
  onFilterClick,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <Search
        size={20}
        strokeWidth={1.8}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8c7c70]"
      />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search")}
        className="h-14 w-full rounded-2xl border border-[#dfd2c8] bg-white pl-14 pr-24 text-sm text-[#3a2418] outline-none transition placeholder:text-[#9b8c81] focus:border-[#8b4f2f] focus:ring-4 focus:ring-[#8b4f2f]/10"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-14 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#8c7c70] hover:bg-[#f1e9e2]"
        >
          <X size={17} />
        </button>
      )}

      <button
        type="button"
        onClick={onFilterClick}
        aria-label="Open filters"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-[#6f5b4d] transition hover:bg-[#f1e9e2]"
      >
        <SlidersHorizontal size={19} />
      </button>
    </div>
  );
};

export default SearchBar;