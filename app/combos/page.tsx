'use client';

import React from 'react';
import { ComboBuilderCard } from '@/components/ComboBuilderCard';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Gift, Plus, Flame, Star, Percent, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CombosPage() {
  const { addToCart } = useCart();
  const comboProducts = PRODUCTS.filter((p) => p.category === 'combos' || p.tags.some(t => t.includes('Bundle') || t.includes('Value')));

  return (
    <div className="space-y-10 py-4">
      {/* Header Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bento-card bg-[#FF8A50] text-white p-5 sm:p-12 rounded-[28px] sm:rounded-[36px] border border-black/5 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase bg-[#123C2B] text-[#F9D661] px-3 py-1 sm:px-3.5 sm:py-1 rounded-full shadow-md">
            <Gift className="w-3.5 h-3.5 text-[#F9D661]" />
            BUNDLE & SAVE BIG
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl leading-tight mt-2 sm:mt-3 text-white">
            CRAVE COMBOS & BUNDLES
          </h1>
          <p className="text-xs sm:text-base font-semibold text-white/90 mt-2 leading-relaxed">
            Mix and match your favorite Double Smash Burgers, Wood-Fired Pizza, and Rotisserie Shawarma into custom combos with automatic 20% savings!
          </p>
        </div>

        <div className="bg-[#123C2B] text-[#F9D661] p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl border-2 border-[#F9D661]">
          <Percent className="w-8 h-8 sm:w-10 sm:h-10 text-[#F9D661] mb-1" />
          <div className="font-display font-black text-lg sm:text-2xl text-white">SAVE UP TO 20%</div>
          <div className="text-[10px] sm:text-xs text-[#F9D661] font-bold mt-0.5 sm:mt-1">ON EVERY CUSTOM BUNDLE</div>
        </div>
      </motion.div>

      {/* Main Interactive Custom Combo Crave Builder */}
      <section className="w-full">
        <ComboBuilderCard />
      </section>

      {/* Featured Chef Recommended Bundles Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#123C2B]/10 pb-4">
          <div>
            <span className="text-[11px] font-extrabold tracking-widest text-[#123C2B] uppercase bg-white/70 px-3 py-1 rounded-full border border-black/5">
              PRE-CURATED CRAVE SETS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#123C2B] mt-2">
              FEATURED CRAVE BUNDLES
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-500">
            Hand-picked combinations for solo cravers, couples & parties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comboProducts.map((bundle) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              whileHover={{ y: -6 }}
              className="bento-card bg-[#FFFDF9] p-6 rounded-[32px] border border-[#123C2B]/10 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold bg-[#FF6B6B] text-white px-3 py-1 rounded-full uppercase">
                    {bundle.tags[0] || 'BEST VALUE'}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{bundle.rating}</span>
                  </div>
                </div>

                <div className="w-full h-44 rounded-2xl bg-[#F7F4ED] p-2 overflow-hidden flex items-center justify-center my-3 border border-black/5">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="font-display font-bold text-xl text-[#123C2B]">{bundle.name}</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">{bundle.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase block">BUNDLE PRICE</span>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-2xl text-[#123C2B]">
                      ${bundle.price.toFixed(2)}
                    </span>
                    {bundle.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${bundle.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(bundle)}
                  className="tactile-btn bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-5 py-2.5 rounded-full font-display font-extrabold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#F9D661]" />
                  <span>ADD BUNDLE</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
