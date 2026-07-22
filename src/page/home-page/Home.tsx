import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Eye,
  AlertCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// --- Types & Interfaces ---

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  icon: React.ReactNode;
  accentColor: "sky" | "emerald" | "amber" | "rose";
}

interface RecentSale {
  id: string;
  invoice: string;
  customer: string;
  itemsCount: number;
  total: number;
  paymentMethod: "Cash" | "Card" | "Mobile";
  status: "Completed" | "Pending" | "Refunded";
  time: string;
}

interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  category: string;
}

// --- Main Dashboard Component ---

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<"today" | "weekly" | "monthly">(
    "today",
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Mock Data: Recent Sales
  const recentSales: RecentSale[] = [
    {
      id: "1",
      invoice: "INV-2026-0891",
      customer: "Tanvir Ahmed",
      itemsCount: 4,
      total: 142.5,
      paymentMethod: "Card",
      status: "Completed",
      time: "2 mins ago",
    },
    {
      id: "2",
      invoice: "INV-2026-0890",
      customer: "Walk-in Customer",
      itemsCount: 1,
      total: 18.0,
      paymentMethod: "Cash",
      status: "Completed",
      time: "12 mins ago",
    },
    {
      id: "3",
      invoice: "INV-2026-0889",
      customer: "Nusrat Jahan",
      itemsCount: 7,
      total: 310.2,
      paymentMethod: "Mobile",
      status: "Completed",
      time: "25 mins ago",
    },
    {
      id: "4",
      invoice: "INV-2026-0888",
      customer: "Walk-in Customer",
      itemsCount: 2,
      total: 45.0,
      paymentMethod: "Cash",
      status: "Pending",
      time: "40 mins ago",
    },
    {
      id: "5",
      invoice: "INV-2026-0887",
      customer: "Siddiqur Rahman",
      itemsCount: 3,
      total: 89.9,
      paymentMethod: "Card",
      status: "Refunded",
      time: "1 hour ago",
    },
  ];

  // Mock Data: Low Stock Alerts
  const lowStockItems: LowStockItem[] = [
    {
      id: "1",
      name: "Espresso Coffee Beans 1kg",
      sku: "CB-001",
      stock: 2,
      minStock: 10,
      category: "Beverages",
    },
    {
      id: "2",
      name: "Wireless Barcode Scanner",
      sku: "HW-402",
      stock: 1,
      minStock: 5,
      category: "Hardware",
    },
    {
      id: "3",
      name: "Thermal Paper Roll 80mm",
      sku: "PR-800",
      stock: 8,
      minStock: 25,
      category: "Supplies",
    },
    {
      id: "4",
      name: "Organic Almond Milk 1L",
      sku: "BEV-102",
      stock: 3,
      minStock: 12,
      category: "Dairy",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | SmartPOS</title>
        <meta
          name="description"
          content="SmartPOS Analytics Dashboard - Monitor real-time sales revenue, top products, low stock warnings, and transaction logs."
        />
      </Helmet>
      <div className="space-y-6 pb-8">
        {/* 1. Header Banner & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Welcome back, Kazi 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Here is what's happening in{" "}
              <span className="text-sky-400 font-medium">
                Main Outlet (Dhaka)
              </span>{" "}
              today.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Time range selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-medium text-slate-400">
              <button
                onClick={() => setTimeRange("today")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  timeRange === "today"
                    ? "bg-sky-500 text-white font-semibold"
                    : "hover:text-slate-200"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeRange("weekly")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  timeRange === "weekly"
                    ? "bg-sky-500 text-white font-semibold"
                    : "hover:text-slate-200"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeRange("monthly")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  timeRange === "monthly"
                    ? "bg-sky-500 text-white font-semibold"
                    : "hover:text-slate-200"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Sync / Refresh Button */}
            <button
              onClick={handleRefresh}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin text-sky-400" : ""}`}
              />
            </button>

            {/* Quick Launch POS Button */}
            <button
              onClick={() => navigate("/sales/new")}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Sale</span>
            </button>
          </div>
        </div>

        {/* 2. Top Metric Cards (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Revenue"
            value="$4,285.50"
            change="+14.2%"
            isPositive={true}
            timeframe="vs yesterday"
            icon={<DollarSign className="w-5 h-5 text-sky-400" />}
            accentColor="sky"
          />
          <MetricCard
            title="Total Orders"
            value="184"
            change="+8.5%"
            isPositive={true}
            timeframe="vs yesterday"
            icon={<ShoppingBag className="w-5 h-5 text-emerald-400" />}
            accentColor="emerald"
          />
          <MetricCard
            title="Customers"
            value="96"
            change="-2.1%"
            isPositive={false}
            timeframe="vs yesterday"
            icon={<Users className="w-5 h-5 text-amber-400" />}
            accentColor="amber"
          />
          <MetricCard
            title="Low Stock Alert"
            value="4 Items"
            change="Requires Action"
            isPositive={false}
            timeframe="critical"
            icon={<AlertCircle className="w-5 h-5 text-rose-400" />}
            accentColor="rose"
          />
        </div>

        {/* 3. Sales Analytics & Top Selling Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Card (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white">
                  Sales Overview
                </h2>
                <p className="text-xs text-slate-400">
                  Hourly revenue breakdown
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />{" "}
                  Sales ($)
                </span>
              </div>
            </div>

            {/* Mock Visual Graph (CSS Bar Visualization) */}
            <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800/80">
              {[
                { time: "08 AM", height: "20%", amount: "$120" },
                { time: "10 AM", height: "45%", amount: "$380" },
                { time: "12 PM", height: "85%", amount: "$840" },
                { time: "02 PM", height: "65%", amount: "$620" },
                { time: "04 PM", height: "95%", amount: "$980" },
                { time: "06 PM", height: "70%", amount: "$710" },
                { time: "08 PM", height: "50%", amount: "$490" },
                { time: "10 PM", height: "25%", amount: "$210" },
              ].map((bar, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                >
                  <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {bar.amount}
                  </span>
                  <div className="w-full max-w-[36px] bg-slate-900 rounded-t-md overflow-hidden h-full flex items-end">
                    <div
                      style={{ height: bar.height }}
                      className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-md group-hover:from-sky-500 group-hover:to-sky-300 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {bar.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 text-xs text-slate-400">
              <span>
                Peak Sales Time:{" "}
                <strong className="text-white">04:00 PM - 05:00 PM</strong>
              </span>
              <button className="text-sky-400 hover:underline flex items-center gap-1">
                <span>View detailed analytics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Top Selling Products List */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">Top Products</h2>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                  Today
                </span>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    name: "Cappuccino Large",
                    category: "Beverage",
                    sales: "42 sold",
                    revenue: "$210.00",
                  },
                  {
                    name: "Chicken Club Sandwich",
                    category: "Food",
                    sales: "31 sold",
                    revenue: "$279.00",
                  },
                  {
                    name: "Cold Brew Coffee",
                    category: "Beverage",
                    sales: "28 sold",
                    revenue: "$126.00",
                  },
                  {
                    name: "Chocolate Brownie",
                    category: "Bakery",
                    sales: "24 sold",
                    revenue: "$96.00",
                  },
                  {
                    name: "Fresh Orange Juice",
                    category: "Beverage",
                    sales: "19 sold",
                    revenue: "$76.00",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-sky-400">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.sales}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-200 font-mono">
                      {item.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/products/all")}
              className="w-full mt-4 py-2 text-center text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>

        {/* 4. Bottom Section: Recent Orders & Stock Warnings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions Table (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  Recent Transactions
                </h2>
                <p className="text-xs text-slate-400">
                  Live order activity from counter
                </p>
              </div>
              <button
                onClick={() => navigate("/sales/history")}
                className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-y border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Invoice</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Method</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentSales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono font-medium text-slate-200">
                        {sale.invoice}
                        <span className="block text-[10px] font-normal text-slate-400">
                          {sale.time}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-300">
                        {sale.customer}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-300">
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-100 font-mono">
                        ${sale.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-3">
                        {sale.status === "Completed" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        )}
                        {sale.status === "Pending" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                        {sale.status === "Refunded" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                            <AlertTriangle className="w-3 h-3" /> Refunded
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Warning Sidebar */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h2 className="text-base font-bold text-white">
                    Stock Warnings
                  </h2>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/30">
                  {lowStockItems.length} Urgent
                </span>
              </div>

              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        SKU: {item.sku}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {item.stock} left
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Min: {item.minStock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/stock")}
              className="w-full mt-4 py-2 text-center text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors"
            >
              Reorder Stock Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Reusable Metric Card Sub-component ---

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  timeframe,
  icon,
  accentColor,
}) => {
  const accentClasses = {
    sky: "bg-sky-500/10 border-sky-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    amber: "bg-amber-500/10 border-amber-500/20",
    rose: "bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div
          className={`p-2.5 rounded-xl border ${accentClasses[accentColor]}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs">
          {isPositive ? (
            <span className="flex items-center font-semibold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {change}
            </span>
          ) : (
            <span className="flex items-center font-semibold text-rose-400">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              {change}
            </span>
          )}
          <span className="text-slate-500 text-[11px]">{timeframe}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
