import 'server-only'
import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createClient, type SanityClient } from '@sanity/client'
import type { AnyDoc, DocOf, DocType, ImageRef } from './types'

/**
 * Where content is stored.
 *  - Sanity (production): when NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are set.
 *  - Local files (development): `.data/db.json` and `.data/uploads/` (served at /uploads/…).
 * Both behave the same, so the admin and the website don't care which one is used.
 */
export interface Store {
  readonly kind: 'sanity' | 'file'
  list<T extends DocType>(type: T): Promise<DocOf<T>[]>
  get<T extends DocType>(type: T, id: string): Promise<DocOf<T> | null>
  save<T extends AnyDoc>(doc: T): Promise<T>
  patch(id: string, set: Record<string, unknown>): Promise<void>
  remove(id: string): Promise<void>
  uploadImage(file: { name: string; type: string; data: Buffer }): Promise<ImageRef>
}

/* ── Sanity ─────────────────────────────────────────────── */

class SanityStore implements Store {
  readonly kind = 'sanity' as const
  constructor(private client: SanityClient) {}

  list<T extends DocType>(type: T) {
    return this.client.fetch<DocOf<T>[]>('*[_type == $type && !(_id in path("drafts.**"))]', { type })
  }
  get<T extends DocType>(type: T, id: string) {
    return this.client.fetch<DocOf<T> | null>('*[_type == $type && _id == $id][0]', { type, id })
  }
  async save<T extends AnyDoc>(doc: T) {
    await this.client.createOrReplace(doc as never)
    return doc
  }
  async patch(id: string, set: Record<string, unknown>) {
    await this.client.patch(id).set(set).commit()
  }
  async remove(id: string) {
    await this.client.delete(id)
  }
  async uploadImage(file: { name: string; type: string; data: Buffer }): Promise<ImageRef> {
    const asset = await this.client.assets.upload('image', file.data, { filename: file.name, contentType: file.type })
    return { assetId: asset._id, url: asset.url }
  }
}

/* ── Local files ────────────────────────────────────────── */

const DATA_DIR = path.join(process.cwd(), '.data')
const DB_FILE = path.join(DATA_DIR, 'db.json')
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads')

class FileStore implements Store {
  readonly kind = 'file' as const
  private queue: Promise<unknown> = Promise.resolve()

  private async read(): Promise<Record<string, AnyDoc>> {
    try {
      return JSON.parse(await fs.readFile(DB_FILE, 'utf8'))
    } catch {
      return {}
    }
  }
  private write(mutator: (db: Record<string, AnyDoc>) => void) {
    // Run writes one at a time so two saves can't overwrite each other.
    const run = this.queue.then(async () => {
      const db = await this.read()
      mutator(db)
      await fs.mkdir(DATA_DIR, { recursive: true })
      const tmp = `${DB_FILE}.${process.pid}.tmp`
      await fs.writeFile(tmp, JSON.stringify(db, null, 2))
      await fs.rename(tmp, DB_FILE)
    })
    this.queue = run.catch(() => undefined)
    return run
  }

  async list<T extends DocType>(type: T) {
    return Object.values(await this.read()).filter((d): d is DocOf<T> => d._type === type)
  }
  async get<T extends DocType>(type: T, id: string) {
    const doc = (await this.read())[id]
    return doc && doc._type === type ? (doc as DocOf<T>) : null
  }
  async save<T extends AnyDoc>(doc: T) {
    await this.write((db) => {
      db[doc._id] = doc
    })
    return doc
  }
  async patch(id: string, set: Record<string, unknown>) {
    await this.write((db) => {
      if (db[id]) db[id] = { ...db[id], ...set } as AnyDoc
    })
  }
  async remove(id: string) {
    await this.write((db) => {
      delete db[id]
    })
  }
  async uploadImage(file: { name: string; type: string; data: Buffer }): Promise<ImageRef> {
    const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[file.type] ?? 'bin'
    const name = `${randomUUID()}.${ext}`
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, name), file.data)
    return { assetId: name, url: `/uploads/${name}` }
  }
}

/* ── Pick one ───────────────────────────────────────────── */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN || ''

let store: Store | null = null

export function getStore(): Store {
  if (store) return store
  if (/^[a-z0-9-]+$/.test(projectId) && token) {
    store = new SanityStore(
      createClient({
        projectId,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: '2025-10-01',
        token,
        useCdn: false,
        perspective: 'published',
      }),
    )
  } else {
    store = new FileStore()
  }
  return store
}

export function newId(prefix: string) {
  return `${prefix}-${randomUUID().slice(0, 8)}`
}
