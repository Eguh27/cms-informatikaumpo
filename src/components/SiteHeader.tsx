'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import { SearchOverlay } from './SearchOverlay'
import { NavDropdown, NAV_ITEM_CLASS, NAV_ITEM_ACTIVE_CLASS } from './NavDropdown'
import { SITE_LINKS, SITE_MEDIA } from '@/data/siteMedia'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

/** Flat section link, sharing the dropdown trigger's footprint and states. */
function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`${NAV_ITEM_CLASS} ${isActive ? NAV_ITEM_ACTIVE_CLASS : ''}`}
    >
      {label}
    </Link>
  )
}

export function SiteHeader({
  logoSrc,
  headerData,
  locale: initialLocale,
}: {
  logoSrc?: string
  headerData?: HeaderType | null
  locale?: 'id' | 'en'
}) {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<'akademik' | 'pendaftaran' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  const isEn = pathname.startsWith('/en') || initialLocale === 'en'
  const currentLocale: 'id' | 'en' = isEn ? 'en' : 'id'

  const switchLocale = (target: 'id' | 'en') => {
    if (target === currentLocale) return
    if (target === 'en') {
      const newPath = pathname === '/' ? '/en' : `/en${pathname}`
      window.location.href = newPath
    } else {
      const newPath = pathname.replace(/^\/en/, '') || '/'
      window.location.href = newPath
    }
  }

  const localize = (href: string) => {
    if (!href || href.startsWith('http') || href.startsWith('#')) return href
    if (currentLocale === 'en') {
      return href.startsWith('/en') ? href : `/en${href === '/' ? '' : href}`
    }
    return href
  }

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        aria-label="Navigasi utama"
        style={{ top: 'var(--admin-bar-height, 0px)' }}
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          scrollY > 40
            ? 'bg-white/95 py-3 shadow-[0_12px_40px_rgba(15,56,130,.10)] backdrop-blur-xl border-b border-blue-50'
            : 'bg-gradient-to-b from-[#FFFBF5]/90 via-[#FFFBF5]/40 to-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo & Identity */}
          <Link href={localize('/')} className="group flex items-center gap-3 text-left focus:outline-none">
            <span className="grid size-11 place-items-center rounded-2xl border border-[#E7DECB] bg-[#F9F6EE] p-1.5 shadow-sm transition-colors">
              <img
                src={logoSrc || SITE_MEDIA.logoUmpo}
                alt="Logo UMPO"
                className="size-7 object-contain"
              />
            </span>
            <span
              className={`font-display text-lg font-bold leading-none tracking-tight transition-colors text-[#08235b]`}
            >
              Informatika
              <br />
              <span className="text-[#1E6FD9]">UMPO</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-0.5 xl:flex">
            <NavLink href={localize('/')} label={currentLocale === 'en' ? 'Home' : 'Beranda'} isActive={pathname === '/' || pathname === '/en'} />
            <NavLink href={localize('/profil')} label={currentLocale === 'en' ? 'Profile' : 'Profil'} isActive={pathname.includes('/profil')} />

            <NavDropdown
              label={currentLocale === 'en' ? 'Academics' : 'Akademik'}
              href={localize('/akademik')}
              isActive={pathname.includes('/akademik')}
              items={[
                {
                  label: currentLocale === 'en' ? 'Curriculum & Tracks' : 'Kurikulum & CPL',
                  desc: currentLocale === 'en' ? 'Specializations, semester maps, learning outcomes' : 'Konsentrasi, peta semester, capaian lulusan',
                  href: localize('/akademik'),
                },
                {
                  label: currentLocale === 'en' ? 'Class Schedule' : 'Jadwal Kuliah',
                  desc: currentLocale === 'en' ? 'Latest official PDF schedules from CMS' : 'Unduh jadwal per semester dari CMS',
                  href: localize('/akademik/jadwal-kuliah'),
                },
              ]}
            />

            <NavLink href={localize('/dosen')} label={currentLocale === 'en' ? 'Faculty' : 'Dosen'} isActive={pathname.includes('/dosen')} />
            <NavLink href={localize('/fasilitas')} label={currentLocale === 'en' ? 'Facilities' : 'Fasilitas'} isActive={pathname.includes('/fasilitas')} />
            <NavLink href={localize('/berita')} label={currentLocale === 'en' ? 'News' : 'Berita'} isActive={pathname.includes('/berita')} />
            <NavLink href={localize('/download')} label={currentLocale === 'en' ? 'Downloads' : 'Unduhan'} isActive={pathname.includes('/download')} />

            <NavDropdown
              label={currentLocale === 'en' ? 'Admissions' : 'Pendaftaran'}
              isActive={pathname.includes('/pendaftaran')}
              items={[
                {
                  label: currentLocale === 'en' ? 'Internship' : 'Magang',
                  desc: currentLocale === 'en' ? 'Industry internship practical forms' : 'Formulir & berkas Kerja Praktik industri',
                  href: localize('/pendaftaran/magang'),
                },
                {
                  label: 'KKN',
                  desc: 'Portal GIAT UMPO',
                  href: SITE_LINKS.kkn,
                  external: true,
                },
                {
                  label: currentLocale === 'en' ? 'Thesis' : 'Skripsi',
                  desc: 'Sistem informasi SISKRIP',
                  href: SITE_LINKS.siskrip,
                  external: true,
                },
                {
                  label: currentLocale === 'en' ? 'Student Orgs' : 'Organisasi',
                  desc: 'HIMAKA & ormawa prodi',
                  badge: currentLocale === 'en' ? 'Soon' : 'Segera',
                  disabled: true,
                },
              ]}
            />

            {/* Dynamic Dropdown from CMS */}
            {headerData?.navItems && headerData.navItems.length > 0 && (
              <NavDropdown
                label={currentLocale === 'en' ? 'More' : 'Lainnya'}
                items={headerData.navItems
                  .map(({ link }) => {
                    const href =
                      link?.type === 'reference' &&
                      typeof link?.reference?.value === 'object' &&
                      link?.reference?.value?.slug
                        ? `${link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''}/${link.reference.value.slug}`
                        : link?.url || undefined
                    if (!href) return null
                    return {
                      label: link?.label || href,
                      href: localize(href),
                      external: !!link?.newTab,
                    }
                  })
                  .filter((item): item is { label: string; href: string; external: boolean } => item !== null)}
              />
            )}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden items-center gap-3 xl:flex">
            {/* Language Switcher Pill */}
            <div className="flex items-center rounded-full border border-blue-100 bg-[#eaf0ff] p-1 text-xs font-bold shadow-xs">
              <button
                type="button"
                onClick={() => switchLocale('id')}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  currentLocale === 'id'
                    ? 'bg-[#1453d6] text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-[#1453d6]'
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={`rounded-full px-2.5 py-1 transition-all ${
                  currentLocale === 'en'
                    ? 'bg-[#1453d6] text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-[#1453d6]'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={currentLocale === 'en' ? 'Search website' : 'Cari di website'}
              aria-haspopup="dialog"
              className="grid size-11 place-items-center rounded-full transition bg-[#eaf0ff] text-[#1453d6] hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]"
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
            <a
              href={SITE_LINKS.pmb}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 py-3 text-sm font-bold transition-colors bg-[#1453d6] text-white shadow-[0_10px_24px_rgba(20,83,214,.25)] hover:bg-[#0f44b3]"
            >
              {currentLocale === 'en' ? 'PMB Admissions' : 'Pendaftaran PMB'}
            </a>
          </div>

          {/* Mobile Bar */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Mobile Language Switcher Pill */}
            <div className="flex items-center rounded-full border border-blue-100 bg-[#eaf0ff] p-0.5 text-xs font-bold shadow-xs">
              <button
                type="button"
                onClick={() => switchLocale('id')}
                className={`rounded-full px-2 py-0.5 text-[11px] transition-all ${
                  currentLocale === 'id'
                    ? 'bg-[#1453d6] text-white font-black'
                    : 'text-slate-600 hover:text-[#1453d6]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={`rounded-full px-2 py-0.5 text-[11px] transition-all ${
                  currentLocale === 'en'
                    ? 'bg-[#1453d6] text-white font-black'
                    : 'text-slate-600 hover:text-[#1453d6]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={currentLocale === 'en' ? 'Search' : 'Cari'}
              aria-haspopup="dialog"
              className="grid size-11 place-items-center rounded-full bg-[#eaf0ff] text-[#1453d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]"
            >
              <Search className="size-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="navigasi-seluler"
              className="grid size-11 place-items-center rounded-full bg-[#eaf0ff] text-[#1453d6]"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div
            id="navigasi-seluler"
            className="mx-4 mt-3 max-h-[80vh] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl xl:hidden"
          >
            <div className="space-y-1">
              <Link
                href={localize('/')}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                {currentLocale === 'en' ? 'Home' : 'Beranda'}
              </Link>
              <Link
                href={localize('/profil')}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                {currentLocale === 'en' ? 'Department Profile' : 'Profil Program Studi'}
              </Link>

              <Link
                href={localize('/dosen')}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                {currentLocale === 'en' ? 'Faculty & Staff' : 'Dosen'}
              </Link>
              <Link
                href={localize('/fasilitas')}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                {currentLocale === 'en' ? 'Laboratories & Facilities' : 'Fasilitas'}
              </Link>
              <Link
                href={localize('/berita')}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                {currentLocale === 'en' ? 'News & Events' : 'Berita'}
              </Link>
              <Link
                href={localize('/download')}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                {currentLocale === 'en' ? 'Downloads & Documents' : 'Unduhan'}
              </Link>
              <div className="border-b border-[#e4ebfb]">
                <div className="flex w-full items-center justify-between">
                  <Link
                    href={localize('/akademik')}
                    className="flex-1 py-3.5 text-left text-sm font-semibold text-[#16356e]"
                  >
                    {currentLocale === 'en' ? 'Academics' : 'Akademik'}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileExpanded(mobileExpanded === 'akademik' ? null : 'akademik')}
                    aria-expanded={mobileExpanded === 'akademik'}
                    aria-label={`${mobileExpanded === 'akademik' ? 'Tutup' : 'Buka'} submenu Akademik`}
                    aria-controls="submenu-seluler-akademik"
                    className="grid size-11 place-items-center rounded-full text-[#1453d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]"
                  >
                    <ChevronDown
                      className={`size-5 transition-transform ${mobileExpanded === 'akademik' ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {mobileExpanded === 'akademik' && (
                  <ul id="submenu-seluler-akademik" aria-label="Submenu Akademik" className="pb-2 pl-4">
                    <li>
                      <Link
                        href={localize('/akademik')}
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        {currentLocale === 'en' ? 'Curriculum & OBE' : 'Kurikulum & CPL'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={localize('/akademik/jadwal-kuliah')}
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        {currentLocale === 'en' ? 'Class Schedule' : 'Jadwal Kuliah'}
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className={`${headerData?.navItems?.length ? 'border-b border-[#e4ebfb]' : ''}`}>
                <button
                  type="button"
                  onClick={() => setMobileExpanded(mobileExpanded === 'pendaftaran' ? null : 'pendaftaran')}
                  aria-expanded={mobileExpanded === 'pendaftaran'}
                  aria-controls="submenu-seluler-pendaftaran"
                  className="flex min-h-[44px] w-full items-center justify-between py-3.5 text-left text-sm font-semibold text-[#16356e]"
                >
                  {currentLocale === 'en' ? 'Admissions' : 'Pendaftaran'}
                  <ChevronDown
                    className={`size-5 text-[#1453d6] transition-transform ${mobileExpanded === 'pendaftaran' ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {mobileExpanded === 'pendaftaran' && (
                  <ul id="submenu-seluler-pendaftaran" aria-label="Submenu Pendaftaran" className="pb-2 pl-4">
                    <li>
                      <Link
                        href={localize('/pendaftaran/magang')}
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        {currentLocale === 'en' ? 'Internship' : 'Magang'}
                      </Link>
                    </li>
                    <li>
                      <a
                        href={SITE_LINKS.kkn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        KKN
                      </a>
                    </li>
                    <li>
                      <a
                        href={SITE_LINKS.siskrip}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        {currentLocale === 'en' ? 'Thesis' : 'Skripsi'}
                      </a>
                    </li>
                    <li>
                      <span aria-disabled="true" className="block min-h-[44px] cursor-default py-3 text-sm font-semibold text-slate-400">
                        {currentLocale === 'en' ? 'Student Orgs' : 'Organisasi'}
                      </span>
                    </li>
                  </ul>
                )}
              </div>
              
              {/* Dynamic Links from CMS (Mobile) */}
              {headerData?.navItems?.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={`flex w-full items-center justify-between py-3.5 text-left text-sm font-semibold text-[#1453d6] ${
                    i !== (headerData.navItems?.length ?? 0) - 1 ? 'border-b border-[#e4ebfb]' : ''
                  }`}
                />
              ))}
              <div className="pt-3">
                <a
                  href={SITE_LINKS.pmb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-2xl bg-[#1453d6] py-3.5 text-center text-sm font-bold text-white shadow-lg"
                >
                  {currentLocale === 'en' ? 'PMB Admissions' : 'Pendaftaran PMB'}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
