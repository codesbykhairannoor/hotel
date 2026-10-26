export interface Property {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  badge: string;
  description: string;
  image: string;
  specs: {
    icon: string;
    title: string;
    desc: string;
  }[];
}

export interface Room {
  id: string;
  name: string;
  category: 'villa' | 'suite' | 'forest';
  property: string;
  priceUSD: number;
  area: string;
  bed: string;
  guests: string;
  tag: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  perk: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  tag: string;
  cuisine: string;
  description: string;
  image: string;
  hours: string;
  dressCode: string;
  featured?: boolean;
}

export interface WellnessTreatment {
  id: string;
  title: string;
  duration: string;
  description: string;
  benefits: string;
}

export interface SpecialOffer {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  perks: string[];
  savings: string;
}

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: '$', rate: 1, prefix: true },
  IDR: { symbol: 'Rp ', rate: 16200, prefix: true },
  AUD: { symbol: 'A$', rate: 1.54, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: true },
  SGD: { symbol: 'S$', rate: 1.35, prefix: true },
  GBP: { symbol: '£', rate: 0.78, prefix: true },
  JPY: { symbol: '¥', rate: 155, prefix: true },
};

export function formatCurrency(amountUSD: number, currency: string = 'USD'): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountUSD * info.rate;

  if (currency === 'IDR') {
    return `${info.symbol}${Math.round(converted).toLocaleString('id-ID')}`;
  }
  if (currency === 'JPY') {
    return `${info.symbol}${Math.round(converted).toLocaleString('ja-JP')}`;
  }

  return `${info.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'villas',
    name: 'The Villas at AYANA Resort',
    tagline: 'ULTRA-LUXURY PRIVATE RETREAT',
    accent: 'Cliff-edge sanctuary with private plunge pools',
    badge: 'Exclusive Clifftop Enclave',
    description:
      'Perched along the dramatic limestone cliff edge with panoramic vistas of Jimbaran’s golden sunsets. Each freestanding villa features a private infinity plunge pool, lush tropical garden, marble bathroom with deep-soak tub, and dedicated 24-hour butler service.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
    specs: [
      { icon: 'water', title: 'Private Plunge Pool', desc: 'Every individual villa' },
      { icon: 'concierge', title: '24/7 Butler Service', desc: 'Trained to Guild standards' },
      { icon: 'beach', title: 'Kubu Beach Access', desc: 'Private cliff inclinator' },
      { icon: 'sunset', title: 'VIP Sunset Pass', desc: 'Reserved VIP Rock Bar table' },
    ],
  },
  {
    id: 'segara',
    name: 'AYANA Segara Bali',
    tagline: 'CONTEMPORARY INDOOR-OUTDOOR ELEGANCE',
    accent: 'Modern Balinese design with sweeping ocean views',
    badge: 'Newest Architectural Wing',
    description:
      'A seamless convergence of contemporary aesthetics and Balinese cultural warmth. Expansive open-air spaces frame endless vistas of the forest canopy and Indian Ocean, featuring wide curved private balconies with daybeds.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85',
    specs: [
      { icon: 'water', title: 'Rooftop Infinity Pool', desc: 'Panoramic ocean sunset view' },
      { icon: 'concierge', title: 'Curated Dining', desc: 'Scusa Mediterranean & Luna Rooftop' },
      { icon: 'beach', title: 'Full Estate Tram', desc: 'Seamless access to all 14 pools' },
      { icon: 'sunset', title: 'Spa Privileges', desc: 'Direct access to Aquatonic Pool' },
    ],
  },
  {
    id: 'resort',
    name: 'AYANA Resort Bali',
    tagline: 'THE ICONIC OCEANFRONT HAVEN',
    accent: 'Classic grandeur perched 35 meters above the sea',
    badge: 'World-Renowned Flagship',
    description:
      'The crown jewel of Jimbaran Bay. Timeless Balinese architecture, grand oceanfront lawns, cliffside dining pavilions, and the legendary path leading straight to Rock Bar perched directly above crashing ocean tides.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=85',
    specs: [
      { icon: 'water', title: 'Iconic Ocean Beach Pool', desc: 'Carved directly into cliffside' },
      { icon: 'concierge', title: 'Rock Bar Gateway', desc: 'Direct inclinator access' },
      { icon: 'beach', title: 'Private Kubu Cove', desc: 'Secluded white sand beach' },
      { icon: 'sunset', title: 'Forbes 5-Star Award', desc: 'World-class hospitality standards' },
    ],
  },
  {
    id: 'rimba',
    name: 'RIMBA by AYANA Bali',
    tagline: 'LUSH TROPICAL FOREST HIDEAWAY',
    accent: 'Cascading turquoise lagoons surrounded by jungle canopy',
    badge: 'Forest Oasis',
    description:
      'Immerse yourself in lush greenery, multilayered cascading swimming lagoons, and sustainable natural bamboo architecture. Ideal for families and couples seeking tranquility amidst fragrant gardens and forest canopies.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85',
    specs: [
      { icon: 'water', title: '6 Cascading Lagoon Pools', desc: 'With swim-up bar & waterslides' },
      { icon: 'concierge', title: 'UNIQUE Rooftop Bar', desc: '360° forest sunset lounge' },
      { icon: 'beach', title: 'Kampoeng Bali Dining', desc: 'Traditional Kecak fire dance' },
      { icon: 'sunset', title: 'Botanical Gardens', desc: '8 hectares of indigenous flora' },
    ],
  },
  {
    id: 'komodo',
    name: 'AYANA Komodo Waecicu Beach',
    tagline: 'ISLAND SANCTUARY & LUXURY PHINISI',
    accent: 'Private pier, pristine coral reefs, and island expeditions',
    badge: 'Island Expedition',
    description:
      'Labuan Bajo’s premier 5-star resort. Every guest room boasts uninterrupted ocean and sunset views over Kukusan Island. Embark on private expeditions aboard AYANA Lako di’a, our 54-meter luxury handcrafted Phinisi yacht.',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1400&q=85',
    specs: [
      { icon: 'water', title: 'Private 250m Jetty', desc: 'Walk right into marine sanctuary' },
      { icon: 'concierge', title: '54m Phinisi Yacht', desc: 'Komodo Dragon & Manta diving' },
      { icon: 'beach', title: 'White Sand Beachfront', desc: 'Kayaking & paddle boarding' },
      { icon: 'sunset', title: 'KISIK Grill Pier', desc: 'Fresh lobster caught daily' },
    ],
  },
];

export const ROOMS_DATA: Room[] = [
  {
    id: 'villa-ocean-1br',
    name: 'One-Bedroom Ocean Front Cliff Villa',
    category: 'villa',
    property: 'The Villas at AYANA Resort',
    priceUSD: 780,
    area: '298 m² / 3,200 sq ft',
    bed: '1 King Bed',
    guests: 'Up to 3 Guests',
    tag: 'MOST COVETED',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Perched directly on the edge of the limestone cliff with unobstructed 180-degree Indian Ocean sunset panoramas. Includes an expansive sun deck, private infinity plunge pool, Balinese bale gazebo, and marble bathroom with soaking tub.',
    amenities: [
      'Private Plunge Pool',
      '24-Hour Certified Butler',
      'Deep-Soak Marble Bathtub',
      'Espresso & Tea Bar',
      'High-Speed Wi-Fi (100 Mbps)',
      'Complimentary Buggy Service',
    ],
    perk: 'Free Daily Gourmet Breakfast & $100 Resort Credit',
  },
  {
    id: 'villa-cliff-2br',
    name: 'The Ocean Clifftop Two-Bedroom Villa',
    category: 'villa',
    property: 'The Villas at AYANA Resort',
    priceUSD: 1250,
    area: '530 m² / 5,700 sq ft',
    bed: '1 King + 2 Queen Beds',
    guests: 'Up to 6 Guests',
    tag: 'SIGNATURE ESTATE',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'An expansive private clifftop sanctuary featuring two independent master suites, 12-meter private infinity pool suspended above the ocean, alfresco dining pavilion, and manicured private lawn.',
    amenities: [
      '12m Private Infinity Pool',
      'Roundtrip Luxury Airport Limousine',
      'Complimentary In-Villa Bar',
      'Personal Chef Dining (On Request)',
      'Luxury Bulgari Bath Amenities',
    ],
    perk: 'VIP In-Villa Champagne Breakfast & Roundtrip Limousine',
  },
  {
    id: 'segara-ocean-suite',
    name: 'AYANA Segara Ocean View Suite',
    category: 'suite',
    property: 'AYANA Segara Bali',
    priceUSD: 420,
    area: '93 m² / 1,000 sq ft',
    bed: '1 King Bed',
    guests: 'Up to 3 Guests',
    tag: 'NEW MODERN WING',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Modern Balinese aesthetic featuring an expansive curved balcony with daybed overlooking the sparkling sea, bespoke hardwood finishes, walk-in dressing room, and spa-inspired bath with rainfall shower.',
    amenities: [
      'Curved Oceanview Balcony',
      'Daybed & Sunset Lounger',
      '65" 4K Smart OLED TV',
      'Illy Espresso Machine',
      'Walk-In Rain Shower',
    ],
    perk: 'Guaranteed Sunset Front-Row Rock Bar Pass',
  },
  {
    id: 'rimba-canopy-suite',
    name: 'RIMBA Canopy Forest Suite',
    category: 'forest',
    property: 'RIMBA by AYANA Bali',
    priceUSD: 290,
    area: '70 m² / 750 sq ft',
    bed: '1 King Bed',
    guests: 'Up to 3 Guests',
    tag: 'LUSH NATURE',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Nestled in the lush tropical forest canopy with direct views of multi-tiered turquoise cascading pools, bird sanctuary, and botanical gardens. Step down directly to 6 lagoon swimming pools.',
    amenities: [
      'Forest Canopy Balcony',
      'Direct Lagoon Pool Access',
      'Eco-Friendly Wooden Bath Finishes',
      'Daily Sunset Cocktail Voucher',
      'Full Tram Access to All 14 Pools',
    ],
    perk: 'Unlimited Access to 14 Resort Pools & Kubu Beach',
  },
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'rock-bar',
    name: 'Rock Bar, BALI',
    tag: 'WORLD-FAMOUS CLIFFTOP DESTINATION',
    cuisine: 'Signature Artisanal Cocktails & Tapas',
    description:
      'Perched 14 meters above the crashing waves on natural rock formations. Accessible via custom inclinator, this globally celebrated sunset bar offers front-row ocean views and international DJ sets.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    hours: '16:00 - 00:00 Daily',
    dressCode: 'Smart Casual (No singlets/board shorts)',
    featured: true,
  },
  {
    id: 'kisik-lounge',
    name: 'Kisik Seafood Barbecue',
    tag: 'OCEANFRONT SAND DINING',
    cuisine: 'Fresh Ocean Catches & Balinese Spices',
    description:
      'Dine barefoot on the sand with candlelit tables just steps from the lapping waves. Handpick your seafood from an iced ocean display grilled over aromatic coconut husks.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
    hours: '17:30 - 23:00 Daily',
    dressCode: 'Resort Chic',
  },
  {
    id: 'dava-steak',
    name: 'DAVA Steak & Seafood',
    tag: 'FINE DINING GRILL',
    cuisine: 'Prime Grain-Fed Wagyu & Canadian Lobster',
    description:
      'An upscale culinary sanctuary surrounded by water features and ocean vistas. Pairs aged prime cuts with exceptional international wine selections from our sommelier cellar.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
    hours: '18:00 - 23:00 Daily',
    dressCode: 'Elegant Casual',
  },
  {
    id: 'unique-rooftop',
    name: 'UNIQUE Rooftop Bar & Restaurant',
    tag: 'ROOFTOP SUNSET POOL',
    cuisine: 'Mexican Flavors & Frozen Margaritas',
    description:
      'A chic 360-degree clifftop pool and lounge with panoramic forest and ocean views. Features an infinity pool, oversized daybeds, and chilled tropical beats.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    hours: '11:00 - 23:00 Daily',
    dressCode: 'Casual Resort',
  },
];

export const WELLNESS_TREATMENTS: WellnessTreatment[] = [
  {
    id: 'aquatonic',
    title: 'Aquatonic Seawater Hydrotherapy (2 Hours)',
    duration: '120 Minutes',
    description:
      'Step through a therapeutic circuit that accelerates circulation, boosts metabolism, and purges deep toxins using mineral-rich heated Indian Ocean seawater.',
    benefits: 'Improves lymphatic drainage, alleviates muscle tension, and enhances cellular hydration.',
  },
  {
    id: 'balinese-ritual',
    title: 'Sacred Balinese Deep Ocean Ritual',
    duration: '90 Minutes',
    description:
      'An ancient Indonesian royal ritual combining sea-salt clove body polish with therapeutic long-stroke lomi-lomi massage and volcanic warm stone placement.',
    benefits: 'Deep physical rejuvenation, restored energy pathways, and radiant skin texture.',
  },
  {
    id: 'cliff-pavilion',
    title: 'Clifftop Open-Air Lava Pavilion Journey',
    duration: '120 Minutes',
    description:
      'Perched directly over the limestone cliff rocks surrounded by ocean spray, enjoy couple aromatherapy massage while cool evening ocean breezes caress your senses.',
    benefits: 'Unrivaled romantic indulgence and total sensory disconnection from stress.',
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'honeymoon',
    badge: 'SAVE 25%',
    title: 'The Clifftop Honeymoon Romance',
    description:
      'Includes candlelit 5-course dinner at Kisik beach, bottle of vintage French champagne, daily in-villa champagne breakfast, and 90-min couple spa treatment.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    perks: [
      '3 Nights in Clifftop Ocean Villa',
      'Complimentary Luxury Airport Limousine',
      'Guaranteed Late Check-out at 4:00 PM',
      'VIP Front-Row Sunset Table at Rock Bar',
    ],
    savings: 'Value of $450 in complimentary privileges',
  },
  {
    id: 'wellness-retreat',
    badge: 'BEST VALUE',
    title: 'Ayana Rejuvenation & Thalasso Journey',
    description:
      'Curated for mental and physical restoration. Unlimited Aquatonic seawater hydrotherapy sessions, daily sunrise cliff yoga, and detox organic botanical dining.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    perks: [
      'Daily 2-Hour Seawater Therapy Passes',
      '$150 Resort Spa & Dining Credit',
      'Daily Wellness Buffet Breakfast',
      'Personalized Naturopath Consultation',
    ],
    savings: 'Value of $380 in complimentary privileges',
  },
];
