import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  PauseCircle,
  Play,
  Trash2,
  Search,
  Clock,
  User,
  ShoppingBag,
  Filter,
  Eye,
  AlertTriangle,
  X,
  Receipt,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// --- Interfaces & Mock Data ---

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface HoldOrder {
  id: string;
  referenceNumber: string;
  customerName: string;
  note?: string;
  items: CartItem[];
  createdAt: string;
  totalAmount: number;
  itemCount: number;
  cashierName: string;
  tableOrTerminal?: string;
}

const INITIAL_HOLD_ORDERS: HoldOrder[] = [
  {
    id: "hold-101",
    referenceNumber: "HOLD-2026-081",
    customerName: "Walk-in Customer",
    note: "Customer forgot wallet in vehicle",
    createdAt: "2026-07-21T15:20:00Z",
    cashierName: "Kazi Rahat",
    tableOrTerminal: "Terminal 01",
    items: [
      { id: "p1", name: "Wireless Ergonomic Mouse", price: 29.99, quantity: 2 },
      {
        id: "p2",
        name: "Mechanical Gaming Keyboard",
        price: 89.5,
        quantity: 1,
      },
    ],
    totalAmount: 149.48,
    itemCount: 3,
  },
  {
    id: "hold-102",
    referenceNumber: "HOLD-2026-082",
    customerName: "Tanvir Ahmed",
    note: "Waiting for price confirmation on SSD",
    createdAt: "2026-07-21T14:45:00Z",
    cashierName: "Kazi Rahat",
    tableOrTerminal: "Table 04",
    items: [
      { id: "p3", name: "NVMe M.2 1TB SSD", price: 110.0, quantity: 1 },
      { id: "p4", name: "USB-C Fast Hub 7-in-1", price: 45.0, quantity: 1 },
      { id: "p5", name: "HDMI 2.1 Cable 2m", price: 12.5, quantity: 2 },
    ],
    totalAmount: 180.0,
    itemCount: 4,
  },
  {
    id: "hold-103",
    referenceNumber: "HOLD-2026-083",
    customerName: "Sultana Begum",
    note: "Added extra items, updating cart",
    createdAt: "2026-07-21T12:10:00Z",
    cashierName: "Samiul Islam",
    tableOrTerminal: "Terminal 02",
    items: [
      {
        id: "p6",
        name: "Bluetooth Noise-Canceling Headphones",
        price: 199.0,
        quantity: 1,
      },
    ],
    totalAmount: 199.0,
    itemCount: 1,
  },
];

export const SalesHoldPage: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [holdOrders, setHoldOrders] =
    useState<HoldOrder[]>(INITIAL_HOLD_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<HoldOrder | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<HoldOrder | null>(null);

  // Filtered Hold Orders
  const filteredOrders = useMemo(() => {
    return holdOrders.filter((order) => {
      const q = searchQuery.toLowerCase();
      return (
        order.referenceNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        (order.note && order.note.toLowerCase().includes(q)) ||
        order.cashierName.toLowerCase().includes(q)
      );
    });
  }, [holdOrders, searchQuery]);

  // Actions
  const handleResumeOrder = (order: HoldOrder) => {
    // Pass cart state back to POS billing terminal via navigation or state management
    navigate("/dashboard/sales/new", { state: { resumedOrder: order } });
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      setHoldOrders((prev) =>
        prev.filter((item) => item.id !== orderToDelete.id),
      );
      if (selectedOrder?.id === orderToDelete.id) {
        setSelectedOrder(null);
      }
      setOrderToDelete(null);
    }
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <Helmet>
        <title>Hold Orders | SmartPOS</title>
      </Helmet>

      <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 selection:bg-sky-500 selection:text-white">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <PauseCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Held Orders & Saved Carts
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                  {holdOrders.length} Active
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage temporary saved registers and quickly restore customer
                carts to POS checkout.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/sales/new")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white text-xs font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open POS Terminal</span>
          </button>
        </div>

        {/* ================= SEARCH & CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, customer, cashier, note..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto">
            <Filter className="w-3.5 h-3.5" />
            <span>
              Showing {filteredOrders.length} of {holdOrders.length} holds
            </span>
          </div>
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        {filteredOrders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-center">
            <div className="p-4 bg-slate-800/60 text-slate-500 rounded-full mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-semibold text-slate-200">
              No Held Orders Found
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              There are currently no active held carts. Carts paused during POS
              transactions will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Hold Orders List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredOrders.map((order) => {
                const isSelected = selectedOrder?.id === order.id;

                return (
                  <div
                    key={order.id}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-sky-500/80 shadow-lg shadow-sky-500/5 ring-1 ring-sky-500/50"
                        : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700"
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-sky-400">
                          {order.referenceNumber}
                        </span>
                        {order.tableOrTerminal && (
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60 rounded-md">
                            {order.tableOrTerminal}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {formatTimestamp(order.createdAt)}
                        </span>
                        <span className="text-slate-200 font-semibold font-mono text-sm">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{order.customerName}</span>
                          <span className="text-slate-500 text-[11px]">
                            ({order.itemCount} items)
                          </span>
                        </div>
                        {order.note && (
                          <p className="text-xs text-amber-400/90 italic truncate max-w-md">
                            "{order.note}"
                          </p>
                        )}
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOrderToDelete(order);
                          }}
                          className="p-2 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer"
                          title="Void Hold"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResumeOrder(order);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Restore to POS</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Order Details Preview Panel */}
            <div className="lg:col-span-1">
              {selectedOrder ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-20 space-y-5 shadow-xl">
                  {/* Panel Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-sky-400" />
                        Hold Details
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {selectedOrder.referenceNumber}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-slate-500 hover:text-slate-300 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Summary Meta */}
                  <div className="space-y-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Customer:</span>
                      <span className="font-semibold text-slate-200">
                        {selectedOrder.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cashier:</span>
                      <span className="text-slate-300">
                        {selectedOrder.cashierName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time Saved:</span>
                      <span className="text-slate-300">
                        {formatTimestamp(selectedOrder.createdAt)}
                      </span>
                    </div>
                    {selectedOrder.note && (
                      <div className="pt-1 border-t border-slate-800/60 text-amber-400/90 text-[11px]">
                        <span className="font-semibold text-amber-400">
                          Note:{" "}
                        </span>
                        {selectedOrder.note}
                      </div>
                    )}
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Cart Contents ({selectedOrder.itemCount})
                    </span>

                    <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/50"
                        >
                          <div className="space-y-0.5 truncate max-w-[170px]">
                            <p className="font-medium text-slate-200 truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-slate-200">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total Calculations */}
                  <div className="pt-3 border-t border-slate-800 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Tax (Estimated)</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800/80">
                      <span>Total Payable</span>
                      <span className="text-sky-400">
                        ${selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Restoring Button */}
                  <button
                    type="button"
                    onClick={() => handleResumeOrder(selectedOrder)}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Resume Order in Terminal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="h-full min-h-75 border-2 border-dashed border-slate-800/80 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-slate-500">
                  <Sparkles className="w-8 h-8 mb-2 text-slate-600" />
                  <p className="text-xs font-medium">
                    Select a hold order from the left
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Click any entry to inspect contents, totals, and notes.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= VOID / DELETE CONFIRMATION MODAL ================= */}
        {orderToDelete && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-rose-400">
                <div className="p-2 bg-rose-500/10 rounded-xl border border-rose-500/20">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Void Hold Order?
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to permanently clear hold reference{" "}
                <span className="font-mono text-slate-200 font-bold">
                  {orderToDelete.referenceNumber}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOrderToDelete(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteOrder}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                >
                  Confirm Void
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SalesHoldPage;
