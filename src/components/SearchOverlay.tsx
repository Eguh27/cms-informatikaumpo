'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  GraduationCap,
  LayoutGrid,
  Newspaper,
  Search as SearchIcon,
  Sparkles,
  X,
} from 'lucide-react'
import { useDebounce } from '@/utilities/useDebounce'
import type { Curriculum, Lecturer, News } from '@/payload-types'

type TrackType = NonNullable<Curriculum['tracks']>[0]

gsap.registerPlugin(useGSAP)

type Section = {
  id: string
  label: string
  href: string
  hint: string
  keywords: string
}

/** Static targets so the panel is useful before any network round-trip. */
const SECTIONS: Section[] = [
  {
    id: 'beranda',
    label: 'Beranda',
    href: '/',
    hint: 'Ringkasan program studi',
    keywords: 'home utama prodi teknik informatika',
  },
  {
    id: 'profil',
    label: 'Profil',
    href: '/profil',
    hint: 'Sejarah, visi misi, struktur, akreditasi',
    keywords: 'sejarah visi misi struktur organisasi akreditasi ban-pt berdiri',
  },
  {
    id: 'akademik',
    label: 'Akademik',
    href: '/akademik',
    hint: 'Kurikulum, peminatan, MBKM',
    keywords: 'kurikulum semester matakuliah peminatan mbkm capstone olympiade obe',
  },
  {
    id: 'dosen',
    label: 'Dosen',
    href: '/dosen',
    hint: 'Profil dosen & kepala laboratorium',
    keywords: 'dosen pengajar kaprodi laboratorium nidn programmer staff',
  },
  {
    id: 'fasilitas',
    label: 'Fasilitas',
    href: '/fasilitas',
    hint: 'Laboratorium dan sarana',
    keywords: 'fasilitas laboratorium lab jaringan iot software multimedia',
  },
  {
    id: 'berita',
    label: 'Berita',
    href: '/berita',
    hint: 'Kabar, agenda, pengumuman',
    keywords: 'berita kabar agenda pengumuman event announcement',
  },
  {
    id: 'unduhan',
    label: 'Unduhan',
    href: '/download',
    hint: 'Dokumen, modul, dan formulir',
    keywords: 'unduhan download dokumen modul formulir pdf panduan',
  },
  {
    id: 'kontak',
    label: 'Kontak',
    href: '/kontak',
    hint: 'Alamat, telepon, dan WhatsApp',
    keywords: 'kontak alamat telepon wa whatsapp lokasi peta sekretariat',
  },
]

type Group = 'section' | 'news' | 'lecturer' | 'track'

type Item = {
  key: string
  group: Group
  label: string
  hint: string
  href: string
}

const GROUP_META: Record<Group, { label: string; icon: typeof LayoutGrid }> = {
  section: { label: 'Halaman', icon: LayoutGrid },
  news: { label: 'Berita', icon: Newspaper },
  lecturer: { label: 'Dosen', icon: GraduationCap },
  track: { label: 'Peminatan', icon: Sparkles },
}

/** Payload returns `{ docs }`; a non-OK response must not break the panel. */
async function readDocs(url: string, signal: AbortSignal): Promise<unknown[]> {
  const res = await fetch(url, { signal })
  if (!res.ok) return []
  const body = (await res.json()) as { docs?: unknown[] }
  return Array.isArray(body.docs) ? body.docs : []
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [news, setNews] = useState<News[]>([])
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [tracks, setTracks] = useState<TrackType[]>([])
  const [loading, setLoading] = useState(false)

  const debounced = useDebounce(query, 220)
  const trimmed = debounced.trim()
  const tooShort = debounced.trim().length > 0 && debounced.trim().length < 2

  /* Static sections match instantly; CMS collections fill in behind them. */
  const items = useMemo<Item[]>(() => {
    const q = trimmed.toLowerCase()
    const out: Item[] = []

    if (!q) {
      return SECTIONS.map((s) => ({
        key: `section-${s.id}`,
        group: 'section' as const,
        label: s.label,
        hint: s.hint,
        href: s.href,
      }))
    }

    for (const s of SECTIONS) {
      const haystack = `${s.label} ${s.hint} ${s.keywords}`.toLowerCase()
      if (haystack.includes(q)) {
        out.push({
          key: `section-${s.id}`,
          group: 'section',
          label: s.label,
          hint: s.hint,
          href: s.href,
        })
      }
    }
    for (const n of news) {
      out.push({
        key: `news-${n.id}`,
        group: 'news',
        label: n.title,
        hint: (typeof n.category === 'object' && n.category !== null ? n.category.title : String(n.category || '')) || 'Berita',
        href: `/berita/${n.slug}`,
      })
    }
    for (const l of lecturers) {
      out.push({
        key: `lecturer-${l.id}`,
        group: 'lecturer',
        label: l.name,
        hint: l.focus || l.role || 'Dosen',
        href: `/dosen?q=${encodeURIComponent(l.name)}`,
      })
    }
    for (const t of tracks) {
      out.push({
        key: `track-${t.id}`,
        group: 'track',
        label: t.title,
        hint: t.copy,
        href: '/akademik',
      })
    }
    return out
  }, [trimmed, news, lecturers, tracks])

  /* Groups carry the index from the flat list, so the highlighted option and
     aria-activedescendant can never disagree about position. */
  const grouped = useMemo(() => {
    const out: { group: Group; rows: { item: Item; index: number }[] }[] = []
    items.forEach((item, index) => {
      let bucket = out.find((g) => g.group === item.group)
      if (!bucket) {
        bucket = { group: item.group, rows: [] }
        out.push(bucket)
      }
      bucket.rows.push({ item, index })
    })
    return out
  }, [items])

  useEffect(() => {
    setActiveIndex(-1)
  }, [trimmed])

  /* CMS lookup — `like` requires every typed word to be present. */
  useEffect(() => {
    if (trimmed.length < 2) {
      setNews([])
      setLecturers([])
      setTracks([])
      setLoading(false)
      return
    }

    const ctrl = new AbortController()
    const w = encodeURIComponent(trimmed)
    setLoading(true)

    Promise.all([
      readDocs(
        `/api/news?depth=0&limit=5&sort=-publishedAt&where[or][0][title][like]=${w}&where[or][1][excerpt][like]=${w}&where[or][2][category][like]=${w}`,
        ctrl.signal,
      ),
      readDocs(
        `/api/lecturers?depth=0&limit=5&where[or][0][name][like]=${w}&where[or][1][role][like]=${w}&where[or][2][focus][like]=${w}`,
        ctrl.signal,
      ),
      readDocs(
        `/api/curriculums?depth=0&limit=1&where[isActive][equals]=true`,
        ctrl.signal,
      ),
    ])
      .then(([n, l, c]) => {
        setNews(n as News[])
        setLecturers(l as Lecturer[])
        const activeCurriculum = (c as any[])[0]
        if (activeCurriculum && activeCurriculum.tracks) {
          const wLower = trimmed.toLowerCase()
          const matchedTracks = activeCurriculum.tracks.filter((t: any) => 
            t.title?.toLowerCase().includes(wLower) || 
            t.copy?.toLowerCase().includes(wLower)
          )
          setTracks(matchedTracks as TrackType[])
        } else {
          setTracks([])
        }
        setLoading(false)
      })
      .catch(() => {
        /* Aborted or offline — keep whatever static matches we already have. */
        if (!ctrl.signal.aborted) setLoading(false)
      })

    return () => ctrl.abort()
  }, [trimmed])

  /* Rise + scale into place, scoped to this component only. */
  useGSAP(
    () => {
      const dialog = dialogRef.current
      const panel = panelRef.current
      const scrim = scrimRef.current
      if (!dialog || !panel || !scrim) return

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (open) {
        if (!dialog.open) {
          lastFocused.current = document.activeElement as HTMLElement | null
          dialog.showModal()
        }

        if (reduce) {
          gsap.set(scrim, { autoAlpha: 1 })
          gsap.set(panel, { scale: 1, y: 0, opacity: 1 })
          gsap.set('[data-so-item]', { y: 0, autoAlpha: 1 })
        } else {
          gsap
            .timeline()
            .fromTo(
              scrim,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
              0,
            )
            .fromTo(
              panel,
              /* Opacity only, never autoAlpha: a visibility:hidden panel would make
                 the focus() below a silent no-op on some frames. The dialog is
                 display:none while closed, so the panel needs no visibility gate. */
              { scale: 0.96, y: 12, opacity: 0 },
              { scale: 1, y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' },
              0,
            )
            .fromTo(
              '[data-so-item]',
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.045, ease: 'power3.out' },
              0.14,
            )
        }

        /* The search field is excluded from the fade so it can take focus
           immediately; showModal() alone would focus the first tabbable node. */
        inputRef.current?.focus()
        return
      }

      if (!dialog.open) return

      if (reduce) {
        dialog.close()
      } else {
        gsap
          .timeline({ onComplete: () => dialog.close() })
          .to(panel, { scale: 0.97, y: 8, opacity: 0, duration: 0.26, ease: 'power2.in' }, 0)
          .to(scrim, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0.05)
      }
    },
    { dependencies: [open], scope: rootRef },
  )

  /* Esc closes natively; keep React state in step. */
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleDialogClose = () => {
      setQuery('')
      setActiveIndex(-1)
      onClose()
      lastFocused.current?.focus()
    }
    dialog.addEventListener('close', handleDialogClose)
    return () => dialog.removeEventListener('close', handleDialogClose)
  }, [onClose])

  const go = useCallback(
    (href: string) => {
      onClose()
      router.push(href)
    },
    [onClose, router],
  )

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (items.length === 0) return
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((prev) => (prev + step + items.length) % items.length)
      return
    }
    if (event.key === 'Enter' && activeIndex >= 0 && items[activeIndex]) {
      event.preventDefault()
      go(items[activeIndex].href)
    }
  }

  useEffect(() => {
    if (activeIndex < 0) return
    const active = activeIndex >= 0 ? items[activeIndex] : undefined
    if (!active) return
    document.getElementById(`so-opt-${active.key}`)?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, items])

  const statusText = loading
    ? 'Mencari…'
    : items.length === 0
      ? `Tidak ada hasil untuk ${trimmed}`
      : `${items.length} hasil untuk ${trimmed || 'semua halaman'}`

  return (
    <div ref={rootRef}>
      <dialog
        ref={dialogRef}
        aria-label="Pencarian situs"
        /* Esc would close the dialog before the exit tween could play, so route
           it through state and let the animation finish first. */
        onCancel={(e) => {
          e.preventDefault()
          onClose()
        }}
        /* open:flex, never plain flex — a Tailwind .flex is author-origin and
           would override the UA rule dialog:not([open]) { display: none },
           leaving the whole panel painted behind the page on first load. */
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-transparent p-4 open:flex backdrop:bg-transparent"
      >
        <div
          ref={scrimRef}
          onClick={onClose}
          aria-hidden="true"
          className="absolute inset-0 bg-[#08235b]/45 backdrop-blur-md"
        />

        <div
          ref={panelRef}
          className="relative flex max-h-[min(36rem,calc(100dvh-2rem))] w-full max-w-[40rem] flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/72 shadow-[0_32px_64px_-16px_rgba(11,58,140,0.28),0_8px_20px_-6px_rgba(11,58,140,0.18),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-2xl"
        >
          {/* No data-so-item: the field must stay focusable from the first frame. */}
          <div className="flex items-center gap-3 border-b border-[#1E6FD9]/12 px-5 py-4">
            <SearchIcon className="size-4 shrink-0 text-[#1E6FD9]" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Cari halaman, berita, dosen, atau peminatan
            </label>
            <input
              id="site-search"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              type="text"
              role="combobox"
              autoComplete="off"
              aria-expanded={items.length > 0}
              aria-controls="site-search-results"
              aria-activedescendant={
                activeIndex >= 0 ? `so-opt-${items[activeIndex]?.key}` : undefined
              }
              placeholder="Cari halaman, berita, dosen…"
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#0F2A4A] outline-none placeholder:font-medium placeholder:text-[#4B6B94]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pencarian"
              className="grid size-9 shrink-0 place-items-center rounded-full text-[#4B6B94] transition hover:bg-[#EAF4FF] hover:text-[#0B3A8C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <p aria-live="polite" aria-atomic="true" className="sr-only">
            {statusText}
          </p>

          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            {tooShort ? (
              <p className="px-2 py-8 text-center text-sm font-medium text-[#4B6B94]">
                Ketik minimal 2 karakter untuk mencari.
              </p>
            ) : items.length === 0 && !loading ? (
              <div className="px-2 py-10 text-center">
                <p className="text-sm font-semibold text-[#0F2A4A]">Tidak ada hasil</p>
                <p className="mt-1 text-xs text-[#4B6B94]">
                  Coba kata kunci lain, atau gunakan tautan di bawah.
                </p>
              </div>
            ) : (
              <ul
                id="site-search-results"
                role="listbox"
                aria-label="Hasil pencarian"
                className="space-y-5"
              >
                {grouped.map(({ group, rows }) => {
                  const Icon = GROUP_META[group].icon
                  return (
                    <li key={group} role="presentation" data-so-item>
                      <h2 className="flex items-center gap-1.5 px-2 pb-2 text-[11px] font-bold uppercase tracking-widest text-[#1E6FD9]">
                        <Icon className="size-3.5" aria-hidden="true" />
                        {GROUP_META[group].label}
                      </h2>
                      <ul role="presentation" className="space-y-1">
                        {rows.map(({ item, index }) => {
                          const isActive = index === activeIndex
                          return (
                            <li key={item.key} role="presentation">
                              <a
                                id={`so-opt-${item.key}`}
                                role="option"
                                aria-selected={isActive}
                                href={item.href}
                                onClick={(e) => {
                                  e.preventDefault()
                                  go(item.href)
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                                  isActive ? 'bg-[#EAF4FF]' : 'hover:bg-[#EAF4FF]/60'
                                }`}
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-bold text-[#0F2A4A]">
                                    {item.label}
                                  </span>
                                  <span className="block truncate text-xs text-[#4B6B94]">
                                    {item.hint}
                                  </span>
                                </span>
                                <ArrowRight
                                  className={`size-4 shrink-0 text-[#1E6FD9] transition ${
                                    isActive
                                      ? 'translate-x-0 opacity-100'
                                      : '-translate-x-1 opacity-0'
                                  }`}
                                  aria-hidden="true"
                                />
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div
            data-so-item
            className="flex items-center justify-between gap-3 border-t border-[#1E6FD9]/12 px-5 py-3"
          >
            <Link
              href={`/search${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ''}`}
              onClick={onClose}
              className="text-xs font-bold text-[#1E6FD9] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]"
            >
              Lihat semua hasil
            </Link>
            <p className="text-[11px] text-[#4B6B94]">
              <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> navigasi ·{' '}
              <kbd className="font-mono">Esc</kbd> tutup
            </p>
          </div>
        </div>
      </dialog>
    </div>
  )
}
