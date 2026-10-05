"use client";

import React, { useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import {
  Download as DownloadIcon,
  FileText,
  FileCheck,
  Search,
} from "lucide-react";
import type { Download } from "@/payload-types";

type DownloadClientProps = {
  initialDownloads: Download[];
};

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getFileExtension(mimeType?: string | null, filename?: string | null) {
  if (filename) {
    const ext = filename.split('.').pop();
    if (ext) return ext.toUpperCase();
  }
  if (mimeType) {
    if (mimeType === 'application/pdf') return 'PDF';
    if (mimeType === 'application/msword' || mimeType.includes('wordprocessingml')) return 'DOCX';
  }
  return 'FILE';
}

export function DownloadClient({ initialDownloads }: DownloadClientProps) {
  const [selectedCat, setSelectedCat] = useState("Semua");
  const [search, setSearch] = useState("");

  const categories = ["Semua", "Pedoman", "Skripsi", "Magang", "KKN", "Publikasi"];

  const filtered = initialDownloads.filter((d) => {
    const matchCat = selectedCat === "Semua" || d.category === selectedCat;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28">
      {/* Banner */}
      <PageBanner
        category="Layanan Mahasiswa & Dosen"
        title="Pusat Unduhan Dokumen Resmi"
        subtitle="Unduh buku pedoman akademik, template skripsi SISKRIP, formulir kerja praktik/magang, dan template jurnal resmi Program Studi S1 Teknik Informatika UMPO."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Download Center" },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-200/80 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                  selectedCat === cat
                    ? "bg-[#1453d6] text-white shadow-md shadow-blue-600/25"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama formulir atau template..."
              aria-label="Cari nama formulir atau template dokumen"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-4 text-xs font-medium text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {filtered.map((doc, idx) => {
            const media = typeof doc.file === 'object' ? doc.file : null;
            const fileUrl = media?.url || null;
            const fileExt = getFileExtension(media?.mimeType, media?.filename);
            const fileSize = media?.filesize ? formatBytes(media.filesize) : 'Unknown size';

            return (
              <div
                key={idx}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-[#1453d6]/40 hover:shadow-md"
              >
                <div className="flex items-center gap-4 min-w-0 pr-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-[#1453d6] shadow-xs">
                    <FileText className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#08235b] line-clamp-1">{doc.title}</h4>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-bold uppercase text-[#1453d6]">
                        {fileExt}
                      </span>
                      <span>•</span>
                      <span>{fileSize}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-600">{doc.category}</span>
                    </div>
                  </div>
                </div>

                {fileUrl ? (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1453d6] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#08235b] transition"
                  >
                    Unduh <DownloadIcon className="size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Berkas belum tersedia"
                    className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-full bg-slate-200 px-4 py-2.5 text-xs font-bold text-slate-400"
                  >
                    Segera <DownloadIcon className="size-3.5" aria-hidden="true" />
                  </span>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
              <FileCheck className="mx-auto size-12 text-slate-300" />
              <h4 className="mt-4 font-display text-lg font-bold text-slate-700">Dokumen tidak ditemukan</h4>
              <p className="mt-1 text-sm text-slate-500">
                Tidak ada dokumen yang cocok dengan kata kunci &ldquo;{search}&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Petunjuk Penggunaan Dokumen */}
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 p-7 md:p-9 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Panduan Administrasi</div>
          <h3 className="mt-1 font-display text-xl font-bold text-[#08235b]">
            Prosedur Pengajuan & Pengunggahan Dokumen Akademik
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="rounded-2xl bg-white p-4 border border-blue-100/60 shadow-xs">
              <div className="font-bold text-[#1453d6] text-sm">1. Unduh & Isi Template</div>
              <p className="mt-1.5 leading-relaxed text-slate-600">
                Gunakan template resmi terbaru tanpa mengubah format tata letak, margin, dan jenis huruf yang telah
                distandarisasi prodi.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-blue-100/60 shadow-xs">
              <div className="font-bold text-[#1453d6] text-sm">2. Verifikasi Dosen PA / Pembimbing</div>
              <p className="mt-1.5 leading-relaxed text-slate-600">
                Konsultasikan dokumen Anda kepada Dosen Pembimbing Akademik (PA) atau Pembimbing Skripsi untuk
                mendapatkan persetujuan.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-blue-100/60 shadow-xs">
              <div className="font-bold text-[#1453d6] text-sm">3. Unggah ke SIMTIK / SISKRIP</div>
              <p className="mt-1.5 leading-relaxed text-slate-600">
                Unggah berkas dalam format PDF melalui portal resmi SISKRIP atau sampaikan ke tata usaha Fakultas Teknik
                UMPO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
