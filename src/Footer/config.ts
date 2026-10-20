import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Konten Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informasi Prodi',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              label: 'Deskripsi Singkat Prodi',
            },
          ],
        },
        {
          label: 'Navigasi Cepat',
          fields: [
            {
              name: 'navTitle',
              type: 'text',
              localized: true,
              label: 'Judul Bagian Navigasi',
            },
            {
              name: 'navItems',
              type: 'array',
              label: 'Daftar Tautan Navigasi',
              admin: {
                description: 'Kelola tautan menu navigasi footer. Anda dapat menambah, menghapus, atau menggeser urutan.',
                initCollapsed: false,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                      required: true,
                      label: 'Label Menu (ID / EN)',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                      label: 'URL Tautan',
                      admin: {
                        width: '50%',
                        placeholder: 'Contoh: /profil atau https://...',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Kontak & Lokasi',
          fields: [
            {
              name: 'contactTitle',
              type: 'text',
              localized: true,
              label: 'Judul Bagian Kontak',
            },
            {
              name: 'address',
              type: 'textarea',
              localized: true,
              label: 'Alamat Kampus',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Nomor Telepon/WhatsApp',
                  admin: { width: '50%' },
                },
                {
                  name: 'phoneNote',
                  type: 'text',
                  localized: true,
                  label: 'Keterangan Telepon',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'email',
              type: 'text',
              label: 'Alamat Email Resmi',
            },
          ],
        },
        {
          label: 'Hak Cipta & Tautan Luar',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              localized: true,
              label: 'Teks Hak Cipta',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'portalLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tautan Portal',
                  admin: { width: '50%' },
                },
                {
                  name: 'portalUrl',
                  type: 'text',
                  label: 'URL Portal',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'pmbLabel',
                  type: 'text',
                  localized: true,
                  label: 'Label Tautan PMB',
                  admin: { width: '50%' },
                },
                {
                  name: 'pmbUrl',
                  type: 'text',
                  label: 'URL PMB',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
