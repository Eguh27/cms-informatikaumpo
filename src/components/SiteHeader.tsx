'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { SearchOverlay } from './SearchOverlay'
import { SITE_LINKS, SITE_MEDIA } from '@/data/siteMedia'

export function SiteHeader({ logoSrc }: { logoSrc?: string }) {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
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

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 lg:flex text-[#203f6b]">
            <Link
              href="/"
              className={`nav-link text-sm font-semibold transition ${
                pathname === '/' ? 'text-[#1453d6] font-bold' : ''
              }`}
            >
              Beranda
            </Link>

            <Link
              href="/profil"
              className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/profil') ? 'text-[#1453d6] font-bold' : ''}`}
            >
              Profil
            </Link>

            <Link
              href="/akademik"
              className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/akademik') ? 'text-[#1453d6] font-bold' : ''}`}
            >
              Akademik
            </Link>
            <Link
              href="/dosen"
              className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/dosen') ? 'text-[#1453d6] font-bold' : ''}`}
            >
              Dosen
            </Link>
            <Link
              href="/fasilitas"
              className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/fasilitas') ? 'text-[#1453d6] font-bold' : ''}`}
            >
              Fasilitas
            </Link>
            <Link
              href="/berita"
              className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/berita') ? 'text-[#1453d6] font-bold' : ''}`}
            >
              Berita
            </Link>
            <Link
              href="/download"
              className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/download') ? 'text-[#1453d6] font-bold' : ''}`}
            >
              Unduhan
            </Link>
            <Link
              href="/kontak"
              className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/kontak') ? 'text-[#1453d6] font-bold' : ''}`}
            >
              Kontak
            </Link>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden items-center gap-3 lg:flex">
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
              className="rounded-full px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 bg-[#1453d6] text-white shadow-[0_10px_24px_rgba(20,83,214,.25)] hover:bg-[#0f44b3]"
            >
              Pendaftaran PMB
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
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
            className="mx-4 mt-3 max-h-[80vh] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl lg:hidden"
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
                href="/akademik"
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Akademik
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
              <Link
                href="/kontak"
                className="flex w-full items-center justify-between py-3.5 text-left text-sm font-semibold text-[#16356e]"
              >
                Kontak
              </Link>
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
