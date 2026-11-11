export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2025-10-01'

/** False until a Sanity project ID is added to the environment. The site then shows its built-in content. */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId)
