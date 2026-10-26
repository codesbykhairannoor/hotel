import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxury Sanctuary & Hotel Collection | Official Direct Reservations",
  description:
    "Experience world-class luxury sanctuaries, oceanfront suites, panoramic rooftop dining, and rejuvenating Thalasso spas. Book direct for guaranteed best rates and VIP guest privileges.",
  keywords: [
    "Luxury Resort Collection",
    "Boutique Luxury Hotels",
    "Oceanfront Villas",
    "Private Suites",
    "Sunset Lounge & Dining",
    "Wellness Spa",
    "Direct Booking Privileges",
  ],
  openGraph: {
    title: "Luxury Sanctuary & Hotel Collection | Official Direct Reservations",
    description:
      "Scenic cliffside views, curated fine dining, tranquil infinity pools, and bespoke luxury suites. Guaranteed best rates.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Luxury Oceanfront Sanctuary Resort",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A37A24'><path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'/></svg>" />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#40444E] font-sans antialiased selection:bg-[#C89B3C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
