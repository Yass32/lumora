'use client'

import { useId, useRef, useState } from 'react'
import { focusPosition, type ImageRef } from '@/lib/data/types'
import { Icon } from './Icon'
import { btnPrimary, btnSecondary, field, label } from './styles'

type Props = {
  value: ImageRef | null | undefined
  onChange: (value: ImageRef | null) => void
  /** Shown when there's no uploaded image, e.g. the built-in hero illustration. */
  fallbackUrl?: string
  fallbackLabel?: string
  shape?: 'arch' | 'square' | 'wide' | 'logo'
  withAlt?: boolean
  withFocus?: boolean
  help?: string
}

export function ImageField({ value, onChange, fallbackUrl, fallbackLabel, shape = 'square', withAlt, withFocus, help }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const id = useId()

  const src = value?.url ?? fallbackUrl
  const frame = {
    arch: 'h-[250px] w-[200px] rounded-t-[100px] rounded-b-[14px]',
    square: 'h-[140px] w-[140px] rounded-[14px]',
    wide: 'h-[140px] w-[200px] rounded-[14px]',
    logo: 'h-[96px] w-[200px] rounded-[12px] bg-white',
  }[shape]

  async function upload(file: File) {
    setError(null)
    if (file.size > 4 * 1024 * 1024) return setError('That image is over 4 MB. Please use a smaller one.')
    setUploading(true)
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/admin/upload', { method: 'POST', body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'The upload failed.')
      onChange({ ...data, alt: value?.alt, focus: value?.focus ?? 'center' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The upload failed.')
    } finally {
      setUploading(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="flex flex-wrap items-start gap-5">
      <div className={`relative shrink-0 overflow-hidden border border-[#d9cda8] bg-[#e9e1cb] ${frame}`}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            className={`h-full w-full ${shape === 'logo' ? 'object-contain p-2' : 'object-cover'}`}
            style={{ objectPosition: value ? focusPosition[value.focus ?? 'center'] : '50% 70%' }}
          />
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-1 text-center text-xs text-muted">
            <Icon name="image" size={24} />
            No image yet
          </span>
        )}
        {uploading && <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm font-semibold">Uploading…</span>}
      </div>

      <div className="flex min-w-[220px] flex-1 flex-col gap-3">
        {!value && fallbackLabel && <p className="text-[13px] text-muted">{fallbackLabel}</p>}
        <div className="flex flex-wrap gap-2">
          <button type="button" className={btnPrimary} onClick={() => input.current?.click()} disabled={uploading}>
            {value ? 'Replace photo' : 'Upload photo'}
          </button>
          {value && (
            <button type="button" className={btnSecondary} onClick={() => onChange(null)} disabled={uploading}>
              {fallbackUrl ? 'Use default image' : 'Remove'}
            </button>
          )}
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            aria-label="Choose an image"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
        </div>
        {error && <p role="alert" className="text-sm font-semibold text-[#8a2a19]">{error}</p>}
        {value && withAlt && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-alt`} className={label}>
              Image description <span className="font-normal text-muted">(read aloud by screen readers, used by Google)</span>
            </label>
            <input id={`${id}-alt`} className={field} value={value.alt ?? ''} maxLength={200} onChange={(e) => onChange({ ...value, alt: e.target.value })} />
          </div>
        )}
        {value && withFocus && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-focus`} className={label}>
              Keep in view when cropped
            </label>
            <select
              id={`${id}-focus`}
              className={field}
              value={value.focus ?? 'center'}
              onChange={(e) => onChange({ ...value, focus: e.target.value as ImageRef['focus'] })}
            >
              <option value="top">Top</option>
              <option value="center">Centre</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        )}
        <p className="text-xs leading-relaxed text-muted">{help ?? 'JPG, PNG or WebP, up to 4 MB.'}</p>
      </div>
    </div>
  )
}
