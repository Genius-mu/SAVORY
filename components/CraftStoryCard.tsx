'use client';

import React from 'react';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const CraftStoryCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="bento-card bg-[#123C2B] text-[#F7F4ED] p-4 sm:p-8 lg:p-10 flex flex-col justify-between rounded-[28px] sm:rounded-[36px] shadow-xl relative overflow-hidden"
    >
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F9D661]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-widest text-[#F9D661] uppercase bg-white/10 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full border border-white/10">
            <Flame className="w-3.5 h-3.5" />
            EDITORIAL FOOD MANIFESTO
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight mt-2 sm:mt-3 max-w-lg">
            NO BORING FOOD. <br className="hidden sm:inline" />
            ZERO FILLERS. <span className="text-[#F9D661]">100% CRAVE.</span>
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/10 flex items-center gap-3 w-fit">
          <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#F9D661]" />
          <div>
            <div className="font-display font-extrabold text-lg sm:text-xl text-white">4.9 ★★★★★</div>
            <div className="text-[11px] sm:text-xs text-gray-300">Over 15,000+ Verified Cravers</div>
          </div>
        </div>
      </div>

      {/* 3 Craft Pillars Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-3xl hover:bg-white/10 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-[#F9D661] text-[#123C2B] flex items-center justify-center font-bold text-xl mb-3">
            🍔
          </div>
          <h3 className="font-display font-bold text-lg text-white">100% Angus Beef</h3>
          <p className="text-xs text-gray-300 mt-1">
            Always fresh, never frozen. Smashed hot on cast iron for lacy, caramelized crispy edges.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-3xl hover:bg-white/10 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-[#FF8A50] text-[#123C2B] flex items-center justify-center font-bold text-xl mb-3">
            🍕
          </div>
          <h3 className="font-display font-bold text-lg text-white">72h Fermented Crust</h3>
          <p className="text-xs text-gray-300 mt-1">
            Wild sourdough starter aged for 3 full days. Baked at 900°F for leopard-spotted char.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-3xl hover:bg-white/10 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-[#FFB088] text-[#123C2B] flex items-center justify-center font-bold text-xl mb-3">
            🌯
          </div>
          <h3 className="font-display font-bold text-lg text-white">Secret 12-Spice Rub</h3>
          <p className="text-xs text-gray-300 mt-1">
            Marinated 24 hours, spit-roasted slow, served with authentic house-made garlic toum.
          </p>
        </div>
      </div>

      {/* Footer checklist */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs font-bold text-gray-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#F9D661]" />
          <span>Made Fresh To Order</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#F9D661]" />
          <span>Eco-Friendly Packaging</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#F9D661]" />
          <span>100% Satisfaction Guarantee</span>
        </div>
      </div>
    </motion.div>
  );
};
