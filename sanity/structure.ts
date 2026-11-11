import type { StructureResolver } from 'sanity/structure'
import { enquiryStatuses } from './schemas/collections'

const singleton = (S: Parameters<StructureResolver>[0], id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Lumora content studio')
    .items([
      S.listItem()
        .title('Enquiries')
        .id('enquiries')
        .child(
          S.list()
            .title('Enquiries')
            .items([
              S.listItem()
                .title('All enquiries')
                .child(S.documentTypeList('enquiry').title('All enquiries').defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])),
              S.divider(),
              ...enquiryStatuses.map((s) =>
                S.listItem()
                  .title(s.title)
                  .id(`enquiries-${s.value}`)
                  .child(
                    S.documentList()
                      .title(s.title)
                      .schemaType('enquiry')
                      .filter(
                        s.value === 'new'
                          ? '_type == "enquiry" && (status == "new" || !defined(status))'
                          : `_type == "enquiry" && status == "${s.value}"`,
                      )
                      .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
                  ),
              ),
            ]),
        ),
      S.divider(),
      singleton(S, 'siteSettings', 'Site settings (hero image & contacts)'),
      singleton(S, 'homepage', 'Homepage layout'),
      S.divider(),
      S.documentTypeListItem('partner').title('Partner universities'),
      S.documentTypeListItem('service').title('Services'),
      singleton(S, 'whyTurkiye', 'Why Türkiye'),
      singleton(S, 'about', 'About us'),
      S.documentTypeListItem('teamMember').title('Team members'),
      S.documentTypeListItem('story').title('Student stories'),
    ])
