import type { GlobalConfig } from 'payload'

export const FasilitasPage: GlobalConfig = {
  slug: 'fasilitas-page',
  label: 'Konten Halaman Fasilitas',
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
                  label: 'Badge Kategori Banner',
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
              label: 'Subjudul / Deskripsi Banner',
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
                  label: 'Label Breadcrumb Fasilitas',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Lab 1: Jaringan & IoT',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'lab1Badge',
                  type: 'text',
                  localized: true,
                  label: 'Badge Lab 1',
                  admin: { width: '50%' },
                },
                {
                  name: 'lab1Title',
                  type: 'text',
                  localized: true,
                  label: 'Nama Laboratorium 1',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'lab1HeadRoleLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Jabatan Kepala Lab',
                  admin: { width: '50%' },
                },
                {
                  name: 'lab1HeadName',
                  type: 'text',
                  localized: true,
                  label: 'Nama Kepala Lab (Fallback)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'lab1Desc',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Lengkap Lab 1',
            },
            {
              type: 'collapsible',
              label: '4 Butir Fitur Unggulan Lab 1',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lab1Point1', type: 'text', localized: true, label: 'Fitur 1', admin: { width: '50%' } },
                    { name: 'lab1Point2', type: 'text', localized: true, label: 'Fitur 2', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'lab1Point3', type: 'text', localized: true, label: 'Fitur 3', admin: { width: '50%' } },
                    { name: 'lab1Point4', type: 'text', localized: true, label: 'Fitur 4', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'lab1Capacity', type: 'text', localized: true, label: 'Kapasitas', admin: { width: '33.33%' } },
                { name: 'lab1Connection', type: 'text', localized: true, label: 'Koneksi Internet', admin: { width: '33.33%' } },
                { name: 'lab1Location', type: 'text', localized: true, label: 'Lokasi Ruangan', admin: { width: '33.33%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'lab1Image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Foto Laboratorium 1 (Opsional, fallback otomatis)',
                  admin: { width: '40%' },
                },
                {
                  name: 'lab1ImageTag',
                  type: 'text',
                  localized: true,
                  label: 'Label Overlay Foto',
                  admin: { width: '30%' },
                },
                {
                  name: 'lab1ImageSub',
                  type: 'text',
                  localized: true,
                  label: 'Sub-label Overlay Foto',
                  admin: { width: '30%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Lab 2: RPL & Komputer',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'lab2Badge',
                  type: 'text',
                  localized: true,
                  label: 'Badge Lab 2',
                  admin: { width: '50%' },
                },
                {
                  name: 'lab2Title',
                  type: 'text',
                  localized: true,
                  label: 'Nama Laboratorium 2',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'lab2HeadRoleLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Jabatan Kepala Lab',
                  admin: { width: '50%' },
                },
                {
                  name: 'lab2HeadName',
                  type: 'text',
                  localized: true,
                  label: 'Nama Kepala Lab (Fallback)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'lab2Desc',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Lengkap Lab 2',
            },
            {
              type: 'collapsible',
              label: '4 Butir Fitur Unggulan Lab 2',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lab2Point1', type: 'text', localized: true, label: 'Fitur 1', admin: { width: '50%' } },
                    { name: 'lab2Point2', type: 'text', localized: true, label: 'Fitur 2', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'lab2Point3', type: 'text', localized: true, label: 'Fitur 3', admin: { width: '50%' } },
                    { name: 'lab2Point4', type: 'text', localized: true, label: 'Fitur 4', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'lab2Capacity', type: 'text', localized: true, label: 'Kapasitas', admin: { width: '33.33%' } },
                { name: 'lab2Ac', type: 'text', localized: true, label: 'Pendingin Ruangan', admin: { width: '33.33%' } },
                { name: 'lab2Location', type: 'text', localized: true, label: 'Lokasi Ruangan', admin: { width: '33.33%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'lab2Image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Foto Laboratorium 2 (Opsional, fallback otomatis)',
                  admin: { width: '40%' },
                },
                {
                  name: 'lab2ImageTag',
                  type: 'text',
                  localized: true,
                  label: 'Label Overlay Foto',
                  admin: { width: '30%' },
                },
                {
                  name: 'lab2ImageSub',
                  type: 'text',
                  localized: true,
                  label: 'Sub-label Overlay Foto',
                  admin: { width: '30%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Sarana Pendukung',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'supportTag',
                  type: 'text',
                  localized: true,
                  label: 'Tagline Bagian',
                  admin: { width: '50%' },
                },
                {
                  name: 'supportTitle',
                  type: 'text',
                  localized: true,
                  label: 'Judul Bagian Sarana Pendukung',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'supportDesc',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Singkat Sarana Pendukung',
            },
            {
              type: 'collapsible',
              label: 'Kartu 1: Smart Classroom',
              fields: [
                {
                  name: 'support1Title',
                  type: 'text',
                  localized: true,
                  label: 'Judul Fasilitas 1',
                },
                {
                  name: 'support1Desc',
                  type: 'textarea',
                  localized: true,
                  label: 'Deskripsi Fasilitas 1',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Kartu 2: Ruang Baca & Mini Library',
              fields: [
                {
                  name: 'support2Title',
                  type: 'text',
                  localized: true,
                  label: 'Judul Fasilitas 2',
                },
                {
                  name: 'support2Desc',
                  type: 'textarea',
                  localized: true,
                  label: 'Deskripsi Fasilitas 2',
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Kartu 3: Sekretariat HIMATIF',
              fields: [
                {
                  name: 'support3Title',
                  type: 'text',
                  localized: true,
                  label: 'Judul Fasilitas 3',
                },
                {
                  name: 'support3Desc',
                  type: 'textarea',
                  localized: true,
                  label: 'Deskripsi Fasilitas 3',
                },
              ],
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
