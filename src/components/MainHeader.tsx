'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Sparkles, ChevronRight } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';

interface MainHeaderProps {
  onOpenReserve: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ onOpenReserve }) => {
  const { hotel } = useHotel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hotelWaUrl = `https://wa.me/${hotel.clean_phone}?text=${encodeURIComponent(
    `Hello ${hotel.name} Reservations, I would like to inquire about room availability and direct booking privileges.`
  )}`;

  return (
    <>
      <header
        className={`sticky top-[31px] left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-[#E2DBD0] shadow-sm py-2.5 sm:py-3'
            : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EFEAE0] py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Identity */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0 flex-shrink-0 max-w-[200px] sm:max-w-[260px] lg:max-w-[300px]"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 text-[#A37A24] transition-transform duration-500 group-hover:scale-105 flex-shrink-0">
              <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M50 0L65 30H35L50 0Z" fill="url(#goldGradHeader)" />
                <path d="M20 35L35 65H5L20 35Z" fill="url(#goldGradHeader)" opacity="0.85" />
                <path d="M80 35L95 65H65L80 35Z" fill="url(#goldGradHeader)" opacity="0.85" />
                <defs>
                  <linearGradient id="goldGradHeader" x1="0" y1="0" x2="100" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D9A83E" />
                    <stop offset="0.5" stopColor="#B88E38" />
                    <stop offset="1" stopColor="#7A5914" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg sm:text-xl lg:text-[22px] font-bold tracking-[0.04em] text-stone-900 leading-tight truncate">
                {hotel.name}
              </span>
              <span className="text-[9px] tracking-[0.22em] text-[#855F16] font-bold mt-0.5 truncate uppercase">
                {hotel.city} • INDONESIA
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation (Clean, Spacious, Single-line, No Wrapping) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            <a
              href="#properties"
              className="text-[13px] tracking-[0.06em] font-medium text-stone-700 hover:text-[#A37A24] transition-colors whitespace-nowrap uppercase py-1 relative group"
            >
              Collection
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A37A24] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#rooms"
              className="text-[13px] tracking-[0.06em] font-medium text-stone-700 hover:text-[#A37A24] transition-colors whitespace-nowrap uppercase py-1 relative group"
            >
              Villas &amp; Suites
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A37A24] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#dining"
              className="text-[13px] tracking-[0.06em] font-medium text-stone-700 hover:text-[#A37A24] transition-colors whitespace-nowrap uppercase py-1 relative group"
            >
              Dining &amp; Bar
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A37A24] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#wellness"
              className="text-[13px] tracking-[0.06em] font-medium text-stone-700 hover:text-[#A37A24] transition-colors whitespace-nowrap uppercase py-1 relative group"
            >
              Wellness Spa
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A37A24] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#experiences"
              className="text-[13px] tracking-[0.06em] font-medium text-stone-700 hover:text-[#A37A24] transition-colors whitespace-nowrap uppercase py-1 relative group"
            >
              Experiences
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A37A24] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#offers"
              className="text-[13px] tracking-[0.06em] font-semibold text-[#855F16] hover:text-black transition-colors whitespace-nowrap uppercase flex items-center gap-1 py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A37A24]" />
              Offers
            </a>
          </nav>

          {/* Right: Actions (Sleek VIP Concierge & Reserve CTA) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* VIP Concierge Link */}
            <a
              href={hotelWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 border border-stone-300/80 hover:border-emerald-500 hover:bg-emerald-50/60 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 whitespace-nowrap shadow-2xs"
              title="Chat with Reservations Host"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>VIP Concierge</span>
            </a>

            {/* Primary CTA Button */}
            <button
              onClick={onOpenReserve}
              className="inline-flex items-center gap-2 gold-gradient-bg text-black hover:brightness-105 font-bold text-[11px] sm:text-xs tracking-[0.1em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              <span>RESERVE NOW</span>
            </button>

            {/* Mobile / Tablet Menu Button (Visible below xl) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden inline-flex items-center gap-1.5 text-stone-800 hover:text-[#A37A24] p-2 -mr-1 rounded-lg hover:bg-stone-200/50 active:bg-stone-200 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Drawer Menu */}
      <div
        className={`fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 xl:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-[#FAF8F5] border-l border-[#E2DBD0] p-6 flex flex-col justify-between transition-transform duration-300 shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E3D8]">
              <div className="flex flex-col min-w-0 pr-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-stone-900 truncate">
                  {hotel.name}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#855F16] font-bold uppercase truncate">
                  {hotel.city} • INDONESIA
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-500 hover:text-stone-900 p-2 rounded-lg active:bg-stone-200/60 flex-shrink-0"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 mt-6">
              <a
                href="#properties"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold text-stone-800 hover:text-[#A37A24] py-2.5 px-3 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <span>The Estate Collection</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
              <a
                href="#rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold text-stone-800 hover:text-[#A37A24] py-2.5 px-3 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <span>Villas &amp; Ocean Suites</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
              <a
                href="#dining"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold text-stone-800 hover:text-[#A37A24] py-2.5 px-3 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <span>Dining &amp; Sky Lounge</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
              <a
                href="#wellness"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold text-stone-800 hover:text-[#A37A24] py-2.5 px-3 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <span>Aquatonic Wellness Spa</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
              <a
                href="#experiences"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold text-stone-800 hover:text-[#A37A24] py-2.5 px-3 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <span>Curated Experiences</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
              <a
                href="#offers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold text-[#855F16] py-2.5 px-3 rounded-lg bg-[#A37A24]/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A37A24]" />
                  <span>Direct Booking Privileges</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#855F16]" />
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#E8E3D8]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full gold-gradient-bg text-black font-bold text-sm py-3.5 rounded-full text-center tracking-wider shadow-md hover:brightness-105 active:scale-98 transition-all"
            >
              RESERVE YOUR STAY
            </button>
            <a
              href={hotelWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366] text-[#136C35] hover:text-white border border-[#25D366] font-bold text-sm py-3 rounded-full text-center transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
