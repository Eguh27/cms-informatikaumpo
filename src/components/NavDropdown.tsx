'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ExternalLink } from 'lucide-react'

/**
 * Shared footprint for every top-level navbar entry, so plain links and
 * dropdown triggers read as one evenly weighted row instead of a scattered
 * list. Vertical rhythm comes from `min-h-[44px]`, horizontal rhythm from
 * `--nav-item-pad-x` (set in globals.css, shared with the underline) plus the
 * parent's near-zero gap.
 *
 * Hover stays typographic only — a colour shift plus the underline drawn by
 * `.nav-link:hover::after`. No background fill anywhere in the row, including
 * the current page.
 */
export const NAV_ITEM_CLASS =
  'nav-link inline-flex min-h-[44px] items-center rounded-full text-sm font-semibold text-[#203f6b] transition-colors duration-200 hover:text-[#1453d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]'

/**
 * Current-page treatment: blue text plus the underline that
 * `.nav-link[aria-current='page']::after` keeps on. No background and no
 * weight bump — `font-bold` loses the cascade to `font-semibold` in Tailwind's
 * output, and the persistent underline is the non-colour marker anyway.
 */
export const NAV_ITEM_ACTIVE_CLASS = 'text-[#1453d6]'

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
            aria-current={isActive ? 'page' : undefined}
            className={`${NAV_ITEM_CLASS} ${isActive ? NAV_ITEM_ACTIVE_CLASS : ''}`}
          >
            {label}
          </Link>
        ) : (
          <span
            className={`${NAV_ITEM_CLASS} cursor-default ${isActive ? NAV_ITEM_ACTIVE_CLASS : ''}`}
          >
            {label}
          </span>
        )}
        {/* Chevron hugs its label: a 44px-wide button here read as an unrelated
            item and broke the row's rhythm. The link beside it still supplies
            the 44px-tall row height. */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={`${open ? 'Tutup' : 'Buka'} submenu ${label}`}
          className="-ml-2 grid size-7 shrink-0 place-items-center rounded-full text-current transition-colors duration-200 hover:text-[#1453d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9]"
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
