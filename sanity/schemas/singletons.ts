import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero image', default: true },
    { name: 'contact', title: 'Contact details' },
    { name: 'social', title: 'Social media' },
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description:
        'The large photo at the top of the homepage. Use a tall photo (at least 1200 px high). The hero text is fixed and already translated.',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          description: 'Describe the photo in a few words. Screen readers read it aloud, and Google uses it.',
          type: 'string',
        }),
      ],
    }),
    defineField({ name: 'whatsappZimbabwe', title: 'WhatsApp number (Zimbabwe)', description: 'All WhatsApp buttons open a chat with this number. Example: +263 77 342 7153', type: 'string', group: 'contact' }),
    defineField({ name: 'phoneTurkiye', title: 'Phone / WhatsApp (Türkiye)', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'address', title: 'Office address', type: 'string', group: 'contact' }),
    defineField({ name: 'instagram', title: 'Instagram link', type: 'url', group: 'social' }),
    defineField({ name: 'tiktok', title: 'TikTok link', type: 'url', group: 'social' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})

const sectionTitles: Record<string, string> = {
  partners: 'Partner universities',
  services: 'Services',
  turkiye: 'Why Türkiye',
  about: 'About us & team',
  stories: 'Student stories',
  contact: 'Booking form',
}

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage layout',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page sections',
      description: 'Drag to change the order. Switch a section off to hide it. The hero is always first.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'key',
              title: 'Section',
              type: 'string',
              options: { list: Object.entries(sectionTitles).map(([value, title]) => ({ value, title })) },
              validation: (r) => r.required(),
            }),
            defineField({ name: 'visible', title: 'Show on website', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: { key: 'key', visible: 'visible' },
            prepare: ({ key, visible }) => ({
              title: sectionTitles[key] || key,
              subtitle: visible === false ? 'Hidden' : 'Visible',
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Homepage layout' }) },
})

export const whyTurkiye = defineType({
  name: 'whyTurkiye',
  title: 'Why Türkiye',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Small heading', type: 'localeString' }),
    defineField({ name: 'heading', title: 'Section title', type: 'localeString' }),
    defineField({ name: 'body', title: 'Paragraph', type: 'localeText' }),
    defineField({
      name: 'points',
      title: 'Reasons',
      type: 'array',
      validation: (r) => r.max(6),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'point',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'localeString' }),
            defineField({ name: 'text', title: 'Text', type: 'localeText' }),
          ],
          preview: { select: { title: 'title.en', subtitle: 'text.en' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Why Türkiye' }) },
})

export const about = defineType({
  name: 'about',
  title: 'About us',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Small heading', type: 'localeString' }),
    defineField({ name: 'heading', title: 'Section title', type: 'localeString' }),
    defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'localeText' })] }),
  ],
  preview: { prepare: () => ({ title: 'About us' }) },
})
