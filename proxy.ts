import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, locales } from '@/lib/i18n'

/** Send visitors from "/" to their language: /en, /sn, /tr or /fr. */
export function proxy(request: NextRequest) {
  const header = request.headers.get('accept-language') ?? ''
  const preferred = header
    .split(',')
    .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase())
    .find((code) => isLocale(code))

  const locale = preferred && (locales as readonly string[]).includes(preferred) ? preferred : defaultLocale
  return NextResponse.redirect(new URL(`/${locale}`, request.url))
}

export const config = { matcher: '/' }
