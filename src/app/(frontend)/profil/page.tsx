import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCurrentLocale } from '@/utilities/getLocale'
import { resolveProfileContent } from '@/data/profileFallback'
import { ProfilClient, type LeadershipInfo } from './ProfilClient'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale()
  return {
    title:
      locale === 'en'
        ? 'Profile | Informatics Engineering UMPO'
        : 'Profil | Teknik Informatika UMPO',
    description:
      locale === 'en'
        ? 'Profile of Informatics Engineering Department, Universitas Muhammadiyah Ponorogo. History, vision & mission, organizational structure, accreditation, and contacts.'
        : 'Profil Program Studi Teknik Informatika Universitas Muhammadiyah Ponorogo. Sejarah, visi misi, struktur organisasi, akreditasi, dan kontak.',
  }
}

export default async function ProfilPage() {
  const locale = await getCurrentLocale()
  const payload = await getPayload({ config: configPromise })

  const [profileRes, lecturersRes] = await Promise.all([
    payload
      .findGlobal({
        slug: 'profile-page',
        locale,
      })
      .catch(() => null),
    payload
      .find({
        collection: 'lecturers',
        limit: 100,
        depth: 1,
      })
      .catch(() => ({ docs: [] })),
  ])

  const profileContent = resolveProfileContent(profileRes, locale)
  const lecturers = lecturersRes.docs || []

  // Resolve leadership automatically from lecturers collection
  const kaprodi = lecturers.find((l: any) =>
    l.role?.toLowerCase().includes('ka. prodi') || l.role?.toLowerCase().includes('ketua prodi')
  )
  const sekprodi = lecturers.find((l: any) =>
    l.role?.toLowerCase().includes('sekretaris prodi') || l.role?.toLowerCase().includes('sekprodi')
  )
  const labJaringan = lecturers.find((l: any) =>
    l.role?.toLowerCase().includes('jaringan') || l.role?.toLowerCase().includes('iot')
  )
  const labRpl = lecturers.find((l: any) =>
    l.role?.toLowerCase().includes('rpl') || l.role?.toLowerCase().includes('ka. lab prodi')
  )

  const leadership: LeadershipInfo = {
    kaprodi: kaprodi ? { name: kaprodi.name, nidn: kaprodi.nidn } : null,
    sekprodi: sekprodi ? { name: sekprodi.name, nidn: sekprodi.nidn } : null,
    labJaringan: labJaringan ? { name: labJaringan.name, nidn: labJaringan.nidn } : null,
    labRpl: labRpl ? { name: labRpl.name, nidn: labRpl.nidn } : null,
    totalLecturers: lecturers.length,
  }

  return <ProfilClient data={profileContent} locale={locale} leadership={leadership} />
}
