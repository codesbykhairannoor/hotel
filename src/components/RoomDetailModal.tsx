'use client';

import React, { useState } from 'react';
import { X, Maximize2, Bed, Users, Check, ArrowRight } from 'lucide-react';
import { Room, formatCurrency } from '@/data/hotelData';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
  currentCurrency: string;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookRoom,
  currentCurrency,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!room) return null;

  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#E2DBD0] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-[#A37A24] text-white flex items-center justify-center transition-colors z-20"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Gallery Hero Banner */}
        <div className="relative h-60 sm:h-80 md:h-96 w-full overflow-hidden bg-black flex-shrink-0">
          <img
            src={images[activeImgIndex]}
            alt={room.name}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIndex(i)}
                  className={`w-12 h-9 sm:w-14 sm:h-10 rounded overflow-hidden border-2 transition-all ${
                    i === activeImgIndex ? 'border-[#D9A83E] scale-105 shadow-md' : 'border-white/50 opacity-80'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Room Info */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#855F16] uppercase block mb-1">
                {room.property}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal">
                {room.name}
              </h2>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider block font-bold">
                Direct Price
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#855F16]">
                {formatCurrency(room.priceUSD, currentCurrency)}
              </span>
              <span className="text-xs text-stone-500 font-medium"> / night</span>
            </div>
          </div>

          {/* Meta specs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-700 py-3 border-y border-stone-100 mb-5">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Maximize2 className="w-4 h-4 text-[#A37A24]" />
              <strong>Area:</strong> {room.area}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Bed className="w-4 h-4 text-[#A37A24]" />
              <strong>Bedding:</strong> {room.bed}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Users className="w-4 h-4 text-[#A37A24]" />
              <strong>Capacity:</strong> {room.guests}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
            {room.description}
          </p>

          {/* Amenities grid */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
              Sanctuary Amenities & Privileges
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
              {room.amenities.map((am, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-[#FAF8F5] p-2 rounded border border-[#EFEAE0]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Includes Free Gourmet Buffet Breakfast & $100 Resort Credit</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>RESERVE THIS SANCTUARY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
