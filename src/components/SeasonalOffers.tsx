'use client';

import React from 'react';
import { SPECIAL_OFFERS, SpecialOffer } from '@/data/hotelData';
import { Check, Sparkles } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { personalizeText } from '@/utils/sanitizeHotelText';

interface SeasonalOffersProps {
  onClaimOffer: (offer: SpecialOffer) => void;
}

export const SeasonalOffers: React.FC<SeasonalOffersProps> = ({ onClaimOffer }) => {
  const { hotel } = useHotel();

  const offers = SPECIAL_OFFERS.map((offer) => ({
    ...offer,
    title: personalizeText(offer.title, hotel.name, hotel.city, hotel.isPersonalized),
    description: personalizeText(offer.description, hotel.name, hotel.city, hotel.isPersonalized),
    perks: offer.perks.map((p) =>
      personalizeText(p, hotel.name, hotel.city, hotel.isPersonalized)
    ),
  }));

  return (
    <section id="offers" className="py-20 sm:py-24 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#855F16] uppercase block mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              DIRECT PRIVILEGES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-normal">
              Curated Seasonal Escapes
            </h2>
          </div>
          <a
            href="#hero"
            className="text-xs font-bold text-[#855F16] hover:text-black uppercase tracking-wider transition-colors"
          >
            Check Custom Dates &rarr;
          </a>
        </div>

        {/* 2 Special Offer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2DBD0] hover:border-[#A37A24]/60 transition-all duration-500 flex flex-col group shadow-sm hover:shadow-xl"
            >
              <div className="relative h-60 sm:h-72 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 right-4 gold-gradient-bg text-black text-xs font-bold px-3.5 py-1.5 rounded uppercase tracking-wider shadow-sm">
                  {offer.badge}
                </span>
              </div>

              <div className="p-6 sm:p-10 flex flex-col flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mb-2 sm:mb-3">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  {offer.description}
                </p>

                <ul className="space-y-2 mb-6 sm:mb-8">
                  {offer.perks.map((p, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                      <Check className="w-4 h-4 text-[#855F16] flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-700 font-bold">{offer.savings}</span>
                  <button
                    onClick={() => onClaimOffer(offer)}
                    className="gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider px-5 py-2.5 rounded shadow-xs transition-all duration-300"
                  >
                    CLAIM PRIVILEGE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
