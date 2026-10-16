import type { GlobalConfig } from 'payload'

export const DosenPage: GlobalConfig = {
  slug: 'dosen-page',
  label: 'Konten Halaman Dosen',
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
          label: 'Filter & Pencarian',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'tabSemua',
                  type: 'text',
                  localized: true,
                  label: 'Tab 1: Semua Dosen',
                  admin: { width: '25%' },
                },
                {
                  name: 'tabPimpinan',
                  type: 'text',
                  localized: true,
                  label: 'Tab 2: Pimpinan Prodi',
                  admin: { width: '25%' },
                },
                {
                  name: 'tabLab',
                  type: 'text',
                  localized: true,
                  label: 'Tab 3: Ka. Laboratorium',
                  admin: { width: '25%' },
                },
                {
                  name: 'tabDosen',
                  type: 'text',
                  localized: true,
                  label: 'Tab 4: Dosen Pengajar',
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'searchPlaceholder',
                  type: 'text',
                  localized: true,
                  label: 'Placeholder Kolom Pencarian',
                  admin: { width: '50%' },
                },
                {
                  name: 'searchAriaLabel',
                  type: 'text',
                  localized: true,
                  label: 'Aria Label Kolom Pencarian',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'counterShowing',
                  type: 'text',
                  localized: true,
                  label: 'Teks Counter: Menampilkan',
                  admin: { width: '25%' },
                },
                {
                  name: 'counterOf',
                  type: 'text',
                  localized: true,
                  label: 'Teks Counter: dari',
                  admin: { width: '25%' },
                },
                {
                  name: 'counterLecturers',
                  type: 'text',
                  localized: true,
                  label: 'Teks Counter: dosen',
                  admin: { width: '25%' },
                },
                {
                  name: 'counterForKeyword',
                  type: 'text',
                  localized: true,
                  label: 'Teks Counter: untuk kata kunci',
                  admin: { width: '25%' },
                },
              ],
            },
            {
              name: 'resetFilterBtn',
              type: 'text',
              localized: true,
              label: 'Label Tombol Reset Filter',
            },
          ],
        },
        {
          label: 'Kartu Dosen & Kontak',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'badgePimpinan',
                  type: 'text',
                  localized: true,
                  label: 'Badge: Pimpinan',
                  admin: { width: '33.33%' },
                },
                {
                  name: 'badgeLab',
                  type: 'text',
                  localized: true,
                  label: 'Badge: Ka. Lab',
                  admin: { width: '33.33%' },
                },
                {
                  name: 'badgeDosen',
                  type: 'text',
                  localized: true,
                  label: 'Badge: Dosen',
                  admin: { width: '33.33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'pddiktiTooltip',
                  type: 'text',
                  localized: true,
                  label: 'Tooltip Verifikasi PDDIKTI',
                  admin: { width: '50%' },
                },
                {
                  name: 'researchAreaLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Judul Bidang Riset',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'waButtonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol WhatsApp',
                  admin: { width: '50%' },
                },
                {
                  name: 'emailButtonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Email',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'waDefaultMessage',
              type: 'textarea',
              localized: true,
              label: 'Pesan Default Chat WhatsApp',
            },
          ],
        },
        {
          label: 'State Kosong (Empty State)',
          fields: [
            {
              name: 'emptyTitle',
              type: 'text',
              localized: true,
              label: 'Judul Saat Dosen Tidak Ditemukan',
            },
            {
              name: 'emptyDesc',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Saat Dosen Tidak Ditemukan',
            },
            {
              name: 'resetSearchBtn',
              type: 'text',
              localized: true,
              label: 'Label Tombol Reset Pencarian',
            },
          ],
        },
        {
          label: 'Pengaturan SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              label: 'Meta Title (Judul Tab Browser)',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              label: 'Meta Description (Deskripsi Mesin Pencari)',
            },
          ],
        },
      ],
    },
  ],
}
