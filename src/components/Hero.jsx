import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { heroImages } from "../data/products";

export function Hero({ onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden grain">
      {/* Background Images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <img
            src={heroImages[currentIndex]}
            alt=""
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-transparent to-navy-900/70" />
      <div className="absolute inset-0 bg-gradient-to-l from-navy-900/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-4"
        >
          <span className="text-[10px] sm:text-xs font-body font-light tracking-mega-wide uppercase text-sand-200">
            בגדי ים יוקרתיים מהים התיכון
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-brand text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-wide mb-2"
        >
          SI MARES
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-16 h-px bg-sand-300 mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-body text-sm sm:text-base font-light tracking-widest uppercase text-white/80 mb-10 max-w-md"
        >
          קולקציית קיץ 2026
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("catalog")}
          className="group relative px-10 py-3.5 border border-white/40 text-white text-xs font-body font-medium tracking-ultra-wide uppercase overflow-hidden transition-colors hover:border-sand-300"
        >
          <span className="relative z-10 group-hover:text-navy-900 transition-colors duration-300">
            לקולקציה
          </span>
          <div className="absolute inset-0 bg-sand-300 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-body tracking-ultra-wide uppercase text-white/50">
          גלילה
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-8 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-0.5 transition-all duration-500 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-4 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
