import type { ReactNode } from 'react'

export function Eyebrow({ children, center = false, dark = false }: { children: ReactNode; center?: boolean; dark?: boolean }) {
  const line = <span className="block h-0.5 w-9 shrink-0 bg-gold" aria-hidden="true" />
  return (
    <p
      className={`flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-gold' : 'text-gold-ink'} ${center ? 'justify-center' : ''}`}
    >
      {line}
      <span>{children}</span>
      {center && line}
    </p>
  )
}

export function SectionTitle({ children, dark = false, id }: { children: ReactNode; dark?: boolean; id?: string }) {
  return (
    <h2
      id={id}
      className={`font-display text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-[52px] ${dark ? 'text-white' : 'text-forest'}`}
    >
      {children}
    </h2>
  )
}

export const container = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8'

export const buttonPrimary =
  'inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-leaf px-7 text-base font-bold text-white no-underline transition-colors hover:bg-forest'

export const buttonGold =
  'inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-gold px-6 text-base font-bold text-forest no-underline transition-colors hover:bg-[#c3971f]'
