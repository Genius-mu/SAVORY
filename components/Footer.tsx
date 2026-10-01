'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, MapPin, Clock, Heart, Share2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#123C2B] text-[#F7F4ED] pt-16 pb-12 rounded-t-[44px] mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Newsletter Bento Box inside Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="bg-[#F9D661] text-[#123C2B] p-8 sm:p-10 rounded-[36px] mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-md">
            <span className="text-[11px] font-extrabold tracking-widest uppercase bg-[#123C2B] text-[#F7F4ED] px-3.5 py-1 rounded-full">
              JOIN THE CRAVE CLUB
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl leading-tight mt-3">
              GET 20% OFF YOUR FIRST CRAVE ORDER
            </h3>
            <p className="text-xs font-semibold text-[#123C2B]/80 mt-1">
              Be the first to hear about secret menu drops & weekend deals.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            {subscribed ? (
              <div className="bg-[#123C2B] text-[#F9D661] px-6 py-3 rounded-full font-display font-extrabold text-xs">
                🎉 YOU&apos;RE IN! CHECK YOUR INBOX FOR YOUR 20% CODE.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white border border-[#123C2B]/10 rounded-full px-5 py-3 text-xs font-bold text-[#123C2B] placeholder:text-gray-400 focus:outline-none min-w-[260px]"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-6 py-3 rounded-full font-display font-extrabold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>CLAIM 20% OFF</span>
                  <ArrowRight className="w-4 h-4 text-[#F9D661]" />
                </motion.button>
              </>
            )}
          </form>
        </motion.div>

        {/* Footer Main Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10"
        >
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#F9D661] text-[#123C2B] flex items-center justify-center">
                <Flame className="w-5 h-5 fill-[#123C2B]" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                SAVORY<span className="text-[#FF8A50]">.</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 font-medium leading-relaxed max-w-xs">
              A modern fast-casual food brand crafting artisanal double smash burgers, wood-fired sourdough pizza, and spit-roasted chicken shawarma.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F9D661] flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F9D661] flex items-center justify-center transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Menu Craves */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#F9D661] uppercase tracking-wider mb-4">
              CRAVE SELECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-bold">
              <li><Link href="/menu" className="hover:text-white transition-colors">Full Craft Menu Catalog</Link></li>
              <li><Link href="/combos" className="hover:text-white transition-colors">Custom Combo Builder</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Craft Manifesto</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Store Locations & Hours</Link></li>
            </ul>
          </div>

          {/* Col 3: Store Locations */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#F9D661] uppercase tracking-wider mb-4">
              STORE LOCATIONS
            </h4>
            <div className="space-y-3 text-xs text-gray-300 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF8A50] flex-shrink-0 mt-0.5" />
                <span>Downtown Kitchen — 142 Bedford Ave, Brooklyn, NY</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF8A50] flex-shrink-0 mt-0.5" />
                <span>West End Hub — 880 8th Ave, Manhattan, NY</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F9D661] flex-shrink-0 mt-0.5" />
                <span>Open Daily: 11:00 AM – 2:00 AM</span>
              </div>
            </div>
          </div>

          {/* Col 4: Quality Guarantee */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
            <h4 className="font-display font-bold text-sm text-white mb-2">
              THE CRAVE PROMISE
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              If your food is not piping hot and perfectly prepared, we will replace it or refund your order with no questions asked.
            </p>
            <div className="mt-3 text-[11px] font-extrabold text-[#F9D661]">
              100% SATISFACTION GUARANTEED
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} SAVORY CRAFT FOOD CO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF6B6B] text-[#FF6B6B]" />
            <span>for true food lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
