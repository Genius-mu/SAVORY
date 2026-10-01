'use client';

import React from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Plus, Flame, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const TopPicksCard: React.FC = () => {
  const { addToCart } = useCart();
  const topPicks = PRODUCTS.filter((p) => p.isTopPick).slice(0, 5);

  return (
    <motion.div
      id="top-picks"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="bento-card bg-[#FFFDF9] p-6 sm:p-8 lg:p-10 flex flex-col justify-between rounded-[36px] border border-[#123C2B]/10 shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-[#123C2B]/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-widest text-[#123C2B] uppercase bg-[#F7F4ED] px-3 py-1 rounded-full border border-black/5">
            <Flame className="w-3.5 h-3.5 text-[#FF6B6B]" />
            MOST CRAVED
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#123C2B] leading-none mt-2">
            TOP <span className="text-[#FF8A50]">5</span> PICKS
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-gray-500">
          What everyone is ordering right now
        </p>
      </div>

      {/* Product List Rows */}
      <div className="flex flex-col gap-3">
        {topPicks.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{ x: 6, backgroundColor: '#F7F4ED' }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="group p-3 sm:p-4 rounded-3xl border border-transparent hover:border-[#123C2B]/10 transition-all flex items-center justify-between gap-4 cursor-pointer"
            onClick={() => addToCart(product)}
          >
            {/* Left: Thumbnail & Info */}
            <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
              <span className="font-display font-black text-lg text-gray-300 group-hover:text-[#123C2B] transition-colors w-5 text-center">
                0{index + 1}
              </span>

              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F7F4ED] p-1 flex-shrink-0 border border-black/5 shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#123C2B] truncate group-hover:text-[#FF8A50] transition-colors">
                    {product.name}
                  </h3>
                  {product.originalPrice && (
                    <span className="text-[10px] font-extrabold bg-[#FF6B6B] text-white px-1.5 py-0.5 rounded uppercase">
                      SALE
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 max-w-md">
                  {product.description}
                </p>
                <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-400 mt-1">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </span>
                  <span>•</span>
                  <span>{product.prepTime}</span>
                  <span>•</span>
                  <span>{product.calories}</span>
                </div>
              </div>
            </div>

            {/* Right: Price & Add Button */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex flex-col items-end">
                <span className="font-display font-extrabold text-base sm:text-lg text-[#123C2B]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-10 h-10 rounded-full bg-[#123C2B] text-[#F9D661] flex items-center justify-center shadow-md group-hover:bg-[#FF8A50] group-hover:text-white transition-colors cursor-pointer"
                title="Add to cart"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
