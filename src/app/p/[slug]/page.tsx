import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { HotelPageClient } from '@/components/HotelPageClient';
import hotelsDataRaw from '@/data/hotelsLeads.json';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(hotelsDataRaw).slice(0, 10).map((slug) => ({
    slug,
  }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hotel = (hotelsDataRaw as Record<string, {
    name: string;
    city: string;
    province: string;
    rating: number;
    reviews: number;
  }>)[slug?.toLowerCase()];

  if (hotel) {
    const title = `${hotel.name} — Luxury Hotel & Official Direct Reservations`;
    const description = `Preview website resmi ${hotel.name} di ${hotel.city}, ${hotel.province}. Dapatkan Best Rate Guarantee, reservasi via WhatsApp, dan ulasan tamu terpercaya ⭐ ${hotel.rating}.`;
    return {
      title,
      description,
      keywords: [
        hotel.name,
        `Hotel ${hotel.city}`,
        `Penginapan ${hotel.city}`,
        `Direct Booking ${hotel.name}`,
        'Official Direct Reservation',
      ],
      openGraph: {
        title,
        description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  }

  return {
    title: 'Luxury Hotel Sanctuary — Official Direct Reservations',
    description: 'Direct reservation portal with best rate guarantee and VIP WhatsApp concierge.',
  };
}

async function SlugPageContent({ params }: PageProps) {
  const { slug } = await params;
  return <HotelPageClient slug={slug} />;
}

export default function DynamicHotelPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-600 font-serif">
          Memuat Sanctuari Hotel...
        </div>
      }
    >
      <SlugPageContent {...props} />
    </Suspense>
  );
}
