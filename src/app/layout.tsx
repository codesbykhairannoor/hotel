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
  title: "AYANA Estate | Luxury Oceanfront Sanctuary & Cliffside Villas - Bali & Beyond",
  description:
    "Discover AYANA Estate: Bali's iconic 90-hectare clifftop luxury sanctuary. Featuring The Ocean Villas, Rock Bar, Thalassotherapy Seawater Pool, and private Kubu Beach. Book direct for guaranteed best rates and exclusive VIP privileges.",
  keywords: [
    "AYANA Bali",
    "Luxury Resort Bali",
    "Rock Bar Bali",
    "Oceanfront Villas Jimbaran",
    "Aquatonic Seawater Spa",
    "Bali Luxury Hotel",
    "Direct Booking Hotel",
  ],
  openGraph: {
    title: "AYANA Estate | World-Class Luxury Sanctuary in Bali & Beyond",
    description:
      "Sacred ocean cliffs, 26 dining destinations, the world-famous Rock Bar, and private cliffside plunge pool villas.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "AYANA Oceanfront Clifftop Infinity Pool",
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
