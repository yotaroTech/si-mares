import { useState } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "./ProductCard";

const CATEGORIES = ["All", "Bikini", "One-Piece"];
const SIZES = ["All", "XS", "S", "M", "L", "XL"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export function ProductCatalog({ products, onAddToCart, onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter((p) => {
      const categoryMatch = selectedCategory === "All" || p.category === selectedCategory.toLowerCase();
      const sizeMatch = selectedSize === "All" || p.sizes.includes(selectedSize);
      return categoryMatch && sizeMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "newest": return b.new ? 1 : -1;
        default: return 0;
      }
    });

  const activeFilters = [
    selectedCategory !== "All" && selectedCategory,
    selectedSize !== "All" && `Size ${selectedSize}`,
  ].filter(Boolean);

  return (
    <section className="min-h-screen bg-cream-100 pt-24 lg:pt-28">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-[10px] font-body font-medium tracking-mega-wide uppercase text-sand-400 block mb-3">
            SI MARES
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-3">
            Swimwear
          </h1>
          <p className="font-body text-sm text-navy-600 font-light">
            {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-cream-300">
          <div className="flex items-center gap-6">
            {/* Desktop Category Pills */}
            <div className="hidden sm:flex items-center gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-[10px] font-body font-medium tracking-ultra-wide uppercase transition-all ${
                    selectedCategory === cat
                      ? "bg-navy-900 text-white"
                      : "bg-transparent text-navy-700 hover:bg-cream-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-900"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700 bg-transparent border-0 focus:ring-0 cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Filters Dropdown */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden mb-8 space-y-6 overflow-hidden"
          >
            <div>
              <h4 className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-600 mb-3">
                Category
              </h4>
              <div className="flex flex-wrap gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-[10px] font-body tracking-wide transition-all ${
                      selectedCategory === cat
                        ? "bg-navy-900 text-white"
                        : "bg-cream-200 text-navy-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-600 mb-3">
                Size
              </h4>
              <div className="flex flex-wrap gap-1">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-[10px] font-body tracking-wide transition-all ${
                      selectedSize === size
                        ? "bg-navy-900 text-white"
                        : "bg-cream-200 text-navy-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream-200 text-navy-700 text-[10px] font-body tracking-wide"
              >
                {filter}
                <button
                  onClick={() => {
                    if (CATEGORIES.includes(filter)) setSelectedCategory("All");
                    else setSelectedSize("All");
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={() => { setSelectedCategory("All"); setSelectedSize("All"); }}
              className="text-[10px] font-body text-navy-600 underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Desktop: Sidebar Sizes + Grid */}
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <h4 className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-600 mb-4">
                  Size
                </h4>
                <div className="space-y-1">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`block w-full text-left px-3 py-2 text-xs font-body transition-colors ${
                        selectedSize === size
                          ? "bg-navy-900 text-white"
                          : "text-navy-700 hover:bg-cream-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-12">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onSelect={onSelectProduct}
                  index={index}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-navy-900 mb-2">
                  No pieces found
                </p>
                <p className="font-body text-sm text-navy-600 font-light">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
