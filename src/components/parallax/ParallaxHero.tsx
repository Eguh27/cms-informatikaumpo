'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { SITE_MEDIA } from '@/data/siteMedia'

const STATS: Array<[string, string]> = [
  ['B', 'Akreditasi BAN-PT'],
  ['800+', 'Mahasiswa aktif'],
  ['30+', 'Dosen & tendik'],
  ['1.800+', 'Alumni'],
]

export interface ParallaxHeroImages {
  building: string
  cloud: string
}

export interface ParallaxHeroContent {
  title?: string
  heroTitle?: string
  lead?: string
  heroLead?: string
  primaryCtaText?: string
  heroPrimaryCtaText?: string
  secondaryCtaText?: string
  heroSecondaryCtaText?: string
  scrollCue?: string
  heroScrollCue?: string
  stats?: Array<[string, string]>
}

export function ParallaxHero({
  images,
  content,
  locale = 'id',
}: {
  images?: ParallaxHeroImages
  content?: ParallaxHeroContent
  locale?: 'id' | 'en'
}) {
  const buildingSrc = images?.building || SITE_MEDIA.heroBuilding
  const cloudSrc = images?.cloud || SITE_MEDIA.heroCloud
  const scrollToProfil = () => {
    document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })
  }

  const title = content?.heroTitle || content?.title || 'Teknik Informatika UNMUH Ponorogo'
  const lead =
    content?.heroLead ||
    content?.lead ||
    'Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo, menghubungkan teknologi, kreativitas, dan dampak nyata berbasis nilai-nilai keislaman.'
  const primaryCta = content?.heroPrimaryCtaText || content?.primaryCtaText || 'Eksplorasi Kurikulum'
  const secondaryCta = content?.heroSecondaryCtaText || content?.secondaryCtaText || 'Profil & Visi Keilmuan'
  const scrollCue = content?.heroScrollCue || content?.scrollCue || 'Jelajahi'
  const stats = content?.stats && content.stats.length > 0 ? content.stats : STATS

  const akademikHref = locale === 'en' ? '/en/akademik' : '/akademik'
  const profilHref = locale === 'en' ? '/en/profil' : '/profil'

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      data-parallax-section
      className="px-hero"
    >
      {/* Layer 0: sky */}
      <div className="px-sky" data-parallax-layer data-speed="0.06" aria-hidden="true" />
      <div className="px-glow" aria-hidden="true" />

      {/* Layer 1: clouds */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="px-cloud px-cloud-a"
        data-px-cloud-a
        data-parallax-layer
        data-speed="-0.22"
        src={cloudSrc}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="px-cloud px-cloud-b"
        data-px-cloud-b
        data-parallax-layer
        data-speed="-0.16"
        src={cloudSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      {/* Layer 2: building */}
      <div className="px-building" data-px-building data-parallax-layer data-speed="-0.08" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={buildingSrc}
          alt=""
          width={1678}
          height={937}
          fetchPriority="high"
        />
      </div>

      {/* Layer 3: ground wave into canvas */}
      <div className="px-ground" aria-hidden="true">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 65C240 22 480 85 720 45C960 12 1200 78 1440 38V140H0V65Z" fill="rgba(213,230,246,0.55)" />
          <path d="M0 80C320 42 640 95 960 62C1200 36 1360 76 1440 56V140H0V80Z" fill="rgba(255,232,204,0.5)" />
          <path d="M0 95C300 68 600 110 900 82C1180 52 1350 90 1440 76V140H0V95Z" fill="#FFFBF5" />
        </svg>
      </div>

      {/* Layer 4: content */}
      <div className="px-hero-inner">
        <div className="px-hero-card" data-px-hero-card>
          <h1 id="hero-title">
            {title}
          </h1>
          <p className="px-lead" data-px-hero-meta>
            {lead}
          </p>
          <div className="px-actions" data-px-hero-meta>
            <Link href={akademikHref} className="px-btn-primary">
              {primaryCta}
              <span aria-hidden="true">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link href={profilHref} className="px-btn-secondary">
              {secondaryCta} <ChevronRight className="size-4 opacity-70" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="px-stats" data-px-stats>
          <dl className="px-stat-group">
            {stats.map(([value, label], i) => (
              <div key={label} className={`px-stat${i === 0 ? ' px-stat-featured' : ''}`}>
                <dt className="sr-only">{label}</dt>
                <dd className="px-stat-value" aria-label={`${value} ${label}`}>
                  {value}
                </dd>
                <dd className="px-stat-label">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        className="px-scroll-cue"
        onClick={scrollToProfil}
        aria-label={locale === 'en' ? 'Scroll to department profile' : 'Gulir ke profil prodi'}
      >
        <span>{scrollCue}</span>
        <i aria-hidden="true">
          <b />
        </i>
      </button>
    </section>
  )
}
