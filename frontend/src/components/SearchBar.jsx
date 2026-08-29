import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const SearchBar = ({
  value,
  onChange,
  onFilterClick,
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full">

      {/* SEARCH ICON */}
      <Search
        size={18}
        strokeWidth={1.8}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[#8c7c70]

          sm:left-5
          sm:size-[20px]
        "
      />

      {/* INPUT */}
      <input
        type="search"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={t("search")}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-[#dfd2c8]
          bg-white
          pl-11
          pr-24
          text-sm
          text-[#3a2418]
          outline-none
          transition

          placeholder:text-[#9b8c81]

          focus:border-[#8b4f2f]
          focus:ring-4
          focus:ring-[#8b4f2f]/10

          sm:h-14
          sm:rounded-2xl
          sm:pl-14
        "
      />

      {/* CLEAR SEARCH */}
      {value && (
        <button
          type="button"
          onClick={() =>
            onChange("")
          }
          aria-label="Clear search"
          className="
            absolute
            right-12
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            text-[#8c7c70]
            transition
            hover:bg-[#f1e9e2]

            sm:right-14
            sm:h-9
            sm:w-9
          "
        >
          <X size={16} />
        </button>
      )}

      {/* FILTER BUTTON */}
      <button
        type="button"
        onClick={onFilterClick}
        aria-label="Open filters"
        className="
          absolute
          right-2
          top-1/2
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-lg
          text-[#6f5b4d]
          transition
          hover:bg-[#f1e9e2]

          sm:right-3
          sm:h-10
          sm:w-10
          sm:rounded-xl
        "
      >
        <SlidersHorizontal
          size={18}
        />
      </button>

    </div>
  );
};

export default SearchBar;