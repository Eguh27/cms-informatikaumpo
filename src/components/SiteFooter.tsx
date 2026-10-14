import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react'
import { SITE_LINKS, SITE_MEDIA } from '@/data/siteMedia'
import { resolveFooterContent } from '@/data/footerFallback'

export function SiteFooter({
  logoSrc,
  footerData,
  locale = 'id',
}: {
  logoSrc?: string
  footerData?: any
  locale?: 'id' | 'en'
}) {
  const content = resolveFooterContent(footerData, locale)

  return (
    <footer className="bg-[#06183d] text-white pt-20 pb-10 mt-auto">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-white p-2">
                <img
                  src={logoSrc || SITE_MEDIA.logoUmpo}
                  alt="Logo UMPO"
                  className="size-8 object-contain"
                />
              </span>
              <span className="font-display text-xl font-bold leading-none tracking-tight text-white">
                Informatika<br />
                <span className="text-[#82aeff]">UMPO</span>
              </span>
            </div>
            <p className="text-sm text-blue-100/70 leading-relaxed mb-6">
              {content.description}
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">{content.navTitle}</h4>
            <ul className="space-y-3 text-sm text-blue-100/70">
              {content.navItems.map((item) => (
                <li key={item.url}>
                  <Link href={item.url} className="hover:text-white transition flex items-center gap-2">
                    <ChevronRight className="size-3" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg font-bold mb-6">{content.contactTitle}</h4>
            <ul className="space-y-4 text-sm text-blue-100/70">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-[#82aeff] shrink-0" />
                <span className="whitespace-pre-line">{content.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-[#82aeff] shrink-0" />
                <span>
                  {content.phone}
                  {content.phoneNote ? ` (${content.phoneNote})` : ''}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-[#82aeff] shrink-0" />
                <span>{content.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-blue-100/50 gap-4">
          <p>© {new Date().getFullYear()} {content.copyrightText}</p>
          <div className="flex items-center gap-4">
            <a
              href={content.portalUrl || SITE_LINKS.portalUmpo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              {content.portalLabel}
            </a>
            <a
              href={content.pmbUrl || SITE_LINKS.pmb}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              {content.pmbLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
