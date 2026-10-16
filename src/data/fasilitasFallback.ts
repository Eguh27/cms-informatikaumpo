export interface FasilitasPageContent {
  // Banner & Navigasi
  bannerCategory: string
  bannerTitle: string
  bannerSubtitle: string
  breadcrumbHome: string
  breadcrumbCurrent: string

  // Lab 1: Jaringan & IoT
  lab1Badge: string
  lab1Title: string
  lab1HeadRoleLabel: string
  lab1HeadName: string
  lab1Desc: string
  lab1Point1: string
  lab1Point2: string
  lab1Point3: string
  lab1Point4: string
  lab1Capacity: string
  lab1Connection: string
  lab1Location: string
  lab1Image?: any
  lab1ImageTag: string
  lab1ImageSub: string

  // Lab 2: RPL & Komputer
  lab2Badge: string
  lab2Title: string
  lab2HeadRoleLabel: string
  lab2HeadName: string
  lab2Desc: string
  lab2Point1: string
  lab2Point2: string
  lab2Point3: string
  lab2Point4: string
  lab2Capacity: string
  lab2Ac: string
  lab2Location: string
  lab2Image?: any
  lab2ImageTag: string
  lab2ImageSub: string

  // Sarana Pendukung
  supportTag: string
  supportTitle: string
  supportDesc: string
  support1Title: string
  support1Desc: string
  support2Title: string
  support2Desc: string
  support3Title: string
  support3Desc: string

  // SEO
  metaTitle: string
  metaDescription: string
}

export const FALLBACK_FASILITAS_CONTENT: Record<'id' | 'en', FasilitasPageContent> = {
  id: {
    bannerCategory: 'Sarana & Prasarana',
    bannerTitle: 'Laboratorium & Fasilitas Riset',
    bannerSubtitle:
      'Infrastruktur komputasi berkinerja tinggi, jaringan berkecepatan gigabit, dan perangkat IoT mutakhir untuk mendukung eksperimen dan riset mahasiswa Teknik Informatika UMPO.',
    breadcrumbHome: 'Beranda',
    breadcrumbCurrent: 'Fasilitas & Lab',

    lab1Badge: 'Laboratorium Unggulan 1',
    lab1Title: 'Laboratorium Jaringan Komputer, Cyber Security & IoT',
    lab1HeadRoleLabel: 'Kepala Laboratorium:',
    lab1HeadName: 'Angga Prasetyo, S.T., M.Kom.',
    lab1Desc:
      'Pusat eksperimen infrastruktur jaringan komputer berskala enterprise, pengujian keamanan siber (penetration testing), dan prototyping perangkat cerdas Internet of Things (IoT). Dilengkapi rak server, switch Cisco, router Mikrotik, serta modul mikrokontroler sensor industri.',
    lab1Point1: 'Cisco & Mikrotik Routing Labs',
    lab1Point2: 'IoT Dev Kits (ESP32, Raspberry Pi)',
    lab1Point3: 'Fiber Optic Splicer & Tester',
    lab1Point4: 'Cyber Security Simulation Rig',
    lab1Capacity: 'Kapasitas: 35 Praktikan',
    lab1Connection: 'Koneksi: Dedicated Fiber 1 Gbps',
    lab1Location: 'Gedung FT Lantai 2',
    lab1ImageTag: 'Ruang Server & Jaringan',
    lab1ImageSub: 'Gedung FT Lt. 2 UMPO',

    lab2Badge: 'Laboratorium Unggulan 2',
    lab2Title: 'Laboratorium Rekayasa Perangkat Lunak & Komputer',
    lab2HeadRoleLabel: 'Kepala Laboratorium:',
    lab2HeadName: 'Ir. Moh. Bhanu Setyawan, S.T., M.Kom.',
    lab2Desc:
      'Fasilitas komputasi berdaya tinggi untuk praktikum pemrograman, pengembangan software full-stack, mobile apps, machine learning training model, dan riset komputasi data cerdas. Seluruh PC dilengkapi spesifikasi Core i7, 16GB RAM, dan SSD berkecepatan tinggi.',
    lab2Point1: '40 Workstations Intel Core i7',
    lab2Point2: 'Machine Learning Dev Stack',
    lab2Point3: 'Mobile Android/iOS Emulators',
    lab2Point4: 'Smart Display Proyektor Interaktif',
    lab2Capacity: 'Kapasitas: 40 Mahasiswa',
    lab2Ac: 'Pendingin Ruangan (AC) Penuh',
    lab2Location: 'Gedung FT Lantai 2',
    lab2ImageTag: '40+ Workstation Komputasi Modern',
    lab2ImageSub: 'Gedung FT Lt. 2 UMPO',

    supportTag: 'Sarana Pendukung',
    supportTitle: 'Fasilitas Pembelajaran & Ruang Kolaborasi',
    supportDesc:
      'Mendukung suasana belajar yang nyaman, kolaboratif, dan interaktif bagi mahasiswa dan dosen.',
    support1Title: 'Smart Classroom',
    support1Desc:
      'Ruang kuliah multimedia ber-AC dengan proyektor interaktif, sound system jernih, dan koneksi Wi-Fi eduroam untuk pembelajaran hybrid dan interaktif.',
    support2Title: 'Ruang Baca & Mini Library',
    support2Desc:
      'Koleksi buku teks ilmu komputer terbaru, jurnal ilmiah bereputasi, prosiding konferensi, serta repositori skripsi mahasiswa untuk referensi riset.',
    support3Title: 'Sekretariat HIMATIF',
    support3Desc:
      'Ruang koordinasi Himpunan Mahasiswa Teknik Informatika UMPO untuk kegiatan organisasi, workshop coding, bootcamp, dan diskusi proyek lomba mahasiswa.',

    metaTitle: 'Laboratorium & Fasilitas Riset | Teknik Informatika UMPO',
    metaDescription:
      'Fasilitas laboratorium komputasi modern, sarana riset jaringan, software engineering, dan ruang kolaborasi Program Studi S1 Teknik Informatika UMPO.',
  },
  en: {
    bannerCategory: 'Infrastructure & Facilities',
    bannerTitle: 'Laboratories & Research Facilities',
    bannerSubtitle:
      'High-performance computing infrastructure, gigabit networking, and modern IoT equipment to empower student experiments and research in Informatics Engineering UMPO.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Facilities & Labs',

    lab1Badge: 'Flagship Laboratory 1',
    lab1Title: 'Computer Networks, Cyber Security & IoT Laboratory',
    lab1HeadRoleLabel: 'Head of Laboratory:',
    lab1HeadName: 'Angga Prasetyo, S.T., M.Kom.',
    lab1Desc:
      'Enterprise-grade network infrastructure experimental center, penetration testing security labs, and IoT smart devices prototyping. Equipped with server racks, Cisco switches, Mikrotik routers, and industrial microcontroller sensor kits.',
    lab1Point1: 'Cisco & Mikrotik Routing Labs',
    lab1Point2: 'IoT Dev Kits (ESP32, Raspberry Pi)',
    lab1Point3: 'Fiber Optic Splicer & Tester',
    lab1Point4: 'Cyber Security Simulation Rig',
    lab1Capacity: 'Capacity: 35 Students',
    lab1Connection: 'Connection: Dedicated 1 Gbps Fiber',
    lab1Location: 'Engineering Faculty Building 2nd Floor',
    lab1ImageTag: 'Server & Network Server Room',
    lab1ImageSub: 'Engineering Faculty 2nd Fl. UMPO',

    lab2Badge: 'Flagship Laboratory 2',
    lab2Title: 'Software Engineering & Computing Laboratory',
    lab2HeadRoleLabel: 'Head of Laboratory:',
    lab2HeadName: 'Ir. Moh. Bhanu Setyawan, S.T., M.Kom.',
    lab2Desc:
      'High-performance computing facilities for programming practicums, full-stack software development, mobile application builds, machine learning model training, and smart data research. All PCs feature Intel Core i7 processors, 16GB RAM, and high-speed SSDs.',
    lab2Point1: '40 Intel Core i7 Workstations',
    lab2Point2: 'Machine Learning Dev Stack',
    lab2Point3: 'Mobile Android/iOS Emulators',
    lab2Point4: 'Interactive Projector Smart Display',
    lab2Capacity: 'Capacity: 40 Students',
    lab2Ac: 'Full Air Conditioning (AC)',
    lab2Location: 'Engineering Faculty Building 2nd Floor',
    lab2ImageTag: '40+ Modern Computing Workstations',
    lab2ImageSub: 'Engineering Faculty 2nd Fl. UMPO',

    supportTag: 'Supporting Facilities',
    supportTitle: 'Learning Facilities & Collaboration Spaces',
    supportDesc:
      'Supporting a comfortable, collaborative, and interactive learning atmosphere for students and academic staff.',
    support1Title: 'Smart Classroom',
    support1Desc:
      'Air-conditioned multimedia lecture halls featuring interactive projectors, high-definition sound systems, and eduroam Wi-Fi for hybrid, interactive learning.',
    support2Title: 'Reading Room & Mini Library',
    support2Desc:
      'A collection of up-to-date computer science textbooks, peer-reviewed scientific journals, conference proceedings, and undergraduate thesis repositories for research references.',
    support3Title: 'HIMATIF Student Secretariat',
    support3Desc:
      'Coordination and collaboration space for the UMPO Informatics Engineering Student Association for organization activities, coding workshops, bootcamps, and competition projects.',

    metaTitle: 'Laboratories & Research Facilities | Informatics Engineering UMPO',
    metaDescription:
      'Modern computing laboratories, networking and software engineering research facilities, and collaboration spaces of Informatics Engineering Department UMPO.',
  },
}

export function resolveFasilitasContent(
  cmsData: any,
  locale: 'id' | 'en' = 'id'
): FasilitasPageContent {
  const fallback = FALLBACK_FASILITAS_CONTENT[locale] || FALLBACK_FASILITAS_CONTENT.id
  if (!cmsData) return fallback

  return {
    bannerCategory: cmsData.bannerCategory || fallback.bannerCategory,
    bannerTitle: cmsData.bannerTitle || fallback.bannerTitle,
    bannerSubtitle: cmsData.bannerSubtitle || fallback.bannerSubtitle,
    breadcrumbHome: cmsData.breadcrumbHome || fallback.breadcrumbHome,
    breadcrumbCurrent: cmsData.breadcrumbCurrent || fallback.breadcrumbCurrent,

    lab1Badge: cmsData.lab1Badge || fallback.lab1Badge,
    lab1Title: cmsData.lab1Title || fallback.lab1Title,
    lab1HeadRoleLabel: cmsData.lab1HeadRoleLabel || fallback.lab1HeadRoleLabel,
    lab1HeadName: cmsData.lab1HeadName || fallback.lab1HeadName,
    lab1Desc: cmsData.lab1Desc || fallback.lab1Desc,
    lab1Point1: cmsData.lab1Point1 || fallback.lab1Point1,
    lab1Point2: cmsData.lab1Point2 || fallback.lab1Point2,
    lab1Point3: cmsData.lab1Point3 || fallback.lab1Point3,
    lab1Point4: cmsData.lab1Point4 || fallback.lab1Point4,
    lab1Capacity: cmsData.lab1Capacity || fallback.lab1Capacity,
    lab1Connection: cmsData.lab1Connection || fallback.lab1Connection,
    lab1Location: cmsData.lab1Location || fallback.lab1Location,
    lab1Image: cmsData.lab1Image,
    lab1ImageTag: cmsData.lab1ImageTag || fallback.lab1ImageTag,
    lab1ImageSub: cmsData.lab1ImageSub || fallback.lab1ImageSub,

    lab2Badge: cmsData.lab2Badge || fallback.lab2Badge,
    lab2Title: cmsData.lab2Title || fallback.lab2Title,
    lab2HeadRoleLabel: cmsData.lab2HeadRoleLabel || fallback.lab2HeadRoleLabel,
    lab2HeadName: cmsData.lab2HeadName || fallback.lab2HeadName,
    lab2Desc: cmsData.lab2Desc || fallback.lab2Desc,
    lab2Point1: cmsData.lab2Point1 || fallback.lab2Point1,
    lab2Point2: cmsData.lab2Point2 || fallback.lab2Point2,
    lab2Point3: cmsData.lab2Point3 || fallback.lab2Point3,
    lab2Point4: cmsData.lab2Point4 || fallback.lab2Point4,
    lab2Capacity: cmsData.lab2Capacity || fallback.lab2Capacity,
    lab2Ac: cmsData.lab2Ac || fallback.lab2Ac,
    lab2Location: cmsData.lab2Location || fallback.lab2Location,
    lab2Image: cmsData.lab2Image,
    lab2ImageTag: cmsData.lab2ImageTag || fallback.lab2ImageTag,
    lab2ImageSub: cmsData.lab2ImageSub || fallback.lab2ImageSub,

    supportTag: cmsData.supportTag || fallback.supportTag,
    supportTitle: cmsData.supportTitle || fallback.supportTitle,
    supportDesc: cmsData.supportDesc || fallback.supportDesc,
    support1Title: cmsData.support1Title || fallback.support1Title,
    support1Desc: cmsData.support1Desc || fallback.support1Desc,
    support2Title: cmsData.support2Title || fallback.support2Title,
    support2Desc: cmsData.support2Desc || fallback.support2Desc,
    support3Title: cmsData.support3Title || fallback.support3Title,
    support3Desc: cmsData.support3Desc || fallback.support3Desc,

    metaTitle: cmsData.metaTitle || fallback.metaTitle,
    metaDescription: cmsData.metaDescription || fallback.metaDescription,
  }
}
