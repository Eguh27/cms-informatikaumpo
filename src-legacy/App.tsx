import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Users,
  Award,
  Sparkles,
  Laptop,
  Network,
  Cpu,
  Layers,
  Calendar,
  Building2,
  GraduationCap,
  FileText,
  Download,
  Phone,
  Mail,
  MapPin,
  Play,
  CheckCircle2,
  Code2,
  ShieldCheck,
  ArrowUpRight,
  Bookmark,
  BadgeCheck,
  Eye,
  Copy,
  Check,
} from "lucide-react";
import ProfilPage from "./pages/ProfilPage";
import AkademikPage from "./pages/AkademikPage";
import DosenPage from "./pages/DosenPage";
import FasilitasPage from "./pages/FasilitasPage";
import BeritaPage from "./pages/BeritaPage";
import DownloadPage from "./pages/DownloadPage";
import KontakPage from "./pages/KontakPage";

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
const LECTURERS: Lecturer[] = [
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

const NEWS: NewsItem[] = [
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

const CURRICULUM_TRACKS = [
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

const PARTNERS = [
  { name: "Oracle Academy", label: "Kurikulum Database & Java Global" },
  { name: "Cisco Networking Academy", label: "Sertifikasi CCNA & Jaringan Enterprise" },
  { name: "Microsoft Education", label: "Sertifikasi Kompetensi LPSI" },
  { name: "PAKO Group", label: "Mitra Magang & Rekrutmen Industri" },
  { name: "Kemdiktisaintek", label: "Riset & Pengabdian Masyarakat PKM" },
];

const DOWNLOADS = [
  { title: "Buku Pedoman Akademik S1 Teknik Informatika 2025/2026", size: "3.4 MB", type: "PDF", cat: "Pedoman" },
  { title: "Template Penulisan Proposal & Skripsi (Sesuai Panduan SISKRIP)", size: "1.2 MB", type: "DOCX", cat: "Skripsi" },
  { title: "Formulir Pendaftaran & Lembar Penilaian Magang Industri / KP", size: "640 KB", type: "PDF", cat: "Magang" },
  { title: "Panduan Kuliah Kerja Nyata (KKN) Tematik Berbasis Digital", size: "2.1 MB", type: "PDF", cat: "KKN" },
  { title: "Template Jurnal Ilmiah Mahasiswa Informatika UMPO", size: "850 KB", type: "DOCX", cat: "Publikasi" },
];

// Official WhatsApp icon component
function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.944 3.018.944 3.182 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.769-5.769-5.769zm3.432 8.163c-.144.404-.836.774-1.17.823-.312.043-.687.072-2.228-.567-1.782-.74-2.909-2.553-2.998-2.671-.088-.117-.723-.962-.723-1.835 0-.873.456-1.301.618-1.477.162-.176.353-.22.47-.22.118 0 .235.001.338.006.109.005.253-.041.396.301.147.353.5 1.22.544 1.308.044.088.073.191.015.308-.059.117-.088.191-.176.294-.088.103-.186.23-.265.309-.088.088-.18.184-.077.36.103.176.458.756.983 1.224.675.602 1.244.788 1.42.876.176.088.279.073.382-.044.103-.118.441-.514.559-.691.118-.176.235-.147.397-.088.162.059 1.029.485 1.205.573.176.088.294.132.338.206.044.074.044.426-.1 1.23z M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.306C8.423 21.492 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.15-.494-4.417-1.343l-.317-.213-3.278.86.875-3.197-.234-.338C3.722 14.67 3.2 13.374 3.2 12c0-4.852 3.948-8.8 8.8-8.8s8.8 3.948 8.8 8.8-3.948 8.8-8.8 8.8z" />
    </svg>
  );
}

// WhatsApp URL generator for lecturer consultations
const getWhatsAppUrl = (lecturerName: string) => {
  const text = `Halo Bapak/Ibu ${lecturerName} (Dosen S1 Teknik Informatika UMPO), saya ingin berkonsultasi mengenai akademik prodi.`;
  return `https://wa.me/6282267868648?text=${encodeURIComponent(text)}`;
};

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Dedicated Pages Routing State
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [profilInitialTab, setProfilInitialTab] = useState<"sejarah" | "visimisi" | "struktur" | "akreditasi">("sejarah");

  // Modals state
  const [modalType, setModalType] = useState<"sejarah" | "visimisi" | "struktur" | "video" | "download" | "search" | null>(null);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);

  // Search, Filter & Card Style
  const [searchQuery, setSearchQuery] = useState("");
  const [lecturerCategory, setLecturerCategory] = useState<"semua" | "pimpinan" | "lab" | "dosen">("semua");
  const [lecturerSearch, setLecturerSearch] = useState("");
  const [cardStyle, setCardStyle] = useState<"modern" | "badge" | "cyber">("modern");
  const [showAllLecturers, setShowAllLecturers] = useState(false);
  const [copiedNidn, setCopiedNidn] = useState(false);
  const [newsFilter, setNewsFilter] = useState<"Semua" | "Agenda" | "Akademik" | "Pengumuman">("Semua");

  const navigateTo = (page: PageId, subTab?: string) => {
    setCurrentPage(page);
    if (page === "profil" && subTab) {
      setProfilInitialTab(subTab as "sejarah" | "visimisi" | "struktur" | "akreditasi");
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.location.hash = page === "home" ? "" : page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase() as PageId;
      if (["home", "profil", "akademik", "dosen", "fasilitas", "berita", "download", "kontak"].includes(hash)) {
        setCurrentPage(hash);
      } else if (!window.location.hash || window.location.hash === "#home") {
        setCurrentPage("home");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      window.location.hash = "home";
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Lecturer category counts
  const lecturerCounts = useMemo(() => {
    return {
      semua: LECTURERS.length,
      pimpinan: LECTURERS.filter((l) => l.category === "pimpinan").length,
      lab: LECTURERS.filter((l) => l.category === "lab").length,
      dosen: LECTURERS.filter((l) => l.category === "dosen").length,
    };
  }, []);

  // Filtered Lecturers
  const filteredLecturers = useMemo(() => {
    return LECTURERS.filter((l) => {
      const matchCat = lecturerCategory === "semua" || l.category === lecturerCategory;
      const matchSearch =
        l.name.toLowerCase().includes(lecturerSearch.toLowerCase()) ||
        l.role.toLowerCase().includes(lecturerSearch.toLowerCase()) ||
        l.nidn.includes(lecturerSearch) ||
        l.focus.toLowerCase().includes(lecturerSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [lecturerCategory, lecturerSearch]);

  // Visible Lecturers (top 8 or all)
  const visibleLecturers = useMemo(() => {
    if (lecturerCategory !== "semua" || lecturerSearch.trim().length > 0 || showAllLecturers) {
      return filteredLecturers;
    }
    return filteredLecturers.slice(0, 8);
  }, [filteredLecturers, lecturerCategory, lecturerSearch, showAllLecturers]);

  // Filtered News
  const filteredNews = useMemo(() => {
    if (newsFilter === "Semua") return NEWS;
    return NEWS.filter((item) => item.category === newsFilter);
  }, [newsFilter]);

  // Global search matches
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: { title: string; type: string; action: () => void }[] = [];

    LECTURERS.forEach((lec) => {
      if (lec.name.toLowerCase().includes(q) || lec.role.toLowerCase().includes(q)) {
        results.push({
          title: `${lec.name} (${lec.role})`,
          type: "Dosen & Tendik",
          action: () => {
            setSelectedLecturer(lec);
            setModalType(null);
          },
        });
      }
    });

    NEWS.forEach((n) => {
      if (n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)) {
        results.push({
          title: n.title,
          type: `Berita · ${n.category}`,
          action: () => {
            scrollTo("berita");
            setModalType(null);
          },
        });
      }
    });

    CURRICULUM_TRACKS.forEach((track) => {
      if (track.title.toLowerCase().includes(q) || track.copy.toLowerCase().includes(q) || track.tags.some((t) => t.toLowerCase().includes(q))) {
        results.push({
          title: track.title,
          type: "Bidang Keahlian",
          action: () => {
            scrollTo("kurikulum");
            setModalType(null);
          },
        });
      }
    });

    const navSections = [
      { name: "Sejarah Program Studi", action: () => setModalType("sejarah") },
      { name: "Visi, Misi & Tujuan", action: () => setModalType("visimisi") },
      { name: "Struktur Organisasi", action: () => setModalType("struktur") },
      { name: "Laboratorium Komputer", action: () => scrollTo("fasilitas") },
      { name: "Pusat Unduhan / Template", action: () => setModalType("download") },
      { name: "Kontak & Lokasi Kampus", action: () => scrollTo("kontak") },
    ];

    navSections.forEach((s) => {
      if (s.name.toLowerCase().includes(q)) {
        results.push({
          title: s.name,
          type: "Halaman & Menu",
          action: () => {
            s.action();
            setModalType(null);
          },
        });
      }
    });

    return results;
  }, [searchQuery]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f9ff] text-[#08235b] selection:bg-[#2f6dff] selection:text-white">
      {/* ============================================================== */}
      {/* 1. NAVBAR DENGAN GAYA ELEGAN SEBELUMNYA                        */}
      {/* ============================================================== */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrollY > 40
            ? "bg-white/95 py-3 shadow-[0_12px_40px_rgba(15,56,130,.10)] backdrop-blur-xl border-b border-blue-50"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo & Identity */}
          <button onClick={() => navigateTo("home")} className="group flex items-center gap-3 text-left focus:outline-none">
            <span
              className={`grid size-11 place-items-center rounded-2xl p-1.5 transition-colors ${
                scrollY > 40 ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/20" : "bg-white text-[#1453d6] shadow-lg shadow-black/20"
              }`}
            >
              <img
                src="https://ti.umpo.ac.id/wp-content/uploads/2026/09/LOGO-UNMUH-150x150.png"
                alt="Logo UMPO"
                className="size-7 object-contain"
              />
            </span>
            <span
              className={`font-display text-lg font-bold leading-none tracking-tight transition-colors ${
                scrollY > 40 ? "text-[#08235b]" : "text-white"
              }`}
            >
              Informatika<br />
              <span className={scrollY > 40 ? "text-[#2f6dff]" : "text-[#bcd1ff]"}>UMPO</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className={`hidden items-center gap-6 lg:flex ${scrollY > 40 ? "text-[#365080]" : "text-white/90"}`}>
            <button
              onClick={() => navigateTo("home")}
              className={`nav-link text-sm font-semibold transition ${
                currentPage === "home" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
              }`}
            >
              Beranda
            </button>

            {/* Profil Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("profil")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigateTo("profil")}
                className={`nav-link flex items-center gap-1 text-sm font-semibold transition ${
                  currentPage === "profil" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
                }`}
              >
                Profil <ChevronDown className="size-3.5 opacity-70" />
              </button>
              {activeDropdown === "profil" && (
                <div className="absolute left-0 top-full w-60 pt-2">
                  <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-2 text-[#08235b] shadow-xl backdrop-blur-xl">
                    <button
                      onClick={() => navigateTo("profil", "sejarah")}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]"
                    >
                      <BookOpen className="size-4 text-[#1453d6]" /> Sejarah Pendirian
                    </button>
                    <button
                      onClick={() => navigateTo("profil", "visimisi")}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]"
                    >
                      <Award className="size-4 text-[#1453d6]" /> Visi & Misi
                    </button>
                    <button
                      onClick={() => navigateTo("profil", "struktur")}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]"
                    >
                      <Layers className="size-4 text-[#1453d6]" /> Struktur Organisasi
                    </button>
                    <button
                      onClick={() => navigateTo("profil", "akreditasi")}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]"
                    >
                      <ShieldCheck className="size-4 text-[#1453d6]" /> Akreditasi BAN-PT
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Akademik Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("akademik")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigateTo("akademik")}
                className={`nav-link flex items-center gap-1 text-sm font-semibold transition ${
                  currentPage === "akademik" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
                }`}
              >
                Akademik <ChevronDown className="size-3.5 opacity-70" />
              </button>
              {activeDropdown === "akademik" && (
                <div className="absolute left-0 top-full w-64 pt-2">
                  <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-2 text-[#08235b] shadow-xl backdrop-blur-xl">
                    <button
                      onClick={() => navigateTo("akademik")}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]"
                    >
                      <Laptop className="size-4 text-[#1453d6]" /> Kurikulum & Peminatan S1
                    </button>
                    <a
                      href="https://drive.google.com/file/d/1MBJ4e8JyA6YZPJl39maTZMhMiZ1B58SN/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]"
                    >
                      <FileText className="size-4 text-[#1453d6]" /> Silabus Kuliah (Drive)
                    </a>
                    <button
                      onClick={() => navigateTo("fasilitas")}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 hover:text-[#1453d6]"
                    >
                      <Network className="size-4 text-[#1453d6]" /> Laboratorium & Riset
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dosen & Tendik */}
            <button
              onClick={() => navigateTo("dosen")}
              className={`nav-link text-sm font-semibold transition ${
                currentPage === "dosen" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
              }`}
            >
              Dosen
            </button>

            {/* Fasilitas */}
            <button
              onClick={() => navigateTo("fasilitas")}
              className={`nav-link text-sm font-semibold transition ${
                currentPage === "fasilitas" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
              }`}
            >
              Fasilitas
            </button>

            {/* Berita */}
            <button
              onClick={() => navigateTo("berita")}
              className={`nav-link text-sm font-semibold transition ${
                currentPage === "berita" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
              }`}
            >
              Berita
            </button>

            {/* Download */}
            <button
              onClick={() => navigateTo("download")}
              className={`nav-link text-sm font-semibold transition ${
                currentPage === "download" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
              }`}
            >
              Unduhan
            </button>

            {/* Kontak */}
            <button
              onClick={() => navigateTo("kontak")}
              className={`nav-link text-sm font-semibold transition ${
                currentPage === "kontak" ? (scrollY > 40 ? "text-[#1453d6] font-bold" : "text-white font-bold") : ""
              }`}
            >
              Kontak
            </button>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setModalType("search")}
              aria-label="Cari di website"
              className={`grid size-10 place-items-center rounded-full transition ${
                scrollY > 40 ? "bg-[#eaf0ff] text-[#1453d6] hover:bg-blue-100" : "bg-white/15 text-white hover:bg-white/25"
              }`}
            >
              <Search className="size-4" />
            </button>
            <a
              href="https://spmb.umpo.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                scrollY > 40
                  ? "bg-[#1453d6] text-white shadow-[0_10px_24px_rgba(20,83,214,.25)] hover:bg-[#0f44b3]"
                  : "bg-white text-[#1147b5] shadow-lg shadow-black/15 hover:bg-blue-50"
              }`}
            >
              Pendaftaran PMB
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setModalType("search")}
              aria-label="Cari"
              className={`grid size-10 place-items-center rounded-full ${
                scrollY > 40 ? "bg-[#eaf0ff] text-[#1453d6]" : "bg-white/15 text-white"
              }`}
            >
              <Search className="size-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`grid size-11 place-items-center rounded-full ${
                scrollY > 40 ? "bg-[#eaf0ff] text-[#1453d6]" : "bg-white/15 text-white backdrop-blur-md"
              }`}
              aria-label="Buka menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="mx-4 mt-3 rounded-3xl bg-white p-5 shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              <button
                onClick={() => navigateTo("home")}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left font-semibold text-[#16356e]"
              >
                Beranda <ChevronRight className="size-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateTo("profil")}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left font-semibold text-[#16356e]"
              >
                Profil Program Studi <ChevronRight className="size-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateTo("akademik")}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left font-semibold text-[#16356e]"
              >
                Kurikulum & Akademik <ChevronRight className="size-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateTo("dosen")}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left font-semibold text-[#16356e]"
              >
                Dosen & Tendik <ChevronRight className="size-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateTo("fasilitas")}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left font-semibold text-[#16356e]"
              >
                Fasilitas Laboratorium <ChevronRight className="size-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateTo("berita")}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left font-semibold text-[#16356e]"
              >
                Berita & Agenda <ChevronRight className="size-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateTo("download")}
                className="flex w-full items-center justify-between border-b border-[#e4ebfb] py-3.5 text-left font-semibold text-[#16356e]"
              >
                Pusat Unduhan Dokumen <ChevronRight className="size-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateTo("kontak")}
                className="flex w-full items-center justify-between py-3.5 text-left font-semibold text-[#16356e]"
              >
                Kontak & Lokasi <ChevronRight className="size-4 text-slate-400" />
              </button>
              <div className="pt-3">
                <a
                  href="https://spmb.umpo.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1453d6] py-3.5 text-center text-sm font-bold text-white shadow-lg"
                >
                  Pendaftaran PMB <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================== */}
      {/* 2. HERO SECTION ASLI YANG DISUKAI USER ("BAGUSAN SEBELUMNYA")  */}
      {/* ============================================================== */}
      {currentPage === "home" && (
        <main>
          <section id="home" className="relative min-h-[96vh] overflow-hidden bg-[#07328d]">
          {/* Parallax full-bleed background */}
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage:
                "linear-gradient(100deg, rgba(3,27,81,.94) 8%, rgba(8,53,143,.76) 50%, rgba(3,29,89,.32) 100%), url('https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1800')",
              transform: `translateY(${Math.min(scrollY * 0.24, 160)}px) scale(1.1)`,
            }}
          />
          <div className="absolute inset-0 hero-grid opacity-25" />
          <div className="absolute -right-32 -top-40 size-[36rem] rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute -right-16 -top-24 size-[26rem] rounded-full border border-white/15 pointer-events-none" />

          {/* Hero text & headline */}
          <div className="relative mx-auto flex min-h-[96vh] max-w-7xl items-center px-5 pb-20 pt-32 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="font-display text-[clamp(3.2rem,8vw,7.8rem)] font-semibold leading-[.9] tracking-[-.055em] text-white">
                Code the future.<br />
                <span className="text-outline">Shape the world.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#d5e3ff] md:text-xl">
                Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo yang menghubungkan teknologi,
                kreativitas, dan dampak nyata untuk masa depan Indonesia berbasis nilai-nilai keislaman.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => navigateTo("akademik")}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#0b43b0] shadow-[0_16px_36px_rgba(0,0,0,.18)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,.25)]"
                >
                  Eksplorasi Kurikulum & Program
                  <span className="grid size-8 place-items-center rounded-full bg-[#e7eeff] text-[#1453d6] transition-transform group-hover:translate-x-1">
                    <ArrowRight className="size-4" />
                  </span>
                </button>

                <button
                  onClick={() => navigateTo("profil")}
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-1"
                >
                  Profil & Visi Keilmuan
                  <ChevronRight className="size-4 opacity-70 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom dock statistics */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto flex max-w-7xl items-end justify-between px-5 lg:px-8">
              <div className="relative z-10 hidden pb-8 text-xs font-semibold uppercase tracking-[.25em] text-white/60 md:block">
                Gulir untuk menjelajah
              </div>
              <div className="relative z-10 flex overflow-hidden rounded-t-[2rem] bg-[#0b3b9a]/65 text-white shadow-2xl backdrop-blur-xl">
                {[
                  ["B", "Akreditasi BAN-PT"],
                  ["800+", "Mahasiswa Aktif"],
                  ["30+", "Dosen & Tendik"],
                  ["1.800+", "Alumni"]
                ].map(([value, label]) => (
                  <div key={label} className="border-r border-white/15 px-5 py-5 last:border-0 sm:px-8">
                    <div className="font-display text-2xl font-bold">{value}</div>
                    <div className="mt-1 text-[.65rem] text-white/65 sm:text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cloud divider */}
          <div className="cloud-divider" aria-hidden="true">
            <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
              <path
                className="cloud-shadow"
                d="M0 116C102 73 174 104 246 117c79 14 115-55 208-43 75 9 91 62 167 46 71-15 111-81 213-54 56 15 67 70 148 58 98-15 108-79 210-60 79 14 101 62 178 39 29-9 52-17 70-18v95H0Z"
              />
              <path
                className="cloud-main"
                d="M0 134c93-1 117-53 204-49 80 4 111 68 202 43 74-20 94-67 177-64 92 3 111 81 211 55 77-20 93-67 179-58 76 8 94 69 189 56 84-11 132-64 278-35v98H0Z"
              />
            </svg>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. PROFIL & TENTANG KAMI DENGAN KONTEN RESMI TI.UMPO.AC.ID    */}
        {/* ============================================================== */}
        <section id="profil" className="relative overflow-hidden py-24 lg:py-36">
          <div className="orb absolute -left-32 top-32 size-80 rounded-full bg-[#d9e7ff] blur-3xl pointer-events-none" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <div className="relative">
              <div className="overflow-hidden rounded-[2.5rem] shadow-[0_32px_80px_rgba(14,58,146,.18)]">
                <img
                  src="https://ti.umpo.ac.id/wp-content/uploads/2026/09/gedung-ti-1024x820.webp"
                  alt="Gedung Fakultas Teknik dan Program Studi Teknik Informatika UMPO"
                  className="aspect-[4/3.2] w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 max-w-72 rounded-3xl border border-white/50 bg-white/90 p-5 shadow-2xl backdrop-blur-xl md:right-8">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-[#1453d6] text-white">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#08235b]">Gelar Kelulusan</div>
                    <div className="font-display text-base font-extrabold text-[#2f6dff]">S.Kom. (Sarjana Komputer)</div>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#59709b]">
                  “Membangun talenta digital berkarakter Islami untuk masa depan yang lebih baik.”
                </p>
              </div>
            </div>

            <div className="lg:pl-10">
              <div className="section-label">Profil Program Studi</div>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-.04em] text-[#09275e] md:text-6xl">
                Teknik Informatika UMPO
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#59709b]">
                Program studi Teknik Informatika merupakan salah satu prodi jenjang S1 unggulan di kalangan
                Universitas Muhammadiyah Ponorogo yang berdiri pada tahun 2005 dengan izin penyelenggaraan berdasarkan{" "}
                <strong className="text-[#09275e]">SK Ditjen DIKTI No. 378/D/T/2005</strong>. Telah terakreditasi BAN-PT{" "}
                <strong className="text-[#09275e]">No. 0206/SKB/BAN-PT/Akred/S/I/2017</strong> dengan Peringkat B.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigateTo("profil", "sejarah")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#0f44b3]"
                >
                  <BookOpen className="size-4" /> Baca Sejarah Prodi
                </button>
                <button
                  onClick={() => navigateTo("profil", "visimisi")}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3.5 text-sm font-bold text-[#1453d6] transition hover:-translate-y-0.5 hover:border-[#1453d6]"
                >
                  <Award className="size-4" /> Visi, Misi & Roadmap
                </button>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-5">
                <div className="rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(22,62,135,.08)]">
                  <div className="font-display text-4xl font-bold text-[#1453d6]">2</div>
                  <div className="mt-2 text-sm font-semibold">Laboratorium Terpadu</div>
                </div>
                <div className="rounded-3xl bg-[#1453d6] p-6 text-white shadow-[0_16px_40px_rgba(20,83,214,.22)]">
                  <div className="font-display text-4xl font-bold">1:18</div>
                  <div className="mt-2 text-sm font-medium text-white/75">Rasio Dosen dan Mahasiswa</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. KURIKULUM & ROADMAP KEILMUAN                                 */}
        {/* ============================================================== */}
        <section id="kurikulum" className="bg-[#061d4e] py-24 text-white lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="section-label section-label-light">Kurikulum Masa Depan</div>
                <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-[-.04em] md:text-6xl">
                  Pilih fokusmu. Ciptakan terobosanmu.
                </h2>
              </div>
              <p className="max-w-sm leading-relaxed text-[#9eb5df]">
                Tiga rumpun kompetensi keilmuan yang dirancang bersama industri agar kompetensimu selalu relevan.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {CURRICULUM_TRACKS.map((program) => {
                const IconComp = program.icon;
                return (
                  <article
                    key={program.title}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.06] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#5590ff]/60 hover:bg-[#1047ad] md:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-[#82aeff] transition group-hover:bg-white group-hover:text-[#1453d6]">
                        <IconComp className="size-7" />
                      </span>
                      <span className="font-display text-sm text-white/30">{program.number}</span>
                    </div>
                    <h3 className="mt-10 font-display text-2xl font-semibold">{program.title}</h3>
                    <p className="mt-4 leading-relaxed text-[#aebfe1] transition group-hover:text-white/75">
                      {program.copy}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {program.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 border-t border-white/10 pt-4 text-xs font-semibold text-[#8ab3ff]">
                      Prospek: {program.prospects}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Direct Google Drive link from ti.umpo.ac.id */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:flex-row sm:px-8">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-white/10 text-[#6edbff]">
                  <FileText className="size-6" />
                </div>
                <div>
                  <div className="font-bold text-white">Struktur Kurikulum & Silabus Mata Kuliah</div>
                  <div className="text-xs text-[#9eb5df]">Unduh dokumen kurikulum lengkap berformat PDF dari Google Drive resmi</div>
                </div>
              </div>
              <a
                href="https://drive.google.com/file/d/1MBJ4e8JyA6YZPJl39maTZMhMiZ1B58SN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#061d4e] transition hover:bg-[#6edbff]"
              >
                Unduh Kurikulum (Drive) <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. DOSEN & PENELITI (21 DOSEN ASLI TI UMPO)                    */}
        {/* ============================================================== */}
        <section id="dosen" className="relative overflow-hidden bg-slate-50/50 py-24 lg:py-32">
          {/* Ambient Lighting & Glow */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute right-0 top-1/3 size-96 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="section-label">Tenaga Pendidik & Peneliti</div>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-.04em] text-[#09275e] md:text-5xl lg:text-6xl">
                  Dosen & Pakar Teknologi Berdedikasi.
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-sm md:text-base leading-relaxed text-[#64789c]">
                  21 akademisi & praktisi S2/S3 Fakultas Teknik UMPO yang aktif membimbing, meneliti, dan membawa teknologi industri mutakhir langsung ke ruang kelas.
                </p>
                {/* Micro stats */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-slate-200 shadow-xs">
                    <Award className="size-3.5 text-amber-500" /> 21 Dosen Tetap
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-slate-200 shadow-xs">
                    <BadgeCheck className="size-3.5 text-emerald-500" /> 100% Ber-NIDN
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-slate-200 shadow-xs">
                    <Cpu className="size-3.5 text-blue-500" /> Riset AI, RPL & IoT
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Tabs, Style Switcher & Search Bar */}
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Category Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { key: "semua", label: "Semua Dosen", count: lecturerCounts.semua },
                    { key: "pimpinan", label: "Pimpinan Prodi", count: lecturerCounts.pimpinan },
                    { key: "lab", label: "Ka. Laboratorium", count: lecturerCounts.lab },
                    { key: "dosen", label: "Dosen Pengajar", count: lecturerCounts.dosen },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setLecturerCategory(tab.key as any);
                      }}
                      className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                        lecturerCategory === tab.key
                          ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/25"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                          lecturerCategory === tab.key
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Right controls: Style Switcher & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Style Switcher */}
                  <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/80 self-start sm:self-auto">
                    <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Gaya:
                    </span>
                    <button
                      onClick={() => setCardStyle("modern")}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                        cardStyle === "modern"
                          ? "bg-white text-[#1453d6] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      title="Gaya Kartu Modern Studio"
                    >
                      Grid Modern
                    </button>
                    <button
                      onClick={() => setCardStyle("badge")}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                        cardStyle === "badge"
                          ? "bg-white text-[#1453d6] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      title="Gaya ID Badge / Horizontal"
                    >
                      ID Badge
                    </button>
                    <button
                      onClick={() => setCardStyle("cyber")}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                        cardStyle === "cyber"
                          ? "bg-[#06183d] text-cyan-300 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      title="Gaya Dark Cyber Glass"
                    >
                      Cyber Glass
                    </button>
                  </div>

                  {/* Search Field */}
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={lecturerSearch}
                      onChange={(e) => setLecturerSearch(e.target.value)}
                      placeholder="Cari dosen, NIDN..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-8 text-xs font-medium text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
                    />
                    {lecturerSearch && (
                      <button
                        onClick={() => setLecturerSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Active search / filter status counter */}
            {(lecturerSearch.trim() || lecturerCategory !== "semua") && (
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
                <div>
                  Menampilkan <span className="font-bold text-[#09275e]">{visibleLecturers.length}</span> dari {filteredLecturers.length} dosen yang cocok
                  {lecturerSearch && <span> untuk kata kunci &ldquo;<strong className="text-slate-700">{lecturerSearch}</strong>&rdquo;</span>}
                </div>
                <button
                  onClick={() => {
                    setLecturerSearch("");
                    setLecturerCategory("semua");
                  }}
                  className="font-bold text-[#1453d6] hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Lecturers Grid with selected style */}
            <div
              className={`mt-8 grid gap-6 ${
                cardStyle === "badge"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {visibleLecturers.map((lecturer) => {
                // Style 1: Modern Grid (Vertical studio)
                if (cardStyle === "modern") {
                  return (
                    <article
                      key={lecturer.name}
                      onClick={() => setSelectedLecturer(lecturer)}
                      className="glass-card group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_10px_30px_-5px_rgba(9,45,116,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2.5 hover:border-[#1453d6]/40 hover:bg-white/95 hover:shadow-[0_24px_50px_-10px_rgba(20,83,214,0.2)] cursor-pointer"
                    >
                      {/* Portrait Frame */}
                      <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-white/90">
                        <div className="absolute inset-0 lecturer-avatar-backdrop opacity-70" />
                        <div className="absolute inset-0 lecturer-dot-pattern opacity-40" />

                        {/* Floating Category Badge with Glass Effect */}
                        <div className="absolute left-3.5 top-3.5 z-10">
                          {lecturer.category === "pimpinan" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-bold text-white shadow-md shadow-amber-500/20 backdrop-blur-md border border-amber-300/40">
                              <Award className="size-3.5" /> Pimpinan
                            </span>
                          )}
                          {lecturer.category === "lab" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/90 px-3 py-1 text-[11px] font-bold text-white shadow-md shadow-teal-600/20 backdrop-blur-md border border-teal-300/40">
                              <Cpu className="size-3.5" /> Ka. Lab
                            </span>
                          )}
                          {lecturer.category === "dosen" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1453d6]/90 px-3 py-1 text-[11px] font-bold text-white shadow-md shadow-blue-600/20 backdrop-blur-md border border-blue-300/40">
                              <GraduationCap className="size-3.5" /> Dosen
                            </span>
                          )}
                        </div>

                        {/* Verified Badge */}
                        <div className="absolute right-3.5 top-3.5 z-10">
                          <span
                            className="grid size-7 place-items-center rounded-full bg-white/90 text-emerald-600 shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:scale-110 border border-white"
                            title="Dosen Tetap Terverifikasi PDDIKTI"
                          >
                            <BadgeCheck className="size-4" />
                          </span>
                        </div>

                        <img
                          src={lecturer.image}
                          alt={lecturer.name}
                          className="size-full object-cover object-top transition duration-500 ease-out group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLElement).setAttribute(
                              "src",
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                            );
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#08235b] shadow-xl transition-transform duration-300 hover:scale-105 border border-white">
                            <Eye className="size-3.5 text-[#1453d6]" /> Lihat Profil
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex flex-1 flex-col justify-between p-5 pt-3">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#1453d6]">
                            {lecturer.role}
                          </div>
                          <h3
                            className="mt-1 font-display text-[15px] font-bold leading-snug text-[#08235b] transition-colors group-hover:text-[#1453d6] line-clamp-2"
                            title={lecturer.name}
                          >
                            {lecturer.name}
                          </h3>

                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700 shadow-xs backdrop-blur-sm">
                              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                NIDN
                              </span>
                              {lecturer.nidn}
                            </span>
                            <span className="text-[11px] font-medium text-slate-400">S1 TI UMPO</span>
                          </div>

                          <div className="mt-3 rounded-xl border border-blue-100/80 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white/50 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50/80">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-blue-600">
                              <Sparkles className="size-3 text-amber-500 animate-pulse" /> Bidang Riset & Fokus
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-slate-600" title={lecturer.focus}>
                              {lecturer.focus}
                            </p>
                          </div>
                        </div>

                        {/* Footer: Detail CTA + WhatsApp CTA */}
                        <div className="mt-4 flex items-center justify-between border-t border-slate-100/80 pt-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1453d6] transition-colors group-hover:text-[#08235b]">
                            Detail Lengkap{" "}
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                          </span>
                          <a
                            href={getWhatsAppUrl(lecturer.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title={`Chat WhatsApp dengan ${lecturer.name}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-emerald-500/20 transition-all hover:bg-[#1ebd59] hover:shadow-md hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
                          >
                            <WhatsAppIcon className="size-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                }

                // Style 2: ID Badge (Horizontal Smart Card)
                if (cardStyle === "badge") {
                  return (
                    <article
                      key={lecturer.name}
                      onClick={() => setSelectedLecturer(lecturer)}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1453d6]/40 hover:shadow-[0_20px_40px_-15px_rgba(20,83,214,0.14)] cursor-pointer"
                    >
                      <div>
                        {/* ID Badge Header Bar */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            Dosen Tetap TI UMPO
                          </span>
                          <span className="font-mono text-slate-500">ID #{lecturer.nidn.slice(-4)}</span>
                        </div>

                        {/* Main Info with Horizontal Layout */}
                        <div className="mt-4 flex items-start gap-4">
                          {/* Portrait Left */}
                          <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 shadow-inner">
                            <img
                              src={lecturer.image}
                              alt={lecturer.name}
                              className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLElement).setAttribute(
                                  "src",
                                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                                );
                              }}
                            />
                            <div className="absolute bottom-1 right-1 grid size-5 place-items-center rounded-full bg-emerald-600 text-white shadow-xs">
                              <BadgeCheck className="size-3" />
                            </div>
                          </div>

                          {/* Details Right */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {lecturer.category === "pimpinan" && (
                                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                                  Pimpinan
                                </span>
                              )}
                              {lecturer.category === "lab" && (
                                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 border border-teal-200">
                                  Ka. Lab
                                </span>
                              )}
                              {lecturer.category === "dosen" && (
                                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1453d6] border border-blue-200">
                                  Dosen
                                </span>
                              )}
                              <span className="font-mono text-[10px] text-slate-400">NIDN {lecturer.nidn}</span>
                            </div>

                            <h3 className="mt-1.5 font-display text-[15px] font-bold leading-snug text-[#09275e] group-hover:text-[#1453d6] transition-colors line-clamp-2">
                              {lecturer.name}
                            </h3>
                            <p className="mt-0.5 text-[11px] font-medium text-slate-500 line-clamp-1">{lecturer.role}</p>
                          </div>
                        </div>

                        {/* Research Focus */}
                        <div className="mt-3.5 rounded-xl bg-slate-50/80 p-2.5 border border-slate-100 text-xs">
                          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <Sparkles className="size-3 text-amber-500" /> Fokus Riset
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-slate-600">{lecturer.focus}</p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1453d6]">
                          Lihat Detail <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <a
                          href={getWhatsAppUrl(lecturer.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#1ebd59] transition"
                          title={`Chat WhatsApp dengan ${lecturer.name}`}
                        >
                          <WhatsAppIcon className="size-3.5" /> WhatsApp
                        </a>
                      </div>
                    </article>
                  );
                }

                // Style 3: Cyber Glass (Futuristic Dark Navy)
                return (
                  <article
                    key={lecturer.name}
                    onClick={() => setSelectedLecturer(lecturer)}
                    className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-blue-900/60 bg-gradient-to-b from-[#081b3d] to-[#040e22] text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_20px_45px_-10px_rgba(6,182,212,0.18)] cursor-pointer"
                  >
                    {/* Top Portrait */}
                    <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-gradient-to-b from-[#0e2a5e] to-[#081b3d]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(110,219,255,0.2),transparent_70%)]" />

                      {/* Badges */}
                      <div className="absolute left-3.5 top-3.5 z-10">
                        {lecturer.category === "pimpinan" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                            <Award className="size-3.5" /> Pimpinan
                          </span>
                        )}
                        {lecturer.category === "lab" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/90 px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                            <Cpu className="size-3.5" /> Ka. Lab
                          </span>
                        )}
                        {lecturer.category === "dosen" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                            <GraduationCap className="size-3.5" /> Dosen
                          </span>
                        )}
                      </div>

                      <div className="absolute right-3.5 top-3.5 z-10">
                        <span className="grid size-7 place-items-center rounded-full bg-black/40 text-cyan-300 backdrop-blur-md border border-cyan-400/30">
                          <BadgeCheck className="size-4" />
                        </span>
                      </div>

                      <img
                        src={lecturer.image}
                        alt={lecturer.name}
                        className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute(
                            "src",
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                          );
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#081b3d] to-transparent" />

                      {/* Hover pill */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-[#06183d] shadow-xl">
                          <Eye className="size-3.5 text-[#06183d]" /> Lihat Profil
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-5 pt-3">
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                          {lecturer.role}
                        </div>
                        <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-white group-hover:text-cyan-200 transition-colors line-clamp-2">
                          {lecturer.name}
                        </h3>

                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-800/80 bg-blue-950/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-blue-200">
                            <span className="font-sans text-[10px] font-bold text-blue-400">NIDN</span>
                            {lecturer.nidn}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400/80">INFORMATIKA</span>
                        </div>

                        <div className="mt-3 rounded-xl border border-blue-900/60 bg-blue-950/40 p-3">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300/80">
                            <Sparkles className="size-3 text-amber-400" /> Bidang Riset & Fokus
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-300 leading-relaxed">
                            {lecturer.focus}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-blue-900/60 pt-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                          Detail Lengkap <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <a
                          href={getWhatsAppUrl(lecturer.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#1ebd59] shadow-md shadow-emerald-500/20"
                          title={`Chat WhatsApp dengan ${lecturer.name}`}
                        >
                          <WhatsAppIcon className="size-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}

              {filteredLecturers.length === 0 && (
                <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                  <Users className="mx-auto size-12 text-slate-300" />
                  <h4 className="mt-4 font-display text-lg font-bold text-slate-700">Dosen tidak ditemukan</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Tidak ada data dosen yang sesuai dengan kata kunci &ldquo;{lecturerSearch}&rdquo;.
                  </p>
                  <button
                    onClick={() => {
                      setLecturerSearch("");
                      setLecturerCategory("semua");
                    }}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#071c4a]"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>

            {/* Direct Link to Dosen Directory Page */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo("dosen")}
                className="group inline-flex items-center gap-3 rounded-full bg-[#1453d6] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#0e3ea6]"
              >
                Buka Direktori Lengkap 21 Dosen TI UMPO
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              {lecturerCategory === "semua" && !lecturerSearch && filteredLecturers.length > 8 && (
                <button
                  onClick={() => setShowAllLecturers(!showAllLecturers)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  {showAllLecturers ? "Ringkas Tampilan" : "Buka Semua di Halaman Ini"}
                  <ChevronDown className={`size-3.5 transition-transform ${showAllLecturers ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. KEHIDUPAN MAHASISWA & HIMATIF UMPO (PARALLAX BANNER ASLI)   */}
        {/* ============================================================== */}
        <section
          id="himatif"
          className="relative min-h-[38rem] overflow-hidden bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(4,28,82,.9),rgba(8,53,143,.32)),url('https://images.unsplash.com/photo-1663162551013-8bb8ab151e11?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1800')",
          }}
        >
          <div className="absolute inset-0 parallax-lines opacity-30" />
          <div className="relative mx-auto flex min-h-[38rem] max-w-7xl items-center px-5 lg:px-8">
            <div className="max-w-2xl text-white">
              <div className="section-label section-label-light">Kehidupan Mahasiswa & HIMATIF</div>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-[-.045em] md:text-7xl">
                Eksperimen. Kolaborasi. Bertumbuh.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#d3e1ff]">
                Dari Himpunan Mahasiswa Teknik Informatika (HIMATIF), coding bootcamp, hackathon, kompetisi nasional,
                hingga riset pengabdian masyarakat, pengalaman belajarmu jauh melampaui ruang kelas.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="https://instagram.com/informatika.umpo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-bold text-[#134dbf] shadow-lg transition hover:-translate-y-1 hover:bg-[#e7eeff]"
                >
                  Lihat Instagram @informatika.umpo <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. FASILITAS LABORATORIUM                                      */}
        {/* ============================================================== */}
        <section id="fasilitas" className="bg-[#f0f4fc] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <div className="section-label">Sarana & Prasarana</div>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.04em] text-[#09275e] md:text-5xl">
                Laboratorium Komputer Terpadu
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#59709b]">
                Infrastruktur praktikum modern untuk menunjang riset rekayasa perangkat lunak, kecerdasan buatan, dan jaringan komputer.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_16px_40px_rgba(22,62,135,.06)]">
                <div className="grid size-14 place-items-center rounded-2xl bg-[#eaf0fc] text-[#1453d6]">
                  <Network className="size-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-[#09275e]">Lab Jaringan & IoT</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#59709b]">
                  Pusat simulasi jaringan enterprise, perangkat router/switch Cisco & Mikrotik, IoT kit, dan cyber security.
                </p>
                <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-[#1453d6]">
                  Ka. Lab: Angga Prasetyo, S.T., M.Kom.
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_16px_40px_rgba(22,62,135,.06)]">
                <div className="grid size-14 place-items-center rounded-2xl bg-[#eaf0fc] text-[#1453d6]">
                  <Code2 className="size-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-[#09275e]">Lab Rekayasa Perangkat Lunak</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#59709b]">
                  Fasilitas komputasi untuk pengembangan web, mobile apps, database architecture, dan sistem informasi enterprise.
                </p>
                <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-[#1453d6]">
                  Ka. Lab: Ir. Moh. Bhanu Setyawan, S.T., M.Kom.
                </div>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_16px_40px_rgba(22,62,135,.06)]">
                <div className="grid size-14 place-items-center rounded-2xl bg-[#eaf0fc] text-[#1453d6]">
                  <BookOpen className="size-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-[#09275e]">Perpustakaan Pusat UMPO</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#59709b]">
                  Akses ribuan literatur buku TIK, jurnal internasional bereputasi (IEEE, ScienceDirect), e-library, dan ruang kolaborasi.
                </p>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <a
                    href="https://library.umpo.ac.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1453d6] hover:underline"
                  >
                    Buka Perpustakaan UMPO <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. MITRA RESMI KAMPUS                                          */}
        {/* ============================================================== */}
        <section className="border-y border-slate-200 bg-white py-14">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Our Strategic Partners</div>
              <h3 className="mt-2 font-display text-2xl font-bold text-[#09275e]">Kemitraan Industri & Teknologi Global</h3>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:-translate-y-1 hover:border-[#1453d6] hover:bg-white hover:shadow-md"
                >
                  <div className="font-display text-base font-bold text-[#09275e]">{partner.name}</div>
                  <div className="mt-1 text-[11px] text-[#59709b]">{partner.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. BERITA TERBARU (KONTEN ASLI TI.UMPO.AC.ID)                  */}
        {/* ============================================================== */}
        <section id="berita" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="section-label">Cerita & Pengumuman</div>
                <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-.04em] text-[#09275e] md:text-6xl">
                  Yang sedang terjadi.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Semua", "Agenda", "Akademik", "Pengumuman"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsFilter(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                      newsFilter === cat
                        ? "bg-[#1453d6] text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item) => (
                <article key={item.id} className="group flex flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                  <div>
                    {item.image ? (
                      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1453d6] backdrop-blur">
                          {item.category}
                        </span>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/6] items-center justify-between rounded-2xl bg-[#09275e] p-6 text-white">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{item.category}</span>
                        <Bookmark className="size-5 text-white/50" />
                      </div>
                    )}

                    <div className="pt-5">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#7386a8]">
                        <Calendar className="size-3.5" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-[#0b2b66] transition group-hover:text-[#2f6dff]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#64789c]">{item.excerpt}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <a
                      href="https://ti.umpo.ac.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1453d6] hover:text-[#2f6dff]"
                    >
                      Baca Selengkapnya di Portal <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10. PENDAFTARAN MAHASISWA BARU (BANNER ASLI)                   */}
        {/* ============================================================== */}
        <section id="admissions" className="px-5 pb-10 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#1453d6] px-6 py-16 text-center text-white md:px-16 md:py-24">
            <div className="absolute -left-20 -top-20 size-72 rounded-full border-[3rem] border-white/5 pointer-events-none" />
            <div className="absolute -bottom-36 -right-20 size-96 rounded-full border-[4rem] border-white/5 pointer-events-none" />
            <div className="relative">
              <Sparkles className="mx-auto size-10 text-[#9fc0ff]" />
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-.045em] md:text-6xl">
                Siap menjadi bagian dari Teknik Informatika UMPO?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-[#c9dcff]">
                Mulai perjalananmu bersama Informatika UMPO dan ciptakan inovasi teknologi yang bermakna bagi bangsa dan umat.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://spmb.umpo.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-7 py-4 font-bold text-[#124bb8] shadow-xl transition hover:-translate-y-1"
                >
                  Daftar Sekarang (spmb.umpo.ac.id)
                </a>
                <button
                  onClick={() => setModalType("download")}
                  className="rounded-full border border-white/30 px-7 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  Unduh Panduan & Template
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      )}

      {/* ============================================================== */}
      {/* DEDICATED PAGES (PROFIL, AKADEMIK, DOSEN, FASILITAS, BERITA, DOWNLOAD, KONTAK) */}
      {/* ============================================================== */}
      {currentPage === "profil" && (
        <ProfilPage initialTab={profilInitialTab} onNavigate={navigateTo} />
      )}

      {currentPage === "akademik" && (
        <AkademikPage onNavigate={navigateTo} />
      )}

      {currentPage === "dosen" && (
        <DosenPage
          lecturers={LECTURERS}
          onSelectLecturer={setSelectedLecturer}
          onNavigate={navigateTo}
          getWhatsAppUrl={getWhatsAppUrl}
          whatsAppIcon={WhatsAppIcon}
        />
      )}

      {currentPage === "fasilitas" && (
        <FasilitasPage onNavigate={navigateTo} />
      )}

      {currentPage === "berita" && (
        <BeritaPage newsList={NEWS} onNavigate={navigateTo} />
      )}

      {currentPage === "download" && (
        <DownloadPage downloads={DOWNLOADS} onNavigate={navigateTo} />
      )}

      {currentPage === "kontak" && (
        <KontakPage onNavigate={navigateTo} whatsAppIcon={WhatsAppIcon} />
      )}

      {/* ============================================================== */}
      {/* 11. FOOTER DENGAN KONTEN ASLI TI.UMPO.AC.ID                     */}
      {/* ============================================================== */}
      <footer id="kontak" className="bg-[#041333] px-5 pb-10 pt-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* Identity & Address */}
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-white text-[#1453d6] p-1.5">
                  <img
                    src="https://ti.umpo.ac.id/wp-content/uploads/2026/09/LOGO-UNMUH-150x150.png"
                    alt="Logo UMPO"
                    className="size-7 object-contain"
                  />
                </span>
                <span className="font-display text-xl font-bold">Teknik Informatika UMPO</span>
              </div>
              <p className="mt-5 max-w-sm leading-relaxed text-[#859ac2] text-xs">
                Program Studi S1 Teknik Informatika, Fakultas Teknik Universitas Muhammadiyah Ponorogo. Membangun talenta digital berkarakter Islami.
              </p>
              <div className="mt-4 text-xs text-[#a3b8e0] space-y-1">
                <div>SK Ditjen DIKTI No. 378/D/T/2005</div>
                <div>Akreditasi B BAN-PT (SK No. 0206/SKB/BAN-PT/Akred/S/I/2017)</div>
              </div>
            </div>

            {/* Menu Akademik */}
            <div>
              <div className="font-display font-semibold">Jelajahi</div>
              <div className="mt-5 grid gap-3 text-sm text-[#859ac2]">
                <button onClick={() => navigateTo("profil", "sejarah")} className="text-left hover:text-white transition">
                  Sejarah Prodi
                </button>
                <button onClick={() => navigateTo("profil", "visimisi")} className="text-left hover:text-white transition">
                  Visi & Misi
                </button>
                <button onClick={() => navigateTo("akademik")} className="text-left hover:text-white transition">
                  Kurikulum & Peminatan
                </button>
                <button onClick={() => navigateTo("dosen")} className="text-left hover:text-white transition">
                  Dosen & Tendik
                </button>
                <button onClick={() => navigateTo("fasilitas")} className="text-left hover:text-white transition">
                  Laboratorium & Riset
                </button>
                <button onClick={() => navigateTo("download")} className="text-left hover:text-white transition">
                  Unduhan Dokumen
                </button>
                <button onClick={() => navigateTo("kontak")} className="text-left hover:text-white transition">
                  Kontak Resmi
                </button>
              </div>
            </div>

            {/* Tautan Layanan Kampus */}
            <div>
              <div className="font-display font-semibold">Layanan Kampus</div>
              <div className="mt-5 grid gap-3 text-sm text-[#859ac2]">
                <a href="https://spmb.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  SPMB UMPO
                </a>
                <a href="https://simtik.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  SIMTIK (SIAKAD)
                </a>
                <a href="https://siskrip.simakumpo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  SISKRIP (Skripsi)
                </a>
                <a href="https://giat.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  KKN GIAT UMPO
                </a>
                <a href="https://library.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Perpustakaan
                </a>
                <a href="https://tracer.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Tracer Study
                </a>
              </div>
            </div>

            {/* Kontak Resmi */}
            <div>
              <div className="font-display font-semibold">Hubungi Kami</div>
              <div className="mt-5 grid gap-3 text-xs text-[#859ac2] leading-relaxed">
                <span>Jl. Budi Utomo No.10, Ronowijayan, Kec. Siman, Kab. Ponorogo, Jawa Timur 63471</span>
                <span>Telp. (0352) 481124, 487662 (psw 2211)</span>
                <span>Fax : (0352) 461796</span>
                <span>informatika@umpo.ac.id</span>
                <span>teknik@umpo.ac.id</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-[#687da5] md:flex-row">
            <span>© 2026 Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo.</span>
            <div className="flex gap-4">
              <a href="https://instagram.com/informatika.umpo" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram: @informatika.umpo
              </a>
              <span>•</span>
              <a href="https://ti.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                ti.umpo.ac.id
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* MODALS (SEJARAH, VISI MISI, STRUKTUR, VIDEO, DOWNLOAD, SEARCH) */}
      {/* ============================================================== */}
      {modalType === "sejarah" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white p-6 shadow-2xl md:p-8">
            <button
              onClick={() => setModalType(null)}
              className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1453d6]">
              <BookOpen className="size-4" /> Arsip Sejarah
            </div>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[#06183d]">
              Sejarah Program Studi Teknik Informatika UMPO
            </h3>
            <div className="mt-6 space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="rounded-2xl bg-blue-50/70 p-4 border border-blue-100">
                <div className="font-bold text-[#1453d6]">Fondasi dan Perintisan Program Studi</div>
                <p className="mt-1.5">
                  Universitas Muhammadiyah Ponorogo (UMPO) memiliki akar sejarah yang kuat, bermula pada tahun 1960
                  sebagai Institut Agama Islam Muhammadiyah Ponorogo. Institusi ini berkembang pesat hingga pada tahun
                  1986 resmi menjadi universitas yang menandai berdirinya Fakultas Teknik.
                </p>
                <p className="mt-1.5">
                  Program Studi Teknik Informatika secara resmi didirikan pada tahun 2005 dengan izin penyelenggaraan
                  berdasarkan <strong>Surat Keputusan Ditjen DIKTI No. 378/D/T/2005</strong>. Pendirian ini menjawab
                  kebutuhan akselerasi teknologi informasi dan komunikasi (TIK) berlandaskan nilai-nilai keislaman.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="font-bold text-[#06183d]">Evolusi Akademik & Kurikulum</div>
                <p className="mt-1.5">
                  Kurikulum dirancang berbasis kompetensi profesi dalam dua rumpun ilmiah utama: Rekayasa Perangkat Lunak
                  & Data serta Sistem Cerdas (Artificial Intelligence). Lulusan dianugerahi gelar Sarjana Komputer (S.Kom.).
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="font-bold text-[#06183d]">Riwayat Akreditasi BAN-PT Berkelanjutan</div>
                <p className="mt-1 text-slate-600">
                  Konsisten mempertahankan status akreditasi B berdasarkan SK No. 0206/SKB/BAN-PT/Akred/S/I/2017 yang berlaku berkelanjutan s/d 2027.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="rounded-full bg-[#1453d6] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#06183d]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "visimisi" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white p-6 shadow-2xl md:p-8">
            <button
              onClick={() => setModalType(null)}
              className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1453d6]">
              <Award className="size-4" /> Visi, Misi & Roadmap
            </div>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[#06183d]">
              Visi, Misi, dan Tujuan
            </h3>
            <div className="mt-6 space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#1453d6]">Visi Program Studi</div>
                <p className="mt-2 text-sm font-semibold text-[#06183d]">
                  “Mengembangkan disiplin ilmu algoritma komputasi untuk bidang industri dan pemerintahan berbasis
                  nilai-nilai Islami.”
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#06183d]">Misi</div>
                <ol className="mt-2.5 list-decimal space-y-2 pl-4 text-xs text-slate-700">
                  <li>
                    Menyelenggarakan pengajaran yang berkualitas untuk menghasilkan lulusan Teknik Informatika yang berkemampuan akademik unggul dalam bidang komputasi.
                  </li>
                  <li>
                    Meningkatkan kemampuan civitas akademika dalam pengembangan penelitian dan pengabdian untuk kemajuan masyarakat dalam bidang komputasi.
                  </li>
                  <li>
                    Mengimplementasikan nilai-nilai Al Islam dan Kemuhammadiyahan pada semua aspek kegiatan.
                  </li>
                </ol>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#06183d]">Tujuan</div>
                <p className="mt-2 text-xs text-slate-700">
                  Menghasilkan lulusan yang unggul dalam keilmuan Algoritma Komputasi untuk bidang industri dan pemerintahan berbasis nilai-nilai Islami.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#06183d]">Roadmap Keilmuan</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="font-bold text-[#1453d6]">1. Kecerdasan Buatan (AI)</div>
                    <div className="mt-1 text-[11px] text-slate-600">
                      Computer Vision, IoT, Sistem Cerdas, Sistem Pakar, Machine Learning
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="font-bold text-[#1453d6]">2. Rekayasa Perangkat Lunak</div>
                    <div className="mt-1 text-[11px] text-slate-600">
                      Sistem Informasi, Pemrograman Perangkat Bergerak (Mobile), Web & Cloud
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="rounded-full bg-[#1453d6] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#06183d]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "struktur" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white p-6 shadow-2xl md:p-8">
            <button
              onClick={() => setModalType(null)}
              className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1453d6]">
              <Layers className="size-4" /> Tata Kelola Program Studi
            </div>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[#06183d]">
              Struktur Organisasi Teknik Informatika
            </h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border-2 border-[#1453d6]/30 bg-blue-50/50 p-4 text-center">
                <span className="rounded-full bg-[#1453d6] px-3 py-1 text-[10px] font-bold text-white">
                  Ketua Program Studi
                </span>
                <div className="mt-2 font-display text-base font-bold text-[#06183d]">
                  Adi Fajaryanto Cobantoro, S.Kom., M.Kom.
                </div>
                <div className="text-xs text-slate-500">NIDN: 0724098406</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <span className="rounded-full bg-[#179bd7] px-3 py-1 text-[10px] font-bold text-white">
                  Sekretaris Program Studi
                </span>
                <div className="mt-2 font-display text-base font-bold text-[#06183d]">
                  Ismail Abdurrazzaq Zulkarnain, S.Kom., M.Kom.
                </div>
                <div className="text-xs text-slate-500">NIDN: 0728078805</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-[11px] font-bold uppercase text-[#1453d6]">Ka. Lab Jaringan & IoT</div>
                  <div className="mt-1 text-xs font-bold text-slate-800">Angga Prasetyo, S.T., M.Kom.</div>
                  <div className="text-[11px] text-slate-500">NIDN: 0719088202</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-[11px] font-bold uppercase text-[#1453d6]">Ka. Lab Komputer / RPL</div>
                  <div className="mt-1 text-xs font-bold text-slate-800">Ir. Moh. Bhanu Setyawan, S.T., M.Kom.</div>
                  <div className="text-[11px] text-slate-500">NIDN: 0725028002</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="rounded-full bg-[#1453d6] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#06183d]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "video" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl">
            <button
              onClick={() => setModalType(null)}
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/90"
            >
              <X className="size-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/qt1sF9lPCK0?autoplay=1"
                title="Profil Teknik Informatika UMPO"
                className="size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {modalType === "download" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white p-6 shadow-2xl md:p-8">
            <button
              onClick={() => setModalType(null)}
              className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1453d6]">
              <Download className="size-4" /> Download Center
            </div>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[#06183d]">
              Template & Dokumen Akademik
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Unduh formulir, buku pedoman, dan template resmi untuk mahasiswa Teknik Informatika UMPO.
            </p>
            <div className="mt-6 space-y-3">
              {DOWNLOADS.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#1453d6] hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-[#1453d6]">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#06183d]">{doc.title}</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-semibold uppercase text-[#1453d6]">{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.cat}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://teknik.umpo.ac.id/layanan-terpadu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1453d6] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#06183d]"
                  >
                    Unduh <Download className="size-3.5" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="rounded-full bg-slate-200 px-6 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "search" && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
            <div className="flex items-center border-b border-slate-200 px-4 py-3.5">
              <Search className="size-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik untuk mencari dosen, mata kuliah, berita, atau layanan..."
                className="w-full bg-transparent px-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setModalType(null)}
                className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {searchQuery.trim() === "" ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  Ketik kata kunci untuk menemukan informasi di portal Prodi Teknik Informatika UMPO.
                </div>
              ) : globalSearchResults.length > 0 ? (
                <div className="space-y-2">
                  {globalSearchResults.map((res, i) => (
                    <button
                      key={i}
                      onClick={res.action}
                      className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-blue-50"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#06183d]">{res.title}</div>
                        <div className="text-[10px] text-[#1453d6]">{res.type}</div>
                      </div>
                      <ChevronRight className="size-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-500">
                  Tidak ada hasil yang cocok dengan &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedLecturer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-[#06183d] via-[#0d348a] to-[#1453d6] px-6 py-5 text-white">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8eb3ff]">
                Program Studi S1 Teknik Informatika · Fakultas Teknik UMPO
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/90">Profil Dosen & Peneliti</span>
                <button
                  onClick={() => setSelectedLecturer(null)}
                  className="grid size-8 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25"
                  title="Tutup"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="max-h-[calc(92vh-80px)] overflow-y-auto p-6 md:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                {/* Photo with verified badge */}
                <div className="relative mx-auto size-36 shrink-0 overflow-hidden rounded-2xl border-4 border-slate-100 bg-slate-100 shadow-lg sm:mx-0">
                  <img
                    src={selectedLecturer.image}
                    alt={selectedLecturer.name}
                    className="size-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute(
                        "src",
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                      );
                    }}
                  />
                  <div className="absolute bottom-2 right-2 grid size-7 place-items-center rounded-full bg-emerald-600 text-white shadow-md" title="Terverifikasi PDDIKTI">
                    <BadgeCheck className="size-4" />
                  </div>
                </div>

                {/* Main details */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    {selectedLecturer.category === "pimpinan" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-0.5 text-xs font-bold text-amber-700 border border-amber-300">
                        <Award className="size-3.5" /> Pimpinan Prodi
                      </span>
                    )}
                    {selectedLecturer.category === "lab" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/15 px-3 py-0.5 text-xs font-bold text-teal-700 border border-teal-300">
                        <Cpu className="size-3.5" /> Ka. Laboratorium
                      </span>
                    )}
                    {selectedLecturer.category === "dosen" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-0.5 text-xs font-bold text-[#1453d6] border border-blue-200">
                        <GraduationCap className="size-3.5" /> Dosen & Peneliti
                      </span>
                    )}
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                      Aktif Mengajar
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-[#06183d]">
                    {selectedLecturer.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{selectedLecturer.role}</p>
                </div>
              </div>

              {/* Identification Grid */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nomor Induk Dosen (NIDN)</div>
                    <div className="font-mono text-sm font-bold text-slate-800">{selectedLecturer.nidn}</div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedLecturer.nidn);
                      setCopiedNidn(true);
                      setTimeout(() => setCopiedNidn(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:border-[#1453d6] hover:text-[#1453d6]"
                    title="Salin NIDN"
                  >
                    {copiedNidn ? (
                      <>
                        <Check className="size-3 text-emerald-600" /> Disalin!
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" /> Salin
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nomor Induk Karyawan (NIK)</div>
                  <div className="font-mono text-sm font-bold text-slate-800">{selectedLecturer.nik}</div>
                </div>
              </div>

              {/* Research Focus */}
              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1453d6]">
                  <Sparkles className="size-4 text-amber-500" /> Bidang Fokus Riset & Kepakaran
                </div>
                <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[#072464]">
                  {selectedLecturer.focus}
                </p>
              </div>

              {/* Layanan Akademik */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Layanan & Bimbingan Akademik
                </div>
                <div className="mt-2.5 grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-lg bg-white p-2 border border-slate-100">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Bimbingan Skripsi</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white p-2 border border-slate-100">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Dosen PA / KRS</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white p-2 border border-slate-100">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Riset Mahasiswa</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsAppUrl(selectedLecturer.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-[#1ebd59] hover:shadow-emerald-500/40"
                >
                  <WhatsAppIcon className="size-4" /> Hubungi via WhatsApp
                </a>
                <a
                  href={`mailto:informatika@umpo.ac.id?subject=Konsultasi Akademik: ${encodeURIComponent(selectedLecturer.name)}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                  title="Kirim Email Alternatif"
                >
                  <Mail className="size-4 text-slate-500" /> Email
                </a>
                <a
                  href="https://ti.umpo.ac.id/dosen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-3.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                >
                  Portal ti.umpo.ac.id <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
