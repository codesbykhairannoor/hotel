'use client';

import React from 'react';
import { Crown, Globe, MapPin } from 'lucide-react';
import { CURRENCY_RATES } from '@/data/hotelData';
import { useHotel } from '@/context/HotelContext';

interface TopPrivilegeBarProps {
  currentCurrency: string;
  onCurrencyChange: (curr: string) => void;
  selectedProperty: string;
  onPropertyChange: (prop: string) => void;
}

export const TopPrivilegeBar: React.FC<TopPrivilegeBarProps> = ({
  currentCurrency,
  onCurrencyChange,
  selectedProperty,
  onPropertyChange,
}) => {
  const { hotel } = useHotel();

  return (
    <div className="bg-[#EFEAE0] border-b border-[#E2DBD0] text-xs text-stone-700 py-1.5 px-3 sm:px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Ticker Privilege */}
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap min-w-0">
          <span className="inline-flex items-center gap-1 bg-[#A37A24]/15 text-[#855F16] font-bold text-[10px] sm:text-[11px] px-2 py-0.5 rounded border border-[#A37A24]/30 tracking-wider flex-shrink-0">
            <Crown className="w-3 h-3 text-[#A37A24]" />
            DIRECT PRIVILEGE
          </span>
          <span className="hidden md:inline text-stone-800 text-xs font-medium truncate">
            {hotel.isPersonalized
              ? `Best Rate Guaranteed at ${hotel.name} • Free Gourmet Breakfast & VIP Direct Privileges in ${hotel.city}`
              : 'Book Direct: Best Rate Guaranteed + Daily Buffet Breakfast + $100 Spa & Dining Credit'}
          </span>
          <span className="md:hidden text-stone-800 text-[11px] font-medium truncate">
            {hotel.isPersonalized
              ? `Best Rate Guaranteed • ${hotel.name}`
              : 'Best Rate Guaranteed + Free Breakfast'}
          </span>
        </div>

        {/* Currency & Estate Switchers */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
          {/* Currency Dropdown */}
          <div className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-[#DCD5C8] hover:border-[#A37A24]/60 transition-colors shadow-2xs">
            <Globe className="w-3 h-3 text-[#A37A24]" />
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-transparent text-stone-900 text-xs outline-none cursor-pointer font-bold"
              aria-label="Select Currency"
            >
              {Object.keys(CURRENCY_RATES).map((curr) => (
                <option key={curr} value={curr} className="bg-white text-stone-900">
                  {curr} ({CURRENCY_RATES[curr].symbol.trim()})
                </option>
              ))}
            </select>
          </div>

          {/* Destination Selector */}
          <div className="hidden lg:flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-[#DCD5C8] hover:border-[#A37A24]/60 transition-colors shadow-2xs">
            <MapPin className="w-3 h-3 text-[#A37A24]" />
            <select
              value={selectedProperty}
              onChange={(e) => onPropertyChange(e.target.value)}
              className="bg-transparent text-stone-900 text-xs outline-none cursor-pointer font-medium max-w-[200px] truncate"
              aria-label="Select Property"
            >
              {hotel.isPersonalized ? (
                <>
                  <option value="all">{hotel.name} — All Wings</option>
                  <option value="villas">{hotel.name} — Royal Suites</option>
                  <option value="executive">{hotel.name} — Executive Wing</option>
                  <option value="garden">{hotel.name} — Garden Sanctuary</option>
                  <option value="vip">{hotel.name} — VIP Pavilion</option>
                </>
              ) : (
                <>
                  <option value="all">AYANA Bali Estate (90 Ha)</option>
                  <option value="The Villas at AYANA Resort">The Villas at AYANA (Cliff)</option>
                  <option value="AYANA Segara Bali">AYANA Segara (Ocean Wing)</option>
                  <option value="RIMBA by AYANA Bali">RIMBA by AYANA (Forest)</option>
                  <option value="AYANA Komodo Waecicu Beach">AYANA Komodo &amp; Yacht</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

