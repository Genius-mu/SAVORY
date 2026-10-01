'use client';

import React, { useState } from 'react';
import { DeliveryCard } from '@/components/DeliveryCard';
import { useCart } from '@/context/CartContext';
import { MapPin, Clock, Phone, Navigation, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocationsPage() {
  const { setDeliveryDetails } = useCart();
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = [
    {
      id: 'downtown',
      name: 'Brooklyn Downtown Kitchen',
      address: '142 Bedford Ave, Brooklyn, NY 11211',
      neighborhood: 'Williamsburg / Downtown',
      phone: '(718) 388-9201',
      hours: '11:00 AM – 2:00 AM Daily',
      status: 'Open Now',
      etaDelivery: '20-25 mins',
      etaPickup: '8-10 mins',
      highlights: ['Outdoor Seating', 'Craft Soda Fountain', 'Late Night Kitchen'],
      bgColor: '#F9D661',
    },
    {
      id: 'manhattan',
      name: 'Manhattan West End Hub',
      address: '880 8th Ave, New York, NY 10019',
      neighborhood: 'Hell\'s Kitchen / Midtown',
      phone: '(212) 582-4410',
      hours: '11:00 AM – 3:00 AM Daily',
      status: 'Open Now',
      etaDelivery: '15-20 mins',
      etaPickup: '5-8 mins',
      highlights: ['Express Takeout Window', 'Wood-Fired Oven View', 'Curbside Pickup'],
      bgColor: '#FF8A50',
    },
    {
      id: 'queens',
      name: 'Queens Astoria Craft Kitchen',
      address: '31-08 Broadway, Astoria, NY 11106',
      neighborhood: 'Astoria Craft District',
      phone: '(718) 728-1190',
      hours: '11:30 AM – 1:00 AM Daily',
      status: 'Open Now',
      etaDelivery: '25-30 mins',
      etaPickup: '10-12 mins',
      highlights: ['Patio Dining', 'Spit-Roast Station', 'Beer & Wine License'],
      bgColor: '#FFB088',
    },
  ];

  const activeLoc = locations[selectedLocation];

  const handleSelectBranch = (loc: typeof activeLoc) => {
    setDeliveryDetails((prev) => ({
      ...prev,
      branch: `${loc.name} (${loc.address})`,
    }));
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bento-card bg-[#BAE6FD] text-[#123C2B] p-8 sm:p-12 rounded-[36px] border border-black/5 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest uppercase bg-[#123C2B] text-[#F7F4ED] px-3.5 py-1 rounded-full shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#F9D661]" />
            STORE LOCATOR & DELIVERY HUBS
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl leading-tight mt-3 text-[#123C2B]">
            FIND YOUR NEAREST SAVORY
          </h1>
          <p className="text-sm sm:text-base font-semibold text-[#123C2B]/85 mt-2 leading-relaxed">
            3 craft kitchens across NYC open late daily. Order for pickup in under 10 minutes or get piping hot delivery in 25 minutes flat!
          </p>
        </div>

        <div className="bg-[#123C2B] text-[#F7F4ED] p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl flex-shrink-0 min-w-[220px]">
          <Clock className="w-10 h-10 text-[#F9D661] mb-1" />
          <div className="font-display font-black text-xl text-[#F9D661]">OPEN LATE</div>
          <div className="text-xs text-gray-300 font-bold mt-1">UNTIL 3:00 AM</div>
        </div>
      </motion.div>

      {/* Grid: Delivery Card + Locations Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Delivery Card Component */}
        <div className="lg:col-span-5 flex flex-col justify-stretch">
          <DeliveryCard />
        </div>

        {/* Right 7 Cols: Store Location Tabs */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-display font-extrabold text-2xl text-[#123C2B]">
            SELECT CRAFT KITCHEN BRANCH
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {locations.map((loc, idx) => {
              const isSelected = idx === selectedLocation;
              return (
                <motion.div
                  key={loc.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                    setSelectedLocation(idx);
                    handleSelectBranch(loc);
                  }}
                  className={`bento-card p-6 rounded-[32px] border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#123C2B] text-[#F7F4ED] border-[#123C2B] shadow-xl ring-2 ring-[#123C2B]/30'
                      : 'bg-[#FFFDF9] text-[#123C2B] border-[#123C2B]/10 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        isSelected ? 'bg-[#F9D661] text-[#123C2B]' : 'bg-[#123C2B] text-white'
                      }`}>
                        {loc.status}
                      </span>
                      <span className={`text-xs font-bold ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                        {loc.neighborhood}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl">{loc.name}</h3>
                    <p className={`text-xs font-medium ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                      {loc.address}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-bold pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF8A50]" />
                        {loc.hours}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#F9D661]" />
                        {loc.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-end justify-between gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase opacity-70 block">PICKUP ETA</span>
                      <span className={`font-display font-black text-lg ${isSelected ? 'text-[#F9D661]' : 'text-[#123C2B]'}`}>
                        {loc.etaPickup}
                      </span>
                    </div>

                    <button
                      className={`px-4 py-2 rounded-full font-display font-extrabold text-xs flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#F9D661] text-[#123C2B]'
                          : 'bg-[#123C2B] text-white hover:bg-[#0B291D]'
                      }`}
                    >
                      <span>{isSelected ? 'SELECTED' : 'SELECT'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
