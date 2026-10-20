import type { GlobalConfig } from 'payload'

export const DownloadPage: GlobalConfig = {
  slug: 'download-page',
  label: 'Konten Halaman Unduhan',
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
                  label: 'Label Breadcrumb Halaman Saat Ini',
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
                  label: 'Placeholder Pencarian Dokumen',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'btnDownloadLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Unduh',
                  admin: { width: '50%' },
                },
                {
                  name: 'btnComingSoonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Berkas Belum Tersedia',
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
              label: 'Judul Saat Dokumen Tidak Ditemukan',
            },
            {
              name: 'emptyDesc',
              type: 'textarea',
              localized: true,
              label: 'Keterangan Saat Dokumen Tidak Ditemukan',
            },
          ],
        },
        {
          label: 'Panduan Administrasi',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'guideTag',
                  type: 'text',
                  localized: true,
                  label: 'Tag / Badge Panduan',
                  admin: { width: '30%' },
                },
                {
                  name: 'guideTitle',
                  type: 'text',
                  localized: true,
                  label: 'Judul Seksi Panduan Prosedur',
                  admin: { width: '70%' },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Langkah 1: Unduh & Isi Template',
              fields: [
                {
                  name: 'step1Title',
                  type: 'text',
                  localized: true,
                  label: 'Judul Langkah 1',
                },
                {
                  name: 'step1Desc',
                  type: 'textarea',
                  localized: true,
                  label: 'Deskripsi Langkah 1',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Langkah 2: Verifikasi Dosen PA / Pembimbing',
              fields: [
                {
                  name: 'step2Title',
                  type: 'text',
                  localized: true,
                  label: 'Judul Langkah 2',
                },
                {
                  name: 'step2Desc',
                  type: 'textarea',
                  localized: true,
                  label: 'Deskripsi Langkah 2',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Langkah 3: Unggah ke SIMTIK / SISKRIP',
              fields: [
                {
                  name: 'step3Title',
                  type: 'text',
                  localized: true,
                  label: 'Judul Langkah 3',
                },
                {
                  name: 'step3Desc',
                  type: 'textarea',
                  localized: true,
                  label: 'Deskripsi Langkah 3',
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
