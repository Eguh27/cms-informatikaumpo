import type { CollectionConfig } from 'payload'

export const CurriculumTracks: CollectionConfig = {
  slug: 'curriculum-tracks',
  labels: { singular: 'Kurikulum', plural: 'Kurikulum' },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
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
}
