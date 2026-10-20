import type { GlobalConfig } from 'payload'

export const BeritaPage: GlobalConfig = {
  slug: 'berita-page',
  label: 'Konten Halaman Berita',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banner & Navigasi',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'bannerCategory',
                  type: 'text',
                  localized: true,
                  label: 'Badge / Kategori Banner',
                  admin: { width: '50%' },
                },
                {
                  name: 'bannerTitle',
                  type: 'text',
                  localized: true,
                  label: 'Judul Utama Halaman',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'bannerSubtitle',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi / Subjudul Banner',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'breadcrumbHome',
                  type: 'text',
                  localized: true,
                  label: 'Label Breadcrumb Beranda',
                  admin: { width: '50%' },
                },
                {
                  name: 'breadcrumbCurrent',
                  type: 'text',
                  localized: true,
                  label: 'Label Breadcrumb Berita',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Filter & Kontrol UI',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'filterAllLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tab Semua Kategori',
                  admin: { width: '50%' },
                },
                {
                  name: 'searchPlaceholder',
                  type: 'text',
                  localized: true,
                  label: 'Placeholder Pencarian',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'readTimePrefix',
                  type: 'text',
                  localized: true,
                  label: 'Label Waktu Baca (misal: mnt baca)',
                  admin: { width: '50%' },
                },
                {
                  name: 'readMoreLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Baca Selengkapnya',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Empty State',
          fields: [
            {
              name: 'emptyTitle',
              type: 'text',
              localized: true,
              label: 'Judul Saat Berita Tidak Ditemukan',
            },
            {
              name: 'emptyDesc',
              type: 'textarea',
              localized: true,
              label: 'Keterangan Saat Berita Tidak Ditemukan',
            },
            {
              name: 'emptyResetLabel',
              type: 'text',
              localized: true,
              label: 'Label Tombol Reset Pencarian',
            },
          ],
        },
        {
          label: 'Halaman Detail UI',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'detailBackLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Kembali ke Indeks',
                  admin: { width: '50%' },
                },
                {
                  name: 'detailRelatedTitle',
                  type: 'text',
                  localized: true,
                  label: 'Judul Seksi Berita Terkait',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'detailAllNewsLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tautan Lihat Semua Berita',
                  admin: { width: '50%' },
                },
                {
                  name: 'detailEmptyContent',
                  type: 'text',
                  localized: true,
                  label: 'Pemberitahuan Konten Kosong',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Metadata (SEO)',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              label: 'Meta Title (Tab Browser)',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              label: 'Meta Description (Mesin Pencari)',
            },
          ],
        },
      ],
    },
  ],
}
