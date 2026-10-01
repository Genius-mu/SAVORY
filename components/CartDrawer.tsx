'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, X, Trash2, Plus, Minus, Tag, ArrowRight, MapPin, Check, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    deliveryFee,
    tipAmount,
    discountAmount,
    totalPrice,
    couponCode,
    applyCoupon,
    tipPercentage,
    setTipPercentage,
    deliveryDetails,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(inputCoupon);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2500);
    } else {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#123C2B]/40 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FFFDF9] z-50 shadow-2xl flex flex-col justify-between border-l border-[#123C2B]/10 overflow-hidden"
          >
            {/* Top Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F7F4ED]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#123C2B] text-[#F9D661] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-[#123C2B]">
                    YOUR CRAVE BAG
                  </h2>
                  <p className="text-xs text-gray-500 font-semibold">
                    {cart.reduce((a, b) => a + b.quantity, 0)} Items Selected
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 text-[#123C2B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items Scrollable List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-[#F7F4ED] text-gray-400 flex items-center justify-center text-3xl mb-4">
                    🍔
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#123C2B]">
                    Your Crave Bag is Empty!
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">
                    You haven&apos;t added any delicious burgers, pizzas, or shawarma yet.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 bg-[#123C2B] text-[#F7F4ED] px-6 py-2.5 rounded-full font-display font-bold text-xs"
                  >
                    START ORDERING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.cartId}
                    className="bg-[#F7F4ED] p-4 rounded-3xl border border-[#123C2B]/5 flex items-start gap-3 relative group"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-2xl bg-white p-1 flex-shrink-0 border border-black/5 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-bold text-sm text-[#123C2B] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-400 hover:text-[#FF6B6B] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Selected Options summary */}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="text-[10px] text-gray-500 font-medium mt-0.5 space-y-0.5">
                          {item.selectedOptions.map((opt, i) => (
                            <div key={i}>
                              • {opt.optionName} {opt.price > 0 && `(+$${opt.price})`}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5">
                        <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-black/5">
                          <button
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#123C2B]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-display font-extrabold text-xs text-[#123C2B] min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#123C2B]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-display font-extrabold text-sm text-[#123C2B]">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Bottom Order Summary & Checkout CTA */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-[#FFFDF9] space-y-4">
                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (e.g. SAVORY20)"
                      className="w-full bg-[#F7F4ED] border border-[#123C2B]/10 rounded-full pl-9 pr-3 py-2 text-xs font-bold text-[#123C2B] uppercase placeholder:normal-case placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#123C2B] text-[#F9D661] px-4 py-2 rounded-full font-display font-bold text-xs hover:bg-[#0B291D] cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>
                {couponError && (
                  <p className="text-[10px] text-red-500 font-bold px-2">
                    Invalid coupon code. Try SAVORY20 for 20% off!
                  </p>
                )}
                {couponCode && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-2xl border border-emerald-200">
                    <span className="font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Coupon {couponCode} Applied
                    </span>
                    <span className="font-black">-{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Delivery Tip selector */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-600">
                    <span>Driver Tip:</span>
                    <span>${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[10, 15, 20, 0].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setTipPercentage(tip)}
                        className={`py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          tipPercentage === tip
                            ? 'bg-[#123C2B] text-[#F9D661]'
                            : 'bg-[#F7F4ED] text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tip === 0 ? 'No Tip' : `${tip}%`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100 font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#123C2B]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee {subtotal > 30 && '(Free over $30)'}</span>
                    <span className="font-bold">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[#123C2B] pt-2 border-t border-black/10">
                    <span>TOTAL</span>
                    <span className="text-[#FF8A50] font-display text-xl">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="tactile-btn w-full bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] py-3.5 rounded-full font-display font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 text-[#F9D661]" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
