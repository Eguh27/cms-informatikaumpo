import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Berita',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Kategori',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Tanggal Rilis',
      defaultValue: () => new Date(),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Sampul (Thumbnail)',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Ringkasan Singkat (Excerpt)',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Isi Konten',
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Estimasi Waktu Baca (Menit)',
      admin: {
        position: 'sidebar',
      }
    },
  ],
}
