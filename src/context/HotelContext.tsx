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
      const cleanPhone = (queryOverrides.phone || '')
        .replace(/[^0-9]/g, '');
      const formattedCleanPhone = cleanPhone.startsWith('0')
        ? '62' + cleanPhone.slice(1)
        : cleanPhone.startsWith('62')
        ? cleanPhone
        : cleanPhone ? '62' + cleanPhone : '6281234567890';

      const cityName = queryOverrides.city || 'Indonesia';
      const addressVal = queryOverrides.address || (queryOverrides.city ? `${queryOverrides.city}, Indonesia` : 'Indonesia');

      resolved = {
        slug: queryOverrides.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name: queryOverrides.name,
        city: cityName,
        province: cityName,
        phone: queryOverrides.phone || '+62 812 3456 7890',
        clean_phone: formattedCleanPhone,
        wa_link: `https://wa.me/${formattedCleanPhone}`,
        rating: queryOverrides.rating ? parseFloat(queryOverrides.rating) : 4.8,
        reviews: queryOverrides.reviews ? parseInt(queryOverrides.reviews, 10) : 1250,
        address: addressVal,
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
