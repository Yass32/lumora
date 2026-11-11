import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySession } from '@/lib/auth/session-token'
import { defaultLocale, isLocale } from '@/lib/i18n'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Staff area: send anyone without a valid session to the login page.
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()
    const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value)
    if (!session) return NextResponse.redirect(new URL('/admin/login', request.url))
    return NextResponse.next()
  }

  // "/" → the visitor's language: /en, /sn, /tr or /fr.
  const preferred = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase())
    .find((code) => isLocale(code))
  return NextResponse.redirect(new URL(`/${preferred ?? defaultLocale}`, request.url))
}

export const config = { matcher: ['/', '/admin', '/admin/:path*'] }
