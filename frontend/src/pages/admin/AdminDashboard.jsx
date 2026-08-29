import { useEffect, useMemo, useState } from "react";
import {
  Utensils,
  CheckCircle2,
  AlertCircle,
  Star,
  ChefHat,
  Plus,
  ArrowRight,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import { getMenuItems } from "../../services/api";

function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMenuItems();

      setMenuItems(response.data || []);
    } catch (err) {
      console.error("Dashboard menu error:", err);

      setError(
        err.message || "Failed to load menu statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const statistics = useMemo(() => {
    const available = menuItems.filter(
      (item) =>
        item.availability === "available"
    ).length;

    const soldOut = menuItems.filter(
      (item) =>
        item.availability === "sold-out"
    ).length;

    const seasonal = menuItems.filter(
      (item) =>
        item.availability === "seasonal"
    ).length;

    const popular = menuItems.filter(
      (item) =>
        item.tags?.includes("popular")
    ).length;

    const chefPicks = menuItems.filter(
      (item) =>
        item.tags?.includes("chef-pick")
    ).length;

    const categories = new Set(
      menuItems.map(
        (item) => item.category
      )
    ).size;

    return {
      total: menuItems.length,
      available,
      soldOut,
      seasonal,
      popular,
      chefPicks,
      categories,
    };
  }, [menuItems]);

  return (
    <AdminLayout>

      <div className="mx-auto max-w-7xl">

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#a27a60]">
              Cafe overview
            </p>

            <h1 className="font-serif text-3xl font-bold text-[#3a2418] sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#81736a]">
              Keep your cafe menu fresh, organized,
              and ready for your customers.
            </p>
          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={fetchMenu}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dfd0c5] bg-white px-4 py-2.5 text-sm font-semibold text-[#69584e] transition hover:bg-[#f7f0ea] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            <Link
              to="/admin/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8b4f2f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#713d24]"
            >
              <Plus size={17} />

              Add Menu Item
            </Link>

          </div>

        </div>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

            <span>
              {error}
            </span>

            <button
              type="button"
              onClick={fetchMenu}
              className="shrink-0 font-semibold underline"
            >
              Try again
            </button>

          </div>
        )}

        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={Utensils}
            title="Total Menu Items"
            value={
              loading
                ? "—"
                : statistics.total
            }
            description="Items in your menu"
          />

          <StatCard
            icon={CheckCircle2}
            title="Available"
            value={
              loading
                ? "—"
                : statistics.available
            }
            description="Currently available"
          />

          <StatCard
            icon={AlertCircle}
            title="Sold Out"
            value={
              loading
                ? "—"
                : statistics.soldOut
            }
            description="Currently unavailable"
          />

          <StatCard
            icon={Star}
            title="Popular"
            value={
              loading
                ? "—"
                : statistics.popular
            }
            description="Customer favorites"
          />

        </div>

        {/* =====================================
            SECONDARY STATS
        ===================================== */}

        <div className="mt-5 grid gap-4 sm:grid-cols-3">

          <SmallStat
            icon={ChefHat}
            title="Chef's Picks"
            value={
              loading
                ? "—"
                : statistics.chefPicks
            }
          />

          <SmallStat
            icon={AlertCircle}
            title="Seasonal"
            value={
              loading
                ? "—"
                : statistics.seasonal
            }
          />

          <SmallStat
            icon={TrendingUp}
            title="Categories"
            value={
              loading
                ? "—"
                : statistics.categories
            }
          />

        </div>

        {/* =====================================
            MENU MANAGEMENT CARD
        ===================================== */}

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#eadfd6] bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4ebe4] text-[#8b4f2f]">
                <Utensils size={21} />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#a27a60]">
                  Menu control
                </p>

                <h2 className="font-serif text-xl font-bold text-[#3a2418]">
                  Manage Your Menu
                </h2>

                <p className="mt-1 max-w-lg text-sm leading-6 text-[#81736a]">
                  Add new dishes, update prices,
                  change availability, manage translations,
                  and remove items.
                </p>
              </div>

            </div>

            <Link
              to="/admin/menu"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#3a2418] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#241a15]"
            >
              Open Menu Manager

              <ArrowRight size={17} />
            </Link>

          </div>

          {/* QUICK INFO */}

          <div className="grid border-t border-[#eadfd6] sm:grid-cols-3">

            <QuickInfo
              label="Available"
              value={
                loading
                  ? "—"
                  : statistics.available
              }
            />

            <QuickInfo
              label="Sold Out"
              value={
                loading
                  ? "—"
                  : statistics.soldOut
              }
            />

            <QuickInfo
              label="Categories"
              value={
                loading
                  ? "—"
                  : statistics.categories
              }
            />

          </div>

        </div>

        {/* =====================================
            RECENT MENU ITEMS
        ===================================== */}

        <section className="mt-8">

          <div className="mb-5 flex items-end justify-between">

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#a27a60]">
                Latest
              </p>

              <h2 className="font-serif text-2xl font-bold text-[#3a2418]">
                Recent Menu Items
              </h2>
            </div>

            <Link
              to="/admin/menu"
              className="hidden items-center gap-1 text-sm font-semibold text-[#8b4f2f] sm:flex"
            >
              View all

              <ArrowRight size={15} />
            </Link>

          </div>

          {loading ? (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="h-28 animate-pulse rounded-[22px] border border-[#eadfd6] bg-white"
                  />
                )
              )}

            </div>

          ) : menuItems.length === 0 ? (

            <div className="rounded-[24px] border border-dashed border-[#d9c9bc] bg-white/60 px-6 py-12 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4ebe4] text-[#8b4f2f]">
                <Utensils size={21} />
              </div>

              <h3 className="mt-4 font-serif text-lg font-bold text-[#3a2418]">
                No menu items yet
              </h3>

              <p className="mt-1 text-sm text-[#81736a]">
                Start by adding your first item.
              </p>

              <Link
                to="/admin/menu"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8b4f2f] px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={16} />

                Add First Item
              </Link>

            </div>

          ) : (

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {menuItems
                .slice(0, 6)
                .map((item) => (
                  <RecentItem
                    key={item._id}
                    item={item}
                  />
                ))}

            </div>

          )}

        </section>

      </div>

    </AdminLayout>
  );
}

/* ==========================================
   STAT CARD
========================================== */

function StatCard({
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-[24px] border border-[#eadfd6] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4ebe4] text-[#8b4f2f]">
          <Icon size={20} />
        </div>

      </div>

      <p className="mt-5 text-sm font-medium text-[#81736a]">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-[#3a2418]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#a6968b]">
        {description}
      </p>

    </div>
  );
}

/* ==========================================
   SMALL STAT
========================================== */

function SmallStat({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-[#eadfd6] bg-white p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4ebe4] text-[#8b4f2f]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs text-[#81736a]">
          {title}
        </p>

        <p className="text-xl font-bold text-[#3a2418]">
          {value}
        </p>
      </div>

    </div>
  );
}

/* ==========================================
   QUICK INFO
========================================== */

function QuickInfo({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#eadfd6] px-6 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">

      <span className="text-sm text-[#81736a]">
        {label}
      </span>

      <span className="font-semibold text-[#3a2418]">
        {value}
      </span>

    </div>
  );
}

/* ==========================================
   RECENT ITEM
========================================== */

function RecentItem({ item }) {
  const image =
    item.image ||
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500";

  const availability =
    item.availability || "available";

  return (
    <div className="flex overflow-hidden rounded-[22px] border border-[#eadfd6] bg-white">

      <img
        src={image}
        alt={item.name?.en || "Menu item"}
        className="h-28 w-28 shrink-0 object-cover"
      />

      <div className="min-w-0 flex-1 p-4">

        <div className="flex items-start justify-between gap-2">

          <h3 className="truncate font-semibold text-[#3a2418]">
            {item.name?.en || "Untitled"}
          </h3>

          <span className="shrink-0 text-sm font-bold text-[#8b4f2f]">
            {Number(item.price || 0).toLocaleString()} ETB
          </span>

        </div>

        <p className="mt-1 truncate text-xs text-[#9b887b]">
          {item.category || "Uncategorized"}
        </p>

        <div className="mt-3">

          <span
            className={`
              inline-flex rounded-full px-2.5 py-1
              text-[11px] font-semibold
              ${
                availability === "available"
                  ? "bg-green-50 text-green-700"
                  : availability === "sold-out"
                  ? "bg-red-50 text-red-700"
                  : "bg-amber-50 text-amber-700"
              }
            `}
          >
            {availability === "sold-out"
              ? "Sold Out"
              : availability === "seasonal"
              ? "Seasonal"
              : "Available"}
          </span>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;