import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-navy-900 text-white grain">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-lg mx-auto"
          >
            <h3 className="font-display text-2xl sm:text-3xl mb-3">
              Join the SI MARES World
            </h3>
            <p className="font-body text-sm text-white/50 font-light mb-8">
              Subscribe for exclusive access to new collections, events, and stories from the Mediterranean.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-sand-300 transition-colors"
              />
              <button className="px-6 py-3 bg-sand-300 text-navy-900 text-[10px] font-body font-medium tracking-ultra-wide uppercase hover:bg-sand-200 transition-colors flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[9px] font-body text-white/30 mt-3">
              By subscribing, you agree to our Privacy Policy
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span className="font-display text-lg tracking-ultra-wide uppercase block mb-4">
              SI MARES
            </span>
            <p className="font-body text-xs text-white/40 font-light leading-relaxed max-w-xs">
              Luxury swimwear inspired by the timeless beauty of the Mediterranean.
              Crafted with care in Italy from sustainable fabrics.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-white/60 mb-4">
              Shop
            </h4>
            <nav className="space-y-2.5">
              {["New Arrivals", "Bikinis", "One-Pieces", "Sale"].map((item) => (
                <button
                  key={item}
                  onClick={() => onNavigate("catalog")}
                  className="block text-xs font-body text-white/40 hover:text-sand-300 transition-colors font-light"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-white/60 mb-4">
              About
            </h4>
            <nav className="space-y-2.5">
              {["Our Story", "Sustainability", "Craftsmanship", "Press"].map((item) => (
                <button
                  key={item}
                  className="block text-xs font-body text-white/40 hover:text-sand-300 transition-colors font-light"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-white/60 mb-4">
              Customer Care
            </h4>
            <nav className="space-y-2.5">
              {["Contact Us", "Size Guide", "Shipping & Returns", "FAQ"].map((item) => (
                <button
                  key={item}
                  className="block text-xs font-body text-white/40 hover:text-sand-300 transition-colors font-light"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-body text-white/25 font-light">
            &copy; 2026 SI MARES. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
              <button
                key={item}
                className="text-[10px] font-body text-white/25 hover:text-white/50 transition-colors font-light"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
