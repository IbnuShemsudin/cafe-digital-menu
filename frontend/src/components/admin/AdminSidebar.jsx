import { 
  LayoutDashboard, 
  Utensils, 
  Tags, 
  Settings, 
  LogOut, 
  Coffee, 
  X, 
} from "lucide-react"; 
 
import { NavLink, useNavigate } from "react-router-dom"; 
 
const menuItems = [ 
  { 
    name: "Dashboard", 
    icon: LayoutDashboard, 
    path: "/admin", 
  }, 
  { 
    name: "Menu", 
    icon: Utensils, 
    path: "/admin/menu", 
  }, 
  { 
    name: "Categories", 
    icon: Tags, 
    path: "/admin/categories", 
  }, 
  { 
    name: "Settings", 
    icon: Settings, 
    path: "/admin/settings", 
  }, 
]; 
 
function AdminSidebar({ 
  open, 
  onClose, 
}) { 
  const navigate = useNavigate(); 
 
  const logout = () => { 
    localStorage.removeItem("adminToken"); 
    localStorage.removeItem("admin"); 
    navigate("/admin/login"); 
  }; 
 
  return ( 
    <> 
      {open && ( 
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden" 
          onClick={onClose} 
        /> 
      )} 
 
      <aside 
        className={` 
          fixed left-0 top-0 z-50 
          flex h-screen w-72 
          flex-col 
          overflow-hidden
          border-r border-[#eadfd6] 
          bg-[#fffdf9] 
          transition-transform duration-300 
          lg:static lg:translate-x-0 
          ${ 
            open 
              ? "translate-x-0" 
              : "-translate-x-full" 
          } 
        `} 
      > 
        {/* LOGO */} 
 
        <div className="flex h-20 items-center justify-between border-b border-[#eadfd6] px-6"> 
          <div className="flex items-center gap-3"> 
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8b4f2f] text-white"> 
              <Coffee size={22} /> 
            </div> 
 
            <div> 
              <h1 className="font-serif text-lg font-bold text-[#3a2418]"> 
                Cafe Menu 
              </h1> 
 
              <p className="text-xs text-[#9b887b]"> 
                Administration 
              </p> 
            </div> 
          </div> 
 
          <button 
            onClick={onClose} 
            className="rounded-lg p-2 text-[#81736a] lg:hidden" 
          > 
            <X size={20} /> 
          </button> 
        </div> 
 
        {/* NAVIGATION */} 
 
        <nav className="flex-1 space-y-2 p-4"> 
          {menuItems.map((item) => { 
            const Icon = item.icon; 
 
            return ( 
              <NavLink 
                key={item.path} 
                to={item.path} 
                end={item.path === "/admin"} 
                onClick={onClose} 
                className={({ isActive }) => 
                  ` 
                  flex items-center gap-3 
                  rounded-2xl px-4 py-3.5 
                  text-sm font-semibold 
                  transition 
                  ${ 
                    isActive 
                      ? "bg-[#8b4f2f] text-white shadow-sm" 
                      : "text-[#69584e] hover:bg-[#f4ebe4]" 
                  } 
                  ` 
                } 
              > 
                <Icon size={19} /> 
 
                <span> 
                  {item.name} 
                </span> 
              </NavLink> 
            ); 
          })} 
        </nav> 
 
        {/* LOGOUT */} 
 
        <div className="border-t border-[#eadfd6] p-4"> 
          <button 
            onClick={logout} 
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#9b493b] transition hover:bg-[#f9ece9]" 
          > 
            <LogOut size={19} /> 
 
            Logout 
          </button> 
        </div> 
      </aside> 
    </> 
  ); 
} 
 
export default AdminSidebar;