import { defineField, defineType } from 'sanity'

const orderField = defineField({
  name: 'order',
  title: 'Order',
  description: 'Lower numbers show first.',
  type: 'number',
  initialValue: 10,
})

const orderings = [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' as const }] }]

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  orderings,
  fields: [
    defineField({
      name: 'stage',
      title: 'Stage',
      type: 'number',
      options: {
        list: [
          { value: 1, title: '1 · Before you leave' },
          { value: 2, title: '2 · When you arrive' },
          { value: 3, title: '3 · Settling in & beyond' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', title: 'Service name', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Short description', type: 'localeText' }),
    orderField,
  ],
  preview: {
    select: { title: 'title.en', stage: 'stage', order: 'order' },
    prepare: ({ title, stage, order }) => ({ title, subtitle: `Stage ${stage ?? '?'} · order ${order ?? '-'}` }),
  },
})

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  orderings,
  fields: [
    defineField({ name: 'name', title: 'Full name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'localeString' }),
    defineField({
      name: 'office',
      title: 'Based in',
      type: 'string',
      options: { list: ['Zimbabwe', 'Türkiye'], layout: 'radio' },
      initialValue: 'Zimbabwe',
    }),
    defineField({ name: 'photo', title: 'Photo', description: 'A square photo works best.', type: 'image', options: { hotspot: true } }),
    orderField,
  ],
  preview: { select: { title: 'name', subtitle: 'role.en', media: 'photo' } },
})

export const story = defineType({
  name: 'story',
  title: 'Student story',
  type: 'document',
  orderings,
  fields: [
    defineField({ name: 'studentName', title: 'Student name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'programme', title: 'Programme', type: 'string' }),
    defineField({ name: 'university', title: 'University', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'quote', title: 'Quote', description: "The student's own words. Ask their permission first.", type: 'localeText' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    orderField,
  ],
  preview: { select: { title: 'studentName', subtitle: 'university', media: 'photo' } },
})

export const partner = defineType({
  name: 'partner',
  title: 'Partner university',
  type: 'document',
  orderings,
  fields: [
    defineField({ name: 'name', title: 'University name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Logo', description: 'PNG or SVG, ideally on a transparent background.', type: 'image' }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    orderField,
  ],
  preview: { select: { title: 'name', media: 'logo' } },
})

export const enquiryStatuses = [
  { value: 'new', title: 'New' },
  { value: 'contacted', title: 'Contacted' },
  { value: 'applying', title: 'Applying' },
  { value: 'enrolled', title: 'Enrolled' },
  { value: 'closed', title: 'Not proceeding' },
]

export const enquiry = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  orderings: [{ title: 'Newest first', name: 'newest', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  fields: [
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: enquiryStatuses, layout: 'radio', direction: 'horizontal' }, initialValue: 'new' }),
    defineField({ name: 'notes', title: 'Internal notes', description: 'Only staff can see this.', type: 'text', rows: 3 }),
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'WhatsApp number', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'level', title: 'Level of study', type: 'string', readOnly: true }),
    defineField({ name: 'programme', title: 'Programme of interest', type: 'string', readOnly: true }),
    defineField({ name: 'intake', title: 'Preferred intake', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', readOnly: true }),
    defineField({ name: 'language', title: 'Website language', type: 'string', readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Received', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: { name: 'name', status: 'status', programme: 'programme', submittedAt: 'submittedAt' },
    prepare: ({ name, status, programme, submittedAt }) => {
      const label = enquiryStatuses.find((s) => s.value === status)?.title ?? 'New'
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('en-GB') : ''
      return { title: name || 'Unnamed', subtitle: [label, programme, date].filter(Boolean).join(' · ') }
    },
  },
})
