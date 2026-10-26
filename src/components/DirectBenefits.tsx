import React from 'react';
import { ShieldCheck, Utensils, GlassWater, Sparkles } from 'lucide-react';

export const DirectBenefits: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Best Rate Guarantee',
      desc: '10% lower than any OTA (Traveloka/Agoda), with free cancellation and price matching.',
    },
    {
      icon: Utensils,
      title: 'Complimentary Daily Breakfast',
      desc: 'Sumptuous international and Balinese buffet across 4 signature morning restaurants.',
    },
    {
      icon: GlassWater,
      title: 'VIP Rock Bar Priority Pass',
      desc: 'Skip the standard public line with reserved priority cliff seating during golden hour.',
    },
    {
      icon: Sparkles,
      title: '$100 Resort Credit',
      desc: 'Redeemable across 26 restaurants, the Aquatonic Seawater Pool, and private yacht journeys.',
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#FAF8F5] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#E8E2D5] shadow-xs hover:border-[#A37A24]/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-full bg-[#A37A24]/10 flex items-center justify-center flex-shrink-0 text-[#855F16] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1 group-hover:text-[#855F16] transition-colors">
                    {b.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
