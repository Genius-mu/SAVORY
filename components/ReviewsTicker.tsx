'use client';

import React from 'react';
import { Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewsTicker: React.FC = () => {
  const reviews = [
    { quote: "Best smash burger in NYC! Crispy edges are insane.", author: "Marcus K., Foodie Critic" },
    { quote: "The garlic toum on the chicken shawarma changed my life.", author: "Sarah T., Brooklyn" },
    { quote: "Wood-fired crust with hot honey drizzle is elite.", author: "Dave R., Pizza Digest" },
    { quote: "Fast 20-min delivery and packaging stayed super piping hot!", author: "Elena M., Midtown" },
    { quote: "Finally a fast-food brand that takes ingredients seriously.", author: "Chef Julian B." },
  ];

  // Quadruple items to ensure flawless seam-free infinite scroll at any screen width
  const marqueeItems = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <div className="bg-[#F9D661] border-y border-[#123C2B]/10 py-3.5 overflow-hidden select-none relative flex items-center">
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap min-w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30,
          ease: 'linear',
        }}
      >
        {marqueeItems.map((rev, idx) => (
          <div key={idx} className="flex items-center gap-3 font-display font-extrabold text-xs sm:text-sm text-[#123C2B]">
            <div className="flex items-center gap-1 text-[#123C2B]">
              <Star className="w-3.5 h-3.5 fill-[#123C2B] text-[#123C2B]" />
              <Star className="w-3.5 h-3.5 fill-[#123C2B] text-[#123C2B]" />
              <Star className="w-3.5 h-3.5 fill-[#123C2B] text-[#123C2B]" />
              <Star className="w-3.5 h-3.5 fill-[#123C2B] text-[#123C2B]" />
              <Star className="w-3.5 h-3.5 fill-[#123C2B] text-[#123C2B]" />
            </div>
            <span>&ldquo;{rev.quote}&rdquo;</span>
            <span className="text-[10px] font-bold uppercase text-[#123C2B]/70 bg-white/50 px-2 py-0.5 rounded-full">
              — {rev.author}
            </span>
            <Flame className="w-4 h-4 text-[#123C2B] opacity-40 ml-4" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
