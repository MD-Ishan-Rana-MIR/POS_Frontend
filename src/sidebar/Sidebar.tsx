import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  Truck,
  Users,
  Wallet,
  RotateCcw,
  UserCheck,
  Utensils,
  Pill,
  PieChart,
  Store,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle,
  Search,
  Bell,
  Building2,
} from "lucide-react";

// --- Interfaces & Types ---

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  collapsed?: boolean;
}

interface SubMenuItem {
  label: string;
  to: string;
}

interface NavSubmenuProps {
  icon: React.ReactNode;
  label: string;
  items: SubMenuItem[];
  isOpen: boolean;
  collapsed?: boolean;
  onToggle: () => void;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

// --- Top Navbar Component ---

export const Navbar: React.FC<{ isSidebarCollapsed: boolean }> = ({
  isSidebarCollapsed,
}) => {
  const location = useLocation();

  // Generate page title based on current pathname
  const getPageTitle = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "dashboard";
    const formatted = lastSegment.replace(/-/g, " ");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <header
      className={`h-16 bg-slate-950 border-b border-slate-800 fixed top-0 right-0 z-40 flex items-center justify-between px-6 transition-all duration-300 ${
        isSidebarCollapsed ? "left-20" : "left-64"
      }`}
    >
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold text-white capitalize hidden sm:block">
          {getPageTitle(location.pathname)}
        </h1>
        <div className="relative w-64 md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
      </div>

      {/* Quick Actions & Status */}
      <div className="flex items-center gap-4">
        {/* Branch Selector */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
          <Building2 className="w-4 h-4 text-sky-400" />
          <span>Main Outlet (Dhaka)</span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-slate-950" />
        </button>
      </div>
    </header>
  );
};

// --- Main Sidebar Component ---

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleSubmenu = (menuName: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSubmenu(menuName);
    } else {
      setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    }
  };

  const handleLogout = () => {
    // Perform authentication logic here
    navigate("/login");
  };

  return (
    <aside
      className={`h-screen bg-slate-900 text-slate-300 flex flex-col justify-between select-none fixed left-0 top-0 shadow-xl border-r border-slate-800 transition-all duration-300 ease-in-out z-50 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* 1. Header / Logo & Collapse Toggle */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 bg-slate-950 border-b border-slate-800">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400 shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-white tracking-wide whitespace-nowrap transition-opacity duration-200">
                Smart<span className="text-sky-400">POS</span>
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* 2. Menu Navigation */}
        <nav className="px-3 py-4 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
          {/* Main Dashboard */}
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            collapsed={isCollapsed}
          />

          {/* Sales & Billing */}
          <NavSubmenu
            icon={<ShoppingCart className="w-5 h-5" />}
            label="Sales & Billing"
            isOpen={openSubmenu === "Sales"}
            collapsed={isCollapsed}
            onToggle={() => toggleSubmenu("Sales")}
            items={[
              { label: "New Sale (POS)", to: "/dashboard/sales/new" },
              { label: "Sales History", to: "/dashboard/sales/history" },
              { label: "Hold Orders", to: "/dashboard/sales/holds" },
            ]}
          />

          {/* Product Management */}
          <NavSubmenu
            icon={<Package className="w-5 h-5" />}
            label="Products"
            isOpen={openSubmenu === "Products"}
            collapsed={isCollapsed}
            onToggle={() => toggleSubmenu("Products")}
            items={[
              { label: "All Products", to: "/dashboard/products/all" },
              { label: "Add Product", to: "/dashboard/products/new" },
              { label: "Categories", to: "/dashboard/products/categories" },
              { label: "Print Barcodes", to: "/dashboard/products/barcodes" },
            ]}
          />

          {/* Inventory */}
          <NavItem
            to="/dashboard/stock"
            icon={<Warehouse className="w-5 h-5" />}
            label="Stock Management"
            badge="Low: 5"
            collapsed={isCollapsed}
          />

          {/* Purchase & Suppliers */}
          <NavSubmenu
            icon={<Truck className="w-5 h-5" />}
            label="Purchases"
            isOpen={openSubmenu === "Purchases"}
            collapsed={isCollapsed}
            onToggle={() => toggleSubmenu("Purchases")}
            items={[
              { label: "Purchase List", to: "/dashboard/purchases/list" },
              { label: "Add Purchase", to: "/dashboard/purchases/new" },
              { label: "Suppliers", to: "/dashboard/purchases/suppliers" },
            ]}
          />

          {/* Customers */}
          <NavItem
            to="/dashboard/customers"
            icon={<Users className="w-5 h-5" />}
            label="Customers & Loyalty"
            collapsed={isCollapsed}
          />

          {/* Accounts & Finance */}
          <NavSubmenu
            icon={<Wallet className="w-5 h-5" />}
            label="Accounts & Finance"
            isOpen={openSubmenu === "Accounts"}
            collapsed={isCollapsed}
            onToggle={() => toggleSubmenu("Accounts")}
            items={[
              { label: "Cash Book / Ledger", to: "/finance/ledger" },
              { label: "Expenses", to: "/finance/expenses" },
              { label: "Bank Accounts", to: "/finance/banks" },
            ]}
          />

          {/* Return & Refund */}
          <NavItem
            to="/returns"
            icon={<RotateCcw className="w-5 h-5" />}
            label="Return & Refund"
            collapsed={isCollapsed}
          />

          {/* Employee Management */}
          <NavItem
            to="/employees"
            icon={<UserCheck className="w-5 h-5" />}
            label="Employees & HR"
            collapsed={isCollapsed}
          />

          {/* Special Modules Divider */}
          {!isCollapsed ? (
            <div className="pt-4 pb-1 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Special Modules
            </div>
          ) : (
            <div className="my-2 border-t border-slate-800" />
          )}

          {/* Restaurant POS */}
          <NavSubmenu
            icon={<Utensils className="w-5 h-5" />}
            label="Restaurant"
            isOpen={openSubmenu === "Restaurant"}
            collapsed={isCollapsed}
            onToggle={() => toggleSubmenu("Restaurant")}
            items={[
              { label: "Table Layout", to: "/restaurant/tables" },
              { label: "Kitchen Display (KDS)", to: "/restaurant/kds" },
            ]}
          />

          {/* Pharmacy POS */}
          <NavSubmenu
            icon={<Pill className="w-5 h-5" />}
            label="Pharmacy"
            isOpen={openSubmenu === "Pharmacy"}
            collapsed={isCollapsed}
            onToggle={() => toggleSubmenu("Pharmacy")}
            items={[
              { label: "Batch & Expiry Alert", to: "/pharmacy/alerts" },
              { label: "Prescriptions", to: "/pharmacy/prescriptions" },
            ]}
          />

          {/* System Divider */}
          {!isCollapsed ? (
            <div className="pt-4 pb-1 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              System
            </div>
          ) : (
            <div className="my-2 border-t border-slate-800" />
          )}

          {/* Reports */}
          <NavItem
            to="/reports"
            icon={<PieChart className="w-5 h-5" />}
            label="Reports & Analytics"
            collapsed={isCollapsed}
          />

          {/* Branches */}
          <NavItem
            to="/branches"
            icon={<Store className="w-5 h-5" />}
            label="Multi-Branch"
            collapsed={isCollapsed}
          />

          {/* Settings */}
          <NavItem
            to="/settings"
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            collapsed={isCollapsed}
          />
        </nav>
      </div>

      {/* 3. User Profile Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <UserCircle className="w-9 h-9 text-slate-400 shrink-0" />
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden">
              <span className="text-sm font-semibold text-white leading-none truncate">
                Kazi Rahat
              </span>
              <span className="text-xs text-slate-500 mt-1 truncate">
                Admin (Main)
              </span>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
};

// --- Helper Components ---

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  badge,
  collapsed,
}) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    title={collapsed ? label : undefined}
    className={({ isActive }) =>
      `w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
        isActive
          ? "bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
      }`
    }
  >
    <div className="flex items-center gap-3">
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </div>
    {!collapsed && badge && (
      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full shrink-0">
        {badge}
      </span>
    )}
  </NavLink>
);

const NavSubmenu: React.FC<NavSubmenuProps> = ({
  icon,
  label,
  items,
  isOpen,
  collapsed,
  onToggle,
}) => {
  const location = useLocation();
  const isChildActive = items.some((item) => location.pathname === item.to);

  return (
    <div className="relative group">
      {/* Trigger Button */}
      <button
        onClick={onToggle}
        title={collapsed ? label : undefined}
        aria-expanded={isOpen}
        className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
          isOpen || isChildActive
            ? "text-white bg-slate-800/80 font-semibold"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`shrink-0 transition-colors duration-200 ${isChildActive ? "text-sky-400" : ""}`}>
            {icon}
          </span>
          {!collapsed && <span className="truncate">{label}</span>}
        </div>
        {!collapsed && (
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ease-out shrink-0 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </button>

      {/* Expanded Inline Submenu with CSS Height Grid Animation */}
      {!collapsed && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pl-9 pr-2 py-1 space-y-1 bg-slate-950/40 rounded-b-lg border-l-2 border-slate-800 ml-5">
              {items.map((subItem) => (
                <SubNavItem key={subItem.to} to={subItem.to} label={subItem.label} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Hover Flyout Submenu */}
      {collapsed && (
        <div className="absolute left-full top-0 ml-2 hidden group-hover:block w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-2 z-50 animate-in fade-in slide-in-from-left-2 duration-150">
          <div className="px-3 py-1.5 text-xs font-semibold text-sky-400 border-b border-slate-800 mb-1">
            {label}
          </div>
          {items.map((subItem) => (
            <SubNavItem key={subItem.to} to={subItem.to} label={subItem.label} />
          ))}
        </div>
      )}
    </div>
  );
};

const SubNavItem: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block py-2 px-3 text-xs rounded-md transition-colors truncate ${
        isActive
          ? "text-sky-400 font-semibold bg-slate-800/60"
          : "text-slate-400 hover:text-sky-400 hover:bg-slate-800/40"
      }`
    }
  >
    {label}
  </NavLink>
);

export default Sidebar;