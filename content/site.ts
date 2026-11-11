/**
 * Default contact details. Staff can change all of these in the CMS
 * (Site settings) — these values are only used until the CMS is filled in.
 */
export const siteDefaults = {
  name: 'Lumora Global Education',
  tagline: 'Guiding your future, wherever it begins.',
  whatsappZimbabwe: '+263 77 342 7153',
  phoneTurkiye: '+90 534 236 73 46',
  email: 'chiedzamambondiani8@gmail.com',
  address: '693 Chikanga 1, Harare, Zimbabwe',
  instagram: 'https://www.instagram.com/lumora_global_education',
  tiktok: 'https://www.tiktok.com/@lady_ehoooo1',
}

export type SiteSettings = typeof siteDefaults

/** "+263 77 342 7153" → "263773427153" for wa.me links */
export function waNumber(phone: string) {
  return phone.replace(/[^\d]/g, '')
}

export function waLink(phone: string, message?: string) {
  const base = `https://wa.me/${waNumber(phone)}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function telLink(phone: string) {
  return `tel:+${waNumber(phone)}`
}
