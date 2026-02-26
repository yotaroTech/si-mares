import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Minus, Plus, ChevronDown, Heart } from "lucide-react";

export function ProductPage({ product, slug, onAddToCart, onBack, onSelectProduct }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [addedToBag, setAddedToBag] = useState(false);
  const [adding, setAdding] = useState(false);

  // Reset selections when product changes
  useEffect(() => {
    setSelectedColor(0);
    setSelectedSize(null);
    setQuantity(1);
    setMainImage(0);
    setAddedToBag(false);
  }, [product?.id]);

  // Find matching variant for current selection
  const getSelectedVariant = () => {
    if (!product?.variants?.length) return null;
    const colorName = product.colors[selectedColor]?.name;
    return product.variants.find(
      (v) => v.color_name === colorName && v.size === selectedSize && v.stock > 0
    );
  };

  // Check stock for a given size + current color
  const getSizeStock = (size) => {
    if (!product?.variants?.length) return 1; // no variant data = assume available
    const colorName = product.colors[selectedColor]?.name;
    const variant = product.variants.find(
      (v) => v.color_name === colorName && v.size === size
    );
    return variant?.stock ?? 0;
  };

  const handleAddToCart = async () => {
    if (!selectedSize || adding) return;
    setAdding(true);
    const variant = getSelectedVariant();
    await onAddToCart({
      ...product,
      selectedColor: product.colors[selectedColor],
      selectedSize,
      selectedVariantId: variant?.id,
    });
    setAdding(false);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Loading state
  if (!product) {
    return (
      <div className="min-h-screen bg-cream-100 pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-sm text-navy-600">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-cream-100 pt-20 lg:pt-24"
    >
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700 hover:text-navy-900 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לחנות
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <motion.div
              key={mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="aspect-[3/4] overflow-hidden bg-cream-200"
            >
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`w-16 h-20 lg:w-20 lg:h-24 overflow-hidden transition-all ${
                    mainImage === index
                      ? "ring-1 ring-navy-900 ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:pt-4">
            <div className="lg:sticky lg:top-28">
              {/* Brand */}
              <span className="text-[10px] font-body font-medium tracking-mega-wide uppercase text-sand-400 block mb-2">
                SI MARES
              </span>

              {/* Name */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-1">
                {product.name}
              </h1>
              <p className="text-xs font-body text-navy-600 tracking-wide uppercase mb-6">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className={`font-body text-xl ${product.sale ? "text-sand-500" : "text-navy-900"}`}>
                  ₪{product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-sm text-navy-600/50 line-through">
                    ₪{product.originalPrice}
                  </span>
                )}
                {product.sale && (
                  <span className="px-2 py-0.5 bg-sand-300 text-navy-900 text-[9px] font-body font-medium tracking-ultra-wide uppercase">
                    מבצע
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="font-body text-sm text-navy-700 leading-relaxed font-light mb-8">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <span className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700 block mb-3">
                  צבע — {product.colors[selectedColor].name}
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        selectedColor === index
                          ? "ring-1 ring-navy-900 ring-offset-2"
                          : "hover:ring-1 hover:ring-navy-600/30 hover:ring-offset-1"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700">
                    מידה {selectedSize && `— ${selectedSize}`}
                  </span>
                  <button className="text-[10px] font-body text-navy-600 underline underline-offset-2">
                    מדריך מידות
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const stock = getSizeStock(size);
                    const outOfStock = stock === 0;
                    return (
                      <button
                        key={size}
                        onClick={() => !outOfStock && setSelectedSize(size)}
                        disabled={outOfStock}
                        className={`min-w-[3rem] h-10 px-4 text-xs font-body font-medium tracking-wide transition-all ${
                          outOfStock
                            ? "bg-cream-200 text-navy-600/30 cursor-not-allowed line-through"
                            : selectedSize === size
                            ? "bg-navy-900 text-white"
                            : "bg-cream-200 text-navy-700 hover:bg-cream-300"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {selectedSize === null && (
                  <p className="text-[10px] font-body text-sand-500 mt-2">
                    נא לבחור מידה
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700">
                  כמות
                </span>
                <div className="flex items-center border border-cream-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-navy-700 hover:bg-cream-200 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-sm font-body text-navy-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-navy-700 hover:bg-cream-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3 mb-8">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 py-4 text-[11px] font-body font-medium tracking-ultra-wide uppercase transition-all ${
                    addedToBag
                      ? "bg-green-800 text-white"
                      : selectedSize
                      ? "bg-navy-900 text-white hover:bg-navy-800"
                      : "bg-cream-300 text-navy-600/50 cursor-not-allowed"
                  }`}
                >
                  {adding ? "מוסיף..." : addedToBag ? "נוסף לסל ✓" : "הוסיפי לסל"}
                </motion.button>
                <button className="w-12 h-12 flex items-center justify-center border border-cream-300 text-navy-700 hover:bg-cream-200 hover:text-red-400 transition-colors">
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Collapsible Sections */}
              <div className="border-t border-cream-300">
                {[
                  { key: "material", title: "חומר וטיפול", content: product.material },
                  { key: "shipping", title: "משלוחים והחזרות", content: product.shipping },
                ].map((section) => (
                  <div key={section.key} className="border-b border-cream-300">
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="w-full flex items-center justify-between py-4"
                    >
                      <span className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-900">
                        {section.title}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-navy-600 transition-transform ${
                          expandedSection === section.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSection === section.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-body text-xs text-navy-700 leading-relaxed font-light pb-4 whitespace-pre-line">
                            {section.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products — shown if API returned them */}
        {product.related && product.related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <h2 className="font-display text-2xl lg:text-3xl text-navy-900 text-center mb-10">
              אולי תאהבי גם
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {product.related.slice(0, 4).map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-pointer group"
                  onClick={() => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-cream-200 mb-3">
                    <img
                      src={p.images?.[0] || p.primary_image || ""}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-sm text-navy-900">{p.name}</h3>
                  <p className="text-[10px] font-body text-navy-600 tracking-wide uppercase">
                    {p.subtitle}
                  </p>
                  <p className="font-body text-sm text-navy-900 mt-1">₪{p.current_price ?? p.base_price ?? p.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
