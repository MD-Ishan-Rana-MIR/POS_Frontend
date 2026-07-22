import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  BarChart2,
  Search,
  Filter,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface SaleRecord {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: "Completed" | "Pending" | "Refunded";
}

interface SalesHistoryPageProps {
  /**
   * Custom background color class (Tailwind).
   * Defaults to 'bg-slate-900/60'.
   */
  bgColor?: string;
  title?: string;
}

const mockSales: SaleRecord[] = [
  {
    id: "ORD-9823",
    customer: "Sarah Jenkins",
    date: "2026-07-21",
    items: 3,
    total: 245.5,
    status: "Completed",
  },
  {
    id: "ORD-9822",
    customer: "TechCorp LLC",
    date: "2026-07-21",
    items: 12,
    total: 1890.0,
    status: "Completed",
  },
  {
    id: "ORD-9821",
    customer: "Marcus Vance",
    date: "2026-07-20",
    items: 1,
    total: 45.0,
    status: "Pending",
  },
  {
    id: "ORD-9820",
    customer: "Elena Rostova",
    date: "2026-07-20",
    items: 5,
    total: 612.2,
    status: "Completed",
  },
  {
    id: "ORD-9819",
    customer: "David Kim",
    date: "2026-07-19",
    items: 2,
    total: 110.0,
    status: "Refunded",
  },
  {
    id: "ORD-9818",
    customer: "Apex Systems",
    date: "2026-07-19",
    items: 8,
    total: 1250.75,
    status: "Completed",
  },
];

export const SalesHistoryPage: React.FC<SalesHistoryPageProps> = ({
  bgColor = "bg-slate-900/60",
  title = "Sales History & Analytics",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredSales = mockSales.filter((sale) => {
    const matchesSearch =
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Helmet handles document head dynamically */}
      <Helmet>
        <title>{title} | Business Dashboard</title>
        <meta
          name="description"
          content="View and manage past sales records, transactions, and revenue metrics."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Main Container */}
      <div
        className={`flex flex-col min-h-screen ${bgColor} backdrop-blur-md font-sans text-slate-100 p-6 transition-colors duration-200`}
      >
        <div className="max-w-7xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {title}
              </h1>
              <p className="text-sm text-slate-300">
                Monitor past revenue, order breakdowns, and fulfillment status.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-slate-800/80 backdrop-blur border border-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 shadow-sm transition-all">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Last 30 Days</span>
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all">
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/80 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">
                  Total Revenue
                </span>
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">$4,153.45</span>
                <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.5%
                </span>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/80 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">
                  Total Orders
                </span>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">31</span>
                <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +4.1%
                </span>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/80 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">
                  Average Order Value
                </span>
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">$133.98</span>
                <span className="flex items-center text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" /> -1.8%
                </span>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/80 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">
                  Completion Rate
                </span>
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                  <BarChart2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">96.8%</span>
                <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +0.5%
                </span>
              </div>
            </div>
          </div>

          {/* Search & Table Controls (Removed White Background) */}
          <div className="bg-slate-800/40 backdrop-blur rounded-xl border border-slate-700/80 shadow-md overflow-hidden">
            <div className="p-4 border-b border-slate-700/60 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900/60 border border-slate-700 text-slate-300 text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                >
                  <option value="All" className="bg-slate-800 text-slate-200">
                    All Statuses
                  </option>
                  <option
                    value="Completed"
                    className="bg-slate-800 text-slate-200"
                  >
                    Completed
                  </option>
                  <option
                    value="Pending"
                    className="bg-slate-800 text-slate-200"
                  >
                    Pending
                  </option>
                  <option
                    value="Refunded"
                    className="bg-slate-800 text-slate-200"
                  >
                    Refunded
                  </option>
                </select>
              </div>
            </div>

            {/* Sales Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700/60 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Order ID</th>
                    <th className="px-6 py-3.5">Customer</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5">Items</th>
                    <th className="px-6 py-3.5">Total</th>
                    <th className="px-6 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredSales.length > 0 ? (
                    filteredSales.map((sale) => (
                      <tr
                        key={sale.id}
                        className="hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-white">
                          {sale.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-200">
                          {sale.customer}
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {sale.date}
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {sale.items}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">
                          ${sale.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              sale.status === "Completed"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : sale.status === "Pending"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-slate-500"
                      >
                        No transactions found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>
                Showing {filteredSales.length} of {mockSales.length} entries
              </span>
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 rounded-md hover:bg-slate-700/50 disabled:opacity-30 disabled:hover:bg-transparent"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-slate-700/50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesHistoryPage;
