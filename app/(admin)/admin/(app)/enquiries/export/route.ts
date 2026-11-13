import { getCurrentUser } from '@/lib/auth'
import { getStore } from '@/lib/data/store'

/** Downloads all enquiries as a CSV file that opens in Excel or Google Sheets. */
export async function GET() {
  if (!(await getCurrentUser())) return new Response('Please sign in.', { status: 401 })
  const rows = (await getStore().list('enquiry')).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
  const headers = ['Received', 'Name', 'WhatsApp', 'Email', 'Destination', 'Level', 'Programme', 'Intake', 'Language', 'Status', 'Message', 'Notes']
  const cell = (v: unknown) => {
    let s = String(v ?? '')
    if (/^[=+\-@]/.test(s)) s = `'${s}` // stop spreadsheet formulas
    return `"${s.replace(/"/g, '""')}"`
  }
  const lines = [
    headers.map(cell).join(','),
    ...rows.map((e) =>
      [new Date(e.submittedAt).toISOString().slice(0, 16).replace('T', ' '), e.name, e.phone, e.email, e.destination, e.level, e.programme, e.intake, e.language, e.status, e.message, e.notes]
        .map(cell)
        .join(','),
    ),
  ]
  const date = new Date().toISOString().slice(0, 10)
  return new Response('﻿' + lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="lumora-enquiries-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
