import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Bookmark,
  Calendar,
  Code2,
  Cpu,
  ExternalLink,
  GraduationCap,
  Network,
} from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ParallaxEffects } from '@/components/parallax/ParallaxEffects'
import { ParallaxHero } from '@/components/parallax/ParallaxHero'
import { SectionTag, WaveDivider } from '@/components/parallax/ParallaxBits'
import { LecturerAvatar } from '@/components/LecturerAvatar'
import { SITE_LINKS, SITE_MEDIA, resolveMediaUrl } from '@/data/siteMedia'
import { getSiteMedia } from '@/utilities/getSiteMedia'

const FALLBACK_TRACKS = [
  {
    number: '01',
    title: 'Kecerdasan Buatan & Sistem Cerdas',
    copy: 'Algoritma komputasi mutakhir untuk otomasi industri: computer vision, machine learning, IoT, dan deep learning.',
    tags: ['Computer Vision', 'Machine Learning', 'IoT', 'Deep Learning'],
    prospects: 'AI Engineer, Data Scientist, IoT Architect',
    icon: 'Cpu',
  },
  {
    number: '02',
    title: 'Rekayasa Perangkat Lunak & Data',
    copy: 'Arsitektur sistem informasi modern: web & cloud, mobile apps, database systems, dan DevOps berskala besar.',
    tags: ['Web & Cloud', 'Mobile Development', 'Database', 'DevOps'],
    prospects: 'Software Engineer, Fullstack Developer, DBA',
    icon: 'Code2',
  },
  {
    number: '03',
    title: 'Infrastruktur Jaringan & Keamanan Siber',
    copy: 'Keamanan siber dan jaringan enterprise: Cisco routing, cyber security, cloud computing, dan ethical hacking.',
    tags: ['Cisco & Mikrotik', 'Cyber Security', 'Cloud', 'Ethical Hacking'],
    prospects: 'Network Engineer, SOC Analyst, Cloud Specialist',
    icon: 'Network',
  },
]

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const siteMedia = await getSiteMedia()

  const [lecturersRes, newsRes, tracksRes, partnersRes] = await Promise.all([
    payload.find({ collection: 'lecturers', depth: 1, limit: 4 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'news', depth: 1, limit: 3, sort: '-publishedAt' }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'curriculum-tracks', depth: 1, limit: 10, sort: 'number' }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'partners', depth: 1, limit: 10 }).catch(() => ({ docs: [] })),
  ])

  const lecturers = (lecturersRes as { docs: any[] }).docs ?? []
  const news = (newsRes as { docs: any[] }).docs ?? []
  const dbTracks = (tracksRes as { docs: any[] }).docs ?? []
  const partners = (partnersRes as { docs: any[] }).docs ?? []

  const tracks =
    dbTracks.length > 0
      ? dbTracks.map((t: any, i: number) => ({
          number: t.number ?? `0${i + 1}`,
          title: t.title,
          copy: t.copy,
          tags: Array.isArray(t.tags) ? t.tags.map((x: any) => x?.tag).filter(Boolean) : [],
          prospects: t.prospects ?? '',
          icon: t.icon ?? 'Cpu',
        }))
      : FALLBACK_TRACKS

  return (
    <main className="px-canvas" id="konten-utama">
      <ParallaxEffects />
      <div className="px-progress" aria-hidden="true">
        <div className="px-progress-bar" data-scroll-progress />
      </div>
      <ParallaxHero images={{ building: siteMedia.heroBuilding, cloud: siteMedia.heroCloud }} />

      {/* ============ PROFIL ============ */}
      <section id="profil" aria-labelledby="profil-title" data-story-section className="px-depth py-24 lg:py-32">
        <div
          className="px-depth-orb -left-32 top-32 size-80 bg-[#FFE8CC]/40"
          data-parallax-layer
          data-speed="-0.05"
          aria-hidden="true"
        />
        <div
          className="px-depth-orb right-0 top-1/2 size-96 bg-[#EAF4FF]/60"
          data-parallax-layer
          data-speed="0.07"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div data-reveal-item className="relative">
            <div
              data-parallax-section
              className="relative overflow-hidden rounded-[2.5rem] border border-[#1E6FD9]/15 bg-white p-2 shadow-[0_20px_60px_-15px_rgba(15,42,74,0.12)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteMedia.heroBuilding}
                alt="Gedung Fakultas Teknik dan Program Studi Teknik Informatika UMPO"
                className="aspect-[4/3.2] w-full rounded-[2rem] object-cover object-center"
                data-parallax-layer
                data-speed="-0.06"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 right-2 max-w-72 rounded-3xl border border-white/80 bg-white/95 p-5 shadow-[0_16px_36px_rgba(11,58,140,0.12)] backdrop-blur-xl md:right-6">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-[#1E6FD9] text-white">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#4B6B94]">Gelar Kelulusan</div>
                  <div className="font-display text-base font-extrabold text-[#0B3A8C]">S.Kom. (Sarjana Komputer)</div>
                </div>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#4B6B94]">
                &ldquo;Membangun talenta digital berkarakter Islami untuk masa depan yang lebih baik.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:pl-8">
            <div data-reveal-item>
              <SectionTag>Profil Program Studi</SectionTag>
            </div>
            <h2 id="profil-title" data-split-reveal className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-[-.04em] text-[#0B3A8C] md:text-5xl lg:text-6xl">
              Teknik Informatika UMPO
            </h2>
            <p data-reveal-item className="mt-6 text-base leading-relaxed text-[#4B6B94] md:text-lg">
              Program studi Teknik Informatika merupakan salah satu prodi jenjang S1 unggulan
              Universitas Muhammadiyah Ponorogo yang berdiri tahun 2005 dengan izin{' '}
              <strong className="text-[#0B3A8C]">SK Ditjen DIKTI No. 378/D/T/2005</strong>. Telah
              terakreditasi BAN-PT <strong className="text-[#0B3A8C]">Peringkat B</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E6FD9] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-[#0B3A8C]"
              >
                <BookOpen className="size-4" aria-hidden="true" /> Baca Sejarah Prodi
              </Link>
              <Link
                href="/profil#visimisi"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#1E6FD9]/30 bg-[#FFFBF5] px-7 py-3.5 text-sm font-bold text-[#0B3A8C] transition-all hover:-translate-y-0.5 hover:border-[#1E6FD9] hover:bg-[#EAF4FF]"
              >
                <Award className="size-4 text-[#FFB84D]" aria-hidden="true" /> Visi, Misi &amp; Roadmap
              </Link>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-5">
              <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_12px_32px_rgba(15,42,74,0.08)] backdrop-blur-xl">
                <div className="font-display text-4xl font-extrabold text-[#1E6FD9]">2</div>
                <div className="mt-2 text-sm font-bold text-[#0F2A4A]">Laboratorium Terpadu</div>
                <div className="mt-0.5 text-xs text-[#4B6B94]">Lab Jaringan IoT &amp; Lab RPL</div>
              </div>
              <div className="rounded-3xl border border-white/20 bg-[#1E6FD9]/85 p-6 text-white shadow-[0_16px_36px_rgba(30,111,217,0.25)] backdrop-blur-xl">
                <div className="font-display text-4xl font-extrabold text-[#FFE8CC]">1:18</div>
                <div className="mt-2 text-sm font-bold">Rasio Dosen &amp; Mahasiswa</div>
                <div className="mt-0.5 text-xs text-white/80">Pendampingan intensif &amp; fokus</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <WaveDivider fill="#EAF4FF" />
        </div>
      </section>

      {/* ============ KURIKULUM — 3-column grid ============ */}
      <section id="kurikulum" aria-labelledby="kurikulum-title" data-story-section className="px-depth bg-[#EAF4FF]/70 py-20 lg:py-28">
        <div
          className="px-depth-orb -right-24 top-16 size-96 bg-[#FFB84D]/25"
          data-parallax-layer
          data-speed="0.06"
          aria-hidden="true"
        />
        <div
          className="px-depth-orb -left-28 bottom-8 size-80 bg-[#1E6FD9]/20"
          data-parallax-layer
          data-speed="-0.05"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div data-reveal-item>
                <SectionTag>Kurikulum Masa Depan</SectionTag>
              </div>
              <h2 id="kurikulum-title" data-split-reveal className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-[-.04em] text-[#0B3A8C] md:text-5xl lg:text-6xl">
                Pilih fokusmu. Ciptakan terobosanmu.
              </h2>
            </div>
            <p data-reveal-item className="max-w-md text-base leading-relaxed text-[#4B6B94]">
              Tiga rumpun kompetensi keilmuan yang dirancang bersama industri, ditampilkan berdampingan sehingga mudah dibandingkan.
            </p>
          </div>

          <div data-reveal-item className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
            {tracks.slice(0, 3).map((program: any) => {
              return (
                <article
                  key={program.title}
                  aria-label={program.title}
                  className="px-card group relative flex flex-col overflow-hidden p-7 md:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1E6FD9] via-[#2563EB] to-[#FFB84D]" aria-hidden="true" />
                  <span className="font-mono text-5xl font-bold tracking-tight text-[#1E6FD9]/25">{program.number}</span>
                  <h3 className="mt-4 font-display text-3xl font-bold text-[#0B3A8C] md:text-4xl">
                    {program.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#4B6B94] md:text-lg">{program.copy}</p>
                  {!!program.tags?.length && (
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                      {program.tags.map((tag: string) => (
                        <span key={tag} className="text-xs font-semibold text-[#4B6B94]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="min-h-6 flex-1" aria-hidden="true" />
                  {!!program.prospects && (
                    <p className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm font-bold text-[#1E6FD9]">
                      <span>Prospek: {program.prospects}</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </p>
                  )}
                </article>
              )
            })}
          </div>

          <div data-reveal-item className="mt-10">
            <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#1E6FD9]/20 bg-white p-6 shadow-[0_12px_32px_rgba(15,42,74,0.06)] sm:flex-row sm:px-8">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#FFE8CC]">
                  <BookOpen className="size-6 text-[#B45309]" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-bold text-[#0B3A8C]">Struktur Kurikulum &amp; Silabus Mata Kuliah</div>
                  <div className="text-xs text-[#4B6B94]">Unduh dokumen kurikulum lengkap dari Google Drive resmi prodi</div>
                </div>
              </div>
              <a
                href={SITE_LINKS.curriculumDrive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E6FD9] px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#0B3A8C]"
              >
                Unduh Kurikulum (Drive) <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOSEN ============ */}
      <section id="dosen" aria-labelledby="dosen-title" data-story-section className="px-depth bg-[#FFFBF5] py-24 lg:py-32">
        <div
          className="px-depth-orb left-1/2 top-0 size-[36rem] -translate-x-1/2 -translate-y-1/2 bg-blue-100/50"
          data-parallax-layer
          data-speed="-0.06"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div data-reveal-item>
                <SectionTag>Tenaga Pendidik &amp; Peneliti</SectionTag>
              </div>
              <h2 id="dosen-title" data-split-reveal className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-[-.04em] text-[#0B3A8C] md:text-5xl lg:text-6xl">
                Dosen &amp; pakar teknologi berdedikasi.
              </h2>
            </div>
            <div data-reveal-item className="max-w-md">
              <p className="text-sm leading-relaxed text-[#4B6B94] md:text-base">
                Akademisi &amp; praktisi Fakultas Teknik UMPO yang aktif membimbing, meneliti, dan
                membawa teknologi industri ke ruang kelas.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#4B6B94]">
                <span className="inline-flex items-center gap-1.5"><Award className="size-3.5 text-[#FFB84D]" aria-hidden="true" /> Dosen Tetap</span>
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="size-3.5 text-emerald-600" aria-hidden="true" /> Ber-NIDN</span>
                <span className="inline-flex items-center gap-1.5"><Cpu className="size-3.5 text-[#1E6FD9]" aria-hidden="true" /> Riset AI, RPL &amp; IoT</span>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lecturers.length === 0 && (
              <p data-reveal-item className="rounded-3xl border border-dashed border-[#1E6FD9]/30 bg-white/60 p-8 text-sm text-[#4B6B94] sm:col-span-2 lg:col-span-4">
                Data dosen dimuat dari CMS Payload. Tambahkan data di panel admin untuk menampilkan
                direktori di sini. <Link href="/dosen" className="font-bold text-[#1E6FD9] hover:underline">Buka halaman Dosen</Link>
              </p>
            )}
            {lecturers.map((lecturer: any) => {
              const imageUrl = resolveMediaUrl(lecturer.image, '')
              const hasPhoto = imageUrl.length > 0
              return (
                <article
                  key={lecturer.id ?? lecturer.name}
                  data-reveal-item
                  className="px-card group relative flex flex-col overflow-hidden"
                >
                  <div
                    className="px-media relative aspect-[4/4.3] w-full overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-white/90"
                    data-parallax-media
                  >
                    <div className="absolute left-3.5 top-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-[#B45309] px-3 py-1 text-[11px] font-bold capitalize text-white shadow-md backdrop-blur-md">
                        <Award className="size-3.5" aria-hidden="true" /> {lecturer.category}
                      </span>
                    </div>
                    {hasPhoto ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={imageUrl}
                        alt={lecturer.name}
                        loading="lazy"
                        data-parallax-media-img
                        className="px-media-img object-top transition-[scale] duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <LecturerAvatar
                        name={lecturer.name}
                        className="aspect-[4/4.3] size-full text-5xl transition duration-500 ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 via-white/50 to-transparent" aria-hidden="true" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5 pt-3">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#1E6FD9]">{lecturer.role}</div>
                      <h3 className="mt-1 line-clamp-2 font-display text-[15px] font-bold leading-snug text-[#08235b] transition-colors group-hover:text-[#1E6FD9]">
                        {lecturer.name}
                      </h3>
                      {!!lecturer.focus && <p className="mt-1 line-clamp-2 text-xs text-[#4B6B94]">{lecturer.focus}</p>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div data-reveal-item className="mt-12 flex justify-center">
            <Link
              href="/dosen"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1E6FD9] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0B3A8C]"
            >
              Buka Direktori Dosen TI UMPO
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HIMATIF — parallax banner ============ */}
      <section
        id="himatif"
        aria-labelledby="himatif-title"
        data-story-section
        data-parallax-section
        className="px-banner"
      >
        <div
          className="px-banner-bg"
          data-parallax-layer
          data-speed="-0.18"
          style={{
            backgroundImage: 'url(' + siteMedia.himatifBanner + ')',
          }}
          aria-hidden="true"
        />
        <div className="px-banner-lines" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div data-reveal-item className="max-w-2xl text-white">
            <SectionTag intent="light">Kehidupan Mahasiswa &amp; HIMATIF</SectionTag>
            <h2 id="himatif-title" data-split-reveal className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-[-.045em] md:text-7xl">
              Eksperimen. Kolaborasi. Bertumbuh.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#d3e1ff]">
              Dari HIMATIF, coding bootcamp, hackathon, kompetisi nasional, hingga riset
              pengabdian masyarakat — pengalaman belajarmu jauh melampaui ruang kelas.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="https://instagram.com/informatika.umpo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-bold text-[#134dbf] shadow-lg transition hover:-translate-y-1 hover:bg-[#e7eeff]"
              >
                Lihat Instagram @informatika.umpo <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FASILITAS ============ */}
      <section id="fasilitas" aria-labelledby="fasilitas-title" data-story-section className="px-depth bg-[#f0f4fc] py-24 lg:py-32">
        <div
          className="px-depth-orb -right-32 top-24 size-[28rem] bg-[#1E6FD9]/18"
          data-parallax-layer
          data-speed="-0.06"
          aria-hidden="true"
        />
        <div
          className="px-depth-orb -left-24 bottom-16 size-72 bg-[#FFB84D]/22"
          data-parallax-layer
          data-speed="0.05"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div data-reveal-item className="text-center">
            <div className="flex justify-center"><SectionTag>Sarana &amp; Prasarana</SectionTag></div>
            <h2 id="fasilitas-title" data-split-reveal className="mt-4 font-display text-4xl font-extrabold tracking-[-.04em] text-[#0B3A8C] md:text-5xl">
              Laboratorium Komputer Terpadu
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#4B6B94]">
              Infrastruktur praktikum modern untuk riset rekayasa perangkat lunak, kecerdasan
              buatan, dan jaringan komputer.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Network, title: 'Lab Jaringan & IoT', desc: 'Simulasi jaringan enterprise, router/switch Cisco & Mikrotik, IoT kit, dan cyber security.', foot: 'Ka. Lab: Angga Prasetyo, S.T., M.Kom.' },
              { icon: Code2, title: 'Lab Rekayasa Perangkat Lunak', desc: 'Pengembangan web, mobile apps, database architecture, dan sistem informasi enterprise.', foot: 'Ka. Lab: Ir. Moh. Bhanu Setyawan, S.T., M.Kom.' },
              { icon: BookOpen, title: 'Perpustakaan Pusat UMPO', desc: 'Ribuan literatur TIK, jurnal internasional (IEEE, ScienceDirect), e-library, dan ruang kolaborasi.', foot: 'library.umpo.ac.id', link: 'https://library.umpo.ac.id/' },
            ].map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} data-reveal-item className="px-card p-7">
                  <div className="grid size-14 place-items-center rounded-2xl bg-[#eaf0fc] text-[#1E6FD9]">
                    <Icon className="size-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-[#0B3A8C]">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B6B94]">{f.desc}</p>
                  <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-[#1E6FD9]">
                    {f.link ? (
                      <a href={f.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                        Buka Perpustakaan UMPO <ExternalLink className="size-3" aria-hidden="true" />
                      </a>
                    ) : (
                      f.foot
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ MITRA ============ */}
      <section aria-labelledby="mitra-title" data-story-section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div data-reveal-item className="text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E6FD9]">Our Strategic Partners</div>
            <h2 id="mitra-title" className="mt-2 font-display text-2xl font-bold text-[#0B3A8C]">
              Kemitraan Industri &amp; Teknologi Global
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.length === 0 &&
              ['Oracle Academy', 'Cisco Academy', 'Microsoft Education', 'PAKO Group', 'Kemdiktisaintek'].map((name) => (
                <div key={name} data-reveal-item className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <div className="font-display text-base font-bold text-[#0B3A8C]">{name}</div>
                  <div className="mt-1 text-[11px] text-[#4B6B94]">Mitra strategis prodi</div>
                </div>
              ))}
            {partners.map((partner: any) => (
              <div
                key={partner.id ?? partner.name}
                data-reveal-item
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:-translate-y-1 hover:border-[#1E6FD9] hover:bg-white hover:shadow-md"
              >
                <div className="font-display text-base font-bold text-[#0B3A8C]">{partner.name}</div>
                <div className="mt-1 text-[11px] text-[#4B6B94]">{partner.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BERITA ============ */}
      <section id="berita" aria-labelledby="berita-title" data-story-section className="px-depth bg-[#FFFBF5] py-24 lg:py-32">
        <div
          className="px-depth-orb -left-32 top-20 size-96 bg-[#EAF4FF]"
          data-parallax-layer
          data-speed="0.05"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div data-reveal-item>
            <SectionTag>Cerita &amp; Pengumuman</SectionTag>
            <h2 id="berita-title" data-split-reveal className="mt-5 font-display text-4xl font-extrabold tracking-[-.04em] text-[#0B3A8C] md:text-6xl">
              Yang sedang terjadi.
            </h2>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {news.length === 0 && (
              <p data-reveal-item className="rounded-3xl border border-dashed border-[#1E6FD9]/30 bg-white p-8 text-sm text-[#4B6B94] md:col-span-2 lg:col-span-3">
                Belum ada berita dari CMS. Tambahkan konten di koleksi News panel admin. <Link href="/berita" className="font-bold text-[#1E6FD9] hover:underline">Buka arsip Berita</Link>
              </p>
            )}
            {news.map((item: any) => {
              const imageUrl = resolveMediaUrl(item.image, '')
              const dateStr = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                : ''
              return (
                <article
                  key={item.id ?? item.slug}
                  data-reveal-item
                  className="px-card group flex flex-col justify-between p-5"
                >
                  <div>
                    {imageUrl ? (
                      <div
                          className="px-media relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100"
                          data-parallax-media
                        >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt={item.title}
                          loading="lazy"
                          data-parallax-media-img
                          className="px-media-img transition-[scale] duration-700 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1E6FD9]">
                          {item.category}
                        </span>
                      </div>
                    ) : (
                      <div className="flex aspect-[16/6] items-center justify-between rounded-2xl bg-[#0B3A8C] p-6 text-white">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{item.category}</span>
                        <Bookmark className="size-5 text-white/50" aria-hidden="true" />
                      </div>
                    )}
                    <div className="pt-5">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#4B6B94]">
                        <Calendar className="size-3.5" aria-hidden="true" />
                        <span>{dateStr}</span>
                        <span aria-hidden="true">•</span>
                        <span>{item.readTime || 3} min read</span>
                      </div>
                      <h3 className="mt-2.5 line-clamp-2 font-display text-lg font-semibold leading-snug text-[#0b2b66] transition group-hover:text-[#1E6FD9]">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#4B6B94]">{item.excerpt}</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <Link
                      href={`/berita/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6FD9] hover:text-[#0B3A8C]"
                    >
                      Baca Selengkapnya <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          <div data-reveal-item className="mt-12 text-center">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Lihat Semua Berita <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PMB CTA ============ */}
      <section id="admissions" aria-labelledby="pmb-title" data-story-section className="bg-[#FFFBF5] px-5 pb-10 lg:px-8">
        <div
          data-reveal-item
          data-footer-parallax
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1E6FD9] to-[#0B3A8C] px-6 py-16 text-center text-white md:px-16 md:py-24"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full border-[3rem] border-white/5" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-36 -right-20 size-96 rounded-full border-[4rem] border-white/5" aria-hidden="true" />
          <div className="relative">
            <h2 id="pmb-title" className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-[-.045em] md:text-6xl">
              Siap menjadi bagian dari Teknik Informatika UMPO?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#c9dcff]">
              Mulai perjalananmu dan ciptakan inovasi teknologi yang bermakna bagi bangsa dan umat.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={SITE_LINKS.pmb}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-4 font-bold text-[#124bb8] shadow-xl transition hover:-translate-y-1"
              >
                Daftar Sekarang (spmb.umpo.ac.id)
              </a>
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Unduh Panduan &amp; Template
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
