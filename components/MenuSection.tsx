'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { Product, Category } from '@/types';
import { useCart } from '@/context/CartContext';
import { Search, SlidersHorizontal, Plus, Star, Clock, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuSectionProps {
  onSelectProductToCustomize: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectProductToCustomize }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'All Craves', icon: '✨' },
    { id: 'burger', label: 'Smash Burgers', icon: '🍔' },
    { id: 'pizza', label: 'Sourdough Pizza', icon: '🍕' },
    { id: 'shawarma', label: 'Authentic Shawarma', icon: '🌯' },
    { id: 'sides', label: 'Sides & Wings', icon: '🍟' },
    { id: 'combos', label: 'Crave Bundles', icon: '🎉' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="my-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-[#123C2B] uppercase bg-[#FFFDF9] px-3.5 py-1.5 rounded-full border border-[#123C2B]/10 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#FF8A50]" />
            THE FULL MENU CATALOG
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#123C2B] leading-none mt-2">
            EXPLORE THE <span className="text-[#FF8A50]">CRAVES</span>
          </h2>
          <p className="text-sm font-semibold text-gray-600 mt-2 max-w-lg">
            Artisanal ingredients, smashed, wood-fired, and rotisserie roasted fresh to order.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px] sm:min-w-[320px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search burgers, pizza, shawarma..."
            className="w-full bg-[#FFFDF9] border border-[#123C2B]/15 rounded-full pl-11 pr-4 py-3 text-xs font-bold text-[#123C2B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#123C2B]/30 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-[#123C2B] font-bold"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#123C2B] text-[#F7F4ED] shadow-md ring-2 ring-[#123C2B]/20'
                  : 'bg-[#FFFDF9] hover:bg-white text-[#123C2B] border border-[#123C2B]/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Products Bento Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
              className="bento-card bg-[#FFFDF9] p-6 rounded-[32px] border border-[#123C2B]/10 flex flex-col justify-between hover:shadow-xl transition-all group"
            >
              {/* Top Tag & Image */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold bg-[#F7F4ED] text-[#123C2B] px-2.5 py-1 rounded-full border border-black/5">
                    {product.tags[0] || 'FRESH'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Product Thumbnail */}
                <div
                  className="relative w-full h-48 sm:h-52 rounded-2xl bg-[#F7F4ED] p-2 overflow-hidden flex items-center justify-center cursor-pointer mb-4 border border-black/5"
                  onClick={() =>
                    product.optionGroups ? onSelectProductToCustomize(product) : addToCart(product)
                  }
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.optionGroups && (
                    <div className="absolute top-3 right-3 bg-[#123C2B]/80 text-[#F9D661] text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      CUSTOMIZABLE
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-display font-bold text-xl text-[#123C2B] group-hover:text-[#FF8A50] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-2 mt-1">
                  {product.description}
                </p>
              </div>

              {/* Bottom Price & Action */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase block">PRICE</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-xl text-[#123C2B]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {product.optionGroups ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelectProductToCustomize(product)}
                      className="tactile-btn bg-[#F7F4ED] hover:bg-[#123C2B] text-[#123C2B] hover:text-white px-4 py-2 rounded-full font-display font-bold text-xs border border-[#123C2B]/10 cursor-pointer transition-colors"
                    >
                      CUSTOMIZE
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product)}
                      className="tactile-btn bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-4 py-2.5 rounded-full font-display font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F9D661]" />
                      <span>ADD</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="bg-[#FFFDF9] border border-[#123C2B]/10 rounded-3xl p-12 text-center my-8">
          <p className="font-display font-bold text-xl text-[#123C2B]">No Craves Found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or category filter!</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 bg-[#123C2B] text-white px-5 py-2 rounded-full text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
