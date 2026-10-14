import { SITE_LINKS } from './siteMedia'

export interface FooterNavItem {
  label: string
  url: string
}

export interface FooterContent {
  description: string
  navTitle: string
  navItems: FooterNavItem[]
  contactTitle: string
  address: string
  phone: string
  phoneNote: string
  email: string
  copyrightText: string
  portalLabel: string
  portalUrl: string
  pmbLabel: string
  pmbUrl: string
}

export const FALLBACK_FOOTER_CONTENT: Record<'id' | 'en', FooterContent> = {
  id: {
    description:
      'Program Studi Sarjana (S1) Teknik Informatika Universitas Muhammadiyah Ponorogo. Mencetak lulusan yang unggul, inovatif, dan berakhlak mulia di bidang teknologi informasi.',
    navTitle: 'Navigasi',
    navItems: [
      { label: 'Beranda', url: '/' },
      { label: 'Profil Program Studi', url: '/profil' },
      { label: 'Akademik & Kurikulum', url: '/akademik' },
      { label: 'Jadwal Kuliah', url: '/akademik/jadwal-kuliah' },
      { label: 'Dosen & Tendik', url: '/dosen' },
      { label: 'Fasilitas Laboratorium', url: '/fasilitas' },
      { label: 'Berita & Pengumuman', url: '/berita' },
      { label: 'Pusat Unduhan', url: '/download' },
      { label: 'Kontak & Lokasi', url: '/profil#kontak' },
      { label: 'Pendaftaran Magang', url: '/pendaftaran/magang' },
    ],
    contactTitle: 'Kontak & Lokasi',
    address:
      'Kampus 1 Universitas Muhammadiyah Ponorogo\nJl. Budi Utomo No.10, Ronowijayan, Kec. Siman, Kabupaten Ponorogo, Jawa Timur 63471',
    phone: '+62 822-6786-8648',
    phoneNote: 'Sekretariat Prodi',
    email: 'informatika@umpo.ac.id',
    copyrightText: 'Teknik Informatika Universitas Muhammadiyah Ponorogo.',
    portalLabel: 'Portal UMPO',
    portalUrl: SITE_LINKS.portalUmpo,
    pmbLabel: 'PMB Online',
    pmbUrl: SITE_LINKS.pmb,
  },
  en: {
    description:
      'Undergraduate (S1) Informatics Engineering Study Program, Universitas Muhammadiyah Ponorogo. Cultivating excellent, innovative, and principled digital graduates.',
    navTitle: 'Navigation',
    navItems: [
      { label: 'Home', url: '/' },
      { label: 'Department Profile', url: '/profil' },
      { label: 'Academics & Curriculum', url: '/akademik' },
      { label: 'Class Schedule', url: '/akademik/jadwal-kuliah' },
      { label: 'Faculty & Staff', url: '/dosen' },
      { label: 'Laboratory Facilities', url: '/fasilitas' },
      { label: 'News & Announcements', url: '/berita' },
      { label: 'Download Center', url: '/download' },
      { label: 'Contact & Location', url: '/profil#kontak' },
      { label: 'Internship Registration', url: '/pendaftaran/magang' },
    ],
    contactTitle: 'Contact & Location',
    address:
      'Campus 1 Universitas Muhammadiyah Ponorogo\nJl. Budi Utomo No.10, Ronowijayan, Siman, Ponorogo, East Java 63471',
    phone: '+62 822-6786-8648',
    phoneNote: 'Department Secretariat',
    email: 'informatika@umpo.ac.id',
    copyrightText: 'Informatics Engineering Universitas Muhammadiyah Ponorogo.',
    portalLabel: 'UMPO Portal',
    portalUrl: SITE_LINKS.portalUmpo,
    pmbLabel: 'Online Admissions',
    pmbUrl: SITE_LINKS.pmb,
  },
}

/** Localize internal URL paths depending on locale */
export function localizeFooterHref(url: string, locale: 'id' | 'en'): string {
  if (!url || url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url
  }
  if (locale === 'en') {
    if (url === '/') return '/en'
    if (url.startsWith('/en')) return url
    return `/en${url}`
  }
  return url
}

export function resolveFooterContent(cmsData: any, locale: 'id' | 'en'): FooterContent {
  const fallback = FALLBACK_FOOTER_CONTENT[locale] || FALLBACK_FOOTER_CONTENT.id
  const baseData = cmsData || {}

  const rawNavItems =
    Array.isArray(baseData.navItems) && baseData.navItems.length > 0
      ? baseData.navItems
      : fallback.navItems

  const navItems = rawNavItems
    .filter((item: any) => item && item.label && item.url)
    .map((item: any) => ({
      label: item.label,
      url: localizeFooterHref(item.url, locale),
    }))

  return {
    description: baseData.description || fallback.description,
    navTitle: baseData.navTitle || fallback.navTitle,
    navItems: navItems.length > 0 ? navItems : fallback.navItems,
    contactTitle: baseData.contactTitle || fallback.contactTitle,
    address: baseData.address || fallback.address,
    phone: baseData.phone || fallback.phone,
    phoneNote: baseData.phoneNote || fallback.phoneNote,
    email: baseData.email || fallback.email,
    copyrightText: baseData.copyrightText || fallback.copyrightText,
    portalLabel: baseData.portalLabel || fallback.portalLabel,
    portalUrl: baseData.portalUrl || fallback.portalUrl,
    pmbLabel: baseData.pmbLabel || fallback.pmbLabel,
    pmbUrl: baseData.pmbUrl || fallback.pmbUrl,
  }
}
