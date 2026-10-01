'use client';

import React from 'react';
import { HeroFoodCard } from '@/components/HeroFoodCard';
import { DeliveryCard } from '@/components/DeliveryCard';
import { DailyDealCard } from '@/components/DailyDealCard';
import { TopPicksCard } from '@/components/TopPicksCard';
import { ComboBuilderCard } from '@/components/ComboBuilderCard';
import { CraftStoryCard } from '@/components/CraftStoryCard';
import { MenuSection } from '@/components/MenuSection';
import { ReviewsTicker } from '@/components/ReviewsTicker';
import { Product } from '@/types';

interface HomePageProps {
  onSelectProductToCustomize?: (product: Product) => void;
}

export default function Home({ onSelectProductToCustomize }: HomePageProps) {
  return (
    <div className="space-y-8">
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
        onSelectProductToCustomize={(product) => {
          if (onSelectProductToCustomize) {
            onSelectProductToCustomize(product);
          }
        }}
      />
    </div>
  );
}
