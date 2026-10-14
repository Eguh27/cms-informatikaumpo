export interface HomeContent {
  // Hero
  heroTitle: string
  heroLead: string
  heroPrimaryCtaText: string
  heroSecondaryCtaText: string
  heroScrollCue: string
  stats: Array<[string, string]> // [value, label]

  // Profile
  profileSectionTag: string
  profileTitle: string
  profileDescription: string
  btnHistoryText: string
  btnVisiMisiText: string
  degreeTag: string
  degreeTitle: string
  degreeQuote: string
  quickStat1Number: string
  quickStat1Title: string
  quickStat1Desc: string
  quickStat2Number: string
  quickStat2Title: string
  quickStat2Desc: string

  // Curriculum
  curriculumSectionTag: string
  curriculumTitle: string
  curriculumDescription: string
  driveCardTitle: string
  driveCardSubtitle: string
  driveBtnText: string

  // HIMATIF
  himatifSectionTag: string
  himatifTitle: string
  himatifDescription: string
  himatifBtnText: string
  himatifUrl: string

  // Facility
  facilitySectionTag: string
  facilityTitle: string
  facilityDescription: string
  facility1Title: string
  facility1Desc: string
  facility1Foot: string
  facility2Title: string
  facility2Desc: string
  facility2Foot: string
  facility3Title: string
  facility3Desc: string
  facility3Foot: string
  facility3Link: string

  // CTA
  ctaTitle: string
  ctaDescription: string
  ctaPrimaryBtnText: string
  ctaPrimaryBtnUrl: string
  ctaSecondaryBtnText: string
  ctaSecondaryBtnUrl: string
}

export const FALLBACK_HOME_CONTENT: Record<'id' | 'en', HomeContent> = {
  id: {
    heroTitle: 'Teknik Informatika UNMUH Ponorogo',
    heroLead: 'Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo, menghubungkan teknologi, kreativitas, dan dampak nyata berbasis nilai-nilai keislaman.',
    heroPrimaryCtaText: 'Eksplorasi Kurikulum',
    heroSecondaryCtaText: 'Profil & Visi Keilmuan',
    heroScrollCue: 'Jelajahi',
    stats: [
      ['B', 'Akreditasi BAN-PT'],
      ['800+', 'Mahasiswa aktif'],
      ['30+', 'Dosen & tendik'],
      ['1.800+', 'Alumni'],
    ],

    profileSectionTag: 'Profil Program Studi',
    profileTitle: 'Teknik Informatika UMPO',
    profileDescription: 'Program studi Teknik Informatika merupakan salah satu prodi jenjang S1 unggulan Universitas Muhammadiyah Ponorogo yang berdiri tahun 2005 dengan izin SK Ditjen DIKTI No. 378/D/T/2005. Telah terakreditasi BAN-PT Peringkat B.',
    btnHistoryText: 'Baca Sejarah Prodi',
    btnVisiMisiText: 'Visi, Misi & Roadmap',
    degreeTag: 'Gelar Kelulusan',
    degreeTitle: 'S.Kom. (Sarjana Komputer)',
    degreeQuote: '“Membangun talenta digital berkarakter Islami untuk masa depan yang lebih baik.”',
    quickStat1Number: '2',
    quickStat1Title: 'Laboratorium Terpadu',
    quickStat1Desc: 'Lab Jaringan IoT & Lab RPL',
    quickStat2Number: '1:18',
    quickStat2Title: 'Rasio Dosen & Mahasiswa',
    quickStat2Desc: 'Pendampingan intensif & fokus',

    curriculumSectionTag: 'Kurikulum Masa Depan',
    curriculumTitle: 'Pilih fokusmu. Ciptakan terobosanmu.',
    curriculumDescription: 'Tiga rumpun kompetensi keilmuan yang dirancang bersama industri, ditampilkan berdampingan sehingga mudah dibandingkan.',
    driveCardTitle: 'Struktur Kurikulum & Silabus Mata Kuliah',
    driveCardSubtitle: 'Unduh dokumen kurikulum lengkap dari Google Drive resmi prodi',
    driveBtnText: 'Unduh Kurikulum (Drive)',

    himatifSectionTag: 'Kehidupan Mahasiswa & HIMATIF',
    himatifTitle: 'Eksperimen. Kolaborasi. Bertumbuh.',
    himatifDescription: 'Dari HIMATIF, coding bootcamp, hackathon, kompetisi nasional, hingga riset pengabdian masyarakat — pengalaman belajarmu jauh melampaui ruang kelas.',
    himatifBtnText: 'Lihat Instagram @informatika.umpo',
    himatifUrl: 'https://instagram.com/informatika.umpo',

    facilitySectionTag: 'Sarana & Prasarana',
    facilityTitle: 'Laboratorium Komputer Terpadu',
    facilityDescription: 'Infrastruktur praktikum modern untuk riset rekayasa perangkat lunak, kecerdasan buatan, dan jaringan komputer.',
    facility1Title: 'Lab Jaringan & IoT',
    facility1Desc: 'Simulasi jaringan enterprise, router/switch Cisco & Mikrotik, IoT kit, dan cyber security.',
    facility1Foot: 'Ka. Lab: Angga Prasetyo, S.T., M.Kom.',
    facility2Title: 'Lab Rekayasa Perangkat Lunak',
    facility2Desc: 'Pengembangan web, mobile apps, database architecture, dan sistem informasi enterprise.',
    facility2Foot: 'Ka. Lab: Ir. Moh. Bhanu Setyawan, S.T., M.Kom.',
    facility3Title: 'Perpustakaan Pusat UMPO',
    facility3Desc: 'Ribuan literatur TIK, jurnal internasional (IEEE, ScienceDirect), e-library, dan ruang kolaborasi.',
    facility3Foot: 'Buka Perpustakaan UMPO',
    facility3Link: 'https://library.umpo.ac.id/',

    ctaTitle: 'Siap menjadi bagian dari Teknik Informatika UMPO?',
    ctaDescription: 'Mulai perjalananmu dan ciptakan inovasi teknologi yang bermakna bagi bangsa dan umat.',
    ctaPrimaryBtnText: 'Daftar Sekarang (spmb.umpo.ac.id)',
    ctaPrimaryBtnUrl: 'https://spmb.umpo.ac.id/',
    ctaSecondaryBtnText: 'Unduh Panduan & Template',
    ctaSecondaryBtnUrl: '/download',
  },
  en: {
    heroTitle: 'Informatics Engineering UNMUH Ponorogo',
    heroLead: 'Informatics Engineering Study Program at Universitas Muhammadiyah Ponorogo, bridging technology, creativity, and real-world impact grounded in Islamic values.',
    heroPrimaryCtaText: 'Explore Curriculum',
    heroSecondaryCtaText: 'Profile & Academic Vision',
    heroScrollCue: 'Explore',
    stats: [
      ['B', 'BAN-PT Accreditation'],
      ['800+', 'Active Students'],
      ['30+', 'Faculty & Staff'],
      ['1,800+', 'Graduates'],
    ],

    profileSectionTag: 'Department Profile',
    profileTitle: 'Informatics Engineering UMPO',
    profileDescription: 'Informatics Engineering is one of the premier undergraduate programs at Universitas Muhammadiyah Ponorogo, established in 2005 under Directorate General of Higher Education Decree No. 378/D/T/2005. Accredited B by BAN-PT.',
    btnHistoryText: 'Read Department History',
    btnVisiMisiText: 'Vision, Mission & Roadmap',
    degreeTag: 'Academic Degree',
    degreeTitle: 'S.Kom. (Bachelor of Computer Science)',
    degreeQuote: '“Nurturing digital leaders with Islamic character for a better tomorrow.”',
    quickStat1Number: '2',
    quickStat1Title: 'Integrated Laboratories',
    quickStat1Desc: 'IoT & Network Lab, Software Engineering Lab',
    quickStat2Number: '1:18',
    quickStat2Title: 'Faculty-Student Ratio',
    quickStat2Desc: 'Intensive and focused academic mentorship',

    curriculumSectionTag: 'Future-Ready Curriculum',
    curriculumTitle: 'Choose your focus. Build your breakthrough.',
    curriculumDescription: 'Three specialized competency tracks co-designed with industry leaders, presented side-by-side for clear comparison.',
    driveCardTitle: 'Curriculum Structure & Course Syllabus',
    driveCardSubtitle: 'Download complete curriculum documents from the official department Google Drive',
    driveBtnText: 'Download Curriculum (Drive)',

    himatifSectionTag: 'Student Life & HIMATIF',
    himatifTitle: 'Experiment. Collaborate. Grow.',
    himatifDescription: 'From HIMATIF student association, coding bootcamps, and hackathons, to national competitions and community research — your learning journey extends far beyond the lecture hall.',
    himatifBtnText: 'Visit Instagram @informatika.umpo',
    himatifUrl: 'https://instagram.com/informatika.umpo',

    facilitySectionTag: 'Campus Facilities',
    facilityTitle: 'Integrated Computer Laboratories',
    facilityDescription: 'Modern practicum infrastructure dedicated to software engineering research, artificial intelligence, and computer networks.',
    facility1Title: 'Network & IoT Laboratory',
    facility1Desc: 'Enterprise network simulation, Cisco & Mikrotik routing/switching, IoT development kits, and cybersecurity testing.',
    facility1Foot: 'Head of Lab: Angga Prasetyo, S.T., M.Kom.',
    facility2Title: 'Software Engineering Laboratory',
    facility2Desc: 'Web development, mobile applications, database architecture, and enterprise information systems.',
    facility2Foot: 'Head of Lab: Ir. Moh. Bhanu Setyawan, S.T., M.Kom.',
    facility3Title: 'UMPO Central Library',
    facility3Desc: 'Thousands of ICT literature volumes, international journals (IEEE, ScienceDirect), e-library portal, and collaborative study spaces.',
    facility3Foot: 'Open UMPO Central Library',
    facility3Link: 'https://library.umpo.ac.id/',

    ctaTitle: 'Ready to join Informatics Engineering UMPO?',
    ctaDescription: 'Start your educational journey and create meaningful technological innovations for society.',
    ctaPrimaryBtnText: 'Apply Now (spmb.umpo.ac.id)',
    ctaPrimaryBtnUrl: 'https://spmb.umpo.ac.id/',
    ctaSecondaryBtnText: 'Download Guide & Templates',
    ctaSecondaryBtnUrl: '/download',
  },
}

export function resolveHomeContent(cmsData: any, locale: 'id' | 'en'): HomeContent {
  const fallback = FALLBACK_HOME_CONTENT[locale] || FALLBACK_HOME_CONTENT.id
  if (!cmsData) return fallback

  const stats: Array<[string, string]> = [
    [cmsData.stat1Value || fallback.stats[0][0], cmsData.stat1Label || fallback.stats[0][1]],
    [cmsData.stat2Value || fallback.stats[1][0], cmsData.stat2Label || fallback.stats[1][1]],
    [cmsData.stat3Value || fallback.stats[2][0], cmsData.stat3Label || fallback.stats[2][1]],
    [cmsData.stat4Value || fallback.stats[3][0], cmsData.stat4Label || fallback.stats[3][1]],
  ]

  return {
    heroTitle: cmsData.heroTitle || fallback.heroTitle,
    heroLead: cmsData.heroLead || fallback.heroLead,
    heroPrimaryCtaText: cmsData.heroPrimaryCtaText || fallback.heroPrimaryCtaText,
    heroSecondaryCtaText: cmsData.heroSecondaryCtaText || fallback.heroSecondaryCtaText,
    heroScrollCue: cmsData.heroScrollCue || fallback.heroScrollCue,
    stats,

    profileSectionTag: cmsData.profileSectionTag || fallback.profileSectionTag,
    profileTitle: cmsData.profileTitle || fallback.profileTitle,
    profileDescription: cmsData.profileDescription || fallback.profileDescription,
    btnHistoryText: cmsData.btnHistoryText || fallback.btnHistoryText,
    btnVisiMisiText: cmsData.btnVisiMisiText || fallback.btnVisiMisiText,
    degreeTag: cmsData.degreeTag || fallback.degreeTag,
    degreeTitle: cmsData.degreeTitle || fallback.degreeTitle,
    degreeQuote: cmsData.degreeQuote || fallback.degreeQuote,
    quickStat1Number: cmsData.quickStat1Number || fallback.quickStat1Number,
    quickStat1Title: cmsData.quickStat1Title || fallback.quickStat1Title,
    quickStat1Desc: cmsData.quickStat1Desc || fallback.quickStat1Desc,
    quickStat2Number: cmsData.quickStat2Number || fallback.quickStat2Number,
    quickStat2Title: cmsData.quickStat2Title || fallback.quickStat2Title,
    quickStat2Desc: cmsData.quickStat2Desc || fallback.quickStat2Desc,

    curriculumSectionTag: cmsData.curriculumSectionTag || fallback.curriculumSectionTag,
    curriculumTitle: cmsData.curriculumTitle || fallback.curriculumTitle,
    curriculumDescription: cmsData.curriculumDescription || fallback.curriculumDescription,
    driveCardTitle: cmsData.driveCardTitle || fallback.driveCardTitle,
    driveCardSubtitle: cmsData.driveCardSubtitle || fallback.driveCardSubtitle,
    driveBtnText: cmsData.driveBtnText || fallback.driveBtnText,

    himatifSectionTag: cmsData.himatifSectionTag || fallback.himatifSectionTag,
    himatifTitle: cmsData.himatifTitle || fallback.himatifTitle,
    himatifDescription: cmsData.himatifDescription || fallback.himatifDescription,
    himatifBtnText: cmsData.himatifBtnText || fallback.himatifBtnText,
    himatifUrl: cmsData.himatifUrl || fallback.himatifUrl,

    facilitySectionTag: cmsData.facilitySectionTag || fallback.facilitySectionTag,
    facilityTitle: cmsData.facilityTitle || fallback.facilityTitle,
    facilityDescription: cmsData.facilityDescription || fallback.facilityDescription,
    facility1Title: cmsData.facility1Title || fallback.facility1Title,
    facility1Desc: cmsData.facility1Desc || fallback.facility1Desc,
    facility1Foot: cmsData.facility1Foot || fallback.facility1Foot,
    facility2Title: cmsData.facility2Title || fallback.facility2Title,
    facility2Desc: cmsData.facility2Desc || fallback.facility2Desc,
    facility2Foot: cmsData.facility2Foot || fallback.facility2Foot,
    facility3Title: cmsData.facility3Title || fallback.facility3Title,
    facility3Desc: cmsData.facility3Desc || fallback.facility3Desc,
    facility3Foot: cmsData.facility3Foot || fallback.facility3Foot,
    facility3Link: cmsData.facility3Link || fallback.facility3Link,

    ctaTitle: cmsData.ctaTitle || fallback.ctaTitle,
    ctaDescription: cmsData.ctaDescription || fallback.ctaDescription,
    ctaPrimaryBtnText: cmsData.ctaPrimaryBtnText || fallback.ctaPrimaryBtnText,
    ctaPrimaryBtnUrl: cmsData.ctaPrimaryBtnUrl || fallback.ctaPrimaryBtnUrl,
    ctaSecondaryBtnText: cmsData.ctaSecondaryBtnText || fallback.ctaSecondaryBtnText,
    ctaSecondaryBtnUrl: cmsData.ctaSecondaryBtnUrl || fallback.ctaSecondaryBtnUrl,
  }
}
