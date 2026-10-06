'use client'

import { usePathname } from 'next/navigation'
import { Share2, Facebook, Twitter, Send } from 'lucide-react'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'

type Props = {
  title: string
}

/**
 * Right-aligned share row in the news footer: a compact blue primary plus the
 * four social pills so the reader sees the actual destinations.
 */
export function ShareButtons({ title }: Props) {
  const pathname = usePathname() || '/berita'
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const url = encodeURIComponent(`${origin}${pathname}`)
  const text = encodeURIComponent(title)

  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}`, bg: 'bg-[#25D366] hover:bg-[#1da851]', Icon: WhatsAppIcon },
    { label: 'Telegram', href: `https://t.me/share/url?url=${url}&text=${text}`, bg: 'bg-[#229ED9] hover:bg-[#1b86b8]', Icon: Send },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`, bg: 'bg-black hover:bg-neutral-800', Icon: Twitter },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, bg: 'bg-[#1877F2] hover:bg-[#0f6bde]', Icon: Facebook },
  ]

  return (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-5">
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
        <Share2 className="size-3.5" aria-hidden="true" /> Bagikan
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition ${l.bg}`}
        >
          <l.Icon className="size-3.5" aria-hidden="true" />
          {l.label}
        </a>
      ))}
    </div>
  )
}