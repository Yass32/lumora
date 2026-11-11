import type { Metadata } from 'next'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '../../globals.css'

export const metadata: Metadata = {
  title: { default: 'Lumora content studio', template: '%s · Lumora content studio' },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f6f3ea]">{children}</body>
    </html>
  )
}
