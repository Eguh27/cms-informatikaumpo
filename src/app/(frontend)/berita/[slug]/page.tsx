import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { PageBanner } from '@/components/PageBanner'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function BeritaDetailPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'news',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const newsItem = result.docs[0] || null

  if (!newsItem) {
    return notFound()
  }

  const imageUrl = typeof newsItem.image === 'object' && newsItem.image?.url ? newsItem.image.url : null
  const dateStr = newsItem.publishedAt 
    ? new Date(newsItem.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <div className="min-h-screen bg-slate-50/60 pb-28">
      <PageBanner
        category="Warta & Informasi"
        title={newsItem.title}
        subtitle={newsItem.excerpt}
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita & Pengumuman', href: '/berita' },
          { label: 'Detail' },
        ]}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 mt-10">
        <Link 
          href="/berita" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1453d6] hover:text-[#08235b] mb-8 transition"
        >
          <ArrowLeft className="size-4" /> Kembali ke Indeks Berita
        </Link>
        
        <article className="rounded-[2.5rem] bg-white p-6 md:p-10 shadow-sm border border-slate-200/80">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#1453d6] border border-blue-100 mb-6">
            {newsItem.category}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight text-[#08235b] mb-6">
            {newsItem.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="size-4 text-slate-400" /> {dateStr}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="size-4 text-slate-400" /> {newsItem.readTime || 3} min read
            </span>
          </div>

          {imageUrl && (
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-10 bg-slate-100 border border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-slate max-w-none lg:prose-lg prose-headings:font-display prose-headings:text-[#08235b] prose-a:text-[#1453d6]">
            <p className="lead text-lg font-medium text-slate-700">
              {newsItem.excerpt}
            </p>
            
            {/* Note: In a complete implementation, you'd use a Payload Rich Text Parser here to parse newsItem.content. 
                For MVP, we just render some static text after the excerpt. */}
            <p>
              Program Studi S1 Teknik Informatika Universitas Muhammadiyah Ponorogo senantiasa mendukung peningkatan 
              kualitas akademik dan wawasan keilmuan bagi seluruh mahasiswa melalui kegiatan dan publikasi ini.
            </p>
            <p>
              Untuk informasi lebih detail atau teknis mengenai pengumuman/berita ini, Anda dapat menghubungi pihak
              Sekretariat Prodi Teknik Informatika di Gedung Fakultas Teknik Lantai 2 Kampus 1 UMPO, atau melalui kanal 
              komunikasi resmi yang tersedia.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'news',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const newsItem = result.docs[0] || null
  if (!newsItem) {
    return { title: 'Not Found' }
  }

  return {
    title: `${newsItem.title} | TI UMPO`,
    description: newsItem.excerpt,
  }
}
