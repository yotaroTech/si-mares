import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedCollections } from "./components/FeaturedCollections";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductCard } from "./components/ProductCard";
import { ProductPage } from "./components/ProductPage";
import { ShoppingCart } from "./components/ShoppingCart";
import { InstagramFeed } from "./components/InstagramFeed";
import { Footer } from "./components/Footer";
import { api } from "./lib/api";
import { motion } from "motion/react";

// Map API product to component format
function mapProduct(p) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    subtitle: p.subtitle,
    category: p.category_name || p.category?.slug || "",
    price: p.current_price ?? p.base_price,
    originalPrice: p.is_on_sale ? p.base_price : null,
    new: p.is_new,
    sale: p.is_on_sale,
    images: p.images || (p.primary_image ? [p.primary_image] : []),
    colors: (p.colors || []).map((c) => (typeof c === "string" ? { name: c, hex: c } : c)),
    sizes: p.sizes || [],
    description: p.description || "",
    material: p.material || "",
    shipping: p.shipping_info || "",
    variants: p.variants || [],
    related: p.related || [],
  };
}

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load homepage data
  useEffect(() => {
    api.getHome().then((data) => {
      setHomeData(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Load cart
  const refreshCart = useCallback(() => {
    api.getCart().then((data) => {
      setCartItems(data.items || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("si_token");
    if (token) {
      api.getUser().then(setUser).catch(() => {
        localStorage.removeItem("si_token");
      });
    }
  }, []);

  const navigate = (view) => {
    setCurrentView(view);
    setSelectedProduct(null);
    setSelectedSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProduct = (product) => {
    const slug = product.slug || product.id;
    setSelectedSlug(slug);
    setSelectedProduct(null);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fetch full product details
    api.getProduct(slug).then((data) => {
      const p = data.product || data.data || data;
      setSelectedProduct(mapProduct(p));
    }).catch(() => {});
  };

  const handleAddToCart = async (product) => {
    // Find variant ID - prefer selected variant, else first available
    let variantId = product.selectedVariantId;
    if (!variantId && product.variants?.length) {
      const match = product.variants.find(
        (v) =>
          (!product.selectedColor || v.color_name === product.selectedColor?.name) &&
          (!product.selectedSize || v.size === product.selectedSize) &&
          v.stock > 0
      );
      variantId = match?.id || product.variants.find((v) => v.stock > 0)?.id;
    }

    if (!variantId) {
      // Fallback: fetch product and get first variant
      try {
        const data = await api.getProduct(product.slug || product.id);
        const p = data.product || data.data || data;
        const firstVariant = (p.variants || []).find((v) => v.stock > 0);
        if (firstVariant) variantId = firstVariant.id;
      } catch {}
    }

    if (!variantId) return;

    try {
      const data = await api.addToCart(variantId, 1);
      setCartItems(data.items || []);
      setCartOpen(true);
    } catch {}
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      const data = await api.updateCartItem(id, quantity);
      setCartItems(data.items || []);
    } catch {}
  };

  const handleRemoveItem = async (id) => {
    try {
      const data = await api.removeCartItem(id);
      setCartItems(data.items || []);
    } catch {}
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Map homepage data
  const newArrivals = (homeData?.new_arrivals || []).map(mapProduct);
  const heroSlides = homeData?.hero_slides || [];
  const collections = homeData?.collections || [];
  const brandStory = homeData?.brand_story || {};
  const instagramImages = homeData?.instagram_images || [];

  if (loading && currentView === "home") {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-sm text-navy-600">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setCartOpen(true)}
        onNavigate={navigate}
        currentView={currentView}
        user={user}
        onLogin={async (email, password) => {
          const data = await api.login(email, password);
          localStorage.setItem("si_token", data.token);
          setUser(data.user);
          await api.mergeCart();
          refreshCart();
        }}
        onLogout={async () => {
          await api.logout().catch(() => {});
          localStorage.removeItem("si_token");
          setUser(null);
        }}
      />

      {/* Home View */}
      {currentView === "home" && (
        <>
          <Hero onNavigate={navigate} slides={heroSlides} />

          {/* Featured Collections */}
          <FeaturedCollections onNavigate={navigate} collections={collections} />

          {/* New Arrivals Section */}
          <section className="py-20 lg:py-28 bg-white grain">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-end justify-between mb-12"
              >
                <div>
                  <span className="text-[10px] font-body font-medium tracking-mega-wide uppercase text-sand-400 block mb-3">
                    הגיעו זה עתה
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900">
                    חדשים בחנות
                  </h2>
                </div>
                <button
                  onClick={() => navigate("catalog")}
                  className="hidden sm:block text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700 underline underline-offset-4 hover:text-navy-900 transition-colors"
                >
                  צפו בהכל
                </button>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {newArrivals.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onSelect={handleSelectProduct}
                    index={index}
                  />
                ))}
              </div>

              <div className="text-center mt-10 sm:hidden">
                <button
                  onClick={() => navigate("catalog")}
                  className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700 underline underline-offset-4"
                >
                  צפו בהכל
                </button>
              </div>
            </div>
          </section>

          {/* Brand Story Section */}
          <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={brandStory.image || "https://images.unsplash.com/photo-1727640297123-985cd2f7d9f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                    alt="חוף הים התיכון"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-[10px] font-body font-medium tracking-mega-wide uppercase text-sand-400 block mb-3">
                  {brandStory.subtitle || "הסיפור שלנו"}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-navy-900 mb-6">
                  {brandStory.title || "נולד מהים"}
                </h2>
                <div className="space-y-4">
                  <p className="font-body text-sm text-navy-700 leading-relaxed font-light">
                    {brandStory.text_1 || "SI MARES נולד על חופי הים התיכון שטופי השמש, שם הים התכול פוגש אבן עתיקה ואור זהוב. כל פריט בקולקציה שלנו הוא מחווה ליופי הנצחי הזה."}
                  </p>
                  <p className="font-body text-sm text-navy-700 leading-relaxed font-light">
                    {brandStory.text_2 || "מיוצר באיטליה מבדים בני קיימא, בגדי הים שלנו מעוצבים לאישה שמחפשת אלגנטיות בכל רגע — מהשחייה הראשונה בבוקר ועד הקוקטייל האחרון בשקיעה."}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-12">
                  <div>
                    <span className="font-display text-3xl text-navy-900">100%</span>
                    <p className="text-[10px] font-body text-navy-600 tracking-wide uppercase mt-1">
                      אומנות איטלקית
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-3xl text-navy-900">80%</span>
                    <p className="text-[10px] font-body text-navy-600 tracking-wide uppercase mt-1">
                      בדים ממוחזרים
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-3xl text-navy-900">UPF 50+</span>
                    <p className="text-[10px] font-body text-navy-600 tracking-wide uppercase mt-1">
                      הגנה מהשמש
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Instagram Feed */}
          <InstagramFeed images={instagramImages} />

          {/* Footer */}
          <Footer onNavigate={navigate} />
        </>
      )}

      {/* Catalog View */}
      {currentView === "catalog" && (
        <>
          <ProductCatalog
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
          <Footer onNavigate={navigate} />
        </>
      )}

      {/* Product View */}
      {currentView === "product" && (selectedProduct || selectedSlug) && (
        <>
          <ProductPage
            product={selectedProduct}
            slug={selectedSlug}
            onAddToCart={handleAddToCart}
            onBack={() => navigate("catalog")}
            onSelectProduct={handleSelectProduct}
          />
          <Footer onNavigate={navigate} />
        </>
      )}

      {/* Shopping Cart Drawer */}
      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
