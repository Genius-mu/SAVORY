'use client';

import React from 'react';
import { CraftStoryCard } from '@/components/CraftStoryCard';
import { ReviewsTicker } from '@/components/ReviewsTicker';
import { Award, Flame, HeartHandshake, ShieldCheck, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="space-y-12 py-4">
      {/* Editorial Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bento-card bg-[#123C2B] text-[#F7F4ED] p-8 sm:p-12 rounded-[36px] border border-black/5 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest uppercase bg-[#F9D661] text-[#123C2B] px-3.5 py-1 rounded-full shadow-md">
            <Flame className="w-3.5 h-3.5 fill-[#123C2B]" />
            OUR CRAFT MANIFESTO
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl leading-tight mt-4 text-white">
            WE BELIEVE FAST FOOD SHOULD BE <span className="text-[#F9D661]">UNCOMPROMISING</span>.
          </h1>
          <p className="text-sm sm:text-base font-semibold text-gray-300 mt-3 leading-relaxed">
            Founded in 2015 in Brooklyn, SAVORY was born out of a simple frustration: why does fast food have to mean cheap ingredients, frozen patties, and bland flatbreads? We set out to art-direct every single recipe from scratch.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center flex-shrink-0 min-w-[240px]">
          <Award className="w-12 h-12 text-[#F9D661] mb-2" />
          <div className="font-display font-black text-3xl text-white">10 YEARS</div>
          <div className="text-xs text-gray-300 font-bold">OF ARTISANAL CRAFT CRAVES</div>
          <div className="mt-3 text-[10px] font-black uppercase text-[#F9D661] bg-white/10 px-3 py-1 rounded-full">
            SINCE 2015
          </div>
        </div>
      </motion.div>

      {/* Embedded Main Craft Story Bento Card */}
      <section className="w-full">
        <CraftStoryCard />
      </section>

      {/* 4 Culinary Standards Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-extrabold tracking-widest text-[#123C2B] uppercase bg-white/80 px-3 py-1 rounded-full border border-black/5">
            CULINARY PILLARS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#123C2B] mt-2">
            THE 4 SAVORY PILLARS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: '🥩',
              title: '100% Angus Beef',
              desc: 'Grass-fed Angus beef delivered daily from local farms. Smashed hard on 500°F cast iron for lacy, caramelized crispy crusts.',
              bgColor: '#F9D661',
            },
            {
              icon: '🌾',
              title: '72h Sourdough',
              desc: 'Wild sourdough starter nurtured over 10 years. Fermented for 3 full days to unlock rich flavor and light, digestible air pockets.',
              bgColor: '#FF8A50',
            },
            {
              icon: '🌶️',
              title: '12-Spice Rub',
              desc: 'Authentic Middle Eastern spices ground fresh weekly. Spit-roasted vertically for juicy, slow-dripping savory chicken.',
              bgColor: '#FFB088',
            },
            {
              icon: '🧄',
              title: 'Scratch Garlic Toum',
              desc: 'Emulsified fresh garlic, lemon juice, and extra virgin olive oil. Fluffy, cloud-like, and made fresh every 4 hours.',
              bgColor: '#BAE6FD',
            },
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.08 }}
              style={{ backgroundColor: pillar.bgColor }}
              className="bento-card p-6 rounded-[32px] border border-black/5 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center text-2xl shadow-sm mb-4">
                  {pillar.icon}
                </div>
                <h3 className="font-display font-black text-xl text-[#123C2B]">{pillar.title}</h3>
                <p className="text-xs font-semibold text-[#123C2B]/80 mt-2 leading-relaxed">{pillar.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/10 flex items-center gap-1.5 text-[11px] font-extrabold text-[#123C2B]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Standard</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infinite Customer Reviews Ticker */}
      <div className="rounded-full overflow-hidden my-6 shadow-md">
        <ReviewsTicker />
      </div>
    </div>
  );
}
