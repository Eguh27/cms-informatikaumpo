export interface ProfileContent {
  // Banner & Breadcrumbs
  bannerTitle: string
  bannerSubtitle: string
  breadcrumbHome: string
  breadcrumbCurrent: string

  // Label 5 Tab
  tabSejarahLabel: string
  tabVisimisiLabel: string
  tabStrukturLabel: string
  tabAkreditasiLabel: string
  tabKontakLabel: string

  // Tab 1: Sejarah
  sejarahBadge: string
  sejarahTitle: string
  sejarahParagraph1: string
  sejarahParagraph2: string
  sejarahParagraph3: string
  btnNextTabLabel: string
  btnDosenLabel: string

  // Tab 1: Sidebar Legalitas
  sidebarLegalTag: string
  sidebarLegalTitle: string
  legal1Label: string
  legal1Value: string
  legal1Sub: string
  legal2Label: string
  legal2Value: string
  legal2Sub: string
  legal3Label: string
  legal3Value: string
  legal3Sub: string
  statNumber: string
  statCaption: string
}

export const FALLBACK_PROFILE_CONTENT: Record<'id' | 'en', ProfileContent> = {
  id: {
    bannerTitle: 'Profil Program Studi',
    bannerSubtitle:
      'Mengenal lebih dekat Program Studi S1 Teknik Informatika Universitas Muhammadiyah Ponorogo, sejarah pendirian, visi misi keunggulan, struktur organisasi, akreditasi resmi, dan kontak layanan.',
    breadcrumbHome: 'Beranda',
    breadcrumbCurrent: 'Profil Prodi',

    tabSejarahLabel: 'Sejarah Pendirian',
    tabVisimisiLabel: 'Visi, Misi & Tujuan',
    tabStrukturLabel: 'Struktur Organisasi',
    tabAkreditasiLabel: 'Akreditasi BAN-PT',
    tabKontakLabel: 'Kontak & Lokasi',

    sejarahBadge: 'SK Pendirian Resmi 12 September 2005',
    sejarahTitle: 'Dua Dekade Membangun Talenta Digital Berkarakter Islami',
    sejarahParagraph1:
      'Program Studi S1 Teknik Informatika merupakan salah satu program studi unggulan di lingkungan Fakultas Teknik Universitas Muhammadiyah Ponorogo. Berdiri secara resmi berdasarkan Surat Keputusan Ditjen DIKTI No. 378/D/T/2005 pada tanggal 12 September 2005.',
    sejarahParagraph2:
      'Sejak awal berdirinya, prodi ini didedikasikan untuk menjawab kebutuhan industri teknologi informasi yang berkembang pesat, khususnya di kawasan Jawa Timur bagian barat dan skala nasional. Melalui kombinasi pengajaran teori komputasi yang kokoh, praktikum intensif di laboratorium modern, serta penanaman etika profesi berbasis nilai keislaman, Teknik Informatika UMPO telah meluluskan ribuan sarjana komputasi yang berkiprah di perusahaan teknologi, BUMN, perbankan, instansi pemerintah, dan wirausaha digital.',
    sejarahParagraph3:
      'Kini, prodi terus bertransformasi dengan mengadopsi kurikulum Outcome-Based Education (OBE) yang terkoneksi langsung dengan keunggulan masa depan, khususnya dalam bidang Kecerdasan Buatan (Artificial Intelligence) dan Rekayasa Perangkat Lunak (Software Engineering).',
    btnNextTabLabel: 'Lanjut ke Visi Misi',
    btnDosenLabel: 'Lihat Tim Dosen Pengajar',

    sidebarLegalTag: 'Legalitas Institusi',
    sidebarLegalTitle: 'SK & Akreditasi Resmi',
    legal1Label: 'SK Pendirian DIKTI',
    legal1Value: '378/D/T/2005',
    legal1Sub: 'Tanggal 12 September 2005',
    legal2Label: 'Akreditasi BAN-PT',
    legal2Value: 'Peringkat B',
    legal2Sub: 'SK No. 3418/SK/BAN-PT/Akred/S/IX/2019',
    legal3Label: 'Gelar Lulusan',
    legal3Value: 'Sarjana Komputer (S.Kom.)',
    legal3Sub: 'Beban Studi 144 SKS (8 Semester)',
    statNumber: '20+ Tahun',
    statCaption: 'Dedikasi Pengabdian & Riset Komputasi',
  },
  en: {
    bannerTitle: 'Department Profile',
    bannerSubtitle:
      'Discover the Undergraduate (S1) Informatics Engineering Study Program at Universitas Muhammadiyah Ponorogo: founding history, vision and mission of excellence, organizational structure, official accreditation, and contact services.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Department Profile',

    tabSejarahLabel: 'Founding History',
    tabVisimisiLabel: 'Vision, Mission & Goals',
    tabStrukturLabel: 'Organizational Structure',
    tabAkreditasiLabel: 'BAN-PT Accreditation',
    tabKontakLabel: 'Contact & Location',

    sejarahBadge: 'Official Establishment Decree September 12, 2005',
    sejarahTitle: 'Two Decades of Nurturing Digital Talents with Islamic Character',
    sejarahParagraph1:
      'The Undergraduate (S1) Informatics Engineering Study Program is one of the premier programs in the Faculty of Engineering, Universitas Muhammadiyah Ponorogo. Officially established under the Directorate General of Higher Education (Ditjen DIKTI) Decree No. 378/D/T/2005 on September 12, 2005.',
    sejarahParagraph2:
      'Since its inception, the department has been dedicated to answering the rapidly growing demands of the information technology industry, particularly across western East Java and on a national scale. Combining robust computational theory, intensive practicums in modern laboratories, and professional ethics rooted in Islamic values, Informatics Engineering UMPO has graduated thousands of computing professionals flourishing in tech companies, state-owned enterprises, banking, government agencies, and digital entrepreneurship.',
    sejarahParagraph3:
      'Today, the program continues its forward transformation by adopting an Outcome-Based Education (OBE) curriculum directly connected to future frontiers, particularly Artificial Intelligence and Software Engineering.',
    btnNextTabLabel: 'Continue to Vision & Mission',
    btnDosenLabel: 'View Faculty Members',

    sidebarLegalTag: 'Institutional Legality',
    sidebarLegalTitle: 'Official Decree & Accreditation',
    legal1Label: 'DIKTI Establishment Decree',
    legal1Value: '378/D/T/2005',
    legal1Sub: 'Dated September 12, 2005',
    legal2Label: 'BAN-PT Accreditation',
    legal2Value: 'Rank B',
    legal2Sub: 'Decree No. 3418/SK/BAN-PT/Akred/S/IX/2019',
    legal3Label: 'Academic Degree',
    legal3Value: 'Bachelor of Computer Science (S.Kom.)',
    legal3Sub: 'Study Load 144 Credits (8 Semesters)',
    statNumber: '20+ Years',
    statCaption: 'Dedication to Service & Computing Research',
  },
}

export function resolveProfileContent(cmsData: any, locale: 'id' | 'en'): ProfileContent {
  const fallback = FALLBACK_PROFILE_CONTENT[locale] || FALLBACK_PROFILE_CONTENT.id
  const d = cmsData || {}

  return {
    bannerTitle: d.bannerTitle || fallback.bannerTitle,
    bannerSubtitle: d.bannerSubtitle || fallback.bannerSubtitle,
    breadcrumbHome: d.breadcrumbHome || fallback.breadcrumbHome,
    breadcrumbCurrent: d.breadcrumbCurrent || fallback.breadcrumbCurrent,

    tabSejarahLabel: d.tabSejarahLabel || fallback.tabSejarahLabel,
    tabVisimisiLabel: d.tabVisimisiLabel || fallback.tabVisimisiLabel,
    tabStrukturLabel: d.tabStrukturLabel || fallback.tabStrukturLabel,
    tabAkreditasiLabel: d.tabAkreditasiLabel || fallback.tabAkreditasiLabel,
    tabKontakLabel: d.tabKontakLabel || fallback.tabKontakLabel,

    sejarahBadge: d.sejarahBadge || fallback.sejarahBadge,
    sejarahTitle: d.sejarahTitle || fallback.sejarahTitle,
    sejarahParagraph1: d.sejarahParagraph1 || fallback.sejarahParagraph1,
    sejarahParagraph2: d.sejarahParagraph2 || fallback.sejarahParagraph2,
    sejarahParagraph3: d.sejarahParagraph3 || fallback.sejarahParagraph3,
    btnNextTabLabel: d.btnNextTabLabel || fallback.btnNextTabLabel,
    btnDosenLabel: d.btnDosenLabel || fallback.btnDosenLabel,

    sidebarLegalTag: d.sidebarLegalTag || fallback.sidebarLegalTag,
    sidebarLegalTitle: d.sidebarLegalTitle || fallback.sidebarLegalTitle,
    legal1Label: d.legal1Label || fallback.legal1Label,
    legal1Value: d.legal1Value || fallback.legal1Value,
    legal1Sub: d.legal1Sub || fallback.legal1Sub,
    legal2Label: d.legal2Label || fallback.legal2Label,
    legal2Value: d.legal2Value || fallback.legal2Value,
    legal2Sub: d.legal2Sub || fallback.legal2Sub,
    legal3Label: d.legal3Label || fallback.legal3Label,
    legal3Value: d.legal3Value || fallback.legal3Value,
    legal3Sub: d.legal3Sub || fallback.legal3Sub,
    statNumber: d.statNumber || fallback.statNumber,
    statCaption: d.statCaption || fallback.statCaption,
  }
}
