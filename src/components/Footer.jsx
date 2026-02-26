import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
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
              הצטרפו לעולם SI MARES
            </h3>
            <p className="font-body text-sm text-white/50 font-light mb-8">
              הירשמו לקבלת גישה בלעדית לקולקציות חדשות, אירועים וסיפורים מהים התיכון.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="כתובת האימייל שלך"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-sand-300 transition-colors"
              />
              <button className="px-6 py-3 bg-sand-300 text-navy-900 text-[10px] font-body font-medium tracking-ultra-wide uppercase hover:bg-sand-200 transition-colors flex items-center gap-2">
                הרשמה
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[9px] font-body text-white/30 mt-3">
              בהרשמה, את/ה מסכימ/ה למדיניות הפרטיות שלנו
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span className="font-brand text-lg tracking-ultra-wide uppercase block mb-4">
              SI MARES
            </span>
            <p className="font-body text-xs text-white/40 font-light leading-relaxed max-w-xs">
              בגדי ים יוקרתיים בהשראת היופי הנצחי של הים התיכון.
              מיוצרים באיטליה מבדים בני קיימא.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-white/60 mb-4">
              חנות
            </h4>
            <nav className="space-y-2.5">
              {["חדשים", "ביקיני", "חלק אחד", "מבצעים"].map((item) => (
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
              אודות
            </h4>
            <nav className="space-y-2.5">
              {["הסיפור שלנו", "קיימות", "אומנות", "עיתונות"].map((item) => (
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
              שירות לקוחות
            </h4>
            <nav className="space-y-2.5">
              {["צרו קשר", "מדריך מידות", "משלוחים והחזרות", "שאלות נפוצות"].map((item) => (
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
            &copy; 2026 SI MARES. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-6">
            {["מדיניות פרטיות", "תנאי שימוש", "עוגיות"].map((item) => (
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
