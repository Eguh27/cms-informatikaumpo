"use client";

import React, { useState, useMemo } from "react";
import { Laptop, Cpu, CheckCircle2, ExternalLink, Sparkles, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_LINKS } from "@/data/siteMedia";
import type { Curriculum } from "@/payload-types";

// Helper component to render dynamic icons
const IconRenderer = ({ iconName }: { iconName: string }) => {
  const IconProps = { className: "size-6" };
  if (iconName.toLowerCase() === "network") return <Sparkles {...IconProps} />;
  if (iconName.toLowerCase() === "code2") return <Laptop {...IconProps} />;
  return <Cpu {...IconProps} />;
};

export default function AkademikClient({ activeCurriculum }: { activeCurriculum: Curriculum | null }) {
  // Extract and parse semesters data
  const semestersData = useMemo(() => {
    if (!activeCurriculum || !activeCurriculum.semesters) return null;
    const stages: Record<number, any> = {};
    activeCurriculum.semesters.forEach((sem) => {
      stages[sem.stage] = {
        label: sem.label,
        focus: sem.focus,
        courses: sem.courses || [],
      };
    });
    return stages;
  }, [activeCurriculum]);

  // Determine valid stages and initial stage
  const validStages = useMemo(() => {
    if (!semestersData) return [];
    return Object.keys(semestersData).map(Number).sort((a, b) => a - b);
  }, [semestersData]);

  const [semesterGroup, setSemesterGroup] = useState<number>(validStages[0] || 1);

  if (!activeCurriculum) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Data Kurikulum Belum Tersedia</h2>
        <p className="mt-2 text-slate-500">Silakan tambahkan data kurikulum aktif di panel CMS.</p>
      </div>
    );
  }

  const activeStage = semestersData?.[semesterGroup];

  return (
    <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { value: "144 SKS", label: "Total Beban Studi", desc: "Masa tempuh normal 8 semester" },
          { value: `${activeCurriculum.tracks?.length || 0} Peminatan`, label: "Konsentrasi Studi", desc: "Spesialisasi bidang TI" },
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

      {/* Konsentrasi Unggulan (Tracks) */}
      {activeCurriculum.tracks && activeCurriculum.tracks.length > 0 && (
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Bidang Keunggulan</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#08235b]">{activeCurriculum.tracks.length} Konsentrasi Studi Utama</h2>
            <p className="mt-2 text-sm text-slate-600">
              Mahasiswa dapat memilih fokus pendalaman minat komputasi untuk mempersiapkan karir profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeCurriculum.tracks.map((track, idx) => (
              <div key={track.id || idx} className="rounded-3xl border border-blue-100 bg-white p-7 md:p-9 shadow-sm relative overflow-hidden group hover:border-[#1453d6]/40 transition">
                <div className={`absolute top-0 right-0 size-40 rounded-full blur-2xl pointer-events-none ${idx % 2 === 0 ? 'bg-blue-100/50' : 'bg-teal-100/50'}`} />
                <div className={`grid size-12 place-items-center rounded-2xl shadow-xs ${idx % 2 === 0 ? 'bg-blue-50 text-[#1453d6]' : 'bg-teal-50 text-teal-600'}`}>
                  <IconRenderer iconName={track.icon || "Cpu"} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#08235b]">
                  {track.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {track.copy}
                </p>
                {track.tags && track.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {track.tags.map((tagObj, tidx) => (
                      <span
                        key={tidx}
                        className={`rounded-full px-3 py-1 text-xs font-bold border ${idx % 2 === 0 ? 'bg-blue-50 text-[#1453d6] border-blue-100/70' : 'bg-teal-50 text-teal-700 border-teal-100/70'}`}
                      >
                        {tagObj.tag}
                      </span>
                    ))}
                  </div>
                )}
                {track.prospects && (
                  <div className="mt-8 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    Prospek Karir: {track.prospects}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Struktur Semester */}
      {validStages.length > 0 && activeStage && (
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
            {validStages.map((stage) => (
              <button
                key={stage}
                onClick={() => setSemesterGroup(stage)}
                className={`rounded-2xl p-4 text-left transition-all duration-200 ${
                  semesterGroup === stage
                    ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="text-xs font-bold opacity-80">Tahap {stage}</div>
                <div className="font-display text-sm font-bold mt-1">
                  {semestersData[stage].label}
                </div>
              </button>
            ))}
          </div>

          {/* Active Stage Table */}
          <div className="rounded-2xl border border-slate-200/80 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200/80 flex items-center justify-between">
              <span className="text-xs font-bold text-[#08235b]">
                Fokus Pembelajaran: {activeStage.focus}
              </span>
              <span className="text-xs font-mono font-bold text-[#1453d6]">
                {activeStage.courses.reduce((a: number, c: any) => a + (c.sks || 0), 0)} SKS
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {activeStage.courses.map((c: any, idx: number) => (
                <div
                  key={c.id || idx}
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
      )}

      {/* Jadwal Kuliah */}
      <div className="mb-14">
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#1E6FD9]/20 bg-white p-6 shadow-[0_12px_32px_rgba(15,42,74,0.06)] sm:flex-row sm:px-8">
          <div className="flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#EAF4FF]">
              <CalendarDays className="size-6 text-[#1E6FD9]" aria-hidden="true" />
            </div>
            <div>
              <div className="font-bold text-[#0B3A8C]">Jadwal Kuliah Semester Berjalan</div>
              <div className="text-xs text-[#4B6B94]">Unduh jadwal terbaru per semester dari dokumen resmi prodi</div>
            </div>
          </div>
          <Link
            href="/akademik/jadwal-kuliah"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#1E6FD9] px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#0B3A8C]"
          >
            Lihat Jadwal Kuliah <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
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
  );
}
