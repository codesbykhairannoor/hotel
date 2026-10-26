'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Award, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#14161A] border-t border-white/10 pt-16 sm:pt-20 pb-24 sm:pb-12 text-stone-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12 sm:mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#E5C778] block mb-3">
              AYANA ESTATE
            </span>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
              The pinnacle of luxury oceanfront sanctuaries in Indonesia. Spanning 90 hectares along Jimbaran’s limestone sunset cliffs, integrating 5 distinct properties, 26 dining landmarks, and private Kubu beach.
            </p>
            <div className="space-y-2 text-xs text-stone-300 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E5C778] flex-shrink-0" />
                <span>Jalan Karang Mas Sejahtera, Jimbaran, Bali 80364, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5C778] flex-shrink-0" />
                <span>+62 361 702222 / VIP Desk: +62 811-388-555</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5C778] flex-shrink-0" />
                <span>reservation@ayana.com</span>
              </div>
            </div>
          </div>

          {/* Properties Col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#properties" className="hover:text-[#E5C778] transition-colors">The Villas at AYANA</a></li>
              <li><a href="#properties" className="hover:text-[#E5C778] transition-colors">AYANA Segara Bali</a></li>
              <li><a href="#properties" className="hover:text-[#E5C778] transition-colors">AYANA Resort Bali</a></li>
              <li><a href="#properties" className="hover:text-[#E5C778] transition-colors">RIMBA by AYANA</a></li>
              <li><a href="#properties" className="hover:text-[#E5C778] transition-colors">AYANA Komodo Resort</a></li>
              <li><a href="#properties" className="hover:text-[#E5C778] transition-colors">AYANA Midplaza Jakarta</a></li>
            </ul>
          </div>

          {/* Signature Destinations */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Landmarks & Dining
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#dining" className="hover:text-[#E5C778] transition-colors">Rock Bar, BALI (CNN Top 10)</a></li>
              <li><a href="#wellness" className="hover:text-[#E5C778] transition-colors">Aquatonic Seawater Pool</a></li>
              <li><a href="#dining" className="hover:text-[#E5C778] transition-colors">Kisik Beach Seafood Lounge</a></li>
              <li><a href="#experiences" className="hover:text-[#E5C778] transition-colors">Private Kubu Beach & Inclinator</a></li>
              <li><a href="#experiences" className="hover:text-[#E5C778] transition-colors">AYANA Lako di'a 54m Phinisi</a></li>
              <li><a href="#experiences" className="hover:text-[#E5C778] transition-colors">Tresna Glass Wedding Chapel</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
              Direct Invitation
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Receive private invitation-only clifftop offers, complimentary room upgrades, and seasonal culinary previews.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 p-3 rounded text-xs text-[#E5C778]">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Thank you. You have been added to our VIP guest register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="bg-white/5 border border-white/15 rounded px-3 py-2 text-xs text-white outline-none flex-1 focus:border-[#E5C778]"
                />
                <button
                  type="submit"
                  className="gold-gradient-bg text-black font-bold text-xs px-4 py-2 rounded"
                >
                  JOIN
                </button>
              </form>
            )}

            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-[#D4AF37]/25">
              <Award className="w-4 h-4 text-[#E5C778]" />
              <span className="text-[11px] text-stone-300">
                Official Direct Reservation Portal • Verified Safe
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; 2026 AYANA Estate. All Rights Reserved. Luxury Sanctuary Experience.
          </div>
          <div className="flex gap-4 sm:gap-6">
            <a href="#hero" className="hover:text-[#E5C778] transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-[#E5C778] transition-colors">Best Rate Guarantee</a>
            <a href="#hero" className="hover:text-[#E5C778] transition-colors">Terms of Stay</a>
            <a href="#hero" className="hover:text-[#E5C778] transition-colors">Resort Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
