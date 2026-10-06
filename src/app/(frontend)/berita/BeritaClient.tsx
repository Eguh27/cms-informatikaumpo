"use client";

import React, { useState, useMemo } from "react";
import { PageBanner } from "@/components/PageBanner";
import { SITE_MEDIA } from "@/data/siteMedia";
import {
  Calendar,
  Clock,
  Search,
  ArrowRight,
  X,
  FileText,
} from "lucide-react";
import type { News } from "@/payload-types";
import Link from "next/link";

type BeritaClientProps = {
  initialNews: News[];
};

export function BeritaClient({ initialNews }: BeritaClientProps) {
  const [filter, setFilter] = useState<"Semua" | "Agenda" | "Akademik" | "Pengumuman">("Semua");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return initialNews.filter((item) => {
      const itemCategory = typeof item.category === 'object' && item.category !== null ? item.category.title : item.category;
      const matchCat = filter === "Semua" || itemCategory === filter;
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [filter, search, initialNews]);

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      {/* Banner */}
      <PageBanner
        category="Warta & Informasi"
        title="Berita & Pengumuman Resmi"
        subtitle="Dapatkan informasi terbaru seputar agenda seminar, lokakarya, capaian prestasi mahasiswa, dan pengumuman akademik Teknik Informatika UMPO."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
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
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 min-h-[44px] inline-flex items-center ${
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
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berita atau agenda..."
              aria-label="Cari berita atau agenda"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-8 text-xs font-medium text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => {
            const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null;
            const dateStr = item.publishedAt 
              ? new Date(item.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : '';

            return (
              <Link href={`/berita/${item.slug}`} key={item.id}>
                <article
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1453d6]/40 hover:shadow-[0_20px_40px_-15px_rgba(20,83,214,0.15)] cursor-pointer h-full"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          imageUrl || SITE_MEDIA.labSoftware
                        }
                        alt={item.title}
                        className="size-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3.5 top-3.5">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#1453d6] shadow-sm backdrop-blur-md">
                          {typeof item.category === 'object' && item.category !== null ? item.category.title : item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="size-3.5" /> {dateStr}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="size-3.5" /> {item.readTime || 3} min read
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
              </Link>
            );
          })}

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
      </div>
    </div>
  );
}
