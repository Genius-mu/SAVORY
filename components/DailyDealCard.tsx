'use client';

import React from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Plus, Tag, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const DailyDealCard: React.FC = () => {
  const { addToCart } = useCart();
  // Everyday Deal product is Shawarma (p-3)
  const dealProduct = PRODUCTS.find((p) => p.id === 'p-3') || PRODUCTS[2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bento-card bg-[#FFB088] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] sm:min-h-[340px] rounded-[36px] border border-black/5"
    >
      {/* Background Micro Label */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-widest text-[#123C2B] uppercase bg-white/60 px-3 py-1 rounded-full border border-black/5">
            <Tag className="w-3 h-3 text-[#123C2B]" />
            DAILY CRAVE DEAL
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#123C2B] leading-none mt-2">
            EVERYDAY
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#123C2B]/80 mt-1 max-w-[190px]">
            Good food. No special occasion needed.
          </p>
        </div>

        {/* Sticker Price Oval */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="sticker-badge cursor-pointer px-4 py-2 rounded-full font-display font-extrabold text-sm sm:text-base border-2 border-[#F9D661]"
        >
          $10.00
        </motion.div>
      </div>

      {/* Main Cutout Shawarma Visual */}
      <div className="relative z-10 my-2 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative cursor-pointer"
          onClick={() => addToCart(dealProduct)}
        >
          <img
            src="/images/shawarma.jpg"
            alt="Shawarma Daily Deal"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain filter drop-shadow-[0_15px_20px_rgba(18,60,43,0.2)]"
          />
          <div className="absolute bottom-2 right-2 bg-[#123C2B] text-[#F9D661] p-2 rounded-full shadow-lg">
            <Flame className="w-4 h-4" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Copy & Quick Add */}
      <div className="relative z-10 flex items-center justify-between gap-3 pt-2">
        <p className="text-xs font-bold text-[#123C2B]/90 line-clamp-1 max-w-[160px]">
          Perfectly spiced. Wrapped fresh daily.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(dealProduct)}
          className="tactile-btn bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-4 py-2.5 rounded-full font-display font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-[#F9D661]" />
          <span>GRAB DEAL</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
