import React, { useState, useMemo } from "react";
import PageBanner from "./PageBanner";
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
} from "lucide-react";

interface Lecturer {
  name: string;
  role: string;
  nidn: string;
  nik: string;
  image: string;
  category: "pimpinan" | "dosen" | "lab";
  focus: string;
}

interface DosenPageProps {
  lecturers: Lecturer[];
  onSelectLecturer: (lecturer: Lecturer) => void;
  onNavigate: (page: string) => void;
  getWhatsAppUrl: (name: string) => string;
  whatsAppIcon: React.ComponentType<{ className?: string }>;
}

export default function DosenPage({
  lecturers,
  onSelectLecturer,
  onNavigate,
  getWhatsAppUrl,
  whatsAppIcon: WhatsAppIcon,
}: DosenPageProps) {
  const [category, setCategory] = useState<"semua" | "pimpinan" | "lab" | "dosen">("semua");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    return {
      semua: lecturers.length,
      pimpinan: lecturers.filter((l) => l.category === "pimpinan").length,
      lab: lecturers.filter((l) => l.category === "lab").length,
      dosen: lecturers.filter((l) => l.category === "dosen").length,
    };
  }, [lecturers]);

  const filtered = useMemo(() => {
    return lecturers.filter((l) => {
      const matchCat = category === "semua" || l.category === category;
      const matchSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.role.toLowerCase().includes(search.toLowerCase()) ||
        l.nidn.includes(search) ||
        l.focus.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [lecturers, category, search]);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28">
      {/* Banner */}
      <PageBanner
        category="Tenaga Pendidik & Peneliti"
        title="Dosen & Peneliti Profesional"
        subtitle="Belajar langsung dari 21 akademisi berpendidikan S2 dan S3 yang aktif meneliti, membimbing, dan membawa pengalaman industri ke dalam kelas."
        breadcrumbs={[
          { label: "Beranda", action: () => onNavigate("home") },
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
              Menampilkan <span className="font-bold text-[#08235b]">{filtered.length}</span> dari {lecturers.length} dosen
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
          {filtered.map((lecturer) => (
            <article
              key={lecturer.name}
              onClick={() => onSelectLecturer(lecturer)}
              className="glass-card group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_10px_30px_-5px_rgba(9,45,116,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2.5 hover:border-[#1453d6]/40 hover:bg-white/95 hover:shadow-[0_24px_50px_-10px_rgba(20,83,214,0.2)] cursor-pointer"
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

                {/* Hover Interactive Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#08235b] shadow-xl transition-transform duration-300 hover:scale-105 border border-white">
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
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
              <Users className="mx-auto size-12 text-slate-300" />
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
