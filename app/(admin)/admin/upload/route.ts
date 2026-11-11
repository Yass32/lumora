import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getStore } from '@/lib/data/store'

const MAX_BYTES = 4 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

/** Photo uploads from the admin. Returns the stored image's id and URL. */
export async function POST(request: Request) {
  if (!(await getCurrentUser())) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file received.' }, { status: 400 })
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'Use a JPG, PNG or WebP image.' }, { status: 415 })
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'That image is over 4 MB. Please use a smaller one.' }, { status: 413 })

  try {
    const data = Buffer.from(await file.arrayBuffer())
    const image = await getStore().uploadImage({ name: file.name || 'upload', type: file.type, data })
    return NextResponse.json(image)
  } catch (error) {
    console.error('[upload]', error)
    return NextResponse.json({ error: 'The upload failed. Please try again.' }, { status: 500 })
  }
}
