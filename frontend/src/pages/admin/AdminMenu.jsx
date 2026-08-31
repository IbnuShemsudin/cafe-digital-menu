import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  Upload,
  Check,
  AlertCircle,
  Eye,
  Clock3,
  ChefHat,
  RefreshCw,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/api";

/* =========================================================
   CONSTANTS
========================================================= */

const categories = [
  "coffee",
  "drinks",
  "breakfast",
  "lunch",
  "dinner",
  "desserts",
  "pastries",
  "snacks",
];

const availabilityOptions = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "sold-out",
    label: "Sold Out",
  },
  {
    value: "seasonal",
    label: "Seasonal",
  },
];

const tagOptions = [
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "chef-pick",
    label: "Chef Pick",
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
  },
  {
    value: "vegan",
    label: "Vegan",
  },
  {
    value: "spicy",
    label: "Spicy",
  },
  {
    value: "dairy-free",
    label: "Dairy Free",
  },
  {
    value: "gluten-free",
    label: "Gluten Free",
  },
];

/* =========================================================
   EMPTY FORM
========================================================= */

const createEmptyForm = () => ({
  name: {
    en: "",
    am: "",
    om: "",
  },

  description: {
    en: "",
    am: "",
    om: "",
  },

  ingredients: {
    en: "",
    am: "",
    om: "",
  },

  price: "",

  category: "coffee",

  image: "",

  tags: [],

  availability: "available",

  preparationTime: "",

  sortOrder: 0,
});

/* =========================================================
   HELPERS
========================================================= */

const formatCategory = (value) => {
  if (!value) return "";

  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatTag = (value) => {
  const tag = tagOptions.find(
    (option) => option.value === value
  );

  return tag?.label || formatCategory(value);
};

const getImageSource = (item) => {
  return item?.image || "";
};

const isDataImage = (value) => {
  return (
    typeof value === "string" &&
    value.startsWith("data:image")
  );
};

/* =========================================================
   COMPONENT
========================================================= */

function AdminMenu() {
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("all");
  const [availabilityFilter, setAvailabilityFilter] =
    useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(null);

  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState(createEmptyForm());

  const [imageMode, setImageMode] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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
      console.error("Load menu error:", err);

      setError(
        err?.message || "Failed to load menu items."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  /* =======================================================
     FILTERED ITEMS
  ======================================================= */

  const filteredItems = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return items.filter((item) => {
      const name =
        item?.name?.en?.toLowerCase() || "";

      const amName =
        item?.name?.am?.toLowerCase() || "";

      const omName =
        item?.name?.om?.toLowerCase() || "";

      const matchesSearch =
        !searchValue ||
        name.includes(searchValue) ||
        amName.includes(searchValue) ||
        omName.includes(searchValue);

      const matchesCategory =
        categoryFilter === "all" ||
        item?.category === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "all" ||
        item?.availability === availabilityFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [
    items,
    search,
    categoryFilter,
    availabilityFilter,
  ]);

  /* =======================================================
     OPEN CREATE MODAL
  ======================================================= */

  const openCreateModal = () => {
    setEditingItem(null);
    setForm(createEmptyForm());

    setImageMode("url");
    setImageFile(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");

    setModalOpen(true);
  };

  /* =======================================================
     OPEN EDIT MODAL
  ======================================================= */

  const openEditModal = (item) => {
    setEditingItem(item);

    setForm({
      name: {
        en: item?.name?.en || "",
        am: item?.name?.am || "",
        om: item?.name?.om || "",
      },

      description: {
        en: item?.description?.en || "",
        am: item?.description?.am || "",
        om: item?.description?.om || "",
      },

      ingredients: {
        en: item?.ingredients?.en || "",
        am: item?.ingredients?.am || "",
        om: item?.ingredients?.om || "",
      },

      price:
        item?.price !== undefined &&
        item?.price !== null
          ? String(item.price)
          : "",

      category: item?.category || "coffee",

      image: item?.image || "",

      tags: Array.isArray(item?.tags)
        ? item.tags
        : [],

      availability:
        item?.availability || "available",

      preparationTime:
        item?.preparationTime || "",

      sortOrder: item?.sortOrder ?? 0,
    });

    setImageMode(
      isDataImage(item?.image)
        ? "device"
        : "url"
    );

    setImageFile(null);
    setImagePreview(item?.image || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");

    setModalOpen(true);
  };

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingItem(null);

    setImageFile(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");
  };

  /* =======================================================
     FORM FIELD
  ======================================================= */

  const updateLocalizedField = (
    section,
    language,
    value
  ) => {
    setForm((previous) => ({
      ...previous,

      [section]: {
        ...previous[section],
        [language]: value,
      },
    }));
  };

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =======================================================
     TAG TOGGLE
  ======================================================= */

  const toggleTag = (tag) => {
    setForm((previous) => {
      const exists = previous.tags.includes(tag);

      return {
        ...previous,

        tags: exists
          ? previous.tags.filter(
              (item) => item !== tag
            )
          : [...previous.tags, tag],
      };
    });
  };

  /* =======================================================
     DEVICE IMAGE
  ======================================================= */

  const handleImageFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image must be smaller than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setError("");
    setImageFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        setError("Failed to process image.");
        return;
      }

      setImagePreview(result);

      setForm((previous) => ({
        ...previous,
        image: result,
      }));
    };

    reader.onerror = () => {
      setError("Failed to read image.");
    };

    reader.readAsDataURL(file);
  };

  /* =======================================================
     IMAGE URL
  ======================================================= */

  const handleImageUrlChange = (value) => {
    setForm((previous) => ({
      ...previous,
      image: value,
    }));

    setImagePreview(value);
  };

  /* =======================================================
     SWITCH IMAGE MODE
  ======================================================= */

  const switchImageMode = (mode) => {
    setImageMode(mode);
    setError("");

    if (mode === "url") {
      setImageFile(null);

      const currentImage = form.image || "";

      const nextImage = isDataImage(currentImage)
        ? ""
        : currentImage;

      setForm((previous) => ({
        ...previous,
        image: nextImage,
      }));

      setImagePreview(nextImage);
    }

    if (mode === "device") {
      if (!isDataImage(form.image)) {
        setImagePreview("");
      }
    }
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    if (
      !form.name.en.trim() ||
      !form.name.am.trim() ||
      !form.name.om.trim()
    ) {
      return (
        "Menu name is required in English, Amharic and Afaan Oromoo."
      );
    }

    if (
      !form.description.en.trim() ||
      !form.description.am.trim() ||
      !form.description.om.trim()
    ) {
      return (
        "Menu description is required in all three languages."
      );
    }

    if (
      form.price === "" ||
      form.price === null ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      return "Please enter a valid price.";
    }

    if (!form.category) {
      return "Please select a category.";
    }

    if (!form.availability) {
      return "Please select availability.";
    }

    return "";
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: {
          en: form.name.en.trim(),
          am: form.name.am.trim(),
          om: form.name.om.trim(),
        },

        description: {
          en: form.description.en.trim(),
          am: form.description.am.trim(),
          om: form.description.om.trim(),
        },

        ingredients: {
          en: form.ingredients.en.trim(),
          am: form.ingredients.am.trim(),
          om: form.ingredients.om.trim(),
        },

        price: Number(form.price),

        category: form.category,

        image: form.image || "",

        tags: Array.isArray(form.tags)
          ? form.tags
          : [],

        availability: form.availability,

        preparationTime:
          form.preparationTime.trim(),

        sortOrder:
          Number(form.sortOrder) || 0,
      };

      if (editingItem) {
        payload.isActive =
          editingItem.isActive !== false;

        await updateMenuItem(
          editingItem._id,
          payload
        );

        setSuccess(
          "Menu item updated successfully."
        );
      } else {
        await createMenuItem(payload);

        setSuccess(
          "Menu item created successfully."
        );
      }

      await loadMenu();

      setTimeout(() => {
        setModalOpen(false);
        setEditingItem(null);
        setSuccess("");
      }, 700);
    } catch (err) {
      console.error("Save menu error:", err);

      setError(
        err?.message ||
          "Failed to save menu item."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Delete "${
        item?.name?.en || "this menu item"
      }"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(item._id);
      setError("");
      setSuccess("");

      await deleteMenuItem(item._id);

      setItems((previous) =>
        previous.filter(
          (menuItem) =>
            menuItem._id !== item._id
        )
      );

      setSuccess(
        "Menu item deleted successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "Delete menu error:",
        err
      );

      setError(
        err?.message ||
          "Failed to delete menu item."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =======================================================
     IMAGE ERROR
  ======================================================= */

  const handleCardImageError = (event) => {
    event.currentTarget.style.display = "none";

    const parent =
      event.currentTarget.parentElement;

    if (parent) {
      parent.classList.add(
        "flex",
        "items-center",
        "justify-center"
      );

      const placeholder =
        document.createElement("div");

      placeholder.className =
        "flex h-full w-full items-center justify-center text-[#aa9b90]";

      placeholder.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';

      parent.appendChild(placeholder);
    }
  };

  const handlePreviewImageError = (event) => {
    event.currentTarget.style.display = "none";
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-[1440px] px-0 sm:px-2 lg:px-4">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 sm:mb-8">
          <div className="relative overflow-hidden rounded-[28px] border border-[#eadfd6] bg-gradient-to-br from-[#fffdf9] via-white to-[#f6eee7] p-5 shadow-[0_10px_40px_rgba(58,36,24,0.06)] sm:p-7 lg:p-8">

            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#8b4f2f]/[0.05] blur-2xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#d8b69e]/[0.08] blur-2xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div className="min-w-0">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#eadfd6] bg-white/80 px-3 py-1.5 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b4f2f]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b4f2f]">
                    Cafe Administration
                  </p>
                </div>

                <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-[#3a2418] sm:text-4xl lg:text-5xl">
                  Menu Management
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#81736a] sm:text-[15px]">
                  Create, update and organize everything your
                  customers see on the digital menu.
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#8c7b70]">
                  <ChefHat
                    size={15}
                    className="text-[#8b4f2f]"
                  />

                  <span>
                    {items.length} menu{" "}
                    {items.length === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>

              </div>

              <div className="flex w-full gap-2.5 sm:w-auto sm:gap-3">

                <button
                  type="button"
                  onClick={loadMenu}
                  disabled={loading}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#dfd2c8] bg-white px-4 text-sm font-semibold text-[#5d5048] shadow-sm transition hover:bg-[#f5eee8] active:scale-[0.98] disabled:opacity-50 sm:flex-none"
                >
                  <RefreshCw
                    size={17}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#8b4f2f] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(139,79,47,0.22)] transition hover:bg-[#754126] active:scale-[0.98] sm:flex-none"
                >
                  <Plus size={18} />

                  <span>Add Item</span>
                </button>

              </div>

            </div>
          </div>
        </div>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-[22px] border border-[#efcfc7] bg-[#fff4f1] p-4 text-sm text-[#9b493b] shadow-sm">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span className="leading-5">
              {error}
            </span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-[22px] border border-[#cfe0ca] bg-[#f1f7ef] p-4 text-sm text-[#52734e] shadow-sm">
            <Check
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span className="leading-5">
              {success}
            </span>
          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

          <StatCard
            label="Total Items"
            value={items.length}
            valueClass="text-[#3a2418]"
          />

          <StatCard
            label="Available"
            value={
              items.filter(
                (item) =>
                  item?.availability ===
                  "available"
              ).length
            }
            valueClass="text-[#52734e]"
          />

          <StatCard
            label="Sold Out"
            value={
              items.filter(
                (item) =>
                  item?.availability ===
                  "sold-out"
              ).length
            }
            valueClass="text-[#9b493b]"
          />

          <StatCard
            label="Seasonal"
            value={
              items.filter(
                (item) =>
                  item?.availability ===
                  "seasonal"
              ).length
            }
            valueClass="text-[#b47a35]"
          />

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mb-6 rounded-[24px] border border-[#eadfd6] bg-white p-3.5 shadow-[0_6px_25px_rgba(58,36,24,0.04)] sm:p-4">

          <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-[minmax(0,1fr)_200px_180px]">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9b887b]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search menu..."
                className="h-12 w-full rounded-2xl border border-[#e4d9d0] bg-[#faf7f2] pl-11 pr-4 text-[16px] text-[#3a2418] outline-none transition placeholder:text-[#a5968b] focus:border-[#8b4f2f] focus:bg-white focus:ring-4 focus:ring-[#8b4f2f]/[0.08] sm:text-sm"
              />

            </div>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
              className="h-12 w-full rounded-2xl border border-[#e4d9d0] bg-[#faf7f2] px-4 text-[16px] font-medium text-[#5d5048] outline-none transition focus:border-[#8b4f2f] focus:bg-white focus:ring-4 focus:ring-[#8b4f2f]/[0.08] sm:text-sm"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {formatCategory(category)}
                </option>
              ))}
            </select>

            <select
              value={availabilityFilter}
              onChange={(event) =>
                setAvailabilityFilter(
                  event.target.value
                )
              }
              className="h-12 w-full rounded-2xl border border-[#e4d9d0] bg-[#faf7f2] px-4 text-[16px] font-medium text-[#5d5048] outline-none transition focus:border-[#8b4f2f] focus:bg-white focus:ring-4 focus:ring-[#8b4f2f]/[0.08] sm:text-sm"
            >
              <option value="all">
                All Status
              </option>

              {availabilityOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

          </div>
        </div>

        {/* =================================================
            MENU GRID
        ================================================= */}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[26px] border border-[#eadfd6] bg-white"
                >
                  <div className="aspect-[16/10] animate-pulse bg-[#eee6df]" />

                  <div className="space-y-3 p-5">

                    <div className="h-5 w-2/3 animate-pulse rounded bg-[#eee6df]" />

                    <div className="h-4 w-full animate-pulse rounded bg-[#eee6df]" />

                    <div className="h-10 w-full animate-pulse rounded bg-[#eee6df]" />

                  </div>
                </div>
              )
            )}

          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[#d9ccc2] bg-white px-5 py-14 text-center shadow-sm sm:px-6 sm:py-16">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4ebe4] text-[#8b4f2f]">
              <ChefHat size={28} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#3a2418]">
              No menu items found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#81736a]">
              Try changing your filters or create
              your first menu item.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="mt-6 rounded-2xl bg-[#8b4f2f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#8b4f2f]/15 transition hover:bg-[#754126] active:scale-[0.98]"
            >
              Add Menu Item
            </button>

          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

            {filteredItems.map((item) => {
              const image =
                getImageSource(item);

              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-[26px] border border-[#eadfd6] bg-white shadow-[0_6px_28px_rgba(58,36,24,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(58,36,24,0.11)]"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f2ebe5]">

                    {image ? (
                      <img
                        src={image}
                        alt={
                          item?.name?.en ||
                          "Menu item"
                        }
                        onError={
                          handleCardImageError
                        }
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#aa9b90]">
                        <ImageIcon
                          size={42}
                          strokeWidth={1.2}
                        />
                      </div>
                    )}

                    {/* Image overlay */}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />

                    <div className="absolute left-4 top-4">

                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide shadow-sm backdrop-blur ${
                          item?.availability ===
                          "available"
                            ? "bg-[#e8f0e5]/95 text-[#52734e]"
                            : item?.availability ===
                              "sold-out"
                            ? "bg-[#f6e2dc]/95 text-[#9b493b]"
                            : "bg-[#f6ead7]/95 text-[#a66e2d]"
                        }`}
                      >
                        {formatCategory(
                          item?.availability
                        )}
                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-4 sm:p-5">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h3 className="truncate font-serif text-[19px] font-semibold leading-tight text-[#3a2418] sm:text-xl">
                          {item?.name?.en ||
                            "Untitled Item"}
                        </h3>

                        {item?.name?.am && (
                          <p className="mt-1 text-xs font-medium text-[#9b887b]">
                            {item.name.am}
                          </p>
                        )}

                        {item?.name?.om && (
                          <p className="mt-0.5 text-xs text-[#9b887b]">
                            {item.name.om}
                          </p>
                        )}

                      </div>

                      <div className="shrink-0 text-right">

                        <span className="text-[9px] font-medium text-[#9b887b]">
                          ETB
                        </span>

                        <p className="text-lg font-bold tracking-tight text-[#3a2418] sm:text-xl">
                          {Number(
                            item?.price || 0
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-5 text-[#81736a]">
                      {item?.description?.en ||
                        "No description available."}
                    </p>

                    {/* TAGS */}

                    {Array.isArray(
                      item?.tags
                    ) &&
                      item.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">

                          {item.tags
                            .slice(0, 3)
                            .map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-[#f4ebe4] px-2.5 py-1 text-[10px] font-semibold text-[#795c49]"
                              >
                                {formatTag(
                                  tag
                                )}
                              </span>
                            ))}

                          {item.tags.length >
                            3 && (
                            <span className="rounded-full bg-[#f4ebe4] px-2.5 py-1 text-[10px] font-semibold text-[#795c49]">
                              +
                              {item.tags.length -
                                3}
                            </span>
                          )}

                        </div>
                      )}

                    {/* FOOTER */}

                    <div className="mt-5 flex flex-col gap-3 border-t border-[#eee6df] pt-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#9b887b]">
                        <Clock3 size={14} />

                        {item?.preparationTime ||
                          "—"}
                      </div>

                      <div className="flex w-full gap-2 sm:w-auto">

                        {/* Preview */}

                        <button
                          type="button"
                          onClick={() =>
                            setPreviewOpen(item)
                          }
                          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#e4d9d0] bg-white text-[#69584e] shadow-sm transition hover:bg-[#f4ebe4] active:scale-95 sm:w-11 sm:flex-none"
                          title="Preview"
                          aria-label="Preview menu item"
                        >
                          <Eye size={17} />
                        </button>

                        {/* Edit */}

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(item)
                          }
                          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#e4d9d0] bg-white text-[#8b4f2f] shadow-sm transition hover:bg-[#f4ebe4] active:scale-95 sm:w-11 sm:flex-none"
                          title="Edit"
                          aria-label="Edit menu item"
                        >
                          <Edit3 size={17} />
                        </button>

                        {/* Delete */}

                        <button
                          type="button"
                          disabled={
                            deletingId ===
                            item._id
                          }
                          onClick={() =>
                            handleDelete(item)
                          }
                          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#efd6d0] bg-white text-[#a14e43] shadow-sm transition hover:bg-[#fff0ed] active:scale-95 disabled:opacity-50 sm:w-11 sm:flex-none"
                          title="Delete"
                          aria-label="Delete menu item"
                        >
                          {deletingId ===
                          item._id ? (
                            <RefreshCw
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={17} />
                          )}
                        </button>

                      </div>

                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        )}

        {/* =================================================
            CREATE / EDIT MODAL
        ================================================= */}

        {modalOpen && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center bg-[#241a15]/60 p-0 backdrop-blur-md sm:items-center sm:p-4">

            <div className="flex max-h-[96dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] bg-[#faf7f2] shadow-[0_-10px_60px_rgba(36,26,21,0.2)] sm:max-h-[92vh] sm:rounded-[30px]">

              {/* MOBILE HANDLE */}

              <div className="flex shrink-0 justify-center bg-white pt-2 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-[#d8ccc3]" />
              </div>

              {/* HEADER */}

              <div className="flex shrink-0 items-center justify-between border-b border-[#eadfd6] bg-white px-4 py-3.5 sm:px-7 sm:py-4">

                <div className="min-w-0">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a27a60]">
                    Menu Management
                  </p>

                  <h2 className="font-serif text-xl font-semibold text-[#3a2418] sm:text-2xl">
                    {editingItem
                      ? "Edit Menu Item"
                      : "Add Menu Item"}
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4ebe4] text-[#5d5048] transition hover:bg-[#eadfd6] active:scale-95 disabled:opacity-50"
                  aria-label="Close modal"
                >
                  <X size={19} />
                </button>

              </div>

              {/* BODY */}

              <form
                onSubmit={handleSubmit}
                className="min-h-0 overflow-y-auto overscroll-contain"
              >

                <div className="grid gap-5 p-4 sm:gap-7 sm:p-7 lg:grid-cols-[minmax(0,1fr)_340px]">

                  {/* =================================================
                      LEFT
                  ================================================= */}

                  <div className="space-y-7">

                    {/* NAME */}

                    <section>

                      <SectionTitle
                        number="01"
                        title="Menu Name"
                      />

                      <div className="space-y-4">

                        <LocalizedInput
                          label="English"
                          value={
                            form.name.en
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "name",
                              "en",
                              value
                            )
                          }
                          placeholder="e.g. Cappuccino"
                        />

                        <LocalizedInput
                          label="አማርኛ"
                          value={
                            form.name.am
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "name",
                              "am",
                              value
                            )
                          }
                          placeholder="የምግብ ስም"
                        />

                        <LocalizedInput
                          label="Afaan Oromoo"
                          value={
                            form.name.om
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "name",
                              "om",
                              value
                            )
                          }
                          placeholder="Maqaa nyaataa"
                        />

                      </div>

                    </section>

                    {/* DESCRIPTION */}

                    <section>

                      <SectionTitle
                        number="02"
                        title="Description"
                      />

                      <div className="space-y-4">

                        <LocalizedTextarea
                          label="English"
                          value={
                            form.description.en
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "description",
                              "en",
                              value
                            )
                          }
                          placeholder="Describe the menu item..."
                        />

                        <LocalizedTextarea
                          label="አማርኛ"
                          value={
                            form.description.am
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "description",
                              "am",
                              value
                            )
                          }
                          placeholder="የምግቡን መግለጫ ያስገቡ..."
                        />

                        <LocalizedTextarea
                          label="Afaan Oromoo"
                          value={
                            form.description.om
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "description",
                              "om",
                              value
                            )
                          }
                          placeholder="Ibsa nyaataa galchi..."
                        />

                      </div>

                    </section>

                    {/* INGREDIENTS */}

                    <section>

                      <SectionTitle
                        number="03"
                        title="Ingredients"
                        optional
                      />

                      <div className="space-y-4">

                        <LocalizedTextarea
                          label="English"
                          value={
                            form.ingredients.en
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "ingredients",
                              "en",
                              value
                            )
                          }
                          placeholder="Espresso, milk, sugar..."
                        />

                        <LocalizedTextarea
                          label="አማርኛ"
                          value={
                            form.ingredients.am
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "ingredients",
                              "am",
                              value
                            )
                          }
                          placeholder="ቡና፣ ወተት፣ ስኳር..."
                        />

                        <LocalizedTextarea
                          label="Afaan Oromoo"
                          value={
                            form.ingredients.om
                          }
                          onChange={(value) =>
                            updateLocalizedField(
                              "ingredients",
                              "om",
                              value
                            )
                          }
                          placeholder="Buna, aannan, sukkaara..."
                        />

                      </div>

                    </section>

                    {/* PRICING */}

                    <section>

                      <SectionTitle
                        number="04"
                        title="Pricing & Category"
                      />

                      <div className="grid gap-4 sm:grid-cols-2">

                        <Field label="Price (ETB)">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.price}
                            onChange={(event) =>
                              updateField(
                                "price",
                                event.target.value
                              )
                            }
                            placeholder="0.00"
                            className={inputClass}
                            required
                          />
                        </Field>

                        <Field label="Category">
                          <select
                            value={
                              form.category
                            }
                            onChange={(event) =>
                              updateField(
                                "category",
                                event.target.value
                              )
                            }
                            className={inputClass}
                          >
                            {categories.map(
                              (category) => (
                                <option
                                  key={category}
                                  value={category}
                                >
                                  {formatCategory(
                                    category
                                  )}
                                </option>
                              )
                            )}
                          </select>
                        </Field>

                        <Field label="Availability">
                          <select
                            value={
                              form.availability
                            }
                            onChange={(event) =>
                              updateField(
                                "availability",
                                event.target.value
                              )
                            }
                            className={inputClass}
                          >
                            {availabilityOptions.map(
                              (option) => (
                                <option
                                  key={
                                    option.value
                                  }
                                  value={
                                    option.value
                                  }
                                >
                                  {option.label}
                                </option>
                              )
                            )}
                          </select>
                        </Field>

                        <Field label="Preparation Time">
                          <input
                            type="text"
                            value={
                              form.preparationTime
                            }
                            onChange={(event) =>
                              updateField(
                                "preparationTime",
                                event.target.value
                              )
                            }
                            placeholder="e.g. 10 min"
                            className={inputClass}
                          />
                        </Field>

                        <Field label="Display Order">
                          <input
                            type="number"
                            min="0"
                            value={
                              form.sortOrder
                            }
                            onChange={(event) =>
                              updateField(
                                "sortOrder",
                                event.target.value
                              )
                            }
                            placeholder="0"
                            className={inputClass}
                          />
                        </Field>

                      </div>

                    </section>

                    {/* TAGS */}

                    <section>

                      <SectionTitle
                        number="05"
                        title="Tags"
                        optional
                      />

                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

                        {tagOptions.map((tag) => {
                          const active =
                            form.tags.includes(
                              tag.value
                            );

                          return (
                            <button
                              key={tag.value}
                              type="button"
                              onClick={() =>
                                toggleTag(
                                  tag.value
                                )
                              }
                              className={`flex min-h-12 items-center justify-between rounded-xl border px-3 py-3 text-left text-xs font-semibold transition active:scale-[0.98] ${
                                active
                                  ? "border-[#8b4f2f] bg-[#8b4f2f] text-white shadow-sm"
                                  : "border-[#e4d9d0] bg-white text-[#69584e] hover:bg-[#f4ebe4]"
                              }`}
                            >
                              {tag.label}

                              {active && (
                                <Check
                                  size={14}
                                />
                              )}
                            </button>
                          );
                        })}

                      </div>

                    </section>

                  </div>

                  {/* =================================================
                      RIGHT
                  ================================================= */}

                  <div>

                    <div className="lg:sticky lg:top-0">

                      {/* IMAGE */}

                      <section className="rounded-[26px] border border-[#eadfd6] bg-white p-4 shadow-sm sm:p-5">

                        <SectionTitle
                          number="06"
                          title="Menu Image"
                        />

                        {/* MODE SWITCH */}

                        <div className="mb-4 grid grid-cols-2 rounded-xl bg-[#f4ebe4] p-1">

                          <button
                            type="button"
                            onClick={() =>
                              switchImageMode(
                                "url"
                              )
                            }
                            className={`flex min-h-11 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition ${
                              imageMode ===
                              "url"
                                ? "bg-white text-[#8b4f2f] shadow-sm"
                                : "text-[#796a60]"
                            }`}
                          >
                            <LinkIcon
                              size={14}
                            />

                            Image URL
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              switchImageMode(
                                "device"
                              )
                            }
                            className={`flex min-h-11 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition ${
                              imageMode ===
                              "device"
                                ? "bg-white text-[#8b4f2f] shadow-sm"
                                : "text-[#796a60]"
                            }`}
                          >
                            <Upload
                              size={14}
                            />

                            Device
                          </button>

                        </div>

                        {/* URL */}

                        {imageMode === "url" && (
                          <div>

                            <label className="mb-2 block text-xs font-semibold text-[#69584e]">
                              Image URL
                            </label>

                            <div className="relative">

                              <LinkIcon
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a5968b]"
                              />

                              <input
                                type="url"
                                value={
                                  isDataImage(
                                    form.image
                                  )
                                    ? ""
                                    : form.image
                                }
                                onChange={(event) =>
                                  handleImageUrlChange(
                                    event.target.value
                                  )
                                }
                                placeholder="https://example.com/image.jpg"
                                className={`${inputClass} pl-10`}
                              />

                            </div>

                            <p className="mt-2 text-[11px] leading-5 text-[#9b887b]">
                              Paste a public image
                              URL.
                            </p>

                          </div>
                        )}

                        {/* DEVICE */}

                        {imageMode === "device" && (
                          <div>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={
                                handleImageFile
                              }
                              className="hidden"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                fileInputRef.current?.click()
                              }
                              className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d9ccc2] bg-[#faf7f2] px-5 py-8 text-center transition hover:border-[#8b4f2f] hover:bg-[#f7efe8] active:scale-[0.99]"
                            >
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efe3da] text-[#8b4f2f]">
                                <Upload
                                  size={21}
                                />
                              </div>

                              <p className="mt-3 text-sm font-semibold text-[#3a2418]">
                                {imageFile
                                  ? "Change image"
                                  : "Choose image"}
                              </p>

                              <p className="mt-1 text-[11px] text-[#9b887b]">
                                JPG, PNG, WEBP,
                                GIF · Max 5 MB
                              </p>
                            </button>

                            {imageFile && (
                              <div className="mt-3 overflow-hidden rounded-xl bg-[#f1f7ef] px-3 py-2 text-xs text-[#52734e]">
                                <span className="font-semibold">
                                  Selected:
                                </span>{" "}
                                <span className="break-all">
                                  {imageFile.name}
                                </span>
                              </div>
                            )}

                          </div>
                        )}

                        {/* PREVIEW */}

                        <div className="mt-5">

                          <p className="mb-2 text-xs font-semibold text-[#69584e]">
                            Preview
                          </p>

                          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f1ebe5]">

                            {imagePreview ||
                            (form.image &&
                              !isDataImage(
                                form.image
                              )) ? (
                              <img
                                src={
                                  imagePreview ||
                                  form.image
                                }
                                alt="Preview"
                                onError={
                                  handlePreviewImageError
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full flex-col items-center justify-center text-[#aa9b90]">
                                <ImageIcon
                                  size={35}
                                  strokeWidth={1.2}
                                />

                                <p className="mt-2 text-xs">
                                  No image selected
                                </p>
                              </div>
                            )}

                          </div>

                        </div>

                      </section>

                      {/* INFO */}

                      <div className="mt-4 rounded-[22px] bg-[#3a2418] p-5 text-white shadow-lg">

                        <div className="flex items-center gap-2">

                          <ImageIcon size={17} />

                          <p className="text-sm font-semibold">
                            Image tip
                          </p>

                        </div>

                        <p className="mt-2 text-xs leading-5 text-white/65">
                          Use a high-quality landscape
                          image for the best appearance
                          on the customer menu.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="sticky bottom-0 z-20 flex flex-col gap-2.5 border-t border-[#eadfd6] bg-white/95 p-3.5 shadow-[0_-8px_25px_rgba(58,36,24,0.06)] backdrop-blur sm:flex-row sm:justify-end sm:p-5 sm:px-7">

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="h-12 w-full rounded-2xl border border-[#dfd2c8] bg-white px-6 text-sm font-semibold text-[#69584e] transition hover:bg-[#f4ebe4] active:scale-[0.99] disabled:opacity-50 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#8b4f2f] px-7 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(139,79,47,0.2)] transition hover:bg-[#754126] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {saving ? (
                      <>
                        <RefreshCw
                          size={17}
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={17} />

                        {editingItem
                          ? "Update Menu Item"
                          : "Create Menu Item"}
                      </>
                    )}
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

        {/* =================================================
            PREVIEW MODAL
        ================================================= */}

        {previewOpen && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center bg-[#241a15]/65 p-0 backdrop-blur-md sm:items-center sm:p-4">

            <div className="max-h-[94dvh] w-full max-w-xl overflow-y-auto rounded-t-[28px] bg-[#faf7f2] shadow-2xl sm:max-h-[92vh] sm:rounded-[30px]">

              {/* MOBILE HANDLE */}

              <div className="flex justify-center bg-white pt-2 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-[#d8ccc3]" />
              </div>

              {/* IMAGE */}

              <div className="relative aspect-[4/3] w-full bg-[#eee6df] sm:aspect-auto sm:h-96">

                {previewOpen.image ? (
                  <img
                    src={previewOpen.image}
                    alt={
                      previewOpen?.name?.en ||
                      "Menu item"
                    }
                    onError={
                      handlePreviewImageError
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#9b887b]">
                    <ImageIcon size={45} />
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

                <button
                  type="button"
                  onClick={() =>
                    setPreviewOpen(null)
                  }
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#3a2418] shadow-lg backdrop-blur transition hover:bg-white active:scale-95 sm:right-5 sm:top-5"
                  aria-label="Close preview"
                >
                  <X size={20} />
                </button>

              </div>

              {/* CONTENT */}

              <div className="p-5 sm:p-8">

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a27a60]">
                      {formatCategory(
                        previewOpen.category
                      )}
                    </p>

                    <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight text-[#3a2418] sm:text-3xl">
                      {previewOpen?.name?.en}
                    </h2>

                    {previewOpen?.name?.am && (
                      <p className="mt-1 text-xs text-[#9b887b]">
                        {previewOpen.name.am}
                      </p>
                    )}

                  </div>

                  <div className="shrink-0 text-right">

                    <span className="text-[10px] font-medium text-[#9b887b]">
                      ETB
                    </span>

                    <p className="text-xl font-bold text-[#3a2418] sm:text-2xl">
                      {Number(
                        previewOpen.price || 0
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

                <p className="mt-5 text-sm leading-6 text-[#665a52]">
                  {
                    previewOpen
                      ?.description?.en
                  }
                </p>

                {previewOpen?.ingredients
                  ?.en && (
                  <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">

                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8b4f2f]">
                      Ingredients
                    </p>

                    <p className="mt-2 text-sm leading-5 text-[#665a52]">
                      {
                        previewOpen
                          .ingredients
                          .en
                      }
                    </p>

                  </div>
                )}

                {Array.isArray(
                  previewOpen.tags
                ) &&
                  previewOpen.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">

                      {previewOpen.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#efe7dd] px-3 py-1.5 text-xs font-semibold text-[#69584e]"
                          >
                            {formatTag(tag)}
                          </span>
                        )
                      )}

                    </div>
                  )}

                {previewOpen.preparationTime && (
                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#81736a]">

                    <Clock3 size={15} />

                    {
                      previewOpen.preparationTime
                    }

                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setPreviewOpen(null)
                  }
                  className="mt-7 h-12 w-full rounded-2xl bg-[#8b4f2f] text-sm font-semibold text-white shadow-lg shadow-[#8b4f2f]/15 transition hover:bg-[#754126] active:scale-[0.99]"
                >
                  Close Preview
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  valueClass,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-[#eadfd6] bg-white p-4 shadow-[0_6px_24px_rgba(58,36,24,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(58,36,24,0.08)] sm:p-5">

      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#8b4f2f]/[0.035] transition group-hover:scale-150" />

      <p className="relative text-[10px] font-bold uppercase tracking-[0.1em] text-[#9b887b] sm:text-xs">
        {label}
      </p>

      <p
        className={`relative mt-1.5 text-2xl font-bold tracking-tight sm:mt-2 sm:text-3xl ${valueClass}`}
      >
        {value}
      </p>

      <div className="relative mt-3 h-1 w-8 overflow-hidden rounded-full bg-[#eee4dc]">
        <div className="h-full w-2/3 rounded-full bg-[#8b4f2f]/60" />
      </div>

    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  number,
  title,
  optional = false,
}) {
  return (
    <div className="mb-4 flex items-center gap-3">

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8b4f2f] text-[10px] font-bold text-white shadow-sm">
        {number}
      </span>

      <div className="min-w-0">

        <div className="flex flex-wrap items-center gap-2">

          <h3 className="font-serif text-lg font-semibold text-[#3a2418]">
            {title}
          </h3>

          {optional && (
            <span className="rounded-full bg-[#f4ebe4] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#a5968b]">
              Optional
            </span>
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({ label, children }) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-semibold text-[#69584e]">
        {label}
      </span>

      {children}

    </label>
  );
}

/* =========================================================
   LOCALIZED INPUT
========================================================= */

function LocalizedInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">

      <span className="mb-2 flex items-center justify-between text-xs font-semibold text-[#69584e]">

        <span>{label}</span>

        <span className="text-[10px] font-medium text-[#b1a198]">
          Required
        </span>

      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className={inputClass}
        required
      />

    </label>
  );
}

/* =========================================================
   LOCALIZED TEXTAREA
========================================================= */

function LocalizedTextarea({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-semibold text-[#69584e]">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={3}
        className={`${inputClass} resize-none leading-6`}
      />

    </label>
  );
}

/* =========================================================
   INPUT STYLE
========================================================= */

const inputClass =
  "w-full min-h-12 rounded-2xl border border-[#e4d9d0] bg-white px-4 py-3.5 text-[16px] text-[#3a2418] outline-none transition placeholder:text-[#aa9b90] focus:border-[#8b4f2f] focus:bg-white focus:ring-4 focus:ring-[#8b4f2f]/[0.08] sm:text-sm";

export default AdminMenu;