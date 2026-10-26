'use client';

import React from 'react';
import { DINING_VENUES } from '@/data/hotelData';
import { Wine, Clock, Shirt, ArrowRight, Star } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { personalizeText } from '@/utils/sanitizeHotelText';

interface DiningRockBarProps {
  onReserveTable: (venueName: string) => void;
}

export const DiningRockBar: React.FC<DiningRockBarProps> = ({ onReserveTable }) => {
  const { hotel } = useHotel();
  const rawRockBar = DINING_VENUES.find((d) => d.id === 'rock-bar') || DINING_VENUES[0];
  const rawOtherVenues = DINING_VENUES.filter((d) => d.id !== 'rock-bar');

  const rockBar = {
    ...rawRockBar,
    name: personalizeText(rawRockBar.name, hotel.name, hotel.city, hotel.isPersonalized),
    description: personalizeText(rawRockBar.description, hotel.name, hotel.city, hotel.isPersonalized),
  };

  const otherVenues = rawOtherVenues.map((v) => ({
    ...v,
    name: personalizeText(v.name, hotel.name, hotel.city, hotel.isPersonalized),
    cuisine: personalizeText(v.cuisine, hotel.name, hotel.city, hotel.isPersonalized),
    description: personalizeText(v.description, hotel.name, hotel.city, hotel.isPersonalized),
  }));

  return (
    <section id="dining" className="py-20 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* ROCK BAR MASTER HERO CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E2DBD0] shadow-xl mb-12 sm:mb-16">
          <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[460px] overflow-hidden group">
            <img
              src={rockBar.image}
              alt={rockBar.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
              <span className="bg-black/80 backdrop-blur-md border border-[#D9A83E]/50 text-[#F3E5AB] text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg tracking-wider uppercase flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-[#F3E5AB]" />
                {hotel.isPersonalized ? `PREMIER SUNSET DESTINATION IN ${hotel.city.toUpperCase()}` : 'CNN TRAVEL TOP 10 SUNSET BARS GLOBALLY'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.3em] text-[#855F16] uppercase mb-2 block">
              {hotel.isPersonalized ? 'SIGNATURE PANORAMIC LOUNGE' : 'THE WORLD-FAMOUS LANDMARK'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal mb-3 sm:mb-4">
              {rockBar.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
              {hotel.isPersonalized
                ? `Menghadirkan pemandangan spektakuler dengan suasana santai nan elegan di ${hotel.city}. Nikmati kreasi botanical cocktail terbaik dan sajian tapas gourmet saat matahari terbenam.`
                : rockBar.description}
            </p>

            <div className="space-y-2.5 mb-6 sm:mb-8 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2.5">
                <Wine className="w-4 h-4 text-[#855F16] flex-shrink-0" />
                <span><strong>Direct Guest Privilege:</strong> Priority entrance &amp; VIP reserved seating.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#855F16] flex-shrink-0" />
                <span>{rockBar.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shirt className="w-4 h-4 text-[#855F16] flex-shrink-0" />
                <span>Dress Code: {rockBar.dressCode}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onReserveTable(rockBar.name)}
                className="gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider px-6 py-3 rounded shadow-sm transition-all duration-300"
              >
                RESERVE SUNSET TABLE
              </button>
            </div>
          </div>
        </div>

        {/* MORE SIGNATURE RESTAURANTS */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold tracking-[0.25em] text-[#855F16] uppercase block mb-2">
            26 GASTRONOMIC DESTINATIONS
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-stone-900 font-normal">
            From Oceanfront Sand to Chic Rooftop Pools
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E2DBD0] hover:border-[#A37A24]/60 transition-all duration-300 group flex flex-col shadow-xs hover:shadow-md"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#855F16] text-[10px] font-bold px-2.5 py-1 rounded tracking-wider uppercase border border-[#DCD5C8]">
                  {venue.tag}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h4 className="font-serif text-2xl text-stone-900 mb-1">{venue.name}</h4>
                <div className="text-xs text-[#855F16] font-bold mb-3">{venue.cuisine}</div>
                <p className="text-xs text-stone-600 leading-relaxed mb-6 flex-1">
                  {venue.description}
                </p>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">{venue.hours}</span>
                  <button
                    onClick={() => onReserveTable(venue.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#855F16] hover:text-black transition-colors"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
