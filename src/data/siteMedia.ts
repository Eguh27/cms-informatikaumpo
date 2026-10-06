/**
 * Single source of truth for site imagery.
 *
 * Remote filenames on ti.umpo.ac.id are NOT ours, so they cannot be renamed —
 * instead every image gets a semantic key here. Components must import from
 * this module instead of hardcoding URLs, so a future swap only touches one file.
 *
 * CMS-wired values (logo, hero, banner) resolve through
 * `getSiteMedia()` in `@/utilities/getSiteMedia`, which reads the
 * `site-media` Payload Global and falls back to the constants below.
 */
export const SITE_MEDIA = {
  /** University logo (remote until uploaded to CMS Media). */
  logoUmpo: 'https://ti.umpo.ac.id/wp-content/uploads/2026/09/LOGO-UNMUH-150x150.png',
  /** Faculty building backdrop used by the hero + profil section. */
  heroBuilding: '/assets/hero/gedung-cerah.webp',
  /** Decorative cloud layer used by the hero + page banners. */
  heroCloud: '/assets/hero/awan.webp',
  /** HIMATIF parallax banner backdrop. */
  himatifBanner:
    'https://images.unsplash.com/photo-1663162551013-8bb8ab151e11?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=60&w=1600',
  /** Fasilitas: Lab Jaringan & IoT cover (placeholder until CMS upload). */
  labNetwork:
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  /** Fasilitas + Berita covers (placeholder until CMS upload). */
  labSoftware:
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
} as const

export type SiteMediaKey = keyof typeof SITE_MEDIA

/**
 * Resolve a Payload Media relation (populated object or ID) to a URL,
 * falling back to the given placeholder. Replaces the ad-hoc resolvers
 * previously duplicated across page.tsx and DosenClient.tsx.
 */
export function resolveMediaUrl(media: unknown, fallback: string): string {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    const url = (media as { url?: unknown }).url
    if (typeof url === 'string' && url.length > 0) return url
  }
  return fallback
}

/** External links that behave like media (single copy, no drift). */
export const SITE_LINKS = {
  curriculumDrive:
    'https://drive.google.com/file/d/1MBJ4e8JyA6YZPJl39maTZMhMiZ1B58SN/view?usp=sharing',
  pmb: 'https://spmb.umpo.ac.id/',
  portalUmpo: 'https://umpo.ac.id/',
} as const
