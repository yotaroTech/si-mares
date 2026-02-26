import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Header({ cartItemCount, onCartClick, onNavigate, currentView }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = currentView === "home";
  const headerBg = scrolled || !isHome
    ? "bg-white/95 glass shadow-sm"
    : "bg-transparent";
  const textColor = scrolled || !isHome ? "text-navy-900" : "text-white";
  const logoColor = scrolled || !isHome ? "text-navy-900" : "text-white";

  const navItems = [
    { label: "Shop", view: "catalog" },
    { label: "Collections", view: "catalog" },
    { label: "About", view: "home" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.view)}
                  className={`text-xs font-body font-medium tracking-ultra-wide uppercase transition-colors hover:opacity-70 ${textColor}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden ${textColor}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo (center) */}
            <button
              onClick={() => onNavigate("home")}
              className={`absolute left-1/2 -translate-x-1/2 font-display text-xl lg:text-2xl tracking-mega-wide uppercase ${logoColor} transition-colors`}
            >
              SI MARES
            </button>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button className={`hidden lg:block ${textColor} hover:opacity-70 transition-opacity`}>
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={onCartClick}
                className={`relative ${textColor} hover:opacity-70 transition-opacity`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-sand-300 text-navy-900 text-[10px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-cream-100 z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <span className="font-display text-lg tracking-ultra-wide uppercase text-navy-900">
                    SI MARES
                  </span>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-5 h-5 text-navy-900" />
                  </button>
                </div>
                <nav className="space-y-6">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        onNavigate(item.view);
                        setMobileMenuOpen(false);
                      }}
                      className="block text-sm font-body font-medium tracking-ultra-wide uppercase text-navy-900 hover:text-sand-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-12 pt-8 border-t border-cream-300">
                  <p className="text-xs text-navy-700 font-light leading-relaxed">
                    Mediterranean Luxury Swimwear
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
