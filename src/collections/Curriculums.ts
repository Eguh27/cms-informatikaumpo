import type { CollectionConfig } from 'payload'

export const Curriculums: CollectionConfig = {
  slug: 'curriculums',
  labels: { singular: 'Kurikulum', plural: 'Kurikulum' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isActive', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Kurikulum (contoh: Kurikulum 2023/2024)',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Jadikan sebagai Kurikulum Aktif?',
      defaultValue: false,
      admin: {
        description: 'Jika dicentang, kurikulum ini yang akan ditampilkan di halaman Akademik website.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Peminatan',
          fields: [
            {
              name: 'tracks',
              type: 'array',
              label: 'Daftar Peminatan',
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  label: 'Nomor Urut (contoh: 01)',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Nama Peminatan',
                },
                {
                  name: 'copy',
                  type: 'textarea',
                  required: true,
                  label: 'Deskripsi Singkat',
                },
                {
                  name: 'tags',
                  type: 'array',
                  label: 'Mata Kuliah Utama / Keahlian',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'prospects',
                  type: 'text',
                  label: 'Prospek Karir Lulusan',
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Nama Icon Lucide (contoh: Cpu, Code2, Network)',
                },
              ],
            },
          ],
        },
        {
          label: 'Mata Kuliah',
          fields: [
            {
              name: 'semesters',
              type: 'array',
              label: 'Distribusi Mata Kuliah Per Tahap/Semester',
              fields: [
                {
                  name: 'stage',
                  type: 'number',
                  required: true,
                  label: 'Tahap Ke- (1-4)',
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label Tahap (contoh: Tahun 1 (Semester 1 & 2))',
                },
                {
                  name: 'focus',
                  type: 'text',
                  required: true,
                  label: 'Fokus Pembelajaran',
                },
                {
                  name: 'courses',
                  type: 'array',
                  label: 'Daftar Mata Kuliah',
                  fields: [
                    {
                      name: 'code',
                      type: 'text',
                      required: true,
                      label: 'Kode MK',
                    },
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      label: 'Nama Mata Kuliah',
                    },
                    {
                      name: 'sks',
                      type: 'number',
                      required: true,
                      label: 'SKS',
                    },
                    {
                      name: 'type',
                      type: 'text',
                      required: true,
                      label: 'Tipe (Wajib / Peminatan AI / dll)',
                    },
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
