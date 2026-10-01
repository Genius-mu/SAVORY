'use client';

import React, { useState } from 'react';
import { HERO_FOOD_ITEMS, PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, Plus, Flame, Clock, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroFoodCard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();
  const currentHero = HERO_FOOD_ITEMS[activeIndex];

  const handleOrderHeroProduct = () => {
    // Find matching product in catalog or construct from hero item
    const matchedProduct = PRODUCTS.find((p) => p.category === currentHero.category) || PRODUCTS[0];
    addToCart(matchedProduct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{ backgroundColor: currentHero.bgColor }}
      className="bento-card relative overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[480px] lg:min-h-[540px] transition-colors duration-500 rounded-[36px] shadow-xl border border-black/5"
    >
      {/* Enormous Background Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentHero.accentText}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.18, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="font-display font-black text-[120px] sm:text-[180px] lg:text-[230px] leading-none text-[#123C2B] tracking-tighter whitespace-nowrap"
          >
            {currentHero.accentText}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Top Header info & Badges */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        {/* Brand Tag & Micro Label */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 bg-[#123C2B] text-[#F7F4ED] px-3.5 py-1 rounded-full text-xs font-bold shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#F9D661]" />
            <span>ART-DIRECTED CRAVES</span>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#123C2B]/70">
            {currentHero.category.toUpperCase()} EDITION
          </p>
        </div>

        {/* Floating Sticker Price Badge */}
        <motion.div
          whileHover={{ rotate: 2, scale: 1.05 }}
          className="sticker-badge cursor-pointer px-4 py-2 rounded-full font-display font-extrabold text-sm sm:text-base tracking-wider flex items-center gap-1 border-2 border-[#F9D661]"
        >
          <span>{currentHero.badgeText}</span>
        </motion.div>
      </div>

      {/* Centerpiece Floating Food Image */}
      <div className="relative z-10 my-4 flex items-center justify-center min-h-[260px] sm:min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero.id}
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 6 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative group cursor-pointer"
            onClick={handleOrderHeroProduct}
          >
            <motion.img
              src={currentHero.image}
              alt={currentHero.name}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain filter drop-shadow-[0_20px_25px_rgba(18,60,43,0.25)] transition-transform duration-300 group-hover:scale-105"
            />
            {/* Pulsing Quick Add Hotspot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#123C2B]/90 text-[#F9D661] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl flex items-center gap-2 font-display font-bold text-xs">
              <Plus className="w-5 h-5" />
              <span>CLICK TO CRAVE</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Content Row */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-2">
        {/* Title, Tagline & CTA */}
        <div className="max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHero.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#123C2B] leading-tight tracking-tight">
                {currentHero.name}
              </h1>
              <p className="text-sm font-semibold text-[#123C2B]/80 mt-1">
                {currentHero.tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Ratings & Order Button */}
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOrderHeroProduct}
              className="tactile-btn bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-6 py-3 rounded-full font-display font-extrabold text-sm flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#F9D661]" />
              <span>ADD TO CART — ${currentHero.price.toFixed(2)}</span>
            </motion.button>

            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-extrabold text-[#123C2B]">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>{currentHero.rating}</span>
              <span className="text-gray-400">({currentHero.reviews})</span>
            </div>
          </div>
        </div>

        {/* Interactive Food Thumbnails Selector */}
        <div className="bg-white/70 backdrop-blur-md p-2 rounded-full border border-black/5 flex items-center gap-2 self-end shadow-md">
          {HERO_FOOD_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'border-[#123C2B] scale-110 shadow-md ring-2 ring-[#123C2B]/20'
                    : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                title={item.name}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <motion.div
                    layoutId="hero-selector-indicator"
                    className="absolute inset-0 bg-[#123C2B]/10 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
