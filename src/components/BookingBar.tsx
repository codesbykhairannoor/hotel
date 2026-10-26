'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Hotel, ArrowRight, ChevronDown } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';

interface BookingBarProps {
  onCheckAvailability: (bookingParams: {
    property: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  }) => void;
  defaultProperty?: string;
}

export const BookingBar: React.FC<BookingBarProps> = ({
  onCheckAvailability,
  defaultProperty,
}) => {
  const { hotel } = useHotel();
  const initialProperty = defaultProperty || (hotel.isPersonalized ? hotel.name : 'The Villas at AYANA Resort');
  const [property, setProperty] = useState(initialProperty);
  const [checkIn, setCheckIn] = useState('2026-11-05');
  const [checkOut, setCheckOut] = useState('2026-11-08');
  const [minDate, setMinDate] = useState('2026-10-26');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  useEffect(() => {
    if (defaultProperty) {
      setProperty(defaultProperty);
    } else if (hotel.isPersonalized) {
      setProperty(hotel.name);
    }
  }, [defaultProperty, hotel]);

  useEffect(() => {
    const today = new Date();
    const defaultIn = new Date(today);
    defaultIn.setDate(today.getDate() + 7);
    const defaultOut = new Date(today);
    defaultOut.setDate(today.getDate() + 10);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];
    setMinDate(formatDate(today));
    setCheckIn(formatDate(defaultIn));
    setCheckOut(formatDate(defaultOut));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      property,
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      rooms,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-30">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl shadow-stone-900/15 border border-[#E2DBD0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-center text-stone-900"
      >
        {/* 1. Property Selector */}
        <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-stone-200 pb-3 sm:pb-0 sm:pr-3">
          <label className="text-[11px] font-bold text-[#855F16] uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Hotel className="w-3.5 h-3.5 text-[#A37A24]" />
            Sanctuary Property
          </label>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className="bg-transparent text-stone-900 text-sm font-semibold outline-none cursor-pointer truncate py-1"
          >
            {hotel.isPersonalized ? (
              <>
                <option value={hotel.name}>{hotel.name} (Main Property)</option>
                <option value="Royal Suites">{hotel.name} — Royal Suites</option>
                <option value="Executive Wing">{hotel.name} — Executive Wing</option>
                <option value="Garden Sanctuary">{hotel.name} — Garden Sanctuary</option>
                <option value="VIP Pavilion">{hotel.name} — VIP Pavilion</option>
              </>
            ) : (
              <>
                <option value="The Villas at AYANA Resort">The Villas at AYANA (Cliff Edge)</option>
                <option value="AYANA Segara Bali">AYANA Segara (Ocean Panoramas)</option>
                <option value="AYANA Resort Bali">AYANA Resort (Classic Oceanfront)</option>
                <option value="RIMBA by AYANA Bali">RIMBA by AYANA (Forest Canopy)</option>
                <option value="AYANA Komodo Waecicu Beach">AYANA Komodo &amp; Luxury Phinisi</option>
              </>
            )}
          </select>
        </div>

        {/* 2. Check In Date */}
        <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-stone-200 pb-3 sm:pb-0 sm:pr-3">
          <label className="text-[11px] font-bold text-[#855F16] uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#A37A24]" />
            Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={minDate}
            className="bg-transparent text-stone-900 text-sm font-semibold outline-none cursor-pointer py-1"
            required
          />
        </div>

        {/* 3. Check Out Date */}
        <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-stone-200 pb-3 sm:pb-0 sm:pr-3">
          <label className="text-[11px] font-bold text-[#855F16] uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#A37A24]" />
            Check-Out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
            className="bg-transparent text-stone-900 text-sm font-semibold outline-none cursor-pointer py-1"
            required
          />
        </div>

        {/* 4. Guests & Rooms Drodown */}
        <div className="relative flex flex-col border-b sm:border-b-0 sm:border-r border-stone-200 pb-3 sm:pb-0 sm:pr-3">
          <label className="text-[11px] font-bold text-[#855F16] uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-[#A37A24]" />
            Guests & Rooms
          </label>
          <div
            onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            className="flex items-center justify-between cursor-pointer text-stone-900 text-sm font-semibold py-1 select-none"
          >
            <span className="truncate">
              {adults} {adults === 1 ? 'Adult' : 'Adults'}, {childrenCount} Ch ({rooms} {rooms === 1 ? 'Rm' : 'Rms'})
            </span>
            <ChevronDown className="w-4 h-4 text-stone-500 ml-1 flex-shrink-0" />
          </div>

          {/* Stepper Card */}
          {showGuestDropdown && (
            <div className="absolute bottom-full mb-3 left-0 w-72 bg-white border border-[#DCD5C8] rounded-xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <div>
                  <div className="text-sm font-bold text-stone-900">Adults</div>
                  <div className="text-xs text-stone-500">Age 12+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-800 font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-stone-900 w-4 text-center">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.min(8, adults + 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-800 font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <div>
                  <div className="text-sm font-bold text-stone-900">Children</div>
                  <div className="text-xs text-stone-500">Age 0 - 11</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-800 font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-stone-900 w-4 text-center">{childrenCount}</span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-800 font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-bold text-stone-900">Rooms</div>
                  <div className="text-xs text-stone-500">Villas / Suites</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-800 font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-stone-900 w-4 text-center">{rooms}</span>
                  <button
                    type="button"
                    onClick={() => setRooms(Math.min(4, rooms + 1))}
                    className="w-7 h-7 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-800 font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGuestDropdown(false)}
                className="w-full mt-3 gold-gradient-bg text-black font-bold text-xs py-2 rounded tracking-wider shadow-sm"
              >
                APPLY SELECTION
              </button>
            </div>
          )}
        </div>

        {/* 5. Submit Search */}
        <div className="w-full">
          <button
            type="submit"
            className="w-full h-11 sm:h-12 gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-[0.14em] px-4 rounded-lg flex items-center justify-center gap-2 shadow-md shadow-[#A37A24]/20 transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span>CHECK RATES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
