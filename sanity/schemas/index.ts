import { localeString, localeText } from './locale'
import { about, homepage, siteSettings, whyTurkiye } from './singletons'
import { enquiry, partner, service, story, teamMember } from './collections'

export const schemaTypes = [
  localeString,
  localeText,
  siteSettings,
  homepage,
  whyTurkiye,
  about,
  service,
  teamMember,
  story,
  partner,
  enquiry,
]

/** Documents that exist exactly once (fixed IDs). */
export const singletonTypes = new Set(['siteSettings', 'homepage', 'whyTurkiye', 'about'])
