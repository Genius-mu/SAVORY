'use client';

import React, { useState } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { HeroFoodCard } from '@/components/HeroFoodCard';
import { DeliveryCard } from '@/components/DeliveryCard';
import { DailyDealCard } from '@/components/DailyDealCard';
import { TopPicksCard } from '@/components/TopPicksCard';
import { ComboBuilderCard } from '@/components/ComboBuilderCard';
import { CraftStoryCard } from '@/components/CraftStoryCard';
import { MenuSection } from '@/components/MenuSection';
import { ReviewsTicker } from '@/components/ReviewsTicker';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Footer } from '@/components/Footer';
import { Product } from '@/types';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function MainAppContent() {
  const [selectedProductForCustomization, setSelectedProductForCustomization] =
    useState<Product | null>(null);
  const { toastMessage } = useCart();

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#123C2B] font-body selection:bg-[#123C2B] selection:text-[#F7F4ED] flex flex-col justify-between overflow-x-hidden">
      
      {/* Toast Notification for Add-to-Cart Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#123C2B] text-[#F9D661] px-6 py-3 rounded-full font-display font-extrabold text-xs sm:text-sm shadow-2xl flex items-center gap-2 border border-[#F9D661]/30"
          >
            <div className="w-5 h-5 rounded-full bg-[#F9D661] text-[#123C2B] flex items-center justify-center font-black">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation Header */}
      <Header />

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 w-full mt-6 space-y-8 flex-1">
        
        {/* Section 1: Core Hero Bento Box Grid (Asymmetric Collage Layout) */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Food Card (Dominant 7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col">
            <HeroFoodCard />
          </div>

          {/* Side Supporting Bento Cards (5 columns stacked on desktop) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <DeliveryCard />
            <DailyDealCard />
          </div>
        </section>

        {/* Section 2: Top Picks Bento Card */}
        <section className="w-full">
          <TopPicksCard />
        </section>

        {/* Section 3: Customer Reviews Ticker */}
        <div className="rounded-full overflow-hidden my-4 shadow-sm">
          <ReviewsTicker />
        </div>

        {/* Section 4: Interactive Custom Combo Crave Builder */}
        <section className="w-full">
          <ComboBuilderCard />
        </section>

        {/* Section 5: Brand Craft Story & Editorial Manifesto */}
        <section className="w-full">
          <CraftStoryCard />
        </section>

        {/* Section 6: Full Menu Bento Catalog */}
        <MenuSection
          onSelectProductToCustomize={(product) =>
            setSelectedProductForCustomization(product)
          }
        />
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Product Customization Modal */}
      <ProductDetailModal
        product={selectedProductForCustomization}
        onClose={() => setSelectedProductForCustomization(null)}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
