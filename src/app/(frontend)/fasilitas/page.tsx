import React from "react";
import { PageBanner } from "@/components/PageBanner";
import {
  Network,
  Laptop,
  Building2,
  CheckCircle2,
  Users,
  BookOpen,
} from "lucide-react";

export default function FasilitasPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      {/* Banner */}
      <PageBanner
        category="Sarana & Prasarana"
        title="Laboratorium & Fasilitas Riset"
        subtitle="Infrastruktur komputasi berkinerja tinggi, jaringan berkecepatan gigabit, dan perangkat IoT mutakhir untuk mendukung eksperimen dan riset mahasiswa Teknik Informatika UMPO."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Fasilitas & Lab" },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Lab 1 & Lab 2 Showcase */}
        <div className="space-y-12 mb-16">
          {/* Lab 1: Jaringan & IoT */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#1453d6] border border-blue-100">
                  <Network className="size-3.5" /> Laboratorium Unggulan 1
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                  Laboratorium Jaringan Komputer, Cyber Security & IoT
                </h2>
                <div className="mt-2 text-xs font-semibold text-slate-500">
                  Kepala Laboratorium: <span className="text-[#1453d6] font-bold">Angga Prasetyo, S.T., M.Kom.</span>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Pusat eksperimen infrastruktur jaringan komputer berskala enterprise, pengujian keamanan siber
                  (penetration testing), dan prototyping perangkat cerdas Internet of Things (IoT). Dilengkapi rak
                  server, switch Cisco, router Mikrotik, serta modul mikrokontroler sensor industri.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Cisco & Mikrotik Routing Labs</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>IoT Dev Kits (ESP32, Raspberry Pi)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Fiber Optic Splicer & Tester</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Cyber Security Simulation Rig</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span>Kapasitas: 35 Praktikan</span>
                  <span>•</span>
                  <span>Koneksi: Dedicated Fiber 1 Gbps</span>
                  <span>•</span>
                  <span>Gedung FT Lantai 2</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-md aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
                    alt="Laboratorium Jaringan Komputer UMPO"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06183d]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-bold text-[#6edbff]">Ruang Server & Jaringan</div>
                    <div className="text-sm font-semibold">Gedung FT Lt. 2 UMPO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lab 2: RPL & Komputasi Dasar */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-md aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                    alt="Laboratorium RPL UMPO"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06183d]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-bold text-[#6edbff]">40+ Workstation Komputasi Modern</div>
                    <div className="text-sm font-semibold">Gedung FT Lt. 2 UMPO</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-700 border border-teal-100">
                  <Laptop className="size-3.5" /> Laboratorium Unggulan 2
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                  Laboratorium Rekayasa Perangkat Lunak & Komputer
                </h2>
                <div className="mt-2 text-xs font-semibold text-slate-500">
                  Kepala Laboratorium: <span className="text-[#1453d6] font-bold">Ir. Moh. Bhanu Setyawan, S.T., M.Kom.</span>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Fasilitas komputasi berdaya tinggi untuk praktikum pemrograman, pengembangan software full-stack, mobile
                  apps, machine learning training model, dan riset komputasi data cerdas. Seluruh PC dilengkapi
                  spesifikasi Core i7, 16GB RAM, dan SSD berkecepatan tinggi.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>40 Workstations Intel Core i7</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>Machine Learning Dev Stack</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>Mobile Android/iOS Emulators</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>Smart Display Proyektor Interaktif</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span>Kapasitas: 40 Mahasiswa</span>
                  <span>•</span>
                  <span>Pendingin Ruangan (AC) Penuh</span>
                  <span>•</span>
                  <span>Gedung FT Lantai 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fasilitas Penunjang Kampus */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">Sarana Pendukung</div>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
            Fasilitas Pembelajaran & Ruang Kolaborasi
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl">
            Mendukung suasana belajar yang nyaman, kolaboratif, dan interaktif bagi mahasiswa dan dosen.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <Building2 className="size-5" />
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Smart Classroom</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ruang kuliah multimedia ber-AC dengan proyektor interaktif, sound system jernih, dan koneksi Wi-Fi
                eduroam untuk pembelajaran hybrid dan interaktif.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <BookOpen className="size-5" />
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Ruang Baca & Mini Library</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Koleksi buku teks ilmu komputer terbaru, jurnal ilmiah bereputasi, prosiding konferensi, serta repositori
                skripsi mahasiswa untuk referensi riset.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <Users className="size-5" />
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">Sekretariat HIMATIF</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ruang koordinasi Himpunan Mahasiswa Teknik Informatika UMPO untuk kegiatan organisasi, workshop coding,
                bootcamp, dan diskusi proyek lomba mahasiswa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
