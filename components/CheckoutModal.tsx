'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Check, ArrowRight, ShieldCheck, MapPin, CreditCard, Smartphone, Truck, Clock, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    totalPrice,
    clearCart,
    deliveryDetails,
    triggerConfetti,
  } = useCart();

  const [step, setStep] = useState<'details' | 'tracking'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Alex Morgan',
    phone: '(555) 382-9102',
    address: deliveryDetails.address,
    unit: deliveryDetails.unit || '',
    notes: deliveryDetails.notes || '',
    paymentMethod: 'card' as 'card' | 'applepay' | 'cash',
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [activeTimelineStage, setActiveTimelineStage] = useState(1);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrderNum = `#SAVORY-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(randomOrderNum);
    triggerConfetti();
    setStep('tracking');
    clearCart();

    // Advance order tracker automatically
    setTimeout(() => setActiveTimelineStage(2), 4000);
    setTimeout(() => setActiveTimelineStage(3), 9000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#123C2B]/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#FFFDF9] rounded-[36px] border border-[#123C2B]/10 max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 bg-[#123C2B] text-[#F7F4ED] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#F9D661] text-[#123C2B] flex items-center justify-center font-black">
                <Flame className="w-5 h-5 fill-[#123C2B]" />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-white">
                  {step === 'details' ? 'CHECKOUT CRAVE' : 'LIVE ORDER TRACKER'}
                </h2>
                <p className="text-xs text-[#F9D661] font-bold">
                  {step === 'details' ? 'Fast & Secure Express Ordering' : orderNumber}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Step */}
          {step === 'details' ? (
            <form onSubmit={handlePlaceOrder} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="text-xs font-extrabold text-[#123C2B] uppercase tracking-wider block mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#F7F4ED] border border-[#123C2B]/10 rounded-2xl p-3 text-xs font-bold text-[#123C2B] focus:outline-none focus:ring-2 focus:ring-[#123C2B]/30"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#123C2B] uppercase tracking-wider block mb-1">
                  PHONE NUMBER (FOR DELIVERY SMS)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#F7F4ED] border border-[#123C2B]/10 rounded-2xl p-3 text-xs font-bold text-[#123C2B] focus:outline-none focus:ring-2 focus:ring-[#123C2B]/30"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#123C2B] uppercase tracking-wider block mb-1">
                  DELIVERY ADDRESS
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#F7F4ED] border border-[#123C2B]/10 rounded-2xl p-3 text-xs font-bold text-[#123C2B] focus:outline-none focus:ring-2 focus:ring-[#123C2B]/30"
                />
              </div>

              {/* Payment Option Buttons */}
              <div>
                <label className="text-xs font-extrabold text-[#123C2B] uppercase tracking-wider block mb-2">
                  PAYMENT METHOD
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'applepay', label: 'Apple Pay', icon: Smartphone },
                    { id: 'cash', label: 'Cash / COD', icon: ShieldCheck },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = formData.paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, paymentMethod: m.id as any })
                        }
                        className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#123C2B] text-[#F9D661] border-[#123C2B] shadow-md'
                            : 'bg-[#F7F4ED] text-gray-700 border-black/5 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total Summary Row */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500">Total to Pay:</span>
                  <div className="font-display font-black text-2xl text-[#123C2B]">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="tactile-btn bg-[#FF8A50] hover:bg-[#FF7A00] text-white px-6 py-3.5 rounded-full font-display font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>PLACE CRAVE ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          ) : (
            /* Live Order Tracker Step */
            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="text-center py-4 bg-[#F7F4ED] rounded-3xl border border-[#123C2B]/10">
                <div className="w-16 h-16 rounded-full bg-[#123C2B] text-[#F9D661] mx-auto flex items-center justify-center text-2xl shadow-lg mb-3">
                  🔥
                </div>
                <h3 className="font-display font-black text-2xl text-[#123C2B]">
                  ORDER CONFIRMED!
                </h3>
                <p className="text-xs font-semibold text-gray-600 mt-1 max-w-xs mx-auto">
                  Our chef team is preparing your smash burgers & sourdough pizza right now!
                </p>
                <div className="mt-3 inline-block bg-[#123C2B] text-[#F9D661] text-xs font-extrabold px-4 py-1.5 rounded-full">
                  ESTIMATED ARRIVAL: 22 MINS
                </div>
              </div>

              {/* Timeline Tracker */}
              <div className="space-y-4 px-2">
                {[
                  {
                    stage: 1,
                    title: 'Order Received & Sent to Kitchen',
                    desc: 'Your order was logged and sent to our line cooks.',
                    icon: Check,
                  },
                  {
                    stage: 2,
                    title: 'Smashed & Wood-Fired in Oven',
                    desc: 'Fresh ingredients hot on the iron grill.',
                    icon: Flame,
                  },
                  {
                    stage: 3,
                    title: 'Out for Delivery with Rider',
                    desc: 'On its way to your front door in an insulated bag.',
                    icon: Truck,
                  },
                ].map((item) => {
                  const isDone = activeTimelineStage >= item.stage;
                  const Icon = item.icon;
                  return (
                    <div key={item.stage} className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-colors ${
                          isDone
                            ? 'bg-[#123C2B] text-[#F9D661]'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className={`font-display font-bold text-sm ${isDone ? 'text-[#123C2B]' : 'text-gray-400'}`}>
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-[#123C2B] text-[#F7F4ED] py-3.5 rounded-full font-display font-extrabold text-xs tracking-wider uppercase shadow-md hover:bg-[#0B291D]"
              >
                RETURN TO HOMEPAGE
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
