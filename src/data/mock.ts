import { Cpu, Code2, Network } from "lucide-react";

// --- TYPES ---
export type PageId =
  | "home"
  | "profil"
  | "akademik"
  | "dosen"
  | "fasilitas"
  | "berita"
  | "download"
  | "kontak";

interface Lecturer {
  name: string;
  role: string;
  nidn: string;
  nik: string;
  image: string;
  category: "pimpinan" | "dosen" | "lab";
  focus: string;
}

interface NewsItem {
  id: string;
  title: string;
  category: "Agenda" | "Akademik" | "Pengumuman";
  date: string;
  image?: string;
  excerpt: string;
  readTime: string;
}

// --- OFFICIAL DATA FROM TI.UMPO.AC.ID ---
export const LECTURERS: Lecturer[] = [
  {
    name: "Adi Fajaryanto Cobantoro, S.Kom., M.Kom.",
    role: "Ka. Prodi Teknik Informatika",
    nidn: "0724098406",
    nik: "19840924 201309 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-adi.png",
    category: "pimpinan",
    focus: "Tata Kelola TI, Rekayasa Perangkat Lunak & Sistem Cerdas",
  },
  {
    name: "Ismail Abdurrazzaq Zulkarnain, S.Kom., M.Kom.",
    role: "Sekretaris Prodi Teknik Informatika",
    nidn: "0728078805",
    nik: "19880728 201804 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-mail.png",
    category: "pimpinan",
    focus: "Algoritma Komputasi & Software Engineering",
  },
  {
    name: "Angga Prasetyo, S.T., M.Kom.",
    role: "Ka. Lab Jaringan Komputer & IoT",
    nidn: "0719088202",
    nik: "19820819 201112 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-angga.png",
    category: "lab",
    focus: "Jaringan Komputer, Cyber Security & Internet of Things",
  },
  {
    name: "Ir. Moh. Bhanu Setyawan, S.T., M.Kom.",
    role: "Ka. Lab Prodi Teknik Informatika",
    nidn: "0725028002",
    nik: "19800225 201309 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-bhanu.png",
    category: "lab",
    focus: "Sistem Informasi & Rekayasa Perangkat Lunak",
  },
  {
    name: "Dr. Ir. Fauzan Masykur, ST, M.Kom.",
    role: "Dosen & Peneliti",
    nidn: "0716038101",
    nik: "19810316 202109 12",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-fauzan.png",
    category: "dosen",
    focus: "Kecerdasan Buatan, Computer Vision & Data Mining",
  },
  {
    name: "Dr. Ghulam Asrofi Buntoro, S.T., M.Eng.",
    role: "Dosen & Peneliti",
    nidn: "0723078702",
    nik: "19870723 202109 12",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-ghulam.png",
    category: "dosen",
    focus: "Natural Language Processing & Machine Learning",
  },
  {
    name: "Dr. Ir. Aslan Alwi, S.SI, M.Cs.",
    role: "Dosen & Peneliti",
    nidn: "0924127201",
    nik: "19720324 201101 12",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-aslan.jpg",
    category: "dosen",
    focus: "Komputasi Cerdas & Algoritma Tingkat Lanjut",
  },
  {
    name: "Dr. Ir. Aliyadi, MM, M.Kom.",
    role: "Dosen Senior",
    nidn: "0703016301",
    nik: "19640103 199009 12",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-aliyadi.png",
    category: "dosen",
    focus: "Manajemen Sistem Informasi & Komputasi Organisasi",
  },
  {
    name: "Ir. Andy Triyanto Pujo Raharjo, M.Kom.",
    role: "Dosen",
    nidn: "0721057102",
    nik: "19710521 201101 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-andy.png",
    category: "dosen",
    focus: "Arsitektur Komputer & Pemrograman Lanjut",
  },
  {
    name: "Ir. Arin Yuli Astuti, S.Kom., M.Kom.",
    role: "Dosen",
    nidn: "0717078903",
    nik: "19890717 201309 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-arin.png",
    category: "dosen",
    focus: "Interaksi Manusia Komputer & Web Technology",
  },
  {
    name: "Dra. Ida Widaningrum, M.Kom.",
    role: "Dosen",
    nidn: "0717046601",
    nik: "19660417 201101 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-ida.png",
    category: "dosen",
    focus: "Basis Data & Struktur Data Komputasi",
  },
  {
    name: "Dyah Mustikasari, S.T, M.Eng.",
    role: "Dosen",
    nidn: "0707108707",
    nik: "19871007 201609 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-dyah.jpg",
    category: "dosen",
    focus: "Sistem Terdistribusi & Rekayasa Data",
  },
  {
    name: "Ellisia Kumalasari, S.Pd., M.Pd.",
    role: "Dosen",
    nidn: "0405098502",
    nik: "19850905 201309 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-ellisia.png",
    category: "dosen",
    focus: "Pendidikan Vokasi TIK & Literasi Digital",
  },
  {
    name: "Elok Putri Nimasari, S.Pd., M.Pd.",
    role: "Dosen",
    nidn: "0705059102",
    nik: "19910505 202109 12",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-elok-edited.jpeg",
    category: "dosen",
    focus: "Bahasa Inggris Komputasi & Komunikasi Ilmiah",
  },
  {
    name: "Indah Puji Astuti, S.Kom., M.Kom.",
    role: "Dosen",
    nidn: "0724048605",
    nik: "19860424 201609 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/FOTO-BG-MERAH.jpeg",
    category: "dosen",
    focus: "Rekayasa Perangkat Lunak & Mobile Programming",
  },
  {
    name: "Jamilah Karaman, S.Kom., M.Kom.",
    role: "Dosen",
    nidn: "0722039006",
    nik: "19900322 201909 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-jamilah.png",
    category: "dosen",
    focus: "Sistem Pendukung Keputusan & Kecerdasan Buatan",
  },
  {
    name: "Ir. Khoiru Nurfitri, S.Kom., M.Kom.",
    role: "Dosen",
    nidn: "0730049201",
    nik: "19920430 201808 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-fitri.png",
    category: "dosen",
    focus: "Jaringan Komputer & Cloud Infrastructure",
  },
  {
    name: "Munirah Muslim, S.Kom., M.T.",
    role: "Dosen",
    nidn: "0907117901",
    nik: "1979110720091213",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-munirah.png",
    category: "dosen",
    focus: "Sistem Informasi Geografis & Multimedia",
  },
  {
    name: "Rifqi Rahmatika Az-Zahra, S.Kom., M.Kom.",
    role: "Dosen",
    nidn: "0731109302",
    nik: "19931031 202303 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-zahra.png",
    category: "dosen",
    focus: "Data Science & Kecerdasan Buatan",
  },
  {
    name: "Sugianti, S.SI., M.Kom.",
    role: "Dosen",
    nidn: "0705057803",
    nik: "19780505 201101 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/bu-sugianti.png",
    category: "dosen",
    focus: "Analisis Algoritma & Pemodelan Matematika",
  },
  {
    name: "Yovi Litanianda, S.Pd, M.Kom.",
    role: "Dosen",
    nidn: "0721028102",
    nik: "19810221 201309 13",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/pak-yovi.jpg",
    category: "dosen",
    focus: "Teknologi Pembelajaran Komputer & Multimedia",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: "news-1",
    title:
      "Pemberdayaan Masyarakat melalui Penerapan Teknologi Coffee Pulper untuk Penguatan Kemandirian Ekonomi Dusun Ganen",
    category: "Agenda",
    date: "30 September 2026",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/2026_08_11_09_56_10_IMG_0118-768x576.jpg",
    excerpt:
      "Dosen dan mahasiswa Teknik Informatika UMPO menerapkan teknologi tepat guna berbasis otomasi untuk pengolahan kopi di Dusun Ganen.",
    readTime: "3 min baca",
  },
  {
    id: "news-2",
    title: "Magang Industri Mahasiswa Teknik Informatika di PAKO Group",
    category: "Akademik",
    date: "29 September 2026",
    image: "https://ti.umpo.ac.id/wp-content/uploads/2026/09/irham-768x576.jpeg",
    excerpt:
      "Pengalaman nyata mahasiswa TI UMPO dalam mengimplementasikan rekayasa sistem informasi dan otomatisasi pada lingkungan manufaktur otomotif global.",
    readTime: "4 min baca",
  },
  {
    id: "news-3",
    title:
      "Tim PKM Kemdiktisaintek 2026 UMPO Serahkan Mesin Pengolah Kompos kepada Kelompok Tani Margo Rukun Desa Cepoko",
    category: "Agenda",
    date: "28 September 2026",
    image:
      "https://ti.umpo.ac.id/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-28-at-14.14.44-768x576.jpeg",
    excerpt:
      "Kolaborasi pengabdian masyarakat skema Kemdiktisaintek melahirkan mesin cerdas pengolah kompos terintegrasi sensor kelembaban.",
    readTime: "3 min baca",
  },
  {
    id: "news-4",
    title: "Pendaftaran Sertifikasi Komputer Microsoft (LPSI) Gelombang 1",
    category: "Pengumuman",
    date: "22 September 2026",
    excerpt:
      "Membuka kesempatan bagi seluruh mahasiswa aktif Teknik Informatika untuk memperoleh sertifikasi keahlian berstandar Microsoft Internasional.",
    readTime: "2 min baca",
  },
  {
    id: "news-5",
    title: "Pendaftaran Sertifikasi Kewirausahaan (KWU) Angkatan XXIX",
    category: "Pengumuman",
    date: "22 September 2026",
    excerpt:
      "Program inkubasi technopreneurship untuk melahirkan founder startup teknologi dan inovator digital muda berkemajuan.",
    readTime: "2 min baca",
  },
  {
    id: "news-6",
    title:
      "Pendaftaran Program ESSA / Sertifikasi Bahasa Inggris (Serbing) Gelombang 1",
    category: "Pengumuman",
    date: "22 September 2026",
    excerpt:
      "Penguatan kecakapan bahasa Inggris internasional untuk kesiapan lulusan berkompetisi di bursa kerja global.",
    readTime: "2 min baca",
  },
];

export const CURRICULUM_TRACKS = [
  {
    id: "ai",
    number: "01",
    title: "Kecerdasan Buatan & Sistem Cerdas",
    copy: "Mengembangkan disiplin ilmu algoritma komputasi mutakhir untuk otomasi industri dan tata kelola cerdas.",
    tags: ["Computer Vision", "Machine Learning", "IoT", "Sistem Pakar", "Deep Learning"],
    prospects: "AI Engineer, Data Scientist, Machine Learning Researcher, IoT Architect",
    icon: Cpu,
  },
  {
    id: "rpl",
    number: "02",
    title: "Rekayasa Perangkat Lunak & Data",
    copy: "Merancang arsitektur sistem informasi modern, aplikasi mobile cerdas, dan rekayasa platform cloud berskala besar.",
    tags: ["Web & Cloud Architecture", "Mobile Development", "Database Systems", "Big Data", "DevOps"],
    prospects: "Fullstack Developer, Software Engineer, Mobile Developer, Database Administrator",
    icon: Code2,
  },
  {
    id: "jaringan",
    number: "03",
    title: "Infrastruktur Jaringan & Keamanan Siber",
    copy: "Menguasai keamanan siber, topologi jaringan tingkat enterprise, dan sistem terdistribusi berdaya tahan tinggi.",
    tags: ["Cisco Routing & Switching", "Cyber Security", "Cloud Computing", "Mikrotik MTCNA", "Ethical Hacking"],
    prospects: "Network Security Engineer, Cloud Specialist, System Administrator, SOC Analyst",
    icon: Network,
  },
];

export const PARTNERS = [
  { name: "Oracle Academy", label: "Kurikulum Database & Java Global" },
  { name: "Cisco Networking Academy", label: "Sertifikasi CCNA & Jaringan Enterprise" },
  { name: "Microsoft Education", label: "Sertifikasi Kompetensi LPSI" },
  { name: "PAKO Group", label: "Mitra Magang & Rekrutmen Industri" },
  { name: "Kemdiktisaintek", label: "Riset & Pengabdian Masyarakat PKM" },
];

export const DOWNLOADS = [
  { title: "Buku Pedoman Akademik S1 Teknik Informatika 2025/2026", size: "3.4 MB", type: "PDF", cat: "Pedoman" },
  { title: "Template Penulisan Proposal & Skripsi (Sesuai Panduan SISKRIP)", size: "1.2 MB", type: "DOCX", cat: "Skripsi" },
  { title: "Formulir Pendaftaran & Lembar Penilaian Magang Industri / KP", size: "640 KB", type: "PDF", cat: "Magang" },
  { title: "Panduan Kuliah Kerja Nyata (KKN) Tematik Berbasis Digital", size: "2.1 MB", type: "PDF", cat: "KKN" },
  { title: "Template Jurnal Ilmiah Mahasiswa Informatika UMPO", size: "850 KB", type: "DOCX", cat: "Publikasi" },
];
