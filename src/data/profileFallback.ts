export interface MisiItem {
  no: string
  title: string
  desc: string
}

export interface TujuanItem {
  no: string
  title: string
  desc: string
}

export interface FaqItem {
  q: string
  a: string
}

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

  // Tab 2: Visi Misi & Tujuan
  visiBadge: string
  visiText: string
  misiTag: string
  misiTitle: string
  misiItems: MisiItem[]
  tujuanTag: string
  tujuanTitle: string
  tujuanItems: TujuanItem[]

  // Tab 3: Struktur Organisasi
  strukturTag: string
  strukturTitle: string
  strukturDesc: string
  kaprodiRole: string
  kaprodiName: string
  kaprodiNidn: string
  sekprodiRole: string
  sekprodiName: string
  sekprodiNidn: string
  lab1Role: string
  lab1Name: string
  lab1Nidn: string
  lab2Role: string
  lab2Name: string
  lab2Nidn: string
  dosenBoxTitle: string
  dosenBoxDesc: string
  dosenBoxBtnLabel: string

  // Tab 4: Akreditasi
  akreditasiBadge: string
  akreditasiTitle: string
  akreditasiParagraph1: string
  akreditasiParagraph2: string
  akreditasiPoints: string[]
  btnDocUrl: string
  btnDocLabel: string
  btnKonsultasiLabel: string
  certGrade: string
  certAgency: string
  certSk: string
  certScope: string

  // Tab 5: Kontak & Lokasi
  hotlineTitle: string
  hotlineNotice: string
  waNumber: string
  waPhone: string
  emailLabel: string
  emailValue: string
  emailAlt: string
  hoursLabel: string
  hoursValue: string
  hoursAlt: string
  locationLabel: string
  locationValue: string
  locationAlt: string
  mapsEmbed: string
  mapsDirections: string
  mapsTitle: string
  mapsAddress: string
  faqTitle: string
  faqSubtitle: string
  faqs: FaqItem[]
  pmbCardTitle: string
  pmbCardDesc: string
  pmbCardBtnLabel: string
  pmbCardUrl: string
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

    // Tab 2: Visi Misi & Tujuan
    visiBadge: 'Visi Keunggulan 2030',
    visiText:
      'Menjadi Program Studi Teknik Informatika yang unggul di tingkat nasional dalam pengembangan Kecerdasan Buatan (Artificial Intelligence) dan Rekayasa Perangkat Lunak berbasis nilai-nilai keislaman pada tahun 2030.',
    misiTag: 'Tridharma Perguruan Tinggi',
    misiTitle: 'Misi Program Studi',
    misiItems: [
      {
        no: '1',
        title: 'Pendidikan Berkualitas OBE',
        desc: 'Menyelenggarakan pendidikan sarjana informatika berbasis kurikulum Outcome-Based Education dengan penguasaan AI dan Software Engineering mutakhir.',
      },
      {
        no: '2',
        title: 'Riset dan Inovasi Bereputasi',
        desc: 'Melaksanakan penelitian bereputasi nasional dan internasional di bidang komputasi cerdas, sistem terdistribusi, dan keamanan siber.',
      },
      {
        no: '3',
        title: 'Pengabdian Berdampak Nyata',
        desc: 'Menerapkan teknologi tepat guna dan solusi komputasi untuk kemaslahatan masyarakat dan persyarikatan Muhammadiyah.',
      },
      {
        no: '4',
        title: 'Internalisasi Karakter Islami',
        desc: 'Menanamkan nilai-nilai Al-Islam dan Kemuhammadiyahan serta etika profesional bagi seluruh sivitas akademika.',
      },
    ],
    tujuanTag: 'Sasaran Kompetensi',
    tujuanTitle: 'Tujuan Strategis Lulusan',
    tujuanItems: [
      {
        no: '1',
        title: 'Kompetensi Profesional',
        desc: 'Menghasilkan lulusan yang menguasai analisis, perancangan, implementasi, dan pengujian sistem komputasi berstandar industri.',
      },
      {
        no: '2',
        title: 'Inovator dan Peneliti Muda',
        desc: 'Menghasilkan sarjana yang mampu melakukan riset terapan di bidang Artificial Intelligence dan Big Data Analytics.',
      },
      {
        no: '3',
        title: 'Technopreneurship',
        desc: 'Mencetak wirausahawan teknologi yang kreatif, adaptif terhadap disrupsi digital, dan berdaya saing global.',
      },
      {
        no: '4',
        title: 'Integritas Moral & Etika',
        desc: 'Menghasilkan lulusan yang berakhlak mulia, amanah, dan mampu menjadi teladan di lingkungan kerja dan masyarakat.',
      },
    ],

    // Tab 3: Struktur Organisasi
    strukturTag: 'Pimpinan & Pengelola Prodi',
    strukturTitle: 'Struktur Organisasi Program Studi',
    strukturDesc:
      'Tata kelola kepemimpinan akademik Program Studi S1 Teknik Informatika Fakultas Teknik Universitas Muhammadiyah Ponorogo.',
    kaprodiRole: 'Ketua Program Studi',
    kaprodiName: 'Adi Fajaryanto Cobantoro, S.Kom., M.Kom.',
    kaprodiNidn: 'NIDN: 0724098406',
    sekprodiRole: 'Sekretaris Program Studi',
    sekprodiName: 'Ismail Abdurrazzaq Zulkarnain, S.Kom., M.Kom.',
    sekprodiNidn: 'NIDN: 0728078805',
    lab1Role: 'Ka. Lab Jaringan Komputer & IoT',
    lab1Name: 'Angga Prasetyo, S.T., M.Kom.',
    lab1Nidn: 'NIDN: 0719088202',
    lab2Role: 'Ka. Lab RPL & Komputer',
    lab2Name: 'Ir. Moh. Bhanu Setyawan, S.T., M.Kom.',
    lab2Nidn: 'NIDN: 0725028002',
    dosenBoxTitle: 'Dosen Pengajar & Peneliti (21 Dosen Tetap)',
    dosenBoxDesc:
      'Tenaga pendidik berkualifikasi S2 dan S3 pada bidang Artificial Intelligence, Software Engineering, Jaringan, dan Data Science.',
    dosenBoxBtnLabel: 'Buka Direktori Lengkap 21 Dosen',

    // Tab 4: Akreditasi
    akreditasiBadge: 'Status Resmi Terakreditasi',
    akreditasiTitle: 'Peringkat Akreditasi BAN-PT & Komitmen Mutu',
    akreditasiParagraph1:
      'Program Studi S1 Teknik Informatika Fakultas Teknik Universitas Muhammadiyah Ponorogo telah meraih status Terakreditasi Peringkat B dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) berdasarkan SK BAN-PT No. 3418/SK/BAN-PT/Akred/S/IX/2019.',
    akreditasiParagraph2:
      'Pencapaian akreditasi ini membuktikan bahwa penyelenggaraan tridharma perguruan tinggi di Program Studi Teknik Informatika UMPO telah memenuhi standar nasional pendidikan tinggi dalam aspek:',
    akreditasiPoints: [
      'Kualifikasi dan kompetensi dosen pengajar berpendidikan S2 dan S3.',
      'Kurikulum adaptif berbasis Outcome-Based Education (OBE) yang selaras dengan industri.',
      'Ketersediaan sarana laboratorium komputasi dan jaringan yang representatif.',
      'Produktivitas publikasi ilmiah, penelitian, dan pengabdian kepada masyarakat.',
      'Sistem penjaminan mutu internal (SPMI) yang berjalan secara berkesinambungan.',
    ],
    btnDocUrl: 'https://teknik.umpo.ac.id/layanan-terpadu/',
    btnDocLabel: 'Unduh Dokumen Akreditasi',
    btnKonsultasiLabel: 'Konsultasi dengan Prodi',
    certGrade: 'Peringkat “B”',
    certAgency: 'BAN-PT Indonesia',
    certSk: 'SK No. 3418/SK/BAN-PT/Akred/S/IX/2019',
    certScope: 'Berlaku Nasional',

    // Tab 5: Kontak & Lokasi
    hotlineTitle: 'Hotline Sekretariat Prodi',
    hotlineNotice: 'Di luar jam layanan, pesan dibalas pada hari kerja berikutnya.',
    waNumber: '6282267868648',
    waPhone: '0822-6786-8648',
    emailLabel: 'Email resmi',
    emailValue: 'informatika@umpo.ac.id',
    emailAlt: 'teknik@umpo.ac.id',
    hoursLabel: 'Jam layanan',
    hoursValue: 'Senin–Jumat',
    hoursAlt: '08.00–15.30 WIB',
    locationLabel: 'Lokasi',
    locationValue: 'Gedung Fakultas Teknik Lt. 2',
    locationAlt: 'Jl. Budi Utomo No. 10, Ponorogo 63471',
    mapsEmbed:
      'https://www.google.com/maps?q=Universitas%20Muhammadiyah%20Ponorogo%20Jl.%20Budi%20Utomo%20No.10&output=embed',
    mapsDirections:
      'https://www.google.com/maps/dir/?api=1&destination=Universitas+Muhammadiyah+Ponorogo+Jl.+Budi+Utomo+No.+10',
    mapsTitle: 'Kampus 1 UMPO — Fakultas Teknik',
    mapsAddress: 'Jl. Budi Utomo No. 10, Ronowijayan, Siman, Ponorogo, Jawa Timur 63471',
    faqTitle: 'Pertanyaan umum',
    faqSubtitle: 'Jawaban singkat sebelum menghubungi admin.',
    faqs: [
      {
        q: 'Bagaimana status akreditasi S1 Teknik Informatika UMPO?',
        a: 'Terakreditasi resmi Peringkat B oleh BAN-PT, SK No. 3418/SK/BAN-PT/Akred/S/IX/2019. Sertifikatnya bisa diunduh di halaman unduhan.',
      },
      {
        q: 'Di mana lokasi bimbingan skripsi dan konsultasi dosen?',
        a: 'Tatap muka di Ruang Dosen Gedung Fakultas Teknik lantai 2, sesuai jadwal masing-masing pembimbing. Enrollment dan unggah bab dilakukan lewat portal SISKRIP.',
      },
      {
        q: 'Apakah ada program magang industri bersertifikat?',
        a: 'Ada. Semester 6–7 dapat mengikuti Kerja Praktik di perusahaan mitra, atau program Magang dan Studi Independen Bersertifikat (MSIB).',
      },
      {
        q: 'Bagaimana cara mendaftar sebagai mahasiswa baru?',
        a: 'Pendaftaran online lewat spmb.umpo.ac.id. Untuk panduan jalur dan biaya, hubungi hotline prodi di 0822-6786-8648.',
      },
    ],
    pmbCardTitle: 'Calon mahasiswa baru',
    pmbCardDesc:
      'Pendaftaran PMB dilakukan online. Siapkan ijazah/SKL dan pas foto sebelum mengisi formulir.',
    pmbCardBtnLabel: 'Daftar di spmb.umpo.ac.id',
    pmbCardUrl: 'https://spmb.umpo.ac.id',
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

    // Tab 2: Visi Misi & Tujuan (EN)
    visiBadge: 'Vision of Excellence 2030',
    visiText:
      'To become an Informatics Engineering Study Program of national excellence in the development of Artificial Intelligence and Software Engineering grounded in Islamic values by 2030.',
    misiTag: 'Higher Education Tridharma',
    misiTitle: 'Department Missions',
    misiItems: [
      {
        no: '1',
        title: 'Quality OBE Education',
        desc: 'Organizing undergraduate informatics education grounded in Outcome-Based Education curriculum with cutting-edge AI and Software Engineering mastery.',
      },
      {
        no: '2',
        title: 'Reputable Research & Innovation',
        desc: 'Conducting nationally and internationally recognized research in intelligent computing, distributed systems, and cybersecurity.',
      },
      {
        no: '3',
        title: 'High-Impact Community Service',
        desc: 'Applying appropriate computing technologies and solutions for the benefit of society and the Muhammadiyah organization.',
      },
      {
        no: '4',
        title: 'Islamic Character Internalization',
        desc: 'Instilling Al-Islam and Kemuhammadiyahan values as well as professional ethics across all academic members.',
      },
    ],
    tujuanTag: 'Competency Objectives',
    tujuanTitle: 'Strategic Graduate Goals',
    tujuanItems: [
      {
        no: '1',
        title: 'Professional Competence',
        desc: 'Producing graduates who master analysis, design, implementation, and testing of industry-standard computational systems.',
      },
      {
        no: '2',
        title: 'Young Innovators & Researchers',
        desc: 'Producing scholars capable of conducting applied research in Artificial Intelligence and Big Data Analytics.',
      },
      {
        no: '3',
        title: 'Technopreneurship',
        desc: 'Fostering technology entrepreneurs who are creative, adaptive to digital disruption, and globally competitive.',
      },
      {
        no: '4',
        title: 'Moral & Ethical Integrity',
        desc: 'Producing graduates with noble morals, trustworthiness, and leadership capability in their workplaces and communities.',
      },
    ],

    // Tab 3: Struktur Organisasi (EN)
    strukturTag: 'Department Leadership & Management',
    strukturTitle: 'Department Organizational Structure',
    strukturDesc:
      'Academic leadership governance of the Undergraduate (S1) Informatics Engineering Department, Faculty of Engineering, Universitas Muhammadiyah Ponorogo.',
    kaprodiRole: 'Head of Study Program / Department Chair',
    kaprodiName: 'Adi Fajaryanto Cobantoro, S.Kom., M.Kom.',
    kaprodiNidn: 'NIDN: 0724098406',
    sekprodiRole: 'Department Secretary',
    sekprodiName: 'Ismail Abdurrazzaq Zulkarnain, S.Kom., M.Kom.',
    sekprodiNidn: 'NIDN: 0728078805',
    lab1Role: 'Head of Computer Networks & IoT Lab',
    lab1Name: 'Angga Prasetyo, S.T., M.Kom.',
    lab1Nidn: 'NIDN: 0719088202',
    lab2Role: 'Head of Software Engineering & Computing Lab',
    lab2Name: 'Ir. Moh. Bhanu Setyawan, S.T., M.Kom.',
    lab2Nidn: 'NIDN: 0725028002',
    dosenBoxTitle: 'Faculty Members & Researchers (21 Permanent Lecturers)',
    dosenBoxDesc:
      'Faculty members holding Master and Doctoral qualifications in Artificial Intelligence, Software Engineering, Networks, and Data Science.',
    dosenBoxBtnLabel: 'Open Full Directory of 21 Lecturers',

    // Tab 4: Akreditasi (EN)
    akreditasiBadge: 'Officially Accredited Status',
    akreditasiTitle: 'BAN-PT Accreditation Rank & Quality Commitment',
    akreditasiParagraph1:
      'The Undergraduate (S1) Informatics Engineering Study Program, Faculty of Engineering, Universitas Muhammadiyah Ponorogo has achieved Accreditation Rank B status from the National Accreditation Board for Higher Education (BAN-PT) under Decree No. 3418/SK/BAN-PT/Akred/S/IX/2019.',
    akreditasiParagraph2:
      'This accreditation achievement demonstrates that the execution of higher education tridharma in Informatics Engineering UMPO complies with national higher education standards across multiple dimensions:',
    akreditasiPoints: [
      'Lecturer qualifications and competencies holding Master and Doctoral degrees.',
      'Adaptive Outcome-Based Education (OBE) curriculum closely aligned with industry demands.',
      'Availability of representative computing and network laboratory facilities.',
      'Scientific publication productivity, cutting-edge research, and impactful community service.',
      'Sustainable and continuous Internal Quality Assurance System (SPMI).',
    ],
    btnDocUrl: 'https://teknik.umpo.ac.id/layanan-terpadu/',
    btnDocLabel: 'Download Accreditation Document',
    btnKonsultasiLabel: 'Consult with Department',
    certGrade: 'Rank “B”',
    certAgency: 'BAN-PT Indonesia',
    certSk: 'Decree No. 3418/SK/BAN-PT/Akred/S/IX/2019',
    certScope: 'Nationally Recognized',

    // Tab 5: Kontak & Lokasi (EN)
    hotlineTitle: 'Department Secretariat Hotline',
    hotlineNotice: 'Outside service hours, messages will be responded to on the next working day.',
    waNumber: '6282267868648',
    waPhone: '0822-6786-8648',
    emailLabel: 'Official Email',
    emailValue: 'informatika@umpo.ac.id',
    emailAlt: 'teknik@umpo.ac.id',
    hoursLabel: 'Office Hours',
    hoursValue: 'Monday–Friday',
    hoursAlt: '08.00–15.30 WIB',
    locationLabel: 'Location',
    locationValue: 'Faculty of Engineering Building, 2nd Fl.',
    locationAlt: 'Jl. Budi Utomo No. 10, Ponorogo 63471',
    mapsEmbed:
      'https://www.google.com/maps?q=Universitas%20Muhammadiyah%20Ponorogo%20Jl.%20Budi%20Utomo%20No.10&output=embed',
    mapsDirections:
      'https://www.google.com/maps/dir/?api=1&destination=Universitas+Muhammadiyah+Ponorogo+Jl.+Budi+Utomo+No.+10',
    mapsTitle: 'UMPO Campus 1 — Faculty of Engineering',
    mapsAddress: 'Jl. Budi Utomo No. 10, Ronowijayan, Siman, Ponorogo, East Java 63471',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Quick answers before contacting the admin.',
    faqs: [
      {
        q: 'What is the accreditation status of Informatics Engineering UMPO?',
        a: 'Officially accredited Rank B by BAN-PT, Decree No. 3418/SK/BAN-PT/Akred/S/IX/2019. The official certificate can be downloaded from the download center.',
      },
      {
        q: 'Where are thesis supervision and faculty consultations held?',
        a: "Face-to-face consultations take place in the Faculty Staff Room, Faculty of Engineering Building, 2nd floor, according to each advisor's schedule. Enrollment and chapter submissions are managed via the SISKRIP portal.",
      },
      {
        q: 'Are certified industrial internship programs available?',
        a: 'Yes. Students in semesters 6–7 can participate in Practical Work (KP) at industry partner companies or the Certified Internship and Independent Study (MSIB) program.',
      },
      {
        q: 'How do I register as a prospective new student?',
        a: 'Online registration is conducted via spmb.umpo.ac.id. For admission tracks and tuition guidelines, contact the department hotline at 0822-6786-8648.',
      },
    ],
    pmbCardTitle: 'Prospective New Students',
    pmbCardDesc:
      'New student registration is conducted online. Prepare your high school diploma/certificate and formal photo before registering.',
    pmbCardBtnLabel: 'Register at spmb.umpo.ac.id',
    pmbCardUrl: 'https://spmb.umpo.ac.id',
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

    // Tab 2: Visi Misi & Tujuan
    visiBadge: d.visiBadge || fallback.visiBadge,
    visiText: d.visiText || fallback.visiText,
    misiTag: d.misiTag || fallback.misiTag,
    misiTitle: d.misiTitle || fallback.misiTitle,
    misiItems:
      Array.isArray(d.misiItems) && d.misiItems.length > 0
        ? d.misiItems.map((item: any, idx: number) => ({
            no: item?.no || String(idx + 1),
            title: item?.title || '',
            desc: item?.desc || '',
          }))
        : fallback.misiItems,
    tujuanTag: d.tujuanTag || fallback.tujuanTag,
    tujuanTitle: d.tujuanTitle || fallback.tujuanTitle,
    tujuanItems:
      Array.isArray(d.tujuanItems) && d.tujuanItems.length > 0
        ? d.tujuanItems.map((item: any, idx: number) => ({
            no: item?.no || String(idx + 1),
            title: item?.title || '',
            desc: item?.desc || '',
          }))
        : fallback.tujuanItems,

    // Tab 3: Struktur Organisasi
    strukturTag: d.strukturTag || fallback.strukturTag,
    strukturTitle: d.strukturTitle || fallback.strukturTitle,
    strukturDesc: d.strukturDesc || fallback.strukturDesc,
    kaprodiRole: d.kaprodiRole || fallback.kaprodiRole,
    kaprodiName: d.kaprodiName || fallback.kaprodiName,
    kaprodiNidn: d.kaprodiNidn || fallback.kaprodiNidn,
    sekprodiRole: d.sekprodiRole || fallback.sekprodiRole,
    sekprodiName: d.sekprodiName || fallback.sekprodiName,
    sekprodiNidn: d.sekprodiNidn || fallback.sekprodiNidn,
    lab1Role: d.lab1Role || fallback.lab1Role,
    lab1Name: d.lab1Name || fallback.lab1Name,
    lab1Nidn: d.lab1Nidn || fallback.lab1Nidn,
    lab2Role: d.lab2Role || fallback.lab2Role,
    lab2Name: d.lab2Name || fallback.lab2Name,
    lab2Nidn: d.lab2Nidn || fallback.lab2Nidn,
    dosenBoxTitle: d.dosenBoxTitle || fallback.dosenBoxTitle,
    dosenBoxDesc: d.dosenBoxDesc || fallback.dosenBoxDesc,
    dosenBoxBtnLabel: d.dosenBoxBtnLabel || fallback.dosenBoxBtnLabel,

    // Tab 4: Akreditasi
    akreditasiBadge: d.akreditasiBadge || fallback.akreditasiBadge,
    akreditasiTitle: d.akreditasiTitle || fallback.akreditasiTitle,
    akreditasiParagraph1: d.akreditasiParagraph1 || fallback.akreditasiParagraph1,
    akreditasiParagraph2: d.akreditasiParagraph2 || fallback.akreditasiParagraph2,
    akreditasiPoints:
      Array.isArray(d.akreditasiPoints) && d.akreditasiPoints.length > 0
        ? d.akreditasiPoints.map((item: any) =>
            typeof item === 'string' ? item : item?.text || ''
          )
        : fallback.akreditasiPoints,
    btnDocUrl: d.btnDocUrl || fallback.btnDocUrl,
    btnDocLabel: d.btnDocLabel || fallback.btnDocLabel,
    btnKonsultasiLabel: d.btnKonsultasiLabel || fallback.btnKonsultasiLabel,
    certGrade: d.certGrade || fallback.certGrade,
    certAgency: d.certAgency || fallback.certAgency,
    certSk: d.certSk || fallback.certSk,
    certScope: d.certScope || fallback.certScope,

    // Tab 5: Kontak & Lokasi
    hotlineTitle: d.hotlineTitle || fallback.hotlineTitle,
    hotlineNotice: d.hotlineNotice || fallback.hotlineNotice,
    waNumber: d.waNumber || fallback.waNumber,
    waPhone: d.waPhone || fallback.waPhone,
    emailLabel: d.emailLabel || fallback.emailLabel,
    emailValue: d.emailValue || fallback.emailValue,
    emailAlt: d.emailAlt || fallback.emailAlt,
    hoursLabel: d.hoursLabel || fallback.hoursLabel,
    hoursValue: d.hoursValue || fallback.hoursValue,
    hoursAlt: d.hoursAlt || fallback.hoursAlt,
    locationLabel: d.locationLabel || fallback.locationLabel,
    locationValue: d.locationValue || fallback.locationValue,
    locationAlt: d.locationAlt || fallback.locationAlt,
    mapsEmbed: d.mapsEmbed || fallback.mapsEmbed,
    mapsDirections: d.mapsDirections || fallback.mapsDirections,
    mapsTitle: d.mapsTitle || fallback.mapsTitle,
    mapsAddress: d.mapsAddress || fallback.mapsAddress,
    faqTitle: d.faqTitle || fallback.faqTitle,
    faqSubtitle: d.faqSubtitle || fallback.faqSubtitle,
    faqs:
      Array.isArray(d.faqs) && d.faqs.length > 0
        ? d.faqs.map((f: any) => ({
            q: f?.q || '',
            a: f?.a || '',
          }))
        : fallback.faqs,
    pmbCardTitle: d.pmbCardTitle || fallback.pmbCardTitle,
    pmbCardDesc: d.pmbCardDesc || fallback.pmbCardDesc,
    pmbCardBtnLabel: d.pmbCardBtnLabel || fallback.pmbCardBtnLabel,
    pmbCardUrl: d.pmbCardUrl || fallback.pmbCardUrl,
  }
}
