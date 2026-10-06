"use client";

import { PageBanner } from "@/components/PageBanner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { LecturerAvatar } from "@/components/LecturerAvatar";
import { resolveMediaUrl } from "@/data/siteMedia";
import type { Lecturer } from "@/payload-types";
import {
  Award,
  BadgeCheck,
  Cpu,
  GraduationCap,
  Mail,
  Search,
  // Sparkles,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type DosenClientProps = {
  initialLecturers: Lecturer[];
  /** Prefills the filter when arriving from the navbar search panel (?q=). */
  initialQuery?: string;
};

export function DosenClient({ initialLecturers, initialQuery = "" }: DosenClientProps) {
  const [category, setCategory] = useState<"semua" | "pimpinan" | "lab" | "dosen">("semua");
  const [search, setSearch] = useState(initialQuery);

  const counts = useMemo(() => {
    return {
      semua: initialLecturers.length,
      pimpinan: initialLecturers.filter((l) => l.category === "pimpinan").length,
      lab: initialLecturers.filter((l) => l.category === "lab").length,
      dosen: initialLecturers.filter((l) => l.category === "dosen").length,
    };
  }, [initialLecturers]);

  const filtered = useMemo(() => {
    return initialLecturers.filter((l) => {
      const matchCat = category === "semua" || l.category === category;
      const matchSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.role.toLowerCase().includes(search.toLowerCase()) ||
        (l.nidn && l.nidn.includes(search)) ||
        (l.focus && l.focus.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    }).sort((a, b) => {
      const rank = (c: string) => (c === "pimpinan" ? 0 : c === "lab" ? 1 : 2);
      const r = rank(a.category) - rank(b.category);
      return r !== 0 ? r : a.name.localeCompare(b.name, "id");
    });
  }, [category, search, initialLecturers]);

  const getWhatsAppUrl = (whatsapp?: string | null) => {
    if (!whatsapp) return null;
    // Bersihkan karakter non-digit jika ada (selain + di awal)
    const cleanNumber = whatsapp.replace(/[^\d+]/g, '');
    const text = encodeURIComponent(`Halo, saya ingin bertanya mengenai program studi Teknik Informatika.`);
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      <PageBanner
        category="Tenaga Pendidik & Peneliti"
        title="Dosen & Peneliti Profesional"
        subtitle="Belajar langsung dari akademisi berpendidikan S2 dan S3 yang aktif meneliti, membimbing, dan membawa pengalaman industri ke dalam kelas."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Dosen & Tendik" },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-200/80 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { key: "semua", label: "Semua Dosen", count: counts.semua },
              { key: "pimpinan", label: "Pimpinan Prodi", count: counts.pimpinan },
              { key: "lab", label: "Ka. Laboratorium", count: counts.lab },
              { key: "dosen", label: "Dosen Pengajar", count: counts.dosen },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCategory(tab.key as any)}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                  category === tab.key
                    ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                    category === tab.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama dosen, NIDN, kepakaran..."
              aria-label="Cari nama dosen, NIDN, atau bidang kepakaran"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-9 text-xs font-medium text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Counter Badge */}
        {(search.trim() || category !== "semua") && (
          <div className="mb-6 flex items-center justify-between text-xs text-slate-500 px-1">
            <div>
              Menampilkan <span className="font-bold text-[#08235b]">{filtered.length}</span> dari {initialLecturers.length} dosen
              {search && <span> untuk kata kunci &ldquo;<strong className="text-slate-700">{search}</strong>&rdquo;</span>}
            </div>
            <button
              onClick={() => {
                setSearch("");
                setCategory("semua");
              }}
              className="font-bold text-[#1453d6] hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((lecturer) => {
            const imageUrl = resolveMediaUrl(lecturer.image, '')
            const hasPhoto = imageUrl.length > 0

            return (
              <article
                key={lecturer.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1453d6]/30 hover:shadow-[0_12px_32px_-6px_rgba(20,83,214,0.15)]"
              >
                {/* Top: Photo (full-bleed, dominant area) + Category Badge */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8f1fc]">
                  {hasPhoto ? (
                    <img
                      src={imageUrl}
                      alt={lecturer.name}
                      className="size-full object-cover object-top transition duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <LecturerAvatar
                      name={lecturer.name}
                      className="size-full text-5xl"
                    />
                  )}

                  {/* Category badge top-left */}
                  <div className="absolute left-3 top-3">
                    {lecturer.category === "pimpinan" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#B45309] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                        <Award className="size-3" /> Pimpinan
                      </span>
                    )}
                    {lecturer.category === "lab" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#0F766E] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                        <Cpu className="size-3" /> Ka. Lab
                      </span>
                    )}
                    {lecturer.category === "dosen" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#1453d6] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                        <GraduationCap className="size-3" /> Dosen
                      </span>
                    )}
                  </div>

                  {/* Verified badge top-right */}
                  <div className="absolute right-3 top-3">
                    <span
                      className="grid size-7 place-items-center rounded-full bg-white/90 text-emerald-600 shadow-sm border border-white"
                      title="Dosen Tetap Terverifikasi PDDIKTI"
                    >
                      <BadgeCheck className="size-4" />
                    </span>
                  </div>

                  {/* Fade at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Body: info list */}
                <div className="flex flex-1 flex-col p-4 gap-3">
                  {/* Name + Role */}
                  <div>
                    <h3
                      className="font-display text-[15px] font-bold leading-snug text-[#08235b] line-clamp-2"
                      title={lecturer.name}
                    >
                      {lecturer.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#1453d6] uppercase tracking-wide">
                      {lecturer.role}
                    </p>
                  </div>

                  {/* Info rows */}
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
                    <div>
                      <dt className="font-bold uppercase tracking-wider text-slate-400">NIDN</dt>
                      <dd className="mt-0.5 font-mono font-semibold text-slate-700">{lecturer.nidn || "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-bold uppercase tracking-wider text-slate-400">NIK</dt>
                      <dd className="mt-0.5 font-mono font-semibold text-slate-700">{lecturer.nik || "—"}</dd>
                    </div>
                  </dl>

                  {/* Bidang Riset */}
                  {lecturer.focus && (
                    <div className="rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1E6FD9] mb-1">Bidang Riset &amp; Fokus</p>
                      <p className="line-clamp-2 text-[11px] font-medium leading-relaxed text-slate-600" title={lecturer.focus}>
                        {lecturer.focus}
                      </p>
                    </div>
                  )}

                  {/* Action buttons — always at bottom */}
                  <div className="mt-auto pt-2 border-t border-slate-100 flex items-center gap-2">
                    {(() => {
                      const waUrl = getWhatsAppUrl(lecturer.whatsapp as string | undefined | null);
                      return waUrl ? (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={`Chat WhatsApp dengan ${lecturer.name}`}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#15803D] py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#166534] hover:scale-105 active:scale-95"
                        >
                          <WhatsAppIcon className="size-3.5" />
                          WhatsApp
                        </a>
                      ) : null;
                    })()}
                    {lecturer.email && (
                      <a
                        href={`mailto:${lecturer.email}`}
                        onClick={(e) => e.stopPropagation()}
                        title={`Email ${lecturer.name}`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-[11px] font-bold text-slate-600 transition hover:border-[#1453d6] hover:text-[#1453d6] hover:scale-105 active:scale-95"
                      >
                        <Mail className="size-3.5" />
                        Email
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
              <Users className="mx-auto size-12 text-slate-300" aria-hidden="true" />
              <h4 className="mt-4 font-display text-lg font-bold text-slate-700">Dosen tidak ditemukan</h4>
              <p className="mt-1 text-sm text-slate-500">
                Tidak ada data dosen yang sesuai dengan kata kunci &ldquo;{search}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("semua");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#08235b]"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}
