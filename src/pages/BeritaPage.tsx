import React, { useState, useMemo } from "react";
import PageBanner from "./PageBanner";
import {
  Calendar,
  Clock,
  Search,
  ArrowRight,
  X,
  FileText,
  Share2,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  category: "Agenda" | "Akademik" | "Pengumuman";
  date: string;
  image?: string;
  excerpt: string;
  readTime: string;
}

interface BeritaPageProps {
  newsList: NewsItem[];
  onNavigate: (page: string) => void;
}

export default function BeritaPage({ newsList, onNavigate }: BeritaPageProps) {
  const [filter, setFilter] = useState<"Semua" | "Agenda" | "Akademik" | "Pengumuman">("Semua");
  const [search, setSearch] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filtered = useMemo(() => {
    return newsList.filter((item) => {
      const matchCat = filter === "Semua" || item.category === filter;
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [newsList, filter, search]);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28">
      {/* Banner */}
      <PageBanner
        category="Warta & Informasi"
        title="Berita & Pengumuman Resmi"
        subtitle="Dapatkan informasi terbaru seputar agenda seminar, lokakarya, capaian prestasi mahasiswa, dan pengumuman akademik Teknik Informatika UMPO."
        breadcrumbs={[
          { label: "Beranda", action: () => onNavigate("home") },
          { label: "Berita & Pengumuman" },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-200/80 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {(["Semua", "Agenda", "Akademik", "Pengumuman"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                  filter === tab
                    ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berita atau agenda..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-8 text-xs font-medium text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1453d6]/40 hover:shadow-[0_20px_40px_-15px_rgba(20,83,214,0.15)] cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.title}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3.5 top-3.5">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#1453d6] shadow-sm backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="size-3.5" /> {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="size-3.5" /> {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold leading-snug text-[#08235b] group-hover:text-[#1453d6] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1453d6]">
                <span>Baca Selengkapnya</span>
                <span className="grid size-7 place-items-center rounded-full bg-blue-50 text-[#1453d6] transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
              <FileText className="mx-auto size-12 text-slate-300" />
              <h4 className="mt-4 font-display text-lg font-bold text-slate-700">Tidak ada berita yang cocok</h4>
              <p className="mt-1 text-sm text-slate-500">
                Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
              </p>
              <button
                onClick={() => {
                  setFilter("Semua");
                  setSearch("");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#08235b]"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* News Detail Modal */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white p-6 md:p-8 shadow-2xl">
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X className="size-5" />
              </button>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1453d6]">
                {selectedNews.category}
              </div>

              <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold leading-tight text-[#08235b]">
                {selectedNews.title}
              </h2>

              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400 pb-5 border-b border-slate-100">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="size-3.5" /> {selectedNews.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="size-3.5" /> {selectedNews.readTime}
                </span>
              </div>

              {selectedNews.image && (
                <div className="mt-5 overflow-hidden rounded-2xl aspect-video w-full">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="size-full object-cover"
                  />
                </div>
              )}

              <div className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-slate-700">
                <p>{selectedNews.excerpt}</p>
                <p>
                  Program Studi S1 Teknik Informatika Universitas Muhammadiyah Ponorogo senantiasa mendukung peningkatan
                  kualitas akademik dan wawasan keilmuan bagi seluruh mahasiswa melalui seminar, lokakarya, dan program
                  kolaborasi industri secara berkala.
                </p>
                <p>
                  Untuk informasi teknis lebih lanjut mengenai kegiatan ini, silakan menghubungi sekretariat prodi di
                  Gedung Fakultas Teknik Lantai 2 Kampus 1 UMPO atau melalui kanal komunikasi resmi kami.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="rounded-full bg-slate-100 px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                >
                  Tutup
                </button>
                <a
                  href={`https://wa.me/6282267868648?text=Halo%20Admin%20TI%20UMPO,%20saya%20ingin%20bertanya%20mengenai%20berita:%20${encodeURIComponent(selectedNews.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#08235b] transition"
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
