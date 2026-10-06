import type { CollectionConfig } from 'payload'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: { singular: 'Unduhan Dokumen', plural: 'Unduhan Dokumen' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nama Dokumen',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategori Dokumen',
      options: [
        { label: 'Pedoman', value: 'Pedoman' },
        { label: 'Skripsi', value: 'Skripsi' },
        { label: 'Magang', value: 'Magang' },
        { label: 'KKN', value: 'KKN' },
        { label: 'Jadwal Kuliah', value: 'Jadwal Kuliah' },
        { label: 'Publikasi', value: 'Publikasi' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'File Unduhan (PDF/DOCX)',
    },
  ],
}
