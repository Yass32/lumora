export const locales = ['en', 'sn', 'tr', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, { short: string; native: string }> = {
  en: { short: 'EN', native: 'English' },
  sn: { short: 'SN', native: 'ChiShona' },
  tr: { short: 'TR', native: 'Türkçe' },
  fr: { short: 'FR', native: 'Français' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** A CMS field that holds one value per language. */
export type Localized<T = string> = Partial<Record<Locale, T>>

/** Pick the visitor's language, falling back to English, then to a default. */
export function pick<T>(value: Localized<T> | undefined | null, locale: Locale, fallback?: T): T | undefined {
  if (!value) return fallback
  return value[locale] ?? value[defaultLocale] ?? fallback
}
