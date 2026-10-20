export interface DosenPageContent {
  // Banner & Navigasi
  bannerCategory: string
  bannerTitle: string
  bannerSubtitle: string
  breadcrumbHome: string
  breadcrumbCurrent: string

  // Filter & Pencarian
  tabSemua: string
  tabPimpinan: string
  tabLab: string
  tabDosen: string
  searchPlaceholder: string
  searchAriaLabel: string
  counterShowing: string
  counterOf: string
  counterLecturers: string
  counterForKeyword: string
  resetFilterBtn: string

  // Kartu Dosen & Kontak
  badgePimpinan: string
  badgeLab: string
  badgeDosen: string
  pddiktiTooltip: string
  researchAreaLabel: string
  waButtonLabel: string
  waDefaultMessage: string
  emailButtonLabel: string

  // State Kosong
  emptyTitle: string
  emptyDesc: string
  resetSearchBtn: string

  // Pengaturan SEO
  metaTitle: string
  metaDescription: string
}

export const FALLBACK_DOSEN_CONTENT: Record<'id' | 'en', DosenPageContent> = {
  id: {
    bannerCategory: 'Tenaga Pendidik & Peneliti',
    bannerTitle: 'Dosen & Peneliti Profesional',
    bannerSubtitle:
      'Belajar langsung dari akademisi berpendidikan S2 dan S3 yang aktif meneliti, membimbing, dan membawa pengalaman industri ke dalam kelas.',
    breadcrumbHome: 'Beranda',
    breadcrumbCurrent: 'Dosen & Tendik',

    tabSemua: 'Semua Dosen',
    tabPimpinan: 'Pimpinan Prodi',
    tabLab: 'Ka. Laboratorium',
    tabDosen: 'Dosen Pengajar',
    searchPlaceholder: 'Cari nama dosen, NIDN, kepakaran...',
    searchAriaLabel: 'Cari nama dosen, NIDN, atau bidang kepakaran',
    counterShowing: 'Menampilkan',
    counterOf: 'dari',
    counterLecturers: 'dosen',
    counterForKeyword: 'untuk kata kunci',
    resetFilterBtn: 'Reset Filter',

    badgePimpinan: 'Pimpinan',
    badgeLab: 'Ka. Lab',
    badgeDosen: 'Dosen',
    pddiktiTooltip: 'Dosen Tetap Terverifikasi PDDIKTI',
    researchAreaLabel: 'Bidang Riset & Fokus',
    waButtonLabel: 'WhatsApp',
    waDefaultMessage: 'Halo, saya ingin bertanya mengenai program studi Teknik Informatika.',
    emailButtonLabel: 'Email',

    emptyTitle: 'Dosen tidak ditemukan',
    emptyDesc: 'Tidak ada data dosen yang sesuai dengan kata kunci',
    resetSearchBtn: 'Reset Pencarian',

    metaTitle: 'Dosen & Peneliti | Teknik Informatika UMPO',
    metaDescription:
      'Direktori dosen tetap dan tenaga pengajar Program Studi S1 Teknik Informatika Fakultas Teknik Universitas Muhammadiyah Ponorogo.',
  },
  en: {
    bannerCategory: 'Faculty & Researchers',
    bannerTitle: 'Professional Lecturers & Researchers',
    bannerSubtitle:
      'Learn directly from master and doctoral-educated academics who actively research, mentor, and bring industry experience to the classroom.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Faculty & Staff',

    tabSemua: 'All Lecturers',
    tabPimpinan: 'Department Leadership',
    tabLab: 'Lab Heads',
    tabDosen: 'Faculty Members',
    searchPlaceholder: 'Search lecturer name, NIDN, expertise...',
    searchAriaLabel: 'Search lecturer name, NIDN, or research expertise',
    counterShowing: 'Showing',
    counterOf: 'of',
    counterLecturers: 'lecturers',
    counterForKeyword: 'for keyword',
    resetFilterBtn: 'Reset Filter',

    badgePimpinan: 'Leadership',
    badgeLab: 'Lab Head',
    badgeDosen: 'Lecturer',
    pddiktiTooltip: 'Verified Permanent Lecturer (PDDIKTI)',
    researchAreaLabel: 'Research & Expertise Area',
    waButtonLabel: 'WhatsApp',
    waDefaultMessage: 'Hello, I would like to inquire about the Informatics Engineering study program.',
    emailButtonLabel: 'Email',

    emptyTitle: 'No lecturers found',
    emptyDesc: 'No lecturer matches the keyword',
    resetSearchBtn: 'Reset Search',

    metaTitle: 'Faculty & Researchers | Informatics Engineering UMPO',
    metaDescription:
      'Faculty members and researchers directory of the Undergraduate (S1) Informatics Engineering Department, Universitas Muhammadiyah Ponorogo.',
  },
}

export function resolveDosenContent(
  cmsData: any,
  locale: 'id' | 'en' = 'id'
): DosenPageContent {
  const fallback = FALLBACK_DOSEN_CONTENT[locale] || FALLBACK_DOSEN_CONTENT.id
  if (!cmsData) return fallback

  return {
    bannerCategory: cmsData.bannerCategory || fallback.bannerCategory,
    bannerTitle: cmsData.bannerTitle || fallback.bannerTitle,
    bannerSubtitle: cmsData.bannerSubtitle || fallback.bannerSubtitle,
    breadcrumbHome: cmsData.breadcrumbHome || fallback.breadcrumbHome,
    breadcrumbCurrent: cmsData.breadcrumbCurrent || fallback.breadcrumbCurrent,

    tabSemua: cmsData.tabSemua || fallback.tabSemua,
    tabPimpinan: cmsData.tabPimpinan || fallback.tabPimpinan,
    tabLab: cmsData.tabLab || fallback.tabLab,
    tabDosen: cmsData.tabDosen || fallback.tabDosen,
    searchPlaceholder: cmsData.searchPlaceholder || fallback.searchPlaceholder,
    searchAriaLabel: cmsData.searchAriaLabel || fallback.searchAriaLabel,
    counterShowing: cmsData.counterShowing || fallback.counterShowing,
    counterOf: cmsData.counterOf || fallback.counterOf,
    counterLecturers: cmsData.counterLecturers || fallback.counterLecturers,
    counterForKeyword: cmsData.counterForKeyword || fallback.counterForKeyword,
    resetFilterBtn: cmsData.resetFilterBtn || fallback.resetFilterBtn,

    badgePimpinan: cmsData.badgePimpinan || fallback.badgePimpinan,
    badgeLab: cmsData.badgeLab || fallback.badgeLab,
    badgeDosen: cmsData.badgeDosen || fallback.badgeDosen,
    pddiktiTooltip: cmsData.pddiktiTooltip || fallback.pddiktiTooltip,
    researchAreaLabel: cmsData.researchAreaLabel || fallback.researchAreaLabel,
    waButtonLabel: cmsData.waButtonLabel || fallback.waButtonLabel,
    waDefaultMessage: cmsData.waDefaultMessage || fallback.waDefaultMessage,
    emailButtonLabel: cmsData.emailButtonLabel || fallback.emailButtonLabel,

    emptyTitle: cmsData.emptyTitle || fallback.emptyTitle,
    emptyDesc: cmsData.emptyDesc || fallback.emptyDesc,
    resetSearchBtn: cmsData.resetSearchBtn || fallback.resetSearchBtn,

    metaTitle: cmsData.metaTitle || fallback.metaTitle,
    metaDescription: cmsData.metaDescription || fallback.metaDescription,
  }
}

/**
 * Smart Academic Dictionary for standard Indonesian roles in UMPO
 */
const ROLE_DICTIONARY: Record<string, string> = {
  'ka. prodi teknik informatika': 'Head of Informatics Engineering Study Program',
  'ketua prodi teknik informatika': 'Head of Informatics Engineering Study Program',
  'sekretaris prodi teknik informatika': 'Secretary of Informatics Engineering Study Program',
  'ka. lab jaringan komputer & iot': 'Head of Computer Networks & IoT Laboratory',
  'ka. lab prodi teknik informatika': 'Head of Informatics Engineering Laboratory',
  'ka. lab rpl & komputer': 'Head of Software Engineering & Computing Lab',
  'dosen tetap': 'Permanent Lecturer',
  'dosen': 'Lecturer',
}

export function localizeLecturerRole(role: string | null | undefined, locale: 'id' | 'en'): string {
  if (!role) return ''
  if (locale === 'id') return role

  const clean = role.trim().toLowerCase()
  if (ROLE_DICTIONARY[clean]) {
    return ROLE_DICTIONARY[clean]
  }

  // Fuzzy matches
  if (clean.includes('ka. prodi') || clean.includes('ketua prodi')) {
    return 'Head of Study Program'
  }
  if (clean.includes('sekretaris prodi') || clean.includes('sekprodi')) {
    return 'Department Secretary'
  }
  if (clean.includes('ka. lab jaringan') || (clean.includes('lab') && clean.includes('iot'))) {
    return 'Head of Computer Networks & IoT Lab'
  }
  if (clean.includes('ka. lab rpl') || (clean.includes('lab') && clean.includes('perangkat lunak'))) {
    return 'Head of Software Engineering Lab'
  }
  if (clean.includes('ka. lab')) {
    return 'Head of Laboratory'
  }
  if (clean.includes('dosen tetap')) {
    return 'Permanent Lecturer'
  }
  if (clean.includes('dosen')) {
    return 'Lecturer'
  }

  return role
}

export function localizeLecturerFocus(focus: string | null | undefined, locale: 'id' | 'en'): string | null | undefined {
  if (!focus) return focus
  if (locale === 'id') return focus

  // Common Indonesian research keywords translated to English
  let translated = focus
  const mappings: Array<[RegExp, string]> = [
    [/\bjaringan komputer\b/gi, 'Computer Networks'],
    [/\brekayasa perangkat lunak\b/gi, 'Software Engineering'],
    [/\bsistem informasi\b/gi, 'Information Systems'],
    [/\bbasis data\b/gi, 'Databases'],
    [/\bkecerdasan buatan\b/gi, 'Artificial Intelligence'],
    [/\bpembelajaran mesin\b/gi, 'Machine Learning'],
    [/\bpemrograman web\b/gi, 'Web Programming'],
    [/\bpemrograman mobile\b/gi, 'Mobile Programming'],
    [/\bkeamanan siber\b/gi, 'Cyber Security'],
    [/\bpengolahan citra digital\b/gi, 'Digital Image Processing'],
    [/\bsistem tertanam\b/gi, 'Embedded Systems'],
    [/\bkomputasi awan\b/gi, 'Cloud Computing'],
    [/\bsains data\b/gi, 'Data Science'],
  ]

  for (const [regex, replacement] of mappings) {
    translated = translated.replace(regex, replacement)
  }

  return translated
}
