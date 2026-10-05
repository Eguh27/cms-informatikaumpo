"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { PageBanner } from "@/components/PageBanner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  Search,
  X,
  Award,
  Cpu,
  GraduationCap,
  BadgeCheck,
  Eye,
  ArrowRight,
  Sparkles,
  Users,
  Phone,
  Fingerprint,
} from "lucide-react";
import type { Lecturer } from "@/payload-types";

type DosenClientProps = {
  initialLecturers: Lecturer[];
};

export function DosenClient({ initialLecturers }: DosenClientProps) {
  const [category, setCategory] = useState<"semua" | "pimpinan" | "lab" | "dosen">("semua");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lecturer | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Native <dialog>: focus trap + Esc handled by browser; restore focus on close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-dialog-close]")?.focus();
    } else if (!selected && dialog.open) {
      dialog.close();
    }
  }, [selected]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setSelected(null);
      lastFocused.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

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
    });
  }, [category, search, initialLecturers]);

  const getWhatsAppUrl = (name: string) => {
    const text = encodeURIComponent(`Halo, Bapak/Ibu ${name}, saya mahasiswa Informatika UMPO.`);
    return `https://wa.me/6282267868648?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28">
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
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
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
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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

        {/* Grid Modern Glassmorphic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {filtered.map((lecturer) => {
            const imageUrl = typeof lecturer.image === 'object' && lecturer.image?.url ? lecturer.image.url : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

            return (
              <article
                key={lecturer.name}
                className="glass-card group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_10px_30px_-5px_rgba(9,45,116,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2.5 hover:border-[#1453d6]/40 hover:bg-white/95 hover:shadow-[0_24px_50px_-10px_rgba(20,83,214,0.2)]"
              >
                {/* Portrait Frame with Frosted Light & Reflection */}
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

                  {/* Photo */}
                  <img
                    src={imageUrl}
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

                  {/* Hover Interactive Overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100" aria-hidden="true">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#08235b] shadow-xl border border-white">
                      <Eye className="size-3.5 text-[#1453d6]" /> Lihat Profil Lengkap
                    </span>
                  </div>
                </div>

                {/* Card Content Area with Glass Highlights */}
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
                        {lecturer.nidn || "-"}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">S1 TI UMPO</span>
                    </div>

                    {lecturer.focus && (
                      <div className="mt-3 rounded-xl border border-blue-100/80 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white/50 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50/80">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-blue-600">
                          <Sparkles className="size-3 text-amber-500 animate-pulse" /> Bidang Riset & Fokus
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-slate-600" title={lecturer.focus}>
                          {lecturer.focus}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer: Detail CTA + WhatsApp CTA */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100/80 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelected(lecturer)}
                      aria-haspopup="dialog"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1453d6] transition-colors hover:text-[#08235b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9] rounded"
                    >
                      Detail Lengkap{" "}
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                    </button>
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

      {/* Lecturer detail dialog */}
      <dialog
        ref={dialogRef}
        aria-labelledby="dosen-dialog-title"
        className="w-[calc(100%-2.5rem)] max-w-lg rounded-[2rem] border border-white/80 bg-white/95 p-0 shadow-2xl backdrop-blur-xl backdrop:bg-[#08235b]/50 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === dialogRef.current) setSelected(null);
        }}
      >
        {selected && (
          <div className="overflow-hidden">
            <div className="relative h-44 bg-gradient-to-br from-[#1E6FD9] to-[#0B3A8C]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  typeof selected.image === "object" && selected.image?.url
                    ? selected.image.url
                    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                }
                alt=""
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover object-top opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3A8C] via-transparent to-transparent" aria-hidden="true" />
              <button
                type="button"
                data-dialog-close
                onClick={() => setSelected(null)}
                aria-label="Tutup profil dosen"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB84D]"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#9fc0ff]">
                  {selected.role}
                </div>
                <h2 id="dosen-dialog-title" className="mt-1 font-display text-xl font-bold leading-snug text-white">
                  {selected.name}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700">
                  <Fingerprint className="size-3.5 text-[#1E6FD9]" aria-hidden="true" />
                  NIDN {selected.nidn || "-"}
                </span>
                {selected.nik && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700">
                    NIK {selected.nik}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  <BadgeCheck className="size-3.5" aria-hidden="true" /> Terverifikasi PDDIKTI
                </span>
              </div>

              {selected.focus && (
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1E6FD9]">
                    <Sparkles className="size-3.5 text-[#FFB84D]" aria-hidden="true" /> Bidang Riset &amp; Fokus
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{selected.focus}</p>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href={getWhatsAppUrl(selected.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1ebd59]"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Tutup
                </button>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <Phone className="size-3" aria-hidden="true" /> Sekretariat Prodi: +62 822-6786-8648
              </p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
