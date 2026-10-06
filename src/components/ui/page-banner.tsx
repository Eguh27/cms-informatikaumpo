'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { PxChip } from './px-chip'
import { SITE_MEDIA } from '@/data/siteMedia'
import { Sparkles } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageBannerProps {
  title: string
  subtitle: string
  category: string
  breadcrumbs: BreadcrumbItem[]
  className?: string
}

export function PageBanner({
  title,
  subtitle,
  category,
  breadcrumbs,
  className,
}: PageBannerProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden pt-32 pb-24 text-[#0B3A8C]',
        className,
      )}
    >
      {/* Warm-light sky matching homepage hero */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(175deg, #a8d8ff 0%, #c6e6ff 28%, #dbeeff 48%, #eaf4ff 66%, #f2efe8 84%, #fffbf5 100%)',
        }}
      />
      <div
        className="absolute -top-24 right-[8%] size-96 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,184,77,0.16) 0%, transparent 70%)',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SITE_MEDIA.heroCloud}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute -top-10 -left-24 w-[42rem] max-w-none opacity-40 pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#4B6B94] mb-4 flex-wrap"
        >
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <ChevronRight
                  className="size-3 opacity-60 shrink-0"
                  aria-hidden="true"
                />
              )}
              {b.href ? (
                <Link href={b.href} className="hover:text-[#1E6FD9] transition">
                  {b.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="text-[#0B3A8C] font-extrabold"
                >
                  {b.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E6FD9]/20 bg-white/80 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#1E6FD9] backdrop-blur-md">
            <PxChip variant="amber" size="sm" className="px-2 py-0.5">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {category}
            </PxChip>
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-[-.03em] text-[#0B3A8C] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-[#4B6B94] md:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Wave into canvas #FFFBF5 */}
      <div className="absolute inset-x-[-2%] bottom-[-2px] h-14 md:h-20 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 84" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0,24 C320,72 640,-12 960,36 C1200,72 1360,28 1440,24 L1440,84 L0,84 Z"
            fill="#FFFBF5"
          />
        </svg>
      </div>
    </div>
  )
}