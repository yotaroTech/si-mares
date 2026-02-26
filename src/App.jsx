import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedCollections } from "./components/FeaturedCollections";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductCard } from "./components/ProductCard";
import { ProductPage } from "./components/ProductPage";
import { ShoppingCart } from "./components/ShoppingCart";
import { InstagramFeed } from "./components/InstagramFeed";
import { Footer } from "./components/Footer";
import { products as allProducts } from "./data/products";
import { motion } from "motion/react";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (view) => {
    setCurrentView(view);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Get new arrivals for homepage
  const newArrivals = allProducts.filter((p) => p.new).slice(0, 4);

  // Get related products (same category, different product)
  const relatedProducts = selectedProduct
    ? allProducts
        .filter((p) => p.id !== selectedProduct.id && p.category === selectedProduct.category)
        .slice(0, 4)
    : [];

  // If not enough related in same category, add from others
  if (relatedProducts.length < 4 && selectedProduct) {
    const others = allProducts
      .filter((p) => p.id !== selectedProduct.id && !relatedProducts.find((r) => r.id === p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setCartOpen(true)}
        onNavigate={navigate}
        currentView={currentView}
      />

      {/* Home View */}
      {currentView === "home" && (
        <>
          <Hero onNavigate={navigate} />

          {/* Featured Collections */}
          <FeaturedCollections onNavigate={navigate} />

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
                    src="https://images.unsplash.com/photo-1727640297123-985cd2f7d9f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwYmVhY2glMjBwYXJhZGlzZXxlbnwxfHx8fDE3NzIxMjU2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
                  הסיפור שלנו
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-navy-900 mb-6">
                  נולד מהים
                </h2>
                <div className="space-y-4">
                  <p className="font-body text-sm text-navy-700 leading-relaxed font-light">
                    SI MARES נולד על חופי הים התיכון שטופי השמש,
                    שם הים התכול פוגש אבן עתיקה ואור זהוב. כל פריט
                    בקולקציה שלנו הוא מחווה ליופי הנצחי הזה.
                  </p>
                  <p className="font-body text-sm text-navy-700 leading-relaxed font-light">
                    מיוצר באיטליה מבדים בני קיימא, בגדי הים שלנו
                    מעוצבים לאישה שמחפשת אלגנטיות בכל רגע — מהשחייה
                    הראשונה בבוקר ועד הקוקטייל האחרון בשקיעה.
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
          <InstagramFeed />

          {/* Footer */}
          <Footer onNavigate={navigate} />
        </>
      )}

      {/* Catalog View */}
      {currentView === "catalog" && (
        <>
          <ProductCatalog
            products={allProducts}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
          <Footer onNavigate={navigate} />
        </>
      )}

      {/* Product View */}
      {currentView === "product" && selectedProduct && (
        <>
          <ProductPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => navigate("catalog")}
            relatedProducts={relatedProducts}
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
