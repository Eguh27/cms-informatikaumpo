import type { GlobalConfig } from 'payload'

export const ProfilePage: GlobalConfig = {
  slug: 'profile-page',
  label: 'Halaman Profil',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banner & Navigasi Tab',
          fields: [
            {
              name: 'bannerTitle',
              type: 'text',
              localized: true,
              label: 'Judul Banner Halaman',
            },
            {
              name: 'bannerSubtitle',
              type: 'textarea',
              localized: true,
              label: 'Sub-judul / Deskripsi Banner',
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
                  label: 'Label Breadcrumb Halaman Ini',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Label 5 Tab Navigasi Profil',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'tabSejarahLabel', type: 'text', localized: true, label: 'Tab 1: Sejarah', admin: { width: '50%' } },
                    { name: 'tabVisimisiLabel', type: 'text', localized: true, label: 'Tab 2: Visi Misi', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'tabStrukturLabel', type: 'text', localized: true, label: 'Tab 3: Struktur', admin: { width: '33.33%' } },
                    { name: 'tabAkreditasiLabel', type: 'text', localized: true, label: 'Tab 4: Akreditasi', admin: { width: '33.33%' } },
                    { name: 'tabKontakLabel', type: 'text', localized: true, label: 'Tab 5: Kontak', admin: { width: '33.33%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tab 1: Sejarah Pendirian',
          fields: [
            {
              name: 'sejarahBadge',
              type: 'text',
              localized: true,
              label: 'Badge SK Pendirian Resmi',
            },
            {
              name: 'sejarahTitle',
              type: 'text',
              localized: true,
              label: 'Judul Utama Sejarah',
            },
            {
              name: 'sejarahParagraph1',
              type: 'textarea',
              localized: true,
              label: 'Paragraf 1 (Sejarah Pendirian)',
            },
            {
              name: 'sejarahParagraph2',
              type: 'textarea',
              localized: true,
              label: 'Paragraf 2 (Dedikasi & Kiprah Lulusan)',
            },
            {
              name: 'sejarahParagraph3',
              type: 'textarea',
              localized: true,
              label: 'Paragraf 3 (Transformasi OBE & Kurikulum)',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'btnNextTabLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Lanjut ke Visi Misi',
                  admin: { width: '50%' },
                },
                {
                  name: 'btnDosenLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Lihat Tim Dosen',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Sidebar Legalitas & Dedikasi',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'sidebarLegalTag', type: 'text', localized: true, label: 'Tagline Legalitas', admin: { width: '50%' } },
                    { name: 'sidebarLegalTitle', type: 'text', localized: true, label: 'Judul Kartu Legalitas', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'legal1Label', type: 'text', localized: true, label: 'Item 1 - Label', admin: { width: '33.33%' } },
                    { name: 'legal1Value', type: 'text', localized: true, label: 'Item 1 - Nilai (No SK)', admin: { width: '33.33%' } },
                    { name: 'legal1Sub', type: 'text', localized: true, label: 'Item 1 - Keterangan Tanggal', admin: { width: '33.33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'legal2Label', type: 'text', localized: true, label: 'Item 2 - Label', admin: { width: '33.33%' } },
                    { name: 'legal2Value', type: 'text', localized: true, label: 'Item 2 - Nilai (Peringkat)', admin: { width: '33.33%' } },
                    { name: 'legal2Sub', type: 'text', localized: true, label: 'Item 2 - Keterangan SK BAN-PT', admin: { width: '33.33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'legal3Label', type: 'text', localized: true, label: 'Item 3 - Label', admin: { width: '33.33%' } },
                    { name: 'legal3Value', type: 'text', localized: true, label: 'Item 3 - Nilai (Gelar)', admin: { width: '33.33%' } },
                    { name: 'legal3Sub', type: 'text', localized: true, label: 'Item 3 - Keterangan SKS & Semester', admin: { width: '33.33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'statNumber', type: 'text', localized: true, label: 'Kartu Stat - Angka/Teks (20+ Tahun)', admin: { width: '50%' } },
                    { name: 'statCaption', type: 'text', localized: true, label: 'Kartu Stat - Deskripsi', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
