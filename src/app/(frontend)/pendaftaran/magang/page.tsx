import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { getCurrentLocale } from '@/utilities/getLocale'
import { resolveMagangContent } from '@/data/magangFallback'
import { MagangClient } from './MagangClient'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale()
  const payload = await getPayload({ config: configPromise })
  const cmsData = await payload
    .findGlobal({
      slug: 'magang-page',
      locale,
    })
    .catch(() => null)

  const content = resolveMagangContent(cmsData, locale)

  return {
    title: content.metaTitle,
    description: content.metaDescription,
  }
}

async function getMagangPage(locale: 'id' | 'en' = 'id') {
  const payload = await getPayload({ config: configPromise })
  const result = await payload
    .find({
      collection: 'pages',
      locale,
      limit: 1,
      pagination: false,
      where: {
        slug: {
          equals: 'pendaftaran-magang',
        },
      },
    })
    .catch(() => null)
  return result?.docs?.[0] ?? null
}

async function getMagangDocs(locale: 'id' | 'en' = 'id') {
  const payload = await getPayload({ config: configPromise })
  const result = await payload
    .find({
      collection: 'downloads',
      locale,
      limit: 20,
      sort: '-updatedAt',
      depth: 1,
      where: {
        category: {
          equals: 'Magang',
        },
      },
    })
    .catch(() => ({ docs: [] }))
  return result.docs ?? []
}

export default async function MagangPage() {
  const locale = await getCurrentLocale()
  const payload = await getPayload({ config: configPromise })

  const [cmsGlobalRes, cmsPage, docs] = await Promise.all([
    payload
      .findGlobal({
        slug: 'magang-page',
        locale,
      })
      .catch(() => null),
    getMagangPage(locale),
    getMagangDocs(locale),
  ])

  // If admin published a custom Page with slug pendaftaran-magang
  if (cmsPage) {
    return (
      <article className="min-h-screen bg-[#FFFBF5] pb-28 pt-16" id="konten-utama">
        <RenderHero {...cmsPage.hero} />
        <RenderBlocks blocks={cmsPage.layout} />
      </article>
    )
  }

  const content = resolveMagangContent(cmsGlobalRes, locale)

  return (
    <MagangClient
      content={content}
      docs={docs as any[]}
      locale={locale}
    />
  )
}
