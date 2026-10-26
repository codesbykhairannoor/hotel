'use client';

import React, { useState } from 'react';
import { PROPERTIES_DATA } from '@/data/hotelData';
import { Waves, Bell, Umbrella, Sunset, ArrowRight } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { personalizeText } from '@/utils/sanitizeHotelText';

interface EstatePropertiesProps {
  onReserveProperty: (propertyName: string) => void;
  onExploreCategory: (category: string) => void;
}

export const EstateProperties: React.FC<EstatePropertiesProps> = ({
  onReserveProperty,
  onExploreCategory,
}) => {
  const { hotel } = useHotel();
  const [activeTab, setActiveTab] = useState(PROPERTIES_DATA[0].id);
  const rawProperty = PROPERTIES_DATA.find((p) => p.id === activeTab) || PROPERTIES_DATA[0];

  const currentProperty = {
    ...rawProperty,
    name: personalizeText(rawProperty.name, hotel.name, hotel.city, hotel.isPersonalized),
    tagline: personalizeText(rawProperty.tagline, hotel.name, hotel.city, hotel.isPersonalized),
    accent: personalizeText(rawProperty.accent, hotel.name, hotel.city, hotel.isPersonalized),
    badge: personalizeText(rawProperty.badge, hotel.name, hotel.city, hotel.isPersonalized),
    description: personalizeText(rawProperty.description, hotel.name, hotel.city, hotel.isPersonalized),
    specs: rawProperty.specs.map((s) => ({
      ...s,
      title: personalizeText(s.title, hotel.name, hotel.city, hotel.isPersonalized),
      desc: personalizeText(s.desc, hotel.name, hotel.city, hotel.isPersonalized),
    })),
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Waves className="w-5 h-5 text-[#855F16]" />;
      case 'concierge':
        return <Bell className="w-5 h-5 text-[#855F16]" />;
      case 'beach':
        return <Umbrella className="w-5 h-5 text-[#855F16]" />;
      case 'sunset':
      default:
        return <Sunset className="w-5 h-5 text-[#855F16]" />;
    }
  };

  return (
    <section id="properties" className="py-20 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold tracking-[0.3em] text-[#855F16] uppercase block mb-3">
            {hotel.isPersonalized ? `${hotel.name.toUpperCase()} SANCTUARY COLLECTION` : 'THE AYANA WORLD'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-normal mb-4">
            {hotel.isPersonalized
              ? `${hotel.name} — Five Extraordinary Suite Experiences`
              : 'One 90-Hectare Sanctuary, Five Distinct Expressions'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {hotel.isPersonalized
              ? `Guests staying at ${hotel.name} in ${hotel.city} enjoy luxury accommodations, personalized concierge service, priority dining access, and restorative wellness facilities.`
              : 'Guests staying at any property enjoy complimentary tram access to all 14 swimming pools, 26 dining venues, private Kubu Beach, and world-class thalassotherapy seawater facilities.'}
          </p>
        </div>

        {/* Property Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-10">
          {PROPERTIES_DATA.map((prop) => {
            const cleanName = personalizeText(
              prop.name.replace(' Resort', ''),
              hotel.name,
              hotel.city,
              hotel.isPersonalized
            );
            return (
              <button
                key={prop.id}
                onClick={() => setActiveTab(prop.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === prop.id
                    ? 'gold-gradient-bg text-black shadow-md scale-105 font-bold'
                    : 'bg-white text-stone-700 hover:text-stone-900 border border-[#DCD5C8] hover:border-[#A37A24]'
                }`}
              >
                {cleanName}
              </button>
            );
          })}
        </div>

        {/* Dynamic Property Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E2DBD0] shadow-xl">
          {/* Image Column */}
          <div className="relative min-h-[300px] sm:min-h-[440px] overflow-hidden group">
            <img
              src={currentProperty.image}
              alt={currentProperty.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-white/90 backdrop-blur-md border border-[#DCD5C8] px-3.5 py-1.5 rounded text-xs font-bold text-[#855F16] tracking-wider uppercase shadow-xs">
              {currentProperty.badge}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#855F16] uppercase mb-2 block">
              {currentProperty.tagline}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-stone-900 font-normal mb-3 sm:mb-4">
              {currentProperty.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 sm:mb-8">
              {currentProperty.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {currentProperty.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[#FAF8F5] border border-[#EFEAE0]">
                  <div className="w-9 h-9 rounded-lg bg-[#A37A24]/10 flex items-center justify-center flex-shrink-0">
                    {getIcon(spec.icon)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{spec.title}</div>
                    <div className="text-[11px] text-stone-500">{spec.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onReserveProperty(currentProperty.name)}
                className="gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 rounded shadow-sm transition-all duration-300"
              >
                RESERVE THIS PROPERTY
              </button>

              <button
                onClick={() => onExploreCategory(activeTab === 'villas' ? 'villa' : 'all')}
                className="inline-flex items-center gap-2 text-xs font-bold text-stone-800 hover:text-[#A37A24] border border-[#DCD5C8] hover:border-[#A37A24] px-4 sm:px-5 py-2.5 sm:py-3 rounded transition-all duration-300 bg-white"
              >
                <span>View Accommodations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

