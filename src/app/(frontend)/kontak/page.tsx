"use client";

import React, { useState } from "react";
import { PageBanner } from "@/components/PageBanner";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  Send,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

const WA_NUMBER = "6282267868648";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Universitas%20Muhammadiyah%20Ponorogo%20Jl.%20Budi%20Utomo%20No.10&output=embed";
const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Universitas+Muhammadiyah+Ponorogo+Jl.+Budi+Utomo+No.+10";

const CHANNELS = [
  {
    icon: MapPin,
    tint: "bg-blue-50 text-[#1453d6]",
    title: "Lokasi Kampus",
    lines: ["Gedung Fakultas Teknik Lt. 2", "Jl. Budi Utomo No. 10, Ponorogo 63471"],
    action: { label: "Rute ke Kampus", href: MAPS_DIRECTIONS },
  },
  {
    icon: WhatsAppIcon,
    tint: "bg-emerald-50 text-[#15803D]",
    title: "WhatsApp Hotline",
    lines: ["0822-6786-8648", "Respon jam layanan"],
    action: { label: "Chat Sekarang", href: `https://wa.me/${WA_NUMBER}` },
  },
  {
    icon: Mail,
    tint: "bg-blue-50 text-[#1453d6]",
    title: "Email Resmi",
    lines: ["informatika@umpo.ac.id", "teknik@umpo.ac.id"],
    action: { label: "Kirim Email", href: "mailto:informatika@umpo.ac.id" },
  },
  {
    icon: Clock,
    tint: "bg-amber-50 text-[#B45309]",
    title: "Jam Layanan",
    lines: ["Senin s.d. Jumat", "08.00 s.d. 15.30 WIB"],
    action: { label: "Info PMB", href: "https://spmb.umpo.ac.id/" },
  },
];

const FAQS = [
  {
    q: "Bagaimana status akreditasi S1 Teknik Informatika UMPO?",
    a: "Program Studi S1 Teknik Informatika terakreditasi resmi Peringkat \u201cB\u201d oleh BAN-PT dengan SK No. 3418/SK/BAN-PT/Akred/S/IX/2019.",
  },
  {
    q: "Di mana lokasi bimbingan skripsi dan konsultasi dosen?",
    a: "Bimbingan skripsi dikelola online melalui portal SISKRIP dan tatap muka di Ruang Dosen Gedung Fakultas Teknik Lantai 2 UMPO.",
  },
  {
    q: "Apakah ada program magang industri bersertifikat?",
    a: "Ya, mahasiswa semester 6 dan 7 dapat mengikuti Kerja Praktik di perusahaan mitra serta program Magang dan Studi Independen Bersertifikat (MSIB).",
  },
  {
    q: "Bagaimana cara mendaftar sebagai mahasiswa baru?",
    a: "Pendaftaran dilakukan online melalui spmb.umpo.ac.id. Untuk panduan jalur dan biaya, hubungi hotline WhatsApp prodi di 0822-6786-8648.",
  },
];

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    identity: "",
    status: "Mahasiswa Aktif",
    topic: "Konsultasi Akademik / KRS",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Pesan Konsultasi Website TI UMPO*
Nama: ${formData.name || "-"}
NIM / Instansi: ${formData.identity || "-"}
Status: ${formData.status}
Topik: ${formData.topic}

Pesan:
${formData.message || "Halo Admin, saya ingin berkonsultasi seputar Program Studi S1 Teknik Informatika UMPO."}`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      <PageBanner
        category="Pusat Komunikasi & Layanan"
        title="Kontak & Layanan Mahasiswa"
        subtitle="Hubungi kami untuk pertanyaan akademik, bimbingan skripsi, informasi pendaftaran mahasiswa baru, atau kerjasama riset dan industri."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Kontak & Layanan" },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Channel cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const external = c.action.href.startsWith("http");
            return (
              <div
                key={c.title}
                className="group rounded-3xl border border-[#1E6FD9]/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,42,74,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E6FD9]/35 hover:shadow-[0_16px_32px_-4px_rgba(30,111,217,0.12)]"
              >
                <div className={`grid size-11 place-items-center rounded-2xl ${c.tint}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-display text-base font-bold text-[#0B3A8C]">{c.title}</h2>
                {c.lines.map((line) => (
                  <p key={line} className="mt-1 text-xs leading-relaxed text-[#4B6B94]">
                    {line}
                  </p>
                ))}
                <a
                  href={c.action.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6FD9] hover:text-[#0B3A8C]"
                >
                  {c.action.label}
                  <ExternalLink className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Map + quick contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-[#1E6FD9]/10 bg-white shadow-[0_4px_20px_-2px_rgba(15,42,74,0.05)]">
            <iframe
              title="Peta lokasi Kampus 1 Universitas Muhammadiyah Ponorogo"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 md:h-80"
              allowFullScreen
            />
            <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#EAF4FF] text-[#1E6FD9]">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-[#0B3A8C]">
                    Kampus 1 UMPO — Fakultas Teknik
                  </h2>
                  <p className="mt-0.5 text-xs text-[#4B6B94]">
                    Jl. Budi Utomo No.10, Ronowijayan, Siman, Ponorogo, Jawa Timur 63471
                  </p>
                </div>
              </div>
              <a
                href={MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1E6FD9] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0B3A8C]"
              >
                <Navigation className="size-3.5" aria-hidden="true" /> Petunjuk Arah
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#1E6FD9] to-[#0B3A8C] p-7 text-white shadow-[0_16px_36px_rgba(30,111,217,0.25)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Phone className="size-3.5" aria-hidden="true" /> Hotline Sekretariat Prodi
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold tracking-tight">
                0822-6786-8648
              </p>
              <p className="mt-1 text-xs text-white/75">
                Senin–Jumat, 08.00–15.30 WIB · di luar jam layanan pesan akan dibalas berikutnya
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#15803D] py-3 text-xs font-bold text-white shadow-lg transition hover:bg-[#166534]"
              >
                <WhatsAppIcon className="size-4" /> Chat WhatsApp Sekarang
              </a>
            </div>
            <div className="flex-1 rounded-3xl border border-[#1E6FD9]/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,42,74,0.05)]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E6FD9]">
                <GraduationCap className="size-4" aria-hidden="true" /> Calon Mahasiswa Baru
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#4B6B94]">
                Pendaftaran PMB dilakukan online. Siapkan ijazah/SKL dan pas foto sebelum mengisi
                formulir.
              </p>
              <a
                href="https://spmb.umpo.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#1E6FD9]/30 px-5 py-2.5 text-xs font-bold text-[#0B3A8C] transition hover:border-[#1E6FD9] hover:bg-[#EAF4FF]"
              >
                Daftar di spmb.umpo.ac.id <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 rounded-3xl border border-[#1E6FD9]/10 bg-white p-7 md:p-10 shadow-[0_4px_20px_-2px_rgba(15,42,74,0.05)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <WhatsAppIcon className="size-3.5" aria-hidden="true" /> Layanan Konsultasi WhatsApp Cepat
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B3A8C]">
              Kirim Pesan Langsung ke Admin Prodi
            </h2>
            <p className="mt-1 text-xs md:text-sm text-[#4B6B94]">
              Isi data di bawah ini untuk memulai obrolan langsung dengan staf administrasi dan
              akademik via WhatsApp.
            </p>

            <form onSubmit={handleSendWA} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="kontak-nama" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Lengkap <span aria-hidden="true" className="text-red-500">*</span>
                  </label>
                  <input
                    id="kontak-nama"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="kontak-identitas" className="block text-xs font-bold text-slate-700 mb-1.5">
                    NIM / Asal Sekolah
                  </label>
                  <input
                    id="kontak-identitas"
                    type="text"
                    placeholder="Contoh: 21533001 / SMA N 1"
                    value={formData.identity}
                    onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="kontak-status" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Status Pengirim
                  </label>
                  <select
                    id="kontak-status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
                  >
                    <option value="Mahasiswa Aktif">Mahasiswa Aktif TI UMPO</option>
                    <option value="Calon Mahasiswa">Calon Mahasiswa Baru (PMB)</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Orang Tua Mahasiswa">Orang Tua Mahasiswa</option>
                    <option value="Mitra Industri / Instansi">Mitra Industri / Instansi</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="kontak-topik" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Topik Konsultasi
                  </label>
                  <select
                    id="kontak-topik"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
                  >
                    <option value="Konsultasi Akademik / KRS">Konsultasi Akademik / KRS</option>
                    <option value="Bimbingan Skripsi (SISKRIP)">Bimbingan Skripsi (SISKRIP)</option>
                    <option value="Magang Industri / KP">Magang Industri / Kerja Praktik</option>
                    <option value="Pendaftaran Mahasiswa Baru">Pendaftaran Mahasiswa Baru (PMB)</option>
                    <option value="Kerjasama & Riset">Kerjasama & Riset Kolaborasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="kontak-pesan" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Isi Pesan Konsultasi <span aria-hidden="true" className="text-red-500">*</span>
                </label>
                <textarea
                  id="kontak-pesan"
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan atau keperluan konsultasi Anda di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 transition focus:border-[#1453d6] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#15803D] py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-[#166534]"
              >
                <Send className="size-4" aria-hidden="true" /> Buka WhatsApp &amp; Kirim Pesan
              </button>
              <p aria-live="polite" className="min-h-5 text-center text-xs">
                {sent && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    WhatsApp terbuka — selesaikan pengiriman pesan di sana.
                  </span>
                )}
              </p>
            </form>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-[#1E6FD9]/10 bg-white p-7 md:p-9 shadow-[0_4px_20px_-2px_rgba(15,42,74,0.05)]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E6FD9]">
              Pertanyaan Umum
            </div>
            <h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-[#0B3A8C]">
              Frequently Asked Questions
            </h2>

            <div className="mt-6 space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-slate-100 bg-slate-50/60 transition open:border-[#1E6FD9]/25 open:bg-[#EAF4FF]/50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-bold text-slate-800 transition hover:text-[#1E6FD9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown
                      className="size-4 shrink-0 text-[#1E6FD9] transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-4 pb-4 text-xs leading-relaxed text-[#4B6B94]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
