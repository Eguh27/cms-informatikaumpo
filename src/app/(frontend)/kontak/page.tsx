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
} from "lucide-react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    identity: "",
    status: "Mahasiswa Aktif",
    topic: "Konsultasi Akademik / KRS",
    message: "",
  });

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Pesan Konsultasi Website TI UMPO*
Nama: ${formData.name || "-"}
NIM / Instansi: ${formData.identity || "-"}
Status: ${formData.status}
Topik: ${formData.topic}

Pesan:
${formData.message || "Halo Admin, saya ingin berkonsultasi seputar Program Studi S1 Teknik Informatika UMPO."}`;

    window.open(
      `https://wa.me/6282267868648?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28">
      {/* Banner */}
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
        {/* Contact info cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-[#1453d6]">
              <MapPin className="size-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-[#08235b]">Lokasi Kampus</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Gedung Fakultas Teknik Lt. 2, Kampus 1 UMPO, Jl. Budi Utomo No. 10, Ponorogo 63471
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-[#25D366]">
              <WhatsAppIcon className="size-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-[#08235b]">WhatsApp Hotline</h4>
            <p className="mt-1 text-xs text-slate-600 font-mono">0822-6786-8648</p>
            <a
              href="https://wa.me/6282267868648"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366] hover:underline"
            >
              Chat Sekarang <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-[#1453d6]">
              <Mail className="size-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-[#08235b]">Email Resmi</h4>
            <p className="mt-1 text-xs text-slate-600">informatika@umpo.ac.id</p>
            <p className="text-xs text-slate-400">teknik@umpo.ac.id</p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-50 text-[#1453d6]">
              <Clock className="size-5" />
            </div>
            <h4 className="mt-4 font-display text-base font-bold text-[#08235b]">Jam Layanan</h4>
            <p className="mt-1 text-xs text-slate-600">Senin s.d. Jumat</p>
            <p className="text-xs text-slate-400">08.00 s.d. 15.30 WIB</p>
          </div>
        </div>

        {/* WhatsApp Consultation Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Form */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <WhatsAppIcon className="size-3.5" /> Layanan Konsultasi WhatsApp Cepat
            </div>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
              Kirim Pesan Langsung ke Admin Prodi
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-500">
              Isi data di bawah ini untuk memulai obrolan langsung dengan staf administrasi dan akademik Teknik
              Informatika UMPO via WhatsApp.
            </p>

            <form onSubmit={handleSendWA} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 focus:border-[#1453d6] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">NIM / Asal Sekolah</label>
                  <input
                    type="text"
                    placeholder="Contoh: 21533001 / SMA N 1"
                    value={formData.identity}
                    onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 focus:border-[#1453d6] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Status Pengirim</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 focus:border-[#1453d6] focus:bg-white focus:outline-none"
                  >
                    <option value="Mahasiswa Aktif">Mahasiswa Aktif TI UMPO</option>
                    <option value="Calon Mahasiswa">Calon Mahasiswa Baru (PMB)</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Orang Tua Mahasiswa">Orang Tua Mahasiswa</option>
                    <option value="Mitra Industri / Instansi">Mitra Industri / Instansi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Topik Konsultasi</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 focus:border-[#1453d6] focus:bg-white focus:outline-none"
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Isi Pesan Konsultasi *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan atau keperluan konsultasi Anda di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 focus:border-[#1453d6] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-[#1ebd59] transition"
              >
                <WhatsAppIcon className="size-4" /> Buka WhatsApp & Kirim Pesan
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-white p-7 md:p-9 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Pertanyaan Umum</div>
            <h3 className="mt-1 font-display text-xl font-bold text-[#08235b]">Frequently Asked Questions</h3>

            <div className="mt-6 space-y-4 text-xs">
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="font-bold text-slate-800">Bagaimana status akreditasi S1 Teknik Informatika UMPO?</div>
                <div className="mt-1 text-slate-600 leading-relaxed">
                  Program Studi S1 Teknik Informatika terakreditasi resmi Peringkat &ldquo;B&rdquo; oleh BAN-PT dengan SK
                  No. 3418/SK/BAN-PT/Akred/S/IX/2019.
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="font-bold text-slate-800">Di mana lokasi bimbingan skripsi dan konsultasi dosen?</div>
                <div className="mt-1 text-slate-600 leading-relaxed">
                  Bimbingan skripsi dikelola secara online melalui portal SISKRIP (siskrip.simakumpo.com) dan tatap muka
                  di Ruang Dosen Gedung Fakultas Teknik Lantai 2 UMPO.
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="font-bold text-slate-800">Apakah ada program magang industri bersertifikat?</div>
                <div className="mt-1 text-slate-600 leading-relaxed">
                  Ya, mahasiswa semester 6 dan 7 dapat mengikuti program Kerja Praktik di perusahaan mitra industri serta
                  program Magang dan Studi Independen Bersertifikat (MSIB).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
