'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Flame, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { totalItemsCount, totalPrice, setIsCartOpen, deliveryDetails, setDeliveryDetails } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMethod = () => {
    setDeliveryDetails((prev) => ({
      ...prev,
      method: prev.method === 'delivery' ? 'pickup' : 'delivery',
    }));
  };

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-[#FFFDF9]/90 backdrop-blur-md border border-[#123C2B]/10 rounded-full px-5 py-3 shadow-lg shadow-[#123C2B]/5 flex items-center justify-between transition-all">
        
        {/* Left: Brand Identity */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-[#123C2B] text-[#F9D661] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Flame className="w-5 h-5 fill-[#F9D661] text-[#123C2B] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-2xl tracking-tight text-[#123C2B] leading-none">
              SAVORY<span className="text-[#FF8A50]">.</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#123C2B]/60 uppercase">
              CRAFT FOOD CLUB
            </span>
          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F7F4ED] p-1.5 rounded-full border border-[#123C2B]/5 text-sm font-bold text-[#123C2B]">
          <a
            href="#hero"
            className="px-4 py-1.5 rounded-full hover:bg-white transition-colors"
          >
            Craves
          </a>
          <a
            href="#top-picks"
            className="px-4 py-1.5 rounded-full hover:bg-white transition-colors"
          >
            Top Picks
          </a>
          <a
            href="#menu"
            className="px-4 py-1.5 rounded-full hover:bg-white transition-colors"
          >
            Full Menu
          </a>
          <a
            href="#combo-builder"
            className="px-4 py-1.5 rounded-full hover:bg-white text-[#FF6B6B] flex items-center gap-1 transition-colors"
          >
            Combos
          </a>
        </nav>

        {/* Right Actions: Pickup/Delivery switch & Cart Button */}
        <div className="flex items-center gap-2.5">
          {/* Order Method Selector Toggle */}
          <button
            onClick={toggleMethod}
            className="hidden sm:flex items-center gap-1.5 bg-[#F7F4ED] hover:bg-[#EAE4D7] text-[#123C2B] px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-[#123C2B]/10 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF8A50]" />
            <span className="capitalize">{deliveryDetails.method}</span>
            <span className="bg-[#123C2B]/10 text-[10px] px-1.5 py-0.5 rounded font-extrabold">
              {deliveryDetails.method === 'delivery' ? '25 min' : '10 min'}
            </span>
          </button>

          {/* Cart Pill Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-md shadow-[#123C2B]/20 cursor-pointer transition-colors relative"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#F9D661]" />
              {totalItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItemsCount}
                  className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </div>
            <span className="font-display font-bold text-xs tracking-wider uppercase">
              CART
            </span>
            {totalPrice > 0 && (
              <span className="bg-[#F9D661] text-[#123C2B] text-xs font-extrabold px-2 py-0.5 rounded-full">
                ${totalPrice.toFixed(2)}
              </span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#123C2B] hover:bg-[#F7F4ED]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 bg-[#FFFDF9] border border-[#123C2B]/10 rounded-3xl p-5 shadow-xl flex flex-col gap-3 font-display font-bold text-lg text-[#123C2B]"
          >
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              Craves
            </a>
            <a
              href="#top-picks"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              Top Picks
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              Full Menu
            </a>
            <a
              href="#combo-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#FF6B6B] flex items-center gap-2"
            >
              Combo Crave Builder
            </a>
            <div className="pt-2 flex items-center justify-between text-sm">
              <span className="font-sans font-semibold text-gray-500">Order Type:</span>
              <button
                onClick={toggleMethod}
                className="bg-[#123C2B] text-[#F7F4ED] px-4 py-1.5 rounded-full text-xs font-bold"
              >
                Switch to {deliveryDetails.method === 'delivery' ? 'Pickup' : 'Delivery'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
