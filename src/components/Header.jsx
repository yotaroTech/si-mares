import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Header({ cartItemCount, onCartClick, onNavigate, currentView, user, onLogin, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

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
    { label: "חנות", view: "catalog" },
    { label: "קולקציות", view: "catalog" },
    { label: "אודות", view: "home" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      await onLogin(authEmail, authPassword);
      setShowAuth(false);
      setAuthEmail("");
      setAuthPassword("");
    } catch (err) {
      setAuthError(err.message || "שגיאה בהתחברות");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Right nav (desktop) - in RTL this appears on the right */}
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
              className={`absolute left-1/2 -translate-x-1/2 font-brand text-xl lg:text-2xl tracking-mega-wide uppercase ${logoColor} transition-colors`}
            >
              SI MARES
            </button>

            {/* Left actions (in RTL this appears on the left) */}
            <div className="flex items-center gap-4">
              <button className={`hidden lg:block ${textColor} hover:opacity-70 transition-opacity`}>
                <Search className="w-4 h-4" />
              </button>

              {/* User / Auth */}
              {user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <span className={`text-[10px] font-body tracking-wide ${textColor}`}>
                    {user.name?.split(" ")[0]}
                  </span>
                  <button
                    onClick={onLogout}
                    className={`${textColor} hover:opacity-70 transition-opacity`}
                    title="התנתקות"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className={`hidden lg:block ${textColor} hover:opacity-70 transition-opacity`}
                  title="התחברות"
                >
                  <User className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onCartClick}
                className={`relative ${textColor} hover:opacity-70 transition-opacity`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-sand-300 text-navy-900 text-[10px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - slides from right in RTL */}
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-cream-100 z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <span className="font-brand text-lg tracking-ultra-wide uppercase text-navy-900">
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
                  {user ? (
                    <div className="space-y-3">
                      <p className="text-xs font-body text-navy-900 font-medium">{user.name}</p>
                      <button
                        onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                        className="text-xs font-body text-navy-600 hover:text-navy-900 transition-colors"
                      >
                        התנתקות
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setShowAuth(true); setMobileMenuOpen(false); }}
                      className="text-xs font-body text-navy-900 font-medium"
                    >
                      התחברות
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showAuth && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-900/50 glass z-[60]"
              onClick={() => setShowAuth(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-cream-100 p-8 z-[60]"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-xl text-navy-900">התחברות</h2>
                <button onClick={() => setShowAuth(false)}>
                  <X className="w-5 h-5 text-navy-700" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700 block mb-1.5">
                    אימייל
                  </label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-cream-300 text-sm font-body text-navy-900 focus:outline-none focus:border-navy-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700 block mb-1.5">
                    סיסמה
                  </label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-cream-300 text-sm font-body text-navy-900 focus:outline-none focus:border-navy-900 transition-colors"
                  />
                </div>

                {authError && (
                  <p className="text-xs font-body text-red-600">{authError}</p>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-navy-900 text-white text-[11px] font-body font-medium tracking-ultra-wide uppercase hover:bg-navy-800 transition-colors disabled:opacity-50"
                >
                  {authLoading ? "מתחבר..." : "התחברות"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
