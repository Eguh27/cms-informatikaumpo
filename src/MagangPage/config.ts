import type { GlobalConfig } from 'payload'

export const MagangPage: GlobalConfig = {
  slug: 'magang-page',
  label: 'Konten Pendaftaran Magang',
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
          label: 'Syarat & Alur Magang',
          fields: [
            {
              name: 'termsTitle',
              type: 'text',
              localized: true,
              label: 'Judul Persyaratan Magang',
            },
            {
              name: 'termsDesc',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Persyaratan SKS & Ketentuan',
            },
            {
              type: 'collapsible',
              label: 'Langkah 1: Siapkan Proposal',
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
              label: 'Langkah 2: Serahkan ke Koordinator',
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
              label: 'Langkah 3: Terima Surat Pengantar',
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
          label: 'Berkas Unduhan & UI',
          fields: [
            {
              name: 'docsSectionTitle',
              type: 'text',
              localized: true,
              label: 'Judul Seksi Berkas dari Prodi',
            },
            {
              name: 'docsEmptyText',
              type: 'textarea',
              localized: true,
              label: 'Keterangan Saat Belum Ada Berkas',
            },
            {
              name: 'docsNoteText',
              type: 'textarea',
              localized: true,
              label: 'Catatan Formulir Daring',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'btnDownloadLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Unduh',
                  admin: { width: '33%' },
                },
                {
                  name: 'btnComingSoonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Berkas Belum Tersedia',
                  admin: { width: '33%' },
                },
                {
                  name: 'btnBackHomeLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Kembali ke Beranda',
                  admin: { width: '34%' },
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
