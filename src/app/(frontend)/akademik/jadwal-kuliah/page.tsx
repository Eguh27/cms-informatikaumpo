import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageBanner } from '@/components/PageBanner'
import { resolveMediaUrl } from '@/data/siteMedia'
import { CalendarDays, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jadwal Kuliah | TI UMPO',
  description:
    'Unduh jadwal kuliah semester berjalan Program Studi S1 Teknik Informatika UMPO langsung dari dokumen resmi prodi.',
}

async function getSchedules() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'downloads',
    limit: 50,
    sort: '-updatedAt',
    depth: 1,
    where: {
      category: {
        equals: 'Jadwal Kuliah',
      },
    },
  })
  return result.docs ?? []
}

export default async function JadwalKuliahPage() {
  const schedules = await getSchedules()

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      <PageBanner
        category="Akademik & Kurikulum"
        title="Jadwal Kuliah"
        subtitle="Jadwal perkuliahan semester berjalan. Selalu unduh versi terbaru karena ruang dan jam dapat berubah."
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Akademik', href: '/akademik' },
          { label: 'Jadwal Kuliah' },
        ]}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 mt-4">
        <Link
          href="/akademik"
          className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[#1453d6] transition hover:text-[#08235b]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Kembali ke Akademik
        </Link>

        {schedules.length > 0 ? (
          <ul className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            {schedules.map((doc: any) => {
              const fileUrl = resolveMediaUrl(doc.file, '')
              return (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-4 border-b border-slate-100 p-5 transition last:border-b-0 hover:bg-blue-50/30 md:px-7"
                >
                  <span className="flex min-w-0 items-start gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-[#1453d6]">
                      <CalendarDays className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-base font-bold text-[#08235b]">
                        {doc.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Format PDF — unduh untuk versi cetak
                      </span>
                    </span>
                  </span>
                  {fileUrl ? (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#08235b]"
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
          <div className="rounded-3xl border border-dashed border-[#1E6FD9]/30 bg-white p-10 text-center shadow-sm">
            <CalendarDays className="mx-auto size-10 text-[#1453d6]" aria-hidden="true" />
            <h2 className="mt-4 font-display text-lg font-bold text-[#08235b]">
              Jadwal semester ini belum diunggah
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Admin prodi mengunggah jadwal tiap awal semester lewat menu Unduhan CMS.
              Sementara itu, tanyakan jadwal kelasmu lewat hotline prodi.
            </p>
            <Link
              href="/kontak"
              className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-[#1453d6] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#08235b]"
            >
              Hubungi Sekretariat Prodi
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
