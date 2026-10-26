/**
 * Sanitizes and dynamically adapts hotel copy when a personalized lead is active.
 * Replaces hardcoded AYANA and Bali references with the dynamic hotel name and city.
 */
export function personalizeText(
  text: string,
  hotelName: string,
  hotelCity: string,
  isPersonalized: boolean = true
): string {
  if (!text || !isPersonalized) return text;

  return text
    .replace(/AYANA Estate/gi, hotelName)
    .replace(/The Villas at AYANA Resort/gi, `${hotelName} Royal Suites`)
    .replace(/The Villas at AYANA/gi, `${hotelName} Suites`)
    .replace(/AYANA Segara Bali/gi, `${hotelName} Executive Wing`)
    .replace(/AYANA Segara/gi, `${hotelName} Executive`)
    .replace(/AYANA Resort Bali/gi, `${hotelName} Main Wing`)
    .replace(/AYANA Resort/gi, `${hotelName} Main Wing`)
    .replace(/RIMBA by AYANA Bali/gi, `${hotelName} Garden Wing`)
    .replace(/RIMBA by AYANA/gi, `${hotelName} Garden Wing`)
    .replace(/RIMBA/gi, `${hotelName} Garden`)
    .replace(/AYANA Komodo Waecicu Beach/gi, `${hotelName} VIP Pavilion`)
    .replace(/AYANA Komodo Resort & Phinisi/gi, `${hotelName} Luxury Suites`)
    .replace(/AYANA Komodo/gi, `${hotelName} Pavilion`)
    .replace(/AYANA Spa/gi, `${hotelName} Spa & Wellness`)
    .replace(/Ayana Rejuvenation & Thalasso Journey/gi, `${hotelName} Signature Hydro Journey`)
    .replace(/AYANA Lako di['’]a 54m Luxury Phinisi/gi, `VIP Chauffeur & Private Transit`)
    .replace(/AYANA Lako di['’]a/gi, `Private Luxury Transit`)
    .replace(/AYANA/gi, hotelName)
    .replace(/Rock Bar, BALI/gi, 'The Sky Lounge & Sunset Bar')
    .replace(/Rock Bar/gi, 'Sky Lounge & Sunset Bar')
    .replace(/Jimbaran Bay, Bali/gi, hotelCity)
    .replace(/Jimbaran Bay/gi, hotelCity)
    .replace(/Jimbaran[’']s limestone sunset cliffs/gi, `exclusive surroundings in ${hotelCity}`)
    .replace(/Jimbaran[’']s golden sunsets/gi, `${hotelCity} sunset skyline`)
    .replace(/Jimbaran[’']s/gi, `${hotelCity}’s`)
    .replace(/Jimbaran/gi, hotelCity)
    .replace(/Sacred Balinese Deep Ocean Ritual/gi, 'Signature Restorative Aromatherapy Ritual')
    .replace(/Kampoeng Bali Dining/gi, 'Signature Gourmet Evening Dining')
    .replace(/Balinese cultural warmth/gi, 'warm personalized hospitality')
    .replace(/Balinese grace/gi, 'gracious luxury hospitality')
    .replace(/Balinese architecture/gi, 'contemporary luxury architecture')
    .replace(/Modern Balinese aesthetic/gi, 'Modern luxury aesthetic')
    .replace(/Modern Balinese/gi, 'Modern Luxury')
    .replace(/Balinese bale gazebo/gi, 'private sun gazebo')
    .replace(/Balinese Spices/gi, 'Gourmet Spices')
    .replace(/Balinese/gi, 'Artisanal Luxury')
    .replace(/\bBali\b/gi, hotelCity);
}
