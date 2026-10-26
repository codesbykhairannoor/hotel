'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Utensils } from 'lucide-react';

interface DiningModalProps {
  venueName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const DiningModal: React.FC<DiningModalProps> = ({
  venueName,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:30');
  const [guests, setGuests] = useState('2 Guests');
  const [seating, setSeating] = useState('Front Row Cliff Edge');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      onSuccess(`Priority table at ${venueName} confirmed for ${guests} on ${date || 'requested date'} at ${time}!`);
      setConfirmed(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-[#E2DBD0] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-[#A37A24] hover:text-white text-stone-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmed ? (
          <div className="text-center py-6 sm:py-8">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 mb-2">Priority Seating Allocated</h3>
            <p className="text-xs text-stone-600">
              Your table at <strong className="text-[#855F16]">{venueName}</strong> has been secured with VIP priority entry.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 sm:mb-6">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#855F16] uppercase block mb-1">
                CULINARY CONCIERGE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                Reserve a Table at {venueName}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Guaranteed priority table allocation for registered AYANA guests.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                  Reservation Date
                </label>
                <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-lg px-3 py-2 text-stone-900 text-xs">
                  <Calendar className="w-4 h-4 text-[#A37A24]" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-stone-900 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                    Seating Time Slot
                  </label>
                  <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-lg px-2.5 py-2 text-stone-900 text-xs">
                    <Clock className="w-4 h-4 text-[#A37A24] flex-shrink-0" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-transparent outline-none flex-1 text-stone-900 text-xs cursor-pointer truncate"
                    >
                      <option value="16:30">16:30 (Golden)</option>
                      <option value="17:30">17:30 (Sunset)</option>
                      <option value="19:00">19:00 (Dinner)</option>
                      <option value="20:30">20:30 (Late)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                    Party Size
                  </label>
                  <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#DCD5C8] rounded-lg px-2.5 py-2 text-stone-900 text-xs">
                    <Users className="w-4 h-4 text-[#A37A24] flex-shrink-0" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="bg-transparent outline-none flex-1 text-stone-900 text-xs cursor-pointer"
                    >
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                      <option value="8+ Guests">8+ VIP</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                  Seating Preference
                </label>
                <select
                  value={seating}
                  onChange={(e) => setSeating(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD5C8] rounded-lg px-3 py-2 text-xs text-stone-900 outline-none cursor-pointer"
                >
                  <option value="Front Row Cliff Edge">Front Row Cliff Edge (Direct Sea View)</option>
                  <option value="Round Bar High Top">Round Bar High Top (Central Vibe)</option>
                  <option value="Sunset Cabana Daybed">Sunset Cabana Daybed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#855F16] uppercase tracking-wider block mb-1">
                  Special Requests / Celebrations
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anniversary, birthday, dietary requirements..."
                  rows={2}
                  className="w-full bg-[#FAF8F5] border border-[#DCD5C8] rounded-lg px-3 py-2 text-xs text-stone-900 outline-none focus:border-[#A37A24]"
                />
              </div>

              <button
                type="submit"
                className="w-full gold-gradient-bg text-black hover:brightness-105 font-bold text-xs tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Utensils className="w-4 h-4" />
                <span>CONFIRM TABLE RESERVATION</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
