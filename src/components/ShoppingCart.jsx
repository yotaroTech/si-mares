import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

export function ShoppingCart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-900/50 glass z-50"
            onClick={onClose}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream-100 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cream-300">
              <div>
                <h2 className="font-display text-xl text-navy-900">Your Bag</h2>
                <p className="text-[10px] font-body text-navy-600 tracking-wide mt-0.5">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-navy-700 hover:text-navy-900 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <ShoppingBag className="w-12 h-12 text-cream-300 mb-4" strokeWidth={1} />
                  <p className="font-display text-lg text-navy-900 mb-1">
                    Your bag is empty
                  </p>
                  <p className="text-xs font-body text-navy-600 font-light mb-6">
                    Discover our Mediterranean collection
                  </p>
                  <button
                    onClick={onClose}
                    className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-900 underline underline-offset-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-cream-200">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-sm text-navy-900">
                              {item.name}
                            </h3>
                            <p className="text-[10px] font-body text-navy-600 tracking-wide uppercase">
                              {item.subtitle}
                            </p>
                            {item.selectedColor && (
                              <p className="text-[10px] font-body text-navy-500 mt-0.5">
                                {item.selectedColor.name}
                                {item.selectedSize && ` / ${item.selectedSize}`}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-navy-500 hover:text-navy-900 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center border border-cream-300">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="w-7 h-7 flex items-center justify-center text-navy-700 hover:bg-cream-200 transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-[11px] font-body text-navy-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-navy-700 hover:bg-cream-200 transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-body text-sm text-navy-900">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-cream-300 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-body font-medium tracking-ultra-wide uppercase text-navy-700">
                    Subtotal
                  </span>
                  <span className="font-display text-lg text-navy-900">
                    ${subtotal}
                  </span>
                </div>
                <p className="text-[10px] font-body text-navy-500 font-light">
                  Shipping calculated at checkout
                </p>
                <button className="w-full py-4 bg-navy-900 text-white text-[11px] font-body font-medium tracking-ultra-wide uppercase hover:bg-navy-800 transition-colors flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-center text-[10px] font-body text-navy-600 underline underline-offset-4 hover:text-navy-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
