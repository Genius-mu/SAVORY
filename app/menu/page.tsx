'use client';

import React from 'react';
import { MenuSection } from '@/components/MenuSection';
import { Product } from '@/types';
import { Flame, Star, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuPageProps {
  onSelectProductToCustomize?: (product: Product) => void;
}

export default function MenuPage({ onSelectProductToCustomize }: MenuPageProps) {
  return (
    <div className="space-y-8 py-4">
      {/* Editorial Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bento-card bg-[#F9D661] text-[#123C2B] p-8 sm:p-12 rounded-[36px] border border-black/5 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest uppercase bg-[#123C2B] text-[#F7F4ED] px-3.5 py-1 rounded-full shadow-md">
            <Flame className="w-3.5 h-3.5 text-[#F9D661]" />
            ARTISANAL CRAFT CATALOG
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl leading-tight mt-3 text-[#123C2B]">
            OUR FULL CRAVE MENU
          </h1>
          <p className="text-sm sm:text-base font-semibold text-[#123C2B]/85 mt-2 leading-relaxed">
            Every burger smashed hot on cast iron. Every sourdough pizza wood-fired at 900°F. Every shawarma marinated 24 hours in secret spices.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
          <div className="bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-black/5 flex items-center gap-3">
            <Award className="w-6 h-6 text-[#123C2B]" />
            <div>
              <div className="font-display font-black text-sm text-[#123C2B]">100% FRESH INGREDIENTS</div>
              <div className="text-[11px] text-[#123C2B]/70 font-bold">Never frozen, local suppliers</div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-black/5 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#123C2B]" />
            <div>
              <div className="font-display font-black text-sm text-[#123C2B]">MADE TO ORDER</div>
              <div className="text-[11px] text-[#123C2B]/70 font-bold">Hot to your door in 25 mins</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Interactive Menu Catalog */}
      <MenuSection
        onSelectProductToCustomize={(product) => {
          if (onSelectProductToCustomize) {
            onSelectProductToCustomize(product);
          }
        }}
      />
    </div>
  );
}
