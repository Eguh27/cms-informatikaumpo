import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageBanner } from '@/components/PageBanner'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { resolveMediaUrl } from '@/data/siteMedia'
import { Briefcase, Download, ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pendaftaran Magang | TI UMPO',
  description:
    'Alur, syarat, dan berkas pendaftaran magang / Kerja Praktik mahasiswa Teknik Informatika UMPO.',
}

async function getMagangPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: 'pendaftaran-magang',
      },
    },
  })
  return result.docs?.[0] ?? null
}

async function getMagangDocs() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'downloads',
    limit: 20,
    sort: '-updatedAt',
    depth: 1,
    where: {
      category: {
        equals: 'Magang',
      },
    },
  })
  return result.docs ?? []
}

/**
 * Pendaftaran magang. Fully CMS-driven when an admin publishes a Page with
 * slug `pendaftaran-magang` (Hero + Content/Form blocks render as-is,
 * so the future dedicated form needs zero code changes). Until then, a
 * static explainer plus the Magang document shelf from the CMS.
 */
export default async function MagangPage() {
  const [cmsPage, docs] = await Promise.all([getMagangPage(), getMagangDocs()])

  if (cmsPage) {
    return (
      <article className="min-h-screen bg-[#FFFBF5] pb-28 pt-16" id="konten-utama">
        <RenderHero {...cmsPage.hero} />
        <RenderBlocks blocks={cmsPage.layout} />
      </article>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      <PageBanner
        category="Pendaftaran Layanan Akademik"
        title="Pendaftaran Magang"
        subtitle="Kerja Praktik di perusahaan mitra: syarat, alur pengajuan, dan berkas yang wajib disiapkan."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Pendaftaran Magang' },
        ]}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 mt-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-[#1453d6]">
              <Briefcase className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-[#08235b]">
                Magang untuk semester 6–7
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Mahasiswa yang sudah lulus 100 SKS dapat mengajukan Kerja Praktik ke
                perusahaan mitra prodi. Proposal diajukan ke koordinator magang,
                disetujui dosen wali, baru diterbitkan surat pengantar resmi.
              </p>
            </div>
          </div>

          <ol className="mt-8 space-y-0">
            {[
              ['1', 'Siapkan proposal', 'Topik, profil perusahaan, dan dosen pembimbing yang dituju.'],
              ['2', 'Serahkan ke koordinator', 'Bawa proposal + transkrip sementara ke sekretariat prodi.'],
              ['3', 'Terima surat pengantar', 'Prodi menerbitkan surat resmi ke perusahaan mitra.'],
            ].map(([n, title, desc], i, arr) => (
              <li key={n} className={`relative flex gap-4 pb-6 last:pb-0 ${i < arr.length - 1 ? '' : ''}`}>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[17px] top-10 h-[calc(100%-2.5rem)] w-px bg-slate-200" />
                )}
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-[#1453d6] text-sm font-bold text-white"
                >
                  {n}
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#08235b]">{title}</span>
                  <span className="mt-0.5 block text-sm text-slate-600">{desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm md:p-10">
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-[#1453d6]" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold text-[#08235b]">Berkas dari prodi</h2>
          </div>
          {docs.length > 0 ? (
            <ul className="mt-5 divide-y divide-slate-100">
              {docs.map((doc: any) => {
                const fileUrl = resolveMediaUrl(doc.file, '')
                return (
                  <li key={doc.id} className="flex items-center justify-between gap-4 py-3.5">
                    <span className="truncate text-sm font-semibold text-slate-800">{doc.title}</span>
                    {fileUrl ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#08235b]"
                      >
                        <Download className="size-3.5" aria-hidden="true" /> Unduh
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">Segera</span>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              Belum ada berkas magang di CMS. Template proposal dan surat pengantar
              bisa diminta langsung ke sekretariat prodi (Gedung Fakultas Teknik Lt. 2).
            </p>
          )}
          <p className="mt-6 rounded-2xl bg-blue-50/60 p-4 text-xs leading-relaxed text-slate-600">
            Formulir pendaftaran daring menyusul di halaman ini — admin cukup
            menerbitkan Page CMS berslug{' '}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#1453d6]">
              pendaftaran-magang
            </code>{' '}
            berisi blok Formulir, tanpa perlu ubah kode.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[#1453d6] transition hover:text-[#08235b]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
