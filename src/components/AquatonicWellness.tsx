'use client';

import React, { useState } from 'react';
import { WELLNESS_TREATMENTS } from '@/data/hotelData';
import { ChevronDown, Droplet, Sparkles, Star } from 'lucide-react';

interface AquatonicWellnessProps {
  onBookSpa: () => void;
}

export const AquatonicWellness: React.FC<AquatonicWellnessProps> = ({ onBookSpa }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="wellness" className="py-20 sm:py-24 bg-[#F5F1E8] border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Narrative & Accordion */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-[0.3em] text-[#855F16] uppercase block mb-3">
              HEALING OF THE GODS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-normal mb-4 sm:mb-6">
              The Aquatonic Seawater Pool & AYANA Spa
            </h2>
            <p className="text-xs sm:text-base text-stone-600 leading-relaxed mb-6 sm:mb-8">
              Experience one of the world’s largest seawater hydrotherapy facilities. Sourced directly from the deep Indian Ocean, heated water is pumped through 12 hydromassage stations featuring 60 micro-bubble jets that deliver deep therapeutic rehabilitation, circulation acceleration, and tension relief.
            </p>

            {/* Treatment Accordion */}
            <div className="space-y-3 mb-6 sm:mb-8">
              {WELLNESS_TREATMENTS.map((treatment, idx) => (
                <div
                  key={treatment.id}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden bg-white ${
                    openIndex === idx
                      ? 'border-[#A37A24] shadow-sm'
                      : 'border-[#E2DBD0] hover:border-[#A37A24]/50'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#855F16] flex-shrink-0" />
                      <div>
                        <span className="text-sm sm:text-base font-bold text-stone-900 block">
                          {treatment.title}
                        </span>
                        <span className="text-xs font-semibold text-[#855F16]">{treatment.duration}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 transition-transform duration-300 ${
                        openIndex === idx ? 'rotate-180 text-[#855F16]' : ''
                      }`}
                    />
                  </button>

                  {openIndex === idx && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 space-y-2">
                      <p>{treatment.description}</p>
                      <div className="text-emerald-800 font-bold">
                        <strong>Key Benefits:</strong> {treatment.benefits}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={onBookSpa}
                className="gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider px-6 py-3 rounded shadow-sm transition-all duration-300"
              >
                RESERVE SPA JOURNEY
              </button>
              <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                <Star className="w-4 h-4 text-[#855F16] fill-[#855F16]" />
                <span>Condé Nast Traveler Readers' Choice Best Spa</span>
              </div>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2DBD0] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80"
                alt="Aquatonic Seawater Pool"
                className="w-full h-[360px] sm:h-[480px] object-cover"
              />
            </div>

            {/* Floating info card */}
            <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-[#DCD5C8] shadow-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#A37A24]/10 flex items-center justify-center flex-shrink-0 text-[#855F16]">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-stone-900 block">
                  100% Pure Indian Ocean Water
                </strong>
                <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">
                  Heated to 34°C with 60 hydromassage jet nozzles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
