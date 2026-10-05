"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import {
  BookOpen,
  Award,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<
    "sejarah" | "visimisi" | "struktur" | "akreditasi"
  >("sejarah");

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28">
      {/* Banner */}
      <PageBanner
        category="Identitas & Legalitas"
        title="Profil Program Studi"
        subtitle="Mengenal lebih dekat Program Studi S1 Teknik Informatika Universitas Muhammadiyah Ponorogo, sejarah pendirian, visi misi keunggulan, struktur organisasi, dan akreditasi resmi."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Prodi" },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-2 shadow-sm border border-slate-200/80 mb-10">
          {[
            { id: "sejarah", label: "Sejarah Pendirian", icon: BookOpen },
            { id: "visimisi", label: "Visi, Misi & Tujuan", icon: Award },
            { id: "struktur", label: "Struktur Organisasi", icon: Layers },
            { id: "akreditasi", label: "Akreditasi BAN-PT", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Sejarah */}
        {activeTab === "sejarah" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#1453d6] border border-blue-100">
                  <Calendar className="size-3.5" /> SK Pendirian Resmi 12 September 2005
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                  Dua Dekade Membangun Talenta Digital Berkarakter Islami
                </h2>
                <div className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-slate-600">
                  <p>
                    Program Studi S1 Teknik Informatika merupakan salah satu program studi unggulan di lingkungan
                    Fakultas Teknik Universitas Muhammadiyah Ponorogo. Berdiri secara resmi berdasarkan{" "}
                    <strong className="text-[#08235b]">Surat Keputusan Ditjen DIKTI No. 378/D/T/2005</strong> pada
                    tanggal 12 September 2005.
                  </p>
                  <p>
                    Sejak awal berdirinya, prodi ini didedikasikan untuk menjawab kebutuhan industri teknologi informasi
                    yang berkembang pesat, khususnya di kawasan Jawa Timur bagian barat dan skala nasional. Melalui
                    kombinasi pengajaran teori komputasi yang kokoh, praktikum intensif di laboratorium modern, serta
                    penanaman etika profesi berbasis nilai keislaman, Teknik Informatika UMPO telah meluluskan ribuan
                    sarjana komputasi yang berkiprah di perusahaan teknologi, BUMN, perbankan, instansi pemerintah, dan
                    wirausaha digital.
                  </p>
                  <p>
                    Kini, prodi terus bertransformasi dengan mengadopsi kurikulum Outcome-Based Education (OBE) yang
                    terkoneksi langsung dengan keunggulan masa depan, khususnya dalam bidang Kecerdasan Buatan (Artificial
                    Intelligence) dan Rekayasa Perangkat Lunak (Software Engineering).
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setActiveTab("visimisi")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#08235b] transition"
                  >
                    Lanjut ke Visi Misi <ArrowRight className="size-3.5" />
                  </button>
                  <Link
                    href="/dosen"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:border-[#1453d6] hover:text-[#1453d6] transition"
                  >
                    <Users className="size-3.5" /> Lihat Tim Dosen Pengajar
                  </Link>
                </div>
              </div>

              {/* Sidebar Quick Legal Card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/40 p-6 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Legalitas Institusi</div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#08235b]">SK & Akreditasi Resmi</h3>
                  <div className="mt-4 space-y-3 text-xs">
                    <div className="rounded-2xl bg-white p-3.5 border border-blue-100/60 shadow-xs">
                      <div className="text-slate-400 font-medium">SK Pendirian DIKTI</div>
                      <div className="font-bold text-slate-800 mt-0.5">378/D/T/2005</div>
                      <div className="text-[10px] text-slate-500 mt-1">Tanggal 12 September 2005</div>
                    </div>
                    <div className="rounded-2xl bg-white p-3.5 border border-blue-100/60 shadow-xs">
                      <div className="text-slate-400 font-medium">Akreditasi BAN-PT</div>
                      <div className="font-bold text-[#1453d6] mt-0.5">Peringkat B</div>
                      <div className="text-[10px] text-slate-500 mt-1">SK No. 3418/SK/BAN-PT/Akred/S/IX/2019</div>
                    </div>
                    <div className="rounded-2xl bg-white p-3.5 border border-blue-100/60 shadow-xs">
                      <div className="text-slate-400 font-medium">Gelar Lulusan</div>
                      <div className="font-bold text-slate-800 mt-0.5">Sarjana Komputer (S.Kom.)</div>
                      <div className="text-[10px] text-slate-500 mt-1">Beban Studi 144 SKS (8 Semester)</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm text-center">
                  <div className="font-display text-3xl font-bold text-[#1453d6]">20+ Tahun</div>
                  <div className="mt-1 text-xs font-semibold text-slate-500">Dedikasi Pengabdian & Riset Komputasi</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Visi Misi */}
        {activeTab === "visimisi" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Visi */}
            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-[#06183d] to-[#0c317c] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-16 -top-16 size-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6edbff] border border-white/20">
                <Sparkles className="size-3.5" /> Visi Keunggulan 2030
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-4xl font-bold leading-tight text-white max-w-4xl">
                &ldquo;Menjadi Program Studi Teknik Informatika yang unggul di tingkat nasional dalam pengembangan
                Kecerdasan Buatan (Artificial Intelligence) dan Rekayasa Perangkat Lunak berbasis nilai-nilai keislaman
                pada tahun 2030.&rdquo;
              </h2>
            </div>

            {/* Misi & Tujuan Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Misi */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-9 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Tridharma Perguruan Tinggi</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#08235b]">Misi Program Studi</h3>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      no: "1",
                      title: "Pendidikan Berkualitas OBE",
                      desc: "Menyelenggarakan pendidikan sarjana informatika berbasis kurikulum Outcome-Based Education dengan penguasaan AI dan Software Engineering mutakhir.",
                    },
                    {
                      no: "2",
                      title: "Riset dan Inovasi Bereputasi",
                      desc: "Melaksanakan penelitian bereputasi nasional dan internasional di bidang komputasi cerdas, sistem terdistribusi, dan keamanan siber.",
                    },
                    {
                      no: "3",
                      title: "Pengabdian Berdampak Nyata",
                      desc: "Menerapkan teknologi tepat guna dan solusi komputasi untuk kemaslahatan masyarakat dan persyarikatan Muhammadiyah.",
                    },
                    {
                      no: "4",
                      title: "Internalisasi Karakter Islami",
                      desc: "Menanamkan nilai-nilai Al-Islam dan Kemuhammadiyahan serta etika profesional bagi seluruh sivitas akademika.",
                    },
                  ].map((m) => (
                    <div key={m.no} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#1453d6] font-display text-xs font-bold text-white shadow-xs">
                        {m.no}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tujuan */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-9 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Sasaran Kompetensi</div>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#08235b]">Tujuan Strategis Lulusan</h3>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      no: "1",
                      title: "Kompetensi Profesional",
                      desc: "Menghasilkan lulusan yang menguasai analisis, perancangan, implementasi, dan pengujian sistem komputasi berstandar industri.",
                    },
                    {
                      no: "2",
                      title: "Inovator dan Peneliti Muda",
                      desc: "Menghasilkan sarjana yang mampu melakukan riset terapan di bidang Artificial Intelligence dan Big Data Analytics.",
                    },
                    {
                      no: "3",
                      title: "Technopreneurship",
                      desc: "Mencetak wirausahawan teknologi yang kreatif, adaptif terhadap disrupsi digital, dan berdaya saing global.",
                    },
                    {
                      no: "4",
                      title: "Integritas Moral & Etika",
                      desc: "Menghasilkan lulusan yang berakhlak mulia, amanah, dan mampu menjadi teladan di lingkungan kerja dan masyarakat.",
                    },
                  ].map((t) => (
                    <div key={t.no} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#08235b] font-display text-xs font-bold text-white shadow-xs">
                        {t.no}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{t.title}</h4>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Struktur Organisasi */}
        {activeTab === "struktur" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Pimpinan & Pengelola Prodi</div>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                Struktur Organisasi Program Studi
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Tata kelola kepemimpinan akademik Program Studi S1 Teknik Informatika Fakultas Teknik Universitas Muhammadiyah Ponorogo.
              </p>

              {/* Hierarchy Tree Visual */}
              <div className="mt-10 space-y-8">
                {/* Level 1: Dekan & Ka Prodi */}
                <div className="flex flex-col items-center">
                  <div className="rounded-2xl border-2 border-[#1453d6] bg-blue-50/70 p-5 text-center max-w-sm w-full shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1453d6]">Ketua Program Studi</div>
                    <div className="mt-1 font-display text-base font-bold text-[#08235b]">
                      Adi Fajaryanto Cobantoro, S.Kom., M.Kom.
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-1">NIDN: 0724098406</div>
                  </div>
                </div>

                {/* Level 2: Sekprodi & Penjaminan Mutu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-teal-600">Sekretaris Program Studi</div>
                    <div className="mt-1 font-display text-sm font-bold text-slate-800">
                      Ismail Abdurrazzaq Zulkarnain, S.Kom., M.Kom.
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">NIDN: 0728078805</div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Gugus Kendali Mutu (GKM)</div>
                    <div className="mt-1 font-display text-sm font-bold text-slate-800">
                      Tim Penjaminan Mutu Akademik Prodi
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Audit & Pengendalian Standar SPMI</div>
                  </div>
                </div>

                {/* Level 3: Kepala Laboratorium */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1453d6]">Ka. Lab Jaringan Komputer & IoT</div>
                    <div className="mt-1 font-display text-sm font-bold text-slate-800">
                      Angga Prasetyo, S.T., M.Kom.
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">NIDN: 0719088202</div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1453d6]">Ka. Lab RPL & Komputer</div>
                    <div className="mt-1 font-display text-sm font-bold text-slate-800">
                      Ir. Moh. Bhanu Setyawan, S.T., M.Kom.
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">NIDN: 0725028002</div>
                  </div>
                </div>

                {/* Level 4: Dosen & Tendik */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center max-w-4xl mx-auto">
                  <div className="text-xs font-bold text-slate-700">Dosen Pengajar & Peneliti (21 Dosen Tetap)</div>
                  <p className="mt-1 text-xs text-slate-500">
                    Tenaga pendidik berkualifikasi S2 dan S3 pada bidang Artificial Intelligence, Software Engineering, Jaringan, dan Data Science.
                  </p>
                  <Link
                    href="/dosen"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#08235b] transition"
                  >
                    Buka Direktori Lengkap 21 Dosen <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Akreditasi */}
        {activeTab === "akreditasi" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="size-3.5" /> Status Resmi Terakreditasi
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                  Peringkat Akreditasi BAN-PT & Komitmen Mutu
                </h2>
                <div className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-slate-600">
                  <p>
                    Program Studi S1 Teknik Informatika Fakultas Teknik Universitas Muhammadiyah Ponorogo telah meraih
                    status <strong className="text-slate-900">Terakreditasi Peringkat B</strong> dari Badan Akreditasi
                    Nasional Perguruan Tinggi (BAN-PT) berdasarkan{" "}
                    <strong className="text-[#1453d6]">SK BAN-PT No. 3418/SK/BAN-PT/Akred/S/IX/2019</strong>.
                  </p>
                  <p>
                    Pencapaian akreditasi ini membuktikan bahwa penyelenggaraan tridharma perguruan tinggi di Program
                    Studi Teknik Informatika UMPO telah memenuhi standar nasional pendidikan tinggi dalam aspek:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                    <li>Kualifikasi dan kompetensi dosen pengajar berpendidikan S2 dan S3.</li>
                    <li>Kurikulum adaptif berbasis Outcome-Based Education (OBE) yang selaras dengan industri.</li>
                    <li>Ketersediaan sarana laboratorium komputasi dan jaringan yang representatif.</li>
                    <li>Produktivitas publikasi ilmiah, penelitian, dan pengabdian kepada masyarakat.</li>
                    <li>Sistem penjaminan mutu internal (SPMI) yang berjalan secara berkesinambungan.</li>
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                  <a
                    href="https://teknik.umpo.ac.id/layanan-terpadu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#08235b] transition"
                  >
                    Unduh Dokumen Akreditasi <ExternalLink className="size-3.5" />
                  </a>
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:border-[#1453d6] hover:text-[#1453d6] transition"
                  >
                    Konsultasi dengan Prodi
                  </Link>
                </div>
              </div>

              {/* Certificate badge card */}
              <div className="lg:col-span-4 rounded-3xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50/80 to-white p-7 shadow-sm text-center">
                <div className="grid size-16 place-items-center rounded-2xl bg-emerald-600 text-white shadow-md mx-auto">
                  <ShieldCheck className="size-9" />
                </div>
                <div className="mt-4 font-display text-4xl font-bold text-emerald-800">Peringkat &ldquo;B&rdquo;</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-700">BAN-PT Indonesia</div>
                <div className="mt-4 border-t border-emerald-200 pt-4 text-xs text-slate-600">
                  <div>SK No. 3418/SK/BAN-PT/Akred/S/IX/2019</div>
                  <div className="mt-1 text-emerald-700 font-semibold">Berlaku Nasional</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
