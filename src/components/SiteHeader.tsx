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

export function SiteHeader({ logoSrc, headerData }: { logoSrc?: string; headerData?: HeaderType }) {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<'akademik' | 'pendaftaran' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

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
          <Link href="/" className="group flex items-center gap-3 text-left focus:outline-none">
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

          {/* Desktop Navigation Links — ordered by how visitors arrive:
              orientasi, identitas, isi akademik, lalu sumber daya & aksi. */}
          <div className="hidden items-center gap-0.5 xl:flex">
            <NavLink href="/" label="Beranda" isActive={pathname === '/'} />
            <NavLink href="/profil" label="Profil" isActive={pathname.startsWith('/profil')} />

            <NavDropdown
              label="Akademik"
              href="/akademik"
              isActive={pathname.startsWith('/akademik')}
              items={[
                {
                  label: 'Kurikulum & CPL',
                  desc: 'Konsentrasi, peta semester, capaian lulusan',
                  href: '/akademik',
                },
                {
                  label: 'Jadwal Kuliah',
                  desc: 'Unduh jadwal per semester dari CMS',
                  href: '/akademik/jadwal-kuliah',
                },
              ]}
            />

            <NavLink href="/dosen" label="Dosen" isActive={pathname.startsWith('/dosen')} />
            <NavLink href="/fasilitas" label="Fasilitas" isActive={pathname.startsWith('/fasilitas')} />
            <NavLink href="/berita" label="Berita" isActive={pathname.startsWith('/berita')} />
            <NavLink href="/download" label="Unduhan" isActive={pathname.startsWith('/download')} />

            <NavDropdown
              label="Pendaftaran"
              isActive={pathname.startsWith('/pendaftaran')}
              items={[
                {
                  label: 'Magang',
                  desc: 'Formulir & berkas Kerja Praktik industri',
                  href: '/pendaftaran/magang',
                },
                {
                  label: 'KKN',
                  desc: 'Portal GIAT UMPO',
                  href: SITE_LINKS.kkn,
                  external: true,
                },
                {
                  label: 'Skripsi',
                  desc: 'Sistem informasi SISKRIP',
                  href: SITE_LINKS.siskrip,
                  external: true,
                },
                {
                  label: 'Organisasi',
                  desc: 'HIMAKA & ormawa prodi',
                  badge: 'Segera',
                  disabled: true,
                },
              ]}
            />

            {/* Dynamic Dropdown from CMS — same behavior and panel as the other menus */}
            {headerData?.navItems && headerData.navItems.length > 0 && (
              <NavDropdown
                label="Lainnya"
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
                      href,
                      external: !!link?.newTab,
                    }
                  })
                  .filter((item): item is { label: string; href: string; external: boolean } => item !== null)}
              />
            )}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden items-center gap-3 xl:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Cari di website"
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
              Pendaftaran PMB
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Cari"
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
                href="/"
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Beranda
              </Link>
              <Link
                href="/profil"
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Profil Program Studi
              </Link>

              <Link
                href="/dosen"
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Dosen
              </Link>
              <Link
                href="/fasilitas"
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Fasilitas
              </Link>
              <Link
                href="/berita"
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Berita
              </Link>
              <Link
                href="/download"
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Unduhan
              </Link>
              <div className="border-b border-[#e4ebfb]">
                <div className="flex w-full items-center justify-between">
                  <Link
                    href="/akademik"
                    className="flex-1 py-3.5 text-left text-sm font-semibold text-[#16356e]"
                  >
                    Akademik
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
                        href="/akademik"
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        Kurikulum & CPL
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/akademik/jadwal-kuliah"
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        Jadwal Kuliah
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
                  Pendaftaran
                  <ChevronDown
                    className={`size-5 text-[#1453d6] transition-transform ${mobileExpanded === 'pendaftaran' ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {mobileExpanded === 'pendaftaran' && (
                  <ul id="submenu-seluler-pendaftaran" aria-label="Submenu Pendaftaran" className="pb-2 pl-4">
                    <li>
                      <Link
                        href="/pendaftaran/magang"
                        className="block min-h-[44px] py-3 text-sm font-semibold text-[#16356e]"
                      >
                        Magang
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
                        Skripsi
                      </a>
                    </li>
                    <li>
                      <span aria-disabled="true" className="block min-h-[44px] cursor-default py-3 text-sm font-semibold text-slate-400">
                        Organisasi
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
                  Pendaftaran PMB
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
