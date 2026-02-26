import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Eye } from "lucide-react";

export function ProductCard({ product, onAddToCart, onSelect, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-cream-200 mb-4"
        onClick={() => onSelect(product)}
      >
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isHovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"
          } ${imageLoaded ? "" : "blur-sm"}`}
        />

        {/* Hover Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} lifestyle`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.new && (
            <span className="px-2.5 py-1 bg-navy-900 text-white text-[9px] font-body font-medium tracking-ultra-wide uppercase">
              חדש
            </span>
          )}
          {product.sale && (
            <span className="px-2.5 py-1 bg-sand-300 text-navy-900 text-[9px] font-body font-medium tracking-ultra-wide uppercase">
              מבצע
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent"
        >
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-navy-900 text-[10px] font-body font-medium tracking-ultra-wide uppercase hover:bg-sand-300 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
              הוסיפי לסל
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="flex items-center justify-center w-10 bg-white/90 text-navy-900 hover:bg-white transition-colors"
            >
              <Eye className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div onClick={() => onSelect(product)}>
        <h3 className="font-display text-base lg:text-lg text-navy-900 mb-0.5">
          {product.name}
        </h3>
        <p className="text-[11px] font-body text-navy-600 tracking-wide uppercase mb-2">
          {product.subtitle}
        </p>
        <div className="flex items-center gap-3">
          <span className={`font-body text-sm ${product.sale ? "text-sand-500 font-medium" : "text-navy-900"}`}>
            ₪{product.price}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-navy-600/50 line-through">
              ₪{product.originalPrice}
            </span>
          )}
        </div>

        {/* Color Dots */}
        <div className="flex gap-1.5 mt-2.5">
          {product.colors.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border border-cream-300"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
