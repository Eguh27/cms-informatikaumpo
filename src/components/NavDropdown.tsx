'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ExternalLink } from 'lucide-react'

export type NavSubItem = {
  label: string
  desc?: string
  /** Omit href for a non-navigating row (e.g. upcoming menu). */
  href?: string
  external?: boolean
  /** Non-navigating row: rendered as disabled text, never a dead link. */
  disabled?: boolean
  badge?: string
}

type NavDropdownProps = {
  label: string
  /** Parent landing page. Omit for menus without a landing page. */
  href?: string
  items: NavSubItem[]
  isActive?: boolean
}

/**
 * Theme-composed dropdown for the desktop navbar.
 * Same panel treatment as the existing "Lainnya" menu
 * (rounded-xl, white, blue-tinted shadow), with two-line items,
 * hover + click + Escape + outside-click handling, and
 * `aria-expanded` so keyboard and screen-reader users get the menu too.
 */
export function NavDropdown({ label, href, items, isActive }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open ])

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <span className="flex items-center">
        {href ? (
          <Link
            href={href}
            className={`nav-link text-sm font-semibold transition ${
              isActive ? 'text-[#1453d6] font-bold' : ''
            }`}
          >
            {label}
          </Link>
        ) : (
          <span
            className={`nav-link cursor-default text-sm font-semibold transition ${
              isActive ? 'text-[#1453d6] font-bold' : ''
            }`}
          >
            {label}
          </span>
        )}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={`${open ? 'Tutup' : 'Buka'} submenu ${label}`}
          className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full text-current transition hover:bg-[#eaf0ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]"
        >
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </span>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2">
          <ul
            aria-label={`Submenu ${label}`}
            className="overflow-hidden rounded-xl border border-slate-100 bg-white py-2 shadow-[0_12px_40px_rgba(15,56,130,.15)]"
          >
            {items.map((item) => (
              <li key={item.label}>
                {item.href && !item.disabled ? (
                  <Link
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center justify-between gap-2 px-4 py-2.5 transition-colors hover:bg-[#eaf0ff]"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-slate-700">
                        {item.label}
                      </span>
                      {item.desc && (
                        <span className="block text-[11px] font-medium text-slate-600">
                          {item.desc}
                        </span>
                      )}
                    </span>
                    {item.external ? (
                      <ExternalLink
                        className="size-3.5 shrink-0 text-slate-400"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex min-h-[44px] cursor-default items-center justify-between gap-2 px-4 py-2.5"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-slate-500">
                        {item.label}
                      </span>
                      {item.desc && (
                        <span className="block text-[11px] font-medium text-slate-500">
                          {item.desc}
                        </span>
                      )}
                    </span>
                    {item.badge && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
