import React, { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Terminal,
  Cpu,
  Rocket,
  GraduationCap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Check,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PageId } from "@/types/navigation";

gsap.registerPlugin(ScrollTrigger);

interface StudentRoadmapProps {
  navigateTo: (page: PageId, subTab?: string) => void;
}

interface RoadmapYear {
  step: "01" | "02" | "03" | "04";
  yearIndex: number;
  id: string;
  yearNum: string;
  semesters: string;
  phaseLabel: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  theme: {
    primary: string;
    lightBg: string;
    border: string;
    text: string;
    accent: string;
    gradient: string;
    ring: string;
  };
  courses: string[];
  portfolioTarget: string;
}

const ROADMAP_DATA: RoadmapYear[] = [
  {
    step: "01",
    yearIndex: 1,
    id: "roadmap-tahun-1",
    yearNum: "Tahun 1",
    semesters: "Semester 1 – 2",
    phaseLabel: "Tahap Fondasi",
    title: "Fondasi Komputasi & Logika Algoritmik",
    desc: "Membangun fondasi logika berpikir algorithmic problem solving, matematika diskrit, arsitektur komputer, serta penguasaan bahasa pemrograman fundamental seperti C++, Python, dan dasar rekayasa sistem.",
    icon: <Terminal className="size-4 sm:size-5" />,
    theme: {
      primary: "#1E6FD9",
      lightBg: "bg-blue-50/70",
      border: "border-blue-100",
      text: "text-[#0B3A8C]",
      accent: "bg-[#1E6FD9]",
      gradient: "from-[#1E6FD9] to-[#0B3A8C]",
      ring: "ring-blue-500/20",
    },
    courses: [
      "Algoritma & Pemrograman",
      "Struktur Data & Logika",
      "Matematika Diskrit",
      "Arsitektur Komputer",
      "Etika Profesi IT",
    ],
    portfolioTarget: "Pemecahan Masalah Algoritmik & Partisipasi Aktif Coding Camp HIMATIF",
  },
  {
    step: "02",
    yearIndex: 2,
    id: "roadmap-tahun-2",
    yearNum: "Tahun 2",
    semesters: "Semester 3 – 4",
    phaseLabel: "Tahap Spesialisasi",
    title: "Eksplorasi Peminatan & Riset Laboratorium",
    desc: "Mendalami arsitektur perangkat lunak modern, basis data relasional dan non-relasional, jaringan komputer TCP/IP, dan pemrograman berorientasi objek di Lab Jaringan & Lab Rekayasa Perangkat Lunak.",
    icon: <Cpu className="size-4 sm:size-5" />,
    theme: {
      primary: "#2563EB",
      lightBg: "bg-indigo-50/70",
      border: "border-indigo-100",
      text: "text-[#1E40AF]",
      accent: "bg-[#2563EB]",
      gradient: "from-[#2563EB] to-[#1E3A8A]",
      ring: "ring-indigo-500/20",
    },
    courses: [
      "Pemrograman Berorientasi Objek",
      "Basis Data Lanjut & NoSQL",
      "Jaringan Komputer & IoT",
      "Sistem Operasi & Cloud",
      "Desain Interaksi Manusia & Komputer",
    ],
    portfolioTarget: "Praktikum Terpadu di 2 Laboratorium Modern UMPO & Portofolio Database Terdistribusi",
  },
  {
    step: "03",
    yearIndex: 3,
    id: "roadmap-tahun-3",
    yearNum: "Tahun 3",
    semesters: "Semester 5 – 6",
    phaseLabel: "Tahap Riset & Industri",
    title: "Riset Terapan, MBKM & Magang Industri",
    desc: "Mahasiswa berkesempatan mengikuti program Magang Bersertifikat Kampus Merdeka (MSIB), Studi Independen, penelitian bersama dosen, serta pengembangan produk kecerdasan buatan skala industri.",
    icon: <Rocket className="size-4 sm:size-5" />,
    theme: {
      primary: "#D97706",
      lightBg: "bg-amber-50/70",
      border: "border-amber-100",
      text: "text-[#92400E]",
      accent: "bg-[#D97706]",
      gradient: "from-[#D97706] to-[#78350F]",
      ring: "ring-amber-500/20",
    },
    courses: [
      "Kecerdasan Buatan & Machine Learning",
      "Keamanan Siber (Cyber Security)",
      "Rekayasa Perangkat Lunak Lanjut",
      "Pemrograman Mobile & API",
      "Metodologi Penelitian Ilmiah",
    ],
    portfolioTarget: "Kemitraan 40+ Perusahaan Mitra, Program MSIB Bersertifikat & Double Track Certification",
  },
  {
    step: "04",
    yearIndex: 4,
    id: "roadmap-tahun-4",
    yearNum: "Tahun 4",
    semesters: "Semester 7 – 8",
    phaseLabel: "Tahap Kelulusan & Karir",
    title: "Capstone Project, Skripsi & Siap Karir",
    desc: "Puncak perjalanan akademik: perancangan sistem solusi nyata melalui Capstone Project, Skripsi yang terpublikasi di jurnal ilmiah terakreditasi, sertifikasi kompetensi keahlian, dan bursa kerja alumni.",
    icon: <GraduationCap className="size-4 sm:size-5" />,
    theme: {
      primary: "#059669",
      lightBg: "bg-emerald-50/70",
      border: "border-emerald-100",
      text: "text-[#065F46]",
      accent: "bg-[#059669]",
      gradient: "from-[#059669] to-[#064E3B]",
      ring: "ring-emerald-500/20",
    },
    courses: [
      "Tugas Akhir / Skripsi Terbimbing",
      "Capstone Project Terpadu",
      "Uji Sertifikasi Profesi BNSP",
      "Publikasi Jurnal Ilmiah",
      "Karier & Karakter Islami",
    ],
    portfolioTarget: "Gelar Sarjana Komputer (S.Kom.), Sertifikasi Profesi Nasional & Waktu Tunggu Kerja Kurang dari 6 Bulan",
  },
];

export default function StudentRoadmap({ navigateTo }: StudentRoadmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // ScrollTrigger Setup
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>("[data-roadmap-card]");
    const triggers: ScrollTrigger[] = [];

    // Continuous progress tracking across the entire roadmap container
    const mainTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 40%",
      end: "bottom 80%",
      onUpdate: (self) => {
        const progress = Math.min(Math.max(self.progress, 0), 1);
        setScrollProgress(progress);
        if (progressLineRef.current) {
          progressLineRef.current.style.height = `${progress * 100}%`;
        }
      },
    });
    triggers.push(mainTrigger);

    // Individual milestone triggers for active year highlighting
    cards.forEach((card, index) => {
      const year = index + 1;
      const t = ScrollTrigger.create({
        trigger: card,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveYear(year),
        onEnterBack: () => setActiveYear(year),
      });
      triggers.push(t);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const scrollToYear = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="roadmap"
      ref={containerRef}
      className="relative overflow-hidden bg-[#FFFBF5] py-20 lg:py-28"
    >
      {/* Subtle ambient lighting orb */}
      <div className="absolute right-0 top-1/4 size-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 size-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">

          {/* Left Column: Pinned Storytelling Header & Navigation */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Clean Section Tag (No Cheesy Dashes or Outline Overload) */}
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#1E6FD9] mb-3">
              <span className="h-1.5 w-6 rounded-full bg-[#1E6FD9]" />
              <span>Perjalanan Akademik</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B3A8C] leading-[1.15]">
              Transformasi 4 Tahun Mahasiswa.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4B6B94]">
              Kurikulum S1 Teknik Informatika UMPO dirancang berjenjang dan terintegrasi, menghubungkan penguasaan logika pemrograman, praktikum laboratorium mutakhir, hingga portofolio industri nyata.
            </p>

            {/* Interactive Year Quick Stepper — Synchronized with Scroll */}
            <div className="mt-8 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#4B6B94]">
                <span>Tahapan Perkuliahan:</span>
                <span className="font-mono text-[11px] text-[#1E6FD9]">
                  Tahun {activeYear} dari 4 ({Math.round(scrollProgress * 100)}%)
                </span>
              </div>

              {/* Progress Track Indicator */}
              <div className="h-1.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1E6FD9] via-[#2563EB] via-[#D97706] to-[#059669] transition-all duration-300"
                  style={{ width: `${Math.max(scrollProgress * 100, 15)}%` }}
                />
              </div>

              {/* Year Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {ROADMAP_DATA.map((item) => {
                  const isActive = activeYear === item.yearIndex;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => scrollToYear(item.id)}
                      className={`group flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-white text-[#0B3A8C] shadow-md shadow-blue-900/5 ring-2 ring-[#1E6FD9]"
                          : "bg-white/70 text-[#4B6B94] hover:bg-white hover:text-[#0B3A8C] hover:shadow-xs"
                      }`}
                    >
                      <span
                        className={`grid size-6 place-items-center rounded-lg text-[11px] font-mono font-extrabold transition-colors ${
                          isActive
                            ? `${item.theme.accent} text-white`
                            : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#1E6FD9]"
                        }`}
                      >
                        {item.step}
                      </span>
                      <div className="min-w-0 flex-1 truncate">
                        <div className="truncate font-semibold">{item.yearNum}</div>
                        <div className="text-[10px] opacity-75 font-normal truncate">{item.phaseLabel}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="mt-8 hidden sm:block rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgba(15,42,74,0.04)] border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-[#1E6FD9] shrink-0">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B3A8C]">Kurikulum Outcome-Based (OBE)</div>
                  <div className="text-xs text-[#4B6B94]">Terakreditasi BAN-PT &amp; Standar Industri Global</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-[#FFFBF5] p-2.5">
                  <div className="font-display text-base font-bold text-[#1E6FD9]">144</div>
                  <div className="text-[10px] text-[#4B6B94]">SKS Total</div>
                </div>
                <div className="rounded-lg bg-[#FFFBF5] p-2.5">
                  <div className="font-display text-base font-bold text-[#1E6FD9]">8</div>
                  <div className="text-[10px] text-[#4B6B94]">Semester</div>
                </div>
                <div className="rounded-lg bg-[#FFFBF5] p-2.5">
                  <div className="font-display text-base font-bold text-[#D97706]">S.Kom.</div>
                  <div className="text-[10px] text-[#4B6B94]">Gelar</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo("akademik")}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#EAF4FF] py-2.5 text-xs font-bold text-[#0B3A8C] transition hover:bg-[#d8ecff]"
              >
                <span>Lihat Struktur Kurikulum Lengkap</span>
                <ArrowRight className="size-3.5 text-[#1E6FD9]" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Scroll-Triggered Timeline & Cards */}
          <div className="relative lg:col-span-7">
            {/* Background Continuous Timeline Track */}
            <div
              className="absolute left-6 md:left-7 top-8 bottom-12 w-1 bg-slate-200/80 rounded-full hidden md:block pointer-events-none"
              aria-hidden="true"
            >
              {/* Dynamic Scroll-Filled Spine Line */}
              <div
                ref={progressLineRef}
                className="w-full rounded-full bg-gradient-to-b from-[#1E6FD9] via-[#2563EB] via-[#D97706] to-[#059669] transition-all duration-150 ease-out"
                style={{ height: "0%" }}
              />
            </div>

            {/* Step Cards List */}
            <div className="space-y-8 md:space-y-12">
              {ROADMAP_DATA.map((item) => {
                const isActive = activeYear === item.yearIndex;
                const isPassed = activeYear >= item.yearIndex;

                return (
                  <div
                    key={item.step}
                    id={item.id}
                    data-roadmap-card
                    className="relative md:pl-16 transition-all duration-500"
                  >
                    {/* Timeline Node on Left Track */}
                    <div
                      className={`absolute left-0 top-6 hidden md:grid size-14 place-items-center rounded-2xl text-white shadow-md transition-all duration-500 z-10 ${
                        isPassed
                          ? `bg-gradient-to-br ${item.theme.gradient} scale-105 shadow-lg ${item.theme.ring} ring-4`
                          : "bg-slate-200 text-slate-400 scale-95"
                      }`}
                      aria-hidden="true"
                    >
                      <div className="flex flex-col items-center leading-none">
                        <span className="mb-0.5">{item.icon}</span>
                        <span className="font-mono text-[10px] font-extrabold tracking-wider">{item.step}</span>
                      </div>
                    </div>

                    {/* Clean Modern Card (No Dash/Outline Clutter) */}
                    <article
                      className={`group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 transition-all duration-300 ${
                        isActive
                          ? "shadow-[0_16px_40px_rgba(15,42,74,0.08)] ring-1 ring-[#1E6FD9]/30 -translate-y-1"
                          : "shadow-[0_4px_24px_rgba(15,42,74,0.04)] border border-slate-100 hover:shadow-md"
                      }`}
                    >
                      {/* Top Accent Strip */}
                      <div
                        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.theme.gradient}`}
                      />

                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                          {/* Mobile-only node icon */}
                          <span
                            className={`grid size-8 place-items-center rounded-lg bg-gradient-to-br ${item.theme.gradient} text-white md:hidden`}
                          >
                            {item.icon}
                          </span>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold text-sm text-[#0B3A8C]">
                                {item.yearNum}
                              </span>
                              <span className="text-slate-300">/</span>
                              <span className="text-xs font-semibold text-[#4B6B94]">
                                {item.semesters}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Clean Subtle Phase Badge */}
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-[#4B6B94]">
                          {item.phaseLabel}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-[#0B3A8C] transition-colors group-hover:text-[#1E6FD9]">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#4B6B94]">
                        {item.desc}
                      </p>

                      {/* Core Courses / Competencies — Clean Subtle Tags */}
                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#4B6B94]">
                          <Layers className="size-3.5 text-[#1E6FD9]" />
                          <span>Fokus Mata Kuliah &amp; Praktikum:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.courses.map((course) => (
                            <span
                              key={course}
                              className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-[#0F2A4A] transition-colors hover:bg-blue-50 hover:text-[#1E6FD9]"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Target Capaian Ribbon */}
                      <div
                        className={`mt-5 flex items-center gap-3.5 rounded-xl p-3.5 sm:p-4 text-xs ${item.theme.lightBg} ${item.theme.border} border`}
                      >
                        <div className="grid size-8 place-items-center rounded-lg bg-white shadow-xs shrink-0 text-[#1E6FD9]">
                          <Sparkles className="size-4 text-[#D97706]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] uppercase tracking-wider font-semibold text-[#4B6B94]">
                            Target Capaian Portofolio:
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-[#0B3A8C] mt-0.5">
                            {item.portfolioTarget}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
