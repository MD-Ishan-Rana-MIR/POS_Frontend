import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Building2,
  Plus,
  Wifi,
  Clock,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShieldAlert,
  CheckCircle2,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

// --- Interfaces ---

interface NavbarProps {
  isSidebarCollapsed: boolean;
  pageTitle?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "warning" | "info" | "success";
  unread: boolean;
}

// --- Component ---

export const Navbar: React.FC<NavbarProps> = ({ isSidebarCollapsed, pageTitle = "Dashboard" }) => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [time, setTime] = useState<string>("");
  
  // Dropdown States
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showQuickAction, setShowQuickAction] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<string>("Main Outlet (Dhaka)");

  // Refs for click outside handling
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const quickActionRef = useRef<HTMLDivElement>(null);

  // Sample Notifications Data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Low Stock Alert",
      message: "5 items reached minimum stock threshold",
      time: "2 mins ago",
      type: "warning",
      unread: true,
    },
    {
      id: "2",
      title: "Shift Summary Ready",
      message: "Morning shift cash drawer closed: $1,240.00",
      time: "1 hour ago",
      type: "info",
      unread: true,
    },
    {
      id: "3",
      title: "Backup Complete",
      message: "Cloud database sync completed successfully",
      time: "3 hours ago",
      type: "success",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Live Clock & Network Status
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (quickActionRef.current && !quickActionRef.current.contains(e.target as Node)) {
        setShowQuickAction(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header
      className={`h-16 bg-slate-950 border-b border-slate-800 fixed top-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 select-none ${
        isSidebarCollapsed ? "left-20" : "left-64"
      }`}
    >
      {/* 1. Left Section: Page Title & Global Search */}
      <div className="flex items-center gap-4 sm:gap-6">
        <h1 className="text-base sm:text-lg font-bold text-white tracking-wide truncate max-w-[140px] sm:max-w-none">
          {pageTitle}
        </h1>

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full pl-9 pr-12 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-800 border border-slate-700 rounded shadow-inner">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* 2. Right Section: System Info & User Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* System Status: Live Clock & Network */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{time || "00:00:00"}</span>
          </div>
          <div className="h-3.5 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <Wifi className={`w-3.5 h-3.5 ${isOnline ? "text-emerald-400" : "text-rose-500"}`} />
            <span className={isOnline ? "text-emerald-400 font-medium" : "text-rose-400 font-medium"}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Branch Switcher */}
        <div className="relative hidden sm:block">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="appearance-none bg-slate-900 text-slate-300 border border-slate-800 text-xs rounded-lg pl-8 pr-7 py-2 focus:outline-none focus:border-sky-500 cursor-pointer transition-colors"
          >
            <option value="Main Outlet (Dhaka)">Main Outlet (Dhaka)</option>
            <option value="Branch 02 (Chittagong)">Branch 02 (Chittagong)</option>
            <option value="Express Store (Sylhet)">Express Store (Sylhet)</option>
          </select>
          <Building2 className="w-4 h-4 text-sky-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Quick Action (+ Menu) */}
        <div className="relative" ref={quickActionRef}>
          <button
            onClick={() => setShowQuickAction(!showQuickAction)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-lg shadow-sm shadow-sky-500/20 transition-all"
            title="Quick Add"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Quick Action</span>
          </button>

          {showQuickAction && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-xs">
              <button
                onClick={() => {
                  navigate("/dashboard/sales/new");
                  setShowQuickAction(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <ShoppingBag className="w-4 h-4 text-sky-400" />
                <span>New Sale (POS)</span>
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard/products/new");
                  setShowQuickAction(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add New Product</span>
              </button>
              <button
                onClick={() => {
                  navigate("/finance/expenses");
                  setShowQuickAction(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Record Expense</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Center Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
              {/* Notif Header */}
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500/20 text-sky-400 rounded-full border border-sky-500/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-sky-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notif List */}
              <div className="max-h-80 overflow-y-auto custom-scrollbar divide-y divide-slate-800/60">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 flex items-start gap-3 transition-colors ${
                        item.unread ? "bg-slate-800/30" : "hover:bg-slate-800/20"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.type === "warning" && (
                          <ShieldAlert className="w-4 h-4 text-amber-400" />
                        )}
                        {item.type === "info" && (
                          <Bell className="w-4 h-4 text-sky-400" />
                        )}
                        {item.type === "success" && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between font-semibold text-slate-200">
                          <span>{item.title}</span>
                          <span className="text-[10px] font-normal text-slate-500">{item.time}</span>
                        </div>
                        <p className="text-slate-400 mt-0.5 leading-relaxed">{item.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No new notifications
                  </div>
                )}
              </div>

              {/* Notif Footer */}
              <div className="p-2 bg-slate-950 border-t border-slate-800 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Account Menu */}
        <div className="relative pl-1 border-l border-slate-800" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-900 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm border border-sky-500/30">
              KR
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight">Kazi Rahat</span>
              <span className="text-[10px] text-slate-400">System Admin</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-slate-800">
                <p className="font-semibold text-white">Kazi Rahat</p>
                <p className="text-[11px] text-slate-400 truncate">rahat@smartpos.io</p>
              </div>

              <div className="py-1">
                <NavLink
                  to="/settings/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Account Profile</span>
                </NavLink>
                <NavLink
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>System Settings</span>
                </NavLink>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;