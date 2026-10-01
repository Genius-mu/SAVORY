'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Check, Plus, Gift, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const ComboBuilderCard: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedMain, setSelectedMain] = useState('p-1'); // Burger
  const [selectedSide, setSelectedSide] = useState('p-5'); // Loaded Fries
  const [selectedDrink, setSelectedDrink] = useState('Craft Soda');

  const mains = PRODUCTS.filter((p) => ['burger', 'pizza', 'shawarma'].includes(p.category));
  const sides = PRODUCTS.filter((p) => p.category === 'sides');
  const drinks = [
    { name: 'Craft Cherry Cane Soda', price: 3.5 },
    { name: 'Vanilla Bean Milkshake', price: 4.99 },
    { name: 'Iced Mint Hibiscus Tea', price: 3.5 },
  ];

  const mainObj = mains.find((m) => m.id === selectedMain) || mains[0];
  const sideObj = sides.find((s) => s.id === selectedSide) || sides[0];
  const drinkObj = drinks.find((d) => d.name === selectedDrink) || drinks[0];

  const rawTotal = mainObj.price + sideObj.price + drinkObj.price;
  const comboPrice = rawTotal * 0.8; // 20% Bundle savings

  const handleAddCombo = () => {
    // Add custom combo object to cart
    const comboProduct = {
      id: `combo-${Date.now()}`,
      name: `Crave Combo: ${mainObj.name}`,
      category: 'combos' as const,
      price: Number(comboPrice.toFixed(2)),
      originalPrice: Number(rawTotal.toFixed(2)),
      image: mainObj.image,
      description: `Includes: ${mainObj.name} + ${sideObj.name} + ${drinkObj.name}`,
      tags: ['🎉 Custom Bundle', '20% Off'],
      rating: 5.0,
      reviewsCount: 150,
    };

    addToCart(comboProduct);
  };

  return (
    <motion.div
      id="combo-builder"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="bento-card bg-[#A7F3D0] p-6 sm:p-8 lg:p-10 flex flex-col justify-between rounded-[36px] border border-black/5 shadow-xl relative overflow-hidden"
    >
      {/* Decorative badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-[#123C2B] uppercase bg-white/70 px-3.5 py-1 rounded-full border border-black/5">
            <Flame className="w-3.5 h-3.5 text-[#123C2B]" />
            CUSTOM CRAVE BUILDER
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#123C2B] leading-none mt-2">
            BUILD YOUR COMBO
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#123C2B]/80 mt-1">
            Pick 1 Main + 1 Side + 1 Drink = Save 20% Automatically!
          </p>
        </div>

        <div className="bg-[#123C2B] text-[#F9D661] px-4 py-2 rounded-2xl flex items-center gap-2 shadow-md">
          <Gift className="w-5 h-5 text-[#FF8A50]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase text-white">BUNDLE DISCOUNT</span>
            <span className="font-display font-black text-sm text-[#F9D661]">SAVE 20% OFF</span>
          </div>
        </div>
      </div>

      {/* 3 Step Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
        {/* Step 1: Main */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl border border-black/5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#123C2B]/60 block mb-2">
            STEP 1: CHOOSE MAIN
          </span>
          <div className="flex flex-col gap-2">
            {mains.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedMain(item.id)}
                className={`p-2.5 rounded-2xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  selectedMain === item.id
                    ? 'bg-[#123C2B] text-white shadow-md'
                    : 'bg-[#F7F4ED] hover:bg-gray-100 text-[#123C2B]'
                }`}
              >
                <span className="truncate">{item.name}</span>
                <span className="font-extrabold">${item.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Side */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl border border-black/5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#123C2B]/60 block mb-2">
            STEP 2: CHOOSE SIDE
          </span>
          <div className="flex flex-col gap-2">
            {sides.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSide(item.id)}
                className={`p-2.5 rounded-2xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  selectedSide === item.id
                    ? 'bg-[#123C2B] text-white shadow-md'
                    : 'bg-[#F7F4ED] hover:bg-gray-100 text-[#123C2B]'
                }`}
              >
                <span className="truncate">{item.name}</span>
                <span className="font-extrabold">${item.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Drink */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl border border-black/5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#123C2B]/60 block mb-2">
            STEP 3: CHOOSE DRINK
          </span>
          <div className="flex flex-col gap-2">
            {drinks.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedDrink(item.name)}
                className={`p-2.5 rounded-2xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  selectedDrink === item.name
                    ? 'bg-[#123C2B] text-white shadow-md'
                    : 'bg-[#F7F4ED] hover:bg-gray-100 text-[#123C2B]'
                }`}
              >
                <span className="truncate">{item.name}</span>
                <span className="font-extrabold">${item.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Combo Summary Bar */}
      <div className="mt-4 bg-[#123C2B] text-[#F7F4ED] p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F9D661] text-[#123C2B] flex items-center justify-center font-black text-lg">
            3x
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-300">Your Bundle Summary:</div>
            <div className="text-sm font-extrabold text-[#F9D661] line-clamp-1">
              {mainObj.name} + {sideObj.name} + {drinkObj.name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 line-through">
              ${rawTotal.toFixed(2)}
            </span>
            <span className="font-display font-black text-xl text-[#F9D661]">
              ${comboPrice.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddCombo}
            className="tactile-btn bg-[#FF8A50] hover:bg-[#FF7A00] text-white px-6 py-3 rounded-full font-display font-extrabold text-xs flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>ADD BUNDLE</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
