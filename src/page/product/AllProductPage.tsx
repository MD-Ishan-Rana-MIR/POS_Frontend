import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ArrowUpDown,
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
}

interface AllProductsPageProps {
  /** Custom background color class (Tailwind). Defaults to 'bg-slate-50'. */
  bgColor?: string;
  title?: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    brand: "AudioTech",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewsCount: 124,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    isNew: true,
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Minimalist Leather Watch",
    category: "Accessories",
    brand: "Chronos",
    price: 120.0,
    rating: 4.5,
    reviewsCount: 89,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Ergonomic Mechanical Keyboard",
    category: "Electronics",
    brand: "KeyWorks",
    price: 145.5,
    originalPrice: 169.99,
    rating: 4.9,
    reviewsCount: 210,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Insulated Stainless Steel Water Bottle",
    category: "Lifestyle",
    brand: "HydroLife",
    price: 28.0,
    rating: 4.3,
    reviewsCount: 45,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Urban Canvas Backpack",
    category: "Accessories",
    brand: "TrailHead",
    price: 75.0,
    originalPrice: 95.0,
    rating: 4.6,
    reviewsCount: 78,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    isNew: true,
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Smart Fitness Tracker Watch",
    category: "Electronics",
    brand: "FitPulse",
    price: 89.99,
    rating: 4.2,
    reviewsCount: 162,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    inStock: false,
  },
];

const CATEGORIES = ["All", "Electronics", "Accessories", "Lifestyle"];
const BRANDS = [
  "All",
  "AudioTech",
  "Chronos",
  "KeyWorks",
  "HydroLife",
  "TrailHead",
  "FitPulse",
];

export const AllProductsPage: React.FC<AllProductsPageProps> = ({
  bgColor = "bg-slate-50",
  title = "Explore All Products",
}) => {
  // View & Mobile Filter States
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(300);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-low" | "price-high" | "rating"
  >("featured");

  // Favorites state toggle
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesBrand =
        selectedBrand === "All" || product.brand === selectedBrand;
      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesStock
      );
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // Default featured order
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    maxPrice,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setMaxPrice(300);
    setInStockOnly(false);
    setSortBy("featured");
  };

  return (
    <>
      <Helmet>
        <title>{title} | Shop Central</title>
        <meta
          name="description"
          content="Browse our entire collection of electronics, accessories, and lifestyle essentials."
        />
      </Helmet>

      <div
        className={`min-h-screen ${bgColor} font-sans text-slate-800 transition-colors duration-200 p-4 sm:p-6 lg:p-8`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Bar: Title & Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredProducts.length} of {SAMPLE_PRODUCTS.length}{" "}
                items
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Controls Bar (Mobile Filter Trigger, Sorting, View Toggle) */}
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              <span className="text-xs font-medium text-slate-500 hidden sm:block">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid / List Switcher */}
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 pl-4">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List View"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Layout (Sidebar + Grid/List) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 sticky top-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600" />{" "}
                  Filters
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Reset all
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category
                </label>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === cat
                          ? "bg-indigo-50 font-semibold text-indigo-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Max Price
                  </label>
                  <span className="text-sm font-semibold text-slate-900">
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  {BRANDS.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Toggle */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    In Stock Only
                  </span>
                </label>
              </div>
            </aside>

            {/* Product Display Container */}
            <main className="lg:col-span-3 space-y-6">
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col space-y-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-200 flex ${
                        viewMode === "list"
                          ? "flex-col sm:flex-row items-center p-4 gap-6"
                          : "flex-col"
                      }`}
                    >
                      {/* Image Frame */}
                      <div
                        className={`relative bg-slate-100 overflow-hidden ${viewMode === "list" ? "w-full sm:w-48 h-48 rounded-xl flex-shrink-0" : "w-full h-56"}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            NEW
                          </span>
                        )}
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          aria-label="Add to Wishlist"
                          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-rose-500 hover:bg-white transition-all shadow-sm"
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites[product.id] ? "fill-rose-500 text-rose-500" : ""}`}
                          />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div
                        className={`p-5 flex-1 flex flex-col justify-between ${viewMode === "list" ? "p-0 w-full" : ""}`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                            <span>{product.brand}</span>
                            <span>{product.category}</span>
                          </div>
                          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-1.5 mt-2">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-slate-800">
                              {product.rating}
                            </span>
                            <span className="text-xs text-slate-400">
                              ({product.reviewsCount})
                            </span>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-bold text-slate-900">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-slate-400 line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {!product.inStock && (
                              <span className="text-xs font-semibold text-rose-500">
                                Out of Stock
                              </span>
                            )}
                          </div>

                          <button
                            disabled={!product.inStock}
                            className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-200 text-white p-2.5 sm:px-4 sm:py-2 rounded-xl text-xs font-medium transition-colors shadow-sm disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white p-12 rounded-2xl border border-slate-200/80 text-center space-y-4">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    No products found
                  </h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto">
                    Try adjusting your filters or search terms to find what
                    you're looking for.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination controls */}
              {filteredProducts.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between text-xs text-slate-500">
                  <span>Showing 1 to {filteredProducts.length} entries</span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled
                      className="p-2 border border-slate-200 rounded-lg disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 bg-indigo-50 font-bold text-indigo-600 rounded-lg">
                      1
                    </span>
                    <button
                      disabled
                      className="p-2 border border-slate-200 rounded-lg disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600" />{" "}
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category
                </label>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === cat
                          ? "bg-indigo-50 font-semibold text-indigo-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <Check className="w-4 h-4 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Max Price
                  </label>
                  <span className="text-sm font-semibold text-slate-900">
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Mobile Brand */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5"
                >
                  {BRANDS.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-xl text-sm"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="w-full bg-slate-100 text-slate-600 font-medium py-2.5 rounded-xl text-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProductsPage;
