'use client';

import React, { useState } from 'react';
import { TopPrivilegeBar } from '@/components/TopPrivilegeBar';
import { MainHeader } from '@/components/MainHeader';
import { HeroSection } from '@/components/HeroSection';
import { DirectBenefits } from '@/components/DirectBenefits';
import { EstateProperties } from '@/components/EstateProperties';
import { RoomsSuites } from '@/components/RoomsSuites';
import { DiningRockBar } from '@/components/DiningRockBar';
import { AquatonicWellness } from '@/components/AquatonicWellness';
import { CuratedExperiences } from '@/components/CuratedExperiences';
import { SocialProofAwards } from '@/components/SocialProofAwards';
import { SeasonalOffers } from '@/components/SeasonalOffers';
import { WhatsAppConcierge } from '@/components/WhatsAppConcierge';
import { Footer } from '@/components/Footer';
import { ReservationModal } from '@/components/ReservationModal';
import { RoomDetailModal } from '@/components/RoomDetailModal';
import { DiningModal } from '@/components/DiningModal';
import { Room, SpecialOffer, formatCurrency } from '@/data/hotelData';
import { CheckCircle2, X, Calendar, Sparkles } from 'lucide-react';

export default function Home() {
  const [currency, setCurrency] = useState<string>('USD');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  
  // Modals state
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [bookingInitialParams, setBookingInitialParams] = useState<{
    property?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    roomName?: string;
  }>({});
  
  const [detailRoom, setDetailRoom] = useState<Room | null>(null);
  const [diningVenue, setDiningVenue] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handlers
  const handleCheckAvailability = (params: {
    property: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  }) => {
    setBookingInitialParams({
      property: params.property,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      adults: params.adults,
      children: params.children,
      rooms: params.rooms,
    });
    setIsReserveOpen(true);
  };

  const handleSelectRoomForBooking = (room: Room) => {
    setBookingInitialParams((prev) => ({
      ...prev,
      property: room.property,
      roomName: room.name,
    }));
    setIsReserveOpen(true);
  };

  const handleClaimOffer = (offer: SpecialOffer) => {
    setBookingInitialParams((prev) => ({
      ...prev,
      property: 'The Villas at AYANA Resort',
      roomName: offer.id === 'honeymoon' ? 'One-Bedroom Ocean Front Cliff Villa' : 'RIMBA Canopy Forest Suite',
    }));
    setIsReserveOpen(true);
  };

  const handleReserveProperty = (propertyName: string) => {
    setBookingInitialParams((prev) => ({
      ...prev,
      property: propertyName,
    }));
    setIsReserveOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#40444E] flex flex-col selection:bg-[#C89B3C] selection:text-white pb-14 md:pb-0">
      {/* 1. Top Privilege Bar (Currency & Destination) */}
      <TopPrivilegeBar
        currentCurrency={currency}
        onCurrencyChange={(curr) => {
          setCurrency(curr);
          showToast(`Currency updated to ${curr}`);
        }}
        selectedProperty={selectedProperty}
        onPropertyChange={(prop) => setSelectedProperty(prop)}
      />

      {/* 2. Main Luxury Header */}
      <MainHeader onOpenReserve={() => setIsReserveOpen(true)} />

      {/* 3. Hero Section with Background Slider & Embedded Booking Bar */}
      <HeroSection
        onCheckAvailability={handleCheckAvailability}
        selectedProperty={selectedProperty}
      />

      {/* 4. Direct Booking Advantage Strip */}
      <DirectBenefits />

      {/* 5. 5-in-1 Estate Properties Collection */}
      <EstateProperties
        onReserveProperty={handleReserveProperty}
        onExploreCategory={() => {
          const el = document.getElementById('rooms');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Villas & Suites with Multi-Currency */}
      <RoomsSuites
        currentCurrency={currency}
        onSelectRoomForBooking={handleSelectRoomForBooking}
        onOpenRoomDetails={(room) => setDetailRoom(room)}
      />

      {/* 7. Rock Bar & 26 Dining Venues */}
      <DiningRockBar onReserveTable={(venue) => setDiningVenue(venue)} />

      {/* 8. Aquatonic Seawater Pool & Spa */}
      <AquatonicWellness onBookSpa={() => setIsReserveOpen(true)} />

      {/* 9. Curated Experiences (Kubu Beach, 54m Phinisi Yacht, Wedding Chapels) */}
      <CuratedExperiences />

      {/* 10. Global Awards & Verified Reviews */}
      <SocialProofAwards />

      {/* 11. Seasonal Direct Privilege Offers */}
      <SeasonalOffers onClaimOffer={handleClaimOffer} />

      {/* 12. Instant VIP WhatsApp Concierge */}
      <WhatsAppConcierge />

      {/* 13. Master Luxury Footer */}
      <Footer />

      {/* 14. MOBILE STICKY BOTTOM ACTION BAR (Ultra-Responsive Mobile Hook) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E2DBD0] px-4 py-2.5 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-[#855F16] uppercase block">
            Direct Advantage (Save 10%)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-stone-500">From</span>
            <span className="font-serif text-lg font-bold text-stone-900">
              {formatCurrency(290, currency)}
            </span>
            <span className="text-[10px] text-stone-500">/nt</span>
          </div>
        </div>

        <button
          onClick={() => setIsReserveOpen(true)}
          className="gold-gradient-bg text-black font-bold text-xs tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>CHECK DATES</span>
        </button>
      </div>

      {/* MODAL 1: RESERVATION FLOW (Direct Voucher + WhatsApp) */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        currentCurrency={currency}
        initialParams={bookingInitialParams}
      />

      {/* MODAL 2: ROOM GALLERY & SPECS */}
      <RoomDetailModal
        room={detailRoom}
        onClose={() => setDetailRoom(null)}
        onBookRoom={(room) => {
          setDetailRoom(null);
          handleSelectRoomForBooking(room);
        }}
        currentCurrency={currency}
      />

      {/* MODAL 3: DINING TABLE RESERVATION */}
      {diningVenue && (
        <DiningModal
          venueName={diningVenue}
          isOpen={Boolean(diningVenue)}
          onClose={() => setDiningVenue(null)}
          onSuccess={(msg) => showToast(msg)}
        />
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 bg-white rounded-xl px-4 sm:px-5 py-3 border border-[#A37A24]/40 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-stone-900 font-semibold">{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="text-stone-400 hover:text-stone-700 ml-2 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
