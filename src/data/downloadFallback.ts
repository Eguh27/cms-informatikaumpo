export interface DownloadPageContent {
  // Banner & Navigasi
  bannerCategory: string
  bannerTitle: string
  bannerSubtitle: string
  breadcrumbHome: string
  breadcrumbCurrent: string

  // Filter & Kontrol UI
  filterAllLabel: string
  searchPlaceholder: string
  btnDownloadLabel: string
  btnComingSoonLabel: string

  // Empty State
  emptyTitle: string
  emptyDesc: string

  // Panduan Administrasi
  guideTag: string
  guideTitle: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string

  // SEO
  metaTitle: string
  metaDescription: string
}

export const DOWNLOAD_CATEGORY_LABELS: Record<'id' | 'en', Record<string, string>> = {
  id: {
    Semua: 'Semua',
    Pedoman: 'Pedoman',
    Skripsi: 'Skripsi',
    Magang: 'Magang',
    KKN: 'KKN',
    'Jadwal Kuliah': 'Jadwal Kuliah',
    Publikasi: 'Publikasi',
  },
  en: {
    Semua: 'All',
    Pedoman: 'Guidelines',
    Skripsi: 'Thesis',
    Magang: 'Internship',
    KKN: 'Community Service',
    'Jadwal Kuliah': 'Class Schedule',
    Publikasi: 'Publications',
  },
}

export const FALLBACK_DOWNLOAD_CONTENT: Record<'id' | 'en', DownloadPageContent> = {
  id: {
    bannerCategory: 'Layanan Mahasiswa & Dosen',
    bannerTitle: 'Pusat Unduhan Dokumen Resmi',
    bannerSubtitle:
      'Unduh buku pedoman akademik, template skripsi SISKRIP, formulir kerja praktik/magang, dan template jurnal resmi Program Studi S1 Teknik Informatika UMPO.',
    breadcrumbHome: 'Beranda',
    breadcrumbCurrent: 'Pusat Unduhan',

    filterAllLabel: 'Semua',
    searchPlaceholder: 'Cari nama formulir atau template...',
    btnDownloadLabel: 'Unduh',
    btnComingSoonLabel: 'Segera',

    emptyTitle: 'Dokumen tidak ditemukan',
    emptyDesc: 'Tidak ada dokumen yang cocok dengan kata kunci pencarian.',

    guideTag: 'Panduan Administrasi',
    guideTitle: 'Prosedur Pengajuan & Pengunggahan Dokumen Akademik',
    step1Title: '1. Unduh & Isi Template',
    step1Desc:
      'Gunakan template resmi terbaru tanpa mengubah format tata letak, margin, dan jenis huruf yang telah distandarisasi prodi.',
    step2Title: '2. Verifikasi Dosen PA / Pembimbing',
    step2Desc:
      'Konsultasikan dokumen Anda kepada Dosen Pembimbing Akademik (PA) atau Pembimbing Skripsi untuk mendapatkan persetujuan.',
    step3Title: '3. Unggah ke SIMTIK / SISKRIP',
    step3Desc:
      'Unggah berkas dalam format PDF melalui portal resmi SISKRIP atau sampaikan ke tata usaha Fakultas Teknik UMPO.',

    metaTitle: 'Pusat Unduhan Dokumen Resmi | Teknik Informatika UMPO',
    metaDescription:
      'Pusat unduhan buku pedoman akademik, template skripsi, formulir magang, dan dokumen resmi Program Studi S1 Teknik Informatika Universitas Muhammadiyah Ponorogo.',
  },
  en: {
    bannerCategory: 'Student & Faculty Services',
    bannerTitle: 'Official Document Download Center',
    bannerSubtitle:
      'Download academic handbooks, SISKRIP thesis templates, internship practical forms, and official journal templates of the S1 Informatics Engineering Study Program UMPO.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Download Center',

    filterAllLabel: 'All',
    searchPlaceholder: 'Search forms or document templates...',
    btnDownloadLabel: 'Download',
    btnComingSoonLabel: 'Coming Soon',

    emptyTitle: 'No documents found',
    emptyDesc: 'No documents match your search keyword.',

    guideTag: 'Administrative Guide',
    guideTitle: 'Academic Document Submission & Upload Procedure',
    step1Title: '1. Download & Complete Template',
    step1Desc:
      'Use the latest official template without modifying the standardized layout, margins, and font families established by the department.',
    step2Title: '2. Academic Advisor Verification',
    step2Desc:
      'Consult and review your documents with your Academic Advisor (PA) or Thesis Supervisor to obtain formal approval.',
    step3Title: '3. Upload to SIMTIK / SISKRIP',
    step3Desc:
      'Upload the file in PDF format via the official SISKRIP portal or submit it to the administrative office of the Faculty of Engineering UMPO.',

    metaTitle: 'Official Document Download Center | Informatics Engineering UMPO',
    metaDescription:
      'Official download center for academic handbooks, thesis templates, internship forms, and documents of the Informatics Engineering Study Program, Universitas Muhammadiyah Ponorogo.',
  },
}

export function resolveDownloadContent(
  cmsData: any,
  locale: 'id' | 'en' = 'id'
): DownloadPageContent {
  const fallback = FALLBACK_DOWNLOAD_CONTENT[locale] || FALLBACK_DOWNLOAD_CONTENT.id

  if (!cmsData) return fallback

  return {
    bannerCategory: cmsData.bannerCategory || fallback.bannerCategory,
    bannerTitle: cmsData.bannerTitle || fallback.bannerTitle,
    bannerSubtitle: cmsData.bannerSubtitle || fallback.bannerSubtitle,
    breadcrumbHome: cmsData.breadcrumbHome || fallback.breadcrumbHome,
    breadcrumbCurrent: cmsData.breadcrumbCurrent || fallback.breadcrumbCurrent,

    filterAllLabel: cmsData.filterAllLabel || fallback.filterAllLabel,
    searchPlaceholder: cmsData.searchPlaceholder || fallback.searchPlaceholder,
    btnDownloadLabel: cmsData.btnDownloadLabel || fallback.btnDownloadLabel,
    btnComingSoonLabel: cmsData.btnComingSoonLabel || fallback.btnComingSoonLabel,

    emptyTitle: cmsData.emptyTitle || fallback.emptyTitle,
    emptyDesc: cmsData.emptyDesc || fallback.emptyDesc,

    guideTag: cmsData.guideTag || fallback.guideTag,
    guideTitle: cmsData.guideTitle || fallback.guideTitle,
    step1Title: cmsData.step1Title || fallback.step1Title,
    step1Desc: cmsData.step1Desc || fallback.step1Desc,
    step2Title: cmsData.step2Title || fallback.step2Title,
    step2Desc: cmsData.step2Desc || fallback.step2Desc,
    step3Title: cmsData.step3Title || fallback.step3Title,
    step3Desc: cmsData.step3Desc || fallback.step3Desc,

    metaTitle: cmsData.metaTitle || fallback.metaTitle,
    metaDescription: cmsData.metaDescription || fallback.metaDescription,
  }
}
