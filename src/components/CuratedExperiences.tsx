import React from 'react';
import { Compass, Ship, Church } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { personalizeText } from '@/utils/sanitizeHotelText';

export const CuratedExperiences: React.FC = () => {
  const { hotel } = useHotel();

  const experiences = [
    {
      icon: Compass,
      title: hotel.isPersonalized ? `Bespoke City & Culture Tours` : 'Private Kubu Beach & Cliff Inclinator',
      tag: hotel.isPersonalized ? 'CURATED ITINERARY' : 'EXCLUSIVE COVE',
      description: hotel.isPersonalized
        ? `Explore curated cultural landmarks, culinary hotspots, and premier shopping destinations in ${hotel.city} with private guided arrangements.`
        : 'Glide down the 35-meter limestone cliffside via an open-air glass inclinator to our secluded white-sand cove, cabanas, and beach club bar.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Ship,
      title: hotel.isPersonalized ? `VIP Chauffeur & Private Transit` : 'AYANA Lako di’a 54m Luxury Phinisi',
      tag: hotel.isPersonalized ? 'CHAUFFEUR SERVICE' : 'EXPEDITION YACHT',
      description: hotel.isPersonalized
        ? `Enjoy seamless airport limousine transfers and premium private chauffeured vehicles reserved exclusively for registered guests of ${hotel.name}.`
        : 'Set sail aboard our handcrafted 54-meter luxury Phinisi yacht across the islands of Komodo National Park, pink sand beaches, and manta sanctuaries.',
      image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80',
    },
    {
      icon: Church,
      title: hotel.isPersonalized ? `Grand Celebrations & Ballrooms` : 'Tresna & SKY Glass Wedding Chapels',
      tag: hotel.isPersonalized ? 'EVENT ENCLAVE' : 'SACRED CELEBRATION',
      description: hotel.isPersonalized
        ? `Host intimate wedding receptions, milestone corporate banquets, and grand galas inside elegantly styled event spaces at ${hotel.name}.`
        : 'Exchange eternal vows suspended 35 meters over the shimmering Indian Ocean inside architectural glass chapels or cantilevered ocean stages.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="experiences" className="py-24 bg-[#0B0E14]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.3em] text-[#E5C778] uppercase block mb-3">
            CURATED DISCOVERY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-4">
            {hotel.isPersonalized ? `Experiences at ${hotel.name}` : 'Beyond Ordinary Luxury'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {hotel.isPersonalized
              ? `From bespoke chauffeur transits to unforgettable dining and celebration venues in ${hotel.city}.`
              : 'From secluded private beaches reached by cliffside inclinators to private Indonesian yacht charters.'}
          </p>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative h-[480px] rounded-2xl overflow-hidden group shadow-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/50 to-transparent flex flex-col justify-end p-8">
                <span className="text-[11px] font-bold text-[#E5C778] tracking-[0.2em] uppercase mb-2">
                  {exp.tag}
                </span>
                <h3 className="font-serif text-2xl text-white font-normal mb-3 group-hover:text-[#F3E5AB] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
