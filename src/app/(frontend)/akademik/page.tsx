"use client";

import React, { useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import { SITE_LINKS } from "@/data/siteMedia";
import {
  Laptop,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function AkademikPage() {
  const [semesterGroup, setSemesterGroup] = useState<1 | 2 | 3 | 4>(1);

  const SEMESTER_DATA = {
    1: {
      label: "Tahun 1 (Semester 1 & 2)",
      focus: "Pondasi Sains Komputasi & Logika Pemrograman",
      courses: [
        { code: "TIF101", name: "Algoritma & Pemrograman Dasar", sks: 3, type: "Wajib" },
        { code: "TIF102", name: "Matematika Diskrit Komputasi", sks: 3, type: "Wajib" },
        { code: "TIF103", name: "Pengantar Teknologi Informasi", sks: 2, type: "Wajib" },
        { code: "TIF104", name: "Al-Islam & Kemuhammadiyahan I", sks: 2, type: "Universitas" },
        { code: "TIF105", name: "Bahasa Inggris Komputasi", sks: 2, type: "Wajib" },
        { code: "TIF201", name: "Struktur Data & Praktikum", sks: 4, type: "Wajib" },
        { code: "TIF202", name: "Arsitektur & Organisasi Komputer", sks: 3, type: "Wajib" },
        { code: "TIF203", name: "Kalkulus Informatika", sks: 3, type: "Wajib" },
      ],
    },
    2: {
      label: "Tahun 2 (Semester 3 & 4)",
      focus: "Inti Rekayasa Sistem & Jaringan",
      courses: [
        { code: "TIF301", name: "Sistem Basis Data & Praktikum", sks: 4, type: "Wajib" },
        { code: "TIF302", name: "Pemrograman Berorientasi Objek (OOP)", sks: 3, type: "Wajib" },
        { code: "TIF303", name: "Jaringan Komputer Dasar", sks: 3, type: "Wajib" },
        { code: "TIF304", name: "Sistem Operasi Modern", sks: 3, type: "Wajib" },
        { code: "TIF401", name: "Rekayasa Perangkat Lunak (RPL)", sks: 3, type: "Wajib" },
        { code: "TIF402", name: "Pemrograman Web Lanjut", sks: 3, type: "Wajib" },
        { code: "TIF403", name: "Keamanan Sistem & Kriptografi", sks: 3, type: "Wajib" },
        { code: "TIF404", name: "Interaksi Manusia dan Komputer (IMK)", sks: 3, type: "Wajib" },
      ],
    },
    3: {
      label: "Tahun 3 (Semester 5 & 6)",
      focus: "Konsentrasi AI, RPL & Internet of Things",
      courses: [
        { code: "TIF501", name: "Kecerdasan Buatan (Artificial Intelligence)", sks: 3, type: "Wajib" },
        { code: "TIF502", name: "Machine Learning & Deep Learning", sks: 3, type: "Peminatan AI" },
        { code: "TIF503", name: "Mobile Application Development", sks: 3, type: "Peminatan RPL" },
        { code: "TIF504", name: "Internet of Things & Sensor Network", sks: 3, type: "Peminatan Lab" },
        { code: "TIF601", name: "Pengolahan Citra Digital (Computer Vision)", sks: 3, type: "Peminatan AI" },
        { code: "TIF602", name: "Cloud Computing & Microservices", sks: 3, type: "Peminatan RPL" },
        { code: "TIF603", name: "Data Mining & Data Warehouse", sks: 3, type: "Peminatan AI" },
        { code: "TIF604", name: "Metodologi Penelitian Informatika", sks: 2, type: "Wajib" },
      ],
    },
    4: {
      label: "Tahun 4 (Semester 7 & 8)",
      focus: "Praktik Industri, Magang & Tugas Akhir",
      courses: [
        { code: "TIF701", name: "Kerja Praktik (KP) / Magang Industri", sks: 3, type: "Praktik" },
        { code: "TIF702", name: "Kuliah Kerja Nyata (KKN) Tematik GIAT", sks: 3, type: "Pengabdian" },
        { code: "TIF703", name: "Technopreneurship & Etika Profesi TI", sks: 2, type: "Wajib" },
        { code: "TIF704", name: "Kapita Selekta Komputasi Cerdas", sks: 2, type: "Pilihan" },
        { code: "TIF801", name: "Proposal Skripsi (SISKRIP)", sks: 2, type: "Tugas Akhir" },
        { code: "TIF802", name: "Skripsi / Tugas Akhir Mandiri", sks: 4, type: "Tugas Akhir" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      {/* Banner */}
      <PageBanner
        category="Kurikulum & Standar Kompetensi"
        title="Akademik & Kurikulum S1"
        subtitle="Kurikulum Outcome-Based Education (OBE) 144 SKS yang mengintegrasikan penguasaan teori komputasi, keahlian praktis industri, dan proyek riset inovatif."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Akademik" },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "144 SKS", label: "Total Beban Studi", desc: "Masa tempuh normal 8 semester" },
            { value: "2 Peminatan", label: "Konsentrasi Studi", desc: "Kecerdasan Buatan & Rekayasa Lunak" },
            { value: "85%", label: "Praktikum Laboratorium", desc: "Pengalaman hands-on proyek nyata" },
            { value: "S.Kom.", label: "Gelar Lulusan", desc: "Sarjana Komputer terakreditasi BAN-PT" },
          ].map((m, idx) => (
            <div key={idx} className="rounded-3xl border border-slate-200/80 bg-white p-5 md:p-6 shadow-sm">
              <div className="font-display text-2xl md:text-3xl font-bold text-[#1453d6]">{m.value}</div>
              <div className="mt-1 text-xs md:text-sm font-bold text-slate-800">{m.label}</div>
              <div className="mt-1 text-[11px] text-slate-500">{m.desc}</div>
            </div>
          ))}
        </div>

        {/* 2 Konsentrasi Unggulan */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Bidang Keunggulan</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#08235b]">2 Konsentrasi Studi Utama</h2>
            <p className="mt-2 text-sm text-slate-600">
              Mahasiswa dapat memilih fokus pendalaman minat komputasi untuk mempersiapkan karir profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Peminatan 1 */}
            <div className="rounded-3xl border border-blue-100 bg-white p-7 md:p-9 shadow-sm relative overflow-hidden group hover:border-[#1453d6]/40 transition">
              <div className="absolute top-0 right-0 size-40 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />
              <div className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-[#1453d6] shadow-xs">
                <Cpu className="size-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-[#08235b]">
                Kecerdasan Buatan (Artificial Intelligence)
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Mempersiapkan sarjana informatika yang menguasai algoritma machine learning, pemrosesan bahasa alami
                (NLP), computer vision, dan big data analytics untuk solusi industri cerdas.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Machine Learning",
                  "Deep Learning",
                  "Computer Vision",
                  "Natural Language Processing",
                  "Data Mining",
                  "Sistem Pakar",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1453d6] border border-blue-100/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-500">
                Prospek Karir: AI Engineer, Machine Learning Specialist, Data Scientist, Data Analyst.
              </div>
            </div>

            {/* Peminatan 2 */}
            <div className="rounded-3xl border border-blue-100 bg-white p-7 md:p-9 shadow-sm relative overflow-hidden group hover:border-[#1453d6]/40 transition">
              <div className="absolute top-0 right-0 size-40 bg-teal-100/50 rounded-full blur-2xl pointer-events-none" />
              <div className="grid size-12 place-items-center rounded-2xl bg-teal-50 text-teal-600 shadow-xs">
                <Laptop className="size-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-[#08235b]">
                Rekayasa Perangkat Lunak & Jaringan (Software Engineering & IoT)
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Fokus pada perancangan arsitektur perangkat lunak skala enterprise, mobile and web applications, cloud
                computing, keamanan siber, dan interkoneksi Internet of Things.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Full-Stack Web Dev",
                  "Mobile Programming",
                  "Cloud Computing",
                  "Cyber Security",
                  "IoT Hardware Dev",
                  "DevOps Engineering",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 border border-teal-100/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-500">
                Prospek Karir: Full-Stack Developer, Mobile Developer, Cloud Architect, Cyber Security Specialist.
              </div>
            </div>
          </div>
        </div>

        {/* Struktur Semester 1-8 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Distribusi Mata Kuliah</div>
              <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                Peta Kurikulum Semester
              </h2>
            </div>
            <a
              href={SITE_LINKS.curriculumDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#08235b] transition"
            >
              Unduh Silabus Lengkap (Drive) <ExternalLink className="size-3.5" />
            </a>
          </div>

          {/* Semester Stage Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {[1, 2, 3, 4].map((stage) => (
              <button
                key={stage}
                onClick={() => setSemesterGroup(stage as any)}
                className={`rounded-2xl p-4 text-left transition-all duration-200 ${
                  semesterGroup === stage
                    ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="text-xs font-bold opacity-80">Tahap {stage}</div>
                <div className="font-display text-sm font-bold mt-1">
                  {SEMESTER_DATA[stage as keyof typeof SEMESTER_DATA].label}
                </div>
              </button>
            ))}
          </div>

          {/* Active Stage Table */}
          <div className="rounded-2xl border border-slate-200/80 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200/80 flex items-center justify-between">
              <span className="text-xs font-bold text-[#08235b]">
                Fokus Pembelajaran: {SEMESTER_DATA[semesterGroup].focus}
              </span>
              <span className="text-xs font-mono font-bold text-[#1453d6]">
                {SEMESTER_DATA[semesterGroup].courses.reduce((a, c) => a + c.sks, 0)} SKS
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {SEMESTER_DATA[semesterGroup].courses.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 hover:bg-blue-50/30 transition text-xs md:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-500 w-16">{c.code}</span>
                    <span className="font-semibold text-slate-800">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                      {c.type}
                    </span>
                    <span className="font-mono font-bold text-[#1453d6]">{c.sks} SKS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capaian Pembelajaran Lulusan (CPL) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Standar Mutu Lulusan</div>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
            Capaian Pembelajaran Lulusan (CPL)
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl">
            Kualifikasi kompetensi sarjana Teknik Informatika UMPO mengacu pada Kerangka Kualifikasi Nasional Indonesia
            (KKNI) Jenjang 6.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <CheckCircle2 className="size-5" />
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Sikap & Nilai Islami</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Mampu menunjukkan integritas moral, etika profesional, ketaatan hukum, serta nilai-nilai Al-Islam dan
                Kemuhammadiyahan dalam bekerja sama di lingkungan masyarakat.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <Cpu className="size-5" />
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Penguasaan Pengetahuan</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Menguasai konsep teoritis bidang komputasi, algoritma, rekayasa perangkat lunak, sistem cerdas, serta
                prinsip keamanan sistem dan jaringan komputer secara mendalam.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <Sparkles className="size-5" />
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Keterampilan Khusus</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Mampu merancang, mengimplementasikan, dan menguji solusi komputasi cerdas (AI/RPL) yang efisien untuk
                memecahkan masalah nyata di berbagai sektor industri.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
