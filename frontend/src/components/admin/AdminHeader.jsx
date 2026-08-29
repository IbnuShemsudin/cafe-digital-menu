import {
  Menu,
  Bell,
  UserCircle,
} from "lucide-react";

function AdminHeader({ onMenuClick }) {
  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#eadfd6] bg-[#fffdf9]/95 px-5 backdrop-blur sm:px-8">
      
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-[#5f5047] hover:bg-[#f4ebe4] lg:hidden"
      >
        <Menu size={23} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-[#9b887b]">
          Welcome back
        </p>

        <h2 className="font-serif text-lg font-semibold text-[#3a2418]">
          Cafe Administration
        </h2>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="relative rounded-xl p-2.5 text-[#69584e] hover:bg-[#f4ebe4]">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#8b4f2f]" />
        </button>

        <div className="hidden h-8 w-px bg-[#eadfd6] sm:block" />

        <div className="flex items-center gap-3">
          <UserCircle
            size={35}
            strokeWidth={1.5}
            className="text-[#8b4f2f]"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#3a2418]">
              {admin.name || "Cafe Admin"}
            </p>

            <p className="text-xs text-[#9b887b]">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;