'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Award,
  Layers,
  ShieldCheck,
} from 'lucide-react'

export function SiteHeader() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrollY > 40
          ? 'bg-white/95 py-3 shadow-[0_12px_40px_rgba(15,56,130,.10)] backdrop-blur-xl border-b border-blue-50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo & Identity */}
        <Link href="/" className="group flex items-center gap-3 text-left focus:outline-none">
          <span
            className={`grid size-11 place-items-center rounded-2xl p-1.5 transition-colors ${
              scrollY > 40 ? 'bg-[#1453d6] text-white shadow-md shadow-blue-600/20' : 'bg-white text-[#1453d6] shadow-lg shadow-black/20'
            }`}
          >
            <img
              src="https://ti.umpo.ac.id/wp-content/uploads/2026/09/LOGO-UNMUH-150x150.png"
              alt="Logo UMPO"
              className="size-7 object-contain"
            />
          </span>
          <span
            className={`font-display text-lg font-bold leading-none tracking-tight transition-colors ${
              scrollY > 40 ? 'text-[#08235b]' : 'text-white'
            }`}
          >
            Informatika<br />
            <span className={scrollY > 40 ? 'text-[#2f6dff]' : 'text-[#bcd1ff]'}>UMPO</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className={`hidden items-center gap-6 lg:flex ${scrollY > 40 ? 'text-[#365080]' : 'text-white/90'}`}>
          <Link
            href="/"
            className={`nav-link text-sm font-semibold transition ${
              pathname === '/' ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''
            }`}
          >
            Beranda
          </Link>

          {/* Profil Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('profil')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/profil"
              className={`nav-link flex items-center gap-1 text-sm font-semibold transition ${
                pathname.startsWith('/profil') ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''
              }`}
            >
              Profil <ChevronDown className="size-3.5 opacity-70" />
            </Link>
            {activeDropdown === 'profil' && (
              <div className="absolute left-0 top-full w-60 pt-2">
                <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-2 text-[#08235b] shadow-xl backdrop-blur-xl">
                  <Link href="/profil#sejarah" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]">
                    <BookOpen className="size-4 text-[#1453d6]" /> Sejarah Pendirian
                  </Link>
                  <Link href="/profil#visimisi" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]">
                    <Award className="size-4 text-[#1453d6]" /> Visi & Misi
                  </Link>
                  <Link href="/profil#struktur" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]">
                    <Layers className="size-4 text-[#1453d6]" /> Struktur Organisasi
                  </Link>
                  <Link href="/profil#akreditasi" className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]">
                    <ShieldCheck className="size-4 text-[#1453d6]" /> Akreditasi BAN-PT
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/akademik" className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/akademik') ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''}`}>Akademik</Link>
          <Link href="/dosen" className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/dosen') ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''}`}>Dosen</Link>
          <Link href="/fasilitas" className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/fasilitas') ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''}`}>Fasilitas</Link>
          <Link href="/berita" className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/berita') ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''}`}>Berita</Link>
          <Link href="/download" className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/download') ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''}`}>Unduhan</Link>
          <Link href="/kontak" className={`nav-link text-sm font-semibold transition ${pathname.startsWith('/kontak') ? (scrollY > 40 ? 'text-[#1453d6] font-bold' : 'text-white font-bold') : ''}`}>Kontak</Link>
        </div>

        {/* Desktop Right CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <button aria-label="Cari di website" className={`grid size-10 place-items-center rounded-full transition ${scrollY > 40 ? 'bg-[#eaf0ff] text-[#1453d6] hover:bg-blue-100' : 'bg-white/15 text-white hover:bg-white/25'}`}>
            <Search className="size-4" />
          </button>
          <a href="https://spmb.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className={`rounded-full px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${scrollY > 40 ? 'bg-[#1453d6] text-white shadow-[0_10px_24px_rgba(20,83,214,.25)] hover:bg-[#0f44b3]' : 'bg-white text-[#1147b5] shadow-lg shadow-black/15 hover:bg-blue-50'}`}>
            Pendaftaran PMB
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button className={`grid size-10 place-items-center rounded-full ${scrollY > 40 ? 'bg-[#eaf0ff] text-[#1453d6]' : 'bg-white/15 text-white'}`}>
            <Search className="size-4" />
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`grid size-11 place-items-center rounded-full ${scrollY > 40 ? 'bg-[#eaf0ff] text-[#1453d6]' : 'bg-white/15 text-white backdrop-blur-md'}`}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
