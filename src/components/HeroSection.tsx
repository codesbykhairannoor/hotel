'use client';

import React, { useState, useEffect } from 'react';
import { BookingBar } from './BookingBar';

interface HeroSectionProps {
  onCheckAvailability: (params: {
    property: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  }) => void;
  selectedProperty: string;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckAvailability,
  selectedProperty,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-between pt-16 pb-12 overflow-hidden">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } transition-transform duration-[8000ms] ease-out`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(11,14,20,0.4) 0%, rgba(11,14,20,0.75) 100%), url('${img}')`,
            }}
          />
        ))}
      </div>

      {/* Hero Narrative Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12 sm:mt-20">
        <div className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.35em] text-[#E5C778] mb-6">
          <span className="w-8 h-[1px] bg-[#E5C778]"></span>
          <span>JIMBARAN BAY • BALI • INDONESIA</span>
          <span className="w-8 h-[1px] bg-[#E5C778]"></span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-[1.08] mb-6 text-shadow-lg">
          Where Sacred Ocean Cliffs <br />
          <em className="italic font-light text-[#F3E5AB]">Meet Timeless Serenity</em>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed mb-10 text-shadow">
          Perched 35 meters above the azure waters of the Indian Ocean, AYANA Estate is a 90-hectare clifftop sanctuary where world-renowned Balinese grace harmonizes with untouched nature, 26 dining landmarks, and private cliffside plunge pool villas.
        </p>

        {/* Estate Metric Highlights */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 glass-panel-subtle px-6 py-3 rounded-full">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#E5C778]">90</span>
            <span className="text-[11px] text-slate-300 uppercase tracking-wider text-left leading-tight">
              Hectares of<br />Sanctuary
            </span>
          </div>
          <div className="hidden sm:block w-[1px] h-6 bg-white/20"></div>

          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#E5C778]">14</span>
            <span className="text-[11px] text-slate-300 uppercase tracking-wider text-left leading-tight">
              Ocean & Forest<br />Resort Pools
            </span>
          </div>
          <div className="hidden sm:block w-[1px] h-6 bg-white/20"></div>

          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#E5C778]">26</span>
            <span className="text-[11px] text-slate-300 uppercase tracking-wider text-left leading-tight">
              Dining Venues<br />& Rock Bar
            </span>
          </div>
          <div className="hidden sm:block w-[1px] h-6 bg-white/20"></div>

          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#E5C778]">#1</span>
            <span className="text-[11px] text-slate-300 uppercase tracking-wider text-left leading-tight">
              Resort in Indo<br />(Travel+Leisure)
            </span>
          </div>
        </div>
      </div>

      {/* Floating Booking Bar At Bottom */}
      <div className="mt-14 sm:mt-16">
        <BookingBar
          onCheckAvailability={onCheckAvailability}
          defaultProperty={selectedProperty === 'all' ? 'The Villas at AYANA Resort' : selectedProperty}
        />
      </div>
    </section>
  );
};
