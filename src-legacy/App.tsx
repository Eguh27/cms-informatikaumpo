import React, { useState, useEffect, useMemo, useRef } from "react";
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
  Terminal,
  Rocket,
  Database,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ProfilPage from "./pages/ProfilPage";
import AkademikPage from "./pages/AkademikPage";
import DosenPage from "./pages/DosenPage";
import FasilitasPage from "./pages/FasilitasPage";
import BeritaPage from "./pages/BeritaPage";
import DownloadPage from "./pages/DownloadPage";
import KontakPage from "./pages/KontakPage";
import Hero from "./Hero";

gsap.registerPlugin(ScrollTrigger);

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

// Animated Number Counter on Viewport Entry
function AnimatedCounter({ end, duration = 1200, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}{suffix}</span>;
}

// Reveal Wrapper Component for Scroll Animations
function Reveal({
  children,
  className = "",
  delayClass = "",
}: {
  children: React.ReactNode;
  className?: string;
  delayClass?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-init ${active ? "reveal-active" : ""} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}

// Organic SVG Wave Divider
function WaveDivider({
  fill = "#FFFFFF",
  className = "",
  flip = false,
}: {
  fill?: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-10 md:h-16 lg:h-20 ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0,24 C320,72 640,-12 960,36 C1200,72 1360,28 1440,24 L1440,84 L0,84 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [navLoaded, setNavLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setNavLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Close lecturer modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLecturer(null);
      }
    };
    if (selectedLecturer) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedLecturer]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lenis smooth scroll — single instance at app level
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out ${
          navLoaded ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        } ${
          scrollY > 40
            ? "bg-white/95 py-2.5 shadow-[0_12px_40px_rgba(15,56,130,.10)] backdrop-blur-2xl border-b border-blue-100"
            : "bg-transparent py-4 md:py-5 border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo & Identity */}
          <button onClick={() => navigateTo("home")} className="group flex items-center gap-3 text-left focus:outline-none">
            <span
              className="grid size-11 place-items-center rounded-2xl bg-[#1453d6] p-1.5 text-white shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105"
            >
              <img
                src="https://ti.umpo.ac.id/wp-content/uploads/2026/09/LOGO-UNMUH-150x150.png"
                alt="Logo UMPO"
                className="size-7 object-contain"
              />
            </span>
            <span
              className="font-display text-lg font-bold leading-none tracking-tight text-[#08235b]"
            >
              Informatika<br />
              <span className="text-[#1453d6]">UMPO</span>
            </span>
          </button>

          {/* Desktop Navigation Links — high-contrast crisp text */}
          <div className="hidden items-center gap-2 lg:flex text-[#203f6b]">
            <button
              onClick={() => navigateTo("home")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                currentPage === "home"
                  ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                  : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
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
                className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  currentPage === "profil"
                    ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                    : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
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
                className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  currentPage === "akademik"
                    ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                    : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
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
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                currentPage === "dosen"
                  ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                  : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
              }`}
            >
              Dosen
            </button>

            {/* Fasilitas */}
            <button
              onClick={() => navigateTo("fasilitas")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                currentPage === "fasilitas"
                  ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                  : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
              }`}
            >
              Fasilitas
            </button>

            {/* Berita */}
            <button
              onClick={() => navigateTo("berita")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                currentPage === "berita"
                  ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                  : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
              }`}
            >
              Berita
            </button>

            {/* Download */}
            <button
              onClick={() => navigateTo("download")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                currentPage === "download"
                  ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                  : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
              }`}
            >
              Unduhan
            </button>

            {/* Kontak */}
            <button
              onClick={() => navigateTo("kontak")}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                currentPage === "kontak"
                  ? "bg-[#eaf4ff] text-[#1453d6] font-bold shadow-sm shadow-blue-500/10"
                  : "text-[#203f6b] hover:bg-blue-50/80 hover:text-[#1453d6]"
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
              className="grid size-10 place-items-center rounded-full bg-[#eaf0ff] text-[#1453d6] transition-all hover:bg-blue-100 hover:scale-105"
            >
              <Search className="size-4" />
            </button>
            <a
              href="https://spmb.umpo.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#1453d6] px-6 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(20,83,214,.25)] transition-all hover:-translate-y-0.5 hover:bg-[#0f44b3] hover:shadow-[0_14px_28px_rgba(20,83,214,.35)] active:translate-y-0"
            >
              <span>Pendaftaran PMB</span>
              <span className="size-2 rounded-full bg-[#FFB84D] animate-ping" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setModalType("search")}
              aria-label="Cari"
              className="grid size-10 place-items-center rounded-full bg-[#eaf0ff] text-[#1453d6]"
            >
              <Search className="size-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid size-11 place-items-center rounded-full bg-[#eaf0ff] text-[#1453d6]"
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
      {/* 2. HERO SECTION — Multi-layer Parallax Baru                    */}
      {/* ============================================================== */}
      {currentPage === "home" && (
        <main>
          <Hero navigateTo={navigateTo} />

        {/* ============================================================== */}
        {/* 3. PROFIL & TENTANG KAMI DENGAN KONTEN RESMI TI.UMPO.AC.ID    */}
        {/* ============================================================== */}
        <section id="profil" className="relative overflow-hidden bg-[#FFFBF5] py-24 lg:py-32">
          {/* Subtle warm glow orb */}
          <div className="orb absolute -left-32 top-32 size-80 rounded-full bg-[#FFE8CC]/40 blur-3xl pointer-events-none" />
          <div className="orb absolute right-0 top-1/2 size-96 rounded-full bg-[#EAF4FF]/60 blur-3xl pointer-events-none" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <Reveal className="relative">
              <div className="overflow-hidden rounded-[2.5rem] border border-[#1E6FD9]/15 bg-white p-2 shadow-[0_20px_60px_-15px_rgba(15,42,74,0.12)]">
                <img
                  src="/assets/hero/gedung-cerah.webp"
                  alt="Gedung Fakultas Teknik dan Program Studi Teknik Informatika UMPO"
                  className="aspect-[4/3.2] w-full rounded-[2rem] object-cover object-center transition duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 max-w-72 rounded-3xl border border-white/80 bg-white/95 p-5 shadow-[0_16px_36px_rgba(11,58,140,0.12)] backdrop-blur-xl md:right-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl bg-[#1E6FD9] text-white shadow-md shadow-blue-500/25">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#4B6B94]">Gelar Kelulusan</div>
                    <div className="font-display text-base font-extrabold text-[#0B3A8C]">S.Kom. (Sarjana Komputer)</div>
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[#4B6B94]">
                  &ldquo;Membangun talenta digital berkarakter Islami untuk masa depan yang lebih baik.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delayClass="reveal-delay-2" className="lg:pl-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] border border-[#1E6FD9]/20">
                <Sparkles className="size-3.5 text-[#FFB84D]" /> Profil Program Studi
              </div>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-[-.04em] text-[#0B3A8C] md:text-5xl lg:text-6xl">
                Teknik Informatika UMPO
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-[#4B6B94]">
                Program studi Teknik Informatika merupakan salah satu prodi jenjang S1 unggulan di kalangan
                Universitas Muhammadiyah Ponorogo yang berdiri pada tahun 2005 dengan izin penyelenggaraan berdasarkan{" "}
                <strong className="text-[#0B3A8C]">SK Ditjen DIKTI No. 378/D/T/2005</strong>. Telah terakreditasi BAN-PT{" "}
                <strong className="text-[#0B3A8C]">No. 0206/SKB/BAN-PT/Akred/S/I/2017</strong> dengan Peringkat B.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigateTo("profil", "sejarah")}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#1E6FD9] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-[#0B3A8C] hover:shadow-xl"
                >
                  <BookOpen className="size-4" /> Baca Sejarah Prodi
                </button>
                <button
                  onClick={() => navigateTo("profil", "visimisi")}
                  className="inline-flex items-center gap-2.5 rounded-full border-1.5 border-[#1E6FD9]/30 bg-[#FFFBF5] px-7 py-3.5 text-sm font-bold text-[#0B3A8C] transition-all hover:-translate-y-0.5 hover:border-[#1E6FD9] hover:bg-[#EAF4FF]"
                >
                  <Award className="size-4 text-[#FFB84D]" /> Visi, Misi & Roadmap
                </button>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-5">
                <div className="rounded-3xl border border-[#1E6FD9]/10 bg-white p-6 shadow-[0_12px_32px_rgba(15,42,74,0.06)]">
                  <div className="font-display text-4xl font-extrabold text-[#1E6FD9]">
                    <AnimatedCounter end={2} />
                  </div>
                  <div className="mt-2 text-sm font-bold text-[#0F2A4A]">Laboratorium Terpadu</div>
                  <div className="mt-0.5 text-xs text-[#4B6B94]">Lab Jaringan IoT & Lab RPL</div>
                </div>
                <div className="rounded-3xl border border-[#FFB84D]/30 bg-gradient-to-br from-[#1E6FD9] to-[#0B3A8C] p-6 text-white shadow-[0_16px_36px_rgba(30,111,217,0.25)]">
                  <div className="font-display text-4xl font-extrabold text-[#FFE8CC]">1:18</div>
                  <div className="mt-2 text-sm font-bold">Rasio Dosen & Mahasiswa</div>
                  <div className="mt-0.5 text-xs text-white/80">Pendampingan intensif & fokus</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Organic Wave Divider into next section */}
          <div className="mt-20">
            <WaveDivider fill="#EAF4FF" />
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. KURIKULUM & ROADMAP KEILMUAN                                 */}
        {/* ============================================================== */}
        <section id="kurikulum" className="relative bg-[#EAF4FF]/70 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] border border-[#1E6FD9]/20 shadow-xs">
                  <Sparkles className="size-3.5 text-[#FFB84D]" /> Kurikulum Masa Depan
                </div>
                <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-.04em] text-[#0B3A8C]">
                  Pilih fokusmu. Ciptakan terobosanmu.
                </h2>
              </div>
              <p className="max-w-md text-base leading-relaxed text-[#4B6B94]">
                Tiga rumpun kompetensi keilmuan yang dirancang bersama industri agar kompetensimu selalu relevan dengan standar global.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {CURRICULUM_TRACKS.map((program, idx) => {
                const IconComp = program.icon;
                const delayClass = idx === 0 ? "reveal-delay-1" : idx === 1 ? "reveal-delay-2" : "reveal-delay-3";
                return (
                  <Reveal key={program.title} delayClass={delayClass}>
                    <article
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-[#1E6FD9]/15 bg-white p-7 shadow-[0_10px_30px_rgba(15,42,74,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-[#1E6FD9]/50 hover:shadow-[0_20px_40px_rgba(30,111,217,0.12)] md:p-8"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="grid size-14 place-items-center rounded-2xl bg-[#EAF4FF] text-[#1E6FD9] transition-colors group-hover:bg-[#1E6FD9] group-hover:text-white shadow-xs">
                            <IconComp className="size-7" />
                          </span>
                          <span className="font-mono text-sm font-bold text-[#1E6FD9]/40">{program.number}</span>
                        </div>
                        <h3 className="mt-7 font-display text-2xl font-bold text-[#0B3A8C] transition-colors group-hover:text-[#1E6FD9]">
                          {program.title}
                        </h3>
                        <p className="mt-3.5 leading-relaxed text-[#4B6B94] text-sm md:text-base">
                          {program.copy}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {program.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[#FFFBF5] border border-[#1E6FD9]/15 px-3 py-1 text-xs font-semibold text-[#0F2A4A]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8 border-t border-slate-100 pt-4 text-xs font-bold text-[#1E6FD9] flex items-center justify-between">
                        <span>Prospek: {program.prospects}</span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {/* Direct Google Drive link from ti.umpo.ac.id */}
            <Reveal delayClass="reveal-delay-4" className="mt-10">
              <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#1E6FD9]/20 bg-white p-6 shadow-[0_12px_32px_rgba(15,42,74,0.06)] sm:flex-row sm:px-8">
                <div className="flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-2xl bg-[#FFE8CC] text-[#0F2A4A] shadow-xs">
                    <FileText className="size-6 text-[#FFB84D]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0B3A8C] text-base">Struktur Kurikulum & Silabus Mata Kuliah</div>
                    <div className="text-xs text-[#4B6B94]">Unduh dokumen kurikulum lengkap berformat PDF dari Google Drive resmi prodi</div>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1MBJ4e8JyA6YZPJl39maTZMhMiZ1B58SN/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E6FD9] px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#0B3A8C] hover:shadow-lg"
                >
                  Unduh Kurikulum (Drive) <ExternalLink className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Organic Wave Divider into next section */}
          <div className="mt-16">
            <WaveDivider fill="#FFFBF5" />
          </div>
        </section>

        {/* ============================================================== */}
        {/* PINNED SECTION: PERJALANAN 4 TAHUN MAHASISWA (TIMELINE ROADMAP) */}
        {/* ============================================================== */}
        <section className="relative bg-[#FFFBF5] py-20 lg:py-28 overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              
              {/* Left Column: Pinned Storytelling Header & Navigation */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] border border-[#1E6FD9]/20 shadow-xs">
                    <Sparkles className="size-3.5 text-[#FFB84D]" /> Roadmap Mahasiswa
                  </div>
                  <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-.035em] text-[#0B3A8C] leading-[1.15]">
                    Transformasi 4 Tahun: Dari Nol Menuju Tech Leader.
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[#4B6B94]">
                    Setiap tahun akademik di Teknik Informatika UMPO dirancang berjenjang dan terstruktur—menghubungkan teori logika, praktikum intensif di laboratorium, hingga portofolio industri nyata.
                  </p>
                </Reveal>

                {/* Interactive Year Quick Stepper */}
                <Reveal delayClass="reveal-delay-1" className="mt-8 hidden sm:block">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#4B6B94]">
                      Lompat Cepat ke Tahapan:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { step: "01", label: "Tahun 1: Fondasi", target: "roadmap-tahun-1", color: "text-[#1E6FD9] bg-blue-50 border-blue-200 hover:bg-blue-100" },
                        { step: "02", label: "Tahun 2: Lab Riset", target: "roadmap-tahun-2", color: "text-[#4338CA] bg-indigo-50 border-indigo-200 hover:bg-indigo-100" },
                        { step: "03", label: "Tahun 3: MBKM & AI", target: "roadmap-tahun-3", color: "text-[#D97706] bg-amber-50 border-amber-200 hover:bg-amber-100" },
                        { step: "04", label: "Tahun 4: Skripsi", target: "roadmap-tahun-4", color: "text-[#0D9488] bg-teal-50 border-teal-200 hover:bg-teal-100" },
                      ].map((btn) => (
                        <button
                          key={btn.step}
                          onClick={() => {
                            const el = document.getElementById(btn.target);
                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-xs font-bold transition shadow-xs ${btn.color}`}
                        >
                          <span className="font-mono text-xs opacity-80">{btn.step}.</span>
                          <span className="truncate">{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Micro Visual Highlight Card */}
                <Reveal delayClass="reveal-delay-2" className="mt-6 hidden sm:block">
                  <div className="rounded-3xl border border-[#1E6FD9]/15 bg-white p-6 shadow-[0_12px_32px_rgba(15,42,74,0.06)]">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-2xl bg-[#FFE8CC] text-[#0F2A4A] shrink-0">
                        <CheckCircle2 className="size-6 text-[#FFB84D]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B3A8C]">Kurikulum Berbasis Capaian (OBE)</div>
                        <div className="text-xs text-[#4B6B94]">Sistematis • Berstandar BAN-PT • Link &amp; Match</div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
                      <div className="rounded-xl bg-[#FFFBF5] border border-slate-100 p-2">
                        <div className="font-display text-base font-bold text-[#1E6FD9]">144</div>
                        <div className="text-[10px] text-[#4B6B94] font-medium">Beban SKS</div>
                      </div>
                      <div className="rounded-xl bg-[#FFFBF5] border border-slate-100 p-2">
                        <div className="font-display text-base font-bold text-[#1E6FD9]">8</div>
                        <div className="text-[10px] text-[#4B6B94] font-medium">Semester</div>
                      </div>
                      <div className="rounded-xl bg-[#FFFBF5] border border-slate-100 p-2">
                        <div className="font-display text-base font-bold text-[#D97706]">S.Kom.</div>
                        <div className="text-[10px] text-[#4B6B94] font-medium">Gelar Lulusan</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-[#1E6FD9] font-bold border-t border-slate-100 pt-3">
                      <button
                        onClick={() => navigateTo("akademik")}
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        <span>Eksplorasi Kurikulum Lengkap</span>
                        <ArrowRight className="size-3.5" />
                      </button>
                      <span className="text-[#D97706]">★ Akreditasi B</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Timeline Spine & Progressive Step Cards */}
              <div className="relative lg:col-span-7">
                {/* Continuous Connecting Timeline Spine (Desktop & Tablet) */}
                <div
                  className="absolute left-6 md:left-7 top-10 bottom-14 w-0.5 bg-gradient-to-b from-[#1E6FD9] via-[#4338CA] via-[#D97706] to-[#0D9488] rounded-full hidden md:block pointer-events-none"
                  aria-hidden="true"
                />

                <div className="space-y-8 md:space-y-10">
                  {[
                    {
                      step: "01",
                      id: "roadmap-tahun-1",
                      yearNum: "Tahun 1",
                      semesters: "Semester 1 – 2",
                      phaseBadge: "Level 1: Fundamentals",
                      title: "Fondasi Komputasi & Pemrograman Dasar",
                      desc: "Membangun fondasi logika berpikir algorithmic problem solving, matematika diskrit, arsitektur komputer, serta penguasaan bahasa pemrograman fundamental seperti C++, Python, dan dasar rekayasa sistem.",
                      icon: <Terminal className="size-4" />,
                      theme: {
                        nodeGradient: "bg-gradient-to-br from-[#1E6FD9] to-[#0B3A8C]",
                        nodeRing: "ring-[#1E6FD9]/20",
                        strip: "from-[#1E6FD9] via-blue-400 to-transparent",
                        badge: "bg-blue-50 text-[#1E6FD9] border-blue-200",
                        banner: "bg-blue-50/70 border-blue-100 text-[#0B3A8C]",
                        bannerIcon: "text-[#1E6FD9]",
                      },
                      tags: ["Algoritma & Pemrograman", "Struktur Data", "Matematika Diskrit", "Etika Profesi IT"],
                      highlight: "Menguasai Pemecahan Masalah Algoritmik & Ekosistem Coding Camp HIMATIF",
                    },
                    {
                      step: "02",
                      id: "roadmap-tahun-2",
                      yearNum: "Tahun 2",
                      semesters: "Semester 3 – 4",
                      phaseBadge: "Level 2: Specialization",
                      title: "Eksplorasi Peminatan & Praktikum Laboratorium",
                      desc: "Mendalami arsitektur perangkat lunak modern, basis data relasional & non-relasional, jaringan komputer TCP/IP, dan pemrograman berorientasi objek di Lab Jaringan & Lab Rekayasa Perangkat Lunak.",
                      icon: <Cpu className="size-4" />,
                      theme: {
                        nodeGradient: "bg-gradient-to-br from-[#4338CA] to-[#1E1B4B]",
                        nodeRing: "ring-[#4338CA]/20",
                        strip: "from-[#4338CA] via-indigo-400 to-transparent",
                        badge: "bg-indigo-50 text-[#4338CA] border-indigo-200",
                        banner: "bg-indigo-50/70 border-indigo-100 text-[#1E1B4B]",
                        bannerIcon: "text-[#4338CA]",
                      },
                      tags: ["Pemrograman Berorientasi Objek", "Basis Data Lanjut", "Jaringan Komputer", "Sistem Operasi"],
                      highlight: "Praktikum Intensif Langsung di 2 Lab Terpadu UMPO & Portofolio Database",
                    },
                    {
                      step: "03",
                      id: "roadmap-tahun-3",
                      yearNum: "Tahun 3",
                      semesters: "Semester 5 – 6",
                      phaseBadge: "Level 3: Industry & Research",
                      title: "Riset Terapan, MBKM & Magang Industri",
                      desc: "Mahasiswa berkesempatan mengikuti program Magang Bersertifikat Kampus Merdeka (MSIB), Studi Independen, penelitian bersama dosen, serta pengembangan produk perangkat lunak skala komersial.",
                      icon: <Rocket className="size-4" />,
                      theme: {
                        nodeGradient: "bg-gradient-to-br from-[#D97706] to-[#78350F]",
                        nodeRing: "ring-[#D97706]/20",
                        strip: "from-[#D97706] via-amber-400 to-transparent",
                        badge: "bg-amber-50 text-[#D97706] border-amber-200",
                        banner: "bg-amber-50/70 border-amber-100 text-[#78350F]",
                        bannerIcon: "text-[#D97706]",
                      },
                      tags: ["Machine Learning & AI", "Cloud Computing", "Cyber Security", "Mobile Development"],
                      highlight: "Kerjasama 40+ Mitra Industri, MBKM Bersertifikat & Double Track Certification",
                    },
                    {
                      step: "04",
                      id: "roadmap-tahun-4",
                      yearNum: "Tahun 4",
                      semesters: "Semester 7 – 8",
                      phaseBadge: "Level 4: Graduation & Career",
                      title: "Capstone Project, Skripsi & Siap Karir",
                      desc: "Puncak perjalanan akademik: perancangan sistem solusi nyata melalui Capstone Project, Skripsi yang terpublikasi di jurnal ilmiah terakreditasi, sertifikasi kompetensi keahlian, dan bursa kerja alumni.",
                      icon: <GraduationCap className="size-4" />,
                      theme: {
                        nodeGradient: "bg-gradient-to-br from-[#0D9488] to-[#134E4A]",
                        nodeRing: "ring-[#0D9488]/20",
                        strip: "from-[#0D9488] via-teal-400 to-transparent",
                        badge: "bg-teal-50 text-[#0D9488] border-teal-200",
                        banner: "bg-teal-50/70 border-teal-100 text-[#134E4A]",
                        bannerIcon: "text-[#0D9488]",
                      },
                      tags: ["Tugas Akhir / Skripsi", "Uji Kompetensi BNSP", "Publikasi Ilmiah", "Tracer Study & Karir"],
                      highlight: "Gelar Sarjana Komputer (S.Kom.), Sertifikasi Profesi & Masa Tunggu Kerja < 6 Bulan",
                    },
                  ].map((item, idx) => (
                    <Reveal key={item.step} delayClass={idx % 2 === 0 ? "reveal-delay-1" : "reveal-delay-2"}>
                      <div id={item.id} className="relative md:pl-16">
                        {/* Timeline Node on the Left Spine */}
                        <div
                          className={`absolute left-0 top-6 hidden md:flex size-14 items-center justify-center rounded-2xl ${item.theme.nodeGradient} text-white shadow-lg ring-4 ring-[#FFFBF5] transition-transform duration-300 hover:scale-105 z-10`}
                          aria-hidden="true"
                        >
                          <div className="flex flex-col items-center leading-none">
                            <span className="mb-0.5">{item.icon}</span>
                            <span className="font-mono text-[10px] font-extrabold tracking-wider">{item.step}</span>
                          </div>
                        </div>

                        {/* Roadmap Card */}
                        <article className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-[0_8px_24px_rgba(15,42,74,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_36px_rgba(15,42,74,0.09)]">
                          {/* Accent Top Strip */}
                          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${item.theme.strip}`} />

                          {/* Card Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2.5">
                              {/* Mobile-only node icon */}
                              <span className={`grid size-7 place-items-center rounded-lg ${item.theme.nodeGradient} text-white md:hidden`}>
                                {item.icon}
                              </span>
                              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${item.theme.badge}`}>
                                <span className="font-mono">{item.step}</span>
                                <span>•</span>
                                <span>{item.yearNum}</span>
                              </span>
                              <span className="text-xs font-semibold text-[#4B6B94]">{item.semesters}</span>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              {item.phaseBadge}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-[#0B3A8C] transition-colors group-hover:text-[#1E6FD9]">
                            {item.title}
                          </h3>
                          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#4B6B94]">
                            {item.desc}
                          </p>

                          {/* Courses & Practice Tags */}
                          <div className="mt-5 border-t border-slate-100 pt-4">
                            <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#4B6B94]">
                              <Layers className="size-3.5 text-[#1E6FD9]" />
                              <span>Mata Kuliah &amp; Praktikum Inti:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#0F2A4A] transition-colors hover:border-blue-300 hover:bg-blue-50/60 hover:text-[#1E6FD9]"
                                >
                                  <span className="size-1.5 rounded-full bg-[#1E6FD9]/40" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Year Achievement Output Ribbon */}
                          <div className={`mt-5 flex items-center gap-3 rounded-2xl border p-3.5 sm:p-4 text-xs font-bold transition-transform duration-200 group-hover:scale-[1.01] ${item.theme.banner}`}>
                            <div className="grid size-8 place-items-center rounded-xl bg-white shadow-xs shrink-0">
                              <Sparkles className={`size-4 ${item.theme.bannerIcon}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] uppercase tracking-wider font-semibold opacity-75">Target Capaian Portofolio:</div>
                              <div className="text-xs sm:text-sm font-bold">{item.highlight}</div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. DOSEN & PENELITI (21 DOSEN ASLI TI UMPO)                    */}
        {/* ============================================================== */}
        <section id="dosen" className="relative overflow-hidden bg-[#FFFBF5] py-24 lg:py-32">
          {/* Subtle warm lighting orb */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-gradient-to-br from-[#EAF4FF] via-[#FFE8CC]/40 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute right-0 top-1/3 size-96 rounded-full bg-[#EAF4FF]/50 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            {/* Header */}
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] border border-[#1E6FD9]/20 shadow-xs">
                  <Sparkles className="size-3.5 text-[#FFB84D]" /> Tenaga Pendidik & Peneliti
                </div>
                <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-.04em] text-[#0B3A8C]">
                  Dosen & Pakar Teknologi Berdedikasi.
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-sm md:text-base leading-relaxed text-[#4B6B94]">
                  21 akademisi & praktisi S2/S3 Fakultas Teknik UMPO yang aktif membimbing, meneliti, dan membawa teknologi industri mutakhir langsung ke ruang kelas.
                </p>
                {/* Micro stats with AnimatedCounter */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#0F2A4A]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#1E6FD9]/15 shadow-xs">
                    <Award className="size-3.5 text-[#FFB84D]" />
                    <span className="font-bold text-[#1E6FD9]"><AnimatedCounter end={21} /></span> Dosen Tetap
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#1E6FD9]/15 shadow-xs">
                    <BadgeCheck className="size-3.5 text-emerald-600" /> 100% Ber-NIDN
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#1E6FD9]/15 shadow-xs">
                    <Cpu className="size-3.5 text-[#1E6FD9]" /> Riset AI, RPL & IoT
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Filter Tabs, Style Switcher & Search Bar */}
            <Reveal delayClass="reveal-delay-1" className="mt-10 flex flex-col gap-4 rounded-3xl border border-[#1E6FD9]/15 bg-white p-4 shadow-sm">
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
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                        lecturerCategory === tab.key
                          ? "bg-[#1E6FD9] text-white shadow-md shadow-blue-600/25"
                          : "text-[#4B6B94] hover:bg-[#EAF4FF] hover:text-[#0B3A8C]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                          lecturerCategory === tab.key
                            ? "bg-white/20 text-white"
                            : "bg-[#FFFBF5] text-[#4B6B94]"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Right controls: Info & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#4B6B94] font-medium">
                    <Sparkles className="size-3.5 text-[#FFB84D]" /> Klik kartu untuk animasi detail profil
                  </span>

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
            </Reveal>

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

            {/* Lecturers Grid — Fluid, Modern & Harmonious Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleLecturers.map((lecturer) => (
                <article
                  key={lecturer.name}
                  onClick={() => setSelectedLecturer(lecturer)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#1E6FD9]/15 bg-white/95 backdrop-blur-sm shadow-[0_10px_30px_rgba(11,58,140,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#1E6FD9]/40 hover:shadow-[0_22px_45px_rgba(11,58,140,0.12)] cursor-pointer active:scale-[0.98]"
                >
                  {/* Portrait Container — Seamless top flow with warm aura */}
                  <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-gradient-to-b from-[#EAF4FF] via-blue-50/30 to-white">
                    {/* Background glow aura */}
                    <div
                      className={`absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-75 ${
                        lecturer.category === "pimpinan"
                          ? "bg-[radial-gradient(ellipse_at_top,#FFB84D_0%,transparent_70%)]"
                          : lecturer.category === "lab"
                          ? "bg-[radial-gradient(ellipse_at_top,#0D9488_0%,transparent_70%)]"
                          : "bg-[radial-gradient(ellipse_at_top,#1E6FD9_0%,transparent_70%)]"
                      }`}
                    />

                    {/* Category Badge */}
                    <div className="absolute left-3.5 top-3.5 z-10">
                      {lecturer.category === "pimpinan" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/95 px-3 py-1 text-[11px] font-bold text-white shadow-sm shadow-amber-500/25 backdrop-blur-md border border-amber-300/40">
                          <Award className="size-3.5" /> Pimpinan
                        </span>
                      )}
                      {lecturer.category === "lab" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/95 px-3 py-1 text-[11px] font-bold text-white shadow-sm shadow-teal-600/25 backdrop-blur-md border border-teal-300/40">
                          <Cpu className="size-3.5" /> Ka. Lab
                        </span>
                      )}
                      {lecturer.category === "dosen" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E6FD9]/95 px-3 py-1 text-[11px] font-bold text-white shadow-sm shadow-blue-600/25 backdrop-blur-md border border-blue-300/40">
                          <GraduationCap className="size-3.5" /> Dosen
                        </span>
                      )}
                    </div>

                    {/* Verified PDDIKTI Badge */}
                    <div className="absolute right-3.5 top-3.5 z-10">
                      <span
                        className="grid size-7.5 place-items-center rounded-full bg-white/95 text-emerald-600 shadow-xs backdrop-blur-md transition-transform duration-300 group-hover:scale-110 border border-white"
                        title="Dosen Tetap Terverifikasi PDDIKTI"
                      >
                        <BadgeCheck className="size-4" />
                      </span>
                    </div>

                    {/* Portrait Photo */}
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

                    {/* Soft gradient bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/60 to-transparent" />

                    {/* Interactive Hover Pill */}
                    <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B3A8C]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-950/25 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 border border-white/20">
                        <Eye className="size-3.5 text-[#FFB84D]" /> Lihat Detail
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="flex flex-1 flex-col justify-between p-5 pt-3">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#1E6FD9] line-clamp-1">
                        {lecturer.role}
                      </div>
                      <h3
                        className="mt-1 font-display text-base font-bold leading-snug text-[#0B3A8C] transition-colors group-hover:text-[#1E6FD9] line-clamp-2 min-h-[44px]"
                        title={lecturer.name}
                      >
                        {lecturer.name}
                      </h3>

                      <div className="mt-2.5 flex items-center justify-between text-xs text-[#4B6B94]">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E6FD9]/15 bg-[#EAF4FF]/60 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#0B3A8C]">
                          <span className="text-[10px] font-bold uppercase text-[#1E6FD9]">NIDN</span>
                          {lecturer.nidn}
                        </span>
                        <span className="text-[11px] font-medium text-[#4B6B94]">FT UMPO</span>
                      </div>

                      {/* Research Focus — Harmonious with parent's warm ivory palette */}
                      <div className="mt-3.5 rounded-2xl border border-[#1E6FD9]/12 bg-[#FFFBF5] p-3 transition-colors group-hover:border-[#1E6FD9]/25">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#4B6B94]">
                          <Sparkles className="size-3 text-[#FFB84D]" /> Riset &amp; Keahlian
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-[#0F2A4A]" title={lecturer.focus}>
                          {lecturer.focus}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100/90 pt-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6FD9] transition-colors group-hover:text-[#0B3A8C]">
                        <span>Buka Profil</span>
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <a
                        href={getWhatsAppUrl(lecturer.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={`Konsultasi via WhatsApp dengan ${lecturer.name}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#1ebd59] hover:shadow-md hover:scale-105 active:scale-95"
                      >
                        <WhatsAppIcon className="size-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}

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
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1E6FD9] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#0B3A8C]"
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
                className="group inline-flex items-center gap-3 rounded-full bg-[#1E6FD9] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#0B3A8C]"
              >
                Buka Direktori Lengkap 21 Dosen TI UMPO
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              {lecturerCategory === "semua" && !lecturerSearch && filteredLecturers.length > 8 && (
                <button
                  onClick={() => setShowAllLecturers(!showAllLecturers)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1E6FD9]/20 bg-white px-6 py-3.5 text-xs font-bold text-[#0B3A8C] transition hover:bg-[#EAF4FF]"
                >
                  {showAllLecturers ? "Ringkas Tampilan" : "Buka Semua di Halaman Ini"}
                  <ChevronDown className={`size-3.5 transition-transform ${showAllLecturers ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          </div>

          {/* Organic Wave Divider into next section */}
          <div className="mt-20">
            <WaveDivider fill="#EAF4FF" />
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. KEHIDUPAN MAHASISWA & HIMATIF UMPO                          */}
        {/* ============================================================== */}
        <section id="himatif" className="relative overflow-hidden bg-[#FFFBF5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Main Feature Banner */}
            <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1E6FD9] via-[#1258b8] to-[#0B3A8C] p-8 md:p-14 lg:p-16 text-white shadow-[0_24px_60px_-15px_rgba(11,58,140,0.3)]">
              {/* Background Glow & Circuit Lines */}
              <div className="absolute -right-24 -top-24 size-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-[#FFB84D]/15 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 hero-grid opacity-15 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE8CC] backdrop-blur-md border border-white/20">
                  <Sparkles className="size-3.5 text-[#FFB84D]" /> Kehidupan Mahasiswa & HIMATIF
                </div>
                <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-[-.04em] text-white">
                  Eksperimen. Kolaborasi. Bertumbuh.
                </h2>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-[#D5E3FF]">
                  Dari Himpunan Mahasiswa Teknik Informatika (HIMATIF), coding bootcamp, hackathon, kompetisi nasional,
                  hingga riset pengabdian masyarakat, pengalaman belajarmu jauh melampaui ruang kelas.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://instagram.com/informatika.umpo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-bold text-[#0B3A8C] shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:bg-[#FFE8CC] hover:text-[#0F2A4A]"
                  >
                    Lihat Instagram @informatika.umpo <ArrowRight className="size-4" />
                  </a>
                  <button
                    onClick={() => navigateTo("berita")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-0.5"
                  >
                    Galeri & Berita Kegiatan
                  </button>
                </div>
              </div>
            </Reveal>

            {/* 3 Activity Pillars */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Code2,
                  title: "Coding Bootcamp & Workshop",
                  desc: "Sesi intensif penguasaan teknologi stack modern: React, Python, Cloud, dan AI bersama alumni serta instruktur industri.",
                  tag: "Komunitas Belajar",
                },
                {
                  icon: Award,
                  title: "Informatics Hackathon & Expo",
                  desc: "Ajang tahunan unjuk kebolehan inovasi digital, pameran produk software mahasiswa, dan kompetisi pemecahan masalah nyata.",
                  tag: "Kompetisi & Prestasi",
                },
                {
                  icon: Users,
                  title: "Pengabdian Masyarakat Digital",
                  desc: "Pemberdayaan UMKM lokal dan literasi teknologi sekolah pedesaan di Ponorogo dan sekitarnya melalui KKN tematik digital.",
                  tag: "Dampak Sosial",
                },
              ].map((act, idx) => {
                const IconC = act.icon;
                const delay = idx === 0 ? "reveal-delay-1" : idx === 1 ? "reveal-delay-2" : "reveal-delay-3";
                return (
                  <Reveal key={act.title} delayClass={delay}>
                    <div className="h-full rounded-3xl border border-[#1E6FD9]/15 bg-white p-7 shadow-[0_10px_30px_rgba(15,42,74,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1E6FD9]/40 hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="grid size-12 place-items-center rounded-2xl bg-[#EAF4FF] text-[#1E6FD9] shadow-xs">
                          <IconC className="size-6" />
                        </div>
                        <span className="rounded-full bg-[#FFFBF5] border border-[#1E6FD9]/15 px-3 py-1 text-[11px] font-bold text-[#1E6FD9]">
                          {act.tag}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-bold text-[#0B3A8C]">{act.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4B6B94]">{act.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Organic Wave Divider into Fasilitas section */}
          <div className="mt-20">
            <WaveDivider fill="#F0F4FC" />
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. FASILITAS LABORATORIUM                                      */}
        {/* ============================================================== */}
        <section id="fasilitas" className="relative overflow-hidden bg-[#FFFBF5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] border border-[#1E6FD9]/20 shadow-xs">
                <Sparkles className="size-3.5 text-[#FFB84D]" /> Sarana & Prasarana
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold tracking-[-.04em] text-[#0B3A8C]">
                Laboratorium Komputer Terpadu
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-[#4B6B94] leading-relaxed">
                Infrastruktur praktikum modern untuk menunjang riset rekayasa perangkat lunak, kecerdasan buatan, dan jaringan komputer.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Reveal delayClass="reveal-delay-1">
                <div className="flex h-full flex-col justify-between rounded-[2.2rem] border border-[#1E6FD9]/15 bg-white p-8 shadow-[0_12px_36px_rgba(15,42,74,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#1E6FD9]/50 hover:shadow-xl">
                  <div>
                    <div className="grid size-14 place-items-center rounded-2xl bg-[#EAF4FF] text-[#1E6FD9] shadow-xs">
                      <Network className="size-7" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-[#0B3A8C]">Lab Jaringan & IoT</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#4B6B94]">
                      Pusat simulasi jaringan enterprise, perangkat router/switch Cisco & Mikrotik, IoT kit, dan cyber security.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-[#1E6FD9]">
                    Ka. Lab: Angga Prasetyo, S.T., M.Kom.
                  </div>
                </div>
              </Reveal>

              <Reveal delayClass="reveal-delay-2">
                <div className="flex h-full flex-col justify-between rounded-[2.2rem] border border-[#1E6FD9]/15 bg-white p-8 shadow-[0_12px_36px_rgba(15,42,74,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#1E6FD9]/50 hover:shadow-xl">
                  <div>
                    <div className="grid size-14 place-items-center rounded-2xl bg-[#EAF4FF] text-[#1E6FD9] shadow-xs">
                      <Code2 className="size-7" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-[#0B3A8C]">Lab Rekayasa Perangkat Lunak</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#4B6B94]">
                      Fasilitas komputasi untuk pengembangan web, mobile apps, database architecture, dan sistem informasi enterprise.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-[#1E6FD9]">
                    Ka. Lab: Ir. Moh. Bhanu Setyawan, S.T., M.Kom.
                  </div>
                </div>
              </Reveal>

              <Reveal delayClass="reveal-delay-3">
                <div className="flex h-full flex-col justify-between rounded-[2.2rem] border border-[#1E6FD9]/15 bg-white p-8 shadow-[0_12px_36px_rgba(15,42,74,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#1E6FD9]/50 hover:shadow-xl">
                  <div>
                    <div className="grid size-14 place-items-center rounded-2xl bg-[#EAF4FF] text-[#1E6FD9] shadow-xs">
                      <BookOpen className="size-7" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-[#0B3A8C]">Perpustakaan Pusat UMPO</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#4B6B94]">
                      Akses ribuan literatur buku TIK, jurnal internasional bereputasi (IEEE, ScienceDirect), e-library, dan ruang kolaborasi.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <a
                      href="https://library.umpo.ac.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6FD9] hover:underline"
                    >
                      Buka Perpustakaan UMPO <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delayClass="reveal-delay-4" className="mt-12 text-center">
              <button
                onClick={() => navigateTo("fasilitas")}
                className="inline-flex items-center gap-2 rounded-full border border-[#1E6FD9]/30 bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] shadow-xs transition-all hover:bg-[#EAF4FF] hover:border-[#1E6FD9]"
              >
                Lihat Seluruh Fasilitas Kampus & Lab <ArrowRight className="size-3.5" />
              </button>
            </Reveal>
          </div>

          {/* Organic Wave Divider into Mitra section */}
          <div className="mt-20">
            <WaveDivider fill="#FFFFFF" />
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. MITRA RESMI KAMPUS                                          */}
        {/* ============================================================== */}
        <section className="relative border-y border-[#1E6FD9]/15 bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] border border-[#1E6FD9]/20">
                <Sparkles className="size-3 text-[#FFB84D]" /> Strategic Partners
              </div>
              <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[#0B3A8C]">
                Kemitraan Industri & Teknologi Global
              </h3>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PARTNERS.map((partner, idx) => (
                <Reveal key={partner.name} delayClass={`reveal-delay-${(idx % 4) + 1}`}>
                  <div
                    className="flex flex-col justify-between rounded-2xl border border-[#1E6FD9]/15 bg-[#FFFBF5] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#1E6FD9] hover:bg-white hover:shadow-md"
                  >
                    <div className="font-display text-base font-bold text-[#0B3A8C]">{partner.name}</div>
                    <div className="mt-1 text-[11px] font-semibold text-[#4B6B94]">{partner.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. BERITA TERBARU (KONTEN ASLI TI.UMPO.AC.ID)                  */}
        {/* ============================================================== */}
        <section id="berita" className="relative bg-[#FFFBF5] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1E6FD9] border border-[#1E6FD9]/20 shadow-xs">
                  <Sparkles className="size-3.5 text-[#FFB84D]" /> Cerita & Pengumuman
                </div>
                <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-.04em] text-[#0B3A8C]">
                  Yang sedang terjadi.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Semua", "Agenda", "Akademik", "Pengumuman"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsFilter(cat)}
                    className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 ${
                      newsFilter === cat
                        ? "bg-[#1E6FD9] text-white shadow-md shadow-blue-500/25"
                        : "border border-[#1E6FD9]/20 bg-white text-[#4B6B94] hover:bg-[#EAF4FF] hover:text-[#0B3A8C]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item, idx) => (
                <Reveal key={item.id} delayClass={`reveal-delay-${(idx % 3) + 1}`}>
                  <article className="group flex h-full flex-col justify-between rounded-[2.2rem] border border-[#1E6FD9]/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1E6FD9]/40 hover:shadow-xl">
                    <div>
                      {item.image ? (
                        <div className="relative overflow-hidden rounded-2xl bg-[#EAF4FF]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                            onError={(e) => {
                              // Safe fallback to building crop without breaking rules
                              (e.target as HTMLElement).setAttribute("src", "/assets/hero/gedung-cerah.webp");
                            }}
                          />
                          <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1E6FD9] shadow-sm backdrop-blur">
                            {item.category}
                          </span>
                        </div>
                      ) : (
                        <div className="flex aspect-[16/6] items-center justify-between rounded-2xl bg-gradient-to-br from-[#1E6FD9] to-[#0B3A8C] p-6 text-white shadow-inner">
                          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{item.category}</span>
                          <Bookmark className="size-5 text-white/70" />
                        </div>
                      )}

                      <div className="pt-5">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#4B6B94]">
                          <Calendar className="size-3.5 text-[#1E6FD9]" />
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </div>
                        <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-[#0B3A8C] transition group-hover:text-[#1E6FD9]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[#4B6B94]">{item.excerpt}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4">
                      <a
                        href="https://ti.umpo.ac.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6FD9] hover:text-[#0B3A8C]"
                      >
                        Baca Selengkapnya di Portal <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10. PENDAFTARAN MAHASISWA BARU (BANNER ASLI)                   */}
        {/* ============================================================== */}
        <section id="admissions" className="bg-[#FFFBF5] px-5 pb-16 lg:px-8">
          <Reveal>
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1E6FD9] via-[#155fc2] to-[#0B3A8C] px-6 py-16 text-center text-white md:px-16 md:py-24 shadow-[0_24px_60px_-15px_rgba(11,58,140,0.3)]">
              {/* Background ambient accents */}
              <div className="absolute -left-20 -top-20 size-72 rounded-full border-[3rem] border-white/5 pointer-events-none" />
              <div className="absolute -bottom-36 -right-20 size-96 rounded-full border-[4rem] border-white/5 pointer-events-none" />
              <div className="absolute right-1/4 top-1/4 size-48 rounded-full bg-[#FFB84D]/20 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE8CC] backdrop-blur-md border border-white/20 mb-4">
                  <Sparkles className="size-3.5 text-[#FFB84D]" /> PMB TA 2025/2026
                </div>
                <h2 className="mx-auto mt-2 max-w-3xl font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-.04em] text-white leading-tight">
                  Siap menjadi bagian dari Teknik Informatika UMPO?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base md:text-lg text-[#D5E3FF] leading-relaxed">
                  Mulai perjalananmu bersama Informatika UMPO dan ciptakan inovasi teknologi yang bermakna bagi bangsa dan umat.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="https://spmb.umpo.ac.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#0B3A8C] shadow-xl transition hover:-translate-y-1 hover:bg-[#FFE8CC] hover:text-[#0F2A4A]"
                  >
                    Daftar Sekarang (spmb.umpo.ac.id) <ArrowRight className="size-4" />
                  </a>
                  <button
                    onClick={() => setModalType("download")}
                    className="rounded-full border border-white/30 bg-white/10 px-8 py-4 font-bold text-white transition hover:bg-white/20 hover:-translate-y-0.5"
                  >
                    Unduh Panduan & Template
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
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
      <footer id="kontak" className="relative bg-gradient-to-b from-[#0B3A8C] to-[#062459] px-5 pb-10 pt-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* Identity & Address */}
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-white text-[#1E6FD9] p-1.5 shadow-sm">
                  <img
                    src="https://ti.umpo.ac.id/wp-content/uploads/2026/09/LOGO-UNMUH-150x150.png"
                    alt="Logo UMPO"
                    className="size-7 object-contain"
                  />
                </span>
                <span className="font-display text-xl font-bold">Teknik Informatika UMPO</span>
              </div>
              <p className="mt-5 max-w-sm leading-relaxed text-[#D5E3FF] text-xs">
                Program Studi S1 Teknik Informatika, Fakultas Teknik Universitas Muhammadiyah Ponorogo. Membangun talenta digital berkarakter Islami.
              </p>
              <div className="mt-4 text-xs text-[#FFE8CC] space-y-1 font-medium">
                <div>SK Ditjen DIKTI No. 378/D/T/2005</div>
                <div>Akreditasi B BAN-PT (SK No. 0206/SKB/BAN-PT/Akred/S/I/2017)</div>
              </div>
            </div>

            {/* Menu Akademik */}
            <div>
              <div className="font-display font-bold text-white">Jelajahi</div>
              <div className="mt-5 grid gap-3 text-sm text-[#D5E3FF]">
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
              <div className="font-display font-bold text-white">Layanan Kampus</div>
              <div className="mt-5 grid gap-3 text-sm text-[#D5E3FF]">
                <a href="https://spmb.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  SPMB UMPO
                </a>
                <a href="https://simtik.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  SIMTIK (SIAKAD)
                </a>
                <a href="https://siskrip.simakumpo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  SISKRIP (Skripsi)
                </a>
                <a href="https://giat.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  KKN GIAT UMPO
                </a>
                <a href="https://library.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Perpustakaan
                </a>
                <a href="https://tracer.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Tracer Study
                </a>
              </div>
            </div>

            {/* Kontak Resmi */}
            <div>
              <div className="font-display font-bold text-white">Hubungi Kami</div>
              <div className="mt-5 grid gap-3 text-xs text-[#D5E3FF] leading-relaxed">
                <span>Jl. Budi Utomo No.10, Ronowijayan, Kec. Siman, Kab. Ponorogo, Jawa Timur 63471</span>
                <span>Telp. (0352) 481124, 487662 (psw 2211)</span>
                <span>Fax : (0352) 461796</span>
                <span>informatika@umpo.ac.id</span>
                <span>teknik@umpo.ac.id</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-[#D5E3FF]/75 md:flex-row">
            <span>© 2026 Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo.</span>
            <div className="flex gap-4">
              <a href="https://instagram.com/informatika.umpo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Instagram: @informatika.umpo
              </a>
              <span>•</span>
              <a href="https://ti.umpo.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
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

      {/* ============================================================== */}
      {/* POP-UP MODAL: DETAIL PROFIL DOSEN (TEKS ANIMASI DARI SAMPING)  */}
      {/* ============================================================== */}
      {selectedLecturer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-lecturer-title"
        >
          {/* Frosted Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-[#06183d]/65 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSelectedLecturer(null)}
          />

          {/* Modal Box with Scale-In Animation */}
          <div className="dosen-modal-in relative z-10 w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-[#1E6FD9]/20 bg-white shadow-[0_25px_70px_rgba(6,24,61,0.25)] my-auto max-h-[92vh] flex flex-col">
            {/* Top Header Bar */}
            <div className="relative flex items-center justify-between border-b border-blue-900/10 bg-gradient-to-r from-[#06183d] via-[#0B3A8C] to-[#1E6FD9] px-6 py-4 text-white shadow-sm shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 place-items-center rounded-xl bg-white/15 backdrop-blur-sm text-white">
                  <GraduationCap className="size-4 text-[#FFE8CC]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#FFE8CC]">
                    S1 Teknik Informatika · Fakultas Teknik UMPO
                  </div>
                  <div className="text-sm font-bold text-white">Profil Lengkap Dosen &amp; Peneliti</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLecturer(null)}
                className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 hover:scale-105 active:scale-95"
                title="Tutup (Esc)"
                aria-label="Tutup pop up"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="overflow-y-auto p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Portrait & Action */}
                <div className="md:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="relative aspect-[4/4.5] w-full max-w-[220px] md:max-w-full mx-auto overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-b from-[#EAF4FF] to-slate-100 shadow-md">
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
                    <div className="absolute bottom-2.5 right-2.5 grid size-7 place-items-center rounded-full bg-emerald-600 text-white shadow-md border-2 border-white" title="Terverifikasi PDDIKTI">
                      <BadgeCheck className="size-4" />
                    </div>
                  </div>

                  {/* Category & Status Badges */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start w-full">
                    {selectedLecturer.category === "pimpinan" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-300">
                        <Award className="size-3.5 text-amber-600" /> Pimpinan Prodi
                      </span>
                    )}
                    {selectedLecturer.category === "lab" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/15 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-300">
                        <Cpu className="size-3.5 text-teal-600" /> Ka. Lab
                      </span>
                    )}
                    {selectedLecturer.category === "dosen" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-[#1E6FD9] border border-blue-200">
                        <GraduationCap className="size-3.5 text-[#1E6FD9]" /> Dosen Tetap
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Aktif Mengajar
                    </span>
                  </div>

                  {/* WhatsApp Direct CTA Button under photo */}
                  <a
                    href={getWhatsAppUrl(selectedLecturer.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3 px-4 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-[#1ebd59] hover:shadow-emerald-500/35 hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>Konsultasi WhatsApp</span>
                  </a>
                </div>

                {/* Right Column: Teks Detail yang Muncul dari Samping (Staggered Animation) */}
                <div className="md:col-span-7 flex flex-col gap-4">
                  {/* 1. Name & Academic Role (modal-stagger-1) */}
                  <div className="modal-stagger-1 rounded-2xl bg-[#FFFBF5] border border-[#1E6FD9]/15 p-5 shadow-xs">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#1E6FD9]">
                      {selectedLecturer.role}
                    </div>
                    <h3 id="modal-lecturer-title" className="mt-1 font-display text-xl sm:text-2xl font-bold leading-snug text-[#0B3A8C]">
                      {selectedLecturer.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#4B6B94]">
                      Program Studi S1 Teknik Informatika · Fakultas Teknik, Universitas Muhammadiyah Ponorogo
                    </p>
                  </div>

                  {/* 2. Official Academic ID (modal-stagger-2) */}
                  <div className="modal-stagger-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-xs">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#4B6B94]">Nomor Induk Dosen (NIDN)</div>
                        <div className="mt-0.5 font-mono text-base font-bold text-[#0B3A8C]">{selectedLecturer.nidn}</div>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedLecturer.nidn);
                          setCopiedNidn(true);
                          setTimeout(() => setCopiedNidn(false), 2000);
                        }}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-[#0B3A8C] transition hover:border-[#1E6FD9] hover:bg-blue-50 hover:text-[#1E6FD9]"
                        title="Salin NIDN"
                      >
                        {copiedNidn ? (
                          <>
                            <Check className="size-3.5 text-emerald-600" /> Disalin!
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" /> Salin
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#4B6B94]">Nomor Induk Karyawan (NIK)</div>
                      <div className="mt-0.5 font-mono text-base font-bold text-[#0B3A8C]">{selectedLecturer.nik}</div>
                    </div>
                  </div>

                  {/* 3. Research Focus & Expertise (modal-stagger-3) */}
                  <div className="modal-stagger-3 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-[#EAF4FF] to-blue-50/40 p-4 sm:p-5 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E6FD9]">
                      <Sparkles className="size-4 text-[#FFB84D]" /> Bidang Kepakaran &amp; Fokus Riset
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[#0B3A8C]">
                      {selectedLecturer.focus}
                    </p>
                  </div>

                  {/* 4. Layanan & Bimbingan Mahasiswa (modal-stagger-4) */}
                  <div className="modal-stagger-4 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#4B6B94]">
                      Layanan &amp; Bimbingan Mahasiswa:
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 border border-slate-100 text-[#0F2A4A]">
                        <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-[11px]">Bimbingan Skripsi</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 border border-slate-100 text-[#0F2A4A]">
                        <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-[11px]">Dosen PA / KRS</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 border border-slate-100 text-[#0F2A4A]">
                        <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-[11px]">Riset &amp; MBKM</span>
                      </div>
                    </div>

                    {/* Secondary Action Links */}
                    <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                      <a
                        href={`mailto:informatika@umpo.ac.id?subject=Konsultasi Akademik: ${encodeURIComponent(selectedLecturer.name)}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                      >
                        <Mail className="size-3.5 text-slate-500" />
                        <span>Kirim Email</span>
                      </a>
                      <a
                        href="https://ti.umpo.ac.id/dosen/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#1E6FD9]/30 bg-blue-50/50 py-2.5 px-3.5 text-xs font-bold text-[#1E6FD9] transition hover:bg-blue-100/50"
                      >
                        <span>Portal Kampus</span>
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
