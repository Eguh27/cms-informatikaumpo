import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Award,
  Network,
  Code2,
  ExternalLink,
  Users,
  Eye,
  BadgeCheck,
  Cpu,
  Sparkles,
  Calendar,
  Bookmark,
  ArrowUpRight,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch data in parallel
  const [lecturersRes, newsRes, tracksRes, partnersRes] = await Promise.all([
    payload.find({ collection: 'lecturers', depth: 1, limit: 4 }),
    payload.find({ collection: 'news', depth: 1, limit: 3, sort: '-publishedAt' }),
    payload.find({ collection: 'curriculum-tracks', depth: 1, limit: 10, sort: 'number' }),
    payload.find({ collection: 'partners', depth: 1, limit: 10 }),
  ])

  const LECTURERS = lecturersRes.docs
  const NEWS = newsRes.docs
  const CURRICULUM_TRACKS = tracksRes.docs
  const PARTNERS = partnersRes.docs

  return (
    <main>
      {/* ============================================================== */}
      {/* 2. HERO SECTION ASLI YANG DISUKAI USER ("BAGUSAN SEBELUMNYA")  */}
      {/* ============================================================== */}
      <section id="home" className="relative min-h-[96vh] overflow-hidden bg-[#07328d]">
        {/* Parallax full-bleed background */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "linear-gradient(100deg, rgba(3,27,81,.94) 8%, rgba(8,53,143,.76) 50%, rgba(3,29,89,.32) 100%), url('https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1800')",
            transform: 'translateY(0px) scale(1.1)',
          }}
        />
        <div className="absolute inset-0 hero-grid opacity-25" />
        <div className="absolute -right-32 -top-40 size-[36rem] rounded-full border border-white/15 pointer-events-none" />
        <div className="absolute -right-16 -top-24 size-[26rem] rounded-full border border-white/15 pointer-events-none" />

        {/* Hero text & headline */}
        <div className="relative mx-auto flex min-h-[96vh] max-w-7xl items-center px-5 pb-20 pt-32 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="font-display text-[clamp(3.2rem,8vw,7.8rem)] font-semibold leading-[.9] tracking-[-.055em] text-white">
              Code the future.
              <br />
              <span className="text-outline">Shape the world.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#d5e3ff] md:text-xl">
              Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo yang menghubungkan
              teknologi, kreativitas, dan dampak nyata untuk masa depan Indonesia berbasis
              nilai-nilai keislaman.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/akademik"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#0b43b0] shadow-[0_16px_36px_rgba(0,0,0,.18)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,.25)]"
              >
                Eksplorasi Kurikulum & Program
                <span className="grid size-8 place-items-center rounded-full bg-[#e7eeff] text-[#1453d6] transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </span>
              </Link>

              <Link
                href="/profil"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-1"
              >
                Profil & Visi Keilmuan
                <ChevronRight className="size-4 opacity-70 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom dock statistics */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto flex max-w-7xl items-end justify-between px-5 lg:px-8">
            <div className="relative z-10 hidden pb-8 text-xs font-semibold uppercase tracking-[.25em] text-white/60 md:block">
              Gulir untuk menjelajah
            </div>
            <div className="relative z-10 flex overflow-hidden rounded-t-[2rem] bg-[#0b3b9a]/65 text-white shadow-2xl backdrop-blur-xl">
              {[
                ['B', 'Akreditasi BAN-PT'],
                ['800+', 'Mahasiswa Aktif'],
                ['30+', 'Dosen & Tendik'],
                ['1.800+', 'Alumni'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="border-r border-white/15 px-5 py-5 last:border-0 sm:px-8"
                >
                  <div className="font-display text-2xl font-bold">{value}</div>
                  <div className="mt-1 text-[.65rem] text-white/65 sm:text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud divider */}
        <div className="cloud-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
            <path
              className="cloud-shadow"
              d="M0 116C102 73 174 104 246 117c79 14 115-55 208-43 75 9 91 62 167 46 71-15 111-81 213-54 56 15 67 70 148 58 98-15 108-79 210-60 79 14 101 62 178 39 29-9 52-17 70-18v95H0Z"
            />
            <path
              className="cloud-main"
              d="M0 134c93-1 117-53 204-49 80 4 111 68 202 43 74-20 94-67 177-64 92 3 111 81 211 55 77-20 93-67 179-58 76 8 94 69 189 56 84-11 132-64 278-35v98H0Z"
            />
          </svg>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. PROFIL & TENTANG KAMI DENGAN KONTEN RESMI TI.UMPO.AC.ID    */}
      {/* ============================================================== */}
      <section id="profil" className="relative overflow-hidden py-24 lg:py-36">
        <div className="orb absolute -left-32 top-32 size-80 rounded-full bg-[#d9e7ff] blur-3xl pointer-events-none" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-[0_32px_80px_rgba(14,58,146,.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ti.umpo.ac.id/wp-content/uploads/2026/09/gedung-ti-1024x820.webp"
                alt="Gedung Fakultas Teknik dan Program Studi Teknik Informatika UMPO"
                className="aspect-[4/3.2] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 max-w-72 rounded-3xl border border-white/50 bg-white/90 p-5 shadow-2xl backdrop-blur-xl md:right-8">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-[#1453d6] text-white">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#08235b]">Gelar Kelulusan</div>
                  <div className="font-display text-base font-extrabold text-[#2f6dff]">
                    S.Kom. (Sarjana Komputer)
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#59709b]">
                &ldquo;Membangun talenta digital berkarakter Islami untuk masa depan yang lebih
                baik.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:pl-10">
            <div className="section-label">Profil Program Studi</div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-.04em] text-[#09275e] md:text-6xl">
              Teknik Informatika UMPO
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#59709b]">
              Program studi Teknik Informatika merupakan salah satu prodi jenjang S1 unggulan di
              kalangan Universitas Muhammadiyah Ponorogo yang berdiri pada tahun 2005 dengan izin
              penyelenggaraan berdasarkan{' '}
              <strong className="text-[#09275e]">SK Ditjen DIKTI No. 378/D/T/2005</strong>. Telah
              terakreditasi BAN-PT{' '}
              <strong className="text-[#09275e]">No. 0206/SKB/BAN-PT/Akred/S/I/2017</strong> dengan
              Peringkat B.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 rounded-full bg-[#1453d6] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#0f44b3]"
              >
                <BookOpen className="size-4" /> Baca Sejarah Prodi
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3.5 text-sm font-bold text-[#1453d6] transition hover:-translate-y-0.5 hover:border-[#1453d6]"
              >
                <Award className="size-4" /> Visi, Misi & Roadmap
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-5">
              <div className="rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(22,62,135,.08)]">
                <div className="font-display text-4xl font-bold text-[#1453d6]">2</div>
                <div className="mt-2 text-sm font-semibold">Laboratorium Terpadu</div>
              </div>
              <div className="rounded-3xl bg-[#1453d6] p-6 text-white shadow-[0_16px_40px_rgba(20,83,214,.22)]">
                <div className="font-display text-4xl font-bold">1:18</div>
                <div className="mt-2 text-sm font-medium text-white/75">
                  Rasio Dosen dan Mahasiswa
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. KURIKULUM & ROADMAP KEILMUAN                                 */}
      {/* ============================================================== */}
      <section id="kurikulum" className="bg-[#061d4e] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="section-label section-label-light">Kurikulum Masa Depan</div>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-[-.04em] md:text-6xl">
                Pilih fokusmu. Ciptakan terobosanmu.
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-[#9eb5df]">
              Tiga rumpun kompetensi keilmuan yang dirancang bersama industri agar kompetensimu
              selalu relevan.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {CURRICULUM_TRACKS.map((program) => {
              const IconComp =
                (program.icon && (LucideIcons as any)[program.icon]) || LucideIcons.Cpu
              return (
                <article
                  key={program.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.06] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#5590ff]/60 hover:bg-[#1047ad] md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-[#82aeff] transition group-hover:bg-white group-hover:text-[#1453d6]">
                      <IconComp className="size-7" />
                    </span>
                    <span className="font-display text-sm text-white/30">{program.number}</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-semibold">{program.title}</h3>
                  <p className="mt-4 leading-relaxed text-[#aebfe1] transition group-hover:text-white/75">
                    {program.copy}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {program.tags?.map((tagObj, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70"
                      >
                        {tagObj.tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-4 text-xs font-semibold text-[#8ab3ff]">
                    Prospek: {program.prospects}
                  </div>
                </article>
              )
            })}
          </div>

          {/* Direct Google Drive link from ti.umpo.ac.id */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:flex-row sm:px-8">
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-2xl bg-white/10 text-[#6edbff]">
                <BookOpen className="size-6" />
              </div>
              <div>
                <div className="font-bold text-white">Struktur Kurikulum & Silabus Mata Kuliah</div>
                <div className="text-xs text-[#9eb5df]">
                  Unduh dokumen kurikulum lengkap berformat PDF dari Google Drive resmi
                </div>
              </div>
            </div>
            <a
              href="https://drive.google.com/file/d/1MBJ4e8JyA6YZPJl39maTZMhMiZ1B58SN/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#061d4e] transition hover:bg-[#6edbff]"
            >
              Unduh Kurikulum (Drive) <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. DOSEN & PENELITI (21 DOSEN ASLI TI UMPO)                    */}
      {/* ============================================================== */}
      <section id="dosen" className="relative overflow-hidden bg-slate-50/50 py-24 lg:py-32">
        {/* Ambient Lighting & Glow */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-1/3 size-96 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="section-label">Tenaga Pendidik & Peneliti</div>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-.04em] text-[#09275e] md:text-5xl lg:text-6xl">
                Dosen & Pakar Teknologi Berdedikasi.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm md:text-base leading-relaxed text-[#64789c]">
                21 akademisi & praktisi S2/S3 Fakultas Teknik UMPO yang aktif membimbing, meneliti,
                dan membawa teknologi industri mutakhir langsung ke ruang kelas.
              </p>
              {/* Micro stats */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-slate-200 shadow-xs">
                  <Award className="size-3.5 text-amber-500" /> 21 Dosen Tetap
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-slate-200 shadow-xs">
                  <BadgeCheck className="size-3.5 text-emerald-500" /> 100% Ber-NIDN
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-slate-200 shadow-xs">
                  <Cpu className="size-3.5 text-blue-500" /> Riset AI, RPL & IoT
                </span>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {LECTURERS.map((lecturer) => {
              const imageUrl =
                typeof lecturer.image === 'object' && lecturer.image?.url
                  ? lecturer.image.url
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'

              return (
                <article
                  key={lecturer.name}
                  className="glass-card group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_10px_30px_-5px_rgba(9,45,116,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2.5 hover:border-[#1453d6]/40 hover:bg-white/95 hover:shadow-[0_24px_50px_-10px_rgba(20,83,214,0.2)]"
                >
                  {/* Portrait Frame */}
                  <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-white/90">
                    <div className="absolute inset-0 lecturer-avatar-backdrop opacity-70" />
                    <div className="absolute inset-0 lecturer-dot-pattern opacity-40" />
                    {/* Floating Category Badge with Glass Effect */}
                    <div className="absolute left-3.5 top-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-bold text-white shadow-md shadow-amber-500/20 backdrop-blur-md border border-amber-300/40 capitalize">
                        <Award className="size-3.5" /> {lecturer.category}
                      </span>
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={lecturer.name}
                      className="size-full object-cover object-top transition duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
                  </div>
                  {/* Content Area */}
                  <div className="flex flex-1 flex-col justify-between p-5 pt-3">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#1453d6]">
                        {lecturer.role}
                      </div>
                      <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-[#08235b] transition-colors group-hover:text-[#1453d6] line-clamp-2">
                        {lecturer.name}
                      </h3>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dosen"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1453d6] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#0e3ea6]"
            >
              Buka Direktori Lengkap 21 Dosen TI UMPO
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. KEHIDUPAN MAHASISWA & HIMATIF UMPO (PARALLAX BANNER ASLI)   */}
      {/* ============================================================== */}
      <section
        id="himatif"
        className="relative min-h-[38rem] overflow-hidden bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(4,28,82,.9),rgba(8,53,143,.32)),url('https://images.unsplash.com/photo-1663162551013-8bb8ab151e11?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1800')",
        }}
      >
        <div className="absolute inset-0 parallax-lines opacity-30" />
        <div className="relative mx-auto flex min-h-[38rem] max-w-7xl items-center px-5 lg:px-8">
          <div className="max-w-2xl text-white">
            <div className="section-label section-label-light">Kehidupan Mahasiswa & HIMATIF</div>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-[-.045em] md:text-7xl">
              Eksperimen. Kolaborasi. Bertumbuh.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#d3e1ff]">
              Dari Himpunan Mahasiswa Teknik Informatika (HIMATIF), coding bootcamp, hackathon,
              kompetisi nasional, hingga riset pengabdian masyarakat, pengalaman belajarmu jauh
              melampaui ruang kelas.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://instagram.com/informatika.umpo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-bold text-[#134dbf] shadow-lg transition hover:-translate-y-1 hover:bg-[#e7eeff]"
              >
                Lihat Instagram @informatika.umpo <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. FASILITAS LABORATORIUM                                      */}
      {/* ============================================================== */}
      <section id="fasilitas" className="bg-[#f0f4fc] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <div className="section-label">Sarana & Prasarana</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.04em] text-[#09275e] md:text-5xl">
              Laboratorium Komputer Terpadu
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#59709b]">
              Infrastruktur praktikum modern untuk menunjang riset rekayasa perangkat lunak,
              kecerdasan buatan, dan jaringan komputer.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_16px_40px_rgba(22,62,135,.06)]">
              <div className="grid size-14 place-items-center rounded-2xl bg-[#eaf0fc] text-[#1453d6]">
                <Network className="size-7" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#09275e]">
                Lab Jaringan & IoT
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#59709b]">
                Pusat simulasi jaringan enterprise, perangkat router/switch Cisco & Mikrotik, IoT
                kit, dan cyber security.
              </p>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-[#1453d6]">
                Ka. Lab: Angga Prasetyo, S.T., M.Kom.
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_16px_40px_rgba(22,62,135,.06)]">
              <div className="grid size-14 place-items-center rounded-2xl bg-[#eaf0fc] text-[#1453d6]">
                <Code2 className="size-7" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#09275e]">
                Lab Rekayasa Perangkat Lunak
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#59709b]">
                Fasilitas komputasi untuk pengembangan web, mobile apps, database architecture, dan
                sistem informasi enterprise.
              </p>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-[#1453d6]">
                Ka. Lab: Ir. Moh. Bhanu Setyawan, S.T., M.Kom.
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-[0_16px_40px_rgba(22,62,135,.06)]">
              <div className="grid size-14 place-items-center rounded-2xl bg-[#eaf0fc] text-[#1453d6]">
                <BookOpen className="size-7" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#09275e]">
                Perpustakaan Pusat UMPO
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#59709b]">
                Akses ribuan literatur buku TIK, jurnal internasional bereputasi (IEEE,
                ScienceDirect), e-library, dan ruang kolaborasi.
              </p>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <a
                  href="https://library.umpo.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1453d6] hover:underline"
                >
                  Buka Perpustakaan UMPO <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. MITRA RESMI KAMPUS                                          */}
      {/* ============================================================== */}
      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">
              Our Strategic Partners
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-[#09275e]">
              Kemitraan Industri & Teknologi Global
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PARTNERS.map((partner) => {
              // Optional: rendering logo if it exists in payload
              // const logoUrl = typeof partner.logo === 'object' && partner.logo?.url ? partner.logo.url : null;

              return (
                <div
                  key={partner.name}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:-translate-y-1 hover:border-[#1453d6] hover:bg-white hover:shadow-md"
                >
                  <div className="font-display text-base font-bold text-[#09275e]">
                    {partner.name}
                  </div>
                  <div className="mt-1 text-[11px] text-[#59709b]">{partner.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. BERITA TERBARU (KONTEN ASLI TI.UMPO.AC.ID)                  */}
      {/* ============================================================== */}
      <section id="berita" className="py-24 lg:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="section-label">Cerita & Pengumuman</div>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-.04em] text-[#09275e] md:text-6xl">
                Yang sedang terjadi.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item) => {
              const imageUrl =
                typeof item.image === 'object' && item.image?.url ? item.image.url : null

              // Format date from item.publishedAt (e.g. 2026-09-12T00:00:00.000Z to DD MMM YYYY)
              const dateStr = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : ''

              return (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div>
                    {imageUrl ? (
                      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1453d6] backdrop-blur">
                          {item.category}
                        </span>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/6] items-center justify-between rounded-2xl bg-[#09275e] p-6 text-white">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                          {item.category}
                        </span>
                        <Bookmark className="size-5 text-white/50" />
                      </div>
                    )}

                    <div className="pt-5">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#7386a8]">
                        <Calendar className="size-3.5" />
                        <span>{dateStr}</span>
                        <span>•</span>
                        <span>{item.readTime || 3} min read</span>
                      </div>
                      <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-[#0b2b66] transition group-hover:text-[#2f6dff] line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#64789c] line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <Link
                      href={`/berita/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1453d6] hover:text-[#2f6dff]"
                    >
                      Baca Selengkapnya <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Lihat Semua Berita <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. PENDAFTARAN MAHASISWA BARU (BANNER ASLI)                   */}
      {/* ============================================================== */}
      <section id="admissions" className="px-5 pb-10 lg:px-8 bg-slate-50">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#1453d6] px-6 py-16 text-center text-white md:px-16 md:py-24">
          <div className="absolute -left-20 -top-20 size-72 rounded-full border-[3rem] border-white/5 pointer-events-none" />
          <div className="absolute -bottom-36 -right-20 size-96 rounded-full border-[4rem] border-white/5 pointer-events-none" />
          <div className="relative">
            <Sparkles className="mx-auto size-10 text-[#9fc0ff]" />
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-.045em] md:text-6xl">
              Siap menjadi bagian dari Teknik Informatika UMPO?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#c9dcff]">
              Mulai perjalananmu bersama Informatika UMPO dan ciptakan inovasi teknologi yang
              bermakna bagi bangsa dan umat.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://spmb.umpo.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-4 font-bold text-[#124bb8] shadow-xl transition hover:-translate-y-1"
              >
                Daftar Sekarang (spmb.umpo.ac.id)
              </a>
              <Link
                href="/download"
                className="inline-flex justify-center items-center rounded-full border border-white/30 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Unduh Panduan & Template
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
