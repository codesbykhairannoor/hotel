'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MessageCircle, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { ROOMS_DATA, formatCurrency } from '@/data/hotelData';
import { useHotel } from '@/context/HotelContext';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: string;
  initialParams?: {
    property?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    roomName?: string;
  };
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  initialParams,
}) => {
  const { hotel } = useHotel();

  const [property, setProperty] = useState(
    initialParams?.property || (hotel.isPersonalized ? hotel.name : 'The Villas at AYANA Resort')
  );
  const [checkIn, setCheckIn] = useState(initialParams?.checkIn || '2026-11-05');
  const [checkOut, setCheckOut] = useState(initialParams?.checkOut || '2026-11-08');
  const [selectedRoomName, setSelectedRoomName] = useState(
    initialParams?.roomName || ROOMS_DATA[0].name
  );

  // Add-ons
  const [addonTransfer, setAddonTransfer] = useState(false);
  const [addonRockBar, setAddonRockBar] = useState(false);
  const [addonSpa, setAddonSpa] = useState(false);

  // Confirmation view state
  const [confirmedVoucher, setConfirmedVoucher] = useState<{
    code: string;
    guestName: string;
    totalFormatted: string;
  } | null>(null);

  // Guest details
  const [guestName, setGuestName] = useState('Alexander Wright');
  const [guestEmail, setGuestEmail] = useState('alex.wright@luxurytravel.com');
  const [guestPhone, setGuestPhone] = useState('+61 412 345 678');

  useEffect(() => {
    if (initialParams?.property) {
      setProperty(initialParams.property);
    } else if (hotel.isPersonalized) {
      setProperty(hotel.name);
    }
    if (initialParams?.checkIn) setCheckIn(initialParams.checkIn);
    if (initialParams?.checkOut) setCheckOut(initialParams.checkOut);
    if (initialParams?.roomName) setSelectedRoomName(initialParams.roomName);
  }, [initialParams, hotel]);

  if (!isOpen) return null;

  // Calculate nights
  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 3;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const selectedRoom = ROOMS_DATA.find((r) => r.name === selectedRoomName) || ROOMS_DATA[0];

  // Pricing calculations
  const roomBaseUSD = selectedRoom.priceUSD * nights;
  let addonsUSD = 0;
  if (addonTransfer) addonsUSD += 95;
  if (addonRockBar) addonsUSD += 120;
  if (addonSpa) addonsUSD += 160;

  const subtotalUSD = roomBaseUSD + addonsUSD;
  const directDiscountUSD = roomBaseUSD * 0.1; // 10% direct booking benefit
  const taxableUSD = subtotalUSD - directDiscountUSD;
  const taxUSD = taxableUSD * 0.21;
  const grandTotalUSD = taxableUSD + taxUSD;

  // Execute Direct Booking simulation
  const handleConfirmDirect = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `HTL-${hotel.slug?.slice(0, 4).toUpperCase() || 'RES'}-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedVoucher({
      code,
      guestName,
      totalFormatted: formatCurrency(grandTotalUSD, currentCurrency),
    });
  };

  // Execute WhatsApp VIP Concierge
  const handleWhatsAppBooking = () => {
    const text = `*RESERVASI VIP — ${hotel.name.toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━
• *Properti*: ${property} (${hotel.city})
• *Tipe Kamar*: ${selectedRoom.name}
• *Periode Menginap*: ${checkIn} s/d ${checkOut} (${nights} Malam)
• *Jumlah Tamu*: ${initialParams?.adults || 2} Dewasa, ${initialParams?.children || 0} Anak
• *Tambahan Layanan*: ${addonTransfer ? 'Antar Jemput VIP, ' : ''}${addonRockBar ? 'Lounge Sunset Table, ' : ''}${addonSpa ? 'Hydrotherapy Spa, ' : ''}${!addonTransfer && !addonRockBar && !addonSpa ? 'Standard Package' : ''}
• *Estimasi Total*: ${formatCurrency(grandTotalUSD, currentCurrency)} (Termasuk Diskon Langsung 10% & Pajak)
• *Nama Tamu*: ${guestName} (${guestPhone})
━━━━━━━━━━━━━━━━━━━━
Halo Admin ${hotel.name}, mohon konfirmasi ketersediaan kamar untuk tanggal tersebut dan kirimkan panduan reservasi resminya. Terima kasih!`;

    const encoded = encodeURIComponent(text);
    const waNumber = hotel.clean_phone || '62811388555';
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
  };


  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#E2DBD0] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-700 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {confirmedVoucher ? (
          /* CONFIRMATION VOUCHER SUCCESS VIEW */
          <div className="p-6 sm:p-12 text-center overflow-y-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#855F16] uppercase block mb-1.5">
              RESERVATION HOLD SECURED
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-stone-900 font-normal mb-2">
              Your Sanctuary Awaits You, {confirmedVoucher.guestName}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 sm:mb-8">
              We have locked in your direct booking privileges. No immediate charge has been made. A formal confirmation dossier has been sent to your email.
            </p>

            {/* Voucher Box */}
            <div className="max-w-md mx-auto bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E2DBD0] text-left mb-6 sm:mb-8 shadow-sm">
              <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-stone-200 mb-3 sm:mb-4">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
                    BOOKING REFERENCE
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-[#855F16]">
                    {confirmedVoucher.code}
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  GUARANTEED
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-700 mb-4">
                <div className="flex justify-between">
                  <span className="text-stone-500">Property:</span>
                  <span className="font-bold text-stone-900">{property}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Sanctuary:</span>
                  <span className="font-bold text-stone-900">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Duration:</span>
                  <span className="font-bold text-stone-900">{nights} Nights ({checkIn} &rarr; {checkOut})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Direct Total:</span>
                  <span className="font-bold text-[#855F16] text-sm">{confirmedVoucher.totalFormatted}</span>
                </div>
              </div>

              <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                <span>Includes Free Daily Gourmet Buffet Breakfast + $100 Resort Credit</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print Voucher</span>
              </button>
              <button
                onClick={onClose}
                className="gold-gradient-bg text-black font-bold text-xs px-5 sm:px-6 py-2.5 sm:py-3 rounded transition-all"
              >
                Back to {hotel.isPersonalized ? hotel.name : 'AYANA Estate'}
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING CHECKOUT FLOW */
          <div className="overflow-y-auto flex-1">
            <div className="p-5 sm:p-8 border-b border-[#EFEAE0] bg-[#FAF8F5]">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#855F16] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#A37A24]" />
                DIRECT BOOKING PRIVILEGE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                {hotel.isPersonalized ? `Reserve at ${hotel.name}` : 'Reserve Your Clifftop Sanctuary'}
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Best Rate Guaranteed with Daily Gourmet Breakfast, $100 Resort Credit &amp; VIP Priority Privileges
              </p>
            </div>

            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Left Column: Selections */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                {/* Property Dropdown */}
                <div>
                  <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                    Property
                  </label>
                  <select
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                    className="w-full bg-white border border-[#DCD5C8] rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 outline-none focus:border-[#A37A24] cursor-pointer"
                  >
                    {hotel.isPersonalized ? (
                      <>
                        <option value={hotel.name}>{hotel.name} (Main Property)</option>
                        <option value="Royal Suites">{hotel.name} — Royal Suites</option>
                        <option value="Executive Wing">{hotel.name} — Executive Wing</option>
                        <option value="Garden Sanctuary">{hotel.name} — Garden Sanctuary</option>
                        <option value="VIP Pavilion">{hotel.name} — VIP Pavilion</option>
                      </>
                    ) : (
                      <>
                        <option value="The Villas at AYANA Resort">The Villas at AYANA Resort (Cliff Edge)</option>
                        <option value="AYANA Segara Bali">AYANA Segara (Ocean Panoramas)</option>
                        <option value="AYANA Resort Bali">AYANA Resort (Classic Oceanfront)</option>
                        <option value="RIMBA by AYANA Bali">RIMBA by AYANA (Forest Canopy)</option>
                        <option value="AYANA Komodo Waecicu Beach">AYANA Komodo Resort &amp; Phinisi</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white border border-[#DCD5C8] rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 outline-none focus:border-[#A37A24]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white border border-[#DCD5C8] rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 outline-none focus:border-[#A37A24]"
                    />
                  </div>
                </div>

                {/* Room Select */}
                <div>
                  <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                    Selected Sanctuary
                  </label>
                  <select
                    value={selectedRoomName}
                    onChange={(e) => setSelectedRoomName(e.target.value)}
                    className="w-full bg-white border border-[#DCD5C8] rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 outline-none focus:border-[#A37A24] cursor-pointer"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name} — From {formatCurrency(r.priceUSD, currentCurrency)}/nt
                      </option>
                    ))}
                  </select>
                </div>

                {/* Luxury Add-on Experiences */}
                <div className="bg-[#FAF8F5] border border-[#E2DBD0] rounded-xl p-3.5 sm:p-4">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2 sm:mb-3">
                    Enhance Your Stay (Optional Privileges):
                  </span>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-stone-200/50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addonTransfer}
                          onChange={(e) => setAddonTransfer(e.target.checked)}
                          className="accent-[#A37A24] w-4 h-4 rounded"
                        />
                        <span className="text-stone-800 font-medium">Roundtrip VIP Airport Limousine Transfer</span>
                      </div>
                      <span className="font-bold text-[#855F16]">
                        +{formatCurrency(95, currentCurrency)}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-stone-200/50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addonRockBar}
                          onChange={(e) => setAddonRockBar(e.target.checked)}
                          className="accent-[#A37A24] w-4 h-4 rounded"
                        />
                        <span className="text-stone-800 font-medium">Guaranteed Sunset Front-Row Rock Bar Table & Cocktails</span>
                      </div>
                      <span className="font-bold text-[#855F16]">
                        +{formatCurrency(120, currentCurrency)}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-stone-200/50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={addonSpa}
                          onChange={(e) => setAddonSpa(e.target.checked)}
                          className="accent-[#A37A24] w-4 h-4 rounded"
                        />
                        <span className="text-stone-800 font-medium">Couple 2-Hour Aquatonic Seawater Hydrotherapy Pass</span>
                      </div>
                      <span className="font-bold text-[#855F16]">
                        +{formatCurrency(160, currentCurrency)}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Guest Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full bg-white border border-[#DCD5C8] rounded px-2.5 py-1.5 text-xs text-stone-900 outline-none focus:border-[#A37A24]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">Email</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      className="w-full bg-white border border-[#DCD5C8] rounded px-2.5 py-1.5 text-xs text-stone-900 outline-none focus:border-[#A37A24]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-600 block mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full bg-white border border-[#DCD5C8] rounded px-2.5 py-1.5 text-xs text-stone-900 outline-none focus:border-[#A37A24]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Breakdown & Dual Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E2DBD0]">
                <div>
                  <h3 className="font-serif text-xl text-stone-900 pb-3 border-b border-stone-200 mb-3 sm:mb-4">
                    Price Summary ({currentCurrency})
                  </h3>

                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex justify-between">
                      <span>Stay Duration:</span>
                      <strong className="text-stone-900 font-bold">{nights} Nights</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Sanctuary Rate ({nights}x):</span>
                      <strong className="text-stone-900 font-bold">
                        {formatCurrency(roomBaseUSD, currentCurrency)}
                      </strong>
                    </div>
                    {addonsUSD > 0 && (
                      <div className="flex justify-between">
                        <span>Add-on Experiences:</span>
                        <strong className="text-[#855F16] font-bold">
                          +{formatCurrency(addonsUSD, currentCurrency)}
                        </strong>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Direct Privilege (10% Off):</span>
                      <span>-{formatCurrency(directDiscountUSD, currentCurrency)}</span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Service & Govt Tax (21%):</span>
                      <span>+{formatCurrency(taxUSD, currentCurrency)}</span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#DCD5C8] flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-600 tracking-wider uppercase block">
                        ESTIMATED TOTAL
                      </span>
                      <span className="text-[10px] text-stone-500">Direct Guarantee Applied</span>
                    </div>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#855F16]">
                      {formatCurrency(grandTotalUSD, currentCurrency)}
                    </div>
                  </div>
                </div>

                {/* Dual Action Triggers */}
                <div className="pt-5 mt-5 border-t border-stone-200 space-y-2.5">
                  <button
                    onClick={handleConfirmDirect}
                    className="w-full gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>INSTANT DIRECT CONFIRMATION</span>
                  </button>

                  <button
                    onClick={handleWhatsAppBooking}
                    className="w-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#136C35] hover:text-white border border-[#25D366] font-bold text-xs tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 text-[#136C35]" />
                    <span>RESERVE VIA VIP WHATSAPP DESK</span>
                  </button>

                  <p className="text-[10px] text-stone-500 text-center leading-tight">
                    <ShieldCheck className="w-3 h-3 inline mr-1 text-[#855F16]" />
                    No prepayment required to place hold. Free cancellation up to 7 days before arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
