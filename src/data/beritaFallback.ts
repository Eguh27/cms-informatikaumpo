export interface BeritaPageContent {
  // Banner & Navigasi
  bannerCategory: string
  bannerTitle: string
  bannerSubtitle: string
  breadcrumbHome: string
  breadcrumbCurrent: string

  // Filter & Kontrol UI
  filterAllLabel: string
  searchPlaceholder: string
  readTimePrefix: string
  readMoreLabel: string

  // Empty State
  emptyTitle: string
  emptyDesc: string
  emptyResetLabel: string

  // Halaman Detail UI
  detailBackLabel: string
  detailRelatedTitle: string
  detailAllNewsLabel: string
  detailEmptyContent: string

  // SEO
  metaTitle: string
  metaDescription: string
}

export const FALLBACK_BERITA_CONTENT: Record<'id' | 'en', BeritaPageContent> = {
  id: {
    // Banner & Navigasi
    bannerCategory: 'Warta & Informasi',
    bannerTitle: 'Berita & Pengumuman Resmi',
    bannerSubtitle:
      'Dapatkan informasi terbaru seputar agenda seminar, lokakarya, capaian prestasi mahasiswa, dan pengumuman akademik Teknik Informatika UMPO.',
    breadcrumbHome: 'Beranda',
    breadcrumbCurrent: 'Berita & Pengumuman',

    // Filter & Kontrol UI
    filterAllLabel: 'Semua',
    searchPlaceholder: 'Cari berita atau agenda...',
    readTimePrefix: 'mnt baca',
    readMoreLabel: 'Baca Selengkapnya',

    // Empty State
    emptyTitle: 'Tidak ada berita yang cocok',
    emptyDesc: 'Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.',
    emptyResetLabel: 'Reset Pencarian',

    // Halaman Detail UI
    detailBackLabel: 'Kembali ke Indeks Berita',
    detailRelatedTitle: 'Berita Terkait',
    detailAllNewsLabel: 'Lihat Semua Berita →',
    detailEmptyContent: 'Konten lengkap belum tersedia untuk berita ini.',

    // SEO
    metaTitle: 'Berita & Pengumuman Resmi | Teknik Informatika UMPO',
    metaDescription:
      'Warta, informasi terkini, agenda seminar, dan pengumuman akademik Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo.',
  },
  en: {
    // Banner & Navigasi
    bannerCategory: 'News & Updates',
    bannerTitle: 'Official News & Announcements',
    bannerSubtitle:
      'Stay updated with the latest news on seminars, workshops, student achievements, and academic announcements from Informatics Engineering UMPO.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'News & Announcements',

    // Filter & Kontrol UI
    filterAllLabel: 'All',
    searchPlaceholder: 'Search news or events...',
    readTimePrefix: 'min read',
    readMoreLabel: 'Read More',

    // Empty State
    emptyTitle: 'No matching news found',
    emptyDesc: 'Try changing your search keywords or select a different category.',
    emptyResetLabel: 'Reset Search',

    // Halaman Detail UI
    detailBackLabel: 'Back to News Index',
    detailRelatedTitle: 'Related News',
    detailAllNewsLabel: 'View All News →',
    detailEmptyContent: 'Full content is not yet available for this article.',

    // SEO
    metaTitle: 'Official News & Announcements | Informatics Engineering UMPO',
    metaDescription:
      'Latest news, updates, seminar agendas, and academic announcements of the Informatics Engineering Study Program, Universitas Muhammadiyah Ponorogo.',
  },
}

export function resolveBeritaContent(
  cmsData: any,
  locale: 'id' | 'en' = 'id'
): BeritaPageContent {
  const fallback = FALLBACK_BERITA_CONTENT[locale] || FALLBACK_BERITA_CONTENT.id

  if (!cmsData) return fallback

  return {
    bannerCategory: cmsData.bannerCategory || fallback.bannerCategory,
    bannerTitle: cmsData.bannerTitle || fallback.bannerTitle,
    bannerSubtitle: cmsData.bannerSubtitle || fallback.bannerSubtitle,
    breadcrumbHome: cmsData.breadcrumbHome || fallback.breadcrumbHome,
    breadcrumbCurrent: cmsData.breadcrumbCurrent || fallback.breadcrumbCurrent,

    filterAllLabel: cmsData.filterAllLabel || fallback.filterAllLabel,
    searchPlaceholder: cmsData.searchPlaceholder || fallback.searchPlaceholder,
    readTimePrefix: cmsData.readTimePrefix || fallback.readTimePrefix,
    readMoreLabel: cmsData.readMoreLabel || fallback.readMoreLabel,

    emptyTitle: cmsData.emptyTitle || fallback.emptyTitle,
    emptyDesc: cmsData.emptyDesc || fallback.emptyDesc,
    emptyResetLabel: cmsData.emptyResetLabel || fallback.emptyResetLabel,

    detailBackLabel: cmsData.detailBackLabel || fallback.detailBackLabel,
    detailRelatedTitle: cmsData.detailRelatedTitle || fallback.detailRelatedTitle,
    detailAllNewsLabel: cmsData.detailAllNewsLabel || fallback.detailAllNewsLabel,
    detailEmptyContent: cmsData.detailEmptyContent || fallback.detailEmptyContent,

    metaTitle: cmsData.metaTitle || fallback.metaTitle,
    metaDescription: cmsData.metaDescription || fallback.metaDescription,
  }
}
