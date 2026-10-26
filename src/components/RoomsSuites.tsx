'use client';

import React, { useState } from 'react';
import { ROOMS_DATA, formatCurrency, Room } from '@/data/hotelData';
import { Maximize2, Bed, Users, Check, Eye } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { personalizeText } from '@/utils/sanitizeHotelText';

interface RoomsSuitesProps {
  currentCurrency: string;
  onSelectRoomForBooking: (room: Room) => void;
  onOpenRoomDetails: (room: Room) => void;
  selectedCategory?: string;
}

export const RoomsSuites: React.FC<RoomsSuitesProps> = ({
  currentCurrency,
  onSelectRoomForBooking,
  onOpenRoomDetails,
}) => {
  const { hotel } = useHotel();
  const [filter, setFilter] = useState<'all' | 'villa' | 'suite' | 'forest'>('all');

  const rawFilteredRooms = filter === 'all' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter((r) => r.category === filter);

  const filteredRooms: Room[] = rawFilteredRooms.map((room) => ({
    ...room,
    name: personalizeText(room.name, hotel.name, hotel.city, hotel.isPersonalized),
    property: personalizeText(room.property, hotel.name, hotel.city, hotel.isPersonalized),
    description: personalizeText(room.description, hotel.name, hotel.city, hotel.isPersonalized),
    tag: personalizeText(room.tag, hotel.name, hotel.city, hotel.isPersonalized),
    perk: personalizeText(room.perk, hotel.name, hotel.city, hotel.isPersonalized),
    amenities: room.amenities.map((a) =>
      personalizeText(a, hotel.name, hotel.city, hotel.isPersonalized)
    ),
  }));


  return (
    <section id="rooms" className="py-20 sm:py-24 bg-[#F5F1E8] border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#855F16] uppercase block mb-3">
              ACCOMMODATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-normal">
              Villas & Oceanfront Sanctuaries
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === 'all'
                  ? 'gold-gradient-bg text-black shadow-xs'
                  : 'bg-white text-stone-700 border border-[#DCD5C8] hover:border-[#A37A24]'
              }`}
            >
              All Sanctuaries
            </button>
            <button
              onClick={() => setFilter('villa')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === 'villa'
                  ? 'gold-gradient-bg text-black shadow-xs'
                  : 'bg-white text-stone-700 border border-[#DCD5C8] hover:border-[#A37A24]'
              }`}
            >
              Cliff Villas
            </button>
            <button
              onClick={() => setFilter('suite')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === 'suite'
                  ? 'gold-gradient-bg text-black shadow-xs'
                  : 'bg-white text-stone-700 border border-[#DCD5C8] hover:border-[#A37A24]'
              }`}
            >
              Ocean Suites
            </button>
            <button
              onClick={() => setFilter('forest')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                filter === 'forest'
                  ? 'gold-gradient-bg text-black shadow-xs'
                  : 'bg-white text-stone-700 border border-[#DCD5C8] hover:border-[#A37A24]'
              }`}
            >
              Forest Canopy
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden flex flex-col border border-[#E2DBD0] hover:border-[#A37A24]/60 transition-all duration-500 group shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image & Gallery trigger */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-[#DCD5C8] text-[#855F16] text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded tracking-wider uppercase shadow-xs">
                  {room.tag}
                </span>
                <button
                  onClick={() => onOpenRoomDetails(room)}
                  className="absolute bottom-4 right-4 bg-black/75 hover:bg-[#A37A24] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Photos</span>
                </button>
              </div>

              {/* Room Content */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                {/* Meta Pills */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#A37A24]" />
                    {room.area}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-[#A37A24]" />
                    {room.bed}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#A37A24]" />
                    {room.guests}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mb-2 sm:mb-3 group-hover:text-[#855F16] transition-colors">
                  {room.name}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5 line-clamp-2">
                  {room.description}
                </p>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                  {room.amenities.slice(0, 4).map((a, i) => (
                    <span
                      key={i}
                      className="bg-[#FAF8F5] border border-[#E8E2D5] px-2.5 py-1 rounded text-[11px] sm:text-xs text-stone-700 font-medium"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* Pricing & Footer Actions */}
                <div className="mt-auto pt-4 border-t border-[#EFEAE0] flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">
                      Direct Rate From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#855F16]">
                        {formatCurrency(room.priceUSD, currentCurrency)}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/ night</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" />
                      {room.perk}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenRoomDetails(room)}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 rounded border border-[#DCD5C8] text-xs font-bold text-stone-800 hover:border-[#A37A24] hover:text-[#855F16] transition-colors bg-white"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onSelectRoomForBooking(room)}
                      className="gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded shadow-xs transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
