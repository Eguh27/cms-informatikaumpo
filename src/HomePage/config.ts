import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Konten Beranda',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              localized: true,
              label: 'Judul Utama Hero',
            },
            {
              name: 'heroLead',
              type: 'textarea',
              localized: true,
              label: 'Teks Pengantar Hero',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroPrimaryCtaText',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Utama',
                  admin: { width: '50%' },
                },
                {
                  name: 'heroSecondaryCtaText',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Kedua',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'heroScrollCue',
              type: 'text',
              localized: true,
              label: 'Label Tombol Gulir / Jelajahi',
            },
            {
              type: 'collapsible',
              label: 'Statistik Utama (4 Kartu)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'stat1Value', type: 'text', localized: true, label: 'Statistik 1 - Nilai', admin: { width: '50%' } },
                    { name: 'stat1Label', type: 'text', localized: true, label: 'Statistik 1 - Label', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'stat2Value', type: 'text', localized: true, label: 'Statistik 2 - Nilai', admin: { width: '50%' } },
                    { name: 'stat2Label', type: 'text', localized: true, label: 'Statistik 2 - Label', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'stat3Value', type: 'text', localized: true, label: 'Statistik 3 - Nilai', admin: { width: '50%' } },
                    { name: 'stat3Label', type: 'text', localized: true, label: 'Statistik 3 - Label', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'stat4Value', type: 'text', localized: true, label: 'Statistik 4 - Nilai', admin: { width: '50%' } },
                    { name: 'stat4Label', type: 'text', localized: true, label: 'Statistik 4 - Label', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Profil & Keunggulan',
          fields: [
            {
              name: 'profileSectionTag',
              type: 'text',
              localized: true,
              label: 'Label Tag Section',
            },
            {
              name: 'profileTitle',
              type: 'text',
              localized: true,
              label: 'Judul Profil',
            },
            {
              name: 'profileDescription',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Sejarah / Izin DIKTI',
            },
            {
              type: 'row',
              fields: [
                { name: 'btnHistoryText', type: 'text', localized: true, label: 'Label Tombol Sejarah', admin: { width: '50%' } },
                { name: 'btnVisiMisiText', type: 'text', localized: true, label: 'Label Tombol Visi Misi', admin: { width: '50%' } },
              ],
            },
            {
              type: 'collapsible',
              label: 'Badge Gelar Kelulusan',
              fields: [
                { name: 'degreeTag', type: 'text', localized: true, label: 'Tag Gelar' },
                { name: 'degreeTitle', type: 'text', localized: true, label: 'Nama Gelar' },
                { name: 'degreeQuote', type: 'textarea', localized: true, label: 'Kutipan Karakter Islami' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Kartu Ringkasan (Lab & Rasio Dosen)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'quickStat1Number', type: 'text', localized: true, label: 'Kartu 1 - Angka', admin: { width: '33%' } },
                    { name: 'quickStat1Title', type: 'text', localized: true, label: 'Kartu 1 - Judul', admin: { width: '33%' } },
                    { name: 'quickStat1Desc', type: 'text', localized: true, label: 'Kartu 1 - Keterangan', admin: { width: '33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'quickStat2Number', type: 'text', localized: true, label: 'Kartu 2 - Angka', admin: { width: '33%' } },
                    { name: 'quickStat2Title', type: 'text', localized: true, label: 'Kartu 2 - Judul', admin: { width: '33%' } },
                    { name: 'quickStat2Desc', type: 'text', localized: true, label: 'Kartu 2 - Keterangan', admin: { width: '33%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Kurikulum & Peminatan',
          fields: [
            {
              name: 'curriculumSectionTag',
              type: 'text',
              localized: true,
              label: 'Label Tag Section',
            },
            {
              name: 'curriculumTitle',
              type: 'text',
              localized: true,
              label: 'Judul Kurikulum',
            },
            {
              name: 'curriculumDescription',
              type: 'textarea',
              localized: true,
              label: 'Pengantar 3 Rumpun Keilmuan',
            },
            {
              type: 'collapsible',
              label: 'Kartu Unduh Kurikulum (Drive)',
              fields: [
                { name: 'driveCardTitle', type: 'text', localized: true, label: 'Judul Kartu' },
                { name: 'driveCardSubtitle', type: 'text', localized: true, label: 'Keterangan Kartu' },
                { name: 'driveBtnText', type: 'text', localized: true, label: 'Label Tombol Unduh' },
              ],
            },
          ],
        },
        {
          label: 'Mahasiswa & HIMATIF',
          fields: [
            {
              name: 'himatifSectionTag',
              type: 'text',
              localized: true,
              label: 'Label Tag Section',
            },
            {
              name: 'himatifTitle',
              type: 'text',
              localized: true,
              label: 'Judul Banner HIMATIF',
            },
            {
              name: 'himatifDescription',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Kegiatan Mahasiswa',
            },
            {
              type: 'row',
              fields: [
                { name: 'himatifBtnText', type: 'text', localized: true, label: 'Label Tombol Instagram', admin: { width: '50%' } },
                { name: 'himatifUrl', type: 'text', label: 'Tautan URL Instagram', admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Sarana & Fasilitas',
          fields: [
            {
              name: 'facilitySectionTag',
              type: 'text',
              localized: true,
              label: 'Label Tag Section',
            },
            {
              name: 'facilityTitle',
              type: 'text',
              localized: true,
              label: 'Judul Fasilitas',
            },
            {
              name: 'facilityDescription',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Fasilitas',
            },
            {
              type: 'collapsible',
              label: 'Fasilitas 1 (Lab Jaringan & IoT)',
              fields: [
                { name: 'facility1Title', type: 'text', localized: true, label: 'Judul' },
                { name: 'facility1Desc', type: 'textarea', localized: true, label: 'Deskripsi' },
                { name: 'facility1Foot', type: 'text', localized: true, label: 'Info Ka. Lab / Footer' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Fasilitas 2 (Lab Rekayasa Perangkat Lunak)',
              fields: [
                { name: 'facility2Title', type: 'text', localized: true, label: 'Judul' },
                { name: 'facility2Desc', type: 'textarea', localized: true, label: 'Deskripsi' },
                { name: 'facility2Foot', type: 'text', localized: true, label: 'Info Ka. Lab / Footer' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Fasilitas 3 (Perpustakaan Pusat)',
              fields: [
                { name: 'facility3Title', type: 'text', localized: true, label: 'Judul' },
                { name: 'facility3Desc', type: 'textarea', localized: true, label: 'Deskripsi' },
                {
                  type: 'row',
                  fields: [
                    { name: 'facility3Foot', type: 'text', localized: true, label: 'Label Tautan / Footer', admin: { width: '50%' } },
                    { name: 'facility3Link', type: 'text', label: 'URL Tautan', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'PMB / Call To Action',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              localized: true,
              label: 'Judul Ajakan Bergabung (PMB)',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Ajakan PMB',
            },
            {
              type: 'row',
              fields: [
                { name: 'ctaPrimaryBtnText', type: 'text', localized: true, label: 'Label Tombol Daftar Sekarang', admin: { width: '50%' } },
                { name: 'ctaPrimaryBtnUrl', type: 'text', label: 'URL Pendaftaran PMB', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'ctaSecondaryBtnText', type: 'text', localized: true, label: 'Label Tombol Unduh Panduan', admin: { width: '50%' } },
                { name: 'ctaSecondaryBtnUrl', type: 'text', label: 'URL Panduan & Template', admin: { width: '50%' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
