'use client';

import React, { useState } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Footer } from '@/components/Footer';
import { Product } from '@/types';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function InnerShell({ children }: { children: React.ReactNode }) {
  const { toastMessage, selectedProductForCustomization, closeCustomizationModal } = useCart();

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#123C2B] font-body selection:bg-[#123C2B] selection:text-[#F7F4ED] flex flex-col justify-between overflow-x-hidden">
      {/* Toast Notification */}
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

      {/* Floating Header */}
      <Header />

      {/* Main Page Body */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 w-full mt-6 space-y-8 flex-1">
        {children}
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Product Customization Modal */}
      <ProductDetailModal
        product={selectedProductForCustomization}
        onClose={closeCustomizationModal}
      />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <InnerShell>{children}</InnerShell>
    </CartProvider>
  );
}
