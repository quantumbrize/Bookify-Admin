import {
  Users,
  ShoppingBag,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOutIcon,
  Mail,
  Package,
  Box
} from "lucide-react";
import SidebarProps from "../interfaces/SidebarProps";
function Sidebar({
  isOpen,
  toggleSidebar,
  currentPath,
  setCurrentPath,
  onLogout,
}:SidebarProps) {
  const menuItems = [
    { id: "users", label: "Users", icon: Users, path: "/users" },
    {
      id: "merchants",
      label: "Merchants",
      icon: ShoppingBag,
      path: "/merchants",
    },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "product-management", label: "Product Management", icon: Package, path: "/product-management" },
    { id: "products", label: "Products", icon: Box, path: "/products" },
  ];
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#0961F5] text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col`}
    >
      
      <div
        className={`flex items-center justify-between ${
          isOpen ? "p-4" : "py-4 px-2.5 gap-1"
        } border-b border-[#E4EEFE]`}
      >
        <div className="flex items-center">
          <img
            src="https://github.com/shadcn.png"
            alt="Logo"
            className="h-8 w-8 rounded"
          />
          <h1 className={`ml-3 font-bold text-xl ${!isOpen && "hidden"}`}>
            Eduqik
          </h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-[#FFFFFF50] rounded-lg"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={15} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPath(item.path)}
            className={`w-full flex items-center p-4 hover:bg-[#FFFFFF50] transition-colors ${
              currentPath === item.path ? "bg-[#FFFFFF90] ": ""
            }`}
          >
            <item.icon size={20} />
            <span className={`ml-4 ${!isOpen && "hidden"}`}>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-[#E4EEFE] p-4">
        {isOpen ? (
          <div className="border border-[#E4EEFE] rounded-lg p-3 flex flex-col items-center transition-opacity duration-300">
            <img
              src="https://www.adilabadapp.com/adminAssets/images/menu-left/img-bot.png"
              alt="Contact"
              className="h-16 w-16 object-cover rounded-full shadow-md"
            />
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm shadow-md transition-transform transform hover:scale-105">
              Contact Us
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <button className="p-0 hover:bg-[#FFFFFF50] rounded-full w-full">
              <Mail size={20} />
            </button>
          </div>
        )}
      </div>
      <button
        onClick={onLogout}
        className="p-4 mb-2 border-t border-[#E4EEFE] hover:bg-[#FFFFFF50] flex items-center"
      >
        <LogOutIcon />
        <span className={`ml-4 ${!isOpen && "hidden"}`}>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;
