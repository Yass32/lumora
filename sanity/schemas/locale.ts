import { defineType } from 'sanity'

const languages = [
  { id: 'en', title: 'English' },
  { id: 'sn', title: 'ChiShona' },
  { id: 'tr', title: 'Türkçe' },
  { id: 'fr', title: 'Français' },
]

const help = 'Fill in English first. Any language left empty shows the English text.'

export const localeString = defineType({
  name: 'localeString',
  title: 'Text in each language',
  type: 'object',
  description: help,
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
  })),
  options: { collapsible: false },
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraph in each language',
  type: 'object',
  description: help,
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'text',
    rows: 4,
  })),
})
