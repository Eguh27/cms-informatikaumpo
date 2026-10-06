import { getCachedGlobal } from '@/utilities/getGlobals'
import { SITE_MEDIA, resolveMediaUrl } from '@/data/siteMedia'

export interface ResolvedSiteMedia {
  logo: string
  heroBuilding: string
  heroCloud: string
  himatifBanner: string
}

/**
 * Site imagery with CMS override.
 * Reads the `site-media` Payload Global (depth 1 to populate uploads);
 * any empty field falls back to the dummy constants in `@/data/siteMedia`,
 * so the site renders identically before anything is uploaded in admin.
 */
export async function getSiteMedia(): Promise<ResolvedSiteMedia> {
  try {
    const global = await getCachedGlobal('site-media', 1)()
    return {
      logo: resolveMediaUrl(global?.logo, SITE_MEDIA.logoUmpo),
      heroBuilding: resolveMediaUrl(global?.heroBuilding, SITE_MEDIA.heroBuilding),
      heroCloud: resolveMediaUrl(global?.heroCloud, SITE_MEDIA.heroCloud),
      himatifBanner: resolveMediaUrl(global?.himatifBanner, SITE_MEDIA.himatifBanner),
    }
  } catch {
    return {
      logo: SITE_MEDIA.logoUmpo,
      heroBuilding: SITE_MEDIA.heroBuilding,
      heroCloud: SITE_MEDIA.heroCloud,
      himatifBanner: SITE_MEDIA.himatifBanner,
    }
  }
}
