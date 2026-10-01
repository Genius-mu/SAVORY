'use client';

import React, { useState } from 'react';
import { Product, SelectedOption } from '@/types';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Star, Flame, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!product) return null;

  const handleOptionToggle = (groupTitle: string, optionName: string, price: number) => {
    setSelectedOptions((prev) => {
      // Remove option from same group
      const filtered = prev.filter((opt) => opt.groupTitle !== groupTitle);
      return [...filtered, { groupTitle, optionName, price }];
    });
  };

  const extraPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const finalUnitPrice = product.price + extraPrice;
  const totalPrice = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedOptions, specialInstructions, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#123C2B]/50 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#FFFDF9] rounded-[36px] border border-[#123C2B]/10 max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl z-10 flex flex-col justify-between"
        >
          {/* Header Image Box */}
          <div className="relative bg-[#F7F4ED] p-6 flex flex-col items-center justify-center border-b border-[#123C2B]/10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-[#123C2B] flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain filter drop-shadow-lg my-2"
            />

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-extrabold bg-[#123C2B] text-[#F9D661] px-3 py-1 rounded-full uppercase">
                {product.category.toUpperCase()}
              </span>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating} ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Body Content - Option Groups */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1 max-h-[40vh]">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#123C2B]">
                {product.name}
              </h2>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                {product.description}
              </p>
            </div>

            {/* Render Option Groups */}
            {product.optionGroups?.map((group) => (
              <div key={group.title} className="space-y-2">
                <label className="text-xs font-extrabold text-[#123C2B] uppercase tracking-wider block">
                  {group.title}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {group.options.map((option) => {
                    const isSelected = selectedOptions.some(
                      (opt) => opt.groupTitle === group.title && opt.optionName === option.name
                    );
                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() =>
                          handleOptionToggle(group.title, option.name, option.price)
                        }
                        className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#123C2B] text-[#F9D661] border-[#123C2B] shadow-sm'
                            : 'bg-[#F7F4ED] text-[#123C2B] border-black/5 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#F9D661] bg-[#F9D661]' : 'border-gray-400'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-[#123C2B]" />}
                          </div>
                          <span>{option.name}</span>
                        </div>
                        {option.price > 0 && <span>+${option.price.toFixed(2)}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Special Instructions */}
            <div>
              <label className="text-xs font-extrabold text-[#123C2B] uppercase tracking-wider block mb-1.5">
                SPECIAL INSTRUCTIONS
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra sauce, no onions, sauce on the side..."
                rows={2}
                className="w-full bg-[#F7F4ED] border border-[#123C2B]/10 rounded-2xl p-3 text-xs font-semibold text-[#123C2B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#123C2B]/30"
              />
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-6 border-t border-gray-100 bg-[#F7F4ED] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-white rounded-full p-1.5 border border-black/5 shadow-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#123C2B]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-display font-extrabold text-sm text-[#123C2B] px-2">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#123C2B]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button with calculated price */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className="tactile-btn bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-6 py-3.5 rounded-full font-display font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer flex-1 justify-center"
            >
              <Plus className="w-4 h-4 text-[#F9D661]" />
              <span>ADD TO CRAVE BAG — ${totalPrice.toFixed(2)}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
