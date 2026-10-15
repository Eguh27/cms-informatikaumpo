import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCurrentLocale } from '@/utilities/getLocale'
import { resolveProfileContent } from '@/data/profileFallback'
import { ProfilClient } from './ProfilClient'

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
  const profileRes = await payload
    .findGlobal({
      slug: 'profile-page',
      locale,
    })
    .catch(() => null)

  const profileContent = resolveProfileContent(profileRes, locale)

  return <ProfilClient data={profileContent} locale={locale} />
}
