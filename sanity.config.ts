'use client'

/**
 * Sanity Studio — the Lumora content studio, served at /admin.
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes, singletonTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'lumora',
  title: 'Lumora content studio',
  basePath: '/admin',
  projectId: projectId || 'missing-project-id',
  dataset,
  apiVersion,
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "Create new" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Singletons can't be duplicated or deleted
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
  plugins: [structureTool({ structure })],
})
