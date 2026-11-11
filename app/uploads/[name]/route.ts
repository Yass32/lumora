import { promises as fs } from 'node:fs'
import path from 'node:path'
import { UPLOAD_DIR } from '@/lib/data/store'

const types: Record<string, string> = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }

/** Serves images uploaded while using local file storage (development / self-hosting). */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  if (!/^[a-f0-9-]+\.(jpg|png|webp)$/.test(name)) return new Response('Not found', { status: 404 })
  try {
    const data = await fs.readFile(path.join(UPLOAD_DIR, name))
    return new Response(new Uint8Array(data), {
      headers: { 'Content-Type': types[name.split('.').pop()!], 'Cache-Control': 'public, max-age=31536000, immutable' },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
