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
        {
          label: 'Tab 2: Visi, Misi & Tujuan',
          fields: [
            {
              type: 'collapsible',
              label: 'Visi Program Studi',
              fields: [
                {
                  name: 'visiBadge',
                  type: 'text',
                  localized: true,
                  label: 'Badge Visi',
                },
                {
                  name: 'visiText',
                  type: 'textarea',
                  localized: true,
                  label: 'Pernyataan Visi Keunggulan',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Misi Program Studi',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'misiTag', type: 'text', localized: true, label: 'Tagline Misi', admin: { width: '50%' } },
                    { name: 'misiTitle', type: 'text', localized: true, label: 'Judul Bagian Misi', admin: { width: '50%' } },
                  ],
                },
                {
                  name: 'misiItems',
                  type: 'array',
                  label: 'Daftar Butir Misi',
                  fields: [
                    { name: 'no', type: 'text', label: 'Nomor Urut', admin: { width: '20%' } },
                    { name: 'title', type: 'text', localized: true, label: 'Judul Misi', admin: { width: '80%' } },
                    { name: 'desc', type: 'textarea', localized: true, label: 'Deskripsi Misi' },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Tujuan Strategis Lulusan',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'tujuanTag', type: 'text', localized: true, label: 'Tagline Tujuan', admin: { width: '50%' } },
                    { name: 'tujuanTitle', type: 'text', localized: true, label: 'Judul Bagian Tujuan', admin: { width: '50%' } },
                  ],
                },
                {
                  name: 'tujuanItems',
                  type: 'array',
                  label: 'Daftar Butir Tujuan',
                  fields: [
                    { name: 'no', type: 'text', label: 'Nomor Urut', admin: { width: '20%' } },
                    { name: 'title', type: 'text', localized: true, label: 'Judul Tujuan', admin: { width: '80%' } },
                    { name: 'desc', type: 'textarea', localized: true, label: 'Deskripsi Tujuan' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tab 3: Struktur Organisasi',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'strukturTag', type: 'text', localized: true, label: 'Tagline Struktur', admin: { width: '50%' } },
                { name: 'strukturTitle', type: 'text', localized: true, label: 'Judul Bagian Struktur', admin: { width: '50%' } },
              ],
            },
            {
              name: 'strukturDesc',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Singkat Struktur',
            },
            {
              type: 'collapsible',
              label: 'Level 1: Ketua Program Studi (Kaprodi)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'kaprodiRole', type: 'text', localized: true, label: 'Nama Jabatan', admin: { width: '33.33%' } },
                    { name: 'kaprodiName', type: 'text', localized: true, label: 'Nama Lengkap & Gelar', admin: { width: '33.33%' } },
                    { name: 'kaprodiNidn', type: 'text', localized: true, label: 'NIDN', admin: { width: '33.33%' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Level 2: Sekretaris Prodi & Penjaminan Mutu (GKM)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'sekprodiRole', type: 'text', localized: true, label: 'Jabatan Sekprodi', admin: { width: '33.33%' } },
                    { name: 'sekprodiName', type: 'text', localized: true, label: 'Nama Sekprodi & Gelar', admin: { width: '33.33%' } },
                    { name: 'sekprodiNidn', type: 'text', localized: true, label: 'NIDN Sekprodi', admin: { width: '33.33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'gkmRole', type: 'text', localized: true, label: 'Unit Mutu (GKM)', admin: { width: '33.33%' } },
                    { name: 'gkmName', type: 'text', localized: true, label: 'Nama Tim / Keterangan', admin: { width: '33.33%' } },
                    { name: 'gkmSub', type: 'text', localized: true, label: 'Fungsi / Standar SPMI', admin: { width: '33.33%' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Level 3: Kepala Laboratorium',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lab1Role', type: 'text', localized: true, label: 'Lab 1 - Jabatan', admin: { width: '33.33%' } },
                    { name: 'lab1Name', type: 'text', localized: true, label: 'Lab 1 - Nama & Gelar', admin: { width: '33.33%' } },
                    { name: 'lab1Nidn', type: 'text', localized: true, label: 'Lab 1 - NIDN', admin: { width: '33.33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'lab2Role', type: 'text', localized: true, label: 'Lab 2 - Jabatan', admin: { width: '33.33%' } },
                    { name: 'lab2Name', type: 'text', localized: true, label: 'Lab 2 - Nama & Gelar', admin: { width: '33.33%' } },
                    { name: 'lab2Nidn', type: 'text', localized: true, label: 'Lab 2 - NIDN', admin: { width: '33.33%' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Level 4: Kartu Direktori Dosen & Peneliti',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'dosenBoxTitle', type: 'text', localized: true, label: 'Judul Kartu Dosen', admin: { width: '50%' } },
                    { name: 'dosenBoxBtnLabel', type: 'text', localized: true, label: 'Label Tombol Direktori', admin: { width: '50%' } },
                  ],
                },
                {
                  name: 'dosenBoxDesc',
                  type: 'textarea',
                  localized: true,
                  label: 'Deskripsi Kualifikasi Dosen',
                },
              ],
            },
          ],
        },
        {
          label: 'Tab 4: Akreditasi BAN-PT',
          fields: [
            {
              type: 'collapsible',
              label: 'Narasi Akreditasi & Komitmen Mutu (Kiri)',
              fields: [
                {
                  name: 'akreditasiBadge',
                  type: 'text',
                  localized: true,
                  label: 'Badge Status Akreditasi',
                },
                {
                  name: 'akreditasiTitle',
                  type: 'text',
                  localized: true,
                  label: 'Judul Utama Bagian Akreditasi',
                },
                {
                  name: 'akreditasiParagraph1',
                  type: 'textarea',
                  localized: true,
                  label: 'Paragraf 1 (Peringkat B & Nomor SK BAN-PT)',
                },
                {
                  name: 'akreditasiParagraph2',
                  type: 'textarea',
                  localized: true,
                  label: 'Paragraf 2 (Pencapaian Tridharma & Aspek Mutu)',
                },
                {
                  name: 'akreditasiPoints',
                  type: 'array',
                  label: 'Daftar Aspek Standar Mutu',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      localized: true,
                      label: 'Deskripsi Aspek',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'btnDocLabel', type: 'text', localized: true, label: 'Label Tombol Unduh Dokumen', admin: { width: '50%' } },
                    { name: 'btnDocUrl', type: 'text', label: 'URL Unduh Dokumen Akreditasi', admin: { width: '50%' } },
                  ],
                },
                {
                  name: 'btnKonsultasiLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tombol Konsultasi dengan Prodi',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Kartu Sertifikat Akreditasi (Kanan)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'certGrade', type: 'text', localized: true, label: 'Peringkat Akreditasi', admin: { width: '50%' } },
                    { name: 'certAgency', type: 'text', localized: true, label: 'Badan Akreditasi', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'certSk', type: 'text', localized: true, label: 'Keterangan Nomor SK', admin: { width: '50%' } },
                    { name: 'certScope', type: 'text', localized: true, label: 'Keterangan Masa / Wilayah Berlaku', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tab 5: Kontak & Lokasi',
          fields: [
            {
              type: 'collapsible',
              label: 'Hotline & Informasi Kontak (Kartu Biru)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'hotlineTitle', type: 'text', localized: true, label: 'Judul Hotline', admin: { width: '50%' } },
                    { name: 'hotlineNotice', type: 'text', localized: true, label: 'Keterangan Layanan', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'waNumber', type: 'text', label: 'Nomor WhatsApp (Contoh: 6282267868648)', admin: { width: '50%' } },
                    { name: 'waPhone', type: 'text', label: 'Nomor WhatsApp Tampilan (Contoh: 0822-6786-8648)', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'emailLabel', type: 'text', localized: true, label: 'Label Email', admin: { width: '33.33%' } },
                    { name: 'emailValue', type: 'text', label: 'Email Utama', admin: { width: '33.33%' } },
                    { name: 'emailAlt', type: 'text', label: 'Email Alternatif', admin: { width: '33.33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'hoursLabel', type: 'text', localized: true, label: 'Label Jam Layanan', admin: { width: '33.33%' } },
                    { name: 'hoursValue', type: 'text', localized: true, label: 'Hari Kerja', admin: { width: '33.33%' } },
                    { name: 'hoursAlt', type: 'text', localized: true, label: 'Jam Buka', admin: { width: '33.33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'locationLabel', type: 'text', localized: true, label: 'Label Lokasi', admin: { width: '25%' } },
                    { name: 'locationValue', type: 'text', localized: true, label: 'Nama Gedung & Ruang', admin: { width: '35%' } },
                    { name: 'locationAlt', type: 'text', localized: true, label: 'Alamat Kampus', admin: { width: '40%' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Google Maps & Alamat Kampus',
              fields: [
                { name: 'mapsEmbed', type: 'text', label: 'URL Google Maps Embed (iframe src)' },
                { name: 'mapsDirections', type: 'text', label: 'URL Google Maps Petunjuk Arah' },
                {
                  type: 'row',
                  fields: [
                    { name: 'mapsTitle', type: 'text', localized: true, label: 'Judul Lokasi Peta', admin: { width: '50%' } },
                    { name: 'mapsAddress', type: 'text', localized: true, label: 'Alamat Lengkap', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Pertanyaan Umum (FAQ)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'faqTitle', type: 'text', localized: true, label: 'Judul FAQ', admin: { width: '50%' } },
                    { name: 'faqSubtitle', type: 'text', localized: true, label: 'Subjudul FAQ', admin: { width: '50%' } },
                  ],
                },
                {
                  name: 'faqs',
                  type: 'array',
                  label: 'Daftar Pertanyaan & Jawaban',
                  fields: [
                    { name: 'q', type: 'text', localized: true, label: 'Pertanyaan' },
                    { name: 'a', type: 'textarea', localized: true, label: 'Jawaban' },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Kartu Informasi Calon Mahasiswa Baru (PMB)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'pmbCardTitle', type: 'text', localized: true, label: 'Judul Kartu PMB', admin: { width: '50%' } },
                    { name: 'pmbCardBtnLabel', type: 'text', localized: true, label: 'Label Tombol Pendaftaran', admin: { width: '50%' } },
                  ],
                },
                { name: 'pmbCardDesc', type: 'textarea', localized: true, label: 'Keterangan Pendaftaran' },
                { name: 'pmbCardUrl', type: 'text', label: 'URL Pendaftaran Online PMB' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
