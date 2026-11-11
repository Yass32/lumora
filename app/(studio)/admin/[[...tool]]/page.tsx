import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { isSanityConfigured } from '@/sanity/env'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 560, margin: '80px auto', padding: 24, lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 28 }}>The content studio isn’t connected yet</h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to the environment variables (see <code>README.md</code>, step 2), then reload this
          page.
        </p>
        <p>
          <a href="/en">← Back to the website</a>
        </p>
      </main>
    )
  }
  return <NextStudio config={config} />
}
