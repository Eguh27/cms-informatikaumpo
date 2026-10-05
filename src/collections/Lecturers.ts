import type { CollectionConfig } from 'payload'

export const Lecturers: CollectionConfig = {
  slug: 'lecturers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'category'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Lengkap (beserta gelar)',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Jabatan',
    },
    {
      name: 'nidn',
      type: 'text',
      label: 'NIDN',
    },
    {
      name: 'nik',
      type: 'text',
      label: 'NIK',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategori',
      options: [
        { label: 'Pimpinan', value: 'pimpinan' },
        { label: 'Dosen', value: 'dosen' },
        { label: 'Laboratorium', value: 'lab' },
      ],
    },
    {
      name: 'focus',
      type: 'text',
      label: 'Bidang Keahlian / Riset',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil',
    },
  ],
}
