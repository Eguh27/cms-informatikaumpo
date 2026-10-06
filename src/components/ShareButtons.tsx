'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Share2 } from 'lucide-react'

type Props = {
  title: string
}

/**
 * Dynamic share button: prefers the native Web Share API (mobile sheet),
 * falls back to copying the link on desktop where share is unsupported.
 */
export function ShareButtons({ title }: Props) {
  const pathname = usePathname() || '/berita'
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        /* user cancelled — no-op */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Salin tautan berita ini:', url)
    }
  }

  return (
    <div className="mt-4 flex justify-center">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#1453d6] px-8 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition hover:bg-[#08235b]"
      >
        <Share2 className="size-4" aria-hidden="true" />
        {copied ? 'Tautan tersalin!' : 'Bagikan Berita'}
      </button>
    </div>
  )
}