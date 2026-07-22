import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import {
  Search,
  UserPlus,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  QrCode,
  Pause,
  RotateCcw,
  CheckCircle,
  Barcode,
  ShoppingBag,
  X,
  Printer,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// ================= TYPES & INTERFACES =================
export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export interface CartItem extends Product {
  qty: number;
}

export type PaymentMethod = "CASH" | "CARD" | "MFS";

// ================= MOCK DATA =================
const mockProducts: Product[] = [
  {
    id: 1,
    code: "1001",
    name: "Miniket Rice 5kg",
    price: 380,
    category: "Grocery",
    stock: 24,
    image: "🌾",
  },
  {
    id: 2,
    code: "1002",
    name: "Soyabean Oil 2L",
    price: 370,
    category: "Grocery",
    stock: 8,
    image: "🧴",
  },
  {
    id: 3,
    code: "1003",
    name: "Napa Extra 500mg (Box)",
    price: 120,
    category: "Pharmacy",
    stock: 15,
    image: "💊",
  },
  {
    id: 4,
    code: "1004",
    name: "Chicken Burger",
    price: 180,
    category: "Food",
    stock: 45,
    image: "🍔",
  },
  {
    id: 5,
    code: "1005",
    name: "Coca-Cola 500ml",
    price: 50,
    category: "Beverage",
    stock: 0,
    image: "🥤",
  },
  {
    id: 6,
    code: "1006",
    name: "Detergent Powder 1kg",
    price: 160,
    category: "Grocery",
    stock: 18,
    image: "🧼",
  },
];

const categories: string[] = ["All", "Grocery", "Pharmacy", "Food", "Beverage"];

// ================= MAIN COMPONENT =================
const NewSalePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [barcodeInput, setBarcodeInput] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);

  const vatRate = 0.05; // 5% VAT

  // Add Product to Cart with Stock Check
  const addToCart = (product: Product): void => {
    if (product.stock <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.qty >= product.stock) {
          alert(`Cannot add more. Stock limit reached (${product.stock})`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Handle Barcode Scan On 'Enter'
  const handleBarcodeSubmit = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && barcodeInput.trim() !== "") {
      const foundProduct = products.find(
        (p) => p.code.toLowerCase() === barcodeInput.trim().toLowerCase(),
      );
      if (foundProduct) {
        addToCart(foundProduct);
        setBarcodeInput("");
      } else {
        alert("Product with barcode not found!");
      }
    }
  };

  // Update Cart Quantity
  const updateQty = (id: number, delta: number): void => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            if (newQty > item.stock) {
              alert(`Only ${item.stock} items available in stock.`);
              return item;
            }
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  // Remove Item
  const removeItem = (id: number): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const vat = subtotal * vatRate;
  const grandTotal = Math.max(0, subtotal + vat - discount);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Payment Completion
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsInvoiceOpen(true);
  };

  const completeTransaction = () => {
    // Deduct stock locally
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((item) => item.id === prod.id);
        if (cartItem) {
          return { ...prod, stock: prod.stock - cartItem.qty };
        }
        return prod;
      }),
    );
    setCart([]);
    setDiscount(0);
    setIsInvoiceOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>New Sales | SmartPOS</title>
      </Helmet>
      <div className="flex h-screen bg-slate-950 font-sans text-slate-100 overflow-hidden">
        {/* ================= LEFT SECTION: CART & CHECKOUT ================= */}
        <div className="w-100 bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-2xl z-10">
          {/* Customer & Scan Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Customer
              </label>
              <button className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors">
                <UserPlus className="w-3.5 h-3.5" /> Add New
              </button>
            </div>

            <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-sm">
              <option value="walk-in" className="bg-slate-800 text-slate-200">
                Walk-in Customer
              </option>
              <option value="cust-1" className="bg-slate-800 text-slate-200">
                Rahim Ahmed (+8801700000000)
              </option>
              <option value="cust-2" className="bg-slate-800 text-slate-200">
                Karim Hossain (+8801800000000)
              </option>
            </select>

            {/* Barcode Scanner Input */}
            <div className="relative">
              <Barcode className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Scan code & press enter..."
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={handleBarcodeSubmit}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 focus:outline-none shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <div className="p-4 bg-slate-800 rounded-full border border-slate-700/60">
                  <ShoppingBag className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-xs font-semibold text-slate-300">
                  Cart is Empty
                </p>
                <p className="text-[11px] text-slate-400 text-center max-w-45">
                  Click items on the right or scan a barcode to begin
                </p>
              </div>
            ) : (
              cart.map((item) => (
                /* Slate Card for Cart Items */
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-slate-800 border border-slate-700/80 shadow-sm rounded-xl hover:border-slate-600 transition-all"
                >
                  <div className="flex-1 pr-2">
                    <h4 className="text-xs font-bold text-slate-200 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      ৳{item.price} × {item.qty} ={" "}
                      <span className="font-bold text-slate-100">
                        ৳{(item.price * item.qty).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="p-1 hover:bg-slate-700 text-slate-300 transition-colors"
                        type="button"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-slate-200">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-1 hover:bg-slate-700 text-slate-300 transition-colors"
                        type="button"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      type="button"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Summary */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-100">
                ৳{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>VAT (5%)</span>
              <span className="font-semibold text-slate-100">
                ৳{vat.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-300 items-center">
              <span>Discount (৳)</span>
              <input
                type="number"
                min="0"
                value={discount || ""}
                placeholder="0"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDiscount(Math.max(0, Number(e.target.value)))
                }
                className="w-20 px-2 py-0.5 text-right bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-slate-100 focus:outline-none focus:border-sky-500 shadow-sm"
              />
            </div>

            <div className="flex justify-between text-base font-bold text-slate-100 pt-2 border-t border-slate-800">
              <span>Grand Total</span>
              <span className="text-sky-400 text-lg">
                ৳{grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setCart([])}
                disabled={cart.length === 0}
                className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 disabled:opacity-40 transition-colors"
                type="button"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear
              </button>
              <button
                type="button"
                disabled={cart.length === 0}
                className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 disabled:opacity-40 transition-colors"
              >
                <Pause className="w-3.5 h-3.5" /> Hold
              </button>
            </div>

            {/* Payment Method Selector & Checkout Button */}
            <div className="pt-1 space-y-2">
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CASH")}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center text-[11px] transition-all ${
                    paymentMethod === "CASH"
                      ? "border-sky-500 bg-sky-500/10 text-sky-400 font-bold shadow-sm"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <Banknote className="w-4 h-4 mb-0.5" /> Cash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CARD")}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center text-[11px] transition-all ${
                    paymentMethod === "CARD"
                      ? "border-sky-500 bg-sky-500/10 text-sky-400 font-bold shadow-sm"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-0.5" /> Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("MFS")}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center text-[11px] transition-all ${
                    paymentMethod === "MFS"
                      ? "border-sky-500 bg-sky-500/10 text-sky-400 font-bold shadow-sm"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <QrCode className="w-4 h-4 mb-0.5" /> MFS
                </button>
              </div>

              <button
                type="button"
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 active:scale-[0.99] disabled:opacity-40 text-white font-bold rounded-xl shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all text-xs"
              >
                <CheckCircle className="w-4 h-4" /> Pay Now (৳
                {grandTotal.toFixed(2)})
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION: PRODUCT SELECTION ================= */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900/40">
          {/* Top Search & Filter Bar */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shadow-sm">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by product name or code..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stock <= 0;
                return (
                  /* Slate Background Card for Products */
                  <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className={`bg-slate-800 border border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between transition-all relative group shadow-sm ${
                      isOutOfStock
                        ? "opacity-50 cursor-not-allowed bg-slate-800/60"
                        : "hover:border-sky-500/60 hover:shadow-md cursor-pointer hover:-translate-y-0.5"
                    }`}
                  >
                    <div>
                      <div className="h-24 bg-slate-900/60 rounded-xl flex items-center justify-center text-4xl mb-2.5 group-hover:scale-105 transition-transform border border-slate-800">
                        {product.image}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider border border-sky-500/20">
                          {product.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          #{product.code}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-100 text-xs mt-1.5 line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">
                          Price
                        </span>
                        <span className="text-xs font-bold text-white">
                          ৳{product.price}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${
                          isOutOfStock
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : product.stock <= 10
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : `Stock: ${product.stock}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= INVOICE / RECEIPT MODAL ================= */}
        {isInvoiceOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 text-slate-200">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <h3 className="font-bold text-white text-sm">
                  Receipt Preview
                </h3>
                <button
                  onClick={() => setIsInvoiceOpen(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center space-y-1">
                <h2 className="font-bold text-base text-white">
                  SuperStore Ltd.
                </h2>
                <p className="text-[10px] text-slate-400">
                  Dhaka, Bangladesh | +8801700000000
                </p>
                <p className="text-[10px] font-mono text-slate-400 pt-1">
                  Payment Method: {paymentMethod}
                </p>
              </div>

              <div className="border-t border-b border-slate-700 border-dashed py-2 space-y-1 max-h-40 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-xs text-slate-300"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-semibold text-slate-100">
                      ৳{(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-slate-200">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>VAT (5%):</span>
                  <span className="text-slate-200">৳{vat.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Discount:</span>
                    <span className="text-slate-200">
                      -৳{discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-slate-700">
                  <span>Total Paid:</span>
                  <span className="text-sky-400">৳{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={completeTransaction}
                  className="flex-1 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1 shadow-md shadow-sky-600/20"
                >
                  <Printer className="w-3.5 h-3.5" /> Print & Complete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewSalePage;
