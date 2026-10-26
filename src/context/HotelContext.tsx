'use client';

import React, { createContext, useContext, useMemo } from 'react';
import hotelsDataRaw from '@/data/hotelsLeads.json';

export interface HotelLead {
  slug: string;
  name: string;
  phone: string;
  clean_phone: string;
  wa_link: string;
  city: string;
  province: string;
  rating: number;
  reviews: number;
  address: string;
  isPersonalized?: boolean;
}

const DEFAULT_HOTEL: HotelLead = {
  slug: 'default',
  name: 'AYANA Estate',
  phone: '+62 361 702222',
  clean_phone: '62811388555',
  wa_link: 'https://wa.me/62811388555',
  city: 'Jimbaran Bay, Bali',
  province: 'Bali',
  rating: 4.9,
  reviews: 2450,
  address: 'Jalan Karang Mas Sejahtera, Jimbaran, Bali 80364, Indonesia',
  isPersonalized: false,
};

const hotelsMap = hotelsDataRaw as Record<string, HotelLead>;

interface HotelContextType {
  hotel: HotelLead;
}

const HotelContext = createContext<HotelContextType>({
  hotel: DEFAULT_HOTEL,
});

export const HotelProvider: React.FC<{
  children: React.ReactNode;
  slug?: string;
  queryOverrides?: {
    name?: string;
    city?: string;
    phone?: string;
    rating?: string;
    reviews?: string;
    address?: string;
  };
}> = ({ children, slug, queryOverrides }) => {
  const hotel = useMemo(() => {
    let resolved: HotelLead = DEFAULT_HOTEL;

    // 1. Match by slug
    if (slug && hotelsMap[slug.toLowerCase()]) {
      resolved = {
        ...hotelsMap[slug.toLowerCase()],
        isPersonalized: true,
      };
    }

    // 2. Query overrides (e.g. ?hotel=...&city=...&wa=...)
    if (queryOverrides?.name) {
      const cleanPhone = (queryOverrides.phone || resolved.clean_phone || '')
        .replace(/[^0-9]/g, '');
      const formattedCleanPhone = cleanPhone.startsWith('0')
        ? '62' + cleanPhone.slice(1)
        : cleanPhone.startsWith('62')
        ? cleanPhone
        : cleanPhone ? '62' + cleanPhone : resolved.clean_phone;

      resolved = {
        ...resolved,
        name: queryOverrides.name || resolved.name,
        city: queryOverrides.city || resolved.city,
        phone: queryOverrides.phone || resolved.phone,
        clean_phone: formattedCleanPhone,
        wa_link: formattedCleanPhone ? `https://wa.me/${formattedCleanPhone}` : resolved.wa_link,
        rating: queryOverrides.rating ? parseFloat(queryOverrides.rating) : resolved.rating,
        reviews: queryOverrides.reviews ? parseInt(queryOverrides.reviews, 10) : resolved.reviews,
        address: queryOverrides.address || resolved.address,
        isPersonalized: true,
      };
    }

    return resolved;
  }, [slug, queryOverrides]);

  return (
    <HotelContext.Provider value={{ hotel }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => useContext(HotelContext);
