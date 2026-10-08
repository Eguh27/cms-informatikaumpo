"use client";

import React, { useState } from "react";
import { PxCard, PxButton, PxCircle } from "@/components/ui";
import { cn } from "@/utilities/ui";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SITE_LINKS } from "@/data/siteMedia";
import {
  MapPin,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

const WA_NUMBER = "6282267868648";
const WA_PHONE = "0822-6786-8648";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Universitas%20Muhammadiyah%20Ponorogo%20Jl.%20Budi%20Utomo%20No.10&output=embed";
const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Universitas+Muhammadiyah+Ponorogo+Jl.+Budi+Utomo+No.+10";

/**
 * Secondary channels, folded into the hotline panel as a compact rail so the
 * four equal-weight cards (each repeating an ALL-CAPS label, an icon tile, a
 * title and two lines of copy) collapse into one scannable list.
 */
const RAIL = [
  {
    icon: Mail,
    label: "Email resmi",
    value: "informatika@umpo.ac.id",
    alt: "teknik@umpo.ac.id",
    href: "mailto:informatika@umpo.ac.id",
    action: "Kirim email",
  },
  {
    icon: Clock,
    label: "Jam layanan",
    value: "Senin–Jumat",
    alt: "08.00–15.30 WIB",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Gedung Fakultas Teknik Lt. 2",
    alt: "Jl. Budi Utomo No. 10, Ponorago 63471",
    href: MAPS_DIRECTIONS,
    action: "Rute ke kampus",
  },
];

const FAQS = [
  {
    q: "Bagaimana status akreditasi S1 Teknik Informatika UMPO?",
    a: "Terakreditasi resmi Peringkat B oleh BAN-PT, SK No. 3418/SK/BAN-PT/Akred/S/IX/2019. Sertifikatnya bisa diunduh di halaman unduhan.",
  },
  {
    q: "Di mana lokasi bimbingan skripsi dan konsultasi dosen?",
    a: "Tatap muka di Ruang Dosen Gedung Fakultas Teknik lantai 2, sesuai jadwal masing-masing pembimbing. Enrollment dan unlod bab dilakukan lewat portal SISKRIP.",
  },
  {
    q: "Apakah ada program magang industri bersertifikat?",
    a: "Ada. Semester 6–7 dapat mengikuti Kerja Praktik di perusahaan mitra, atau program Magang dan Studi Independen Bersertifikat (MSIB).",
  },
  {
    q: "Bagaimana cara mendaftar sebagai mahasiswa baru?",
    a: "Pendaftaran online lewat spmb.umpo.ac.id. Untuk panduan jalur dan biaya, hubungi hotline prodi di 0822-6786-8648.",
  },
];

const fieldBase =
  "w-full min-h-[44px] rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F2A4A] transition placeholder:text-[#4B6B94] focus:outline-none focus:ring-2";
const fieldOk = "border-[#1E6FD9]/18 focus:border-[#1E6FD9] focus:ring-[#1E6FD9]/25";
const fieldBad = "border-[#B42318] bg-[#FEF3F2] focus:border-[#B42318] focus:ring-[#B42318]/20";

/**
 * Body of the "Kontak & Lokasi" section. Rendered as a tab inside /profil, so it
 * carries no page banner or page shell of its own — the host owns both.
 */
export function KontakContent() {
  const [formData, setFormData] = useState({
    name: "",
    identity: "",
    status: "Mahasiswa Aktif",
    topic: "Konsultasi Akademik / KRS",
    message: "",
  });
  // 'blocked' covers the popup-blocker case: window.open returns null, so
  // claiming "WhatsApp terbuka" would be a lie.
  const [status, setStatus] = useState<"idle" | "sent" | "blocked">("idle");
  const [tried, setTried] = useState(false);

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `*Pesan Konsultasi Website TI UMPO*
Nama: ${formData.name || "-"}
NIM / Instansi: ${formData.identity || "-"}
Status: ${formData.status}
Topik: ${formData.topic}

Pesan:
${formData.message || "Halo Admin, saya ingin berkonsultasi seputar Program Studi S1 Teknik Informatika UMPO."}`,
  )}`;

  const update = (patch: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
    setStatus("idle");
  };

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!formData.name.trim() || !formData.message.trim()) return;
    const win = window.open(waLink, "_blank", "noopener,noreferrer");
    setStatus(win ? "sent" : "blocked");
  };

  const invalid = (v: string) => tried && !v.trim();

  return (
    <div className="space-y-6">
      {/* Baris 1 — 5 / 7. Peta direka tighter ke panel hotline agar keduanya
          setinggi tanpa memaksa tinggi minimum yang memotong peta. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7 items-stretch">
        <div className="lg:col-span-5 flex flex-col rounded-[2rem] bg-[#0B3A8C] p-7 text-white shadow-[0_20px_40px_-8px_rgba(11,58,140,0.35)] md:p-8">
          <div className="flex items-center gap-5">
            <PxCircle tone="onNavy" size="hero">
              <span aria-hidden="true">
                <WhatsAppIcon className="size-9 md:size-11" />
              </span>
            </PxCircle>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white/75">Hotline Sekretariat Prodi</p>
              <a
                href={`tel:+${WA_NUMBER}`}
                className="mt-0.5 block font-display text-[2.5rem] font-extrabold tracking-tight tabular-nums transition-colors hover:text-[#FFB84D]"
              >
                {WA_PHONE}
              </a>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/75">
            Di luar jam layanan, pesan dibalas pada hari kerja berikutnya.
          </p>

          <PxButton variant="whatsapp" size="lg" asChild className="mt-5 w-full">
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Chat WhatsApp sekarang
            </a>
          </PxButton>

          <ul className="mt-7 divide-y divide-white/12 border-t border-white/12">
            {RAIL.map((c) => {
              const Icon = c.icon;
              const external = c.href?.startsWith("http");
              return (
                <li key={c.label} className="group flex items-center gap-3.5 py-3.5">
                  <PxCircle tone="onNavySoft" size="md">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </PxCircle>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/60">{c.label}</p>
                    <p className="truncate text-sm font-semibold">{c.value}</p>
                    <p className="truncate text-xs text-white/60">{c.alt}</p>
                  </div>
                  {c.href && (
                    <a
                      href={c.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="grid size-11 shrink-0 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-[#FFB84D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB84D]"
                    >
                      <span className="sr-only">
                        {c.action} — {c.value}
                      </span>
                      <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7 flex flex-col overflow-hidden rounded-[2rem] border border-[#1E6FD9]/10 bg-white shadow-[0_4px_20px_-2px_rgba(15,42,74,0.05)]">
          <iframe
            title="Meta lokasi Kampus 1 Universitas Muhammadiyah Ponorogo"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-64 w-full flex-1 border-0"
            allowFullScreen
          />
          <div className="flex flex-col gap-4 border-t border-[#1E6FD9]/10 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
            <div className="flex items-start gap-3.5">
              <PxCircle tone="primary" size="md">
                <MapPin className="size-[18px]" aria-hidden="true" />
              </PxCircle>
              <div className="min-w-0">
                <h2 className="font-display text-xl font-bold text-[#0B3A8C]">
                  Kampus 1 UMPO — Fakultas Teknik
                </h2>
                <p className="mt-0.5 text-xs leading-relaxed text-[#4B6B94]">
                  Jl. Budi Utomo No. 10, Ronowijayan, Siman, Ponorogo, Jawa Timur 63471
                </p>
              </div>
            </div>
            <PxButton variant="primary" size="sm" asChild className="min-h-[44px] shrink-0">
              <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-3.5" aria-hidden="true" />
                Petunjuk arah
              </a>
            </PxButton>
          </div>
        </div>
      </div>

      {/* Baris 2 — 7 / 5, cermin baris 1. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7 items-start">
        <PxCard className="lg:col-span-7" padding="lg">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#0B3A8C] md:text-3xl">
            Kirim pesan ke admin prodi
          </h2>
          <p className="mt-2 text-sm text-[#4B6B94]">
            Isi data di bawah, lalu pesan akan tersusun siap kirim di WhatsApp.
          </p>

          <form onSubmit={handleSendWA} className="mt-7" aria-labelledby="kontak-form-title">
            <h3 id="kontak-form-title" className="sr-only">
              Formulir konsultasi WhatsApp
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="kontak-nama" className="mb-1.5 block text-xs font-semibold text-[#0F2A4A]">
                  Nama lengkap <span className="text-[#B42318]" aria-hidden="true">*</span>
                </label>
                <input
                  id="kontak-nama"
                  type="text"
                  required
                  autoComplete="name"
                  aria-invalid={invalid(formData.name) || undefined}
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className={cn(fieldBase, invalid(formData.name) ? fieldBad : fieldOk)}
                />
              </div>
              <div>
                <label htmlFor="kontak-identitas" className="mb-1.5 block text-xs font-semibold text-[#0F2A4A]">
                  NIM / asal sekolah
                </label>
                <input
                  id="kontak-identitas"
                  type="text"
                  placeholder="Contoh: 21533001 / SMA N 1"
                  value={formData.identity}
                  onChange={(e) => update({ identity: e.target.value })}
                  className={cn(fieldBase, fieldOk)}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="kontak-status" className="mb-1.5 block text-xs font-semibold text-[#0F2A4A]">
                  Status pengirim
                </label>
                <select
                  id="kontak-status"
                  value={formData.status}
                  onChange={(e) => update({ status: e.target.value })}
                  className={cn(fieldBase, fieldOk)}
                >
                  <option value="Mahasiswa Aktif">Mahasiswa aktif TI UMPO</option>
                  <option value="Calon Mahasiswa">Calon mahasiswa baru (PMB)</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Orang Tua Mahasiswa">Orang tua mahasiswa</option>
                  <option value="Mitra Industri / Instansi">Mitra industri / instansi</option>
                </select>
              </div>
              <div>
                <label htmlFor="kontak-topik" className="mb-1.5 block text-xs font-semibold text-[#0F2A4A]">
                  Topik konsultasi
                </label>
                <select
                  id="kontak-topik"
                  value={formData.topic}
                  onChange={(e) => update({ topic: e.target.value })}
                  className={cn(fieldBase, fieldOk)}
                >
                  <option value="Konsultasi Akademik / KRS">Konsultasi akademik / KRS</option>
                  <option value="Bimbingan Skripsi (SISKRIP)">Bimbingan skripsi (SISKRIP)</option>
                  <option value="Magang Industri / KP">Magang industri / kerja praktik</option>
                  <option value="Pendaftaran Mahasiswa Baru">Pendaftaran mahasiswa baru (PMB)</option>
                  <option value="Kerjasama & Riset">Kerjasama & riset kolaborasi</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="kontak-pesan" className="mb-1.5 block text-xs font-semibold text-[#0F2A4A]">
                Isi pesan <span className="text-[#B42318]" aria-hidden="true">*</span>
              </label>
              <textarea
                id="kontak-pesan"
                rows={4}
                required
                aria-invalid={invalid(formData.message) || undefined}
                placeholder="Tuliskan pertanyaan atau keperluan konsultasi Anda di sini…"
                value={formData.message}
                onChange={(e) => update({ message: e.target.value })}
                className={cn(fieldBase, "resize-y", invalid(formData.message) ? fieldBad : fieldOk)}
              />
            </div>

            <PxButton type="submit" variant="whatsapp" size="lg" className="mt-6 w-full">
              <Send className="size-4" aria-hidden="true" />
              Buka WhatsApp &amp; kirim pesan
            </PxButton>

            <div role="status" aria-live="polite" className="mt-3 min-h-6 text-center text-xs">
              {status === "sent" && (
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#0F766E]">
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  WhatsApp terbuka — selesaikan pengiriman pesan di sana.
                </span>
              )}
              {status === "blocked" && (
                <span className="inline-flex flex-wrap items-center justify-center gap-1.5 font-semibold text-[#B42318]">
                  <AlertTriangle className="size-4" aria-hidden="true" />
                  Browser memblokir jendela sembul.
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    Buka WhatsApp manual
                  </a>
                </span>
              )}
            </div>
          </form>
        </PxCard>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <PxCard padding="default">
            <h2 className="font-display text-xl font-extrabold tracking-tight text-[#0B3A8C]">
              Pertanyaan umum
            </h2>
            <p className="mt-1.5 text-sm text-[#4B6B94]">
              Jawaban singkat sebelum menghubungi admin.
            </p>
            {/* Hairlines run edge to edge and carry no radius, which avoids the
                rounded-box-inside-rounded-box nesting problem entirely. */}
            <div className="mt-5 divide-y divide-[#1E6FD9]/12 border-y border-[#1E6FD9]/12">
              {FAQS.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-sm font-semibold text-[#0F2A4A] transition-colors hover:text-[#1E6FD9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6FD9] group-open:text-[#1E6FD9] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown
                      className="mt-0.5 size-4 shrink-0 text-[#4B6B94] transition-transform group-open:rotate-180 group-open:text-[#1E6FD9]"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-[#4B6B94]">{f.a}</p>
                </details>
              ))}
            </div>
          </PxCard>

          <PxCard padding="sm" className="border-[#FFB84D]/45 bg-[#FFE8CC] shadow-none">
            <div className="flex items-start gap-3.5">
              <PxCircle tone="amber" size="md">
                <GraduationCap className="size-[18px]" aria-hidden="true" />
              </PxCircle>
              <div className="min-w-0">
                <h2 className="font-display text-base font-bold text-[#0F2A4A]">
                  Calon mahasiswa baru
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#0F2A4A]/80">
                  Pendaftaran PMB dilakukan online. Siapkan ijazah/SKL dan pas foto
                  sebelum mengisi formulir.
                </p>
                <PxButton
                  variant="ghost"
                  size="sm"
                  asChild
                  className="mt-4 min-h-[44px] border-[#0F2A4A]/35 text-[#0F2A4A] hover:border-[#0F2A4A] hover:bg-[#FFB84D]/25 hover:text-[#0F2A4A]"
                >
                  <a href={SITE_LINKS.pmb} target="_blank" rel="noopener noreferrer">
                    Daftar di spmb.umpo.ac.id
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </PxButton>
              </div>
            </div>
          </PxCard>
        </div>
      </div>
    </div>
  );
}