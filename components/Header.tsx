'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Flame, MapPin, Menu as MenuIcon, X, ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { totalItemsCount, totalPrice, setIsCartOpen, deliveryDetails, setDeliveryDetails } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMethod = () => {
    setDeliveryDetails((prev) => ({
      ...prev,
      method: prev.method === 'delivery' ? 'pickup' : 'delivery',
    }));
  };

  const navLinks = [
    { label: 'Craves', href: '/' },
    { label: 'Full Menu', href: '/menu' },
    { label: 'Combos', href: '/combos' },
    { label: 'Our Craft', href: '/about' },
    { label: 'Locations', href: '/locations' },
  ];

  return (
    <header className="sticky top-3 sm:top-4 z-40 px-3 sm:px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#123C2B]/10 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg shadow-[#123C2B]/5 flex items-center justify-between transition-all">
        
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#123C2B] text-[#F9D661] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F9D661] text-[#123C2B] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-2xl tracking-tight text-[#123C2B] leading-none">
              SAVORY<span className="text-[#FF8A50]">.</span>
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-[#123C2B]/60 uppercase">
              CRAFT FOOD CLUB
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F7F4ED] p-1.5 rounded-full border border-[#123C2B]/5 text-sm font-bold text-[#123C2B]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#123C2B] text-[#F7F4ED] shadow-sm'
                    : 'hover:bg-white text-[#123C2B]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Order Method Selector Toggle (Desktop) */}
          <button
            onClick={toggleMethod}
            className="hidden lg:flex items-center gap-1.5 bg-[#F7F4ED] hover:bg-[#EAE4D7] text-[#123C2B] px-3.5 py-2 rounded-full text-xs font-bold transition-all border border-[#123C2B]/10 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF8A50]" />
            <span className="capitalize">{deliveryDetails.method}</span>
            <span className="bg-[#123C2B]/10 text-[10px] px-1.5 py-0.5 rounded font-extrabold">
              {deliveryDetails.method === 'delivery' ? '25 min' : '10 min'}
            </span>
          </button>

          {/* Desktop Cart Pill Button (shown on lg: and up) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="hidden lg:flex bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-4 py-2.5 rounded-full items-center gap-2.5 shadow-md shadow-[#123C2B]/20 cursor-pointer transition-colors relative"
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

          {/* Mobile & Tablet Quick Cart Badge Icon (icon + count badge only) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="lg:hidden relative bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] p-2.5 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5 text-[#F9D661]" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#FFFDF9]">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile & Tablet Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#123C2B] hover:bg-[#F7F4ED] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mt-2 bg-[#FFFDF9] border border-[#123C2B]/10 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4 font-display text-[#123C2B]"
          >
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-3 rounded-2xl flex items-center justify-between transition-colors font-bold text-base ${
                      isActive
                        ? 'bg-[#123C2B] text-[#F7F4ED]'
                        : 'hover:bg-[#F7F4ED] text-[#123C2B]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="text-xs bg-[#F9D661] text-[#123C2B] font-extrabold px-2.5 py-0.5 rounded-full">
                        Active
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Prominent Mobile Cart Card Under Hamburger Dropdown */}
            <div className="bg-[#123C2B] text-[#F7F4ED] p-4 rounded-2xl shadow-lg border border-[#F9D661]/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#F9D661] text-[#123C2B] flex items-center justify-center font-black">
                  <ShoppingBag className="w-5 h-5 fill-[#123C2B]" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#123C2B]">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <span>YOUR CRAVE BAG</span>
                    <span className="text-[10px] bg-white/20 text-[#F9D661] px-1.5 py-0.5 rounded font-extrabold">
                      {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <div className="text-xs text-[#F9D661] font-extrabold">
                    {totalPrice > 0 ? `Subtotal: $${totalPrice.toFixed(2)}` : 'Cart is empty'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="bg-[#F9D661] hover:bg-[#eab308] text-[#123C2B] px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1 shadow-md transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>VIEW BAG</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* Mobile Delivery / Pickup Switch */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-600 font-bold">
                <MapPin className="w-4 h-4 text-[#FF8A50]" />
                <span>Order Type:</span>
                <span className="capitalize text-[#123C2B] font-extrabold">{deliveryDetails.method}</span>
              </div>
              <button
                onClick={toggleMethod}
                className="bg-[#F7F4ED] hover:bg-[#EAE4D7] text-[#123C2B] px-3 py-1.5 rounded-full text-xs font-extrabold border border-[#123C2B]/10 cursor-pointer"
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

