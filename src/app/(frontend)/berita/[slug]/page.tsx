import { PageBanner } from '@/components/PageBanner'
import RichText from '@/components/RichText'
import { ShareButtons } from '@/components/ShareButtons'
import { SITE_MEDIA } from '@/data/siteMedia'
import configPromise from '@payload-config'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

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

  const categoryId = typeof newsItem.category === 'object' && newsItem.category !== null ? newsItem.category.id : newsItem.category;

  // Related news: same category first, fallback to the latest other items
  const sameCat = await payload.find({
    collection: 'news',
    limit: 3,
    sort: '-publishedAt',
    where: {
      and: [
        { category: { equals: categoryId } },
        { id: { not_equals: newsItem.id } },
      ],
    },
  })
  let related = sameCat.docs || []
  if (related.length < 3) {
    const latest = await payload.find({
      collection: 'news',
      limit: 6,
      sort: '-publishedAt',
      where: { id: { not_equals: newsItem.id } },
    })
    const existingIds = new Set(related.map((r: any) => r.id))
    for (const d of latest.docs || []) {
      if (related.length >= 3) break
      if (!existingIds.has(d.id)) {
        related.push(d)
        existingIds.add(d.id)
      }
    }
  }

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
            {typeof newsItem.category === 'object' && newsItem.category !== null ? newsItem.category.title : newsItem.category}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight text-[#08235b] mb-6">
            {newsItem.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="size-4 text-slate-500" /> {dateStr}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="size-4 text-slate-500" /> {newsItem.readTime || 3} min read
            </span>
          </div>

          {imageUrl && (
            <figure className="mb-10">
              <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-500">
                Sumber: {imageUrl}
              </figcaption>
            </figure>
          )}

          <div className="prose prose-slate max-w-none lg:prose-lg prose-headings:font-display prose-headings:text-[#08235b] prose-a:text-[#1453d6]">
            <p className="lead text-lg font-medium text-slate-700">
              {/* {draft} */}
            </p>

            {newsItem.content ? (
              <RichText data={newsItem.content} enableGutter={false} enableProse={false} />
            ) : (
              <p className="text-sm text-slate-500">Konten lengkap belum tersedia untuk berita ini.</p>
            )}
          </div>
        </article>

        <ShareButtons title={newsItem.title} />

        {/* Rekomendasi berita lain */}
        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-news-title">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 id="related-news-title" className="font-display text-xl font-extrabold text-[#08235b] md:text-2xl">
                Berita Terkait
              </h2>
              <Link href="/berita" className="text-xs font-bold text-[#1453d6] transition hover:text-[#08235b]">
                Lihat Semua Berita →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item: any) => {
                const rImg = typeof item.image === 'object' && item.image?.url ? item.image.url : null
                const rDate = item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                  : ''
                return (
                  <Link href={`/berita/${item.slug}`} key={item.id} className="group">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1453d6]/40 hover:shadow-lg">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rImg || SITE_MEDIA.labSoftware}
                          alt={item.title}
                          className="size-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-[#1453d6] shadow-sm backdrop-blur-md">
                          {typeof item.category === 'object' && item.category !== null ? item.category.title : item.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Calendar className="size-3" aria-hidden="true" /> {rDate}
                          <span aria-hidden="true">•</span>
                          <Clock className="size-3" aria-hidden="true" /> {item.readTime || 3} min read
                        </div>
                        <h3 className="mt-2 line-clamp-2 font-display text-[15px] font-bold leading-snug text-[#08235b] transition-colors group-hover:text-[#1453d6]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-600">
                          {item.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
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
