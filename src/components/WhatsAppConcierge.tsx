import React from 'react';
import { MessageCircle, Zap, Globe, Shield } from 'lucide-react';
import { useHotel } from '@/context/HotelContext';

export const WhatsAppConcierge: React.FC = () => {
  const { hotel } = useHotel();

  const waTarget = hotel.clean_phone || '62811388555';
  const waText = encodeURIComponent(
    `Halo ${hotel.name}, saya ingin reservasi kamar dan menanyakan ketersediaan tanggal menginap.`
  );
  const waHref = `https://wa.me/${waTarget}?text=${waText}`;

  return (
    <section id="whatsapp-concierge" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-14 border border-[#E2DBD0] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold tracking-[0.3em] text-[#855F16] uppercase block mb-3">
              24/7 DEDICATED HOST &amp; RESERVATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-normal mb-3 sm:mb-4">
              VIP WhatsApp Concierge — {hotel.name}
            </h2>
            <p className="text-xs sm:text-base text-stone-600 leading-relaxed mb-6 max-w-2xl">
              Prefer personalized assistance or booking direct privileges? Connect directly with our Senior Reservations Host at {hotel.name} ({hotel.city}) for instant confirmation, best rate guarantee, and bespoke hospitality.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#855F16]" />
                <span>Average response in <strong>&lt; 3 minutes</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#855F16]" />
                <span>Indonesian &amp; English Concierge Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#855F16]" />
                <span>Official Direct Booking Channel</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center gap-3.5 sm:gap-4 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold p-4 sm:p-5 rounded-2xl shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div className="w-11 h-11 rounded-xl bg-black/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold tracking-widest uppercase block opacity-85">
                  CHAT RESERVASI LANGSUNG
                </span>
                <span className="text-base sm:text-lg font-bold block leading-tight">
                  {hotel.phone || '+62 811-388-555'}
                </span>
                <span className="text-[11px] font-medium opacity-90 block">
                  Official VIP Desk • Online Now
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

