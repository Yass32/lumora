import type { Localized } from '@/lib/i18n'

/** An uploaded image. `focus` decides which part stays visible when the image is cropped. */
export type ImageRef = {
  assetId: string
  url: string
  alt?: string
  focus?: 'top' | 'center' | 'bottom'
}

export const focusPosition: Record<NonNullable<ImageRef['focus']>, string> = {
  top: '50% 20%',
  center: '50% 50%',
  bottom: '50% 80%',
}

type Doc<T extends string> = { _id: string; _type: T }

export type SettingsDoc = Doc<'siteSettings'> & {
  heroImage?: ImageRef | null
  whatsappZimbabwe?: string
  phoneTurkiye?: string
  email?: string
  address?: string
  instagram?: string
  tiktok?: string
}

export type HomepageDoc = Doc<'homepage'> & { sections: { key: string; visible: boolean }[] }

export type WhyTurkiyeDoc = Doc<'whyTurkiye'> & {
  eyebrow: Localized
  heading: Localized
  body: Localized
  points: { title: Localized; text: Localized }[]
}

export type AboutDoc = Doc<'about'> & { eyebrow: Localized; heading: Localized; paragraphs: Localized[] }

export type ServiceDoc = Doc<'service'> & { stage: 1 | 2 | 3; title: Localized; description: Localized; order: number }

export type TeamMemberDoc = Doc<'teamMember'> & {
  name: string
  role: Localized
  office: 'Zimbabwe' | 'Türkiye'
  photo?: ImageRef | null
  order: number
}

export type StoryDoc = Doc<'story'> & {
  studentName: string
  programme?: string
  university?: string
  city?: string
  quote: Localized
  photo?: ImageRef | null
  order: number
}

export type DestinationDoc = Doc<'destination'> & {
  /** Two-letter country code shown on the card, e.g. "TR" */
  code: string
  name: Localized
  summary: Localized
  photo?: ImageRef | null
  order: number
}

export type PartnerDoc = Doc<'partner'> & { name: string; website?: string; logo?: ImageRef | null; order: number }

export const enquiryStatuses = ['new', 'contacted', 'applying', 'enrolled', 'closed'] as const
export type EnquiryStatus = (typeof enquiryStatuses)[number]

export type EnquiryDoc = Doc<'enquiry'> & {
  name: string
  phone: string
  email?: string
  level?: string
  programme?: string
  intake?: string
  destination?: string
  message?: string
  language: string
  status: EnquiryStatus
  notes?: string
  submittedAt: string
}

export type StaffDoc = Doc<'staffUser'> & {
  name: string
  email: string
  role: 'admin' | 'editor'
  passwordHash: string
  createdAt: string
}

export type AnyDoc =
  | SettingsDoc
  | HomepageDoc
  | WhyTurkiyeDoc
  | AboutDoc
  | ServiceDoc
  | TeamMemberDoc
  | StoryDoc
  | PartnerDoc
  | DestinationDoc
  | EnquiryDoc
  | StaffDoc

export type DocType = AnyDoc['_type']
export type DocOf<T extends DocType> = Extract<AnyDoc, { _type: T }>
