'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Truck, ArrowRight, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export const DeliveryCard: React.FC = () => {
  const { deliveryDetails, setIsCartOpen } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bento-card bg-[#BAE6FD] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] sm:min-h-[340px] rounded-[36px] border border-black/5"
    >
      {/* Playful Dotted Path Vector Overlay */}
      <svg
        className="absolute top-10 left-10 w-full h-full pointer-events-none opacity-30"
        viewBox="0 0 300 200"
        fill="none"
      >
        <path
          d="M20 160 C 80 40, 180 180, 260 30"
          stroke="#123C2B"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
      </svg>

      {/* Top Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="text-[11px] font-extrabold tracking-widest text-[#123C2B]/70 uppercase bg-white/60 px-3 py-1 rounded-full border border-black/5">
            FAST TRACK
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#123C2B] leading-none mt-2">
            DELIVERY
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#123C2B]/80 mt-1 max-w-[200px]">
            Hot & fresh to your door in 25 mins or free.
          </p>
        </div>

        {/* Live ETA Badge */}
        <div className="bg-[#123C2B] text-[#F7F4ED] px-3 py-1.5 rounded-2xl flex flex-col items-center shadow-md">
          <Clock className="w-4 h-4 text-[#F9D661]" />
          <span className="text-[10px] font-extrabold uppercase mt-0.5">ETA</span>
          <span className="text-xs font-black text-[#F9D661]">20-30 MIN</span>
        </div>
      </div>

      {/* Delivery Graphic Illustration */}
      <div className="relative z-10 my-2 flex items-center justify-center">
        <motion.div
          whileHover={{ x: 8, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative"
        >
          <img
            src="/images/delivery.jpg"
            alt="Delivery Scooter"
            className="w-44 h-44 sm:w-52 sm:h-52 object-contain filter drop-shadow-[0_12px_15px_rgba(18,60,43,0.15)]"
          />
        </motion.div>
      </div>

      {/* Bottom CTA & Live Location Note */}
      <div className="relative z-10 flex items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#123C2B]/70 bg-white/50 px-3 py-1.5 rounded-full border border-black/5">
          <Navigation className="w-3.5 h-3.5 text-[#123C2B]" />
          <span className="truncate max-w-[120px] sm:max-w-[150px]">{deliveryDetails.address}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="tactile-btn bg-[#123C2B] hover:bg-[#0B291D] text-[#F7F4ED] px-5 py-2.5 rounded-full font-display font-extrabold text-xs flex items-center gap-2 shadow-md group cursor-pointer"
        >
          <span>EXPLORE</span>
          <ArrowRight className="w-4 h-4 text-[#F9D661] group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
