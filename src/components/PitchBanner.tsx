'use client';

import React from 'react';
import { useHotel } from '@/context/HotelContext';
import { Sparkles, Star, MessageSquareCheck, ArrowRight } from 'lucide-react';

export const PitchBanner: React.FC = () => {
  const { hotel } = useHotel();

  if (!hotel.isPersonalized) return null;

  // Pitch claim link to developer / agency WhatsApp
  const agencyWa = '6285718203535'; // Agency WhatsApp number
  const claimMessage = encodeURIComponent(
    `Halo Mas, saya dari manajemen ${hotel.name} di ${hotel.city}.\n\nSaya telah melihat preview website profil eksklusif untuk ${hotel.name} di link:\nhttps://hotel-demo-web-two.vercel.app/p/${hotel.slug}\n\nKami tertarik untuk mengaktifkan & menggunakan website ini secara resmi untuk hotel kami. Bagaimana langkah selanjutnya?`
  );
  const claimUrl = `https://wa.me/${agencyWa}?text=${claimMessage}`;

  return (
    <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white text-xs py-2.5 px-4 border-b border-[#D4AF37]/40 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
        {/* Pitch Announcement */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-black font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3 h-3 fill-black" />
            PREVIEW EKSKLUSIF
          </span>
          <span className="text-stone-200 text-xs font-medium">
            Website ini dirancang khusus untuk{' '}
            <strong className="text-[#F3E5AB] font-bold">{hotel.name}</strong> ({hotel.city})
          </span>
          <span className="hidden md:inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px] text-amber-300">
            <Star className="w-3 h-3 fill-amber-300" />
            {hotel.rating} ({hotel.reviews} ulasan Google)
          </span>
        </div>

        {/* Claim Website Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#e4bf47] text-black font-extrabold text-[11px] tracking-wider px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquareCheck className="w-3.5 h-3.5" />
            <span>KLAIM WEBSITE INI</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
