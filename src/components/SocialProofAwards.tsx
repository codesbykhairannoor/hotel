'use client';

import React from 'react';
import { Trophy, Star, Award, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';

export const SocialProofAwards: React.FC = () => {
  const { hotel } = useHotel();

  const awards = [
    {
      icon: Trophy,
      source: hotel.isPersonalized ? 'Google Maps Rating' : 'Travel + Leisure',
      title: hotel.isPersonalized ? `⭐ ${hotel.rating} / 5.0 Star Experience` : '#1 Resort in Indonesia 2025',
    },
    {
      icon: Star,
      source: hotel.isPersonalized ? 'Verified Guest Reviews' : 'Forbes Travel Guide',
      title: hotel.isPersonalized ? `${hotel.reviews}+ Verified Travelers` : 'Five-Star Luxury Award',
    },
    {
      icon: Award,
      source: hotel.isPersonalized ? 'Prime Location' : 'Condé Nast Traveler',
      title: hotel.isPersonalized ? `Premier Stay in ${hotel.city}` : 'Gold List: Top Resorts in Asia',
    },
    {
      icon: Sparkles,
      source: hotel.isPersonalized ? 'Direct Booking Privilege' : 'World Luxury Spa Awards',
      title: hotel.isPersonalized ? 'Best Rate Guarantee & VIP Care' : 'Best Resort Spa Globally',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F5] border-t border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] text-[#855F16] uppercase block mb-3">
            {hotel.isPersonalized ? 'VERIFIED GUEST ACCLAIM' : 'CELEBRATED EXCELLENCE'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-normal">
            {hotel.isPersonalized
              ? `Trusted Excellence at ${hotel.name}`
              : 'Recognized Among the World’s Finest'}
          </h2>
          {hotel.isPersonalized && (
            <div className="mt-3 inline-flex items-center gap-2 bg-[#A37A24]/10 text-[#855F16] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full border border-[#A37A24]/20">
              <MapPin className="w-4 h-4 text-[#855F16]" />
              <span>
                {hotel.city}
                {hotel.province && hotel.province !== hotel.city ? `, ${hotel.province}` : ''}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#855F16]" />
                <strong>{hotel.rating}</strong> ({hotel.reviews} ulasan)
              </span>
            </div>
          )}
        </div>

        {/* 4 Awards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {awards.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 sm:p-8 rounded-2xl text-center border border-[#E2DBD0] hover:border-[#A37A24]/50 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#A37A24]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-[#855F16]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">{a.source}</h4>
                <p className="text-[11px] sm:text-xs text-[#855F16] font-semibold">{a.title}</p>
              </div>
            );
          })}
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-12 rounded-2xl sm:rounded-3xl border border-[#E2DBD0] text-center shadow-lg">
          <div className="flex justify-center gap-1.5 mb-4 sm:mb-6 text-[#A37A24]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#A37A24]" />
            ))}
          </div>

          <p className="font-serif text-base sm:text-2xl text-stone-800 italic leading-relaxed mb-6 font-light">
            {hotel.isPersonalized
              ? `“Pelayanan di ${hotel.name} sungguh luar biasa ramah dan profesional. Lokasinya di ${hotel.city} sangat strategis, suasana kamar bersih dan nyaman, serta reservasi via WhatsApp sangat responsif dan cepat.”`
              : '“We have stayed at luxury properties worldwide, but The Villas at AYANA is on an entirely different level of perfection. The private clifftop plunge pool at sunset, our personal butler Gede who anticipated our every need, and the VIP access to Rock Bar made this the most memorable stay of our lives.”'}
          </p>

          <div>
            <strong className="text-xs sm:text-sm font-bold text-stone-900 block">
              {hotel.isPersonalized ? 'Tamu Terverifikasi' : 'Sir Alistair & Lady Evelyn Vance'}
            </strong>
            <span className="text-[11px] sm:text-xs text-stone-500">
              {hotel.isPersonalized
                ? `Ulasan Bintang ${hotel.rating} di Google Maps • Menginap di ${hotel.city}`
                : 'London, United Kingdom • Stayed 7 Nights at Ocean Clifftop Villa'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

