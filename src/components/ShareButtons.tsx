'use client'

import { usePathname } from 'next/navigation'
import { Share2 } from 'lucide-react'

type Props = {
  title: string
}

/**
 * Share toolbar for news detail pages. Opens share URLs in a new tab; small
 * chip-style links keep the palette quiet (one ink + one blue accent).
 */
export function ShareButtons({ title }: Props) {
  const pathname = usePathname() || '/berita'
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const url = encodeURIComponent(`${origin}${pathname}`)
  const text = encodeURIComponent(title)

  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}` },
    { label: 'Telegram', href: `https://t.me/share/url?url=${url}&text=${text}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
  ]

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-6">
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
        <Share2 className="size-3.5" aria-hidden="true" /> Bagikan
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[36px] items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-[#08235b] transition hover:border-[#1453d6] hover:text-[#1453d6]"
        >
          {l.label}
        </a>
      ))}
    </div>
  )
}