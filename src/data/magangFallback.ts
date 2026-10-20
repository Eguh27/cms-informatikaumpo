export interface MagangPageContent {
  // Banner & Navigasi
  bannerCategory: string
  bannerTitle: string
  bannerSubtitle: string
  breadcrumbHome: string
  breadcrumbCurrent: string

  // Syarat & Alur Magang
  termsTitle: string
  termsDesc: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string

  // Berkas Unduhan & UI
  docsSectionTitle: string
  docsEmptyText: string
  docsNoteText: string
  btnDownloadLabel: string
  btnComingSoonLabel: string
  btnBackHomeLabel: string

  // SEO
  metaTitle: string
  metaDescription: string
}

export const FALLBACK_MAGANG_CONTENT: Record<'id' | 'en', MagangPageContent> = {
  id: {
    bannerCategory: 'Pendaftaran Layanan Akademik',
    bannerTitle: 'Pendaftaran Magang',
    bannerSubtitle:
      'Kerja Praktik di perusahaan mitra: syarat, alur pengajuan, dan berkas yang wajib disiapkan.',
    breadcrumbHome: 'Beranda',
    breadcrumbCurrent: 'Pendaftaran Magang',

    termsTitle: 'Magang untuk semester 6–7',
    termsDesc:
      'Mahasiswa yang sudah lulus 100 SKS dapat mengajukan Kerja Praktik ke perusahaan mitra prodi. Proposal diajukan ke koordinator magang, disetujui dosen wali, baru diterbitkan surat pengantar resmi.',
    step1Title: 'Siapkan proposal',
    step1Desc: 'Topik, profil perusahaan, dan dosen pembimbing yang dituju.',
    step2Title: 'Serahkan ke koordinator',
    step2Desc: 'Bawa proposal + transkrip sementara ke sekretariat prodi.',
    step3Title: 'Terima surat pengantar',
    step3Desc: 'Prodi menerbitkan surat resmi ke perusahaan mitra.',

    docsSectionTitle: 'Berkas dari prodi',
    docsEmptyText:
      'Belum ada berkas magang di CMS. Template proposal dan surat pengantar bisa diminta langsung ke sekretariat prodi (Gedung Fakultas Teknik Lt. 2).',
    docsNoteText:
      'Formulir pendaftaran daring menyusul di halaman ini — admin cukup menerbitkan Page CMS berslug pendaftaran-magang berisi blok Formulir, tanpa perlu ubah kode.',
    btnDownloadLabel: 'Unduh',
    btnComingSoonLabel: 'Segera',
    btnBackHomeLabel: 'Kembali ke Beranda',

    metaTitle: 'Pendaftaran Magang | Teknik Informatika UMPO',
    metaDescription:
      'Alur, syarat, dan berkas pendaftaran magang / Kerja Praktik mahasiswa Teknik Informatika UMPO.',
  },
  en: {
    bannerCategory: 'Academic Registration Services',
    bannerTitle: 'Internship Registration',
    bannerSubtitle:
      'Industry Practical Work at partner companies: requirements, submission flow, and mandatory documents.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Internship Registration',

    termsTitle: 'Internship for Semesters 6–7',
    termsDesc:
      'Students who have completed 100 credits can apply for Practical Work at partner companies. Proposals are submitted to the coordinator, approved by the academic advisor, before official cover letters are issued.',
    step1Title: 'Prepare the proposal',
    step1Desc: 'Topic, company profile, and targeted academic advisor.',
    step2Title: 'Submit to coordinator',
    step2Desc: 'Bring the proposal and provisional transcript to the department secretariat.',
    step3Title: 'Receive cover letter',
    step3Desc: 'The department issues an official letter to the partner company.',

    docsSectionTitle: 'Official Department Documents',
    docsEmptyText:
      'No internship files are available in the CMS yet. Proposal templates and cover letters can be requested directly at the department secretariat (Faculty of Engineering, 2nd Floor).',
    docsNoteText:
      'Online registration form is coming soon on this page — administrators can publish a CMS Page with slug pendaftaran-magang containing a Form block without any code changes.',
    btnDownloadLabel: 'Download',
    btnComingSoonLabel: 'Coming Soon',
    btnBackHomeLabel: 'Back to Home',

    metaTitle: 'Internship Registration | Informatics Engineering UMPO',
    metaDescription:
      'Workflow, requirements, and registration documents for student internship / practical work at Informatics Engineering UMPO.',
  },
}

export function resolveMagangContent(
  cmsData: any,
  locale: 'id' | 'en' = 'id'
): MagangPageContent {
  const fallback = FALLBACK_MAGANG_CONTENT[locale] || FALLBACK_MAGANG_CONTENT.id

  if (!cmsData) return fallback

  return {
    bannerCategory: cmsData.bannerCategory || fallback.bannerCategory,
    bannerTitle: cmsData.bannerTitle || fallback.bannerTitle,
    bannerSubtitle: cmsData.bannerSubtitle || fallback.bannerSubtitle,
    breadcrumbHome: cmsData.breadcrumbHome || fallback.breadcrumbHome,
    breadcrumbCurrent: cmsData.breadcrumbCurrent || fallback.breadcrumbCurrent,

    termsTitle: cmsData.termsTitle || fallback.termsTitle,
    termsDesc: cmsData.termsDesc || fallback.termsDesc,
    step1Title: cmsData.step1Title || fallback.step1Title,
    step1Desc: cmsData.step1Desc || fallback.step1Desc,
    step2Title: cmsData.step2Title || fallback.step2Title,
    step2Desc: cmsData.step2Desc || fallback.step2Desc,
    step3Title: cmsData.step3Title || fallback.step3Title,
    step3Desc: cmsData.step3Desc || fallback.step3Desc,

    docsSectionTitle: cmsData.docsSectionTitle || fallback.docsSectionTitle,
    docsEmptyText: cmsData.docsEmptyText || fallback.docsEmptyText,
    docsNoteText: cmsData.docsNoteText || fallback.docsNoteText,
    btnDownloadLabel: cmsData.btnDownloadLabel || fallback.btnDownloadLabel,
    btnComingSoonLabel: cmsData.btnComingSoonLabel || fallback.btnComingSoonLabel,
    btnBackHomeLabel: cmsData.btnBackHomeLabel || fallback.btnBackHomeLabel,

    metaTitle: cmsData.metaTitle || fallback.metaTitle,
    metaDescription: cmsData.metaDescription || fallback.metaDescription,
  }
}
