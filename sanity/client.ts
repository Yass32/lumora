import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import { apiVersion, dataset, isSanityConfigured, projectId } from './env'

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null

/** Server-only client that can create documents (booking-form enquiries, seeding). */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!isSanityConfigured || !token) return null
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null

export type SanityImage = { asset?: { _ref?: string }; alt?: string; hotspot?: { x: number; y: number } } | null | undefined

export function imageUrl(image: SanityImage, width: number, height?: number) {
  if (!builder || !image?.asset?._ref) return null
  let img = builder.image(image).width(width).auto('format').quality(80)
  if (height) img = img.height(height).fit('crop')
  return img.url()
}

/** CSS object-position from the hotspot staff set in the CMS. */
export function hotspotPosition(image: SanityImage, fallback = '50% 50%') {
  const h = image?.hotspot
  return h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : fallback
}
