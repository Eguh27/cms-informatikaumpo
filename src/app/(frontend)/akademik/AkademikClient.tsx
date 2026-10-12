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

export default function AkademikClient({
  activeCurriculum,
  locale = "id",
}: {
  activeCurriculum: Curriculum | null;
  locale?: "id" | "en";
}) {
  const isEn = locale === "en";

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
        <h2 className="text-xl font-bold text-slate-800">
          {isEn ? "Curriculum Data Not Available" : "Data Kurikulum Belum Tersedia"}
        </h2>
        <p className="mt-2 text-slate-500">
          {isEn
            ? "Please publish an active curriculum in the CMS panel."
            : "Silakan tambahkan data kurikulum aktif di panel CMS."}
        </p>
      </div>
    );
  }

  const activeStage = semestersData?.[semesterGroup];

  return (
    <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          {
            value: isEn ? "144 Credits" : "144 SKS",
            label: isEn ? "Total Study Load" : "Total Beban Studi",
            desc: isEn ? "Normal completion in 8 semesters" : "Masa tempuh normal 8 semester",
          },
          {
            value: isEn
              ? `${activeCurriculum.tracks?.length || 0} Specializations`
              : `${activeCurriculum.tracks?.length || 0} Peminatan`,
            label: isEn ? "Specialization Tracks" : "Konsentrasi Studi",
            desc: isEn ? "IT Domain Specialization" : "Spesialisasi bidang TI",
          },
          {
            value: "85%",
            label: isEn ? "Hands-on Practicum" : "Praktikum Laboratorium",
            desc: isEn ? "Real-world project experiences" : "Pengalaman hands-on proyek nyata",
          },
          {
            value: "S.Kom.",
            label: isEn ? "Degree Conferred" : "Gelar Lulusan",
            desc: isEn ? "BAN-PT Accredited Bachelor degree" : "Sarjana Komputer terakreditasi BAN-PT",
          },
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
            <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">
              {isEn ? "Specializations" : "Bidang Keunggulan"}
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#08235b]">
              {isEn
                ? `${activeCurriculum.tracks.length} Major Tracks & Specializations`
                : `${activeCurriculum.tracks.length} Konsentrasi Studi Utama`}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isEn
                ? "Students can choose specific computational domains to prepare for their professional careers."
                : "Mahasiswa dapat memilih fokus pendalaman minat komputasi untuk mempersiapkan karir profesional."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeCurriculum.tracks.map((track, idx) => (
              <div
                key={track.id || idx}
                className="rounded-3xl border border-blue-100 bg-white p-7 md:p-9 shadow-sm relative overflow-hidden group hover:border-[#1453d6]/40 transition"
              >
                <div
                  className={`absolute top-0 right-0 size-40 rounded-full blur-2xl pointer-events-none ${
                    idx % 2 === 0 ? "bg-blue-100/50" : "bg-teal-100/50"
                  }`}
                />
                <div
                  className={`grid size-12 place-items-center rounded-2xl shadow-xs ${
                    idx % 2 === 0 ? "bg-blue-50 text-[#1453d6]" : "bg-teal-50 text-teal-600"
                  }`}
                >
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
                        className={`rounded-full px-3 py-1 text-xs font-bold border ${
                          idx % 2 === 0
                            ? "bg-blue-50 text-[#1453d6] border-blue-100/70"
                            : "bg-teal-50 text-teal-700 border-teal-100/70"
                        }`}
                      >
                        {tagObj.tag}
                      </span>
                    ))}
                  </div>
                )}
                {track.prospects && (
                  <div className="mt-8 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    {isEn ? "Career Prospects: " : "Prospek Karir: "} {track.prospects}
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
              <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">
                {isEn ? "Course Distribution" : "Distribusi Mata Kuliah"}
              </div>
              <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                {isEn ? "Semester Curriculum Map" : "Peta Kurikulum Semester"}
              </h2>
            </div>
            <a
              href={SITE_LINKS.curriculumDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#08235b] transition"
            >
              {isEn ? "Download Full Syllabus (Drive)" : "Unduh Silabus Lengkap (Drive)"}{" "}
              <ExternalLink className="size-3.5" />
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
                <div className="text-xs font-bold opacity-80">
                  {isEn ? `Stage ${stage}` : `Tahap ${stage}`}
                </div>
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
                {isEn ? "Learning Focus: " : "Fokus Pembelajaran: "}
                {activeStage.focus}
              </span>
              <span className="text-xs font-mono font-bold text-[#1453d6]">
                {activeStage.courses.reduce((a: number, c: any) => a + (c.sks || 0), 0)}{" "}
                {isEn ? "Credits" : "SKS"}
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
                    <span className="font-mono font-bold text-[#1453d6]">
                      {c.sks} {isEn ? "Credits" : "SKS"}
                    </span>
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
              <div className="font-bold text-[#0B3A8C]">
                {isEn ? "Active Semester Class Schedule" : "Jadwal Kuliah Semester Berjalan"}
              </div>
              <div className="text-xs text-[#4B6B94]">
                {isEn
                  ? "Download the latest semester schedule from official department documents"
                  : "Unduh jadwal terbaru per semester dari dokumen resmi prodi"}
              </div>
            </div>
          </div>
          <Link
            href={isEn ? "/en/akademik/jadwal-kuliah" : "/akademik/jadwal-kuliah"}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#1E6FD9] px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#0B3A8C]"
          >
            {isEn ? "View Class Schedule" : "Lihat Jadwal Kuliah"}{" "}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Capaian Pembelajaran Lulusan (CPL) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">
          {isEn ? "Graduate Quality Standard" : "Standar Mutu Lulusan"}
        </div>
        <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
          {isEn ? "Graduate Learning Outcomes (CPL)" : "Capaian Pembelajaran Lulusan (CPL)"}
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-2xl">
          {isEn
            ? "Competency qualifications for Bachelor of Informatics graduates referring to the Indonesian National Qualifications Framework (KKNI) Level 6."
            : "Kualifikasi kompetensi sarjana Teknik Informatika UMPO mengacu pada Kerangka Kualifikasi Nasional Indonesia (KKNI) Jenjang 6."}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
              <CheckCircle2 className="size-5" />
            </div>
            <h4 className="font-display text-base font-bold text-slate-900">
              {isEn ? "Islamic Attitude & Ethics" : "Sikap & Nilai Islami"}
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {isEn
                ? "Able to demonstrate moral integrity, professional ethics, legal compliance, and Islamic values in community collaboration."
                : "Mampu menunjukkan integritas moral, etika profesional, ketaatan hukum, serta nilai-nilai Al-Islam dan Kemuhammadiyahan dalam bekerja sama di lingkungan masyarakat."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
              <Cpu className="size-5" />
            </div>
            <h4 className="font-display text-base font-bold text-slate-900">
              {isEn ? "Knowledge Mastery" : "Penguasaan Pengetahuan"}
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {isEn
                ? "Deeply master theoretical concepts in computing, algorithms, software engineering, intelligent systems, and cybersecurity."
                : "Menguasai konsep teoritis bidang komputasi, algoritma, rekayasa perangkat lunak, sistem cerdas, serta prinsip keamanan sistem dan jaringan komputer secara mendalam."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
              <Sparkles className="size-5" />
            </div>
            <h4 className="font-display text-base font-bold text-slate-900">
              {isEn ? "Specialized Skills" : "Keterampilan Khusus"}
            </h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {isEn
                ? "Able to design, implement, and evaluate intelligent computing solutions (AI/SE) to solve real-world industry problems."
                : "Mampu merancang, mengimplementasikan, dan menguji solusi komputasi cerdas (AI/RPL) yang efisien untuk memecahkan masalah nyata di berbagai sektor industri."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
