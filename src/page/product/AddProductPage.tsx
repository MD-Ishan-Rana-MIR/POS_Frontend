import React, { useState, type ChangeEvent, type FormEvent } from "react";
import {
  PackagePlus,
  Upload,
  Barcode,
  Tag,
  DollarSign,
  Boxes,
  X,
  Check,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

// ================= TYPES & INTERFACES =================
export interface ProductFormData {
  name: string;
  code: string;
  category: string;
  unit: string;
  costPrice: number | "";
  sellingPrice: number | "";
  stock: number | "";
  minStockAlert: number | "";
  description: string;
  image: string | null;
}

const categories = [
  "Grocery",
  "Pharmacy",
  "Food & Beverage",
  "Electronics",
  "Clothing",
  "Stationery",
];
const units = ["Pcs", "Kg", "Liter", "Box", "Packet"];

// ================= MAIN COMPONENT =================
const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    code: "",
    category: "Grocery",
    unit: "Pcs",
    costPrice: "",
    sellingPrice: "",
    stock: "",
    minStockAlert: 5,
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Handle Text/Number Input
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        value === "" ? "" : e.target.type === "number" ? Number(value) : value,
    }));
  };

  // Handle Image Upload & Preview
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto Generate Barcode
  const generateBarcode = () => {
    const randomCode = "PRD-" + Math.floor(100000 + Math.random() * 900000);
    setFormData((prev) => ({ ...prev, code: randomCode }));
  };

  // Profit Calculation
  const profitMargin =
    typeof formData.costPrice === "number" &&
    typeof formData.sellingPrice === "number" &&
    formData.sellingPrice > 0
      ? (
          ((formData.sellingPrice - formData.costPrice) /
            formData.sellingPrice) *
          100
        ).toFixed(1)
      : "0";

  // Form Submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 p-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <PackagePlus className="w-7 h-7 text-sky-400" /> Add New Product
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in the details below to add a new item to inventory
          </p>
        </div>

        {isSuccess && (
          <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-400 px-4 py-2 rounded-xl text-xs font-semibold border border-emerald-800/50 animate-in fade-in">
            <Check className="w-4 h-4" /> Product added successfully!
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* ================= LEFT SECTION: BASIC & PRICING (2 COLS) ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-200 border-b border-slate-700/60 pb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-sky-400" /> Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Miniket Rice 5kg"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-800 text-slate-100">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Unit */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                >
                  {units.map((u) => (
                    <option key={u} value={u} className="bg-slate-800 text-slate-100">
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              {/* Barcode / SKU */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Code / Barcode
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Barcode className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      name="code"
                      placeholder="Scan or enter code..."
                      value={formData.code}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={generateBarcode}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors border border-slate-600/50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Auto Generate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Profit Card */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-200 border-b border-slate-700/60 pb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Pricing & Profit
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cost Price */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cost Price (৳) *
                </label>
                <input
                  type="number"
                  name="costPrice"
                  required
                  placeholder="0.00"
                  value={formData.costPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                />
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Selling Price (৳) *
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  required
                  placeholder="0.00"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                />
              </div>

              {/* Estimated Margin Indicator */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Estimated Profit Margin
                </label>
                <div className="px-3 py-2 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-xs font-bold text-emerald-400 flex items-center justify-between">
                  <span>{profitMargin}%</span>
                  <span className="text-[10px] font-normal text-emerald-500">
                    Calculated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stock & Inventory Card */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-200 border-b border-slate-700/60 pb-3 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-amber-400" /> Stock & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Initial Stock */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Opening Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                />
              </div>

              {/* Low Stock Alert Quantity */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Low Stock Alert Limit
                </label>
                <input
                  type="number"
                  name="minStockAlert"
                  placeholder="5"
                  value={formData.minStockAlert}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION: MEDIA & ACTIONS (1 COL) ================= */}
        <div className="space-y-6">
          {/* Image Upload Card */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-200 border-b border-slate-700/60 pb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-400" /> Product Image
            </h2>

            {/* Drag & Drop Upload Zone */}
            <div className="relative border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors bg-slate-900/60 min-h-50">
              {imagePreview ? (
                <div className="relative w-full h-44 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-full max-w-full rounded-xl object-contain shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-500 shadow-md transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <div className="p-3 bg-slate-800 rounded-full shadow-inner text-sky-400 mb-2 border border-slate-700">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    Click to upload image
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    PNG, JPG or WEBP (Max 2MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Additional Description */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Product Description (Optional)
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Add product specifications or notes..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all text-xs"
            >
              <Check className="w-4 h-4" /> Save Product
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  code: "",
                  category: "Grocery",
                  unit: "Pcs",
                  costPrice: "",
                  sellingPrice: "",
                  stock: "",
                  minStockAlert: 5,
                  description: "",
                  image: null,
                });
                setImagePreview(null);
              }}
              className="w-full py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors"
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;